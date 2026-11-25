// A new current key made in the page (direct.js: prepareNewKey, commitNewKey,
// putNewKey), against the double of GitHub's API of opensheaf-js
// (fake-github.mjs) holding a small archive made by osheaf init with test
// keys (fixtures/archive.json): the rotation keys given as the files osheaf
// exported, the new ones given back as files and confirmed by their checks,
// the key log's new version committed, the key put in the wallet (and put
// again after a failure); then the rotation keys kept in the wallet, which
// sign the next version. The parity of the versions and files with
// opensheaf-py is tested in opensheaf-js (tests/parity.test.js).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import * as core from "../vendor/opensheaf-manager.js";
import { setupState, prepareNewKey, commitNewKey, putNewKey, forgetNewKey, signersOf, recordWallet, walletHinted,
         walletName } from "../direct.js";
import { fakeGitHub } from "./fake-github.mjs";

const fixture = JSON.parse(await readFile(new URL("./fixtures/archive.json", import.meta.url), "utf-8"));
const REPO = "jane/papers", WALLET = "github:jane/opensheaf-keys";
const noNetwork = async (url) => { throw new TypeError(`no network in the tests: ${url}`); };
const text = (bytes) => new TextDecoder().decode(bytes);

function world() {
  const g = fakeGitHub();
  g.create(REPO, Object.fromEntries(Object.entries(fixture.files).map(([p, b]) => [p, new Uint8Array(Buffer.from(b, "base64"))])));
  g.create("jane/opensheaf-keys", {}, { visibility: "private" });
  const gh = new core.GitHub({ api: g.api, fetch: g.fetch, token: async () => g.token });
  const settings = JSON.parse(text(g.files(REPO).get("osheaf.json")));
  return { g, gh, settings };
}

test("a new current key made in the page, with rotation-key files, then with the rotation keys of the wallet", async () => {
  const { g, gh, settings } = world();
  const owner = settings.owner;
  let signers = await signersOf({ gh, repo: REPO, cache: new Map(), settings });
  assert.deepEqual([signers.number, signers.dids.length, signers.threshold, signers.next.length, signers.nextThreshold], [1, 1, 1, 3, 2]);
  let st = await setupState({ gh, archiveRepo: REPO, settings, wallet: WALLET, signers });
  assert.deepEqual([st.there, st.confirm, st.rotationInWallet], [[], true, false]);

  // too few files, a file that is not a rotation key: refused, nothing made
  await assert.rejects(prepareNewKey({ state: st, settings, signers, source: "files", files: fixture.rotation.slice(0, 1),
                                       passphrase: "correct horse" }), /given: 1 rotation key of v1 of the key log, and 2 sign/);
  await assert.rejects(prepareNewKey({ state: st, settings, signers, source: "files", passphrase: "correct horse",
                                       files: [{ name: "x.txt", text: "not a key" }, ...fixture.rotation] }), /x\.txt/);

  // the files of osheaf, in clear: the new rotation keys given back as files, locked with the passphrase
  const p = await prepareNewKey({ state: st, settings, signers, source: "files", files: fixture.rotation.slice(1),
                                  passphrase: "correct horse" });
  assert.equal(p.version, 2);
  assert.equal(p.files.length, 3);
  for (const f of p.files) {
    assert.match(f.name, new RegExp(`^rotation-${owner.slice(0, 16)}-[a-z2-7]{16}\\.txt$`));
    assert.match(f.text, new RegExp(`^opensheaf-rotation-key/0\\.2\\nowner ${owner}\\nversion v2\\nkey ${f.did}\\n`));
    assert.match(f.text, /\nencryption /);
    assert.doesNotMatch(f.text, /\nencryption none\n/);
    assert.equal((await core.readKey(f.text, "correct horse")).key.did, f.did);
  }
  const saved = p.files.map((f) => ({ ...f }));
  const head = g.head(REPO);
  await assert.rejects(commitNewKey({ gh, repo: REPO, pending: p, state: st, settings, cache: new Map(), fetchImpl: noNetwork,
                                      typed: ["AAAA", "BBBB", "CCCC"] }), /checks typed are not those of the files/);
  assert.equal(g.head(REPO), head);
  const phases = [];
  const done = await commitNewKey({ gh, repo: REPO, pending: p, state: st, settings, cache: new Map(), fetchImpl: noNetwork,
                                    typed: saved.map((f) => f.check.toLowerCase()), progress: (x) => phases.push(x) });
  assert.deepEqual(phases, ["reading", "carrying out", "committing"]);
  assert.equal(done.number, 2);
  assert.equal(g.head(REPO), done.commit.sha);
  assert.equal(p.files, null);
  assert.equal(p.signing, null);

  // the wallet refuses the write: the key stays in memory, and is put once it accepts
  g.repos.get("jane/opensheaf-keys").push = false;
  await assert.rejects(putNewKey({ pending: p, state: st, settings }));
  assert.ok(p.current.seed.some((b) => b !== 0));
  g.repos.get("jane/opensheaf-keys").push = true;
  const did = p.current.did;
  assert.equal(await commitNewKey({ gh, repo: REPO, pending: p, state: st, settings, cache: new Map(), fetchImpl: noNetwork }), done);
  assert.equal(g.head(REPO), done.commit.sha);
  assert.equal(await putNewKey({ pending: p, state: st, settings }), true);
  assert.deepEqual([p.current, p.passphrase], [null, null]);
  signers = await signersOf({ gh, repo: REPO, cache: new Map(), settings });
  assert.deepEqual([signers.number, signers.dids.length, signers.versions[did], signers.next], [2, 2, 2, saved.map((f) => f.digest)]);
  st = await setupState({ gh, archiveRepo: REPO, settings, wallet: WALLET, signers });
  assert.deepEqual([st.there, st.confirm, st.rotationInWallet], [[did], false, false]);
  const entry = st.entries.find((e) => e.fields.key === did);
  assert.deepEqual([entry.fields.kind, entry.fields.version], ["current", "v2"]);
  assert.equal((await core.readKey(entry.text, "correct horse")).key.did, did);
  await assert.rejects(prepareNewKey({ state: st, settings, signers, source: "files", files: saved, passphrase: "wrong horse" }),
                       /not the passphrase/);

  // the rotation keys of v2 kept in the wallet (as osheaf owner rotate --keys keeps them): they sign v3
  const keys = await Promise.all(saved.map(async (f) => (await core.readKey(f.text, "correct horse")).key));
  await core.keepRotationKeys(st.wallet, owner, keys, 2, "correct horse", { cost: { opslimit: 1, memlimit: 8192 } });
  st = await setupState({ gh, archiveRepo: REPO, settings, wallet: WALLET, signers });
  assert.equal(st.rotationInWallet, true);
  const q = await prepareNewKey({ state: st, settings, signers, source: "wallet", passphrase: "correct horse" });
  assert.deepEqual([q.version, q.files, q.rotation.length], [3, null, 3]);
  const done3 = await commitNewKey({ gh, repo: REPO, pending: q, state: st, settings, cache: new Map(), fetchImpl: noNetwork });
  assert.equal(done3.number, 3);
  assert.equal(await putNewKey({ pending: q, state: st, settings }), true);
  signers = await signersOf({ gh, repo: REPO, cache: new Map(), settings });
  assert.equal(signers.dids.length, 3);
  st = await setupState({ gh, archiveRepo: REPO, settings, wallet: WALLET, signers });
  assert.equal(st.rotationInWallet, true);
  assert.equal(st.there.length, 2);
  const fresh = st.entries.filter((e) => e.fields.kind === "rotation" && e.fields.version === "v3");
  assert.deepEqual(fresh.map((e) => e.fields.digest).sort(), [...signers.next].sort());

  // cancelled: everything wiped, nothing committed
  const r = await prepareNewKey({ state: st, settings, signers, source: "wallet", passphrase: "correct horse" });
  const seeds = [r.current.seed, ...r.rotation.map((k) => k.seed)];
  forgetNewKey(r);
  assert.ok(seeds.every((s) => s.every((b) => b === 0)));
  assert.equal(g.head(REPO), done3.commit.sha);
});

// A wallet set up in the page is recorded in the archive's osheaf.json as a
// hint for the owner, in one commit, and only once (direct.recordWallet).
test("a key wallet recorded in osheaf.json as a hint for the owner, once", async () => {
  const { g, gh, settings } = world();
  const owner = settings.owner;
  assert.equal(walletHinted(settings), false);
  const first = await recordWallet({ gh, repo: REPO, owner, wallet: WALLET, fetchImpl: noNetwork });
  assert.equal(first.recorded, true);
  assert.ok(first.commit && first.commit.sha);
  const after = JSON.parse(text(g.files(REPO).get("osheaf.json")));
  assert.deepEqual(after.keys, { [owner]: { wallets: [WALLET] } });
  assert.equal(walletHinted(after), true);
  assert.equal(walletName(after), WALLET);
  assert.equal(walletName(after, "github:other/keys"), "github:other/keys");   // the person's own first
  const again = await recordWallet({ gh, repo: REPO, owner, wallet: WALLET, fetchImpl: noNetwork });
  assert.deepEqual([again.recorded, again.commit], [false, null]);
});
