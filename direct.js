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
// The popup's status: what failed there (the unlock page's MESSAGES.status).
export const POPUP_STATUS = "opensheaf-unlock-status";
export const POPUP_FEATURES = "popup,width=520,height=760";

// The keys this page holds, by owner, with the wallet each owner's keys
// were unlocked from: owners unlocked from several wallets add up.
export class Keys {
  constructor() { this.byOwner = new Map(); this.from = new Map(); }
  add(owner, keys, wallet = "") {
    const held = this.byOwner.get(owner) || [];
    for (const k of keys) if (!held.some((h) => h.did === k.did)) held.push(k);
    this.byOwner.set(owner, held);
    if (wallet) this.from.set(owner, wallet);
  }
  of(owner) { return this.byOwner.get(owner) || []; }
  owners() { return [...this.byOwner.keys()].filter((o) => this.of(o).length); }
  wallet(owner) { return this.from.get(owner) || ""; }
  forget(owner = null) {
    if (owner) { this.byOwner.delete(owner); this.from.delete(owner); return; }
    this.byOwner.clear();
    this.from.clear();
  }
}

// --- wallets and owners ---------------------------------------------------------

// The owners the archive hosts: its default owner first, then the others of
// osheaf.json ("owners").
export function hostedOwners(settings) {
  const out = [];
  for (const o of [settings && settings.owner, ...((settings && settings.owners) || [])]) {
    if (typeof o === "string" && o && !out.includes(o)) out.push(o);
  }
  return out;
}

const WALLET_NAME = /^github:[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/;

// The wallets the page offers: those osheaf.json hints, for each owner the
// archive hosts (and for every owner), then those the person added (kept in
// this browser). Wallets and owners are many to many: each wallet with the
// owners it is hinted for, and whether the person added it.
// [{ wallet, hinted: [owner], given: bool }]
export function walletChoices(settings, given = []) {
  const out = new Map();
  const add = (w, owner, isGiven) => {
    if (typeof w !== "string" || !WALLET_NAME.test(w.trim())) return;
    w = w.trim();
    const e = out.get(w) || { wallet: w, hinted: [], given: false };
    if (owner && !e.hinted.includes(owner)) e.hinted.push(owner);
    if (isGiven) e.given = true;
    out.set(w, e);
  };
  const keys = settings && settings.keys;
  for (const o of hostedOwners(settings)) {
    // the earliest form, one wallet for the archive: a hint for every owner
    if (typeof keys === "string") add(keys, o, false);
    for (const w of core.walletHints(keys, o)) add(w, o, false);
  }
  for (const w of given) add(w, null, true);
  return [...out.values()];
}

// The owners of the archive whose keys a wallet holds, with how they are
// locked (core.ownersHeld): [{ owner, entries, locks }], in the order of
// the archive's owners. Reading needs the sign-in to reach the wallet.
export async function walletOwners({ gh, archiveRepo, wallet, settings }) {
  const w = walletOf(gh, archiveRepo, wallet);
  w.checkName();
  let held;
  try {
    if ((await w.api("GET", `repos/${w.repo}`)) === null) throw new Error("not found");
    held = await core.ownersHeld(w);
  } catch (e) {
    throw new Error(`the key wallet ${wallet} cannot be read with this sign-in (${e.message}): install the ` +
                    "OpenSheaf app on that repository too, or sign in with a token that can read it");
  }
  const hosted = hostedOwners(settings);
  return held.filter(([o]) => hosted.includes(o)).map(([owner, entries, locks]) => ({ owner, entries, locks }))
    .sort((a, b) => hosted.indexOf(a.owner) - hosted.indexOf(b.owner));
}

// The popups that unlock the owners chosen in a wallet, from their locks
// (LOCKS: [[owner, locks]], core.walletLocks): one touch unlocks two owners
// when one passkey opens both (version 2 of the popup's request), else one.
// Owners none of whose current keys a passkey opens are left out (NONE).
// { batches: [{ owners, creds, locks: Map owner -> locks }], none: [owner] }
export function unlockPlan(locks) {
  const rest = [], none = [];
  for (const [owner, l] of locks) {
    const creds = [...new Set(l.flatMap((x) => x.creds))];
    if (creds.length) rest.push({ owner, creds, locks: l });
    else none.push(owner);
  }
  const batches = [];
  while (rest.length) {
    const a = rest.shift();
    const k = rest.findIndex((b) => b.creds.some((c) => a.creds.includes(c)));
    if (k >= 0 && core.MAX_POPUP_OWNERS >= 2) {
      const b = rest.splice(k, 1)[0];
      batches.push({ owners: [a.owner, b.owner], creds: a.creds.filter((c) => b.creds.includes(c)),
                     locks: new Map([[a.owner, a.locks], [b.owner, b.locks]]) });
    } else {
      batches.push({ owners: [a.owner], creds: a.creds, locks: new Map([[a.owner, a.locks]]) });
    }
  }
  return { batches, none };
}

// The locks of the owners chosen in a wallet, read for unlockPlan: the
// current keys of each owner's key log (SIGNERSOF(owner), its signers)
// that the wallet holds. An owner whose keys are not there is said so.
export async function ownersLocks({ gh, archiveRepo, wallet, owners, signersOf }) {
  const out = [];
  for (const owner of owners) {
    const signers = await signersOf(owner);
    out.push([owner, await locksOf({ gh, archiveRepo, settings: { owner }, wallet, signers })]);
  }
  return out;
}

// One popup of the plan: the keys of its owners opened with the secrets its
// passkey gives (one per owner). Gives Map owner -> keys. PREPARE gives the
// batch (it may still be reading the wallet when the popup opens).
export async function unlockBatch({ prepare, askCode, win, open }) {
  let batch = null;
  const got = await unlockWithPopup({
    win, open, askCode,
    prepare: async () => {
      batch = await prepare();
      return { owners: batch.owners, creds: batch.creds };
    },
  });
  const out = new Map();
  try {
    for (const [owner, secret] of got.secrets) out.set(owner, await core.openLocks(batch.locks.get(owner), owner, got.cred, secret));
  } finally {
    for (const [, secret] of got.secrets) secret.fill(0);
  }
  return out;
}

// The GitHub API for the core, with the session's token (a function, renewed
// by session.js).
export function github(token, fetchImpl = globalThis.fetch && globalThis.fetch.bind(globalThis)) {
  return new core.GitHub({ token, fetch: fetchImpl });
}

// The wallet of the owner's keys: the first wallet the archive's osheaf.json
// hints for the owner ("keys": {"<owner>": {"wallets": [...]}}, then a hint
// for every owner, the earlier {"wallet": ...}), else the one the person
// gave (kept in this browser: a name, not a secret). Only GitHub wallets can
// be read from a page. OWNER: by default the archive's owner.
export function walletName(settings, given = "", owner = settings && settings.owner) {
  const k = settings && settings.keys;
  const named = typeof k === "string" ? k : (core.walletCandidates(settings || {}, owner || null)[0] || "");
  const name = (named.startsWith("github:") ? named : String(given || "")).trim();
  return /^github:[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/.test(name) ? name : "";
}

// Whether the archive's osheaf.json hints a wallet for OWNER (its own, or one
// for every owner).
export function walletHinted(settings, owner = settings && settings.owner) {
  return core.walletHints(settings && settings.keys, owner || null).length > 0;
}

// The wallet W recorded in the archive's osheaf.json as a hint for OWNER, in
// one commit, as osheaf key wallet --owner OWNER --add W records it:
// { recorded, commit } (recorded false: hinted already, nothing committed).
export async function recordWallet({ gh, repo, owner, wallet, cache = new Map(),
                                     fetchImpl = globalThis.fetch && globalThis.fetch.bind(globalThis) }) {
  const env = core.browserEnvironment({ assets: core.ASSETS, fetch: fetchImpl });
  return core.directRecordWallet({ repo, github: gh, env, owner, wallet, cache, origin: ORIGIN });
}

// The current keys of the archive's default owner that may sign now, and their locks
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
//
// PREPARE may give { owners, creds } instead, one owner or two (version 2
// of the request, one touch for both): the answer is then { cred, secrets:
// [[owner, secret], ...] }.
export function unlockWithPopup({ prepare, askCode, win = window, open = null, timeout = 5 * 60_000, mode = core.POPUP }) {
  const popup = (open || ((url) => win.open(url, "opensheaf-unlock", POPUP_FEATURES)))(core.popupUrl(win.location.origin, mode));
  if (!popup) return Promise.reject(new core.UnlockFailed("the browser blocked the window of the passkey: allow pop-ups for this page"));
  let several = false;
  const request = Promise.resolve().then(prepare).then(({ owner, owners, creds }) => {
    several = Array.isArray(owners);
    return core.popupRequest(several ? owners : owner, creds, null, null, mode);
  });
  return new Promise((resolve, reject) => {
    let answered = false, lastStatus = "";
    // a request that cannot be prepared (a wrong passphrase, a wallet not
    // readable) ends it at once with its own error, and closes the popup:
    // never reported as "the window was closed"
    request.catch((e) => finish(e));
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
      if (data.type === POPUP_STATUS) {
        // what failed in the popup, said if it is closed: information only
        if (typeof data.error === "string") lastStatus = data.error.slice(0, 300);
        return;
      }
      if (data.type === core.POPUP_MESSAGES.ready) {
        try {
          popup.postMessage((await request).message, core.UNLOCK_ORIGIN);
        } catch (e) { finish(e); }
      } else if (data.type === core.POPUP_MESSAGES.answer && !answered) {
        answered = true;
        try {
          const req = await request;
          const typed = typeof data.error === "string" ? "" : await askCode();
          const got = several ? await core.openPopupAnswers(req, data, typed) : await core.openPopupAnswer(req, data, typed);
          req.pair = null;
          popup.postMessage({ type: core.POPUP_MESSAGES.done }, core.UNLOCK_ORIGIN);
          finish(null, got);
        } catch (e) { finish(e); }
      }
    };
    win.addEventListener("message", onMessage);
    const watch = setInterval(() => {
      if (popup.closed && !answered) {
        finish(new core.UnlockFailed(lastStatus ? `the window of the passkey was closed after: ${lastStatus}`
                                                : "the window of the passkey was closed"));
      }
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
//
// The passkeys of the wallet's other owners (borrowed): an owner without a
// passkey of its own yet is enrolled with one of them, so that one passkey
// opens the keys of several owners, two at one touch.
export async function setupState({ gh, archiveRepo, settings, wallet, signers }) {
  const w = walletOf(gh, archiveRepo, wallet);
  await core.checkWallet(w);
  const entries = await core.walletEntries(w, settings.owner);
  let borrowed = [];
  try {
    const others = (await core.ownersHeld(w)).filter(([o]) => o !== settings.owner).map(([o]) => o);
    for (const o of others) {
      for (const lock of await core.walletLocks(w, o, (await core.walletEntries(w, o))
        .filter((e) => e.fields.kind === "current").map((e) => e.fields.key))) borrowed.push(...lock.creds);
    }
    borrowed = [...new Set(borrowed)];
  } catch (e) {
    if (!(e instanceof core.WalletError)) throw e;
    borrowed = [];
  }
  const current = entries.filter((e) => e.fields.kind === "current");
  const there = signers.dids.filter((d) => current.some((e) => e.fields.key === d));
  const locks = await core.walletLocks(w, settings.owner, signers.dids);
  const plan = async (newPasskey) => {
    try {
      return await core.enrollPlan(w, settings.owner, { newPasskey, entries, borrowed });
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
      try {
        await core.openWithPassphrase(plan, passphrase, state.wallet.name);
      } catch (e) {
        if (e instanceof core.WalletError) throw new core.WalletError(`the wallet's passphrase does not open the keys: ${e.message}`);
        throw e;
      }
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
  try {
    await core.checkPassphrase(state.entries, passphrase, settings.owner, state.wallet.name);
  } catch (e) {
    if (e instanceof core.WalletError) throw new core.WalletError(`the wallet's passphrase: ${e.message}`);
    throw e;
  }
  const plan = { owner: settings.owner, number: signers.number, next: [...signers.next], nextThreshold: signers.nextThreshold };
  const signing = source === "wallet" ? await core.rotationKeysFromWallet(state.wallet, plan, passphrase)
    : await rotationKeysGiven(files, plan, filesPassphrase, passphrase);
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

// The rotation-key files read with the passphrase of the files, when one is
// given, else with the wallet's; a wrong one is named, so that the person
// knows which passphrase did not open which file.
async function rotationKeysGiven(files, plan, filesPassphrase, passphrase) {
  try {
    return await core.rotationKeysFromTexts(files, plan, filesPassphrase || passphrase);
  } catch (e) {
    if (e instanceof core.KeyError && /wrong passphrase|a passphrase is needed|locked with a passphrase/.test(e.message)) {
      throw new core.KeyError(`${e.message}: ${filesPassphrase
        ? "the passphrase given for the rotation-key files does not open it"
        : "the wallet's passphrase does not open this rotation-key file (if the files have another passphrase, " +
          "tick \"The files have another passphrase\" and give it)"}`);
    }
    throw e;
  }
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

// --- a new archive: its owner made in the page --------------------------------

// For a repository made from the archive template and not set up: the owner
// made here, as osheaf init --new-owner --key DID makes it (the owner's
// current key, the current key of the archive's workflows, three rotation
// keys of which two sign the next version of the key log), and the archive
// set up with it as the template's setup sets it up (core.directSetup: the
// same files), in steps that can each be tried again without losing the
// keys, which are in this page's memory only:
//
//   prepareOwner    the wallet checked, the keys and the key log made; at
//                   the offline level the rotation keys written as the files
//                   of osheaf init --export, locked with the passphrase, and
//                   their seeds wiped;
//   confirmOwner    (offline) the checks of the files typed back: nothing is
//                   committed before;
//   setUpArchive    (wallet level) the rotation keys put in the wallet; the
//                   archive set up and committed, verified first;
//   createLabels    the labels of the issue forms, if the sign-in may;
//   putOwnerKey     the owner's current key in the wallet (osheaf key push);
//   storeWorkflowKey  the workflows' key as the secret OPENSHEAF_SIGNING_KEY,
//                   if the sign-in may; else shown once, then forgotten;
//   ownerWalletState, then enrollPasskey (above): the passkey;
//   turnPagesOn     GitHub Pages, if the sign-in may.
//
// forgetOwner wipes everything. The owner's current key that signs here is
// kept as an unexportable copy (pending.signing), for the page's keys.

export const LEVELS = { offline: "offline", wallet: "wallet" };
export const LABELS = ["osheaf: deposit", "osheaf: notice", "osheaf: withdraw", "osheaf: licence", "osheaf: collection",
                       "osheaf: add", "osheaf: vet", "osheaf: remove"];
export const LABEL_COLOUR = "5e6a78";

// The signers of a key log made here, as signersOf reads them.
export function signersOfLog(log) {
  const v = log.latest();
  return { owner: log.owner, dids: [...v.keys.keys], threshold: v.keys.threshold,
           versions: Object.fromEntries(v.keys.keys.map((d) => [d, v.number])), number: v.number,
           next: [...v.keys.next], nextThreshold: v.keys.nextThreshold };
}

export async function prepareOwner({ gh, archiveRepo, wallet, passphrase, workflows = true, level = LEVELS.offline,
                                     keeper = "", ownerLabel = "", rotation = core.ROTATION_KEYS, created = null }) {
  if (!passphrase) throw new core.KeyError("give a passphrase: it locks the keys");
  if (ownerLabel && core.ownerLabelProblem(ownerLabel)) throw new core.OwnerError(core.ownerLabelProblem(ownerLabel));
  if (!Object.values(LEVELS).includes(level)) throw new Error(`no security level ${level}`);
  const w = walletOf(gh, archiveRepo, wallet);
  await core.checkWallet(w);
  const keys = await core.newOwnerKeys({ workflows, rotation });
  const pending = { level, wallet: w, passphrase, ownerLabel: ownerLabel || "", current: keys.current, workflows: keys.workflows, rotation: null,
                    files: null, log: null, owner: null, keyLog: null, signing: null, confirmed: level === LEVELS.wallet,
                    walletState: null, done: { rotation: false, archive: null, labels: null, wallet: false, secret: null,
                                               passkey: false, pages: null } };
  try {
    pending.log = await core.ownerKeyLog(keys, { keeper: keeper || null, created });
    pending.owner = pending.log.owner;
    pending.keyLog = await core.keyLogFolder(pending.log);
    pending.signing = await core.signingCopy(keys.current);
    if (level === LEVELS.wallet) pending.rotation = keys.rotation;
    else pending.files = await core.rotationFiles(keys.rotation, pending.owner, 1, passphrase);
  } catch (e) {
    for (const k of keys.rotation) k.seed.fill(0);
    forgetOwner(pending);
    throw e;
  }
  return pending;
}

export function confirmOwner(pending, typed) {
  if (pending.confirmed) return;
  if (!pending.files || !core.checksConfirmed(pending.files, typed)) {
    throw new core.KeyError("the checks typed are not those of the files: nothing was committed");
  }
  pending.confirmed = true;
}

// The archive set up and committed (once): the answer of core.directSetup,
// with the commit; a refusal (ok false) commits nothing. DEFAULTBASE gives
// { url, rule } when the form gives no base URL (load.js, baseUrl).
export async function setUpArchive({ gh, repo, pending, fields, defaultBase = null, cache = new Map(), progress = () => {},
                                     fetchImpl = globalThis.fetch && globalThis.fetch.bind(globalThis) }) {
  if (pending.done.archive) return pending.done.archive;
  if (!pending.confirmed) throw new core.KeyError("the rotation keys are not confirmed yet: nothing was committed");
  if (pending.rotation) {
    progress("wallet");
    await core.keepRotationKeys(pending.wallet, pending.owner, pending.rotation, 1, pending.passphrase);
    pending.rotation = null;
    pending.done.rotation = true;
  }
  schemas ||= await core.schemasOf(core.ASSETS);
  const env = core.browserEnvironment({ assets: core.ASSETS, keys: new Map([[pending.owner, [pending.signing]]]), fetch: fetchImpl });
  const answer = await core.directSetup({ repo, github: gh, fields, keyLog: pending.keyLog, defaultBase, env, schemas, cache,
                                          ownerLabel: pending.ownerLabel,
                                          origin: ORIGIN, progress });
  if (answer.ok) {
    pending.done.archive = answer;
    pending.files = null;
  }
  return answer;
}

// A refusal of GitHub that means "this sign-in may not" (the app's
// permission not granted, or not an administrator of the repository).
const notAllowed = (e) => e instanceof core.GitHubError && [401, 403, 404].includes(e.status);

// The labels of the issue forms, as the template's setup creates them: { made,
// refused } (refused: the sign-in may not create labels, which needs the
// permission Issues: write).
export async function createLabels({ gh, repo }) {
  let made = 0;
  for (const name of LABELS) {
    try {
      await gh.request("POST", `repos/${repo}/labels`, { name, color: LABEL_COLOUR });
      made++;
    } catch (e) {
      if (e instanceof core.GitHubError && e.status === 422) continue;   // there already
      if (notAllowed(e)) return { made, refused: true };
      throw e;
    }
  }
  return { made, refused: false };
}

// The owner's current key put in the wallet, as osheaf key push puts it (v1
// of the key log); its seed then wiped (the unexportable copy signs here).
export async function putOwnerKey({ pending }) {
  if (pending.done.wallet) return;
  await core.pushKey(pending.wallet, pending.owner, pending.current, 1, pending.passphrase);
  pending.current.seed.fill(0);
  pending.current = null;
  pending.done.wallet = true;
}

// The workflows' key stored as the repository secret: "stored", or, when the
// sign-in may not set secrets (the permission Secrets: read and write, and
// an administrator of the repository), "refused": the page then shows the
// line once (workflowKeyLine) for the person to store by hand, and forgets
// it (forgetWorkflowKey). "none" when the owner has no key for the workflows.
export async function storeWorkflowKey({ gh, repo, pending }) {
  if (!pending.workflows) return (pending.done.secret = pending.done.secret || "none");
  try {
    await core.storeSecret(gh, repo, core.SIGNING_SECRET, core.seedLine(pending.workflows));
  } catch (e) {
    if (notAllowed(e)) return (pending.done.secret = "refused");
    throw e;
  }
  forgetWorkflowKey(pending, "stored");
  return pending.done.secret;
}

export function workflowKeyLine(pending) {
  return pending.workflows ? core.seedLine(pending.workflows) : "";
}

export function forgetWorkflowKey(pending, how = "shown") {
  if (pending.workflows) pending.workflows.seed.fill(0);
  pending.workflows = null;
  pending.done.secret = how;
}

// Where the wallet stands for this owner, read before the passkey's popup
// is opened (in the click): what enrollPasskey (above) takes.
export async function ownerWalletState({ gh, archiveRepo, pending }) {
  pending.walletState = await setupState({ gh, archiveRepo, settings: { owner: pending.owner },
                                           wallet: pending.wallet.name, signers: signersOfLog(pending.log) });
  return pending.walletState;
}

// GitHub Pages turned on (branch BRANCH, its root), if the sign-in may (the
// permission Pages: write, and an administrator): { on, url, refused }.
export async function turnPagesOn({ gh, repo, branch = "main" }) {
  try {
    const got = await gh.request("POST", `repos/${repo}/pages`, { build_type: "legacy", source: { branch, path: "/" } });
    return { on: true, url: got && got.html_url, refused: false };
  } catch (e) {
    if (e instanceof core.GitHubError && e.status === 409) return { on: true, url: null, refused: false };
    if (notAllowed(e) || (e instanceof core.GitHubError && e.status === 422)) return { on: false, url: null, refused: true };
    throw e;
  }
}

export function forgetOwner(pending) {
  if (!pending) return;
  for (const k of [pending.current, pending.workflows, ...(pending.rotation || [])]) if (k && k.seed) k.seed.fill(0);
  Object.assign(pending, { current: null, workflows: null, rotation: null, files: null, passphrase: null, walletState: null });
}

// The signers of an owner the archive hosts (by default its default owner):
// read from the head of its branch.
export async function signersOf({ gh, repo, cache, settings, owner = null }) {
  const mirror = settings && /^https:\/\//.test(settings.baseUrl || "") ? settings.baseUrl : null;
  const storage = await core.GitHubStorage.open(repo, gh, { cache, mirror });
  return core.signers(storage, core.browserEnvironment({ assets: core.ASSETS }), owner);
}

let schemas = null;

// A request written directly; the answer of core.carryOut, with the commit.
// ACTING: the acting owner ({ owner, branchFrom, branchLabel }, or none: the
// owner of the line changed, the default owner for a new one): a new
// version of another owner's line goes into its branch (core.carryOut).
export async function write({ gh, repo, operation, fields, files = {}, keys, settings, cache, progress = () => {},
                              acting = null, fetchImpl = globalThis.fetch && globalThis.fetch.bind(globalThis) }) {
  schemas ||= await core.schemasOf(core.ASSETS);
  const env = core.browserEnvironment({ assets: core.ASSETS, keys: keys.byOwner, fetch: fetchImpl });
  const mirror = settings && /^https:\/\//.test(settings.baseUrl || "") ? settings.baseUrl : null;
  const options = acting && acting.owner ? { owner: acting.owner, branchFrom: acting.branchFrom ?? null,
                                             branchLabel: acting.branchLabel || null } : {};
  return core.directWrite({ repo, github: gh, operation, fields, files, env, schemas, mirror, cache, origin: ORIGIN,
                            progress, options });
}

export const { WORKFLOW_ONLY } = core;
