// The OpenSheaf manager: keep an archive made from the archive template
// from the browser. It signs in with GitHub (through the sign-in service,
// or with a personal access token), reads the archive's files, and writes
// requests (requests/ID/), which the archive's workflow "from request"
// carries out with osheaf, as it does the issue forms; the result comes
// back in requests/results/ID.json.

import { SERVICE, APP_SLUG, TEMPLATE } from "./config.js";
import { signIn, refresh } from "./gh-auth.js";
import * as gh from "./github.js";
import { FORMS, check, subject } from "./forms.js";
import { render } from "./markdown.js";

const $ = (sel) => document.querySelector(sel);
const KEY = "opensheaf-manager-auth";

const state = {
  auth: null,        // { access_token, refresh_token?, expires_at?, kind: "app" | "pat" }
  user: null,
  repo: null,        // "owner/name"
  settings: null,    // osheaf.json
  objects: [],       // from opensheaf.json
  collections: [],   // [{ id, title, type, members: [{ id, archive, archiveUrl, title, revisions }] }]
  hasWorkflow: false,
  pending: new Map(),// request id -> { what, since }
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
  for (const c of children.flat()) {
    if (c === null || c === undefined || c === false) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

function show(target, ...nodes) {
  const t = typeof target === "string" ? $(target) : target;
  t.replaceChildren(...nodes.flat().filter(Boolean));
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

async function token() {
  const a = state.auth;
  if (!a) throw new Error("Not signed in.");
  if (a.kind === "app" && a.expires_at && a.refresh_token && a.expires_at - Date.now() < 5 * 60_000) {
    const renewed = await refresh(SERVICE, a.refresh_token);
    state.auth = { ...renewed, kind: "app" };
    saveAuth();
  }
  return state.auth.access_token;
}

async function afterSignIn() {
  state.user = await gh.whoAmI(await token());
  saveAuth();
  await showRepositories();
}

function signOut() {
  state.auth = state.user = state.repo = null;
  saveAuth();
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
  const select = el("select", { id: "repo", "aria-label": "Repository" },
    el("option", { value: "" }, "Choose the archive's repository"),
    repos.map((r) => el("option", { value: r.full_name }, r.full_name)));
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
      if (repo) openArchive(repo);
    } }, select, el("span", { class: "muted" }, "or"), typed, el("button", { type: "submit" }, "Open")),
    installations && !repos.length ? el("p", { class: "small" },
      "The app is not installed on any repository yet: ",
      el("a", { href: install }, "install it on your archive's repository"), ".") : null,
    installations ? el("p", { class: "small muted" }, "Only repositories where the app is installed are listed. ",
      el("a", { href: install }, "Manage the installation"), ".") : null);
}

// --- reading the archive -------------------------------------------------------

async function headFile(t, repo, obj, name) {
  const inv = await gh.readJSON(t, repo, `ocfl/${obj}/inventory.json`);
  if (!inv) return null;
  const st = inv.versions[inv.head].state;
  const digest = Object.keys(st).find((d) => st[d].includes(name));
  return digest ? gh.readJSON(t, repo, `ocfl/${obj}/${inv.manifest[digest][0]}`) : null;
}

async function openArchive(repo) {
  state.repo = repo;
  show("#form");
  show("#archive", el("p", { class: "loading" }, `Reading ${repo} ...`));
  message("info");
  try {
    const t = await token();
    // an empty repository (no commit yet) is not an archive, and GitHub cannot
    // add commits to it through its API: it must be made from the template
    const meta = await gh.api(t, `/repos/${repo}`);
    if (!(await gh.listDir(t, repo, "")).length) {
      showEmpty(repo, meta);
      return;
    }
    state.hasWorkflow = (await gh.readText(t, repo, ".github/workflows/from-request.yml")) !== null;
    state.settings = await gh.readJSON(t, repo, "osheaf.json");
    state.objects = [];
    state.collections = [];
    if (state.settings) {
      const disc = await gh.readJSON(t, repo, "opensheaf.json");
      state.objects = (disc && disc.objects) || [];
      const ids = (await gh.listDir(t, repo, "collections"))
        .filter((f) => f.name.endsWith(".yaml")).map((f) => f.name.replace(/\.yaml$/, ""));
      state.collections = await Promise.all(ids.map(async (id) => {
        const [members, dc] = await Promise.all([headFile(t, repo, id, "members.json"),
                                                 headFile(t, repo, id, "datacite.json")]);
        return { id, title: dc && dc.titles ? dc.titles[0].title : id,
                 type: members ? members.type : "", members: (members && members.members) || [] };
      }));
    }
    showArchive();
    loadTitles(t, repo);
  } catch (e) {
    show("#archive", el("p", { class: "notice bad" }, `Could not read ${repo}: ${e.message}`));
  }
}

function showEmpty(repo, meta) {
  const fromTemplate = "https://github.com/new?template_owner=opensheaf&template_name=archive-template";
  const install = APP_SLUG ? `https://github.com/apps/${APP_SLUG}/installations/new`
                           : "https://github.com/settings/installations";
  show("#archive",
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

// Titles of the documents, read after the page is shown.
async function loadTitles(t, repo) {
  for (const o of state.objects.filter((x) => x.kind === "document").slice(0, 60)) {
    try {
      const dc = await headFile(t, repo, o.id, "datacite.json");
      const cell = document.querySelector(`[data-title="${CSS.escape(o.id)}"]`);
      if (dc && cell) cell.textContent = dc.titles[0].title;
    } catch (_) { /* a title is a convenience */ }
    if (state.repo !== repo) return;
  }
}

function docs() {
  return state.objects.filter((o) => o.kind === "document");
}

function showArchive() {
  const s = state.settings;
  const parts = [];
  if (!state.hasWorkflow) parts.push(el("div", { class: "notice warn" },
    el("strong", {}, "Warning. "),
    "This repository has no workflow to carry out the manager's requests " +
    "(.github/workflows/from-request.yml). Bring its .github/ folder up to date from the ",
    el("a", { href: TEMPLATE }, "archive template"), "; until then, requests wait unanswered."));
  if (!s) {
    parts.push(el("p", {}, `${state.repo} is not set up as an archive yet.`),
               el("button", { class: "primary", onclick: () => openForm("setup") }, "Set up the archive"));
    show("#archive", parts);
    return;
  }
  const explorer = `https://opensheaf.org/explorer/?url=${encodeURIComponent(s.baseUrl)}`;
  parts.push(
    el("h2", {}, s.name),
    el("p", { class: "facts" }, el("a", { href: s.baseUrl }, s.baseUrl), " · ",
       el("a", { href: explorer }, "open in the Explorer"), " · ",
       el("a", { href: `https://github.com/${state.repo}` }, state.repo)),
    el("div", { class: "controls" },
      el("button", { class: "primary", onclick: () => openForm("deposit") }, "Deposit a paper"),
      el("button", { onclick: () => openForm("new_collection") }, "Create a collection")),
    el("h3", {}, "Papers"),
    docs().length ? el("table", {},
      el("tr", {}, el("th", {}, "Identifier"), el("th", {}, "Title"), el("th", {}, "")),
      docs().map((o) => el("tr", {},
        el("td", {}, el("code", {}, o.id), o.status === "withdrawn" ? el("span", { class: "chip bad" }, "withdrawn") : null),
        el("td", { "data-title": o.id }, ""),
        el("td", { class: "actions" },
          el("button", { class: "small", onclick: () => openForm("deposit", { "Identifier": o.id }) }, "New version"),
          el("button", { class: "small", onclick: () => openForm("notice", { "Identifier": o.id }) }, "Notice"),
          el("button", { class: "small", onclick: () => openForm("relicense", { "Identifier": o.id }) }, "Licence"),
          o.status === "withdrawn" ? null :
            el("button", { class: "small", onclick: () => openForm("withdraw", { "Identifier": o.id }) }, "Withdraw")))))
      : el("p", { class: "muted" }, "No papers yet."),
    el("h3", {}, "Collections"),
    state.collections.length ? state.collections.map((c) => el("section", { class: "collection" },
      el("h4", {}, c.title, " ", el("span", { class: "chip" }, c.type || "collection"),
         s.index && s.index.html && s.index.html.featured === c.id ? el("span", { class: "chip ok" }, "featured") : null),
      el("p", { class: "small muted" }, el("code", {}, c.id)),
      c.members.length ? el("ol", { class: "members" }, c.members.map((m) => el("li", {},
        el("code", {}, m.id), m.cite && m.cite.title ? ` ${m.cite.title}` : "",
        m.revisions ? el("span", { class: "muted" }, ` (vetted: ${m.revisions.map((r) => r.documentVersion).join(", ")})`) : null)))
        : el("p", { class: "muted" }, "No members yet."),
      el("div", { class: "controls" },
        el("button", { class: "small", onclick: () => openForm("add", { "In collection": c.id }) }, "Add a member"),
        c.type === "selection" && c.members.length ?
          el("button", { class: "small", onclick: () => openForm("vet", { "In collection": c.id }) }, "Vet a new version") : null,
        c.members.length ?
          el("button", { class: "small", onclick: () => openForm("remove", { "In collection": c.id }) }, "Remove a member") : null)))
      : el("p", { class: "muted" }, "No collections yet."),
    el("h3", {}, "Requests"),
    el("div", { id: "requests" }));
  show("#archive", parts);
  showResults();
}

// --- forms -------------------------------------------------------------------

function options(kind, values) {
  if (kind === "collections") return state.collections.map((c) => [c.id, `${c.title} (${c.id})`]);
  if (kind === "documents") return docs().map((o) => [o.id, o.id]);
  if (kind === "members") {
    const c = state.collections.find((x) => x.id === values["In collection"]);
    return c ? c.members.map((m) => [JSON.stringify([m.id, m.archiveUrl || ""]), m.cite && m.cite.title ? `${m.id}: ${m.cite.title}` : m.id]) : [];
  }
  return kind.map((o) => [o, o]);
}

function openForm(name, preset = {}) {
  const form = FORMS[name];
  const values = { ...preset };
  const inputs = {};
  const body = el("form", { class: "op", onsubmit: (ev) => { ev.preventDefault(); submit(name, inputs); } },
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
        const first = typeof f.options !== "string" ? null
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

async function submit(name, inputs) {
  const values = collect(inputs);
  // a member chosen in a list carries its archive, for members of the same name
  for (const label of ["Member", "Member to remove"])
    if (values[label] && values[label].startsWith("[")) {
      const [id, archive] = JSON.parse(values[label]);
      values[label] = id;
      if (archive) values["Archive of the member"] = archive;
    }
  const files = {};
  for (const [label, input] of Object.entries(inputs))
    if (input.type === "file" && input.files.length)
      files[label] = await Promise.all([...input.files].map(async (f) =>
        ({ name: f.name, bytes: new Uint8Array(await f.arrayBuffer()) })));
  const { fields, missing } = check(name, values, files);
  if (values["Archive of the member"]) fields["Archive of the member"] = values["Archive of the member"];
  if (missing.length) { message("bad", `Fill in: ${missing.join(", ")}.`); return; }
  const id = gh.requestId();
  const what = `${FORMS[name].title}${subject(name, fields) ? `: ${subject(name, fields)}` : ""}`;
  try {
    message("info", "Sending the request ...");
    await gh.commitFiles(await token(), state.repo, gh.buildRequest(id, name, fields, files),
                         `Request ${id}: ${what}`);
    state.pending.set(id, { what, since: Date.now() });
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
      message(result.ok ? "ok" : "bad", render(result.message));
      await openArchive(repo);
      return;
    }
  }
  if (state.repo === repo) {
    state.pending.get(id) && (state.pending.get(id).late = true);
    showResults();
  }
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
        el("div", {}, render(r.message))));
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
