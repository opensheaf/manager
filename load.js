// Reading an archive's repository, as plain functions over the GitHub API
// (no DOM), so that the tests can check them with a fake GitHub: the
// settings, the lines of the discovery document, the collections and their
// members; and waiting for the answer to a request, after which the archive
// is read again at the commit that carried it out.

import * as gh from "./github.js";
import { lines, objectPath, originatorOf, shortForms } from "./archive.js";

// Several files of the head version of a line (an entry of the discovery
// document), its inventory read once. `o` holds the reading options of
// github.js (ref, fresh, fetchImpl).
export async function headFiles(t, repo, line, layout, names, o = {}) {
  const dir = await objectPath(line, layout);
  const inv = await gh.readJSON(t, repo, `${dir}/inventory.json`, o);
  if (!inv) return names.map(() => null);
  const st = inv.versions[inv.head].state;
  return Promise.all(names.map((name) => {
    const digest = Object.keys(st).find((d) => st[d].includes(name));
    return digest ? gh.readJSON(t, repo, `${dir}/${inv.manifest[digest][0]}`, o) : null;
  }));
}

// What the page shows of an archive. `o.ref`: read at that commit (after a
// request, the head that carried it out), past the browser's cache.
export async function readArchive(t, repo, o = {}) {
  const out = { meta: null, empty: false, hasWorkflow: false, settings: null, lines: [], layout: "",
                collections: [], catalogues: [], originators: new Map(), secret: null, keyLog: false,
                base: null, short: shortForms({}) };
  // an empty repository (no commit yet) is not an archive, and GitHub cannot
  // add commits to it through its API: it must be made from the template
  out.meta = await gh.api(t, `/repos/${repo}`, { fetchImpl: o.fetchImpl, fresh: o.fresh || Boolean(o.ref) });
  if (!(await gh.listDir(t, repo, "", o)).length) {
    out.empty = true;
    return out;
  }
  out.hasWorkflow = (await gh.readText(t, repo, ".github/workflows/from-request.yml", o)) !== null;
  out.settings = await gh.readJSON(t, repo, "osheaf.json", o);
  out.secret = await gh.secretExists(t, repo, "OPENSHEAF_SIGNING_KEY", o.fetchImpl);
  if (out.settings) {
    const disc = await gh.readJSON(t, repo, "opensheaf.json", o);
    out.lines = lines(disc);
    out.short = shortForms(disc);
    out.layout = (disc && disc.storageLayout) || "";
    const labels = (await gh.listDir(t, repo, "collections", o))
      .filter((f) => f.name.endsWith(".yaml")).map((f) => f.name.replace(/\.yaml$/, ""));
    out.collections = (await Promise.all(labels.map(async (label) => {
      const line = out.lines.find((x) => x.label === label);
      if (!line) return null;      // a list not synced yet
      const [members, dc, genesis] = await headFiles(t, repo, line, out.layout,
        ["members.json", "datacite.json", "genesis.json"], o);
      const originator = originatorOf(genesis, line);
      if (originator) out.originators.set(`${line.name}:${line.owner}`, originator);
      return { label, name: line.name, owner: line.owner, originator,
               title: dc && dc.titles ? dc.titles[0].title : label,
               type: members ? members.type : "", members: (members && members.members) || [] };
    }))).filter(Boolean);
    // the owner catalogues (section 8.1), named in `owners` of the discovery
    // document, in its order; kept by the tools, not by collections/*.yaml
    const entries = disc && Array.isArray(disc.owners) ? disc.owners : [];
    out.catalogues = (await Promise.all(entries.map(async (e) => {
      const m = /^sheaf:([^:]+):([^:/]+)$/.exec((e && e.catalogue) || "");
      const line = m && out.lines.find((x) => x.name === m[1] && x.owner === m[2]);
      if (!line) return null;
      const [members, dc] = await headFiles(t, repo, line, out.layout, ["members.json", "datacite.json"], o);
      return { label: line.label || "", name: line.name, owner: line.owner, catalogue: true,
               title: dc && dc.titles ? dc.titles[0].title : (line.label || line.name),
               type: "owner catalogue", members: (members && members.members) || [] };
    }))).filter(Boolean);
  } else {
    out.keyLog = (await gh.readText(t, repo, "key-log/inventory.json", o)) !== null;
    out.base = await baseUrl(t, repo, o.fetchImpl);
  }
  return out;
}

// Where GitHub Pages will serve the site of a repository not set up, as the
// template's setup finds it (osheaf_issue.py, default_base_url): { url, rule }.
// (a) The address of the repository's Pages site, if on; (b) if the owner's
// site OWNER.github.io has a domain of its own (its Pages' cname, or its
// file CNAME), https://DOMAIN/REPOSITORY/; (c) https://OWNER.github.io/REPOSITORY/.
// Reads this sign-in may not make are skipped.
export async function baseUrl(t, repo, fetchImpl) {
  const [owner, name] = repo.split("/");
  const user = owner.toLowerCase();
  const get = (path) => gh.api(t, path, { fetchImpl }).catch(() => null);
  const own = await get(`/repos/${repo}/pages`);
  if (own && typeof own.html_url === "string" && /^https?:\/\//.test(own.html_url)) {
    const url = own.html_url.replace(/^http:/, "https:");
    return { url: url.endsWith("/") ? url : `${url}/`, rule: "the address of the repository's GitHub Pages site" };
  }
  const path = name.toLowerCase() === `${user}.github.io` ? "" : `${name}/`;
  const site = `${owner}/${owner}.github.io`;
  let domain = ((await get(`/repos/${site}/pages`)) || {}).cname || "";
  if (!domain) {
    const file = await gh.readText(t, site, "CNAME", fetchImpl).catch(() => null);
    domain = typeof file === "string" ? file.trim().split(/\s+/)[0] || "" : "";
  }
  domain = domain.toLowerCase();
  if (/^[a-z0-9.-]+$/.test(domain) && !domain.endsWith(".github.io"))
    return { url: `https://${domain}/${path}`,
             rule: `the domain of the owner's GitHub Pages (${owner}.github.io is served at ${domain})` };
  return { url: `https://${user}.github.io/${path}`, rule: "the GitHub Pages address of the owner (no domain of its own found)" };
}

// Waits for the answer to request ID (requests/results/ID.json), read past
// the browser's cache. Once it is there, the archive is read again at the
// head of the default branch, which holds the answer and so the change it
// reports: GitHub may serve the branch's files from before the push for a
// while, never a commit's. Returns { result, archive, ref } (archive null if
// it could not be read), or null after `timeout` ms or once `stop()` says
// so. `token` is a function giving the token, renewed while waiting.
export async function awaitRequest(token, repo, id, { fetchImpl, interval = 8000, timeout = 15 * 60_000,
                                                     stop = () => false, sleep = defaultSleep, now = Date.now } = {}) {
  const started = now();
  const path = `requests/results/${id}.json`;
  while (now() - started < timeout && !stop()) {
    await sleep(interval);
    if (stop()) return null;
    let result = null;
    try { result = await gh.readJSON(await token(), repo, path, { fetchImpl, fresh: true }); }
    catch (_) { /* try again */ }
    if (!result) continue;
    const t = await token();
    let ref = "";
    try {
      const meta = await gh.api(t, `/repos/${repo}`, { fetchImpl, fresh: true });
      ref = await gh.headSha(t, repo, meta.default_branch || "main", { fetchImpl });
      // the head read may lag behind the answer just read: then wait for it
      for (let k = 0; k < 5 && !(await gh.readText(t, repo, path, { fetchImpl, ref })); k++) {
        await sleep(Math.min(interval, 2000));
        ref = await gh.headSha(t, repo, meta.default_branch || "main", { fetchImpl });
      }
    } catch (_) { ref = ""; }
    if (stop()) return null;
    let archive = null;
    try { archive = await readArchive(t, repo, ref ? { fetchImpl, ref } : { fetchImpl, fresh: true }); }
    catch (_) { /* the caller reads it again as it can */ }
    return { result, archive, ref };
  }
  return null;
}

function defaultSleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
