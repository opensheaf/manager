// Writing to the archive directly: the request is carried out in this page
// by opensheaf-js (vendor/opensheaf-manager.js, the bundle of its
// web/manager.js), exactly as the archive's workflow carries it out with
// opensheaf-py, signed here with the owner's current keys, and committed to
// the repository's branch as one commit with the person's GitHub sign-in.
// No workflow runs for it; GitHub Pages then publishes the commit.
//
// The keys: the owner's current keys are kept in a key wallet, a private
// GitHub repository (osheaf key push), each locked with the passphrase and
// the owner's passkeys. The passkeys belong to https://unlock.opensheaf.org,
// which this page opens in a popup (unlockWithPopup): the popup asks for the
// passkey and seals its secret to a one-time key of this page; the person
// types the code the popup shows here, and the page opens the seal, then the
// keys. The keys are kept in this page's memory only, as WebCrypto keys that
// cannot be exported, until the page is closed or the person locks them;
// they are never written to the browser's storage.

import * as core from "./vendor/opensheaf-manager.js";

export const ORIGIN = "the OpenSheaf manager";
export const POPUP_FEATURES = "popup,width=520,height=760";

// The keys this page holds, by owner.
export class Keys {
  constructor() { this.byOwner = new Map(); }
  add(owner, keys) {
    const held = this.byOwner.get(owner) || [];
    for (const k of keys) if (!held.some((h) => h.did === k.did)) held.push(k);
    this.byOwner.set(owner, held);
  }
  of(owner) { return this.byOwner.get(owner) || []; }
  forget() { this.byOwner.clear(); }
}

// The GitHub API for the core, with the session's token (a function, renewed
// by session.js).
export function github(token, fetchImpl = globalThis.fetch && globalThis.fetch.bind(globalThis)) {
  return new core.GitHub({ token, fetch: fetchImpl });
}

// The wallet of the owner's keys: "keys" of the archive's osheaf.json when it
// names a GitHub wallet, else the one the person gave (kept in this browser:
// a name, not a secret). Only GitHub wallets can be read from a page.
export function walletName(settings, given = "") {
  const k = settings && settings.keys;
  const named = typeof k === "string" ? k : k && typeof k === "object" ? String(k.wallet || "") : "";
  const name = (named.startsWith("github:") ? named : String(given || "")).trim();
  return /^github:[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/.test(name) ? name : "";
}

// The current keys of the archive's owner that may sign now, and their locks
// in the wallet, with the passkeys that open them.
export async function locksOf({ gh, archiveRepo, settings, wallet, signers }) {
  if (!wallet) throw new Error("name the key wallet of the owner (github:OWNER/REPOSITORY)");
  const repo = wallet.slice("github:".length);
  const w = new core.GitHubWallet(repo, { api: gh.api, fetch: gh.fetch, token: async () =>
    (typeof gh.token === "function" ? gh.token() : gh.token) }, [archiveRepo]);
  w.checkName();
  let locks;
  try {
    if ((await w.api("GET", `repos/${repo}`)) === null) throw new Error("not found");
    locks = await core.walletLocks(w, settings.owner, signers.dids);
  } catch (e) {
    throw new Error(`the key wallet ${wallet} cannot be read with this sign-in (${e.message}): install the ` +
                    "OpenSheaf app on that repository too (the manager only reads it), or sign in with a token " +
                    "that can read it");
  }
  if (!locks.length) {
    throw new Error(`the key wallet ${wallet} holds no current key of the owner that its key log lists now ` +
                    "(osheaf key push puts them there)");
  }
  return locks;
}

// The popup of the unlock page. It is opened at once, in the click that asks
// for it (a browser opens popups only then), and the request is prepared
// meanwhile: prepare() gives { owner, creds }. The page says it is ready; the
// request goes to it, to its origin only; its answer is taken from it only,
// from its origin only; the person types the code the popup shows
// (askCode), and the answer is opened with the code of this request only.
// Gives [cred, secret], the secret of the passkey (32 bytes).
export function unlockWithPopup({ prepare, askCode, win = window, open = null, timeout = 5 * 60_000 }) {
  const popup = (open || ((url) => win.open(url, "opensheaf-unlock", POPUP_FEATURES)))(core.popupUrl(win.location.origin));
  if (!popup) return Promise.reject(new core.UnlockFailed("the browser blocked the window of the passkey: allow pop-ups for this page"));
  const request = Promise.resolve().then(prepare).then(({ owner, creds }) => core.popupRequest(owner, creds));
  request.catch(() => { try { popup.close(); } catch (_) { /* gone */ } });
  return new Promise((resolve, reject) => {
    let answered = false;
    const finish = (error, value) => {
      win.removeEventListener("message", onMessage);
      clearInterval(watch);
      clearTimeout(timer);
      if (error) {
        try { popup.close(); } catch (_) { /* gone */ }
        reject(error);
      } else resolve(value);
    };
    const onMessage = async (event) => {
      if (event.origin !== core.UNLOCK_ORIGIN || event.source !== popup) return;
      const data = event.data || {};
      if (data.type === core.POPUP_MESSAGES.ready) {
        try {
          popup.postMessage((await request).message, core.UNLOCK_ORIGIN);
        } catch (e) { finish(e); }
      } else if (data.type === core.POPUP_MESSAGES.answer && !answered) {
        answered = true;
        try {
          const req = await request;
          const typed = typeof data.error === "string" ? "" : await askCode();
          const got = await core.openPopupAnswer(req, data, typed);
          req.pair = null;
          popup.postMessage({ type: core.POPUP_MESSAGES.done }, core.UNLOCK_ORIGIN);
          finish(null, got);
        } catch (e) { finish(e); }
      }
    };
    win.addEventListener("message", onMessage);
    const watch = setInterval(() => {
      if (popup.closed && !answered) finish(new core.UnlockFailed("the window of the passkey was closed"));
    }, 500);
    const timer = setTimeout(() => finish(new core.UnlockFailed("no answer from the window of the passkey in time")), timeout);
  });
}

// Unlocking: the popup opened at once, the signers and the wallet read
// meanwhile (signers: { dids }, or a function that reads them); the keys the
// passkey's secret opens, kept unexportable; the secret then wiped.
export async function unlock({ gh, archiveRepo, settings, wallet, signers, askCode, win, open }) {
  let locks = null;
  const [cred, secret] = await unlockWithPopup({
    win, open, askCode,
    prepare: async () => {
      if (typeof signers === "function") signers = await signers();
      locks = await locksOf({ gh, archiveRepo, settings, wallet, signers });
      const creds = [...new Set(locks.flatMap((l) => l.creds))];
      if (!creds.length) {
        throw new core.UnlockFailed(`no passkey opens the keys of the owner in ${wallet}: enroll one with osheaf key enroll`);
      }
      return { owner: settings.owner, creds };
    },
  });
  try {
    return await core.openLocks(locks, settings.owner, cred, secret);
  } finally {
    secret.fill(0);
  }
}

// The signers of the archive: read from the head of its branch.
export async function signersOf({ gh, repo, cache, settings }) {
  const mirror = settings && /^https:\/\//.test(settings.baseUrl || "") ? settings.baseUrl : null;
  const storage = await core.GitHubStorage.open(repo, gh, { cache, mirror });
  return core.signers(storage, core.browserEnvironment({ assets: core.ASSETS }));
}

let schemas = null;

// A request written directly; the answer of core.carryOut, with the commit.
export async function write({ gh, repo, operation, fields, files = {}, keys, settings, cache, progress = () => {},
                              fetchImpl = globalThis.fetch && globalThis.fetch.bind(globalThis) }) {
  schemas ||= await core.schemasOf(core.ASSETS);
  const env = core.browserEnvironment({ assets: core.ASSETS, keys: keys.byOwner, fetch: fetchImpl });
  const mirror = settings && /^https:\/\//.test(settings.baseUrl || "") ? settings.baseUrl : null;
  return core.directWrite({ repo, github: gh, operation, fields, files, env, schemas, mirror, cache, origin: ORIGIN,
                            progress });
}

export const { WORKFLOW_ONLY } = core;
