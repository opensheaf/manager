// The page of passkey unlock (see unlock-core.js): it explains what osheaf
// asks, waits for a click, calls WebAuthn, encrypts the secret to the
// one-time key of osheaf, and goes to osheaf on 127.0.0.1 with it. Nothing
// else is sent anywhere.
import { parseParams, checkSalt, createOptions, getOptions, prfSecret, seal, answerUrl, shortName,
         x25519Available } from "./unlock-core.js";

const $ = (id) => document.getElementById(id);

function say(text, kind) {
  const el = $("status");
  el.textContent = text;
  el.className = "notice" + (kind ? " " + kind : "");
  el.hidden = false;
}

// The steps of the page, one after the other: the current one is marked.
function step(n) {
  [...$("steps").children].forEach((li, i) => {
    li.className = i < n ? "done" : i === n ? "now" : "";
  });
}

// To osheaf on this computer; replace, so that the page of the answer does
// not lead back here.
function answer(params, a) {
  location.replace(answerUrl(params.port, params.state, a));
}

const challenge = () => crypto.getRandomValues(new Uint8Array(32));

async function derive(params, creds) {
  const assertion = await navigator.credentials.get({ publicKey: getOptions(params.salt, creds, challenge()) });
  return { cred: new Uint8Array(assertion.rawId), secret: prfSecret(assertion) };
}

async function run(params) {
  if (params.mode === "enroll") {
    const created = await navigator.credentials.create({ publicKey: await createOptions(params.owner, challenge()) });
    const prf = created.getClientExtensionResults().prf;
    if (prf && prf.enabled === false) throw new Error("this passkey does not support the PRF extension");
    say("The passkey is made. Touch ID once more, to derive its secret…");
    return derive(params, [new Uint8Array(created.rawId)]);
  }
  return derive(params, params.creds);
}

async function main() {
  let params;
  try {
    if (typeof PublicKeyCredential !== "function") throw new Error("this browser has no passkeys (WebAuthn)");
    params = parseParams(location.search);
    await checkSalt(params);
  } catch (e) {
    say("This page was not opened by osheaf as expected, and does nothing: " + e.message, "bad");
    return;
  }
  if (!(await x25519Available())) {
    say("This browser cannot hand the key to osheaf securely; use Safari 17+, Chrome 133+ or Firefox 130+, "
        + "or the passphrase. osheaf asks for the passphrase now.", "bad");
    answer(params, { error: "x25519-unavailable" });
    return;
  }
  const enroll = params.mode === "enroll";
  const owner = $("owner");
  owner.textContent = shortName(params.owner);
  owner.title = params.owner;
  $("what").textContent = enroll
    ? "create a passkey for opensheaf.org, named after this owner, which will unlock its keys with Touch ID"
    : "unlock the keys of this owner with your passkey";
  $("go").textContent = enroll ? "Create the passkey" : "Unlock";
  $("step-click").textContent = `Click ${enroll ? "Create the passkey" : "Unlock"}.`;
  $("request").hidden = false;
  step(0);
  $("go").onclick = async () => {
    $("go").disabled = $("cancel").disabled = true;
    $("status").hidden = true;
    step(1);
    try {
      const got = await run(params);
      step(2);
      const { epk, ct } = await seal(got.secret, params.pk, params.state);
      got.secret.fill(0);
      answer(params, { cred: got.cred, epk, ct });
    } catch (e) {
      step(0);
      say(`${e.name || "Error"}: ${e.message}. Try again, or let osheaf ask for the passphrase.`, "bad");
      $("go").disabled = $("cancel").disabled = false;
    }
  };
  $("cancel").onclick = () => answer(params, { error: "the user chose the passphrase" });
}

main();
