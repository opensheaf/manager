// The OpenSheaf manager: keep an archive made from the archive template
// from the browser. It signs in with GitHub (through the sign-in service,
// or with a personal access token), reads the archive's files, and writes
// requests (requests/ID/), which the archive's workflow "from request"
// carries out with osheaf, as it does the issue forms; the result comes
// back in requests/results/ID.json.

import { SERVICE, APP_SLUG, TEMPLATE } from "./config.js";
import { signIn, refresh } from "./gh-auth.js";
import * as gh from "./github.js";
import { FORMS, NEW_VERSION, check, subject } from "./forms.js";
import { lines, objectPath, memberUri, memberLink, explorerLink } from "./archive.js";
import { render } from "./markdown.js";
import { tokenSource } from "./session.js";

const $ = (sel) => document.querySelector(sel);
const KEY = "opensheaf-manager-auth";

const state = {
  auth: null,        // { access_token, refresh_token?, expires_at?, kind: "app" | "pat" }
  user: null,
  repo: null,        // "owner/name"
  settings: null,    // osheaf.json
  lines: [],         // the lines of opensheaf.json with a label: { id, kind, name, owner, label, status }
  layout: "",        // the storage layout, from opensheaf.json
  collections: [],   // [{ label, title, type, members: [members.json 0.2: { kind, name, owner, at, revisions, cite }] }]
  hasWorkflow: false,
  keyLog: false,     // a repository not set up: whether it has the owner's key log in key-log/
  secret: null,      // whether the secret OPENSHEAF_SIGNING_KEY is set: true, false, or null (unknown)
  warnings: [],      // about the open repository: no write access, app not installed
  reachable: null,   // with the app: the repositories where it is installed (lower case)
  pending: new Map(),// request id -> { what, since }
  sent: new Map(),   // request id -> { name, values }: the forms sent in this tab, to correct
};

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

function message(kind, ...content) {
  show("#message", content.length ? el("div", { class: `notice ${kind}`, role: "status" }, ...content) : null);
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
  state.auth = state.user = state.repo = null;
  saveAuth();
  setRepoInAddress("");
  show("#archive");
  show("#form");
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

// Several files of the head version of a line (an entry of the discovery
// document), its inventory read once.
async function headFiles(t, repo, line, names) {
  const dir = await objectPath(line, state.layout);
  const inv = await gh.readJSON(t, repo, `${dir}/inventory.json`);
  if (!inv) return names.map(() => null);
  const st = inv.versions[inv.head].state;
  return Promise.all(names.map((name) => {
    const digest = Object.keys(st).find((d) => st[d].includes(name));
    return digest ? gh.readJSON(t, repo, `${dir}/${inv.manifest[digest][0]}`) : null;
  }));
}

async function openArchive(repo) {
  if (!gh.isRepo(repo)) { message("bad", `${repo} is not a repository's name (owner/repository).`); return; }
  if (state.repo !== repo) state.pending.clear();
  state.repo = repo;
  setRepoInAddress(repo);
  show("#form");
  show("#archive", el("p", { class: "loading" }, `Reading ${repo} ...`));
  message("info");
  try {
    const t = await token();
    // an empty repository (no commit yet) is not an archive, and GitHub cannot
    // add commits to it through its API: it must be made from the template
    const meta = await gh.api(t, `/repos/${repo}`);
    state.warnings = accessWarnings(repo, meta);
    if (!(await gh.listDir(t, repo, "")).length) {
      showEmpty(repo, meta);
      return;
    }
    state.hasWorkflow = (await gh.readText(t, repo, ".github/workflows/from-request.yml")) !== null;
    state.settings = await gh.readJSON(t, repo, "osheaf.json");
    state.lines = [];
    state.collections = [];
    state.secret = await gh.secretExists(t, repo, "OPENSHEAF_SIGNING_KEY");
    state.keyLog = false;
    if (state.settings) {
      const disc = await gh.readJSON(t, repo, "opensheaf.json");
      state.lines = lines(disc);
      state.layout = (disc && disc.storageLayout) || "";
      const labels = (await gh.listDir(t, repo, "collections"))
        .filter((f) => f.name.endsWith(".yaml")).map((f) => f.name.replace(/\.yaml$/, ""));
      state.collections = (await Promise.all(labels.map(async (label) => {
        const line = state.lines.find((o) => o.label === label);
        if (!line) return null;      // a list not synced yet
        const [members, dc] = await headFiles(t, repo, line, ["members.json", "datacite.json"]);
        return { label, title: dc && dc.titles ? dc.titles[0].title : label,
                 type: members ? members.type : "", members: (members && members.members) || [] };
      }))).filter(Boolean);
    } else {
      state.keyLog = (await gh.readText(t, repo, "key-log/inventory.json")) !== null;
    }
    showArchive();
    loadTitles(t, repo);
    resumePending(repo);
  } catch (e) {
    show("#archive", el("p", { class: "notice bad" }, `Could not read ${repo}: ${e.message}`));
  }
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
  const base = name.toLowerCase() === `${user}.github.io` ? `https://${user}.github.io/` : `https://${user}.github.io/${name}/`;
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
    el("p", { class: "small muted" }, "If the repository is ever compromised, expose the workflows' key at once " +
      "(osheaf owner expose, with two rotation keys) and store a new one: see the template's README, " +
      "When something goes wrong."),
    el("div", { class: "controls" },
      el("button", { class: "primary", onclick: () => openForm("setup") }, "Set up the archive")),
  ];
}

// Titles of the documents, read after the page is shown, and a label for
// those imported from arXiv (object.json: an external source on arXiv),
// linking to the arXiv page of the current version.
async function loadTitles(t, repo) {
  for (const o of docs().slice(0, 60)) {
    try {
      const [dc, obj] = await headFiles(t, repo, o, ["datacite.json", "object.json"]);
      if (state.repo !== repo) return;
      const cell = document.querySelector(`[data-title="${CSS.escape(o.label)}"]`);
      if (!cell) continue;
      if (dc) cell.replaceChildren(el("a", { href: explorerLink(state.settings.baseUrl, { line: o.label }) }, dc.titles[0].title));
      const ax = ((obj && obj.external) || []).find((e) => e.service === "arXiv" && e.role === "source");
      if (ax) {
        const label = ax.record && /^https:\/\/arxiv\.org\//.test(ax.record)
          ? el("a", { class: "chip arxiv", href: ax.record, title: `Imported from arXiv (${ax.label || ""})` }, "arXiv")
          : el("span", { class: "chip arxiv", title: "Imported from arXiv" }, "arXiv");
        cell.append(" ", label);
      }
    } catch (_) { /* a title is a convenience */ }
    if (state.repo !== repo) return;
  }
}

// Members of collections link to the Explorer (archive.js): a line of this
// archive by its label, another by its identifier in the first archive of
// its `at`, or one of its versions (v5).

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
  if (state.secret === false) parts.push(el("div", { class: "notice warn" },
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
    el("div", { class: "controls" },
      el("button", { class: "primary", onclick: () => openForm("deposit") }, "Deposit a paper"),
      el("button", { onclick: () => openForm("arxiv") }, "Deposit from arXiv"),
      el("button", { onclick: () => openForm("new_collection") }, "Create a collection")),
    el("h3", {}, "Papers"),
    docs().length ? el("table", {},
      el("tr", {}, el("th", {}, "Label"), el("th", {}, "Title"), el("th", {}, "")),
      docs().map((o) => el("tr", {},
        el("td", {}, el("a", { href: explorerLink(s.baseUrl, { line: o.label }), title: o.id }, el("code", {}, o.label)),
           o.status === "withdrawn" ? el("span", { class: "chip bad" }, "withdrawn") : null),
        el("td", { "data-title": o.label }, ""),
        el("td", { class: "actions" },
          el("button", { class: "small", onclick: () => openForm("deposit", { "Label": o.label, "This deposit": NEW_VERSION }) }, "New version"),
          el("button", { class: "small", onclick: () => openForm("notice", { "Label": o.label }) }, "Notice"),
          el("button", { class: "small", onclick: () => openForm("relicense", { "Label": o.label }) }, "Licence"),
          o.status === "withdrawn" ? null :
            el("button", { class: "small", onclick: () => openForm("withdraw", { "Label": o.label }) }, "Withdraw")))))
      : el("p", { class: "muted" }, "No papers yet."),
    el("h3", {}, "Collections"),
    state.collections.length ? state.collections.map((c) => el("section", { class: "collection" },
      el("h4", {}, c.title, " ", el("span", { class: "chip" }, c.type || "collection"),
         s.index && s.index.html && s.index.html.featured === c.label ? el("span", { class: "chip ok" }, "featured") : null),
      el("p", { class: "small muted" }, el("a", { href: explorerLink(s.baseUrl, { line: c.label, kind: "collection" }) },
         el("code", {}, c.label))),
      c.members.length ? el("ol", { class: "members" }, c.members.map((m) => el("li", {},
        el("a", { href: memberLink(m, s.baseUrl, state.lines), title: memberUri(m) },
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
      : el("p", { class: "muted" }, "No collections yet."),
    el("h3", {}, "Requests"),
    el("div", { id: "requests" }));
  show("#archive", parts);
  showResults();
}

// --- forms -------------------------------------------------------------------

// A member as the page shows it: its label in this archive, or the start of
// its name.
function memberName(m) {
  const o = state.lines.find((x) => x.name === m.name && x.owner === m.owner);
  return o ? o.label : `${m.name.slice(0, 12)}...`;
}

function options(kind, values) {
  if (kind === "collections") return state.collections.map((c) => [c.label, `${c.title} (${c.label})`]);
  if (kind === "documents") return docs().map((o) => [o.label, o.label]);
  if (kind === "members") {
    // a member is sent as its sheaf: URI, which names it in any archive
    const c = state.collections.find((x) => x.label === values["In collection"]);
    return c ? c.members.map((m) => [memberUri(m), m.cite && m.cite.title ? `${memberName(m)}: ${m.cite.title}` : memberName(m)]) : [];
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
      else if (f.type === "select") {
        // a list filled from the archive starts with an empty choice
        const first = typeof f.options !== "string" && !f.blank ? null
          : el("option", { value: "" }, f.required ? "Choose ..." : "(none)");
        input = el("select", { id }, first,
          options(f.options, values).map(([v, text]) => el("option", { value: v }, text)));
      } else input = el("input", { id, placeholder: f.placeholder });
      if (input.type !== "file" && values[f.label] !== undefined) input.value = values[f.label];
      if (f.label === "In collection" && FORMS[name].fields.some((g) => g.options === "members"))
        input.addEventListener("change", () => openForm(name, { ...collect(inputs), "In collection": input.value }));
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
async function submit(name, inputs, formNode) {
  const controls = formNode ? [...formNode.querySelectorAll("input, select, textarea, button")] : [];
  if (controls.some((c) => c.disabled)) return;
  controls.forEach((c) => { c.disabled = true; });
  const enable = () => controls.forEach((c) => { c.disabled = false; });
  try {
    await send(name, inputs);
  } finally {
    if (formNode && formNode.isConnected) enable();
  }
}

async function send(name, inputs) {
  const values = collect(inputs);
  const typed = { ...values };
  const files = {};
  for (const [label, input] of Object.entries(inputs))
    if (input.type === "file" && input.files.length)
      files[label] = await Promise.all([...input.files].map(async (f) =>
        ({ name: f.name, bytes: new Uint8Array(await f.arrayBuffer()) })));
  const { fields, missing } = check(name, values, files);
  if (missing.length) { message("bad", `Fill in: ${missing.join(", ")}.`); return; }
  const id = gh.requestId();
  const what = `${FORMS[name].title}${subject(name, fields) ? `: ${subject(name, fields)}` : ""}`;
  try {
    message("info", "Sending the request ...");
    await gh.commitFiles(await token(), state.repo, gh.buildRequest(id, name, fields, files),
                         `Request ${id}: ${what}`);
    state.pending.set(id, { what, since: Date.now() });
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

async function poll(id) {
  const repo = state.repo;
  const started = Date.now();
  while (Date.now() - started < 15 * 60_000 && state.repo === repo) {
    await new Promise((r) => setTimeout(r, 8000));
    let result = null;
    try { result = await gh.readJSON(await token(), repo, `requests/results/${id}.json`); }
    catch (_) { /* try again */ }
    if (result) {
      state.pending.delete(id);
      // the archive is read again first: reading it clears the messages
      await openArchive(repo);
      if (state.repo === repo) message(result.ok ? "ok" : "bad", render(result.message), correctButton(id, result));
      return;
    }
  }
  if (state.repo === repo) {
    state.pending.get(id) && (state.pending.get(id).late = true);
    showResults();
  }
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
      state.pending.set(d.name, { what, since: Date.now() });
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
    const files = (await gh.listDir(t, state.repo, "requests/results"))
      .filter((f) => f.name.endsWith(".json")).sort((a, b) => b.name.localeCompare(a.name)).slice(0, 8);
    for (const f of files) {
      const r = await gh.readJSON(t, state.repo, f.path);
      if (!r) continue;
      nodes.push(el("details", { class: `result ${r.ok ? "ok" : "bad"}` },
        el("summary", {}, el("span", { class: `chip ${r.ok ? "ok" : "bad"}` }, r.ok ? "done" : "not done"), " ",
           r.title || `request ${r.id}`, el("span", { class: "small muted" }, ` ${r.date || ""}`)),
        el("div", {}, render(r.message), correctButton(r.id, r))));
    }
  } catch (_) { /* results are a convenience */ }
  show(box, nodes.length ? nodes : [el("p", { class: "muted" }, "No requests yet.")]);
}

// --- start ---------------------------------------------------------------------

async function start() {
  try { state.auth = JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch (_) { state.auth = null; }
  if (state.auth) {
    try { await afterSignIn(); return; }
    catch (_) { state.auth = null; saveAuth(); }
  }
  showSignIn();
}

start();
