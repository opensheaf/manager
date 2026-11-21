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
import { memberUri, memberLink, explorerLink, canonicalUri, originatorOf } from "./archive.js";
import { readArchive, headFiles, awaitRequest } from "./load.js";
import { render } from "./markdown.js";
import { tokenSource } from "./session.js";
import * as direct from "./direct.js";
import { watchPages } from "./pages.js";
import { storedZip, rotationZipName } from "./zip.js";

const $ = (sel) => document.querySelector(sel);
const KEY = "opensheaf-manager-auth";
const VIA_WORKFLOW = "opensheaf-manager-via-workflow";
const WALLET = "opensheaf-manager-wallet:";
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
  keys: new direct.Keys(), // the owner's current keys, unlocked in this page (memory only)
  signers: null,     // { owner, dids, threshold }: the keys of the owner's key log that sign now
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
// panel with the requests and the history of messages. A click keeps it open
// until clicked again (or Escape).
const dock = { pinned: false, hoverTimer: null };

function setDock(open, pinned = dock.pinned) {
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
  state.originators = a.originators;
  state.secret = a.secret;
  state.keyLog = a.keyLog;
  state.base = a.base;
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

// The settings page where the repository's secrets are set: the manager
// never sets a secret, and never sees a key.
function secretsPage(repo) {
  return `https://github.com/${repo}/settings/secrets/actions`;
}

const PIPX = 'pipx install "opensheaf[validate] @ git+https://github.com/opensheaf/opensheaf-py"';

// A repository made from the template and not set up: the key ceremony,
// step by step. The owner and its rotation keys are made on the author's
// computer with osheaf, never in the browser; the manager only says what to
// run, where the secret goes, and then sends the setup with the key log
// (public keys only).
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
    el("h2", {}, `Set up ${repo}`),
    el("p", {}, "An archive has an owner, who signs every version: a current key on your computer, a current " +
      "key for the archive's workflows (they keep the archive when you use this page), and three rotation " +
      "keys, kept offline, two of which sign any change of keys. The owner is made once, on your computer, " +
      "with the osheaf command; this page never makes or sees a key."),
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
      state.titles.set(o.label, { title: dc && dc.titles && dc.titles[0] ? dc.titles[0].title : "", arxiv: ax || null,
                                  versions: obj && Number.isInteger(obj.documentVersion) ? obj.documentVersion : null });
      const cell = document.querySelector(`[data-title="${CSS.escape(o.label)}"]`);
      if (cell) cell.replaceChildren(...titleOf(o));
    } catch (_) { /* a title is a convenience */ }
    if (state.repo !== repo) return;
  }
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
    parts.push(...ceremony());
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
    s.owner ? el("p", { class: "small muted" }, "Owner ",
      el("a", { href: explorerLink(s.baseUrl, { owner: s.owner }), title: "Its key log, in the Explorer" },
         el("code", {}, s.owner.slice(0, 16) + "...")),
      " · signs every version of the archive") : null,
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
    block("collections", "Collections", state.collections.length,
        state.collections.length ? state.collections.map((c) => el("details", { class: "collection", open: collectionOpen.has(c.label) ? collectionOpen.get(c.label) : !compact() },
      el("summary", { onclick: (e) => collectionOpen.set(c.label, !e.currentTarget.parentNode.open) }, el("h4", {}, c.title, " ", el("span", { class: "chip" }, c.type || "collection"),
         s.index && s.index.html && s.index.html.featured === c.label ? el("span", { class: "chip ok" }, "featured") : null,
         el("span", { class: "small muted count" }, ` ${c.members.length} member${c.members.length === 1 ? "" : "s"}`))),
      el("p", { class: "small muted" }, el("a", { href: explorerLink(s.baseUrl, { line: c.label, kind: "collection" }),
                                                  title: uri(c), "data-line": `${c.name}:${c.owner}` },
         el("code", {}, c.label))),
      c.members.length ? el("ol", { class: "members" }, c.members.map((m) => el("li", {},
        el("a", { href: memberLink(m, s.baseUrl, state.lines), title: uri(m), "data-line": `${m.name}:${m.owner}` },
           el("code", {}, memberName(m)), m.cite && m.cite.title ? ` ${m.cite.title}` : ""),
        m.follow ? el("span", { class: "chip" }, "followed") : null,
        m.revisions ? el("span", { class: "muted" }, " (vetted: ",
          m.revisions.map((r, i) => [i ? ", " : "",
            el("a", { href: memberLink(m, s.baseUrl, state.lines, r.version), title: `Version ${r.documentVersion}` },
               String(r.documentVersion))]), ")") : null)))
        : el("p", { class: "muted" }, "No members yet."),
      el("div", { class: "controls" },
        el("button", { class: "small", onclick: () => openForm("add", { "In collection": c.label }) }, "Add a member"),
        c.type === "selection" && c.members.length ?
          el("button", { class: "small", onclick: () => openForm("vet", { "In collection": c.label }) }, "Vet a new version") : null,
        c.members.length ?
          el("button", { class: "small", onclick: () => openForm("remove", { "In collection": c.label }) }, "Remove a member") : null)))
      : el("p", { class: "muted" }, "No collections yet.")),
    block("papers", "Papers", docs().length,
        docs().length ? el("table", { class: "papers" },
      el("tr", {}, el("th", {}, "Label"), el("th", {}, "Title"), el("th", {}, "")),
      docs().map((o) => el("tr", {},
        el("td", {}, el("a", { href: explorerLink(s.baseUrl, { line: o.label }), title: uri(o), "data-line": `${o.name}:${o.owner}` },
             el("code", {}, o.label)),
           o.status === "withdrawn" ? el("span", { class: "chip bad" }, "withdrawn") : null),
        el("td", { "data-title": o.label }, titleOf(o)),
        el("td", { class: "actions" },
          el("button", { class: "small", onclick: () => openForm("deposit", { "Label": o.label, "This deposit": NEW_VERSION }) }, "New version"),
          el("button", { class: "small", onclick: () => openForm("notice", { "Label": o.label }) }, "Notice"),
          el("button", { class: "small", onclick: () => openForm("relicense", { "Label": o.label }) }, "Licence"),
          o.status === "withdrawn" ? null :
            el("button", { class: "small", onclick: () => openForm("withdraw", { "Label": o.label }) }, "Withdraw")))))
      : el("p", { class: "muted" }, "No papers yet.")));
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

// Whether the keys this page holds reach the threshold of the owner's key
// log (read once per repository).
function unlocked() {
  const s = state.signers;
  if (!s || !s.owner) return false;
  return state.keys.of(s.owner).filter((k) => s.dids.includes(k.did)).length >= s.threshold;
}

// How the changes are written, chosen above the forms: directly (carried
// out and signed in this page, with the owner's keys that the passkey
// unlocks) or by the archive's workflow. Only what the mode chosen needs is
// shown; how it works is folded away.
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
    body = [
      el("p", {}, "Each change is sent as a request; the archive's workflow carries it out, signs it and commits it, in a minute or two."),
      how(el("p", {}, "The workflow signs with the owner's key for the workflows, kept in the repository secret ",
        el("code", {}, "OPENSHEAF_SIGNING_KEY"), ". Its answers appear under Activity, at the bottom of the page."))];
  } else if (unlocked()) {
    const keys = state.keys.of(s.owner);
    body = [
      el("p", {}, "✓ Unlocked: ", keys.map((k, i) => [i ? ", " : "", el("code", { title: k.did }, `${k.did.slice(8, 20)}...`)]),
        " ", el("button", { class: "small", onclick: () => { state.keys.forget(); showArchive(); message("info", "The keys are locked."); } }, "Lock")),
      how(el("p", {}, "Each change is carried out in this page, signed with these keys and committed to the repository. " +
        "The keys stay in this page's memory, and are forgotten when it is closed or locked."))];
  } else {
    const named = direct.walletName(s);
    const walletInput = el("input", { id: "wallet", placeholder: "github:you/opensheaf-keys", "aria-label": "Key wallet",
                                      value: pref(WALLET + s.owner) });
    body = [
      el("div", { class: "controls" },
        named ? el("span", { class: "small" }, "Key wallet ", el("code", {}, named)) : [el("label", { for: "wallet" }, "Key wallet"), walletInput],
        el("button", { class: "primary", onclick: () => {
          if (!named) pref(WALLET + s.owner, walletInput.value.trim());
          unlockKeys().then(() => showArchive(), () => {});
        } }, "Unlock with your passkey")),
      how(el("p", {}, "Each change is carried out in this page and committed to the repository, signed with the owner's " +
          "current key from its key wallet. Your passkey unlocks it in a window of unlock.opensheaf.org; you then type " +
          "here the code that window shows."),
        el("p", {}, "The wallet is a private repository of yours where ", el("code", {}, "osheaf key push"),
          " put the owner's current keys, and ", el("code", {}, "osheaf key enroll"), " your passkey; the OpenSheaf app must " +
          "be installed on it too (the page only reads it). Without one yet, set it up below.")),
      setupPanel()];
  }
  return el("div", { class: `notice signing${!viaWf && unlocked() ? " ok" : ""}` }, modes, body);
}

// --- setting up a key wallet ---------------------------------------------------------

// Folded under "Write directly" while the keys are locked: the wallet (a
// private repository the person creates, with the app installed), the
// owner's current key put there locked with the passphrase (as osheaf key
// push), a passkey enrolled (as osheaf key enroll) in the popup of
// unlock.opensheaf.org. The panel is kept across redrawings of the archive,
// so that what is typed in it stays; secrets typed are cleared once used.
const setup = { repo: null, node: null, state: null, busy: false, keyMode: "file", source: null, pending: null };

function setupPanel() {
  if (setup.repo !== state.repo || !setup.node) {
    direct.forgetNewKey(setup.pending);
    Object.assign(setup, { repo: state.repo, state: null, busy: false, keyMode: "file", source: null, pending: null });
    setup.node = el("details", { class: "how setup" });
    setup.node.addEventListener("toggle", () => { if (setup.node.open && !setup.body) renderSetup(); });
    setup.body = null;
    setup.node.append(el("summary", {}, "Set up a key wallet"));
  }
  return setup.node;
}

function installLink(walletOwner) {
  const inst = (state.installations || []).find((i) => i.account && i.account.login.toLowerCase() === walletOwner.toLowerCase());
  if (inst && inst.html_url) return inst.html_url;
  return APP_SLUG ? `https://github.com/apps/${APP_SLUG}/installations/new` : "https://github.com/settings/installations";
}

const short = (did) => el("code", { title: did }, `${did.slice(8, 20)}...`);

function renderSetup() {
  const s = state.settings;
  const named = direct.walletName(s);
  const given = named || direct.walletName({}, pref(WALLET + s.owner)) || `github:${state.user ? state.user.login : "you"}/opensheaf-keys`;
  const st = setup.state;
  const walletInput = el("input", { id: "setup-wallet", value: given, "aria-label": "Key wallet", disabled: named ? true : undefined });
  const name = () => direct.walletName({}, walletInput.value.trim());
  const links = el("span", { class: "small" });
  const drawLinks = () => {
    const w = name();
    links.replaceChildren(...(w ? [el("a", { href: direct.newRepositoryUrl(w), target: "_blank", rel: "noopener" }, "Create it on GitHub"),
      " (private), then ", el("a", { href: installLink(w.slice(7).split("/")[0]), target: "_blank", rel: "noopener" },
        "add it to the OpenSheaf app's repositories"), "."] : ["Name it github:OWNER/REPOSITORY."]));
  };
  walletInput.addEventListener("input", drawLinks);
  drawLinks();
  const busy = (b) => { setup.busy = b; setup.node.querySelectorAll("button").forEach((x) => { x.disabled = b; }); };
  const check = async () => {
    const w = name();
    if (!w) { message("bad", "Name the wallet as github:OWNER/REPOSITORY."); return; }
    busy(true);
    message("info", `Checking ${w} ...`);
    try {
      const gh = ghCore();
      state.signers ||= await direct.signersOf({ gh, repo: state.repo, cache: state.cache, settings: s });
      setup.state = await direct.setupState({ gh, archiveRepo: state.repo, settings: s, wallet: w, signers: state.signers });
      if (!named && pref(WALLET + s.owner) !== w) { pref(WALLET + s.owner, w); showArchive(); }
      message("ok", `${w} is private, and this sign-in can read and write it.`);
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
      "which osheaf reads too. Each change is a commit to the wallet."),
    el("h4", {}, "1. The wallet"),
    el("p", {}, "A private repository of yours, never the archive's: "),
    el("div", { class: "controls" }, walletInput, el("button", { onclick: check }, "Check the wallet")),
    el("p", {}, links),
  ];
  if (st) {
    const signers = state.signers;
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
          const got = await direct.pushCurrentKey({ state: st, settings: s, signers: state.signers, keyText: text,
                                                    passphrase: pass.value });
          message("ok", got.put ? `The current key ${got.did.slice(8, 20)}... is in ${st.wallet.name}, locked with the passphrase.`
                                : `The current key ${got.did.slice(8, 20)}... was in ${st.wallet.name} already: left as it is.`);
          setup.state = await direct.setupState({ gh: ghCore(), archiveRepo: state.repo, settings: s,
                                                  wallet: st.wallet.name, signers: state.signers });
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
    } else if (plan && !plan.todo.length && st.enrolled.length >= state.signers.threshold) {
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
                                                    wallet: st.wallet.name, signers: state.signers });
          })
          .catch((e) => message("bad", `No passkey was enrolled: ${e.message}.`))
          .finally(() => { busy(false); renderSetup(); });
      };
      steps.push(
        el("p", {}, plan && plan.known.length
          ? "A passkey of yours opens some keys of the owner already: it is used for the others (Touch ID, in a window " +
            "of unlock.opensheaf.org)."
          : "A passkey is created for unlock.opensheaf.org, named after the owner (Touch ID twice, in a window of " +
            "unlock.opensheaf.org); you then type here the code it shows. The keys are opened with the passphrase first."),
        fresh ? el("p", { class: "small" }, el("label", {}, fresh, " Create a new passkey instead (another device or provider)")) : null,
        el("form", { class: "controls", onsubmit: (ev) => { ev.preventDefault(); enroll(); } },
          pass, el("button", { type: "submit", class: "primary" }, plan && plan.known.length ? "Add your passkey" : "Create the passkey")));
    }
  }
  setup.body = el("div", { class: "setup-body" }, steps);
  setup.node.replaceChildren(setup.node.firstChild, setup.body);
  if (setup.busy) busy(true);
}

// Step 2, the other way: a new current key made in this page, added to the
// owner's key log by a new version signed by the owner's rotation keys (the
// files osheaf exported, or the wallet's), as osheaf owner rotate --add
// does; committed to the archive, then put in the wallet (direct.js). With
// files, the new rotation keys are offered as files and sheets first, and
// nothing is committed until their checks are typed back. Secrets typed are
// cleared once read; the keys are in this page's memory only.
function newKeyForm(st) {
  const s = state.settings, signers = state.signers;
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
  const p = setup.pending, signers = state.signers;
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
      el("p", { class: "controls" }, saveAllButton(p.files, state.settings.owner, p.version),
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
  const p = setup.pending, s = state.settings, repo = state.repo;
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
      state.signers = await direct.signersOf({ gh: ghCore(), repo, cache: state.cache, settings: s });
      setup.state = await direct.setupState({ gh: ghCore(), archiveRepo: repo, settings: s, wallet: st.wallet.name,
                                              signers: state.signers });
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

// Unlocks the owner's keys: the popup opens at once (in the click), the
// signers and the wallet are read meanwhile. One unlocking at a time.
function unlockKeys() {
  if (state.unlocking) return state.unlocking;
  const s = state.settings, repo = state.repo;
  const wallet = direct.walletName(s, pref(WALLET + s.owner));
  if (!wallet) {
    message("bad", "Name the key wallet of the owner (github:OWNER/REPOSITORY), or send the change to the workflow.");
    return Promise.reject(new Error("no wallet"));
  }
  const gh = ghCore();
  message("info", "Unlocking in the window of unlock.opensheaf.org: use your passkey there ...");
  state.unlocking = direct.unlock({
    gh, archiveRepo: repo, settings: s, wallet, askCode,
    signers: async () => (state.signers ||= await direct.signersOf({ gh, repo, cache: state.cache, settings: s })),
  }).then((keys) => {
    state.keys.add(s.owner, keys);
    if (!unlocked()) throw new Error(`the passkey opened ${keys.length} key(s), and the key log needs ${state.signers.threshold}`);
    message("ok", "The owner's keys are unlocked in this page, until it is closed.");
  }).catch((e) => {
    message("bad", `The keys were not unlocked: ${e.message}.`);
    throw e;
  }).finally(() => { state.unlocking = null; });
  return state.unlocking;
}

// A change written directly: carried out, signed and committed (direct.js);
// the archive is then read again at the new commit.
async function writeDirectly(name, fields, files, typed, what) {
  const repo = state.repo;
  const started = performance.now();
  const say = { reading: "Reading the archive ...", "carrying out": `Carrying out: ${what} ...`,
                committing: "Signed; committing to the repository ..." };
  let res;
  try {
    res = await direct.write({ gh: ghCore(), repo, operation: name, fields, files, keys: state.keys,
                               settings: state.settings, cache: state.cache, progress: (p) => message("info", say[p] || p) });
  } catch (e) {
    message("bad", `The change could not be written: ${e.message}`, el("p", {},
      el("button", { onclick: () => sendRequest(name, fields, files, typed, what) }, "Send it to the workflow instead")));
    return;
  }
  if (!res.ok) {
    const id = `direct-${Date.now()}`;
    state.sent.set(id, { name, values: typed });
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

// --- forms -------------------------------------------------------------------

// A member as the page shows it: its label in this archive, or the start of
// its name.
function memberName(m) {
  const o = state.lines.find((x) => x.name === m.name && x.owner === m.owner);
  return o ? o.label : `${m.name.slice(0, 12)}...`;
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

function openForm(name, preset = {}) {
  const form = FORMS[name];
  const values = { ...preset };
  const inputs = {};
  const body = el("form", { class: "op", onsubmit: (ev) => { ev.preventDefault(); submit(name, inputs, body); } },
    el("h3", {}, form.title),
    form.help ? el("p", { class: "muted" }, form.help) : null,
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
        input.addEventListener("change", () => openForm(name, { ...collect(inputs), "In collection": input.value }));
      // the versions follow the paper chosen
      if (f.label === "Label" && FORMS[name].fields.some((g) => g.options === "versions"))
        input.addEventListener("change", () => {
          const kept = collect(inputs);
          delete kept["Document version it is about"];
          openForm(name, { ...kept, "Label": input.value });
        });
      inputs[f.label] = input;
      return el("div", { class: "field" },
        el("label", { for: id }, f.label, f.required ? el("span", { class: "required" }, " (required)") : null),
        input, f.help ? el("p", { class: "help" }, f.help) : null);
    }),
    el("div", { class: "controls" },
      el("button", { type: "submit", class: "primary" }, "Send"),
      el("button", { type: "button", onclick: () => show("#form") }, "Cancel")));
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
async function submit(name, inputs, formNode) {
  const controls = formNode ? [...formNode.querySelectorAll("input, select, textarea, button")] : [];
  if (controls.some((c) => c.disabled)) return;
  const values = collect(inputs);
  const chosen = {};
  for (const [label, input] of Object.entries(inputs))
    if (input.type === "file" && input.files.length) chosen[label] = [...input.files];
  const { missing } = check(name, values, chosen);
  if (missing.length) { message("bad", `Fill in: ${missing.join(", ")}.`); return; }
  const directly = state.settings && !direct.WORKFLOW_ONLY.includes(name) && !viaWorkflow();
  const unlocking = directly && !unlocked() ? unlockKeys() : null;
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
    await send(name, inputs, { workflow: !directly });
  } finally {
    if (formNode && formNode.isConnected) enable();
  }
}

async function send(name, inputs, { workflow = true } = {}) {
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
  if (!workflow) return writeDirectly(name, fields, files, typed, what);
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
  return el("p", {}, el("button", { onclick: () => openForm(sent.name, sent.values) },
    "Correct and send again"));
}

async function showResults() {
  const box = $("#requests");
  if (!box) return;
  const nodes = [...state.pending.entries()].map(([id, p]) => el("div", { class: "result pending" },
    el("p", {}, el("strong", {}, p.what), " ", el("span", { class: "chip warn" }, p.late ? "no answer yet" : "waiting"),
       el("span", { class: "small muted" }, ` request ${id}`)),
    p.late ? el("p", { class: "small" }, "The workflow has not answered: see the repository's ",
      el("a", { href: `https://github.com/${state.repo}/actions` }, "Actions"), ".") : null));
  try {
    const t = await token();
    const at = state.ref ? { ref: state.ref } : { fresh: true };
    const files = (await gh.listDir(t, state.repo, "requests/results", at))
      .filter((f) => f.name.endsWith(".json")).sort((a, b) => b.name.localeCompare(a.name)).slice(0, 8);
    for (const f of files) {
      const r = await gh.readJSON(t, state.repo, f.path, at);
      if (!r) continue;
      nodes.push(el("details", { class: `result ${r.ok ? "ok" : "bad"}` },
        el("summary", {}, el("span", { class: `chip ${r.ok ? "ok" : "bad"}` }, r.ok ? "done" : "not done"), " ",
           r.title || `request ${r.id}`, el("span", { class: "small muted" }, ` ${r.date || ""}`)),
        el("div", {}, render(r.message), correctButton(r.id, r))));
    }
  } catch (_) { /* results are a convenience */ }
  show(box, nodes.length ? nodes : [el("p", { class: "muted" }, "No requests yet.")]);
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
