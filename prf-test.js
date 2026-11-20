// Feasibility test of passkey unlock (WebAuthn PRF), for `osheaf key unlock`.
// Shows and sends only a fingerprint of the derived secret, never the secret.
const $ = (id) => document.getElementById(id);
const log = (...a) => { $("log").textContent += a.join(" ") + "\n"; };
const params = new URLSearchParams(location.search);
const port = params.get("port"), state = params.get("state");
const enc = new TextEncoder();
const RP = { id: "opensheaf.org", name: "OpenSheaf" };
let fingerprint = null;

log("browser:", navigator.userAgent);
log("WebAuthn:", typeof PublicKeyCredential === "function" ? "yes" : "no");
if (port && /^\d+$/.test(port) && state) {
  $("handoff").hidden = false;
  log("opened by the test listener on port", port);
}

async function salt() {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode("opensheaf wallet unlock test")));
}

async function fp(buf) {
  const d = new Uint8Array(await crypto.subtle.digest("SHA-256", buf));
  return Array.from(d.slice(0, 8), (b) => b.toString(16).padStart(2, "0")).join("");
}

$("create").onclick = async () => {
  try {
    const cred = await navigator.credentials.create({ publicKey: {
      rp: RP,
      user: { id: crypto.getRandomValues(new Uint8Array(16)), name: "OpenSheaf test", displayName: "OpenSheaf test" },
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      pubKeyCredParams: [{ type: "public-key", alg: -7 }, { type: "public-key", alg: -257 }],
      authenticatorSelection: { residentKey: "required", userVerification: "required" },
      extensions: { prf: { eval: { first: await salt() } } },
    } });
    const prf = cred.getClientExtensionResults().prf;
    log("1. passkey created; prf enabled:", prf && prf.enabled,
        "; secret at creation:", prf && prf.results ? "yes, fingerprint " + await fp(prf.results.first) : "no");
  } catch (e) { log("1. failed:", e.name, e.message); }
};

async function derive(step) {
  try {
    const a = await navigator.credentials.get({ publicKey: {
      rpId: RP.id,
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      userVerification: "required",
      extensions: { prf: { eval: { first: await salt() } } },
    } });
    const prf = a.getClientExtensionResults().prf;
    if (!prf || !prf.results) { log(step, "no PRF result: this browser or passkey does not support PRF"); return; }
    const f = await fp(prf.results.first);
    log(step, "secret derived, fingerprint", f, fingerprint && f === fingerprint ? "(same as before)" : "");
    fingerprint = f;
  } catch (e) { log(step, "failed:", e.name, e.message); }
}
$("get").onclick = () => derive("2.");
$("again").onclick = () => derive("3.");

const callback = () => `http://127.0.0.1:${port}/callback`;
const ready = () => { if (!fingerprint) { log("derive the secret first (2.)"); return false; } return true; };

$("fetch").onclick = async () => {
  if (!ready()) return;
  try {
    const r = await fetch(callback(), { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, fp: fingerprint, via: "fetch" }), targetAddressSpace: "local" });
    log("4. fetch:", r.status, await r.text());
  } catch (e) { log("4. fetch failed:", e.name, e.message); }
};
$("form").onclick = () => {
  if (!ready()) return;
  const f = $("post");
  f.action = callback();
  f.state.value = state;
  f.fp.value = fingerprint;
  f.submit();
};
$("redirect").onclick = () => {
  if (!ready()) return;
  location.href = `${callback()}?state=${encodeURIComponent(state)}&fp=${fingerprint}&via=redirect`;
};
