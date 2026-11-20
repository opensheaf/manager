import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { parseParams, checkSalt, expectedSalt, callbackUrl, createOptions, getOptions, prfSecret, answerUrl,
         seal, shortName, x25519Available, b64urlEncode, b64urlDecode } from "../unlock-core.js";

const owner = "em4v3kp5btra7jlggxhvl5y6uluymzk2ezcdjg4pnptnk5tygora";
const salt = b64urlEncode(createHash("sha256").update("opensheaf wallet unlock v1 " + owner).digest());
const cred = b64urlEncode(new Uint8Array(20).fill(7));
const state = "Zaz8C5ywR4VKbNOX7dQHUg";
const pk = "EDUGNAoWiXZye3oZT1uexqCDj6g-_pOiwL6N01HzQX0";
const query = (o) => "?" + new URLSearchParams(o).toString();
const unlock = { mode: "unlock", port: "49992", state, pk, owner, salt, cred };

// The test vector of the hand-off, the same as in tests/test_wallets.py of
// opensheaf-py (HAND_OFF), which plays the side of osheaf.
const HAND_OFF = {
  sk: "3MnQ1WVJ9j-gIHW04onidnPAdXBkj8Ex38awjc_xIFU", pk: "EDUGNAoWiXZye3oZT1uexqCDj6g-_pOiwL6N01HzQX0",
  esk: "XsIioGnOBETGr9GuOkvzh0s9Mnee8lz8KkfLHClLxGc", epk: "wz_hpV5NNJh92Eqb4TE6dA7IVbA2LrWBmV8GisGgjBE",
  state: "Zaz8C5ywR4VKbNOX7dQHUg", secret: "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8",
  ct: "zFOj0v4rRRRpaSyM_xRgRRWo-SH_pdvdYHDVc--it4k",
};

test("base64url both ways", () => {
  const b = Uint8Array.from({ length: 33 }, (_, i) => i * 7);
  assert.deepEqual(b64urlDecode(b64urlEncode(b)), b);
  assert.throws(() => b64urlDecode("a+b/"));
});

test("a request of osheaf is read", async () => {
  const p = parseParams(query(unlock));
  assert.equal(p.mode, "unlock");
  assert.equal(p.port, 49992);
  assert.deepEqual(p.credIds, [cred]);
  assert.equal(p.creds[0].length, 20);
  await checkSalt(p);
  assert.equal(b64urlEncode(p.pk), pk);
  const e = parseParams(query({ mode: "enroll", port: "1024", state, pk, owner, salt }));
  assert.deepEqual(e.creds, []);
  assert.deepEqual(parseParams(query({ ...unlock, cred: cred + "," + cred })).creds.length, 2);
});

test("anything else is refused", async () => {
  const bad = [
    { ...unlock, mode: "steal" }, { ...unlock, port: "80" }, { ...unlock, port: "65536" }, { ...unlock, port: "8e3" },
    { ...unlock, port: "" }, { ...unlock, state: "short" }, { ...unlock, state: "x".repeat(65) },
    { ...unlock, state: "a b c d e f g h i j" }, { ...unlock, owner: owner.toUpperCase() },
    { ...unlock, owner: owner.slice(1) }, { ...unlock, salt: "AAAA" }, { ...unlock, cred: "" },
    { ...unlock, cred: "AAAA" }, { ...unlock, cred: "not base64!" }, { ...unlock, extra: "1" },
    { mode: "unlock", port: "49992", state, pk, owner, salt }, { mode: "enroll", port: "49992", state, pk, owner, salt, cred },
    { ...unlock, pk: "" }, { ...unlock, pk: "AAAA" }, { ...unlock, pk: pk + "AA" },
    { mode: "unlock", port: "49992", state, owner, salt, cred },
  ];
  for (const o of bad) assert.throws(() => parseParams(query(o)), Error, JSON.stringify(o));
  assert.throws(() => parseParams(query(unlock) + "&port=5000"), /twice/);
  const other = parseParams(query({ ...unlock, salt: b64urlEncode(new Uint8Array(32)) }));
  await assert.rejects(checkSalt(other), /salt/);
});

test("the answer goes to the listener of osheaf on 127.0.0.1 only", () => {
  assert.equal(callbackUrl(49992), "http://127.0.0.1:49992/callback");
  assert.throws(() => callbackUrl(80));
  assert.throws(() => callbackUrl("49992/../evil"));
  const epk = new Uint8Array(32).fill(1), ct = new Uint8Array(32).fill(2);
  const url = answerUrl(49992, state, { cred: new Uint8Array([1, 2, 3]), epk, ct });
  assert.equal(url, `http://127.0.0.1:49992/callback?state=${state}&epk=${b64urlEncode(epk)}&ct=${b64urlEncode(ct)}&cred=AQID`);
  assert.equal(answerUrl(49992, state, { error: "x25519-unavailable" }),
               `http://127.0.0.1:49992/callback?state=${state}&error=x25519-unavailable`);
  assert.ok(!url.includes("secret"));
});

test("the hand-off: the test vector shared with osheaf", async () => {
  const subtle = globalThis.crypto.subtle;
  assert.ok(await x25519Available());
  const v = Object.fromEntries(Object.entries(HAND_OFF).map(([k, x]) => [k, k === "state" ? x : b64urlDecode(x)]));
  assert.deepEqual(v.secret, Uint8Array.from({ length: 32 }, (_, i) => i));
  const privateKey = await subtle.importKey("jwk", { kty: "OKP", crv: "X25519", d: HAND_OFF.esk, x: HAND_OFF.epk },
                                            { name: "X25519" }, false, ["deriveBits"]);
  const publicKey = await subtle.importKey("raw", v.epk, { name: "X25519" }, true, []);
  const sealed = await seal(v.secret, v.pk, v.state, { privateKey, publicKey });
  assert.equal(b64urlEncode(sealed.epk), HAND_OFF.epk);
  assert.equal(b64urlEncode(sealed.ct), HAND_OFF.ct);
  const other = await seal(v.secret, v.pk, "another state", { privateKey, publicKey });
  assert.notEqual(b64urlEncode(other.ct), HAND_OFF.ct);
  // a new one-time key each time: another epk, another ciphertext
  const fresh = await seal(v.secret, v.pk, v.state);
  assert.equal(fresh.epk.length, 32);
  assert.notEqual(b64urlEncode(fresh.ct), HAND_OFF.ct);
  // osheaf's side, with its private key: the same pad opens it
  const sk = await subtle.importKey("jwk", { kty: "OKP", crv: "X25519", d: HAND_OFF.sk, x: HAND_OFF.pk },
                                    { name: "X25519" }, false, ["deriveBits"]);
  const back = await seal(fresh.ct, fresh.epk, v.state, { privateKey: sk, publicKey: await subtle.importKey("raw", v.pk, { name: "X25519" }, true, []) });
  assert.deepEqual(back.ct, v.secret);
});

test("short owner names", () => {
  assert.equal(shortName(owner), "em4v3kp5\u2026gora");
  assert.equal(shortName("abc"), "abc");
});

test("the WebAuthn options", async () => {
  const c = await createOptions(owner, new Uint8Array(32));
  assert.equal(c.rp.id, "opensheaf.org");
  assert.equal(c.user.name, "OpenSheaf em4v3kp5");
  assert.equal(c.user.displayName, "OpenSheaf owner " + owner);
  assert.deepEqual(c.user.id, new Uint8Array(createHash("sha256").update("opensheaf owner " + owner).digest().subarray(0, 16)));
  assert.equal(c.authenticatorSelection.residentKey, "required");
  assert.equal(c.authenticatorSelection.userVerification, "required");
  assert.ok(c.extensions.prf);
  const p = parseParams(query(unlock));
  const g = getOptions(p.salt, p.creds, new Uint8Array(32));
  assert.equal(g.rpId, "opensheaf.org");
  assert.deepEqual(g.allowCredentials, [{ type: "public-key", id: p.creds[0] }]);
  assert.deepEqual(g.extensions.prf.eval.first, await expectedSalt(owner));
});

test("the PRF secret of an assertion (WebAuthn mocked)", () => {
  const ok = { getClientExtensionResults: () => ({ prf: { results: { first: new Uint8Array(32).fill(9).buffer } } }) };
  assert.deepEqual(prfSecret(ok), new Uint8Array(32).fill(9));
  assert.throws(() => prfSecret({ getClientExtensionResults: () => ({}) }), /PRF/);
  assert.throws(() => prfSecret({ getClientExtensionResults: () => ({ prf: { results: { first: new Uint8Array(16) } } }) }));
});
