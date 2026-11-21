// Doubles of the unlock page's sealing and of the windows of the manager and
// of its popup, for the tests of direct.js.
import * as core from "../vendor/opensheaf-manager.js";

export const owner = "a".repeat(52);
export const cred = "Y3JlZGVudGlhbC1vZi10aGUtdGVzdHM";
const subtle = globalThis.crypto.subtle;
const enc = new TextEncoder();
const b64url = (bytes) => Buffer.from(bytes).toString("base64url");

// The unlock page's sealing (unlock-core.js), written again here.
export async function seal(secret, pkText, state, mode) {
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
export function windows() {
  const listeners = new Set();
  const popup = { posted: [], closed: false, postMessage(message, origin) { this.posted.push({ message, origin }); },
                  close() { this.closed = true; } };
  const win = { location: { origin: "https://manager.opensheaf.org" }, opened: [],
                addEventListener: (t, f) => listeners.add(f), removeEventListener: (t, f) => listeners.delete(f) };
  const open = (url) => { win.opened.push(url); return popup; };
  const send = async (data, { origin = core.UNLOCK_ORIGIN, source = popup } = {}) => {
    for (const f of [...listeners]) await f({ data, origin, source });
    await new Promise((r) => setTimeout(r, 5));
  };
  return { win, popup, open, send, listeners };
}

