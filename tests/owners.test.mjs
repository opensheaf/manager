// Several wallets and several owners (direct.js), and the branches of
// another owner's papers as the page lists and announces them (archive.js);
// the branch itself is made by opensheaf-js (carryOut with an acting
// owner), tested there.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as core from "../vendor/opensheaf-manager.js";
import { hostedOwners, walletChoices, unlockPlan, unlockBatch, unlockWithPopup, Keys } from "../direct.js";
import { grouped, continuation, branchLabel } from "../archive.js";
import { seal, windows, owner, cred } from "./popup-double.mjs";

const A = owner, B = "b".repeat(51) + "a", C = "c".repeat(51) + "q";

test("the owners an archive hosts, and the wallets offered for them, many to many", () => {
  assert.deepEqual(hostedOwners({ owner: A, owners: [B, A, C] }), [A, B, C]);
  assert.deepEqual(hostedOwners({}), []);
  const settings = { owner: A, owners: [B, C],
                     keys: { [A]: { wallets: ["github:inst/keys", "github:jane/keys"] }, [B]: { wallets: ["github:inst/keys"] },
                             wallet: "github:all/keys" } };
  assert.deepEqual(walletChoices(settings, ["github:me/keys", "github:jane/keys", "not a wallet"]), [
    { wallet: "github:inst/keys", hinted: [A, B], given: false },
    { wallet: "github:jane/keys", hinted: [A], given: true },
    { wallet: "github:me/keys", hinted: [], given: true },
  ]);
  // the forms of the draft, one wallet for the archive, are no longer read
  assert.deepEqual(walletChoices({ owner: A, keys: "github:old/keys" }), []);
  assert.deepEqual(walletChoices({ owner: A, keys: { wallet: "github:old/keys" } }), []);
});

test("the keys held add up across wallets, each owner with the wallet it was unlocked from", () => {
  const keys = new Keys();
  keys.add(A, [{ did: "did:key:a" }], "github:inst/keys");
  keys.add(B, [{ did: "did:key:b" }], "github:jane/keys");
  keys.add(B, [{ did: "did:key:b" }, { did: "did:key:c" }]);
  assert.deepEqual(keys.owners(), [A, B]);
  assert.equal(keys.of(B).length, 2);
  assert.equal(keys.wallet(B), "github:jane/keys");
  keys.forget(A);
  assert.deepEqual(keys.owners(), [B]);
  keys.forget();
  assert.deepEqual(keys.owners(), []);
});

test("the popups that unlock the owners chosen: two owners at one touch when one passkey opens both", () => {
  const lock = (...creds) => ({ kid: "k", did: "did:key:x", text: "", creds });
  const plan = unlockPlan([[A, [lock("p1"), lock("p2")]], [B, [lock("p3")]], [C, [lock("p2")]], ["d".repeat(51) + "a", [lock()]]]);
  assert.deepEqual(plan.batches.map((b) => [b.owners, b.creds]), [[[A, C], ["p2"]], [[B], ["p3"]]]);
  assert.deepEqual(plan.none, ["d".repeat(51) + "a"]);
  assert.deepEqual([...plan.batches[0].locks.keys()], [A, C]);
  assert.deepEqual(unlockPlan([]).batches, []);
});

test("one popup for two owners: the request of version 2, a secret for each, opened with the code", async () => {
  const { win, popup, open, send } = windows();
  const secrets = [new Uint8Array(32).fill(1), new Uint8Array(32).fill(2)];
  let code = null;
  const got = unlockWithPopup({ win, open, prepare: async () => ({ owners: [A, B], creds: [cred] }), askCode: async () => code });
  await send({ type: "opensheaf-unlock-ready" });
  const { message } = popup.posted[0];
  assert.deepEqual(Object.keys(message).sort(), ["cred", "owners", "pk", "state", "type", "v"]);
  assert.equal(message.owners, `${A},${B}`);
  code = await core.confirmationCode(message.state, Buffer.from(message.pk, "base64url"));
  const sealed = [{ owner: A, ...(await seal(secrets[0], message.pk, message.state, "popup", A)) },
                  { owner: B, ...(await seal(secrets[1], message.pk, message.state, "popup", B)) }];
  await send({ type: "opensheaf-unlock-answer", v: 2, state: message.state, cred, sealed });
  assert.deepEqual(await got, { cred, secrets: [[A, secrets[0]], [B, secrets[1]]] });
  // a page that answers as for one owner only is refused
  const w = windows();
  const q = unlockWithPopup({ win: w.win, open: w.open, prepare: async () => ({ owners: [A, B], creds: [cred] }),
                             askCode: async () => code }).then(() => null, (e) => e);
  await w.send({ type: "opensheaf-unlock-ready" });
  const m = w.popup.posted[0].message;
  await w.send({ type: "opensheaf-unlock-answer", state: m.state, cred, ...(await seal(secrets[0], m.pk, m.state, "popup", A)) });
  assert.match(String(await q), /did not answer for every owner/);
});

test("a batch unlocked: the locks of each owner opened with its own secret, the secrets wiped", async () => {
  const { win, popup, open, send } = windows();
  const secret = new Uint8Array(32).fill(5);
  // locks of another passkey: opened by none (the keys themselves are tested in opensheaf-js)
  const batch = { owners: [A], creds: [cred], locks: new Map([[A, [{ kid: "k", did: "did:key:x", text: "", creds: ["other"] }]]]) };
  let code = null;
  const got = unlockBatch({ win, open, prepare: async () => batch, askCode: async () => code });
  await send({ type: "opensheaf-unlock-ready" });
  const { message } = popup.posted[0];
  assert.equal(message.owner, A);
  assert.equal(message.v, undefined);
  code = await core.confirmationCode(message.state, Buffer.from(message.pk, "base64url"));
  await send({ type: "opensheaf-unlock-answer", state: message.state, cred,
               ...(await seal(secret, message.pk, message.state, "popup", A)) });
  const keys = await got;
  assert.deepEqual([...keys.entries()], [[A, []]]);
});

const line = (label, name, o) => ({ label, name: name.repeat(52).slice(0, 52), owner: o, kind: "document" });

test("branches listed under their lines; where a new version by another owner goes", () => {
  const first = line("first", "f", A), kept = line("first-jane", "f", B), deeper = line("first-c", "g", C);
  const other = line("other", "o", A), mine = line("mine", "m", B);
  const parents = new Map([["first", null], ["first-jane", { name: first.name, owner: A }],
                           ["first-c", { name: kept.name, owner: B }], ["other", null], ["mine", null]]);
  const parentOf = (o) => parents.get(o.label);
  const docs = [deeper, other, kept, first, mine];
  assert.deepEqual(grouped(docs, parentOf).map((x) => [x.line.label, x.depth]),
                   [["other", 0], ["first", 0], ["first-jane", 1], ["first-c", 2], ["mine", 0]]);
  assert.deepEqual(continuation(first, A, docs, parentOf), { kind: "own", label: "first", known: true });
  assert.deepEqual(continuation(first, B, docs, parentOf), { kind: "branch", label: "first-jane", known: true });
  assert.deepEqual(continuation(other, B, docs, parentOf), { kind: "new", label: "", known: true });
  // the originator continuing a branch of its work: its own line
  assert.deepEqual(continuation(deeper, A, docs, parentOf, A), { kind: "originator", label: "first", known: true });
  assert.deepEqual(continuation(mine, A, docs, parentOf, B).kind, "new");
  assert.equal(continuation(line("x", "x", B), A, [line("x", "x", B)], () => null, A).kind, "refused");
  // parents not read yet: the archive decides
  assert.equal(continuation(other, C, docs, (o) => (o.label === "mine" ? undefined : parentOf(o))).known, false);
});

test("the label proposed for a branch", () => {
  assert.equal(branchLabel("kpz-uniqueness", "jane", new Set()), "kpz-uniqueness-jane");
  assert.equal(branchLabel("kpz-uniqueness", "Jane Doe", new Set(["kpz-uniqueness-jane-doe"])), "kpz-uniqueness-jane-doe-2");
  const long = branchLabel("a".repeat(64), "bcdefghi", new Set());
  assert.ok(long.length <= 64 && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(long) && long.endsWith("-bcdefghi"), long);
});
