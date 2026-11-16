// The GitHub API, as the manager uses it: reading an archive's files, and
// writing a request (requests/ID/request.json and the files attached) as
// one commit. Every function takes the token explicitly and uses `fetch`,
// so that the tests can replace it.

const API = "https://api.github.com";

export class GitHubError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function api(token, path, { method = "GET", body, accept, fetchImpl = fetch } = {}) {
  const headers = {
    Accept: accept || "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const response = await fetchImpl(path.startsWith("http") ? path : API + path, {
    method, headers, body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (response.status === 204) return null;
  // raw file contents come labelled application/vnd.github.raw+json, whatever
  // the file holds: they are read as text, and parsed by readJSON
  const raw = (accept || "").includes(".raw");
  const isJson = !raw && (response.headers.get("content-type") || "").includes("json");
  const data = isJson ? await response.json().catch(() => null) : await response.text();
  if (!response.ok) {
    const message = (data && data.message) || `GitHub answered ${response.status}`;
    throw new GitHubError(message, response.status);
  }
  return data;
}

// The user, and the repositories the token reaches: through the app's
// installations for a token of the sign-in service, or the user's own
// repositories for a personal access token.
export async function whoAmI(token, fetchImpl) {
  return api(token, "/user", { fetchImpl });
}

export async function repositories(token, fetchImpl) {
  const out = new Map();
  let installations = null;
  try {
    installations = await api(token, "/user/installations?per_page=100", { fetchImpl });
  } catch (e) {
    if (e.status !== 403 && e.status !== 401) throw e;
  }
  if (installations && installations.installations) {
    for (const inst of installations.installations) {
      const repos = await api(token, `/user/installations/${inst.id}/repositories?per_page=100`,
                              { fetchImpl });
      for (const r of repos.repositories) out.set(r.full_name, r);
    }
    return { repos: [...out.values()], installations: installations.installations };
  }
  const repos = await api(token, "/user/repos?per_page=100&affiliation=owner,collaborator,organization_member&sort=pushed",
                          { fetchImpl });
  return { repos, installations: null };
}

// A file of the repository's default branch: its text, or null if absent.
export async function readText(token, repo, path, fetchImpl) {
  try {
    return await api(token, `/repos/${repo}/contents/${encodePath(path)}`,
                     { accept: "application/vnd.github.raw+json", fetchImpl });
  } catch (e) {
    if (e.status === 404) return null;
    throw e;
  }
}

export async function readJSON(token, repo, path, fetchImpl) {
  const text = await readText(token, repo, path, fetchImpl);
  if (text === null) return null;
  return typeof text === "string" ? JSON.parse(text) : text;
}

export async function listDir(token, repo, path, fetchImpl) {
  try {
    const items = await api(token, `/repos/${repo}/contents/${encodePath(path)}`, { fetchImpl });
    return Array.isArray(items) ? items : [];
  } catch (e) {
    if (e.status === 404) return [];
    throw e;
  }
}

// A path of the repository, encoded for the API. Paths come from the
// archive's own files (identifiers, inventories), and a segment . or ..
// would lead the request elsewhere in the API once the address is
// normalised: such paths are refused.
export function encodePath(path) {
  const parts = String(path).split("/");
  if (parts.some((p) => p === "." || p === ".."))
    throw new GitHubError(`Not a path in the repository: ${path}`, 400);
  return parts.map(encodeURIComponent).join("/");
}

// A repository's full name, owner/name, as GitHub allows it (not . or ..).
export function isRepo(name) {
  const m = /^([A-Za-z0-9-]+)\/([A-Za-z0-9_.-]+)$/.exec(String(name));
  return Boolean(m) && m[2] !== "." && m[2] !== "..";
}

// A request's identifier: the date and time, so that requests are carried
// out in order, and a few random letters.
export function requestId(date = new Date(), random = Math.random) {
  const p = (n) => String(n).padStart(2, "0");
  const stamp = `${date.getUTCFullYear()}${p(date.getUTCMonth() + 1)}${p(date.getUTCDate())}-` +
                `${p(date.getUTCHours())}${p(date.getUTCMinutes())}${p(date.getUTCSeconds())}`;
  const letters = Array.from({ length: 4 }, () => "abcdefghijkmnpqrstuvwxyz"[Math.floor(random() * 24)]).join("");
  return `${stamp}-${letters}`;
}

// A file name safe in a path: the name's last part, with only letters,
// digits, dots, dashes and underscores.
export function safeName(name) {
  const last = String(name).split(/[\\/]/).pop().trim();
  return last.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^[-.]+|[-.]+$/g, "") || "file";
}

// The files of a request: request.json, with the fields and, for each
// field with files, their names in the request's folder; and the files.
// files: { label: [{ name, bytes: Uint8Array }] }.
export function buildRequest(id, operation, fields, files = {}) {
  const used = new Set(["request.json"]);
  const names = {};
  const entries = [];
  for (const [label, list] of Object.entries(files)) {
    for (const file of list) {
      let name = safeName(file.name);
      const dot = name.lastIndexOf(".");
      for (let k = 1; used.has(name); k++)
        name = dot > 0 ? `${safeName(file.name).slice(0, dot)}-${k}${safeName(file.name).slice(dot)}`
                       : `${safeName(file.name)}-${k}`;
      used.add(name);
      (names[label] = names[label] || []).push(name);
      entries.push({ path: `requests/${id}/${name}`, bytes: file.bytes });
    }
  }
  const clean = Object.fromEntries(Object.entries(fields).filter(([, v]) => String(v ?? "").trim() !== ""));
  const json = JSON.stringify({ operation, fields: clean, files: names }, null, 2) + "\n";
  entries.unshift({ path: `requests/${id}/request.json`, bytes: new TextEncoder().encode(json) });
  return entries;
}

export function base64(bytes) {
  let s = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk)
    s += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  return btoa(s);
}

// Writes files to the default branch as one commit: blobs, a tree on top of
// the branch's, a commit, and the branch moved to it. If the branch moved
// meanwhile (another request, a workflow), the commit is made again on top.
export async function commitFiles(token, repo, entries, message, { fetchImpl, attempts = 3 } = {}) {
  const meta = await api(token, `/repos/${repo}`, { fetchImpl });
  const branch = meta.default_branch;
  const blobs = [];
  for (const e of entries) {
    const blob = await api(token, `/repos/${repo}/git/blobs`, {
      method: "POST", body: { content: base64(e.bytes), encoding: "base64" }, fetchImpl });
    blobs.push({ path: e.path, mode: "100644", type: "blob", sha: blob.sha });
  }
  for (let k = 0; k < attempts; k++) {
    const ref = await api(token, `/repos/${repo}/git/ref/heads/${branch}`, { fetchImpl });
    const parent = await api(token, `/repos/${repo}/git/commits/${ref.object.sha}`, { fetchImpl });
    const tree = await api(token, `/repos/${repo}/git/trees`, {
      method: "POST", body: { base_tree: parent.tree.sha, tree: blobs }, fetchImpl });
    const commit = await api(token, `/repos/${repo}/git/commits`, {
      method: "POST", body: { message, tree: tree.sha, parents: [ref.object.sha] }, fetchImpl });
    try {
      await api(token, `/repos/${repo}/git/refs/heads/${branch}`, {
        method: "PATCH", body: { sha: commit.sha, force: false }, fetchImpl });
      return commit.sha;
    } catch (e) {
      if (e.status !== 422 || k === attempts - 1) throw e;
    }
  }
  throw new GitHubError("The branch kept moving; try again.", 409);
}
