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
//
// Setting up a wallet (setupState, pushCurrentKey, enrollPasskey): the
// person creates the private repository and installs the OpenSheaf app on
// it; the page puts the owner's current key there, locked with the
// passphrase, as osheaf key push does, and adds a passkey's lock to the
// keys there, as osheaf key enroll does, the passkey created (or used) in
// the popup of unlock.opensheaf.org; the files are those of osheaf.
//
// Or, when the current key is not at hand (prepareNewKey, commitNewKey,
// putNewKey): a new current key made in the page, added to the owner's key
// log by a new version signed by the owner's rotation keys (given as the
// files osheaf exported, or kept in the wallet), as osheaf owner rotate
// --add does; the version committed to the archive, the key then put in the
// wallet as osheaf key push puts it. The keys are in this page's memory
// only, their seeds wiped once used.

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
// Gives [cred, secret], the secret of the passkey (32 bytes). MODE is
// core.POPUP (unlock with one of creds) or core.POPUP_ENROLL (create a
// passkey, creds excluded).
export function unlockWithPopup({ prepare, askCode, win = window, open = null, timeout = 5 * 60_000, mode = core.POPUP }) {
  const popup = (open || ((url) => win.open(url, "opensheaf-unlock", POPUP_FEATURES)))(core.popupUrl(win.location.origin, mode));
  if (!popup) return Promise.reject(new core.UnlockFailed("the browser blocked the window of the passkey: allow pop-ups for this page"));
  const request = Promise.resolve().then(prepare).then(({ owner, creds }) => core.popupRequest(owner, creds, null, null, mode));
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

// --- setting up a key wallet --------------------------------------------------

// The page to create the wallet's repository, filled in (GitHub's documented
// query parameters: owner, name, description, visibility).
export function newRepositoryUrl(wallet) {
  const [owner, name] = wallet.slice("github:".length).split("/");
  const q = new URLSearchParams({ owner, name, visibility: "private",
    description: "Key wallet of OpenSheaf owners (private: keys locked with a passphrase and passkeys)" });
  return `https://github.com/new?${q.toString()}`;
}

function walletOf(gh, archiveRepo, wallet) {
  return new core.GitHubWallet(wallet.slice("github:".length), { api: gh.api, fetch: gh.fetch, token: async () =>
    (typeof gh.token === "function" ? gh.token() : gh.token) }, [archiveRepo]);
}

// Where the setup stands: the wallet checked (private, not the archive's,
// readable and writable with this sign-in), the owner's keys there, which
// current keys of the key log are there, and the passkeys that open them.
// { wallet: GitHubWallet, entries, there: [did], missing: [did], enrolled:
// [did], confirm: whether the passphrase is new (asked twice), plans: what
// enrolling would do, with the passkey enrolled or with a new one (null when
// no key there is locked with a passphrase) }.
export async function setupState({ gh, archiveRepo, settings, wallet, signers }) {
  const w = walletOf(gh, archiveRepo, wallet);
  await core.checkWallet(w);
  const entries = await core.walletEntries(w, settings.owner);
  const current = entries.filter((e) => e.fields.kind === "current");
  const there = signers.dids.filter((d) => current.some((e) => e.fields.key === d));
  const locks = await core.walletLocks(w, settings.owner, signers.dids);
  const plan = async (newPasskey) => {
    try {
      return await core.enrollPlan(w, settings.owner, { newPasskey, entries });
    } catch (e) {
      if (e instanceof core.WalletError) return null;
      throw e;
    }
  };
  const rotation = core.walletRotationKeys(entries, signers.next || []);
  return { wallet: w, entries, there, missing: signers.dids.filter((d) => !there.includes(d)),
           enrolled: locks.filter((l) => l.creds.length).map((l) => l.did), confirm: core.passphraseConfirmed(entries),
           plans: { enrolled: await plan(false), fresh: await plan(true) },
           rotationInWallet: signers.nextThreshold > 0 && rotation.length >= signers.nextThreshold };
}

// The current key given as text (the file OWNER/K.key of osheaf's key store,
// or the text of osheaf key export), put in the wallet locked with the
// passphrase, as osheaf key push puts it; its seed wiped after. Gives the
// key's did:key and whether it was put (false: it was there already).
export async function pushCurrentKey({ state, settings, signers, keyText, passphrase }) {
  await core.checkPassphrase(state.entries, passphrase, settings.owner, state.wallet.name);
  const key = await core.keyToPush(keyText, { owner: settings.owner, dids: signers.dids });
  try {
    const put = await core.pushKey(state.wallet, settings.owner, key, signers.versions?.[key.did] ?? null, passphrase);
    return { did: key.did, put };
  } finally {
    key.seed.fill(0);
  }
}

// A passkey's lock added to the owner's keys in the wallet, as osheaf key
// enroll adds it: the keys opened with the passphrase first; a passkey
// created in the popup (mode popup-enroll) when none is enrolled, or with
// newPasskey; else the passkey enrolled already, unlocked in the popup. The
// popup is opened at once, in the click (the plan is setupState's), and the
// keys are opened with the passphrase meanwhile: a wrong passphrase closes
// it, and changes nothing. Gives [[kind, did], ...], the keys that got the
// lock ([] if none needed it).
export async function enrollPasskey({ state, settings, passphrase, askCode, win, open, newPasskey = false }) {
  const plan = newPasskey ? state.plans.fresh : state.plans.enrolled;
  if (!plan) throw new core.WalletError(`the wallet ${state.wallet.name} holds no key of the owner locked with a passphrase`);
  if (!plan.todo.length) return [];
  const [cred, secret] = await unlockWithPopup({
    win, open, askCode, mode: plan.fresh ? core.POPUP_ENROLL : core.POPUP,
    prepare: async () => {
      await core.openWithPassphrase(plan, passphrase, state.wallet.name);
      return { owner: settings.owner, creds: plan.known };
    },
  });
  try {
    return await core.enrollPasskey(state.wallet, plan, passphrase, cred, secret);
  } finally {
    secret.fill(0);
  }
}

// --- a new current key, made in the page ----------------------------------------

// The first part: the passphrase checked against the keys of the wallet;
// the rotation keys that sign read (SOURCE "files": FILES [{ name, text }],
// locked with FILESPASSPHRASE or the passphrase, or in clear; "wallet": the
// wallet's, opened with the passphrase) and kept unexportable; the new
// current key and the new rotation keys made. For files, the new rotation
// keys are written as osheaf owner rotate --export writes them, locked with
// the same passphrase, and their seeds wiped: the person saves them, and
// types their checks, before anything is committed. Gives what commitNewKey
// takes; forgetNewKey wipes it.
export async function prepareNewKey({ state, settings, signers, source, files = [], passphrase, filesPassphrase = "" }) {
  if (!signers.number || !signers.next || !signers.next.length) {
    throw new core.OwnerError("the owner's key log takes no new version (it has ended, or commits no rotation key)");
  }
  await core.checkPassphrase(state.entries, passphrase, settings.owner, state.wallet.name);
  const plan = { owner: settings.owner, number: signers.number, next: [...signers.next], nextThreshold: signers.nextThreshold };
  const signing = source === "wallet" ? await core.rotationKeysFromWallet(state.wallet, plan, passphrase)
    : await core.rotationKeysFromTexts(files, plan, filesPassphrase || passphrase);
  const made = await core.newKeys(plan);
  const pending = { plan, source, signing, current: made.current, passphrase, version: plan.number + 1,
                    next: made.rotation.map((k) => k.digest), rotation: null, files: null, committed: null };
  try {
    if (source === "wallet") pending.rotation = made.rotation;
    else pending.files = await core.rotationFiles(made.rotation, settings.owner, pending.version, filesPassphrase || passphrase);
  } catch (e) {
    for (const k of made.rotation) k.seed.fill(0);
    forgetNewKey(pending);
    throw e;
  }
  return pending;
}

// The second part: for files, the checks typed (TYPED, in the order of
// pending.files) must be theirs; for the wallet, the new rotation keys are
// put there first (nothing is committed if that fails). Then the new version
// of the key log is made on the head of the archive's branch, verified and
// committed (core.directRotate). Can be called again after a failure: what
// is done is not done twice. Gives the new version, with the commit.
export async function commitNewKey({ gh, repo, pending, state, settings, cache, typed = [], progress = () => {},
                                     fetchImpl = globalThis.fetch && globalThis.fetch.bind(globalThis) }) {
  if (pending.committed) return pending.committed;
  if (pending.files && !core.checksConfirmed(pending.files, typed)) {
    throw new core.KeyError("the checks typed are not those of the files: nothing was written to the key log");
  }
  if (pending.rotation) {
    progress("wallet");
    await core.keepRotationKeys(state.wallet, settings.owner, pending.rotation, pending.version, pending.passphrase);
    pending.rotation = null;
  }
  schemas ||= await core.schemasOf(core.ASSETS);
  const env = core.browserEnvironment({ assets: core.ASSETS, fetch: fetchImpl });
  const mirror = settings && /^https:\/\//.test(settings.baseUrl || "") ? settings.baseUrl : null;
  pending.committed = await core.directRotate({ repo, github: gh, env, schemas, plan: pending.plan, signers: pending.signing,
                                                add: pending.current.did, next: pending.next, mirror, cache, origin: ORIGIN,
                                                progress });
  pending.signing = null;
  pending.files = null;
  return pending.committed;
}

// The third part: the new current key put in the wallet, locked with the
// passphrase, as osheaf key push puts it; then everything wiped. If it
// fails, the key stays in memory, to try again.
export async function putNewKey({ pending, state, settings }) {
  if (!pending.committed) throw new Error("the new version of the key log is not committed yet");
  const put = await core.pushKey(state.wallet, settings.owner, pending.current, pending.committed.number, pending.passphrase);
  forgetNewKey(pending);
  return put;
}

export function forgetNewKey(pending) {
  if (!pending) return;
  if (pending.current && pending.current.seed) pending.current.seed.fill(0);
  for (const k of pending.rotation || []) if (k.seed) k.seed.fill(0);
  Object.assign(pending, { current: null, rotation: null, signing: null, files: null, passphrase: null });
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
