// The OpenSheaf manager: keep an archive made from the archive template
// from the browser. It signs in with GitHub (through the sign-in service,
// or with a personal access token) and reads the archive's files. A change
// is written directly (direct.js): carried out in this page by opensheaf-js,
// signed with the owner's keys unlocked by the owner's passkey, and
// committed to the repository. Or, as a fallback (no keys unlocked, or by
// choice), it is sent as a request (requests/ID/), which the archive's
// workflow "from request" carries out with osheaf, as it does the issue
// forms; the result then comes back in requests/results/ID.json.

import { SERVICE, APP_SLUG, TEMPLATE } from "./config.js";
import { signIn, refresh } from "./gh-auth.js";
import * as gh from "./github.js";
import { FORMS, NEW_VERSION, check, subject } from "./forms.js";
import { memberUri, memberLink, explorerLink, canonicalUri, originatorOf, shortForms, ownerShown, foreignName,
         grouped, continuation, branchLabel } from "./archive.js";
import { readArchive, headFiles, awaitRequest, baseUrl } from "./load.js";
import { render } from "./markdown.js";
import { tokenSource } from "./session.js";
import * as direct from "./direct.js";
import * as core from "./vendor/opensheaf-manager.js";
import { watchPages } from "./pages.js";
import { recentChanges, answerAt } from "./changes.js";
import { storedZip, rotationZipName } from "./zip.js";

const $ = (sel) => document.querySelector(sel);
const KEY = "opensheaf-manager-auth";
const VIA_WORKFLOW = "opensheaf-manager-via-workflow";
const WALLET = "opensheaf-manager-wallet:";
const WALLETS = "opensheaf-manager-wallets";
const ACTING = "opensheaf-manager-acting:";
const COMPACT = "opensheaf-manager-compact";
const FOLDED = "opensheaf-manager-folded:";
const compact = () => pref(COMPACT) === "yes";
// collections opened or closed by hand in this tab, kept when the page is drawn again
const collectionOpen = new Map();

// Preferences kept in this browser (never keys, never tokens): whether to
// send requests to the workflow rather than write directly, and the name of
// an owner's key wallet.
function pref(name, value) {
  try {
    if (value === undefined) return localStorage.getItem(name) || "";
    if (value) localStorage.setItem(name, value); else localStorage.removeItem(name);
  } catch (_) { /* the page works without storage */ }
  return value || "";
}

const state = {
  auth: null,        // { access_token, refresh_token?, expires_at?, kind: "app" | "pat" }
  user: null,
  repo: null,        // "owner/name"
  settings: null,    // osheaf.json
  lines: [],         // the lines of opensheaf.json with a label: { id, kind, name, owner, label, status }
  layout: "",        // the storage layout, from opensheaf.json
  catalogues: [],    // the owner catalogues, as collections with catalogue: true (no forms: kept by the tools)
  collections: [],   // [{ label, name, owner, originator, title, type, members: [members.json 0.2: { kind, name, owner, at, revisions, cite }] }]
  originators: new Map(), // "name:owner" -> the originator of the line, from its genesis record, once read
  base: null,        // a repository not set up: where its site will be served, { url, rule } (load.js)
  ref: "",           // the commit the archive was last read at, after a request ("": the default branch)
  hasWorkflow: false,
  keyLog: false,     // a repository not set up: whether it has the owner's key log in key-log/
  secret: null,      // whether the secret OPENSHEAF_SIGNING_KEY is set: true, false, or null (unknown)
  warnings: [],      // about the open repository: no write access, app not installed
  reachable: null,   // with the app: the repositories where it is installed (lower case)
  pending: new Map(),// request id -> { what, since }
  sent: new Map(),   // request id -> { name, values }: the forms sent in this tab, to correct
  keys: new direct.Keys(), // the owners' current keys, unlocked in this page (memory only)
  signers: null,     // { owner, dids, threshold }: the keys of the default owner's key log that sign now
  signersBy: new Map(), // owner -> its signers, read once per repository
  wallets: { chosen: "", owners: new Map(), selected: new Map(), next: null, open: false },
                     // the wallet chosen; per wallet, the owners it holds (read) and those chosen; the popups left
  cache: new Map(),  // blobs of the repository read in this session, by their git names
  unlocking: null,
  titles: new Map(), // label -> { title, arxiv, versions (the latest document version) }: the papers' titles, read after the archive   // a promise while the popup of the passkey is open
};

const viaWorkflow = () => pref(VIA_WORKFLOW) === "yes";


// --- small DOM helpers --------------------------------------------------------

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === "class") node.className = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v === true ? "" : v);
  }
  // children may be nested in lists at any depth (a list of sections, each
  // with its own lists)
  for (const c of children.flat(Infinity)) {
    if (c === null || c === undefined || c === false) continue;
    node.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return node;
}

function show(target, ...nodes) {
  const t = typeof target === "string" ? $(target) : target;
  t.replaceChildren(...nodes.flat(Infinity).filter(Boolean));
}

// --- messages: a floating pane, and the history under Activity -------------------

// A message floats at the top right, wherever the page is scrolled: progress
// ("info") until replaced, a success for a few seconds (held while the
// pointer is over it), a warning or a refusal until closed. Every message but
// progress goes to the history in the Activity panel, from where it can be
// shown again (its own nodes, so its buttons still work).
const TOAST_MS = { ok: 8000 };
const toast = { timer: null, kind: "" };
const messageLog = [];

function message(kind, ...content) {
  clearTimeout(toast.timer);
  const box = $("#toast");
  if (!content.length) { box.replaceChildren(); box.hidden = true; toast.kind = ""; return; }
  showToast(kind, content);
  if (kind !== "info") remember(kind, content);
}

// A message kept in the history (under Activity) without being shown.
function remember(kind, content) {
  messageLog.unshift({ kind, content, at: new Date() });
  messageLog.length = Math.min(messageLog.length, 50);
  showHistory();
}

function showToast(kind, content) {
  clearTimeout(toast.timer);
  const box = $("#toast");
  const close = el("button", { class: "close", type: "button", "aria-label": "Close",
                               title: "Close (it stays in the history, under Activity)", onclick: () => message("info") }, "×");
  box.replaceChildren(el("div", { class: `notice ${kind}`, role: kind === "bad" ? "alert" : "status" }, close, ...content));
  box.hidden = false;
  toast.kind = kind;
  const ms = TOAST_MS[kind];
  if (ms) {
    const later = () => { toast.timer = setTimeout(() => message("info"), ms); };
    box.onmouseenter = () => clearTimeout(toast.timer);
    box.onmouseleave = later;
    box.onfocusin = () => clearTimeout(toast.timer);
    later();
  } else {
    box.onmouseenter = box.onmouseleave = box.onfocusin = null;
  }
}

// The text of a message's content (nodes, strings, lists, nulls), for one line.
const textOf = (content) => [content].flat(Infinity).filter((c) => c !== null && c !== undefined && c !== false)
  .map((c) => (c instanceof Node ? c.textContent : String(c))).join(" ").replace(/\s+/g, " ").trim();

const clock = (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

function showHistory() {
  show("#history", messageLog.length ? messageLog.map((h) => el("li", {},
    el("button", { type: "button", class: `again ${h.kind}`, title: "Show it again",
                   onclick: () => showToast(h.kind, h.content) },
      el("span", { class: "small muted" }, clock(h.at)), " ",
      textOf(h.content).slice(0, 140))))
    : el("li", { class: "muted" }, "No messages yet."));
  const last = messageLog[0];
  show("#dock-last", last ? el("span", { class: `last ${last.kind}` },
    textOf(last.content).slice(0, 90)) : null);
}

// --- Activity: a bar at the bottom of the page ---------------------------------

// The bar says how the website is (being rebuilt, published), how many
// requests wait, and the last message; it opens, on hover or on a click, a
// panel with the changes (the requests waiting, the archive's recent
// commits) and the history of messages. A click keeps it open
// until clicked again (or Escape).
const dock = { pinned: false, hoverTimer: null };

function setDock(open, pinned = dock.pinned) {
  if (open && $("#dock-panel").hidden) showResults();   // the changes read afresh when it opens
  dock.pinned = open && pinned;
  $("#dock-panel").hidden = !open;
  $("#dock-bar").setAttribute("aria-expanded", String(open));
  $("#dock").classList.toggle("open", open);
}

function initDock() {
  const d = $("#dock"), bar = $("#dock-bar");
  bar.addEventListener("click", () => setDock(!(dock.pinned && !$("#dock-panel").hidden) , true));
  const fine = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine) {
    d.addEventListener("mouseenter", () => {
      clearTimeout(dock.hoverTimer);
      dock.hoverTimer = setTimeout(() => { if ($("#dock-panel").hidden) setDock(true, false); }, 250);
    });
    d.addEventListener("mouseleave", () => {
      clearTimeout(dock.hoverTimer);
      if (!dock.pinned) dock.hoverTimer = setTimeout(() => setDock(false), 400);
    });
  }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#dock-panel").hidden) setDock(false); });
  showHistory();
}

function showDock(visible) {
  $("#dock").hidden = !visible;
  document.body.classList.toggle("with-dock", visible);
  if (!visible) setDock(false);
}

// The website part of the bar, and the requests waiting.
const site = { kind: "", text: null };
function showDockStatus() {
  const waiting = state.pending.size;
  show("#dock-status",
    site.text ? el("span", { class: `site ${site.kind}` }, site.text) : null,
    waiting ? el("span", { class: "chip warn" }, `${waiting} request${waiting > 1 ? "s" : ""} waiting`) : null);
}

// --- the website being published ----------------------------------------------

// After a commit, GitHub Pages rebuilds the archive's website: the Activity
// bar says so, with the time taken, until the site serves the commit
// (pages.js); then a message says it is published. Only the latest commit of
// the archive open is watched.
let watching = 0;

function watchSite(repo, sha) {
  const n = ++watching;
  const base = state.settings && state.settings.baseUrl;
  const link = () => /^https:\/\//.test(base || "") ? el("a", { href: base }, "the website") : "the website";
  const set = (kind, ...text) => { site.kind = kind; site.text = text.length ? text : null; showDockStatus(); };
  token().then((t) => watchPages({
    token: t, repo, sha, baseUrl: base,
    stop: () => n !== watching || state.repo !== repo,
    onState: ({ state: s, seconds }) => {
      if (s === "publishing") set("publishing", el("span", { class: "spinner", "aria-hidden": "true" }),
        `Website: rebuilding with ${sha.slice(0, 7)} ... ${seconds} s`);
      else if (s === "published") {
        set("published", `✓ Website up to date (${sha.slice(0, 7)}, published in ${seconds} s)`);
        // a message too, floating only if none is shown (the answer of the
        // change stays up); always in the history
        const said = [el("p", {}, "✓ The changes are on ", link(), `: GitHub Pages published commit ${sha.slice(0, 7)} in ${seconds} s.`)];
        if ($("#toast").hidden) message("ok", ...said);
        else remember("ok", said);
      } else if (s === "late") {
        set("late", `Website: ${sha.slice(0, 7)} not published after ${Math.round(seconds / 60)} min`);
        message("warn", el("p", {}, `Commit ${sha.slice(0, 7)} is not on `, link(), ` after ${Math.round(seconds / 60)} minutes: see `,
          el("a", { href: `https://github.com/${repo}/actions` }, "the repository's Actions"), " (pages build and deployment)."));
      } else set("");
    },
  })).catch(() => set(""));
}

function stopWatchingSite() {
  watching++;
  site.kind = ""; site.text = null;
  showDockStatus();
}

// --- signing in ----------------------------------------------------------------

function saveAuth() {
  try {
    if (state.auth) sessionStorage.setItem(KEY, JSON.stringify(state.auth));
    else sessionStorage.removeItem(KEY);
  } catch (_) { /* the page works without storage */ }
}

// The token, renewed before it expires, one renewal at a time (session.js);
// once it has expired and cannot be renewed, the page asks to sign in again.
const token = tokenSource({
  get: () => state.auth,
  set: (auth) => { state.auth = auth; saveAuth(); },
  renew: (refreshToken) => refresh(SERVICE, refreshToken),
  expired: () => { signOut(); message("bad", "Your sign-in has expired: sign in again."); },
});

// The open repository is kept in the page's address (#repo=owner/name), so
// that a reload reopens it and the address can be bookmarked; the part after
// # never leaves the browser.
function repoInAddress() {
  const m = /(?:^#|&)repo=([^&]+)/.exec(location.hash);
  let repo = "";
  try { repo = m ? decodeURIComponent(m[1]) : ""; } catch (_) { /* not an address of ours */ }
  return gh.isRepo(repo) ? repo : "";
}

function setRepoInAddress(repo) {
  const url = location.pathname + location.search + (repo ? `#repo=${encodeURIComponent(repo).replace("%2F", "/")}` : "");
  history.replaceState(null, "", url);
}

async function afterSignIn() {
  state.user = await gh.whoAmI(await token());
  saveAuth();
  await showRepositories();
  const repo = repoInAddress();
  if (repo) await openArchive(repo);
}

function signOut() {
  state.keys.forget();
  state.auth = state.user = state.repo = null;
  saveAuth();
  setRepoInAddress("");
  show("#archive");
  show("#form");
  showDock(false);
  showSignIn();
}

function showSignIn() {
  const patInput = el("input", { type: "password", id: "pat", autocomplete: "off",
                                 placeholder: "github_pat_...", "aria-label": "Personal access token" });
  show("#account",
    el("h2", {}, "Sign in"),
    el("p", {}, "The manager writes to your archive's repository with your GitHub account. " +
                "Sign in with GitHub, which asks you to allow the OpenSheaf app on the repositories " +
                "where you installed it, or give a fine-grained personal access token limited to " +
                "the archive's repository (permission: Contents, read and write)."),
    el("div", { class: "controls" },
      el("button", { class: "primary", onclick: async () => {
        try {
          message("info", "Signing in, in the window that opened ...");
          state.auth = { ...(await signIn(SERVICE)), kind: "app" };
          message("info");
          await afterSignIn();
        } catch (e) { message("bad", `Sign-in failed: ${e.message}`); }
      } }, "Sign in with GitHub")),
    el("form", { class: "controls", onsubmit: async (ev) => {
      ev.preventDefault();
      const value = patInput.value.trim();
      if (!value) return;
      state.auth = { access_token: value, kind: "pat" };
      try { await afterSignIn(); message("info"); }
      catch (e) { state.auth = null; message("bad", `The token does not work: ${e.message}`); }
    } }, patInput, el("button", { type: "submit" }, "Use the token")),
    el("p", { class: "small muted" }, "The token is kept in this tab only, and forgotten when it is closed."));
}

// --- choosing the archive ---------------------------------------------------------

async function showRepositories() {
  const { repos, installations } = await gh.repositories(await token());
  state.reachable = installations ? new Set(repos.map((r) => r.full_name.toLowerCase())) : null;
  state.installations = installations;
  const select = el("select", { id: "repo", "aria-label": "Repository" },
    el("option", { value: "" }, "Choose the archive's repository"),
    repos.map((r) => el("option", { value: r.full_name, selected: r.full_name === repoInAddress() }, r.full_name)));
  const typed = el("input", { id: "repo-typed", placeholder: "owner/repository", "aria-label": "Repository" });
  const install = APP_SLUG ? `https://github.com/apps/${APP_SLUG}/installations/new`
                           : "https://github.com/settings/installations";
  show("#account",
    el("p", { class: "signed-in" }, "Signed in as ", el("strong", {}, state.user.login),
       state.auth.kind === "pat" ? " (personal access token)" : "", " ",
       el("button", { class: "small", onclick: signOut }, "Sign out")),
    el("form", { class: "controls", onsubmit: (ev) => {
      ev.preventDefault();
      const repo = typed.value.trim() || select.value;
      if (!repo) return;
      if (!gh.isRepo(repo)) { message("bad", `${repo} is not a repository's name (owner/repository).`); return; }
      openArchive(repo);
    } }, select, el("span", { class: "muted" }, "or"), typed, el("button", { type: "submit" }, "Open")),
    installations && !repos.length ? el("p", { class: "small" },
      "The app is not installed on any repository yet: ",
      el("a", { href: install }, "install it on your archive's repository"), ".") : null,
    installations ? el("p", { class: "small muted" }, "Only repositories where the app is installed are listed. ",
      el("a", { href: install }, "Manage the installation"), ".") : null);
}

// --- reading the archive -------------------------------------------------------

// The archive as read (load.js) becomes the page's state.
function apply(a) {
  state.warnings = accessWarnings(state.repo, a.meta);
  state.hasWorkflow = a.hasWorkflow;
  state.settings = a.settings;
  state.lines = a.lines;
  state.layout = a.layout;
  state.collections = a.collections;
  state.catalogues = a.catalogues || [];
  state.originators = a.originators;
  state.secret = a.secret;
  state.keyLog = a.keyLog;
  state.base = a.base;
  state.short = a.short || shortForms({});
}

async function openArchive(repo) {
  if (!gh.isRepo(repo)) { message("bad", `${repo} is not a repository's name (owner/repository).`); return; }
  const again = state.repo === repo && $("#archive").childElementCount > 0;
  if (state.repo !== repo) {
    state.pending.clear();
    stopWatchingSite();
    messageLog.length = 0;
    state.titles.clear();
    showHistory();
    state.cache = new Map();
    state.signers = null;
    state.signersBy = new Map();
    state.wallets = { chosen: "", owners: new Map(), selected: new Map(), next: null, open: false };
  }
  state.repo = repo;
  state.ref = "";
  setRepoInAddress(repo);
  show("#form");
  // read again (after a change): what is shown stays until redrawn in place
  if (!again) show("#archive", el("p", { class: "loading" }, `Reading ${repo} ...`));
  message("info");
  try {
    const t = await token();
    const a = await readArchive(t, repo);
    if (state.repo !== repo) return;
    apply(a);
    if (a.empty) { showEmpty(repo, a.meta); return; }
    showArchive();
    loadTitles(t, repo);
    resumePending(repo);
  } catch (e) {
    show("#archive", el("p", { class: "notice bad" }, `Could not read ${repo}: ${e.message}`));
  }
}

// After a request is answered: the archive read again (at the commit that
// carried it out) is shown, keeping the requests waiting and a form being
// filled in.
function refreshArchive(repo, a, ref) {
  if (state.repo !== repo) return;
  state.ref = ref || "";
  apply(a);
  if (a.empty) { showEmpty(repo, a.meta); return; }
  showArchive();
  token().then((t) => loadTitles(t, repo)).catch(() => {});
}

// What would make every request fail, said before one is sent: the account
// cannot write to the repository, or the app it signed in with is not
// installed there (its token can then read a public repository, not write).
function accessWarnings(repo, meta) {
  const out = [];
  if (meta && meta.permissions && meta.permissions.push === false)
    out.push(el("div", { class: "notice warn" }, el("strong", {}, "You cannot write to this repository. "),
      `Requests are written to ${repo} with your account, which may only read it: ask its owner to make you a collaborator.`));
  else if (state.auth && state.auth.kind === "app" && state.reachable && !state.reachable.has(repo.toLowerCase())) {
    const install = APP_SLUG ? `https://github.com/apps/${APP_SLUG}/installations/new`
                             : "https://github.com/settings/installations";
    out.push(el("div", { class: "notice warn" }, el("strong", {}, "The OpenSheaf app is not installed on this repository. "),
      "The page can read it, but not write requests to it. ",
      el("a", { href: install }, "Install the app on it"), ", then open it again."));
  }
  return out;
}

function showEmpty(repo, meta) {
  const fromTemplate = "https://github.com/new?template_owner=opensheaf&template_name=archive-template";
  const install = APP_SLUG ? `https://github.com/apps/${APP_SLUG}/installations/new`
                           : "https://github.com/settings/installations";
  show("#archive", state.warnings,
    el("div", { class: "notice warn" },
      el("p", {}, el("strong", {}, `${repo} is empty. `),
        "An archive's repository is made from the archive template, which brings the files and the " +
        "workflows that carry out the manager's requests; an empty repository has none, and GitHub " +
        "does not let a page add the first commit."),
      el("p", {}, "To start an archive:"),
      el("ol", {},
        el("li", {}, el("a", { href: fromTemplate }, "Create a repository from the archive template"),
           " (public, so that GitHub Pages can publish it); you may delete ",
           el("a", { href: meta && meta.html_url ? `${meta.html_url}/settings` : `https://github.com/${repo}/settings` },
              "this empty one"), ", or use its name for the new one after deleting it."),
        el("li", {}, el("a", { href: install }, "Install the OpenSheaf app"), " on the new repository."),
        el("li", {}, "Come back here, open it, and set it up."))));
}

// The settings page where the repository's secrets are set (by hand, when
// the sign-in may not set them).
function secretsPage(repo) {
  return `https://github.com/${repo}/settings/secrets/actions`;
}

const PIPX = 'pipx install "opensheaf[validate] @ git+https://github.com/opensheaf/opensheaf-py"';

// A repository made from the template and not set up, the other way: the
// key ceremony, step by step. The owner and its rotation keys are made on
// the author's computer with osheaf; the manager only says what to run,
// where the secret goes, and then sends the setup with the key log (public
// keys only) to the archive's workflow.
function ceremony() {
  const repo = state.repo;
  const user = repo.split("/")[0].toLowerCase();
  const name = repo.split("/")[1];
  // as the setup finds it (load.js); the scratch archive of the ceremony uses it too
  const base = state.base ? state.base.url
    : name.toLowerCase() === `${user}.github.io` ? `https://${user}.github.io/` : `https://${user}.github.io/${name}/`;
  const step = (title, ...body) => el("li", {}, el("strong", {}, title), " ", ...body);
  const code = (text) => el("pre", {}, text);
  const done = (ok, yes, no) => el("span", { class: `chip ${ok ? "ok" : "warn"}` }, ok ? yes : no);
  return [
    el("p", {}, "The owner made on your computer with the osheaf command, instead of in this page: its rotation keys " +
      "never pass through a browser. The archive's workflow then sets the archive up with it."),
    el("ol", { class: "steps" },
      step("Install the tools", "(once, Python 3.9 or later):", code(PIPX)),
      step("Make the owner", "in a scratch folder, its rotation keys exported to a USB stick and printed:",
        code(`osheaf init owner-setup --name "${name}" --base-url ${base} \\\n` +
             `  --curator "Family, Given" --new-owner --export /Volumes/USB/opensheaf-keys --print\ncd owner-setup`),
        el("p", { class: "small" }, "It asks for a passphrase, prints the owner name, and asks you to type back the " +
          "check of each rotation key once it is put away.")),
      step("Make a key for the workflows", "in a temporary folder, and add it to the owner's key log with two " +
          "rotation keys (this commits three new ones: keep those, and destroy the first three):",
        code('ci=$(mktemp -d)\nOPENSHEAF_KEY_STORE=file XDG_CONFIG_HOME="$ci" osheaf key new      # prints did:key:CI\n' +
             "osheaf owner rotate --add did:key:CI \\\n" +
             "  --rotation-key /Volumes/USB/opensheaf-keys/rotation-...-1.txt \\\n" +
             "  --rotation-key /Volumes/USB/opensheaf-keys/rotation-...-2.txt \\\n" +
             "  --export /Volumes/USB/opensheaf-keys-2 --print")),
      step("Store it as the repository secret", el("code", {}, "OPENSHEAF_SIGNING_KEY"), ": in ",
        el("a", { href: secretsPage(repo) }, "the repository's settings"),
        " (New repository secret), with as value the one line printed by",
        code('cat "$ci"/opensheaf/keys/*/*.key'),
        "then delete the folder (", el("code", {}, 'rm -rf "$ci"'), "). The key then lives only in GitHub. ",
        state.secret === true ? done(true, "the secret is set") :
          state.secret === false ? done(false, "not set yet") : el("span", { class: "small muted" },
            "(this sign-in cannot see whether it is set)")),
      step("Give the key log", "of the owner, public keys only: zip the folder ",
        el("code", {}, "ocfl/<owner>/<owner>/"), " of the scratch folder, and choose the zip in the form below; or ",
        "upload that folder to the repository as ", el("code", {}, "key-log/"), " (Add file, Upload files). ",
        state.keyLog ? done(true, "key-log/ is in the repository") : null,
        code("cp -R ocfl/<owner>/<owner> key-log && zip -r key-log.zip key-log"))),
    el("p", {}, el("strong", {}, "Writing from this page. "), "Once the archive is set up, this page writes to it " +
      "directly, signing with a current key of the owner that your passkey unlocks: keep one in a key wallet, a " +
      "private repository of yours, and enroll your passkey (", el("code", {}, "osheaf key push --wallet " +
      "github:you/opensheaf-keys"), ", then ", el("code", {}, "osheaf key enroll"), "), and install the OpenSheaf " +
      "app on that repository too. Until then, the changes go to the archive's workflow."),
    el("p", { class: "small muted" }, "If the repository is ever compromised, expose the workflows' key at once " +
      "(osheaf owner expose, with two rotation keys) and store a new one: see the template's README, " +
      "When something goes wrong."),
    el("p", {}, el("strong", {}, "The site. "), "The archive's site will be served at ",
      el("code", {}, base), state.base ? ` (${state.base.rule})` : "",
      ", which the setup takes as its base URL when the form's field Base URL is empty; it finds it " +
      "the same way when it runs. If that is not where the site will be, give the address in that field " +
      "(it can be changed later: baseUrl in osheaf.json, then osheaf index). The setup cannot turn " +
      "GitHub Pages on: do it in ", el("a", { href: `https://github.com/${repo}/settings/pages` }, "Settings, Pages"),
      " (Build and deployment: Deploy from a branch, branch main, folder / (root), Save)."),
    el("div", { class: "controls" },
      el("button", { class: "primary", onclick: () => openForm("setup") }, "Set up the archive")),
  ];
}

// --- a new archive: the owner made in this page ------------------------------

// A repository made from the archive template and not set up: the owner made
// here (direct.js: prepareOwner ...), as osheaf init --new-owner --key DID
// makes it, and the archive set up with it as the template's setup sets it
// up, then the keys put where they belong, each step reported and tried
// again without losing the keys, which are in this page's memory only (never
// in the browser's storage). The panel is kept across redrawings, so that
// what is typed stays; the passphrase is read from its fields when used, and
// the fields are cleared.
const creating = { repo: null, node: null, pending: null, values: {}, level: "offline", workflows: true, busy: false,
                   steps: {}, secretShown: false };

const SETUP_FIELDS = ["Name", "Purpose", "Description", "Curator", "Affiliation", "Contact", "Base URL"];

function newArchive() {
  const repo = state.repo;
  const fromTemplate = "https://github.com/new?template_owner=opensheaf&template_name=archive-template";
  if (creating.repo !== repo || !creating.node) {
    if (creating.pending) direct.forgetOwner(creating.pending);
    Object.assign(creating, { repo, node: el("div", { class: "create" }), pending: null, values: {}, level: "offline",
                              workflows: true, busy: false, steps: {}, secretShown: false });
    renderCreate();
  }
  return [
    el("h2", {}, `Set up ${repo}`),
    el("p", {}, `${repo} is not set up yet. (A new archive starts as a `,
      el("a", { href: fromTemplate }, "repository made from the archive template"), ", public, with the OpenSheaf app " +
      "installed on it.) The papers and collections deposited here are signed by an owner, the archive's default " +
      "owner, made here: a current key that signs in this page, kept in your key wallet; a current key for the " +
      "archive's workflows, kept as a secret of the repository; and three rotation keys, two of which sign any change " +
      "of keys."),
    creating.node,
    el("details", { class: "how ceremony" }, el("summary", {}, "Or make the owner on your computer (the key ceremony)"),
      ceremony()),
  ];
}

function renderCreate() {
  const c = creating;
  const p = c.pending;
  const body = !p ? createForm() : !p.confirmed ? createExport() : createSteps();
  c.node.replaceChildren(body);
  if (c.busy) c.node.querySelectorAll("button").forEach((x) => { x.disabled = true; });
}

function createBusy(b) {
  creating.busy = b;
  if (creating.node) creating.node.querySelectorAll("button").forEach((x) => { x.disabled = b; });
}

// The form: the archive's (those of the template's setup), the owner's
// keeper, the wallet, the security level, the workflows' key, the passphrase.
function createForm() {
  const c = creating, v = c.values;
  const base = state.base;
  const field = (label, input, { required = false, help = null } = {}) => el("div", { class: "field" },
    el("label", { for: input.id }, label, required ? el("span", { class: "required" }, " (required)") : null), input,
    help ? el("p", { class: "help" }, help) : null);
  const keep = (name) => (ev) => { v[name] = ev.target.value; };
  const input = (name, attrs = {}) => el("input", { id: `create-${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
    value: v[name] || "", oninput: keep(name), ...attrs });
  const purpose = el("select", { id: "create-purpose", onchange: keep("Purpose") },
    ["papers", "selection", "catalogue"].map((x) => el("option", { value: x, selected: (v.Purpose || "papers") === x }, x)));
  if (v.wallet === undefined) {
    v.wallet = direct.walletName({}, pref(WALLET + "new")) || `github:${state.user ? state.user.login : "you"}/opensheaf-keys`;
  }
  const wallet = input("wallet", { "aria-label": "Key wallet" });
  const links = el("span", { class: "small" });
  const drawLinks = () => {
    const w = direct.walletName({}, wallet.value.trim());
    links.replaceChildren(...(w ? [el("a", { href: direct.newRepositoryUrl(w), target: "_blank", rel: "noopener" }, "Create it on GitHub"),
      " (private), then ", el("a", { href: installLink(w.slice(7).split("/")[0]), target: "_blank", rel: "noopener" },
        "add it to the OpenSheaf app's repositories"), "."] : ["Name it github:OWNER/REPOSITORY."]));
  };
  wallet.addEventListener("input", drawLinks);
  drawLinks();
  const level = (value, text) => el("label", { class: c.level === value ? "on" : "" },
    el("input", { type: "radio", name: "create-level", value, checked: c.level === value,
                  onchange: () => { c.level = value; renderCreate(); } }), text);
  const workflows = el("input", { type: "checkbox", id: "create-workflows", checked: c.workflows,
                                  onchange: (ev) => { c.workflows = ev.target.checked; } });
  const pass = el("input", { type: "password", id: "create-pass", name: "new-owner-passphrase", autocomplete: "new-password", "aria-label": "Passphrase",
                             placeholder: "passphrase" });
  const again = el("input", { type: "password", id: "create-pass-again", name: "new-owner-passphrase-again", autocomplete: "new-password",
                              "aria-label": "Passphrase again", placeholder: "passphrase again" });
  const make = async () => {
    const missing = ["Name", "Curator"].filter((k) => !(v[k] || "").trim());
    if (missing.length) { message("bad", `Fill in: ${missing.join(", ")}.`); return; }
    const w = direct.walletName({}, (v.wallet || "").trim());
    if (!w) { message("bad", "Name the key wallet as github:OWNER/REPOSITORY."); return; }
    if ((v["Base URL"] || "").trim() && !/^https?:\/\/\S+$/.test(v["Base URL"].trim())) {
      message("bad", "The base URL is an https address, such as https://jane.github.io/papers/."); return;
    }
    const ownerLabel = (v.ownerLabel || "").trim();
    if (ownerLabel && (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(ownerLabel) || ownerLabel.length > 64 || ownerLabel === "main")) {
      message("bad", `${ownerLabel} cannot label the owner: at most 64 lower-case letters and digits, words joined by -, ` +
        "and not main."); return;
    }
    if (!pass.value) { message("bad", "Type a passphrase: it locks the keys."); return; }
    if (pass.value !== again.value) { message("bad", "The two passphrases differ."); return; }
    const passphrase = pass.value;
    pass.value = ""; again.value = "";
    createBusy(true);
    message("info", `Checking ${w} and making the keys ...`);
    try {
      c.pending = await direct.prepareOwner({ gh: ghCore(), archiveRepo: state.repo, wallet: w, passphrase,
                                              workflows: c.workflows, level: c.level, keeper: (v.keeper || "").trim(),
                                              ownerLabel });
      pref(WALLET + "new", w);
      watchUnload(true);
      if (c.pending.confirmed) {
        createBusy(false);
        renderCreate();
        createRun();
        return;
      }
      message("info", "Save the rotation keys, then type their checks: nothing is committed before.");
    } catch (e) {
      message("bad", `The owner was not made: ${e.message}.`);
    } finally {
      if (!c.pending || !c.pending.confirmed) { createBusy(false); renderCreate(); }
    }
  };
  return el("form", { class: "op", onsubmit: (ev) => { ev.preventDefault(); make(); } },
    el("h3", {}, "Create the owner and set up the archive here"),
    el("p", { class: "muted" }, "The page makes the owner's keys and its key log, as osheaf init --new-owner does, sets " +
      "the archive up with it as the template's setup does (the same files), and puts each key where it belongs. " +
      "The keys are in this page's memory only until then: keep the page open until it is done."),
    field("Name", input("Name", { placeholder: "Papers of Jane Doe, or A reading list on ..." }), { required: true }),
    field("Purpose", purpose, { help: "Papers (yours, or a group's); a selection vets particular versions (a reading list, " +
      "a journal issue); a catalogue follows its members. For a selection or a catalogue, its collection is created " +
      "and featured on the home page." }),
    field("Description", input("Description"), { help: "For a selection or a catalogue (optional)." }),
    field("Curator", input("Curator", { placeholder: "Doe, Jane" }), { required: true, help: "Your name, as Family, Given." }),
    field("Affiliation", input("Affiliation")),
    field("Contact", input("Contact", { placeholder: "empty: the base URL" }), { help: "A web page or mailto: address." }),
    field("Keeper", input("keeper", { placeholder: "https://orcid.org/0000-0002-1825-0097, or https://example.org/" }),
      { help: "Optional: who answers for the owner, an ORCID iD or https://DOMAIN/ (section 6.6). It is part of the " +
        "owner's genesis record, and cannot be changed later." }),
    field("Label for this owner in the archive", input("ownerLabel", { placeholder: "jane-doe" }),
      { help: "Optional: a label the archive gives the owner (lower-case letters and digits, words joined by -), shown " +
        "instead of its name in this archive. It is the archive's, not signed by the owner." }),
    field("Base URL", input("Base URL", { placeholder: base ? base.url : "https://OWNER.github.io/REPOSITORY/" }),
      { help: base ? `Where the site will be served. Empty: ${base.url} (${base.rule}).` : "Where the site will be served." }),
    el("h4", {}, "The keys"),
    field("Key wallet", wallet, { help: ["A private repository of yours, never the archive's, where the page puts the " +
      "owner's current key, locked with the passphrase and your passkey. ", links] }),
    el("div", { class: "field" }, el("label", {}, "The rotation keys"),
      el("div", { class: "modes", role: "radiogroup", "aria-label": "The rotation keys" },
        level("offline", "Offline: files and printed sheets"), level("wallet", "In the wallet")),
      el("p", { class: "help" }, c.level === "offline"
        ? "The maximum security level: the three rotation keys are given to you as files, locked with the passphrase, " +
          "and as sheets to print; you keep them apart from your computer and from each other, and type back the check " +
          "of each. Nothing is committed before."
        : "A lower security level (osheaf init --keys): the rotation keys are kept in the wallet, locked with the " +
          "passphrase; whoever has the wallet and the passphrase can change the owner's keys.")),
    el("div", { class: "field" }, el("label", { for: "create-workflows" }, workflows, " Let the archive's workflow sign too"),
      el("p", { class: "help" }, "A current key for the archive's workflows (the issue forms, requests to the workflow, " +
        "arXiv), stored as the repository secret OPENSHEAF_SIGNING_KEY. Anyone who can change the repository's " +
        "workflows can sign with it.")),
    el("div", { class: "field" }, el("label", { for: "create-pass" }, "Passphrase"),
      el("div", { class: "controls" }, pass, again),
      el("p", { class: "help" }, "It locks the keys in the wallet and the rotation-key files. Keep it: osheaf asks for it too.")),
    el("div", { class: "controls" }, el("button", { type: "submit", class: "primary" }, "Create the owner")));
}

// The offline level: the rotation keys to save, then their checks.
function createExport() {
  const p = creating.pending;
  const checks = p.files.map((f) => el("input", { class: "check", size: 6, autocomplete: "off", spellcheck: "false",
                                                  "aria-label": `Check of ${f.name}`, placeholder: "check" }));
  return el("div", { class: "op setup" },
    el("h3", {}, "Save the rotation keys"),
    el("p", {}, "The owner ", el("code", { title: p.owner }, p.ownerLabel || shortForms({}).owner(p.owner)), " is made, in this page only. ",
      el("strong", {}, `Save its ${p.files.length} rotation keys`), " before anything is committed: each file apart from " +
      "your computer and from the others (a USB stick each, say), or print the sheets, as osheaf init --export asks. " +
      "They are locked with the passphrase; any two of them sign a change of the owner's keys, and nothing else can."),
    el("ul", { class: "rotation-files" }, p.files.map((f, k) => el("li", {},
      el("a", { href: "#", onclick: (ev) => { ev.preventDefault(); download(f.name, f.text); } }, f.name),
      "  check ", el("code", {}, f.check), "  ", checks[k]))),
    el("p", { class: "controls" }, saveAllButton(p.files, p.owner, 1),
      el("button", { type: "button", onclick: () => printSheets(p.files) }, "Print the sheets")),
    el("p", { class: "small" }, "Save all the files gives one zip of the files, under the names osheaf gives them: unpack it " +
      "onto the offline media (each file apart from the others), then delete the zip from this computer. Or save each file " +
      "by its link. Then type the check of each file next to it, to confirm that they are put away; the archive is set up " +
      "only then."),
    el("form", { class: "controls", onsubmit: (ev) => {
      ev.preventDefault();
      try {
        direct.confirmOwner(p, checks.map((x) => x.value));
      } catch (e) {
        message("bad", `${e.message}.`);
        return;
      }
      renderCreate();
      createRun();
    } }, el("button", { type: "submit", class: "primary" }, "Confirm and set up the archive"), createCancel()));
}

function createCancel() {
  return el("button", { type: "button", onclick: () => {
    const p = creating.pending;
    if (p && p.done.archive && !confirm("The archive is set up already: forget the keys not yet put away?")) return;
    direct.forgetOwner(p);
    Object.assign(creating, { pending: null, steps: {}, secretShown: false });
    watchUnload(false);
    message("info", "Cancelled: the keys are forgotten (delete any file saved).");
    if (p && p.done.archive) { creating.node = null; openArchive(state.repo); } else renderCreate();
  } }, "Cancel");
}

// The steps, in order; each says how it went, and one that failed is tried
// again from where it stopped. The passkey waits for a click (a browser
// opens the popup only then).
const CREATE_STEPS = [
  ["archive", "The archive set up and committed"],
  ["labels", "The labels of the issue forms"],
  ["wallet", "The owner's current key in the wallet"],
  ["secret", "The workflows' key as the repository secret"],
  ["passkey", "Your passkey"],
  ["pages", "GitHub Pages"],
];

async function createRun() {
  const c = creating, p = c.pending, repo = c.repo, gh = ghCore();
  if (c.busy || !p) return;
  const set = (name, status, ...note) => { c.steps[name] = { status, note }; renderCreate(); };
  const say = { wallet: "Putting the rotation keys in the wallet ...", reading: "Reading the repository ...",
                "carrying out": "Setting the archive up ...", committing: "Signed; committing to the repository ..." };
  createBusy(true);
  let finished = false;
  try {
    if (!p.done.archive) {
      set("archive", "now");
      let answer;
      try {
        answer = await direct.setUpArchive({ gh, repo, pending: p, fields: { ...createFields(), "Key wallet": p.wallet.name },
                                             cache: state.cache,
                                             defaultBase: async () => state.base || await baseUrl(await token(), repo),
                                             progress: (x) => message("info", say[x] || x) });
      } catch (e) {
        set("archive", "bad", `Nothing was committed: ${e.message}.`);
        message("bad", `The archive was not set up: ${e.message}.`);
        return;
      }
      if (!answer.ok) {
        set("archive", "bad", () => render(answer.message));
        message("bad", render(answer.message));
        return;
      }
      watchSite(repo, answer.commit.sha);
      // a function: the note is drawn afresh each time the steps are
      set("archive", "ok", () => [render(answer.message.split("\n\n")[0]), el("p", {}, "Commit ",
        el("a", { href: answer.commit.url || `https://github.com/${repo}/commit/${answer.commit.sha}` },
           answer.commit.sha.slice(0, 7)), ".")]);
    }
    if (!p.done.labels) {
      try {
        p.done.labels = await direct.createLabels({ gh, repo });
      } catch (e) {
        p.done.labels = { refused: true, error: e.message };
      }
      set("labels", p.done.labels.refused ? "warn" : "ok", p.done.labels.refused
        ? ["This sign-in may not create labels (Issues: read and write). They only sort the issues of the forms: ",
           "running ", el("a", { href: `https://github.com/${repo}/actions/workflows/setup.yml` }, "Set up the archive"),
           " once in the Actions tab creates them, once the workflows' key is stored."]
        : "Made.");
    }
    if (!p.done.wallet) {
      set("wallet", "now");
      message("info", `Putting the owner's current key in ${p.wallet.name} ...`);
      try {
        await direct.putOwnerKey({ pending: p });
      } catch (e) {
        set("wallet", "bad", `Not put: ${e.message}. The key is kept in this page: try again.`);
        message("bad", `The current key was not put in the wallet: ${e.message}.`);
        return;
      }
      set("wallet", "ok", `In ${p.wallet.name}, locked with the passphrase.`);
      message("info");
    }
    if (!p.done.secret) {
      set("secret", "now");
      try {
        const how = await direct.storeWorkflowKey({ gh, repo, pending: p });
        set("secret", how === "refused" ? "warn" : "ok", how === "stored" ? "Stored as OPENSHEAF_SIGNING_KEY." :
          how === "none" ? "No key for the workflows: they do not sign." : "");
      } catch (e) {
        set("secret", "bad", `Not stored: ${e.message}. The key is kept in this page: try again.`);
        return;
      }
    }
    if (p.done.secret === "refused") {   // shown, until stored by hand
      message("info", "Store the workflows' key as the repository's secret by hand (step 4), then go on.");
      return;
    }
    if (!p.walletState) {
      try {
        await direct.ownerWalletState({ gh, archiveRepo: repo, pending: p });
      } catch (e) {
        set("passkey", "bad", `The wallet could not be read: ${e.message}.`);
        return;
      }
    }
    if (!p.done.passkey) { message("info", "Now your passkey: Create the passkey, or Later."); return; }
    if (!p.done.pages) {
      set("pages", "now");
      try {
        p.done.pages = await direct.turnPagesOn({ gh, repo });
      } catch (e) {
        p.done.pages = { on: false, refused: true };
      }
      set("pages", p.done.pages.on ? "ok" : "warn", p.done.pages.on ? "On: the site is published from the branch main." : [
        "This sign-in may not turn it on. In ", el("a", { href: `https://github.com/${repo}/settings/pages` }, "Settings, Pages"),
        ": Build and deployment, Source: Deploy from a branch, branch main, folder / (root), Save."]);
    }
    finished = true;
  } finally {
    createBusy(false);
    if (finished) createDone(); else if (c.pending) renderCreate();
  }
}

// The fields of the setup, as the form of the template's setup gives them.
function createFields() {
  const out = {};
  for (const k of SETUP_FIELDS) {
    const x = String(creating.values[k] || (k === "Purpose" ? "papers" : "")).trim();
    if (x) out[k] = x;
  }
  return out;
}

// The passkey, in the click: the popup opens at once.
function createPasskey(skip = false) {
  const c = creating, p = c.pending;
  if (skip) {
    p.done.passkey = "later";
    c.steps.passkey = { status: "warn", note: ["Later: under Write directly, Set up a key wallet, step 3."] };
    createRun();
    return;
  }
  createBusy(true);
  message("info", "Use your passkey in the window of unlock.opensheaf.org ...");
  direct.enrollPasskey({ state: p.walletState, settings: { owner: p.owner }, passphrase: p.passphrase, askCode })
    .then(() => {
      p.done.passkey = true;
      c.steps.passkey = { status: "ok", note: [`It opens the owner's key in ${p.wallet.name}.`] };
      createBusy(false);
      createRun();
    })
    .catch((e) => {
      c.steps.passkey = { status: "bad", note: [`No passkey was enrolled: ${e.message}. Try again, or later.`] };
      message("bad", `No passkey was enrolled: ${e.message}.`);
      createBusy(false);
      renderCreate();
    });
}

// Everything done: the page holds the owner's key, the archive is opened.
function createDone() {
  const c = creating, p = c.pending, repo = c.repo;
  if (!p) return;
  state.keys.add(p.owner, [p.signing], p.wallet.name);
  state.signers = direct.signersOfLog(p.log);
  state.signersBy.set(p.owner, state.signers);
  pref(WALLET + p.owner, p.wallet.name);
  direct.forgetOwner(p);
  Object.assign(c, { pending: null, node: null, steps: {}, secretShown: false });
  watchUnload(false);
  pref(VIA_WORKFLOW, "");
  message("ok", "The archive is set up, and the owner's key is unlocked in this page: write to it directly.");
  openArchive(repo);
}

function createSteps() {
  const c = creating, p = c.pending;
  const chip = (status) => status === "ok" ? el("span", { class: "chip ok" }, "done")
    : status === "bad" ? el("span", { class: "chip bad" }, "not done")
    : status === "warn" ? el("span", { class: "chip warn" }, "by hand")
    : status === "now" ? el("span", { class: "chip" }, "now") : null;
  const items = CREATE_STEPS.map(([name, title]) => {
    const st = c.steps[name] || {};
    const extra = [];
    if (name === "secret" && p.done.secret === "refused") extra.push(secretByHand());
    if (name === "passkey" && p.walletState && !p.done.passkey && p.done.secret !== "refused") {
      const plan = p.walletState.plans.enrolled;
      const known = plan && plan.known.length;
      extra.push(el("p", { class: "small" }, known
        ? "A passkey of yours opens other keys in this wallet: it is used for this one too (Touch ID, in a window of " +
          "unlock.opensheaf.org)."
        : "A passkey is created for unlock.opensheaf.org (Touch ID, in a window of unlock.opensheaf.org); you then type " +
          "here the code it shows. It unlocks the owner's key when you come back."),
        el("div", { class: "controls" }, el("button", { class: "primary", onclick: () => createPasskey() },
          known ? "Use your passkey" : "Create the passkey"),
          el("button", { onclick: () => createPasskey(true) }, "Later")));
    }
    return el("li", {}, el("strong", {}, title), " ", chip(st.status),
      st.note && st.note.length ? el("div", { class: "small" }, st.note.map((x) => (typeof x === "function" ? x() : x))) : null,
      extra);
  });
  const failed = Object.values(c.steps).some((x) => x.status === "bad");
  return el("div", { class: "op setup" },
    el("h3", {}, "Setting the archive up"),
    el("p", { class: "small muted" }, "Owner ", el("code", { title: p.owner }, p.ownerLabel || shortForms({}).owner(p.owner)),
      ". Keep this page open until the steps are done: the keys not yet put away are in its memory only."),
    el("ol", { class: "steps" }, items),
    el("div", { class: "controls" }, failed ? el("button", { class: "primary", onclick: () => createRun() }, "Try again") : null,
      createCancel()));
}

// The workflows' key, when the sign-in may not store it: shown once, to copy
// into the repository's secret by hand, then forgotten.
function secretByHand() {
  const c = creating, p = c.pending;
  const value = el("input", { readonly: true, class: "secret", value: direct.workflowKeyLine(p),
                              "aria-label": "The workflows' key", spellcheck: "false", autocomplete: "off" });
  return el("div", {},
    el("p", { class: "small" }, "This sign-in may not set the repository's secrets (it needs the permission Secrets: read " +
      "and write, and an administrator of the repository). Copy the key below, then in ",
      el("a", { href: secretsPage(c.repo), target: "_blank", rel: "noopener" }, "the repository's settings"),
      ", New repository secret: name ", el("code", {}, "OPENSHEAF_SIGNING_KEY"), ", and the key as its value. The page " +
      "forgets it when you go on."),
    el("div", { class: "controls" }, value,
      el("button", { type: "button", onclick: () => {
        navigator.clipboard.writeText(value.value).then(() => message("ok", "Copied: paste it as the secret's value."),
          () => { value.select(); message("info", "Select it and copy it (the browser refused the clipboard)."); });
      } }, "Copy"),
      el("button", { type: "button", class: "primary", onclick: () => {
        direct.forgetWorkflowKey(p);
        value.value = "";
        c.steps.secret = { status: "warn", note: ["Stored by hand as OPENSHEAF_SIGNING_KEY; the page forgot it."] };
        createRun();
      } }, "It is stored: go on")));
}

// While keys not yet put away are in the page's memory, leaving it asks first.
function onUnload(ev) { ev.preventDefault(); ev.returnValue = ""; }
function watchUnload(on) {
  window.removeEventListener("beforeunload", onUnload);
  if (on) window.addEventListener("beforeunload", onUnload);
}

// Titles of the documents, read after the page is shown, and a label for
// those imported from arXiv (object.json: an external source on arXiv),
// linking to the arXiv page of the current version.
// The title of a paper as the table shows it, once read (kept in
// state.titles, so that the table drawn again keeps it).
function titleOf(o) {
  const t = state.titles.get(o.label);
  if (!t) return [];
  const out = [];
  if (t.title) out.push(el("a", { href: explorerLink(state.settings.baseUrl, { line: o.label }), title: t.title }, t.title));
  const ax = t.arxiv;
  if (ax) out.push(" ", ax.record && /^https:\/\/arxiv\.org\//.test(ax.record)
    ? el("a", { class: "chip arxiv", href: ax.record, title: `Imported from arXiv (${ax.label || ""})` }, "arXiv")
    : el("span", { class: "chip arxiv", title: "Imported from arXiv" }, "arXiv"));
  return out;
}

async function loadTitles(t, repo) {
  const at = state.ref ? { ref: state.ref } : {};
  let branches = false;
  for (const o of docs().slice(0, 60)) {
    try {
      const [dc, obj, genesis] = await headFiles(t, repo, o, state.layout,
        ["datacite.json", "object.json", "genesis.json"], at);
      if (state.repo !== repo) return;
      const originator = originatorOf(genesis, o);
      if (originator) {
        state.originators.set(`${o.name}:${o.owner}`, originator);
        showUri(o);
      }
      const ax = ((obj && obj.external) || []).find((e) => e.service === "arXiv" && e.role === "source");
      const parent = obj && obj.parent && obj.parent.name && obj.parent.owner
        ? { name: obj.parent.name, owner: obj.parent.owner, documentVersion: obj.parent.documentVersion } : null;
      if (parent) branches = true;
      state.titles.set(o.label, { title: dc && dc.titles && dc.titles[0] ? dc.titles[0].title : "", arxiv: ax || null,
                                  versions: obj && Number.isInteger(obj.documentVersion) ? obj.documentVersion : null, parent });
      const cell = document.querySelector(`[data-title="${CSS.escape(o.label)}"]`);
      if (cell) cell.replaceChildren(...titleOf(o));
    } catch (_) { /* a title is a convenience */ }
    if (state.repo !== repo) return;
  }
  // the branches, now known, listed under their lines
  if (branches || hosted().length > 1) showArchive();
}

// Members of collections link to the Explorer (archive.js): a line of this
// archive by its label, another by its identifier in the first archive of
// its `at`, or one of its versions (v5).

// A line's sheaf: URI as the page shows it (in the title of its links), in
// canonical form once its originator is known (archive.js).
function uri(o) {
  return canonicalUri(o, state.originators.get(`${o.name}:${o.owner}`));
}

// The URI of a line shown again, once its originator has been read.
function showUri(o) {
  for (const node of document.querySelectorAll(`[data-line="${CSS.escape(`${o.name}:${o.owner}`)}"]`))
    node.title = uri(o);
}

function docs() {
  return state.lines.filter((o) => o.kind === "document");
}

function showArchive() {
  const s = state.settings;
  const parts = [...state.warnings];
  if (!state.hasWorkflow) parts.push(el("div", { class: "notice warn" },
    el("strong", {}, "Warning. "),
    "This repository has no workflow to carry out the manager's requests " +
    "(.github/workflows/from-request.yml). Bring its .github/ folder up to date from the ",
    el("a", { href: TEMPLATE }, "archive template"), "; until then, requests wait unanswered."));
  if (!s) {
    parts.push(...newArchive());
    show("#archive", parts);
    return;
  }
  const explorer = explorerLink(s.baseUrl);
  if (state.secret === false && viaWorkflow()) parts.push(el("div", { class: "notice warn" },
    el("strong", {}, "The secret OPENSHEAF_SIGNING_KEY seems not to be set. "),
    "The archive's workflow signs every change with the owner's key for the workflows, kept in that " +
    "repository secret: until it is set, requests are answered with a refusal. ",
    el("a", { href: secretsPage(state.repo) }, "Set it in the repository's settings"),
    " (see the key ceremony in the template's README)."));
  parts.push(
    el("h2", {}, s.name),
    el("p", { class: "facts" }, /^https:\/\//.test(s.baseUrl || "") ? el("a", { href: s.baseUrl }, s.baseUrl) : s.baseUrl, " · ",
       el("a", { href: explorer }, "open in the Explorer"), " · ",
       el("a", { href: `https://github.com/${state.repo}` }, state.repo)),
    s.owner ? el("p", { class: "small muted" }, "Default owner ",
      el("a", { href: explorerLink(s.baseUrl, { owner: s.owner }), title: `${s.owner}: its key log, in the Explorer` },
         el("code", {}, ownerShown(s.owner, state.lines, state.short))),
      " · signs the papers and collections deposited here unless another owner is chosen") : null,
    signingPanel(),
    el("div", { class: "controls" },
      el("button", { class: "primary", onclick: () => openForm("deposit") }, "Deposit a paper"),
      el("button", { onclick: () => openForm("arxiv") }, "Deposit from arXiv"),
      el("button", { onclick: () => openForm("new_collection") }, "Create a collection")),
    el("div", { class: "list-tools" },
      el("button", { type: "button", class: "small", "aria-pressed": String(compact()),
                     title: "One line per paper and per collection; a collection's members shown when it is opened",
                     onclick: () => { pref(COMPACT, compact() ? "" : "yes"); showArchive(); } },
         compact() ? "Show the lists in full" : "Compact lists")),
    block("collections", "Collections", state.catalogues.length + state.collections.length,
        state.catalogues.length + state.collections.length ? [...state.catalogues, ...state.collections].map((c) => el("details", { class: "collection", open: collectionOpen.has(c.label) ? collectionOpen.get(c.label) : !compact() },
      el("summary", { onclick: (e) => collectionOpen.set(c.label, !e.currentTarget.parentNode.open) }, el("h4", {}, c.title, " ", el("span", { class: "chip" }, c.type || "collection"),
         c.catalogue && hosted().length > 1 ? el("span", { class: "small muted" }, " of ", ownerCode(c.owner)) : null,
         s.index && s.index.html && s.index.html.featured === c.label ? el("span", { class: "chip ok" }, "featured") : null,
         el("span", { class: "small muted count" }, ` ${c.members.length} member${c.members.length === 1 ? "" : "s"}`))),
      el("p", { class: "small muted" }, el("a", { href: explorerLink(s.baseUrl, { line: c.label || c.name, kind: "collection" }),
                                                  title: uri(c), "data-line": `${c.name}:${c.owner}` },
         el("code", {}, c.label || c.name.slice(0, 8)))),
      c.members.length ? el("ol", { class: "members" }, c.members.map((m) => el("li", {},
        el("a", { href: memberLink(m, s.baseUrl, state.lines), title: uri(m), "data-line": `${m.name}:${m.owner}` },
           el("code", {}, memberName(m)), m.cite && m.cite.title ? ` ${m.cite.title}` : ""),
        m.follow ? el("span", { class: "chip" }, "followed") : null,
        m.revisions ? el("span", { class: "muted" }, " (vetted: ",
          m.revisions.map((r, i) => [i ? ", " : "",
            el("a", { href: memberLink(m, s.baseUrl, state.lines, r.version), title: `Version ${r.documentVersion}` },
               String(r.documentVersion))]), ")") : null)))
        : el("p", { class: "muted" }, "No members yet."),
      c.catalogue ? el("p", { class: "small muted" }, "Kept by the tools: each paper its owner deposits here is listed in it, " +
        "in a new version signed by that owner.") :
      el("div", { class: "controls" },
        el("button", { class: "small", onclick: () => openForm("add", { "In collection": c.label }) }, "Add a member"),
        c.type === "selection" && c.members.length ?
          el("button", { class: "small", onclick: () => openForm("vet", { "In collection": c.label }) }, "Vet a new version") : null,
        c.members.length ?
          el("button", { class: "small", onclick: () => openForm("remove", { "In collection": c.label }) }, "Remove a member") : null)))
      : el("p", { class: "muted" }, "No collections yet.")),
    block("papers", "Papers", docs().length, papersTable()));
  // drawn again in place: the page keeps its height while the archive is
  // replaced, and the reader's position
  const box = $("#archive"), y = window.scrollY;
  box.style.minHeight = `${box.offsetHeight}px`;
  show(box, parts);
  box.classList.toggle("compact", compact());
  box.style.minHeight = "";
  window.scrollTo(0, y);
  showDock(true);
  showResults();
}

// The papers, each line followed by its branches in this archive (once the
// parents of the lines are read), with the owner of each when the archive
// hosts several or the line is not the default owner's. Notices, licences
// and withdrawals are acts of a line's owner: on the lines of another owner
// than the acting one, they are disabled, and the page says why. Through
// the workflow, which signs for the default owner only, the lines of other
// owners take no change.
function papersTable() {
  const s = state.settings;
  if (!docs().length) return el("p", { class: "muted" }, "No papers yet.");
  const acting = actingOwner(), viaWf = viaWorkflow();
  const several = hosted().length > 1 || docs().some((o) => o.owner !== s.owner);
  let others = false, foreign = false;
  const rows = grouped(docs(), (o) => parentOf(o) || null).map(({ line: o, depth }) => {
    const p = parentOf(o);
    const parentLine = p ? docs().find((x) => x.name === p.name && x.owner === p.owner) : null;
    const notOwn = o.owner !== acting;
    const blocked = viaWf && o.owner !== s.owner;
    if (notOwn && !blocked) others = true;
    if (blocked) foreign = true;
    const why = blocked ? `The workflow signs for the default owner only: changes of the lines of ${ownerText(o.owner)} need Write directly.`
      : `Only its owner, ${ownerText(o.owner)}, gives notices, licences and withdrawals${unlockedOwner(o.owner) ? ": act as it" : ""}.`;
    const ownAct = (form, text) => el("button", { class: "small", disabled: notOwn || blocked, title: notOwn || blocked ? why : null,
                                                  onclick: () => openForm(form, { "Label": o.label }) }, text);
    const c = !blocked && notOwn ? continuation(o, acting, docs(), parentOf, originatorOfLine(o)) : null;
    const versionTitle = blocked ? why : !c ? null : c.kind === "new" ? `A new branch of it for ${ownerText(acting)}`
      : c.kind === "refused" ? `${ownerText(acting)} is the originator of this paper; its own line is not here`
        : `Goes into ${c.label}, the line of ${ownerText(acting)}`;
    const reinstates = o.status === "withdrawn" && !versionTitle
      ? "A new version reinstates the paper; the versions withdrawn stay withdrawn. Say why it is back in the change note." : null;
    return el("tr", { class: depth ? "branch" : "" },
      el("td", { style: depth ? `padding-left: ${0.4 + 1.2 * depth}em` : null },
        depth ? el("span", { class: "muted", "aria-hidden": "true" }, "\u21b3 ") : null,
        el("a", { href: explorerLink(s.baseUrl, { line: o.label }), title: uri(o), "data-line": `${o.name}:${o.owner}` },
          el("code", {}, o.label)),
        o.status === "withdrawn" ? el("span", { class: "chip bad" }, "withdrawn") : null,
        p ? el("span", { class: "chip", title: `A branch of sheaf:${p.name}:${p.owner}, from its document version ${p.documentVersion}` },
          parentLine ? `branch of ${parentLine.label}` : "branch") : null,
        several ? el("div", { class: "small muted" }, "owner ", ownerCode(o.owner)) : null),
      el("td", { "data-title": o.label }, titleOf(o)),
      el("td", { class: "actions" },
        el("button", { class: "small", disabled: blocked || (c && c.kind === "refused"), title: versionTitle || reinstates,
                       onclick: () => openForm("deposit", { "Label": o.label, "This deposit": NEW_VERSION }) },
          c && c.kind === "new" ? "New version (branch)" : "New version"),
        ownAct("notice", "Notice"),
        ownAct("relicense", "Licence"),
        o.status === "withdrawn" ? null : ownAct("withdraw", "Withdraw")));
  });
  return [el("table", { class: "papers" }, el("tr", {}, el("th", {}, "Label"), el("th", {}, "Title"), el("th", {}, "")), rows),
    others ? el("p", { class: "small muted" }, "Acting as ", ownerCode(acting), ": notices, licences and withdrawals are " +
      "given only by a line's owner, and are disabled on the lines of other owners; a new version of another owner's paper " +
      "goes into a branch of it for ", ownerCode(acting), ".") : null,
    foreign ? el("p", { class: "small muted" }, "The workflow signs for the default owner only: the lines of other owners " +
      "are changed with Write directly.") : null];
}

// A part of the archive's page (collections, papers) that can be folded; how
// it was left is kept in this browser.
function block(id, title, count, content) {
  const key = `${FOLDED}${id}`;
  const d = el("details", { class: "block", id: `block-${id}`, open: pref(key) !== "yes" },
    el("summary", {}, el("h3", {}, title, " ", el("span", { class: "small muted count" }, String(count)))),
    content);
  d.addEventListener("toggle", () => pref(key, d.open ? "" : "yes"));
  return d;
}

// --- signing in this page ---------------------------------------------------------

const ghCore = () => direct.github(() => token());

// The owners the archive hosts (its default owner first), and how the page
// shows one: its label in the archive, else its short owner name (section
// 12.2, at least 8 characters, unique in the archive); files and requests
// keep the full name, which is the title of what is shown.
const hosted = () => direct.hostedOwners(state.settings);
const ownerText = (o) => ownerShown(o, state.lines, state.short);
const ownerCode = (o) => el("code", { title: o }, ownerText(o));
const ownersList = (list) => list.map((o, i) => [i ? (i === list.length - 1 ? " and " : ", ") : "", ownerCode(o)]);

// The signers of an owner (the current keys of its key log), read once per
// repository; those of the default owner are also state.signers, which the
// setup of a wallet reads.
async function signersFor(owner) {
  if (!state.signersBy.has(owner)) {
    const got = await direct.signersOf({ gh: ghCore(), repo: state.repo, cache: state.cache, settings: state.settings, owner });
    state.signersBy.set(owner, got);
  }
  const got = state.signersBy.get(owner);
  if (state.settings && owner === state.settings.owner) state.signers = got;
  return got;
}

// Whether the keys this page holds reach the threshold of an owner's key log.
function unlockedOwner(owner) {
  const s = state.signersBy.get(owner) || (state.signers && state.signers.owner === owner ? state.signers : null);
  if (!s || !owner) return false;
  return state.keys.of(owner).filter((k) => s.dids.includes(k.did)).length >= s.threshold;
}

const unlockedOwners = () => hosted().filter(unlockedOwner);
function unlocked() { return unlockedOwners().length > 0; }

// The acting owner: the owner chosen among those unlocked (kept in this
// browser, per archive), else the default owner if unlocked, else the first
// unlocked; with nothing unlocked, the default owner, for whom the passkey
// is asked as before. Through the workflow, always the default owner.
function actingOwner() {
  const s = state.settings;
  if (!s) return "";
  if (viaWorkflow()) return s.owner;
  const open = unlockedOwners();
  const chosen = pref(ACTING + state.repo);
  if (chosen && open.includes(chosen)) return chosen;
  if (open.includes(s.owner)) return s.owner;
  return open[0] || s.owner;
}

function setActing(owner) {
  pref(ACTING + state.repo, owner && owner !== state.settings.owner ? owner : "");
}

// The wallets the person added by name, kept in this browser (names, never
// keys); and those given before for one owner (the earlier preference).
function givenWallets() {
  let list = [];
  try { list = JSON.parse(pref(WALLETS) || "[]"); } catch (_) { list = []; }
  if (!Array.isArray(list)) list = [];
  for (const o of hosted()) { const w = pref(WALLET + o); if (w && !list.includes(w)) list.push(w); }
  return list.filter((w) => typeof w === "string" && direct.walletName({}, w));
}

function addWallet(w) {
  const list = givenWallets();
  if (!list.includes(w)) pref(WALLETS, JSON.stringify([...list, w]));
}

function removeWallet(w) {
  for (const o of hosted()) if (pref(WALLET + o) === w) pref(WALLET + o, "");
  pref(WALLETS, JSON.stringify(givenWallets().filter((x) => x !== w)));
  if (state.wallets.chosen === w) state.wallets.chosen = "";
}

const walletChoices = () => direct.walletChoices(state.settings, givenWallets());

// The wallet chosen (step 1): the one chosen in this tab, else the first
// hinted for the default owner, else the first.
function chosenWallet() {
  const all = walletChoices();
  if (state.wallets.chosen && all.some((c) => c.wallet === state.wallets.chosen)) return state.wallets.chosen;
  const s = state.settings;
  const first = all.find((c) => c.hinted.includes(s.owner)) || all[0];
  return first ? first.wallet : "";
}

// The owners of the archive whose keys a wallet holds (step 2), read once
// per wallet in the background; then drawn again.
function walletOwnersOf(w) {
  const known = state.wallets.owners.get(w);
  if (known) return known;
  const entry = { loading: true, list: [], error: "" };
  state.wallets.owners.set(w, entry);
  const repo = state.repo;
  direct.walletOwners({ gh: ghCore(), archiveRepo: repo, wallet: w, settings: state.settings })
    .then((list) => {
      entry.list = list;
      if (!state.wallets.selected.has(w)) {
        // the owners chosen at first: those hinted for this wallet, else all
        const hint = (walletChoices().find((c) => c.wallet === w) || { hinted: [] }).hinted;
        const pick = list.map((x) => x.owner).filter((o) => hint.includes(o));
        state.wallets.selected.set(w, new Set(pick.length ? pick : list.map((x) => x.owner)));
      }
    })
    .catch((e) => { entry.error = e.message; })
    .finally(() => { entry.loading = false; if (state.repo === repo) showArchive(); });
  return entry;
}

const selectedIn = (w) => state.wallets.selected.get(w) || new Set();

// How the changes are written, chosen above the forms: directly (carried
// out and signed in this page, with the keys that passkeys unlock) or by the
// archive's workflow. Only what the mode chosen needs is shown; how it works
// is folded away.
function signingPanel() {
  const s = state.settings;
  const viaWf = viaWorkflow();
  const choose = (workflow) => { pref(VIA_WORKFLOW, workflow ? "yes" : ""); showArchive(); };
  const mode = (value, text, checked) => el("label", { class: checked ? "on" : "" },
    el("input", { type: "radio", name: "write-mode", value, checked, onchange: () => choose(value === "workflow") }), text);
  const modes = el("div", { class: "modes", role: "radiogroup", "aria-label": "How the changes are written" },
    mode("direct", "Write directly", !viaWf), mode("workflow", "Through the workflow", viaWf));
  const how = (...content) => el("details", { class: "how small muted" }, el("summary", {}, "How it works"), ...content);
  let body;
  if (viaWf) {
    const others = hosted().length > 1;
    body = [
      el("p", {}, "Each change is sent as a request; the archive's workflow carries it out, signs it and commits it, in a minute or two."),
      el("p", { class: "small" }, "The workflow signs only for the default owner, ", ownerCode(s.owner), ". ",
        others ? "Changes by another owner of the archive, and branches of another owner's paper, need Write directly."
          : "Branches of a paper by another owner need Write directly."),
      how(el("p", {}, "The workflow signs with the default owner's key for the workflows, kept in the repository secret ",
        el("code", {}, "OPENSHEAF_SIGNING_KEY"), ". Its answers appear under Activity, at the bottom of the page."))];
  } else {
    const open = unlockedOwners();
    body = [];
    if (open.length) {
      const acting = actingOwner();
      const select = el("select", { id: "acting-owner", "aria-label": "Act as",
                                    onchange: (ev) => { setActing(ev.target.value); showArchive(); } },
        open.map((o) => el("option", { value: o, selected: o === acting }, ownerText(o) + (o === s.owner ? " (default owner)" : ""))));
      body.push(
        el("p", {}, "✓ Unlocked: ", open.map((o, i) => [i ? ", " : "", ownerCode(o),
            state.keys.wallet(o) ? el("span", { class: "small muted" }, ` (${state.keys.wallet(o).slice(7)})`) : ""]), " ",
          el("button", { class: "small", onclick: () => { state.keys.forget(); state.wallets.next = null; showArchive();
                                                         message("info", "The keys are locked."); } }, "Lock")),
        el("div", { class: "controls" }, el("label", { for: "acting-owner" }, "Act as"), select),
        el("p", { class: "small muted" }, "New papers and collections are this owner's. A new version of another owner's " +
          "paper goes into this owner's branch of it, made if needed. Notices, licences and withdrawals are given on its own lines only."));
    }
    body.push(walletsPanel(open.length > 0));
    body.push(how(el("p", {}, "Each change is carried out in this page and committed to the repository, signed with the current " +
        "keys of the acting owner from a key wallet. Your passkey unlocks them in a window of unlock.opensheaf.org; you then type " +
        "here the code that window shows. The keys stay in this page's memory, and are forgotten when it is closed or locked."),
      el("p", {}, "A wallet is a private repository where ", el("code", {}, "osheaf key push"), " put the current keys of " +
        "one owner or several, and ", el("code", {}, "osheaf key enroll"), " a passkey; the OpenSheaf app must be installed on " +
        "it too (the page only reads it). A wallet may be a group's, shared by its members (each with a passkey of their own), " +
        "and an owner's keys may be in several wallets. Choose a wallet, then the owners to unlock in it; owners unlocked from " +
        "several wallets add up. One touch unlocks one owner, or two when one passkey opens both.")));
  }
  return el("div", { class: `notice signing${!viaWf && unlocked() ? " ok" : ""}` }, modes, body);
}

// The wallets (step 1) and the owners in the one chosen (step 2), with the
// button that unlocks them; folded once an owner is unlocked. Then the setup
// of a wallet, for an owner chosen.
function walletsPanel(folded) {
  const s = state.settings;
  const w = chosenWallet();
  const choices = walletChoices();
  const pick = (v) => { state.wallets.chosen = v; showArchive(); };
  const list = choices.length ? el("ul", { class: "wallets" }, choices.map((c) => el("li", {},
    el("label", {}, el("input", { type: "radio", name: "wallet-choice", value: c.wallet, checked: c.wallet === w,
                                  onchange: () => pick(c.wallet) }), " ", el("code", {}, c.wallet)),
    c.hinted.length ? el("span", { class: "small muted" }, " hinted for ", ownersList(c.hinted)) : null,
    c.given ? [el("span", { class: "small muted" }, " added here "),
      el("button", { type: "button", class: "small link", title: "Forget this wallet in this browser",
                     onclick: () => { removeWallet(c.wallet); showArchive(); } }, "remove")] : null)))
    : el("p", { class: "small muted" }, "The archive hints no wallet. Add yours by its name.");
  const input = el("input", { id: "wallet", placeholder: "github:you/opensheaf-keys", "aria-label": "Key wallet to add" });
  const add = el("form", { class: "controls", onsubmit: (ev) => {
    ev.preventDefault();
    const v = direct.walletName({}, input.value);
    if (!v) { message("bad", "Name the wallet as github:OWNER/REPOSITORY."); return; }
    addWallet(v);
    pick(v);
  } }, input, el("button", { type: "submit" }, "Add a wallet"));
  const steps = [el("h4", {}, "1. The key wallet"), list, add];
  steps.push(el("h4", {}, "2. The owners in it"));
  if (!w) steps.push(el("p", { class: "muted small" }, "Once a wallet is chosen."));
  else {
    const held = walletOwnersOf(w);
    if (held.loading) steps.push(el("p", { class: "small muted" }, `Reading ${w} ...`));
    else if (held.error) steps.push(el("p", { class: "small bad" }, `${held.error}.`),
      el("p", {}, el("button", { class: "small", onclick: () => { state.wallets.owners.delete(w); showArchive(); } }, "Read it again")));
    else if (!held.list.length) steps.push(el("p", { class: "small" }, `${w} holds no keys of the owners of this archive. ` +
      "Set it up below, or choose another wallet."));
    else {
      const sel = selectedIn(w);
      steps.push(el("ul", { class: "owners" }, held.list.map((x) => {
        const done = unlockedOwner(x.owner);
        return el("li", {}, el("label", {}, el("input", { type: "checkbox", checked: done || sel.has(x.owner), disabled: done,
            onchange: (ev) => { const set = new Set(selectedIn(w)); if (ev.target.checked) set.add(x.owner); else set.delete(x.owner);
                                state.wallets.selected.set(w, set); } }), " ", ownerCode(x.owner),
            x.owner === s.owner ? " (default owner)" : ""),
          el("span", { class: "small muted" }, ` ${x.entries} key${x.entries === 1 ? "" : "s"}: ${x.locks}`),
          done ? el("span", { class: "chip ok" }, "unlocked") : null);
      })));
      const next = state.wallets.next && state.wallets.next.wallet === w ? state.wallets.next : null;
      steps.push(el("div", { class: "controls" },
        el("button", { class: "primary", onclick: () => unlockKeys().then(() => showArchive(), () => showArchive()) },
          "Unlock the chosen owners with your passkey"),
        next ? el("button", { onclick: () => unlockNext().then(() => showArchive(), () => showArchive()) },
          ["Unlock the next: ", ownersList(next.plan.batches[0].owners)]) : null));
    }
  }
  steps.push(setupPanel());
  const d = el("details", { class: "how wallets-panel", open: folded ? (state.wallets.open || undefined) : true,
                            ontoggle: (ev) => { if (folded) state.wallets.open = ev.target.open; } },
    el("summary", {}, folded ? "Key wallets: unlock more owners" : "Key wallets"), steps);
  return d;
}

// --- setting up a key wallet ---------------------------------------------------------

// Folded under "Write directly" while the keys are locked: the wallet (a
// private repository the person creates, with the app installed), the
// owner's current key put there locked with the passphrase (as osheaf key
// push), a passkey enrolled (as osheaf key enroll) in the popup of
// unlock.opensheaf.org. The panel is kept across redrawings of the archive,
// so that what is typed in it stays; secrets typed are cleared once used.
//
// The setup is for one owner of the archive at a time (by default its
// default owner), chosen in the panel, and for the wallet chosen above: a
// member of a group whose wallet is set up already only enrols a passkey
// of their own there (step 3), possibly the passkey that opens another
// owner of the wallet, so that one touch opens both.
const setup = { repo: null, node: null, state: null, busy: false, keyMode: "file", source: null, pending: null,
                owner: "", wallet: "" };

// The owner and the wallet of the setup, and the settings and signers of
// that owner.
const setupOwner = () => (setup.owner && hosted().includes(setup.owner) ? setup.owner : state.settings.owner);
const setupSettings = () => ({ ...state.settings, owner: setupOwner() });
const setupSigners = () => state.signersBy.get(setupOwner()) || null;

function setupPanel() {
  const fresh = setup.repo !== state.repo || !setup.node;
  const wallet = chosenWallet() || direct.walletName(state.settings, "", setupOwner());
  if (fresh || setup.wallet !== wallet) {
    direct.forgetNewKey(setup.pending);
    Object.assign(setup, { repo: state.repo, state: null, busy: false, keyMode: "file", source: null, pending: null,
                           checking: null, shownOpen: null, wallet, owner: fresh ? "" : setup.owner });
    setup.node = el("details", { class: "how setup" });
    setup.node.addEventListener("toggle", () => { if (setup.node.open && !setup.body) renderSetup(); });
    setup.body = null;
    setup.node.append(el("summary", {}, "Set up a key wallet"));
  }
  setupSummary();
  checkQuietly();
  return setup.node;
}

// Another owner chosen for the setup: what was checked is checked again.
function setupFor(owner) {
  if (owner === setupOwner()) return;
  direct.forgetNewKey(setup.pending);
  Object.assign(setup, { owner, state: null, pending: null, checking: null, shownOpen: null });
  checkQuietly();
  renderSetup();
}

// Whether the wallet is ready: it holds enough of the owner's current keys
// to sign, and a passkey opens enough of them (as checked by setupState).
function walletReady(st = setup.state) {
  const s = setupSigners();
  return Boolean(st && s && st.there.length >= s.threshold && st.enrolled.length >= s.threshold);
}

// The panel's title and whether it is open, from the checked state: ready,
// folded as "The key wallet: ready (manage)"; checked and not ready, open;
// not checked yet, folded. Opened or closed by the person, it stays so.
function setupSummary() {
  const ready = walletReady();
  const summary = setup.node.querySelector("summary");
  summary.textContent = ready ? `The key wallet of ${ownerText(setupOwner())}: \u2713 ready (manage)` : "Set up a key wallet";
  const open = setup.state ? !ready : false;
  if (setup.shownOpen !== open) {
    setup.shownOpen = open;
    if (setup.node.open !== open) {
      setup.node.open = open;
      if (open && !setup.body) renderSetup();
    }
  }
}

// A wallet set up here that holds keys of the owner is recorded in the
// archive's osheaf.json as a hint for that owner, in a commit, when the
// archive does not hint it for the owner yet (as osheaf key wallet --owner
// OWNER --add records it: an owner may have several wallets), and the
// person is told; a refusal (no write access) leaves the archive as it is.
async function recordWalletIfNone(w) {
  const s = state.settings, owner = setupOwner();
  if (!s || !owner || !setup.state || !setup.state.there.length) return;
  if (core.walletHints(s.keys, owner).includes(w)) return;
  try {
    const got = await direct.recordWallet({ gh: ghCore(), repo: state.repo, owner, wallet: w, cache: state.cache });
    if (got.recorded) {
      const keys = s.keys && typeof s.keys === "object" ? s.keys : {};
      const mine = keys[owner] && typeof keys[owner] === "object" ? keys[owner] : {};
      s.keys = { ...keys, [owner]: { ...mine, wallets: [...(Array.isArray(mine.wallets) ? mine.wallets : []), w] } };
      message("ok", `${w} is now recorded in the archive's osheaf.json as a key wallet of ${ownerText(owner)} (commit ` +
        `${(got.commit && got.commit.sha || String(got.commit || "")).slice(0, 7)}), so that osheaf and this page look for ` +
        "its keys there.");
    }
  } catch (e) {
    message("warn", `${w} was not recorded in the archive's osheaf.json: ${e.message}. Record it with ` +
      `osheaf key wallet --owner ${owner} --add ${w}.`);
  }
}

// The wallet named, checked once in the background when the archive opens
// (no message), so that the panel shows how it stands.
function checkQuietly() {
  const s = state.settings, repo = state.repo, owner = setupOwner();
  if (!s || !owner || setup.state || setup.checking || setup.busy) return;
  const w = setup.wallet;
  if (!w) return;
  const gh = ghCore();
  setup.checking = (async () => {
    const signers = await signersFor(owner);
    const st = await direct.setupState({ gh, archiveRepo: repo, settings: setupSettings(), wallet: w, signers });
    if (state.repo !== repo || setup.repo !== repo || setup.state || setupOwner() !== owner || setup.wallet !== w) return;
    setup.state = st;
    setupSummary();
    if (setup.body) renderSetup();
  })().catch(() => { /* said when checked by hand */ }).finally(() => { setup.checking = null; });
}

function installLink(walletOwner) {
  const inst = (state.installations || []).find((i) => i.account && i.account.login.toLowerCase() === walletOwner.toLowerCase());
  if (inst && inst.html_url) return inst.html_url;
  return APP_SLUG ? `https://github.com/apps/${APP_SLUG}/installations/new` : "https://github.com/settings/installations";
}

const short = (did) => el("code", { title: did }, `${did.slice(8, 20)}...`);

function renderSetup() {
  const s = setupSettings();
  const owner = s.owner;
  const st = setup.state;
  // the wallet chosen above (step 1 there), else a name to create
  const given = () => setup.wallet || `github:${state.user ? state.user.login : "you"}/opensheaf-keys`;
  const walletInput = el("code", { id: "setup-wallet" }, given());
  const name = () => direct.walletName({}, given());
  const ownerPick = hosted().length > 1 ? el("div", { class: "controls" }, el("label", { for: "setup-owner" }, "For the owner"),
    el("select", { id: "setup-owner", onchange: (ev) => setupFor(ev.target.value) },
      hosted().map((o) => el("option", { value: o, selected: o === owner }, ownerText(o) + (o === state.settings.owner ? " (default owner)" : ""))))) : null;
  const links = el("span", { class: "small" });
  const drawLinks = () => {
    const w = name();
    links.replaceChildren(...(w ? [el("a", { href: direct.newRepositoryUrl(w), target: "_blank", rel: "noopener" }, "Create it on GitHub"),
      " (private), then ", el("a", { href: installLink(w.slice(7).split("/")[0]), target: "_blank", rel: "noopener" },
        "add it to the OpenSheaf app's repositories"), "."] : ["Name it github:OWNER/REPOSITORY."]));
  };
  drawLinks();
  const busy = (b) => { setup.busy = b; setup.node.querySelectorAll("button").forEach((x) => { x.disabled = b; }); };
  const check = async () => {
    const w = name();
    if (!w) { message("bad", "Name the wallet as github:OWNER/REPOSITORY."); return; }
    busy(true);
    message("info", `Checking ${w} ...`);
    try {
      const gh = ghCore();
      const signers = await signersFor(owner);
      setup.state = await direct.setupState({ gh, archiveRepo: state.repo, settings: s, wallet: w, signers });
      if (!walletChoices().some((c) => c.wallet === w)) addWallet(w);
      state.wallets.chosen = w;
      setup.wallet = w;
      message("ok", `${w} is private, and this sign-in can read and write it.`);
      await recordWalletIfNone(w);
    } catch (e) {
      setup.state = null;
      message("bad", `The wallet ${w} cannot be used: ${e.message}.`);
    } finally {
      busy(false);
      renderSetup();
    }
  };
  const steps = [
    el("p", {}, "The page puts the owner's current key in a key wallet, locked with a passphrase, and lets your passkey " +
      "open it, as ", el("code", {}, "osheaf key push"), " and ", el("code", {}, "osheaf key enroll"), " do: the same files, " +
      "which osheaf reads too. Each change is a commit to the wallet. In a group's wallet set up already, only step 3 is " +
      "yours: your own passkey."),
    ownerPick,
    el("h4", {}, "1. The wallet"),
    el("p", {}, "A private repository, never the archive's: the wallet chosen above, or a new one (add its name above): "),
    el("div", { class: "controls" }, walletInput, el("button", { onclick: check }, "Check the wallet")),
    el("p", {}, links),
  ];
  if (st) {
    const signers = setupSigners();
    steps.push(el("p", { class: "small" }, `${st.wallet.name}: holds ${st.there.length} of the ${signers.dids.length} current ` +
      `key(s) of the owner`, st.there.length ? [" (", st.there.map((d, i) => [i ? ", " : "", short(d)]), ")"] : "",
      `; ${st.enrolled.length} open(s) with a passkey.`));
    const existingKey = () => {
      const file = el("input", { type: "file", id: "setup-key-file", accept: ".key,.txt,text/plain", "aria-label": "Key file" });
      const pasted = el("textarea", { id: "setup-key-text", rows: 2, spellcheck: "false", autocomplete: "off",
                                      placeholder: "or paste the key here", "aria-label": "Key" });
      const pass = el("input", { type: "password", id: "setup-pass", name: "wallet-passphrase-push", autocomplete: "new-password",
                                 "aria-label": "Passphrase", placeholder: "passphrase" });
      const again = st.confirm ? el("input", { type: "password", id: "setup-pass-again", autocomplete: "new-password",
                                              "aria-label": "Passphrase again", placeholder: "passphrase again" }) : null;
      const put = async () => {
        let text = pasted.value;
        if (file.files && file.files[0]) text = await file.files[0].text();
        if (!text.trim()) { message("bad", "Choose the key file, or paste the key."); return; }
        if (!pass.value) { message("bad", "Type the passphrase that locks the key."); return; }
        if (again && pass.value !== again.value) { message("bad", "The two passphrases differ."); return; }
        busy(true);
        message("info", "Locking the key with the passphrase and putting it in the wallet ...");
        try {
          const got = await direct.pushCurrentKey({ state: st, settings: s, signers: setupSigners(), keyText: text,
                                                    passphrase: pass.value });
          message("ok", got.put ? `The current key ${got.did.slice(8, 20)}... is in ${st.wallet.name}, locked with the passphrase.`
                                : `The current key ${got.did.slice(8, 20)}... was in ${st.wallet.name} already: left as it is.`);
          setup.state = await direct.setupState({ gh: ghCore(), archiveRepo: state.repo, settings: s,
                                                  wallet: st.wallet.name, signers: setupSigners() });
          await recordWalletIfNone(st.wallet.name);
        } catch (e) {
          message("bad", `The key was not put in the wallet: ${e.message}.`);
        } finally {
          text = "";
          pasted.value = "";
          pass.value = "";
          if (again) again.value = "";
          try { file.value = ""; } catch (_) { /* some browsers */ }
          busy(false);
          renderSetup();
        }
      };
      return [
        el("p", {}, "The key as ", el("code", {}, "osheaf"), " keeps it on your computer: the file ",
          el("code", {}, `~/.config/opensheaf/keys/${s.owner.slice(0, 8)}.../K.key`), " (one line), or, if it is in your " +
          "system's credential store, the text of ", el("code", {}, "osheaf key export --stdout"), ". It must be one of the " +
          "current keys of the owner's key log. It is read in this page only, and its seed is wiped once it is locked."),
        el("div", { class: "controls" }, file), pasted,
        el("p", { class: "small" }, st.confirm ? "A new passphrase for the wallet, twice (keep it: osheaf asks it too)."
          : "The passphrase of the keys already in the wallet (checked against them)."),
        el("form", { class: "controls", onsubmit: (ev) => { ev.preventDefault(); put(); } },
          pass, again, el("button", { type: "submit", class: "primary" }, "Put the key in the wallet"))];
    };
    steps.push(el("h4", {}, "2. The current key"));
    const enough = st.there.length >= signers.threshold;
    if (setup.pending) {
      steps.push(newKeyPending(st));
    } else if (!st.missing.length) {
      steps.push(el("p", {}, "✓ The owner's current keys are in the wallet."));
    } else {
      const choose = (m) => { setup.keyMode = m; renderSetup(); };
      const option = (value, text) => el("label", { class: setup.keyMode === value ? "on" : "" },
        el("input", { type: "radio", name: "setup-key-mode", value, checked: setup.keyMode === value, onchange: () => choose(value) }), text);
      const body = [
        el("div", { class: "modes", role: "radiogroup", "aria-label": "The current key" },
          option("file", "Use an existing key file"), option("new", "Create a new key here")),
        setup.keyMode === "new" ? newKeyForm(st) : existingKey()];
      if (enough) {
        steps.push(el("p", {}, `✓ The wallet holds ${st.there.length} of the owner's current keys, enough to sign (the key log ` +
          `needs ${signers.threshold}).`), el("details", { class: "how small", open: setup.addOpen || undefined,
          ontoggle: (ev) => { setup.addOpen = ev.target.open; } }, el("summary", {}, "Add another current key"), body));
      } else {
        steps.push(...body);
      }
    }
    steps.push(el("h4", {}, "3. Your passkey"));
    const plan = st.plans.enrolled;
    if (!st.there.length) {
      steps.push(el("p", { class: "muted" }, "Once the current key is in the wallet."));
    } else if (plan && !plan.todo.length && st.enrolled.length >= signers.threshold) {
      steps.push(el("p", {}, "✓ Your passkey opens the owner's keys in the wallet. Click ", el("strong", {}, "Unlock with your passkey"),
        " above."));
    } else {
      // new-password and a name of its own: browsers fill a current-password
      // field with a saved password, which is not the wallet's
      const pass = el("input", { type: "password", id: "setup-enroll-pass", name: "wallet-passphrase-enroll",
                                 autocomplete: "new-password",
                                 "aria-label": "Passphrase", placeholder: "passphrase of the wallet" });
      const fresh = plan && plan.known.length ? el("input", { type: "checkbox", id: "setup-new-passkey" }) : null;
      const enroll = () => {
        if (!pass.value) { message("bad", "Type the passphrase of the keys in the wallet."); return; }
        const passphrase = pass.value;
        pass.value = "";
        busy(true);
        message("info", "Opening the keys with the passphrase; use your passkey in the window of unlock.opensheaf.org ...");
        direct.enrollPasskey({ state: st, settings: s, passphrase, askCode, newPasskey: Boolean(fresh && fresh.checked) })
          .then(async (done) => {
            message("ok", done.length ? `Your passkey now opens ${done.length} key(s) of the owner in ${st.wallet.name}, ` +
              "and the passphrase still does. Unlock with your passkey above." : "Every key there opens with your passkey already.");
            setup.state = await direct.setupState({ gh: ghCore(), archiveRepo: state.repo, settings: s,
                                                    wallet: st.wallet.name, signers: setupSigners() });
            state.wallets.owners.delete(st.wallet.name);
          })
          .catch((e) => message("bad", `No passkey was enrolled: ${e.message}.`))
          .finally(() => { busy(false); renderSetup(); });
      };
      steps.push(
        el("p", {}, plan && plan.borrowed
          ? "A passkey of yours opens the keys of another owner of this wallet: it is used for this owner too (Touch ID, " +
            "in a window of unlock.opensheaf.org), so that one touch then unlocks both."
          : plan && plan.known.length
          ? "A passkey of yours opens some keys of the owner already: it is used for the others (Touch ID, in a window " +
            "of unlock.opensheaf.org)."
          : "A passkey is created for unlock.opensheaf.org, named after the owner (Touch ID twice, in a window of " +
            "unlock.opensheaf.org); you then type here the code it shows. The keys are opened with the passphrase first."),
        fresh ? el("p", { class: "small" }, el("label", {}, fresh, plan.borrowed ? " Create a passkey for this owner alone instead"
          : " Create a new passkey instead (another device or provider)")) : null,
        el("form", { class: "controls", onsubmit: (ev) => { ev.preventDefault(); enroll(); } },
          pass, el("button", { type: "submit", class: "primary" }, plan && plan.known.length ? "Add your passkey" : "Create the passkey")));
    }
  }
  setup.body = el("div", { class: "setup-body" }, steps);
  setup.node.replaceChildren(setup.node.firstChild, setup.body);
  if (setup.busy) busy(true);
  setupSummary();
}

// Step 2, the other way: a new current key made in this page, added to the
// owner's key log by a new version signed by the owner's rotation keys (the
// files osheaf exported, or the wallet's), as osheaf owner rotate --add
// does; committed to the archive, then put in the wallet (direct.js). With
// files, the new rotation keys are offered as files and sheets first, and
// nothing is committed until their checks are typed back. Secrets typed are
// cleared once read; the keys are in this page's memory only.
function newKeyForm(st) {
  const s = setupSettings(), signers = setupSigners();
  const fromWallet = st.rotationInWallet;
  const source = fromWallet ? (setup.source || "wallet") : "files";
  const need = signers.nextThreshold, of = (signers.next || []).length;
  const files = el("input", { type: "file", id: "setup-rotation-files", multiple: true, accept: ".txt,text/plain",
                              "aria-label": "Rotation-key files" });
  // hidden unless asked for: browsers fill password fields with a saved
  // password (whatever autocomplete says), which then failed as the files'
  const filesPass = el("input", { type: "password", id: "setup-rotation-pass", name: "rotation-files-passphrase",
                                  autocomplete: "new-password", "aria-label": "Passphrase of the rotation-key files",
                                  placeholder: "passphrase of the files", hidden: true });
  const otherPass = el("input", { type: "checkbox", id: "setup-rotation-other",
                                  onchange: () => { filesPass.hidden = !otherPass.checked; if (!otherPass.checked) filesPass.value = ""; } });
  const pass = el("input", { type: "password", id: "setup-new-pass", name: "wallet-passphrase-newkey", autocomplete: "new-password",
                             "aria-label": "Passphrase", placeholder: "passphrase" });
  const again = st.confirm ? el("input", { type: "password", id: "setup-new-pass-again", autocomplete: "new-password",
                                          "aria-label": "Passphrase again", placeholder: "passphrase again" }) : null;
  const pick = (v) => { setup.source = v; renderSetup(); };
  const sourceOption = (value, text) => el("label", {}, el("input", { type: "radio", name: "setup-rotation-source", value,
    checked: source === value, onchange: () => pick(value) }), " ", text);
  const busy = (b) => { setup.busy = b; setup.node.querySelectorAll("button").forEach((x) => { x.disabled = b; }); };
  const make = async () => {
    const given = [];
    if (source === "files") {
      for (const f of (files.files ? [...files.files] : [])) given.push({ name: f.name, text: await f.text() });
      if (given.length < need) { message("bad", `Choose ${need} of the rotation-key files of v${signers.number} of the key log.`); return; }
    }
    if (!pass.value) { message("bad", "Type the passphrase that locks the keys in the wallet."); return; }
    if (again && pass.value !== again.value) { message("bad", "The two passphrases differ."); return; }
    const passphrase = pass.value, filesPassphrase = otherPass.checked ? filesPass.value : "";
    if (otherPass.checked && !filesPassphrase) { message("bad", "Type the passphrase of the rotation-key files."); return; }
    pass.value = ""; filesPass.value = ""; if (again) again.value = "";
    try { files.value = ""; } catch (_) { /* some browsers */ }
    busy(true);
    message("info", source === "wallet" ? "Opening the rotation keys of the wallet and making the new keys ..."
      : "Reading the rotation keys and making the new keys ...");
    try {
      setup.pending = await direct.prepareNewKey({ state: st, settings: s, signers, source, files: given, passphrase,
                                                   filesPassphrase });
      given.length = 0;
      if (source === "wallet") {
        await finishNewKey(st, []);
        return;
      }
      message("info", "Save the new rotation keys, then type their checks to commit the new version of the key log.");
    } catch (e) {
      direct.forgetNewKey(setup.pending);
      setup.pending = null;
      message("bad", `No key was made: ${e.message}.`);
    } finally {
      given.length = 0;
      busy(false);
      renderSetup();
    }
  };
  return [
    el("p", {}, "The page makes a new current key, adds it to the owner's key log by a new version (v" + (signers.number + 1) +
      "), as ", el("code", {}, "osheaf owner rotate --add"), " does, commits that version to the archive and puts the key in the " +
      "wallet. The owner's other current keys stay. The new version is signed by " + need + " of the " + of + " rotation keys of v" +
      signers.number + ", and commits " + of + " new ones."),
    el("p", { class: "small muted" }, "The rotation keys pass through this page's memory, as they would pass through osheaf's on " +
      "your computer. The maximum security level keeps them offline, used by osheaf alone: prefer the key file, or osheaf key new " +
      "and osheaf owner rotate --add on your computer, when you can."),
    fromWallet ? el("p", { class: "controls" }, sourceOption("wallet", `The rotation keys kept in ${st.wallet.name}`),
      sourceOption("files", "Rotation-key files")) : null,
    source === "files" ? [
      el("p", { class: "small" }, `${need} of the files `, el("code", {}, `rotation-${s.owner.slice(0, 16)}-K.txt`),
        ` of v${signers.number} of the key log, as osheaf exported them (or typed sheets). The new rotation keys are then given ` +
        "to you the same way, locked with the passphrase, and the version is committed once you have saved them."),
      el("div", { class: "controls" }, files),
      el("p", { class: "small controls" }, el("label", {}, otherPass, " The files have another passphrase than the wallet's"),
        filesPass)]
      : el("p", { class: "small" }, "The rotation keys are opened with the passphrase; the new ones are put in the wallet, " +
        "locked with it, before the version is committed (as osheaf owner rotate --keys)."),
    el("p", { class: "small" }, st.confirm ? "A new passphrase for the wallet, twice (keep it: osheaf asks it too)."
      : "The passphrase of the keys already in the wallet (checked against them)."),
    el("form", { class: "controls", onsubmit: (ev) => { ev.preventDefault(); make(); } },
      pass, again, el("button", { type: "submit", class: "primary" }, "Make the new key")),
  ];
}

// A file offered for download, from text or bytes in memory. One click
// downloads one file: several files go as one zip (zip.js).
function download(name, text, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = el("a", { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// The rotation-key files as one zip, the files at its top level with
// osheaf's names.
function saveAllButton(files, owner, version) {
  return el("button", { type: "button", class: "primary", onclick: () =>
    download(rotationZipName(owner, version), storedZip(files), "application/zip") }, "Save all the files (a zip)");
}

// The sheets of the rotation keys printed, as osheaf --print prints them:
// only they are shown while printing.
function printSheets(files) {
  const box = el("div", { class: "print-sheets" }, files.map((f) => el("pre", {}, f.sheet)));
  document.body.append(box);
  document.body.classList.add("printing-sheets");
  const done = () => { box.remove(); document.body.classList.remove("printing-sheets"); window.removeEventListener("afterprint", done); };
  window.addEventListener("afterprint", done);
  window.print();
  setTimeout(done, 1000);
}

// A new key made: its rotation keys to save and confirm, or, once
// committed, the key to put in the wallet again if that failed.
function newKeyPending(st) {
  const p = setup.pending, signers = setupSigners();
  const cancel = el("button", { type: "button", onclick: () => {
    direct.forgetNewKey(p);
    setup.pending = null;
    message("info", "Cancelled: nothing was written to the key log, and the new keys are forgotten (delete any file saved).");
    renderSetup();
  } }, "Cancel");
  if (p.committed) {
    return el("div", {}, el("p", { class: "bad" }, `v${p.committed.number} of the key log is committed, with the new current key `,
        short(p.current ? p.current.did : ""), `, but it is not in the wallet yet. Keep this page open, and try again:`),
      el("div", { class: "controls" }, el("button", { class: "primary", onclick: () => finishNewKey(st, []) }, "Put the key in the wallet")));
  }
  if (p.files) {
    const checks = p.files.map((f) => el("input", { class: "check", size: 6, autocomplete: "off", spellcheck: "false",
                                                    "aria-label": `Check of ${f.name}`, placeholder: "check" }));
    return el("div", {},
      el("p", {}, el("strong", {}, `Save the ${p.files.length} new rotation keys`), ` of v${p.version} of the key log, before ` +
        "anything is committed: each file apart from your computer and from the others (or print the sheets), as " +
        "osheaf owner rotate --export asks. They are locked with the passphrase. " +
        `${signers.nextThreshold} of them sign the next version of the key log.`),
      el("ul", { class: "rotation-files" }, p.files.map((f, k) => el("li", {},
        el("a", { href: "#", onclick: (ev) => { ev.preventDefault(); download(f.name, f.text); } }, f.name),
        "  check ", el("code", {}, f.check), "  ", checks[k]))),
      el("p", { class: "controls" }, saveAllButton(p.files, setupOwner(), p.version),
        el("button", { type: "button", onclick: () => printSheets(p.files) }, "Print the sheets")),
      el("p", { class: "small" }, "Save all the files gives one zip of the files, under the names osheaf gives them: unpack it " +
        "onto the offline media (each file apart from the others), then delete the zip from this computer. Or save each file " +
        "by its link. Then type the check of each file next to it, to confirm that they are put away; the new version " +
        "of the key log is committed only then."),
      el("form", { class: "controls", onsubmit: (ev) => { ev.preventDefault(); finishNewKey(st, checks.map((c) => c.value)); } },
        el("button", { type: "submit", class: "primary" }, "Confirm and commit"), cancel));
  }
  return el("div", {}, el("p", { class: "bad" }, `v${p.version} of the key log is not committed yet` +
      (p.source === "wallet" ? " (the new rotation keys are in the wallet already)" : "") + ". Try again, or cancel:"),
    el("div", { class: "controls" }, el("button", { class: "primary", onclick: () => finishNewKey(st, []) }, "Commit the new version"),
      cancel));
}

// The version committed, then the key put in the wallet; the archive and
// the setup read again.
async function finishNewKey(st, typed) {
  const p = setup.pending, s = setupSettings(), repo = state.repo;
  const say = { wallet: "Putting the new rotation keys in the wallet ...", reading: "Reading the archive ...",
                "carrying out": "Making the new version of the key log ...", committing: "Signed; committing to the repository ..." };
  setup.busy = true;
  setup.node.querySelectorAll("button").forEach((x) => { x.disabled = true; });
  try {
    if (!p.committed) {
      try {
        await direct.commitNewKey({ gh: ghCore(), repo, pending: p, state: st, settings: s, cache: state.cache, typed,
                                    progress: (x) => message("info", say[x] || x) });
      } catch (e) {
        message("bad", `Nothing was committed: ${e.message}.`);
        return;
      }
      watchSite(repo, p.committed.commit.sha);
    }
    const number = p.committed.number, did = p.current.did;
    message("info", "Committed; putting the new current key in the wallet ...");
    try {
      await direct.putNewKey({ pending: p, state: st, settings: s });
    } catch (e) {
      message("bad", `v${number} of the key log is committed, but the new current key could not be put in the wallet: ` +
        `${e.message}. It is kept in this page: keep it open, and click "Put the key in the wallet" to try again.`);
      return;
    }
    setup.pending = null;
    message("ok", `v${number} of the key log adds the new current key ${did.slice(8, 20)}..., committed to the archive; the key ` +
      `is in ${st.wallet.name}, locked with the passphrase. Now enroll your passkey (step 3).`);
    try {
      state.signersBy.delete(s.owner);
      const signers = await signersFor(s.owner);
      setup.state = await direct.setupState({ gh: ghCore(), archiveRepo: repo, settings: s, wallet: st.wallet.name,
                                              signers });
      const a = await readArchive(await token(), repo, { ref: p.committed.commit.sha });
      refreshArchive(repo, a, p.committed.commit.sha);
    } catch (_) { /* read again when the page is */ }
  } finally {
    setup.busy = false;
    if (setup.pending === p || !setup.pending) renderSetup();
  }
}

// The code that the popup shows, typed here: the page opens the popup's
// answer only with it.
function askCode() {
  return new Promise((resolve, reject) => {
    const input = el("input", { id: "unlock-code", inputmode: "numeric", autocomplete: "one-time-code",
                                placeholder: "123 456", "aria-label": "Code" });
    const form = el("form", { class: "controls", onsubmit: (ev) => { ev.preventDefault(); resolve(input.value); message("info", "Opening the keys ..."); } },
      input, el("button", { type: "submit", class: "primary" }, "Open the keys"),
      el("button", { type: "button", onclick: () => { reject(new Error("cancelled")); message("info"); } }, "Cancel"));
    message("info", el("p", {}, el("strong", {}, "Type the code "), "that the window of unlock.opensheaf.org shows:"), form);
    input.focus();
  });
}

// Unlocks the owners chosen in the wallet chosen (step 2), or, with none
// chosen, the acting owner (the default owner) from its wallet. The popup
// opens at once (in the click); the signers and the wallet are read
// meanwhile. One popup is one touch: two owners when one passkey opens
// both, else one; the others wait for "Unlock the next", since a browser
// opens a popup only from a click. One unlocking at a time.
function unlockKeys() {
  if (state.unlocking) return state.unlocking;
  const s = state.settings, repo = state.repo;
  let wallet = chosenWallet();
  let wanted = wallet ? [...selectedIn(wallet)] : [];
  if (!wanted.length) {
    wanted = [actingOwner() || s.owner];
    wallet ||= direct.walletName(s, pref(WALLET + s.owner));
  }
  wanted = wanted.filter((o) => !unlockedOwner(o));
  if (!wallet) {
    message("bad", "Choose or add the key wallet of the owner (github:OWNER/REPOSITORY), or send the change to the workflow.");
    return Promise.reject(new Error("no wallet"));
  }
  if (!wanted.length) {
    message("info", "The owners chosen are unlocked already.");
    return Promise.resolve();
  }
  const planned = direct.ownersLocks({ gh: ghCore(), archiveRepo: repo, wallet, owners: wanted, signersOf: signersFor })
    .then(direct.unlockPlan);
  planned.catch(() => { /* said by the popup's end */ });
  return runUnlock(wallet, planned);
}

function unlockNext() {
  const next = state.wallets.next;
  if (!next) return Promise.resolve();
  return runUnlock(next.wallet, Promise.resolve(next.plan));
}

function runUnlock(wallet, planned) {
  if (state.unlocking) return state.unlocking;
  message("info", "Unlocking in the window of unlock.opensheaf.org: use your passkey there ...");
  state.unlocking = direct.unlockBatch({
    askCode,
    prepare: async () => {
      const p = await planned;
      if (!p.batches.length) {
        throw new Error(`no passkey of yours opens the keys of ${p.none.map(ownerText).join(", ")} in ${wallet}: ` +
                        "enrol yours under Set up a key wallet");
      }
      return p.batches[0];
    },
  }).then(async (got) => {
    const p = await planned;
    for (const [o, keys] of got) state.keys.add(o, keys, wallet);
    const rest = p.batches.slice(1);
    state.wallets.next = rest.length ? { wallet, plan: { batches: rest, none: p.none } } : null;
    const few = [...got.keys()].filter((o) => !unlockedOwner(o));
    if (few.length) throw new Error(`the passkey opened too few keys of ${few.map(ownerText).join(", ")} for its key log`);
    if (!unlockedOwner(pref(ACTING + state.repo)) && got.size && !unlockedOwner(state.settings.owner)) setActing([...got.keys()][0]);
    message("ok", el("p", {}, "Unlocked in this page, until it is closed: ", ownersList([...got.keys()]), ".",
      rest.length ? [" Click ", el("strong", {}, "Unlock the next"), " for ", ownersList(rest.flatMap((b) => b.owners)),
                     " (a touch each)."] : "",
      p.none.length ? [" No passkey of yours opens the keys of ", ownersList(p.none), ` in ${wallet}: enrol yours under ` +
                       "Set up a key wallet."] : ""));
  }).catch((e) => {
    message("bad", `The keys were not unlocked: ${e.message}.`);
    throw e;
  }).finally(() => { state.unlocking = null; });
  return state.unlocking;
}

// A change written directly: carried out, signed and committed (direct.js);
// the archive is then read again at the new commit.
async function writeDirectly(name, fields, files, typed, what, acting = null) {
  const repo = state.repo;
  const started = performance.now();
  const say = { reading: "Reading the archive ...", "carrying out": `Carrying out: ${what} ...`,
                committing: "Signed; committing to the repository ..." };
  let res;
  try {
    res = await direct.write({ gh: ghCore(), repo, operation: name, fields, files, keys: state.keys, acting,
                               settings: state.settings, cache: state.cache, progress: (p) => message("info", say[p] || p) });
  } catch (e) {
    message("bad", `The change could not be written: ${e.message}`, el("p", {},
      el("button", { onclick: () => sendRequest(name, fields, files, typed, what) }, "Send it to the workflow instead")));
    return;
  }
  if (!res.ok) {
    const id = `direct-${Date.now()}`;
    state.sent.set(id, { name, values: typed, acting });
    message("bad", render(res.message), correctButton(id, res));
    return;
  }
  const seconds = ((performance.now() - started) / 1000).toFixed(1);
  watchSite(repo, res.commit.sha);
  show("#form");
  try {
    const a = await readArchive(await token(), repo, { ref: res.commit.sha });
    refreshArchive(repo, a, res.commit.sha);
  } catch (_) {
    await openArchive(repo);
  }
  if (state.repo !== repo) return;
  message("ok", render(res.message), el("p", { class: "small muted" }, `Written in ${seconds} s, signed in this page: commit `,
    el("a", { href: res.commit.url || `https://github.com/${repo}/commit/${res.commit.sha}` }, res.commit.sha.slice(0, 7)), "."));
}

// --- the owner a change is signed for ---------------------------------------------

// The operations on a paper (its label in "Label"), those given only by the
// paper's owner, and those on the members of a collection, which only its
// owner changes.
const OWN_ONLY = { notice: "A notice", withdraw: "A withdrawal", relicense: "A new licence" };
const COLLECTION_OPS = ["add", "vet", "remove"];

// The parent of a paper's line (the head of its object.json), once read:
// { owner, name } or null; undefined while not read (loadTitles).
function parentOf(o) {
  const t = state.titles.get(o.label);
  return t ? t.parent : undefined;
}

const originatorOfLine = (o) => state.originators.get(`${o.name}:${o.owner}`) || "";

// In a form written directly: the owner it is signed for (among those
// unlocked; the acting owner first), and, for a new version of another
// owner's paper, where it goes (that owner's branch, made if needed: from
// which version, and under which label). Drawn again as the paper or the
// owner changes. READ gives { owner, branchFrom, branchLabel }.
function actingBlock(name, inputs, preset) {
  const box = el("div", { class: "acting" });
  const st = { owner: (preset && preset.owner) || "", touched: Boolean(preset && preset.owner),
               branchFrom: preset ? preset.branchFrom ?? null : null, branchLabel: (preset && preset.branchLabel) || "" };
  const draw = () => box.replaceChildren(...actingParts(name, inputs, st, draw));
  box.read = () => ({ owner: st.owner, branchFrom: st.branchFrom, branchLabel: st.branchLabel });
  box.redraw = draw;
  draw();
  return box;
}

function actingParts(name, inputs, st, draw) {
  const s = state.settings;
  if (!s || viaWorkflow() || direct.WORKFLOW_ONLY.includes(name)) return [];
  const open = unlockedOwners();
  const label = inputs["Label"] ? inputs["Label"].value.trim() : "";
  const line = label ? docs().find((o) => o.label === label) : null;
  const coll = inputs["In collection"] ? state.collections.find((c) => c.label === inputs["In collection"].value) : null;
  // by default: the acting owner; for an act of a line's or a collection's
  // owner, that owner if unlocked
  if (!st.touched) {
    const own = OWN_ONLY[name] && line ? line.owner : COLLECTION_OPS.includes(name) && coll ? coll.owner : "";
    st.owner = own && open.includes(own) ? own : actingOwner();
  }
  const choices = open.length ? open : [st.owner];
  if (!choices.includes(st.owner)) st.owner = choices[0];
  const parts = [];
  if (choices.length > 1 || st.owner !== s.owner || (line && line.owner !== st.owner)) {
    parts.push(el("div", { class: "field" },
      el("label", { for: `f-${name}-acting` }, "Act as"),
      el("select", { id: `f-${name}-acting`, onchange: (ev) => { st.owner = ev.target.value; st.touched = true; draw(); } },
        choices.map((o) => el("option", { value: o, selected: o === st.owner },
          ownerText(o) + (o === s.owner ? " (default owner)" : "")))),
      el("p", { class: "help" }, open.length ? "The owner this change is signed for, among those unlocked above."
        : "The owner this change is signed for: its keys are unlocked when it is sent.")));
  }
  const versionOf = inputs["This deposit"] && inputs["This deposit"].value === NEW_VERSION;
  if (name === "deposit" && versionOf && line && line.owner !== st.owner) {
    const c = continuation(line, st.owner, docs(), parentOf, originatorOfLine(line));
    const who = ownerCode(st.owner);
    if (c.kind === "branch" || c.kind === "originator") {
      parts.push(el("p", { class: "notice" }, el("code", {}, line.label), " is a line of ", ownerCode(line.owner),
        ". This new version goes into ", el("code", {}, c.label), ", ",
        c.kind === "branch" ? ["the branch of it of ", who] : ["the line of ", who, ", the paper's originator"], "."));
    } else if (c.kind === "refused") {
      parts.push(el("p", { class: "notice warn" }, who, " is the originator of this paper, and its own line is not in this " +
        "archive; an originator never owns a branch of its own work. Act as another owner."));
    } else {
      const n = versionsOf(line.label);
      const taken = new Set([...state.lines.map((o) => o.label), ...state.collections.map((x) => x.label)]);
      // proposed for this paper and this owner, until typed
      const proposed = branchLabel(line.label, ownerText(st.owner), taken);
      if (!st.branchLabel || st.proposed === st.branchLabel) st.branchLabel = proposed;
      st.proposed = proposed;
      const from = n ? el("select", { id: `f-${name}-branch-from`, onchange: (ev) => {
          st.branchFrom = Number(ev.target.value) === n ? null : Number(ev.target.value); } },
        Array.from({ length: n }, (_, i) => n - i).map((v) => el("option", { value: String(v),
          selected: (st.branchFrom ?? n) === v }, v === n ? `${v} (the latest)` : String(v))))
        : el("input", { id: `f-${name}-branch-from`, inputmode: "numeric", placeholder: "empty for the latest",
                        value: st.branchFrom ?? "", oninput: (ev) => { const v = ev.target.value.trim();
                          st.branchFrom = /^\d+$/.test(v) ? Number(v) : null; } });
      parts.push(el("div", { class: "notice" },
        el("p", {}, el("code", {}, line.label), " is a line of ", ownerCode(line.owner), ". This new version goes into a new " +
          "branch of it for ", who, ": a line of ", who, " that continues the paper from a signed version of it, with the " +
          "evidence of that version (section 9 of the specification). Later new versions by ", who, " go there too."),
        c.known ? null : el("p", { class: "small muted" }, "The archive's lines are not all read yet: if this owner has a " +
          "branch of the paper already, the new version goes there instead."),
        el("div", { class: "field" }, el("label", { for: `f-${name}-branch-from` }, "Branch from version"), from,
          el("p", { class: "help" }, "A signed document version of ", el("code", {}, line.label), "; the latest by default.")),
        el("div", { class: "field" }, el("label", { for: `f-${name}-branch-label` }, "Label of the branch"),
          el("input", { id: `f-${name}-branch-label`, value: st.branchLabel,
                        oninput: (ev) => { st.branchLabel = ev.target.value.trim(); } }),
          el("p", { class: "help" }, "Its address in the archive (paper/LABEL/): lower-case letters and digits, words joined by -."))));
    }
  }
  if (OWN_ONLY[name] && line && line.owner !== st.owner) {
    parts.push(el("p", { class: "notice warn" }, `${OWN_ONLY[name]} is given only by the owner of the line, `,
      ownerCode(line.owner), open.includes(line.owner) ? ": act as it." : ": unlock its keys to act as it, or give it on " +
        "your own branch of the paper."));
  }
  if (COLLECTION_OPS.includes(name) && coll && coll.owner !== st.owner) {
    parts.push(el("p", { class: "notice warn" }, "Only its owner, ", ownerCode(coll.owner), ", changes the members of ",
      el("code", {}, coll.label), open.includes(coll.owner) ? ": act as it." : ": unlock its keys to act as it."));
  }
  return parts;
}

// --- forms -------------------------------------------------------------------

// A member as the page shows it: its label in this archive, or the start of
// its name.
function memberName(m) {
  const o = state.lines.find((x) => x.name === m.name && x.owner === m.owner);
  return o ? o.label : foreignName(m.name);
}

// The latest document version of a paper, once read (loadTitles).
function versionsOf(label) {
  const t = label && state.titles.get(label);
  return t && t.versions ? t.versions : null;
}

function options(kind, values) {
  if (kind === "collections") return state.collections.map((c) => [c.label, `${c.title} (${c.label})`]);
  if (kind === "documents") return docs().map((o) => [o.label, o.label]);
  if (kind === "members") {
    // a member is sent as its sheaf: URI, which names it in any archive
    const c = state.collections.find((x) => x.label === values["In collection"]);
    return c ? c.members.map((m) => [memberUri(m), m.cite && m.cite.title ? `${memberName(m)}: ${m.cite.title}` : memberName(m)]) : [];
  }
  if (kind === "versions") {
    // the document versions of the paper chosen, the latest first
    const n = versionsOf(values["Label"]);
    return n ? Array.from({ length: n }, (_, i) => String(n - i)).map((v) => [v, n - Number(v) ? v : `${v} (the latest)`]) : [];
  }
  return kind.map((o) => [o, o]);
}

function openForm(name, preset = {}, acting = null) {
  const form = FORMS[name];
  const values = { ...preset };
  const inputs = {};
  let owner = null;
  const body = el("form", { class: "op", onsubmit: (ev) => { ev.preventDefault(); submit(name, inputs, body, owner.read()); } },
    el("h3", {}, form.title),
    form.help ? el("p", { class: "muted" }, form.help) : null,
    el("div", { class: "acting-slot" }),
    form.fields.map((f) => {
      const id = `f-${name}-${f.label.replace(/[^a-z0-9]+/gi, "-")}`;
      let input;
      if (f.type === "textarea") input = el("textarea", { id, rows: 3, placeholder: f.placeholder });
      else if (f.type === "file" || f.type === "files")
        input = el("input", { id, type: "file", multiple: f.type === "files", accept: f.accept });
      else if (f.options === "versions" && !versionsOf(values["Label"])) {
        // the versions not known (yet): typed
        input = el("input", { id, inputmode: "numeric", placeholder: "the version's number, e.g. 1" });
      } else if (f.type === "select") {
        // a list filled from the archive starts with an empty choice (not
        // the versions of a paper: the latest is chosen)
        if (f.options === "versions" && values[f.label] === undefined) values[f.label] = String(versionsOf(values["Label"]));
        const first = (typeof f.options !== "string" && !f.blank) || f.options === "versions" ? null
          : el("option", { value: "" }, f.required ? "Choose ..." : "(none)");
        input = el("select", { id }, first,
          options(f.options, values).map(([v, text]) => el("option", { value: v }, text)));
      } else input = el("input", { id, placeholder: f.placeholder });
      if (input.type !== "file" && values[f.label] !== undefined) input.value = values[f.label];
      if (f.label === "In collection" && FORMS[name].fields.some((g) => g.options === "members"))
        input.addEventListener("change", () => openForm(name, { ...collect(inputs), "In collection": input.value }, owner.read()));
      // the versions follow the paper chosen
      if (f.label === "Label" && FORMS[name].fields.some((g) => g.options === "versions"))
        input.addEventListener("change", () => {
          const kept = collect(inputs);
          delete kept["Document version it is about"];
          openForm(name, { ...kept, "Label": input.value }, owner.read());
        });
      // where a deposit goes follows the paper and the kind of deposit
      if (["Label", "This deposit", "In collection"].includes(f.label))
        input.addEventListener(input.tagName === "SELECT" ? "change" : "input", () => owner && owner.redraw());
      inputs[f.label] = input;
      return el("div", { class: "field" },
        el("label", { for: id }, f.label, f.required ? el("span", { class: "required" }, " (required)") : null),
        input, f.help ? el("p", { class: "help" }, f.help) : null);
    }),
    el("div", { class: "controls" },
      el("button", { type: "submit", class: "primary" }, "Send"),
      el("button", { type: "button", onclick: () => show("#form") }, "Cancel")));
  owner = actingBlock(name, inputs, acting);
  body.querySelector(".acting-slot").replaceWith(owner);
  show("#form", body);
  body.scrollIntoView({ behavior: "smooth", block: "start" });
}

function collect(inputs) {
  const values = {};
  for (const [label, input] of Object.entries(inputs))
    if (input.type !== "file") values[label] = input.value;
  return values;
}

// Sends a form as a request. The form is disabled from the click until the
// request is written or refused, so that a second click does not send it
// twice (a deposit sent twice would make two versions, which stay). Its
// values are kept, to correct them if the archive refuses the request.
//
// A change is written directly unless it is one of the workflow's (setup,
// arXiv) or the person chose the workflow. If the owner's keys are not
// unlocked yet, the popup of the passkey is opened in this click, before
// anything else: browsers open popups only from a click.
async function submit(name, inputs, formNode, acting = null) {
  const controls = formNode ? [...formNode.querySelectorAll("input, select, textarea, button")] : [];
  if (controls.some((c) => c.disabled)) return;
  const values = collect(inputs);
  const chosen = {};
  for (const [label, input] of Object.entries(inputs))
    if (input.type === "file" && input.files.length) chosen[label] = [...input.files];
  const { missing } = check(name, values, chosen);
  if (missing.length) { message("bad", `Fill in: ${missing.join(", ")}.`); return; }
  const directly = state.settings && !direct.WORKFLOW_ONLY.includes(name) && !viaWorkflow();
  const who = (acting && acting.owner) || actingOwner();
  const unlocking = directly && !unlockedOwner(who) ? unlockKeys() : null;
  controls.forEach((c) => { c.disabled = true; });
  const enable = () => controls.forEach((c) => { c.disabled = false; });
  try {
    if (unlocking) {
      try { await unlocking; } catch (_) {
        message("bad", "The keys were not unlocked, and nothing was written.", el("p", {},
          el("button", { onclick: () => send(name, inputs, { workflow: true }) }, "Send it to the workflow instead")));
        return;
      }
    }
    await send(name, inputs, { workflow: !directly, acting: directly ? { ...(acting || {}), owner: acting && acting.owner ||
                                                                         actingOwner() } : null });
  } finally {
    if (formNode && formNode.isConnected) enable();
  }
}

async function send(name, inputs, { workflow = true, acting = null } = {}) {
  const values = collect(inputs);
  const typed = { ...values };
  const files = {};
  for (const [label, input] of Object.entries(inputs))
    if (input.type === "file" && input.files.length)
      files[label] = await Promise.all([...input.files].map(async (f) =>
        ({ name: f.name, bytes: new Uint8Array(await f.arrayBuffer()) })));
  const { fields, missing } = check(name, values, files);
  if (missing.length) { message("bad", `Fill in: ${missing.join(", ")}.`); return; }
  const what = `${FORMS[name].title}${subject(name, fields) ? `: ${subject(name, fields)}` : ""}`;
  if (!workflow) return writeDirectly(name, fields, files, typed, what, acting);
  return sendRequest(name, fields, files, typed, what);
}

// A change sent as a request to the archive's workflow.
async function sendRequest(name, fields, files, typed, what) {
  const id = gh.requestId();
  try {
    message("info", "Sending the request ...");
    await gh.commitFiles(await token(), state.repo, gh.buildRequest(id, name, fields, files),
                         `Request ${id}: ${what}`);
    state.pending.set(id, { what, since: Date.now() }); showDockStatus();
    state.sent.set(id, { name, values: typed });
    show("#form");
    message("info", `Sent: ${what}. The archive's workflow carries it out in a minute or two; ` +
                    "its answer appears under Requests.");
    showResults();
    poll(id);
  } catch (e) {
    message("bad", `The request could not be written: ${e.message}`);
  }
}

// --- results -----------------------------------------------------------------

// Waits for the answer to a request; once it is there, the archive is read
// again at the commit that holds it (load.js), so that the change it reports
// shows at once, and the answer is shown.
async function poll(id) {
  const repo = state.repo;
  const done = await awaitRequest(token, repo, id, { stop: () => state.repo !== repo });
  if (state.repo !== repo) return;
  if (done) {
    state.pending.delete(id); showDockStatus();
    // the archive could not be read at that commit: read it as on opening
    if (done.ref) watchSite(repo, done.ref);
    if (done.archive) refreshArchive(repo, done.archive, done.ref);
    else await openArchive(repo);
    if (state.repo === repo) message(done.result.ok ? "ok" : "bad", render(done.result.message), correctButton(id, done.result));
    return;
  }
  state.pending.get(id) && (state.pending.get(id).late = true);
  showResults();
}

// Requests still waiting in the repository (requests/ID/, removed by the
// workflow once carried out), sent before a reload or from another tab:
// shown as waiting, and their answers awaited.
async function resumePending(repo) {
  try {
    const t = await token();
    const dirs = (await gh.listDir(t, repo, "requests"))
      .filter((d) => d.type === "dir" && d.name !== "results" && !state.pending.has(d.name));
    for (const d of dirs) {
      const r = await gh.readJSON(t, repo, `requests/${d.name}/request.json`).catch(() => null);
      if (state.repo !== repo) return;
      const form = r && FORMS[r.operation];
      const what = form ? `${form.title}${subject(r.operation, r.fields || {}) ? `: ${subject(r.operation, r.fields || {})}` : ""}`
                        : `request ${d.name}`;
      state.pending.set(d.name, { what, since: Date.now() }); showDockStatus();
      poll(d.name);
    }
    if (dirs.length) showResults();
  } catch (_) { /* waiting requests are a convenience */ }
}

// For a request sent from this tab and refused: a button that opens its form
// again, filled in as it was sent (files must be chosen again).
function correctButton(id, result) {
  const sent = state.sent.get(id);
  if (!sent || result.ok) return null;
  return el("p", {}, el("button", { onclick: () => openForm(sent.name, sent.values, sent.acting) },
    "Correct and send again"));
}

// The Changes of the Activity panel: the requests waiting first, then the
// archive's recent commits, read afresh from the head of its branch each
// time (changes.js), each with how it was made and a link to it; a commit
// of the workflow that answers a request has its answer folded under it,
// read when unfolded, at that commit.
const HOW = { page: "signed in this page", workflow: "by the archive's workflow", request: "a request sent from this page",
              other: "pushed" };

async function showResults() {
  const box = $("#requests");
  if (!box || !state.repo) return;
  const repo = state.repo;
  const nodes = [...state.pending.entries()].map(([id, p]) => el("div", { class: "result pending" },
    el("p", {}, el("strong", {}, p.what), " ", el("span", { class: "chip warn" }, p.late ? "no answer yet" : "waiting"),
       el("span", { class: "small muted" }, ` request ${id}`)),
    p.late ? el("p", { class: "small" }, "The workflow has not answered: see the repository's ",
      el("a", { href: `https://github.com/${repo}/actions` }, "Actions"), ".") : null));
  try {
    const t = await token();
    for (const c of await recentChanges(t, repo)) {
      const when = c.time ? clock(new Date(c.time)) : "";
      const day = c.time ? new Date(c.time).toLocaleDateString() : "";
      const head = [el("span", { class: "small muted", title: day }, when), " ",
        el("a", { href: c.url, title: c.sha }, c.subject), " ", el("span", { class: `chip how-${c.how}` }, HOW[c.how])];
      if (!c.answers) { nodes.push(el("div", { class: "result change" }, el("p", {}, head))); continue; }
      const body = el("div", {}, el("p", { class: "small muted" }, "Reading the answer ..."));
      const d = el("details", { class: "result change" }, el("summary", {}, head), body);
      d.addEventListener("toggle", async () => {
        if (!d.open || d.dataset.read) return;
        d.dataset.read = "yes";
        try {
          const r = await answerAt(await token(), repo, c.answers, c.sha);
          show(body, r ? [el("p", {}, el("span", { class: `chip ${r.ok ? "ok" : "bad"}` }, r.ok ? "done" : "not done"), " ",
                                r.title || `request ${c.answers}`), render(r.message), correctButton(c.answers, r)]
                       : el("p", { class: "small muted" }, "No answer in this commit."));
        } catch (e) {
          delete d.dataset.read;
          show(body, el("p", { class: "small bad" }, `The answer could not be read: ${e.message}`));
        }
      });
      nodes.push(d);
    }
  } catch (_) { /* the changes are a convenience */ }
  if (state.repo !== repo) return;
  show(box, nodes.length ? nodes : [el("p", { class: "muted" }, "No changes yet.")]);
  showDockStatus();
}

// --- start ---------------------------------------------------------------------

async function start() {
  initDock();
  try { state.auth = JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch (_) { state.auth = null; }
  if (state.auth) {
    try { await afterSignIn(); return; }
    catch (_) { state.auth = null; saveAuth(); }
  }
  showSignIn();
}

start();
