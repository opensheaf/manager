// Setting up a key wallet from the page (direct.js: setupState,
// pushCurrentKey, enrollPasskey), against a double of GitHub's contents API
// and of the unlock page's window: the checks of the wallet, the current key
// pushed as osheaf key push pushes it, a passkey created in the popup (mode
// popup-enroll) and its lock added, then the keys unlocked by it as the
// manager unlocks them. The parity of the files with osheaf is tested in
// opensheaf-js (tests/parity.test.js, tests/github.test.js).
import { test } from "node:test";
import assert from "node:assert/strict";
import * as core from "../vendor/opensheaf-manager.js";
import { setupState, pushCurrentKey, enrollPasskey, unlock, newRepositoryUrl, github, walletOwners } from "../direct.js";
import { seal, windows, owner, cred } from "./popup-double.mjs";

// GitHub's API for a few repositories: { "o/r": { visibility, push, files: Map } }.
function fakeGitHub(repos) {
  const commits = [];
  const json = (status, value) => new Response(JSON.stringify(value), { status, headers: { "content-type": "application/json" } });
  const sha = (bytes) => Buffer.from(bytes).toString("hex").slice(0, 40).padEnd(40, "0") + "";
  const blobSha = async (bytes) => Buffer.from(await crypto.subtle.digest("SHA-1", bytes)).toString("hex");
  const fetchImpl = async (url, init = {}) => {
    const u = new URL(String(url));
    if (u.origin !== "https://api.github.com") throw new TypeError(`no network in the tests: ${url}`);
    const m = /^\/repos\/([^/]+\/[^/]+)(?:\/contents(?:\/(.*))?)?$/.exec(u.pathname);
    const r = m && repos[m[1]];
    if (!r) return json(404, { message: "Not Found" });
    if (!/\/contents/.test(u.pathname)) {
      return json(200, { full_name: m[1], private: r.visibility !== "public", visibility: r.visibility,
                         permissions: { pull: true, push: r.push } });
    }
    const p = decodeURIComponent(m[2] || "");
    const method = init.method || "GET";
    const old = r.files.get(p);
    if (method === "GET") {
      if (old) return json(200, { type: "file", sha: await blobSha(old), content: Buffer.from(old).toString("base64") });
      const names = new Map();
      for (const f of r.files.keys()) {
        if (p && !f.startsWith(p + "/")) continue;
        const rest = p ? f.slice(p.length + 1) : f, k = rest.indexOf("/");
        names.set(k < 0 ? rest : rest.slice(0, k), k < 0 ? "file" : "dir");
      }
      if (!names.size) return json(404, { message: p || r.files.size ? "Not Found" : "This repository is empty." });
      return json(200, [...names].map(([name, type]) => ({ name, type })));
    }
    if (method === "PUT") {
      if (!r.push) return json(403, { message: "Resource not accessible by integration" });
      const body = JSON.parse(init.body);
      if (old && body.sha !== await blobSha(old)) return json(409, { message: "does not match" });
      r.files.set(p, new Uint8Array(Buffer.from(body.content, "base64")));
      commits.push({ repo: m[1], path: p, message: body.message });
      return json(old ? 200 : 201, { commit: { sha: sha(new TextEncoder().encode(String(commits.length))) } });
    }
    return json(405, {});
  };
  return { fetchImpl, commits };
}

const text = (bytes) => new TextDecoder().decode(bytes);

test("the page to create the wallet's repository, filled in", () => {
  const url = new URL(newRepositoryUrl("github:jane/opensheaf-keys"));
  assert.equal(url.origin + url.pathname, "https://github.com/new");
  assert.equal(url.searchParams.get("owner"), "jane");
  assert.equal(url.searchParams.get("name"), "opensheaf-keys");
  assert.equal(url.searchParams.get("visibility"), "private");
});

// The wallet as GitHub's page for a new repository makes it: empty, no
// commit (GitHub answers 404, "This repository is empty.", for its contents);
// the contents API makes its first commit.
test("a key wallet set up from the page: checked, the key pushed, a passkey created and enrolled, then unlocked", async () => {
  const seed = crypto.getRandomValues(new Uint8Array(32));
  const key = await core.Key.fromSeed(Uint8Array.from(seed));
  const signers = { owner, dids: [key.did], threshold: 1, versions: { [key.did]: 1 } };
  const settings = { owner };
  const repos = { "jane/opensheaf-keys": { visibility: "private", push: true, files: new Map() },
                  "jane/open": { visibility: "public", push: true, files: new Map() },
                  "jane/read-only": { visibility: "private", push: false, files: new Map() },
                  "jane/papers": { visibility: "public", push: true, files: new Map() } };
  const { fetchImpl, commits } = fakeGitHub(repos);
  const gh = github(async () => "token", fetchImpl);
  const at = (wallet) => ({ gh, archiveRepo: "jane/papers", settings, wallet, signers });
  await assert.rejects(setupState(at("github:jane/open")), /not a private repository/);
  await assert.rejects(setupState(at("github:jane/read-only")), /cannot write/);
  await assert.rejects(setupState(at("github:jane/papers")), /repository of the archive/);
  await assert.rejects(setupState(at("github:jane/none")), /install the OpenSheaf app/);
  let st = await setupState(at("github:jane/opensheaf-keys"));
  assert.deepEqual([st.there, st.missing, st.enrolled, st.confirm, st.plans.enrolled], [[], [key.did], [], true, null]);

  const line = Buffer.from(seed).toString("base64") + "\n";
  const other = Buffer.from(new Uint8Array(32).fill(1)).toString("base64");
  await assert.rejects(pushCurrentKey({ state: st, settings, signers, keyText: other, passphrase: "correct horse" }),
                       /not a current key/);
  const got = await pushCurrentKey({ state: st, settings, signers, keyText: line, passphrase: "correct horse" });
  assert.deepEqual(got, { did: key.did, put: true });
  const path = `${owner}/${key.id}.key.enc`;
  assert.deepEqual(commits.map((c) => [c.path, c.message]), [[path, `opensheaf: current key ${key.id} of ${owner}`]]);
  const file = text(repos["jane/opensheaf-keys"].files.get(path));
  assert.match(file, new RegExp(`^opensheaf-key/0\\.2\\nkind current\\nowner ${owner}\\nversion v1\\nkey ${key.did}\\n`));
  assert.equal((await core.readKey(file, "correct horse")).key.did, key.did);

  st = await setupState(at("github:jane/opensheaf-keys"));
  assert.deepEqual([st.there, st.missing, st.confirm], [[key.did], [], false]);
  await assert.rejects(pushCurrentKey({ state: st, settings, signers, keyText: line, passphrase: "wrong horse" }),
                       /not the passphrase/);
  assert.deepEqual(await pushCurrentKey({ state: st, settings, signers, keyText: line, passphrase: "correct horse" }),
                   { did: key.did, put: false });
  assert.equal(commits.length, 1);
  assert.equal(st.plans.enrolled.fresh, true);

  // a wrong passphrase: the popup closes, nothing changes
  const wrong = windows();
  const refused = enrollPasskey({ state: st, settings, passphrase: "wrong horse", askCode: async () => "", win: wrong.win,
                                  open: wrong.open }).then(() => null, (e) => e);
  await wrong.send({ type: "opensheaf-unlock-ready" });
  assert.match(String(await refused), /nothing was changed/);
  assert.ok(wrong.popup.closed);
  assert.equal(commits.length, 1);

  // the passkey created in the popup, mode popup-enroll
  const { win, popup, open, send } = windows();
  const prf = new Uint8Array(32).fill(5);
  let code = null;
  const enrolled = enrollPasskey({ state: st, settings, passphrase: "correct horse", askCode: async () => code, win, open });
  assert.deepEqual(win.opened, ["https://unlock.opensheaf.org/#mode=popup-enroll&origin=https%3A%2F%2Fmanager.opensheaf.org"]);
  await send({ type: "opensheaf-unlock-ready" });
  for (let i = 0; i < 400 && !popup.posted.length; i++) await new Promise((r) => setTimeout(r, 10));
  const { message } = popup.posted[0];
  assert.equal(message.cred, "");
  code = await core.confirmationCode(message.state, Buffer.from(message.pk, "base64url"));
  await send({ type: "opensheaf-unlock-answer", state: message.state, cred,
               ...(await seal(Uint8Array.from(prf), message.pk, message.state, "popup-enroll")) });
  assert.deepEqual(await enrolled, [["current", key.did]]);
  assert.equal(commits.length, 2);
  const locked = text(repos["jane/opensheaf-keys"].files.get(path));
  assert.ok(locked.includes(`wrap passkey prf rp=unlock.opensheaf.org cred=${cred} `));

  st = await setupState(at("github:jane/opensheaf-keys"));
  assert.deepEqual([st.enrolled, st.plans.enrolled.todo, st.plans.enrolled.known], [[key.did], [], [cred]]);
  assert.deepEqual(await enrollPasskey({ state: st, settings, passphrase: "correct horse", askCode: async () => "" }), []);

  // unlocked by the passkey, as the manager unlocks: the same key
  const u = windows();
  let code2 = null;
  const keys = unlock({ gh, archiveRepo: "jane/papers", settings, wallet: "github:jane/opensheaf-keys", signers,
                        askCode: async () => code2, win: u.win, open: u.open });
  await u.send({ type: "opensheaf-unlock-ready" });
  for (let i = 0; i < 400 && !u.popup.posted.length; i++) await new Promise((r) => setTimeout(r, 10));
  const m2 = u.popup.posted[0].message;
  assert.equal(m2.cred, cred);
  code2 = await core.confirmationCode(m2.state, Buffer.from(m2.pk, "base64url"));
  await u.send({ type: "opensheaf-unlock-answer", state: m2.state, cred, ...(await seal(Uint8Array.from(prf), m2.pk, m2.state, "popup")) });
  const [opened] = await keys;
  const message2 = new TextEncoder().encode("a message");
  assert.deepEqual(await opened.sign(message2), await key.sign(message2));
});

// A wallet the page has just changed is read as it is now: every read of the
// wallet bypasses the browser's cache (GitHub's answers may be kept for a
// minute), so that the owners it holds show at once after the setup.
test("the wallet is read past the browser's cache", async () => {
  const repos = { "jane/opensheaf-keys": { visibility: "private", push: true, files: new Map() } };
  const { fetchImpl } = fakeGitHub(repos);
  const modes = [];
  const gh = github(async () => "token", (url, init = {}) => { modes.push(init.cache); return fetchImpl(url, init); });
  assert.deepEqual(await walletOwners({ gh, archiveRepo: "jane/papers", wallet: "github:jane/opensheaf-keys",
                                        settings: { owner } }), []);
  assert.ok(modes.length > 0);
  assert.deepEqual([...new Set(modes)], ["no-store"]);
});
