// The page of passkey unlock (see unlock-core.js): it explains what osheaf
// asks, waits for a click, calls WebAuthn, and posts the answer to osheaf on
// 127.0.0.1 as a form. Nothing else is sent anywhere.
import { parseParams, checkSalt, callbackUrl, createOptions, getOptions, prfSecret, answerFields } from "./unlock-core.js";

const $ = (id) => document.getElementById(id);

function say(id, text, kind) {
  const el = $(id);
  el.textContent = text;
  el.className = "notice" + (kind ? " " + kind : "");
  el.hidden = false;
}

function post(params, answer) {
  const form = document.createElement("form");
  form.method = "post";
  form.action = callbackUrl(params.port);
  for (const [name, value] of answerFields(params.state, answer)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.append(input);
  }
  document.body.append(form);
  form.submit();
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
    say("status", "The passkey is made. Now unlock it once, to derive its secret.");
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
    say("status", "This page was not opened by osheaf as expected, and does nothing: " + e.message, "bad");
    return;
  }
  $("owner").textContent = params.owner;
  $("what").textContent = params.mode === "enroll"
    ? "create a passkey for opensheaf.org, named after this owner, which will unlock its keys with Touch ID"
    : "unlock the keys of this owner with your passkey";
  $("go").textContent = params.mode === "enroll" ? "Create the passkey" : "Unlock";
  $("request").hidden = false;
  $("go").onclick = async () => {
    $("go").disabled = $("cancel").disabled = true;
    try {
      const answer = await run(params);
      say("status", "Done: handing the secret to osheaf on this computer…", "ok");
      post(params, answer);
    } catch (e) {
      say("status", `${e.name || "Error"}: ${e.message}. Try again, or let osheaf ask for the passphrase.`, "bad");
      $("go").disabled = $("cancel").disabled = false;
    }
  };
  $("cancel").onclick = () => post(params, { error: "the user chose the passphrase" });
}

main();
