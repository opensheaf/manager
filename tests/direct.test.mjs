// Writing directly (direct.js): the popup of the passkey, against a double of
// the unlock page's window (which seals as the unlock page does), and the
// wallet named; the request itself is tested in opensheaf-js
// (tests/github.test.js), and live by tools/live-test.mjs.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as core from "../vendor/opensheaf-manager.js";
import { unlockWithPopup, walletName, locksOf, Keys, github } from "../direct.js";

const owner = "a".repeat(52);
const cred = "Y3JlZGVudGlhbC1vZi10aGUtdGVzdHM";
const subtle = globalThis.crypto.subtle;
const enc = new TextEncoder();
const b64url = (bytes) => Buffer.from(bytes).toString("base64url");

// The unlock page's sealing (unlock-core.js), written again here.
async function seal(secret, pkText, state, mode) {
  const eph = await subtle.generateKey({ name: "X25519" }, true, ["deriveBits"]);
  const pk = Buffer.from(pkText, "base64url");
  const peer = await subtle.importKey("raw", pk, { name: "X25519" }, false, []);
  const shared = await subtle.deriveBits({ name: "X25519", public: peer }, eph.privateKey, 256);
  const ikm = await subtle.importKey("raw", shared, "HKDF", false, ["deriveBits"]);
  const both = new Uint8Array(await subtle.deriveBits({ name: "HKDF", hash: "SHA-256", salt: enc.encode(state),
                                                        info: enc.encode("opensheaf unlock hand-off v2") }, ikm, 512));
  const ct = secret.map((b, i) => b ^ both[i]);
  const epk = new Uint8Array(await subtle.exportKey("raw", eph.publicKey));
  const mac = await subtle.importKey("raw", both.slice(32), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const aad = enc.encode(`${mode}|${owner}|${cred}|${pkText}|${b64url(epk)}`);
  const tag = new Uint8Array(await subtle.sign("HMAC", mac, new Uint8Array([...aad, ...ct])));
  return { epk: b64url(epk), ct: b64url(ct), tag: b64url(tag) };
}

// The manager's window and the popup: what each posts, to which origin.
function windows() {
  const listeners = new Set();
  const popup = { posted: [], closed: false, postMessage(message, origin) { this.posted.push({ message, origin }); },
                  close() { this.closed = true; } };
  const win = { location: { origin: "https://opensheaf.org" }, opened: [],
                addEventListener: (t, f) => listeners.add(f), removeEventListener: (t, f) => listeners.delete(f) };
  const open = (url) => { win.opened.push(url); return popup; };
  const send = async (data, { origin = core.UNLOCK_ORIGIN, source = popup } = {}) => {
    for (const f of [...listeners]) await f({ data, origin, source });
    await new Promise((r) => setTimeout(r, 5));
  };
  return { win, popup, open, send, listeners };
}

test("the popup: opened at once, the request to the unlock page only, the answer opened with the code", async () => {
  const { win, popup, open, send, listeners } = windows();
  const secret = new Uint8Array(32).fill(3);
  let prepared = false;
  let code = null;
  const got = unlockWithPopup({ win, open, prepare: async () => { prepared = true; return { owner, creds: [cred] }; },
                                askCode: async () => code });
  assert.deepEqual(win.opened, ["https://unlock.opensheaf.org/#mode=popup&origin=https%3A%2F%2Fopensheaf.org"]);
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
