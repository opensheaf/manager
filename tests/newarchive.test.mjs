// A new archive set up from the page, its owner made here (direct.js:
// prepareOwner, confirmOwner, setUpArchive, createLabels, putOwnerKey,
// storeWorkflowKey, ownerWalletState and enrollPasskey, turnPagesOn), against
// the double of GitHub's API of opensheaf-js (fake-github.mjs: git data,
// contents, secrets, labels, Pages) and of the unlock page's window: a
// repository made from the template's files, the wallet a private repository.
// Each step refused once (the sign-in without the permission, the wallet
// read-only), then done; the keys kept in memory meanwhile. The archive then
// verifies, the secret opens to the workflows' key, the passkey unlocks the
// owner's key, and a change is written directly. The parity of the files
// with osheaf and the template's setup is tested in opensheaf-js
// (tests/github.test.js, tests/parity.test.js).
import { test } from "node:test";
import assert from "node:assert/strict";
import * as core from "../vendor/opensheaf-manager.js";
import { prepareOwner, confirmOwner, setUpArchive, createLabels, putOwnerKey, storeWorkflowKey, workflowKeyLine,
         forgetWorkflowKey, ownerWalletState, enrollPasskey, turnPagesOn, forgetOwner, unlock, signersOf, write, Keys,
         LABELS } from "../direct.js";
import { fakeGitHub } from "./fake-github.mjs";
import { seal, windows, cred } from "./popup-double.mjs";

const REPO = "jane/papers", WALLET = "github:jane/opensheaf-keys";
const noNetwork = async (url) => { throw new TypeError(`no network in the tests: ${url}`); };
const text = (bytes) => new TextDecoder().decode(bytes);
const PASS = "correct horse";

// A repository as the archive template makes it: its website's templates,
// a README, the workflows; no osheaf.json.
function world() {
  const g = fakeGitHub();
  const files = { "README.md": "An archive made from the template.\n",
                  ".github/workflows/from-request.yml": "name: from request\n" };
  for (const [name, t] of Object.entries(core.ASSETS.templates)) files[`templates/${name}`] = t;
  g.create(REPO, files);
  g.create("jane/opensheaf-keys", {}, { visibility: "private" });
  const gh = new core.GitHub({ api: g.api, fetch: g.fetch, token: async () => g.token });
  return { g, gh };
}

const FIELDS = { Name: "A Catalogue of Sheaves", Purpose: "catalogue", Description: "Papers on sheaves.", Curator: "Doe, Jane" };
const BASE = async () => ({ url: "https://jane.github.io/papers/", rule: "the GitHub Pages address of the owner (no domain of its own found)" });

// The passkey's popup: created (popup-enroll), or used to unlock (popup).
async function answerPopup(w, owner, prf, mode, code) {
  await w.send({ type: "opensheaf-unlock-ready" });
  for (let i = 0; i < 400 && !w.popup.posted.length; i++) await new Promise((r) => setTimeout(r, 10));
  const { message } = w.popup.posted[0];
  code.value = await core.confirmationCode(message.state, Buffer.from(message.pk, "base64url"));
  await w.send({ type: "opensheaf-unlock-answer", state: message.state, cred,
                 ...(await seal(Uint8Array.from(prf), message.pk, message.state, mode, owner)) });
}

test("a new archive set up from the page: the owner made here, rotation keys offline, each step refused then done", async () => {
  const { g, gh } = world();
  const first = g.head(REPO);
  await assert.rejects(prepareOwner({ gh, archiveRepo: REPO, wallet: "github:jane/papers", passphrase: PASS }),
                       /repository of the archive/);
  await assert.rejects(prepareOwner({ gh, archiveRepo: REPO, wallet: WALLET, passphrase: "" }), /give a passphrase/);
  await assert.rejects(prepareOwner({ gh, archiveRepo: REPO, wallet: WALLET, passphrase: PASS, keeper: "example.org" }),
                       /a keeper is an ORCID iD/);

  await assert.rejects(prepareOwner({ gh, archiveRepo: REPO, wallet: WALLET, passphrase: PASS, ownerLabel: "Jane" }),
                       /not a valid label/);
  const p = await prepareOwner({ gh, archiveRepo: REPO, wallet: WALLET, passphrase: PASS, keeper: "https://example.org/",
                                 ownerLabel: "jane-doe" });
  const owner = p.owner;
  const v1 = p.log.latest();
  assert.deepEqual([v1.number, v1.keys.keys, v1.keys.threshold, v1.keys.next.length, v1.keys.nextThreshold],
                   [1, [p.current.did, p.workflows.did], 1, 3, 2]);
  assert.equal(p.files.length, 3);
  for (const f of p.files) {
    assert.match(f.name, new RegExp(`^rotation-${owner.slice(0, 16)}-[a-z2-7]{16}\\.txt$`));
    assert.match(f.text, new RegExp(`^opensheaf-rotation-key/0\\.2\\nowner ${owner}\\nversion v1\\nkey ${f.did}\\n`));
    assert.equal((await core.readKey(f.text, PASS)).key.did, f.did);
    assert.ok(v1.keys.next.includes(f.digest));
  }

  // nothing is committed before the checks of the files are typed back
  await assert.rejects(setUpArchive({ gh, repo: REPO, pending: p, fields: FIELDS, defaultBase: BASE, fetchImpl: noNetwork }),
                       /not confirmed/);
  assert.throws(() => confirmOwner(p, ["AAAA", "BBBB", "CCCC"]), /checks typed are not those/);
  assert.equal(g.head(REPO), first);
  confirmOwner(p, p.files.map((f) => f.check.toLowerCase()));

  // (a) the archive set up, verified, one commit; not twice
  const phases = [];
  const done = await setUpArchive({ gh, repo: REPO, pending: p, fields: FIELDS, defaultBase: BASE, fetchImpl: noNetwork,
                                    progress: (x) => phases.push(x) });
  assert.equal(done.ok, true, done.message);
  assert.deepEqual(phases, ["reading", "carrying out", "committing"]);
  assert.equal(g.head(REPO), done.commit.sha);
  assert.match(g.objects.get(done.commit.sha).message, /^Set up the archive: A Catalogue of Sheaves \(the OpenSheaf manager\)\n/);
  assert.match(done.message, /with the collection `a-catalogue-of-sheaves` featured on its home page\. Its base URL is https:\/\/jane\.github\.io\/papers\/ \(the GitHub Pages address/);
  assert.equal(p.files, null);
  assert.equal(await setUpArchive({ gh, repo: REPO, pending: p, fields: FIELDS, defaultBase: BASE, fetchImpl: noNetwork }), done);
  assert.equal(g.head(REPO), done.commit.sha);
  const files = g.files(REPO);
  const settings = JSON.parse(text(files.get("osheaf.json")));
  assert.deepEqual([settings.owner, settings.baseUrl, settings.index.html.featured], [owner, "https://jane.github.io/papers/",
                                                                                      "a-catalogue-of-sheaves"]);
  assert.ok(files.has(`ocfl/${owner}/${owner}/v1/content/genesis.json`));
  const listed = JSON.parse(text(files.get("opensheaf.json"))).objects.find((o) => o.id === `sheaf:${owner}:${owner}`);
  assert.equal(listed.label, "jane-doe");
  // the owner set up with its owner catalogue, sealed by its own key (#72), labelled main
  const disc = JSON.parse(text(files.get("opensheaf.json")));
  assert.equal("mainCollection" in disc, false);
  assert.deepEqual(disc.owners.map((e) => e.owner), [owner]);
  const catalogue = disc.objects.find((o) => o.id === disc.owners[0].catalogue);
  assert.deepEqual([catalogue.kind, catalogue.owner, catalogue.label], ["collection", owner, "main"]);
  assert.equal("mainCollection" in settings, false);
  const storage = await core.GitHubStorage.open(REPO, gh, {});
  const report = await core.verifyFolder(storage, { schemas: await core.schemasOf(core.ASSETS), fetch: noNetwork });
  assert.equal(report.counts().error + report.counts().warning, 0, JSON.stringify(report.findings));

  // the labels of the issue forms: refused without the permission, then made
  g.repos.get(REPO).allow.issues = false;
  assert.deepEqual(await createLabels({ gh, repo: REPO }), { made: 0, refused: true });
  g.repos.get(REPO).allow.issues = true;
  assert.deepEqual(await createLabels({ gh, repo: REPO }), { made: LABELS.length, refused: false });
  assert.deepEqual(await createLabels({ gh, repo: REPO }), { made: 0, refused: false });
  assert.deepEqual([...g.repos.get(REPO).labels.values()].map((l) => [l.name, l.color]),
                   LABELS.map((n) => [n, "5e6a78"]));

  // (b) the owner's current key in the wallet: refused, kept, then put
  const currentDid = p.current.did;
  g.repos.get("jane/opensheaf-keys").push = false;
  await assert.rejects(putOwnerKey({ pending: p }));
  assert.ok(p.current.seed.some((b) => b !== 0));
  g.repos.get("jane/opensheaf-keys").push = true;
  await putOwnerKey({ pending: p });
  assert.equal(p.current, null);
  const walletFiles = [...g.files("jane/opensheaf-keys")];
  assert.equal(walletFiles.length, 1);
  const [path, bytes] = walletFiles[0];
  assert.match(path, new RegExp(`^${owner}/[a-z2-7]{16}\\.key\\.enc$`));
  assert.match(text(bytes), new RegExp(`^opensheaf-key/0\\.2\\nkind current\\nowner ${owner}\\nversion v1\\nkey ${currentDid}\\n`));
  assert.equal((await core.readKey(text(bytes), PASS)).key.did, currentDid);

  // (c) the workflows' key as the repository secret: refused (shown instead), then stored
  const workflowsDid = p.workflows.did;
  g.repos.get(REPO).allow.secrets = false;
  assert.equal(await storeWorkflowKey({ gh, repo: REPO, pending: p }), "refused");
  const line = workflowKeyLine(p);
  assert.equal((await core.Key.fromSeed(Uint8Array.from(Buffer.from(line, "base64")))).did, workflowsDid);
  assert.equal(g.secret(REPO, "OPENSHEAF_SIGNING_KEY"), null);
  g.repos.get(REPO).allow.secrets = true;
  const seed = p.workflows.seed;
  assert.equal(await storeWorkflowKey({ gh, repo: REPO, pending: p }), "stored");
  assert.ok(seed.every((b) => b === 0));
  assert.equal(p.workflows, null);
  const box = g.repos.get(REPO).box;
  assert.equal(text(await core.openSealedBox(g.secret(REPO, "OPENSHEAF_SIGNING_KEY"), box.publicKey, box.secretKey)), line);

  // (d) the passkey: created in the popup, a lock added to the key in the wallet
  const st = await ownerWalletState({ gh, archiveRepo: REPO, pending: p });
  assert.deepEqual([st.there, st.missing, st.enrolled], [[currentDid], [workflowsDid], []]);
  const prf = new Uint8Array(32).fill(9);
  const w = windows(), code = { value: null };
  const enrolled = enrollPasskey({ state: st, settings: { owner }, passphrase: p.passphrase, askCode: async () => code.value,
                                   win: w.win, open: w.open });
  assert.match(w.win.opened[0], /#mode=popup-enroll&/);
  await answerPopup(w, owner, prf, "popup-enroll", code);
  assert.deepEqual(await enrolled, [["current", currentDid]]);

  // (e) GitHub Pages: refused without the permission, then turned on
  g.repos.get(REPO).allow.pages = false;
  assert.deepEqual(await turnPagesOn({ gh, repo: REPO }), { on: false, url: null, refused: true });
  g.repos.get(REPO).allow.pages = true;
  assert.deepEqual(await turnPagesOn({ gh, repo: REPO }), { on: true, url: "https://jane.github.io/papers/", refused: false });
  assert.deepEqual(await turnPagesOn({ gh, repo: REPO }), { on: true, url: null, refused: false });

  // the page's keys: the archive is written to directly
  const keys = new Keys();
  keys.add(owner, [p.signing]);
  forgetOwner(p);
  assert.equal(p.passphrase, null);
  const cache = new Map();
  const signers = await signersOf({ gh, repo: REPO, cache, settings });
  assert.deepEqual([signers.dids, signers.threshold, signers.number], [[currentDid, workflowsDid], 1, 1]);
  const res = await write({ gh, repo: REPO, operation: "new_collection", keys, settings, cache, fetchImpl: noNetwork,
                            fields: { "Label of the new collection": "reading", "Title of the collection": "Reading",
                                      Kind: "selection" } });
  assert.equal(res.ok, true, res.message);
  assert.equal(g.head(REPO), res.commit.sha);

  // and the passkey unlocks the owner's key, as on the next visit
  const u = windows(), code2 = { value: null };
  const opened = unlock({ gh, archiveRepo: REPO, settings, wallet: WALLET, signers, askCode: async () => code2.value,
                          win: u.win, open: u.open });
  await answerPopup(u, owner, prf, "popup", code2);
  const [key] = await opened;
  assert.equal(key.did, currentDid);
});

test("a new archive with the rotation keys in the wallet, no key for the workflows; a setup refused keeps the keys", async () => {
  const { g, gh } = world();
  const p = await prepareOwner({ gh, archiveRepo: REPO, wallet: WALLET, passphrase: PASS, level: "wallet", workflows: false });
  assert.deepEqual([p.files, p.rotation.length, p.confirmed, p.log.latest().keys.keys], [null, 3, true, [p.current.did]]);
  // the repository was set up meanwhile: refused, nothing committed by the page, the keys kept
  g.push(REPO, { "osheaf.json": "{}\n" });
  const head = g.head(REPO);
  const refused = await setUpArchive({ gh, repo: REPO, pending: p, fields: FIELDS, defaultBase: BASE, fetchImpl: noNetwork });
  assert.equal(refused.ok, false);
  assert.match(refused.message, /The archive is already set up\./);
  assert.equal(g.head(REPO), head);
  assert.ok(p.current.seed.some((b) => b !== 0));
  // the rotation keys went to the wallet first, as osheaf init --keys puts them
  const rotation = [...g.files("jane/opensheaf-keys")].filter(([, b]) => /\nkind rotation\n/.test(text(b)));
  assert.equal(rotation.length, 3);
  for (const [, b] of rotation) assert.match(text(b), /\nversion v1\n/);
  g.push(REPO, { "osheaf.json": null });
  const done = await setUpArchive({ gh, repo: REPO, pending: p, fields: { ...FIELDS, Purpose: "papers" }, defaultBase: BASE,
                                    fetchImpl: noNetwork });
  assert.equal(done.ok, true, done.message);
  assert.equal([...g.files("jane/opensheaf-keys")].filter(([, b]) => /\nkind rotation\n/.test(text(b))).length, 3);
  assert.equal(await storeWorkflowKey({ gh, repo: REPO, pending: p }), "none");
  await putOwnerKey({ pending: p });
  const st = await ownerWalletState({ gh, archiveRepo: REPO, pending: p });
  assert.equal(st.rotationInWallet, true);
  assert.deepEqual(st.missing, []);
  forgetOwner(p);
});

test("the key of the workflows shown once, then forgotten", async () => {
  const { gh } = world();
  const p = await prepareOwner({ gh, archiveRepo: REPO, wallet: WALLET, passphrase: PASS });
  const seed = p.workflows.seed;
  assert.match(workflowKeyLine(p), /^[A-Za-z0-9+/]{43}=$/);
  forgetWorkflowKey(p);
  assert.ok(seed.every((b) => b === 0));
  assert.deepEqual([p.workflows, p.done.secret, workflowKeyLine(p)], [null, "shown", ""]);
  const rotationSeeds = [p.current.seed];
  forgetOwner(p);
  assert.ok(rotationSeeds.every((s) => s.every((b) => b === 0)));
});
