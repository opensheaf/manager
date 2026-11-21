// Watching GitHub Pages publish a commit (pages.js), against a fake GitHub
// API and a fake website.
import { test } from "node:test";
import assert from "node:assert/strict";
import { gitBlobSha, probeOf, watchPages } from "../pages.js";

const enc = new TextEncoder();

test("the git name of bytes is git's", async () => {
  // `printf hello | git hash-object --stdin`
  assert.equal(await gitBlobSha(enc.encode("hello")), "b6fc4c620b67d95f953a5c1c1230aaab5db5a1b0");
});

test("the file watched: a small one, never a hidden one; a removal when only removed", () => {
  assert.deepEqual(probeOf([{ filename: "a/v2/content/paper.pdf", status: "added", sha: "1" },
                            { filename: ".github/x.json", status: "modified", sha: "2" },
                            { filename: "a/inventory.json", status: "modified", sha: "3" }]),
                   { path: "a/inventory.json", sha: "3" });
  assert.deepEqual(probeOf([{ filename: "a/v2/content/paper.pdf", status: "added", sha: "1" }]),
                   { path: "a/v2/content/paper.pdf", sha: "1" });
  assert.deepEqual(probeOf([{ filename: "old.html", status: "removed", sha: "4" }]), { path: "old.html", removed: true });
  assert.equal(probeOf([{ filename: "_x/y.json", status: "added", sha: "5" }]), null);
});

function fakes({ newAfter, body = "new", files }) {
  let looks = 0;
  const seen = [];
  const fetchImpl = async (url, init = {}) => {
    seen.push({ url, init });
    if (url.startsWith("https://api.github.com/")) {
      return new Response(JSON.stringify({ files }), { headers: { "content-type": "application/json" } });
    }
    looks++;
    return new Response(looks > newAfter ? body : "old", { status: 200 });
  };
  return { fetchImpl, seen };
}

async function run(opts, fake) {
  const states = [];
  let t = 0;
  await watchPages({ token: "t", repo: "o/r", sha: "abcdef1234567890", baseUrl: "https://example.org/site",
                     fetchImpl: fake.fetchImpl, onState: (s) => states.push(s), now: () => t,
                     sleep: async (ms) => { t += ms; }, ...opts });
  return states;
}

test("publishing, then published once the site serves the commit's bytes", async () => {
  const sha = await gitBlobSha(enc.encode("new"));
  const fake = fakes({ newAfter: 2, files: [{ filename: "x/inventory.json", status: "modified", sha }] });
  const states = await run({}, fake);
  assert.deepEqual(states.map((s) => s.state), ["publishing", "publishing", "publishing", "published"]);
  assert.equal(states.at(-1).seconds, 6);
  const site = fake.seen.filter((s) => s.url.startsWith("https://example.org/"));
  assert.equal(site[0].url, "https://example.org/site/x/inventory.json?published=abcdef123456");
  assert.equal(site[0].init.cache, "no-store");
});

test("late after the limit; unknown without a website; stopped silently", async () => {
  const fake = fakes({ newAfter: 1e9, files: [{ filename: "x.json", status: "added", sha: "0".repeat(40) }] });
  const late = await run({ limit: 9000 }, fake);
  assert.equal(late.at(-1).state, "late");
  assert.deepEqual(await run({ baseUrl: "" }, fake), [{ state: "unknown", seconds: 0 }]);
  let n = 0;
  const stopped = await run({ stop: () => ++n > 2 }, fake);
  assert.ok(stopped.every((s) => s.state === "publishing"));
});
