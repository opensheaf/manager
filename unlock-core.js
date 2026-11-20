// Passkey unlock for osheaf key enroll / osheaf key unlock: the parts that
// need no browser, tested with node --test. The page (unlock.html, unlock.js)
// is opened by osheaf with ?mode=enroll|unlock&port=&state=&owner=&salt=
// [&cred=id,id...]; it creates a passkey for opensheaf.org or derives the PRF
// secret of one, and posts {state, cred, secret} (or {state, error}) as a
// form to http://127.0.0.1:<port>/callback, a one-time listener of osheaf.

export const RP = { id: "opensheaf.org", name: "OpenSheaf" };
export const SALT_PREFIX = "opensheaf wallet unlock v1 ";
export const USER_ID_PREFIX = "opensheaf owner ";
const OWNER = /^[a-z2-7]{52}$/;
const STATE = /^[A-Za-z0-9_-]{16,64}$/;
const B64URL = /^[A-Za-z0-9_-]+$/;
const PARAMS = new Set(["mode", "port", "state", "owner", "salt", "cred"]);
const MAX_CREDS = 16;

export function b64urlEncode(bytes) {
  let s = "";
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function b64urlDecode(text) {
  if (typeof text !== "string" || !B64URL.test(text) || text.length % 4 === 1) throw new Error("not base64url");
  const s = atob(text.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (text.length % 4)) % 4));
  return Uint8Array.from(s, (c) => c.charCodeAt(0));
}

// The request of osheaf, from the query of the page; throws an Error that
// says what is wrong, and then the page does nothing else.
export function parseParams(search) {
  const q = new URLSearchParams(search);
  const seen = new Set();
  for (const k of q.keys()) {
    if (!PARAMS.has(k)) throw new Error(`unknown parameter: ${k}`);
    if (seen.has(k)) throw new Error(`parameter given twice: ${k}`);
    seen.add(k);
  }
  const mode = q.get("mode");
  if (mode !== "enroll" && mode !== "unlock") throw new Error("mode must be enroll or unlock");
  const port = q.get("port") || "";
  if (!/^[0-9]{4,5}$/.test(port) || +port < 1024 || +port > 65535) throw new Error("not a port of osheaf: " + port);
  const state = q.get("state") || "";
  if (!STATE.test(state)) throw new Error("not a state of osheaf");
  const owner = q.get("owner") || "";
  if (!OWNER.test(owner)) throw new Error("not an owner name");
  let salt;
  try { salt = b64urlDecode(q.get("salt") || ""); } catch (_) { salt = null; }
  if (!salt || salt.length !== 32) throw new Error("not a salt of 32 bytes");
  const credIds = q.has("cred") ? q.get("cred").split(",") : [];
  if (mode === "unlock" && credIds.length === 0) throw new Error("no passkey to unlock with");
  if (mode === "enroll" && credIds.length > 0) throw new Error("a new passkey is made without credentials");
  if (credIds.length > MAX_CREDS) throw new Error("too many passkeys");
  const creds = credIds.map((c) => {
    let b;
    try { b = b64urlDecode(c); } catch (_) { b = null; }
    if (!b || b.length < 16 || b.length > 1023) throw new Error("not a credential: " + c.slice(0, 40));
    return b;
  });
  return { mode, port: +port, state, owner, salt, credIds, creds };
}

async function sha256(subtle, text) {
  return new Uint8Array(await subtle.digest("SHA-256", new TextEncoder().encode(text)));
}

// The salt is the same for every key of an owner; osheaf sends it, and the
// page checks it, so that a link cannot have the page derive a secret for
// another salt.
export async function expectedSalt(owner, subtle = globalThis.crypto.subtle) {
  return sha256(subtle, SALT_PREFIX + owner);
}

export function sameBytes(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i];
  return d === 0;
}

export async function checkSalt(params, subtle = globalThis.crypto.subtle) {
  if (!sameBytes(params.salt, await expectedSalt(params.owner, subtle)))
    throw new Error("the salt is not that of the owner");
}

export function callbackUrl(port) {
  if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error("not a port");
  return `http://127.0.0.1:${port}/callback`;
}

// One passkey per owner on a provider: its user handle is derived from the
// owner name, so that enrolling again on the same provider replaces it.
export async function createOptions(owner, challenge, subtle = globalThis.crypto.subtle) {
  const id = (await sha256(subtle, USER_ID_PREFIX + owner)).slice(0, 16);
  return {
    rp: RP,
    user: { id, name: `OpenSheaf ${owner.slice(0, 8)}`, displayName: `OpenSheaf owner ${owner}` },
    challenge,
    pubKeyCredParams: [{ type: "public-key", alg: -7 }, { type: "public-key", alg: -257 }],
    authenticatorSelection: { residentKey: "required", requireResidentKey: true, userVerification: "required" },
    extensions: { prf: {} },
  };
}

export function getOptions(salt, creds, challenge) {
  return {
    rpId: RP.id,
    challenge,
    allowCredentials: creds.map((id) => ({ type: "public-key", id })),
    userVerification: "required",
    extensions: { prf: { eval: { first: salt } } },
  };
}

// The PRF secret of an assertion, 32 bytes, or an Error.
export function prfSecret(assertion) {
  const prf = assertion.getClientExtensionResults().prf;
  const first = prf && prf.results && prf.results.first;
  if (!first) throw new Error("this browser or passkey does not support the PRF extension");
  const bytes = new Uint8Array(first);
  if (bytes.length !== 32) throw new Error("the PRF secret is not 32 bytes");
  return bytes;
}

// The fields of the form posted to osheaf.
export function answerFields(state, { cred, secret, error }) {
  if (error !== undefined) return [["state", state], ["error", String(error).slice(0, 200)]];
  return [["state", state], ["cred", b64urlEncode(cred)], ["secret", b64urlEncode(secret)]];
}
