// A live test of writing directly, from Node, with the code the page runs
// (direct.js and vendor/opensheaf-manager.js), against a real repository:
// a request carried out on the head of its branch, signed, committed; then
// the time until GitHub Pages serves the commit. For a throwaway archive
// only. The key is read from a key file (the text of `osheaf key export`, or
// a key file of the file key store): a path for tests, in place of the
// passkey, which needs a person. The token is GH_TOKEN.
//
//   GH_TOKEN=... node tools/live-test.mjs --repo OWNER/REPO --key FILE \
//     --operation notice --fields '{"Label": "x", ...}' [--file 'LABEL=PATH' ...]
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import * as core from "../vendor/opensheaf-manager.js";
import { Keys, github, write } from "../direct.js";

const args = process.argv.slice(2);
const opt = (name) => { const k = args.indexOf(name); return k < 0 ? null : args[k + 1]; };
const repo = opt("--repo"), keyFile = opt("--key"), operation = opt("--operation");
const fields = JSON.parse(opt("--fields") || "{}");
if (!repo || !keyFile || !operation || !process.env.GH_TOKEN) {
  console.error("usage: GH_TOKEN=... node tools/live-test.mjs --repo OWNER/REPO --key FILE --operation OP --fields JSON [--file LABEL=PATH]");
  process.exit(2);
}
const files = {};
for (let k = 0; k < args.length; k++) {
  if (args[k] !== "--file") continue;
  const [label, file] = args[k + 1].split(/=(.*)/s);
  (files[label] ||= []).push({ name: path.basename(file), bytes: new Uint8Array(await readFile(file)) });
}
const gh = github(process.env.GH_TOKEN);
const started = Date.now();
const mark = (what) => console.log(`${((Date.now() - started) / 1000).toFixed(1).padStart(6)} s  ${what}`);
const settings = JSON.parse(new TextDecoder().decode(await gh.request("GET", `repos/${repo}/contents/osheaf.json`, null, { raw: true })));
const given = await core.keyFromText(await readFile(keyFile, "utf-8"), { owner: settings.owner });
const keys = new Keys();
keys.add(given.owner, [given.key]);
mark(`key of ${given.owner.slice(0, 8)}... read; ${repo} at ${settings.baseUrl}`);
const res = await write({ gh, repo, operation, fields, files, keys, settings, cache: new Map(), progress: mark });
mark(res.ok ? `committed ${res.commit.sha} (${res.commit.changed} files changed, ${res.commit.removed} removed; ` +
              `reads: ${JSON.stringify(res.reads)}, attempts: ${res.attempts})` : `refused:\n${res.message}`);
if (!res.ok) process.exit(1);
console.log(res.commitMessage.trim().split("\n").map((l) => `         ${l}`).join("\n"));
// GitHub Pages: the site serves the commit once its opensheaf.json is the committed one
const storage = await core.GitHubStorage.open(repo, gh);
const want = storage.base.get("opensheaf.json").sha;
for (let k = 0; k < 120; k++) {
  try {
    const r = await fetch(`${settings.baseUrl}opensheaf.json?t=${Date.now()}`, { cache: "no-store" });
    if (r.ok && (await core.gitBlobSha(new Uint8Array(await r.arrayBuffer()))) === want) {
      mark("GitHub Pages serves the commit");
      process.exit(0);
    }
  } catch (_) { /* not yet */ }
  await new Promise((r) => setTimeout(r, 2000));
}
mark("GitHub Pages did not serve the commit within four minutes");
process.exit(1);
