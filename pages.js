// Watching GitHub Pages publish a commit. After a change is committed, GitHub
// Pages rebuilds the archive's website (about half a minute). The manager's
// GitHub App may read and write contents only, not Actions, so it cannot ask
// GitHub how the build goes; instead it watches the site itself: one file the
// commit wrote is fetched from the website until the bytes served are those
// of the commit (same git blob SHA-1). Pages publishes a commit as a whole, so
// one file is enough.

import * as gh from "./github.js";

// The git name of some bytes: SHA-1 of "blob <length>\0" and the bytes.
export async function gitBlobSha(bytes) {
  const head = new TextEncoder().encode(`blob ${bytes.length}\0`);
  const all = new Uint8Array(head.length + bytes.length);
  all.set(head);
  all.set(bytes, head.length);
  const d = new Uint8Array(await crypto.subtle.digest("SHA-1", all));
  return [...d].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Pages does not serve paths with a part starting with "." or "_" when it
// runs Jekyll; such files are never watched.
const served = (path) => !path.split("/").some((p) => p.startsWith(".") || p.startsWith("_"));

// The file to watch, from the files the commit changed: a small one (JSON,
// HTML or text) if there is one. { path, sha } for a file written, or
// { path, removed: true } when the commit only removed files.
export function probeOf(files) {
  const kept = files.filter((f) => served(f.filename));
  const written = kept.filter((f) => f.status !== "removed" && f.sha);
  const small = written.find((f) => /\.(json|html|txt)$/.test(f.filename));
  const pick = small || written[0];
  if (pick) return { path: pick.filename, sha: pick.sha };
  const gone = kept.find((f) => f.status === "removed");
  return gone ? { path: gone.filename, removed: true } : null;
}

// Whether the site serves the probe as the commit has it.
export async function published(baseUrl, probe, sha, fetchImpl = fetch) {
  const base = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
  // a query of the commit's name: past Pages' cache (ten minutes) at once
  const r = await fetchImpl(`${base}${gh.encodePath(probe.path)}?published=${sha.slice(0, 12)}`, { cache: "no-store" });
  if (probe.removed) return r.status === 404;
  if (!r.ok) return false;
  return (await gitBlobSha(new Uint8Array(await r.arrayBuffer()))) === probe.sha;
}

// Watches the site until the commit `sha` is published. onState is called
// with { state, seconds }: "publishing" at each look, then "published",
// "late" (not published after `limit` ms; the watch stops) or "unknown" (no
// website, or nothing to watch). `stop()` ends the watch silently (another
// archive opened, or a newer commit watched).
export async function watchPages({ token, repo, sha, baseUrl, onState, fetchImpl = fetch, every = 3000,
                                   limit = 10 * 60 * 1000, stop = () => false, now = () => Date.now(),
                                   sleep = (ms) => new Promise((r) => setTimeout(r, ms)) }) {
  const started = now();
  const seconds = () => Math.round((now() - started) / 1000);
  if (!/^https:\/\//.test(baseUrl || "")) return onState({ state: "unknown", seconds: 0 });
  let probe = null;
  try {
    const c = await gh.api(token, `/repos/${repo}/commits/${sha}`, { fetchImpl });
    probe = probeOf(c.files || []);
  } catch (_) { probe = null; }
  if (!probe) return onState({ state: "unknown", seconds: 0 });
  while (!stop()) {
    onState({ state: "publishing", seconds: seconds() });
    let done = false;
    try { done = await published(baseUrl, probe, sha, fetchImpl); } catch (_) { done = false; }
    if (stop()) return;
    if (done) return onState({ state: "published", seconds: seconds() });
    if (now() - started >= limit) return onState({ state: "late", seconds: seconds() });
    await sleep(every);
  }
}
