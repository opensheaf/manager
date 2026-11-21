// Writing directly (direct.js): the popup of the passkey, against a double of
// the unlock page's window (which seals as the unlock page does), and the
// wallet named; the request itself is tested in opensheaf-js
// (tests/github.test.js), and live by tools/live-test.mjs.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as core from "../vendor/opensheaf-manager.js";
import { unlockWithPopup, walletName, walletHinted, locksOf, Keys, github } from "../direct.js";

import { seal, windows, owner, cred } from "./popup-double.mjs";

test("the popup: opened at once, the request to the unlock page only, the answer opened with the code", async () => {
  const { win, popup, open, send, listeners } = windows();
  const secret = new Uint8Array(32).fill(3);
  let prepared = false;
  let code = null;
  const got = unlockWithPopup({ win, open, prepare: async () => { prepared = true; return { owner, creds: [cred] }; },
                                askCode: async () => code });
  assert.deepEqual(win.opened, ["https://unlock.opensheaf.org/#mode=popup&origin=https%3A%2F%2Fmanager.opensheaf.org"]);
  await send({ type: "opensheaf-unlock-ready" }, { origin: "https://evil.example" });
  assert.deepEqual(popup.posted, []);
  await send({ type: "opensheaf-unlock-ready" });
  assert.ok(prepared);
  assert.equal(popup.posted.length, 1);
  const { message, origin } = popup.posted[0];
  assert.equal(origin, "https://unlock.opensheaf.org");
  assert.deepEqual(Object.keys(message).sort(), ["cred", "owner", "pk", "state", "type"]);
  assert.equal(message.cred, cred);
  code = (await core.confirmationCode(message.state, Buffer.from(message.pk, "base64url"))).replace(" ", "");
  const answer = { type: "opensheaf-unlock-answer", state: message.state, cred, ...(await seal(secret, message.pk, message.state, "popup")) };
  await send(answer, { source: {} });
  await send(answer);
  assert.deepEqual(await got, [cred, secret]);
  assert.deepEqual(popup.posted[1], { message: { type: "opensheaf-unlock-done" }, origin: "https://unlock.opensheaf.org" });
  assert.equal(listeners.size, 0);
});

test("the popup: a wrong code, an answer for osheaf, a refusal, a blocked or closed window", async () => {
  const secret = new Uint8Array(32).fill(4);
  for (const [mode, typed, error, pattern] of [["popup", "000000", null, /code typed is not/], ["unlock", null, null, /damaged/],
                                               [null, null, "the user did not unlock", /the page says: the user did not unlock/]]) {
    const { win, popup, open, send } = windows();
    let code = typed;
    const got = unlockWithPopup({ win, open, prepare: async () => ({ owner, creds: [cred] }), askCode: async () => code });
    const failed = got.then(() => null, (e) => e);
    await send({ type: "opensheaf-unlock-ready" });
    const { message } = popup.posted[0];
    code ??= (await core.confirmationCode(message.state, Buffer.from(message.pk, "base64url")));
    const answer = error ? { type: "opensheaf-unlock-answer", state: message.state, error }
      : { type: "opensheaf-unlock-answer", state: message.state, cred, ...(await seal(secret, message.pk, message.state, mode)) };
    await send(answer);
    assert.match(String(await failed), pattern);
    assert.ok(popup.closed);
  }
  const blocked = windows();
  await assert.rejects(unlockWithPopup({ win: blocked.win, open: () => null, prepare: async () => ({ owner, creds: [cred] }),
                                         askCode: async () => "" }), /blocked/);
  const closed = windows();
  const p = unlockWithPopup({ win: closed.win, open: closed.open, prepare: async () => ({ owner, creds: [cred] }), askCode: async () => "" });
  closed.popup.closed = true;
  await assert.rejects(p, /was closed/);
  const failing = windows();
  const q = unlockWithPopup({ win: failing.win, open: failing.open, askCode: async () => "",
                              prepare: async () => { throw new Error("no wallet"); } }).then(() => null, (e) => e);
  await failing.send({ type: "opensheaf-unlock-ready" });
  assert.match(String(await q), /no wallet/);
  assert.ok(failing.popup.closed);
});

test("the wallet: named by the archive, or by the person", () => {
  assert.equal(walletName({ keys: "github:jane/keys" }), "github:jane/keys");
  assert.equal(walletName({ keys: { wallet: "github:jane/keys" } }, "github:other/x"), "github:jane/keys");
  assert.equal(walletName({}, "github:jane/my-keys"), "github:jane/my-keys");
  assert.equal(walletName({ keys: "command" }, "offline"), "");
  assert.equal(walletName({}, "github:../x"), "");
  // the hints of osheaf.json for the owner, before the one given; a hint for every owner after the owner's own
  const o = "a".repeat(52), p = "b".repeat(52);
  const settings = { owner: o, keys: { [o]: { wallets: ["github:jane/keys", "github:inst/keys"] }, wallet: "github:all/keys" } };
  assert.equal(walletName(settings, "github:other/x"), "github:jane/keys");
  assert.equal(walletName(settings, "", p), "github:all/keys");
  assert.equal(walletName({ owner: o, keys: { [p]: { wallets: ["github:p/keys"] } } }, "github:mine/keys"), "github:mine/keys");
  assert.equal(walletHinted(settings), true);
  assert.equal(walletHinted({ owner: o, keys: { [p]: { wallet: "github:p/keys" } } }), false);
});

test("a wallet this sign-in cannot read is said so", async () => {
  const fetchImpl = async (url) => new Response(JSON.stringify({ message: "Not Found" }), { status: 404 });
  const gh = github("token", fetchImpl);
  await assert.rejects(locksOf({ gh, archiveRepo: "jane/papers", settings: { owner }, wallet: "github:jane/keys",
                                 signers: { dids: [] } }), /cannot be read with this sign-in.*install the OpenSheaf app/);
  await assert.rejects(locksOf({ gh, archiveRepo: "jane/papers", settings: { owner }, wallet: "github:jane/papers",
                                 signers: { dids: [] } }), /archive/);
  const keys = new Keys();
  keys.add(owner, [{ did: "did:key:a" }, { did: "did:key:a" }, { did: "did:key:b" }]);
  assert.equal(keys.of(owner).length, 2);
  keys.forget();
  assert.equal(keys.of(owner).length, 0);
});

test("the popup's failures: said when its window is closed, from the popup only; its final answer says why", async () => {
  const w = windows();
  const p = unlockWithPopup({ win: w.win, open: w.open, mode: core.POPUP_ENROLL, prepare: async () => ({ owner, creds: [] }),
                             askCode: async () => "" }).then(() => null, (e) => e);
  await w.send({ type: "opensheaf-unlock-ready" });
  const { message } = w.popup.posted[0];
  await w.send({ type: "opensheaf-unlock-status", state: message.state, error: "from elsewhere" }, { origin: "https://evil.example" });
  await w.send({ type: "opensheaf-unlock-status", state: message.state, error: "from another window" }, { source: {} });
  await w.send({ type: "opensheaf-unlock-status", state: message.state, error: "NotAllowedError: not allowed." });
  w.popup.closed = true;
  assert.match(String(await p), /the window of the passkey was closed after: NotAllowedError: not allowed\.$/);
  // the popup's own final answer, as it goes
  const v = windows();
  const q = unlockWithPopup({ win: v.win, open: v.open, prepare: async () => ({ owner, creds: [cred] }), askCode: async () => "" })
    .then(() => null, (e) => e);
  await v.send({ type: "opensheaf-unlock-ready" });
  await v.send({ type: "opensheaf-unlock-answer", state: v.popup.posted[0].message.state,
                 error: "the window was closed after: InvalidStateError: excluded" });
  assert.match(String(await q), /the window was closed after: InvalidStateError: excluded/);
});

test("a request that cannot be prepared ends with its own error, not as a window closed", async () => {
  const w = windows();
  const p = unlockWithPopup({ win: w.win, open: w.open, askCode: async () => "",
                             prepare: async () => { throw new Error("the wallet's passphrase does not open the keys"); } });
  await assert.rejects(p, /the wallet's passphrase does not open the keys/);
  assert.ok(w.popup.closed);
  assert.equal(w.listeners.size, 0);
});
