import { test } from "node:test";
import assert from "node:assert/strict";
import { readArchive, awaitRequest } from "../load.js";
import { canonicalUri, originatorOf } from "../archive.js";

const OWNER = "b".repeat(51) + "q", OTHER = "d".repeat(51) + "q";
const DOC = "a".repeat(52), COLL = "c".repeat(52);
const doc = { id: `sheaf:${DOC}:${OWNER}`, kind: "document", name: DOC, owner: OWNER, label: "kpz", status: "active" };
const coll = { id: `sheaf:${COLL}:${OWNER}`, kind: "collection", name: COLL, owner: OWNER, label: "reading", status: "active" };

// A line's head version, its files under v1/content/.
function object(name, files) {
  const out = {};
  const state = {}, manifest = {};
  Object.entries(files).forEach(([f, data], k) => {
    state[`d${k}`] = [f];
    manifest[`d${k}`] = [`v1/content/${f}`];
    out[`ocfl/${OWNER}/${name}/v1/content/${f}`] = JSON.stringify(data);
  });
  out[`ocfl/${OWNER}/${name}/inventory.json`] = JSON.stringify({ head: "v1", versions: { v1: { state } }, manifest });
  return out;
}

const before = {
  ".github/workflows/from-request.yml": "on: push\n",
  "osheaf.json": JSON.stringify({ name: "Papers", baseUrl: "https://example.org/papers/", owner: OWNER }),
  "opensheaf.json": JSON.stringify({ objects: [doc] }),
  ...object(DOC, { "genesis.json": { kind: "document", originator: OWNER } }),
};
const after = {
  ...before,
  "opensheaf.json": JSON.stringify({ objects: [doc, coll] }),
  "collections/reading.yaml": "title: Reading\n",
  ...object(COLL, {
    "genesis.json": { kind: "collection", originator: OWNER },
    "datacite.json": { titles: [{ title: "A reading list" }] },
    "members.json": { type: "catalogue", members: [{ kind: "document", name: DOC, owner: OWNER, at: [] }] },
  }),
  "requests/results/r1.json": JSON.stringify({ id: "r1", ok: true, message: "Created the collection reading." }),
};

// A fake GitHub whose default branch is served stale, from the commit before
// the request (as GitHub's contents API may for a while after a push), while
// the files of a commit read by its sha are those of that commit. The answer
// to the request is seen on the branch once `answered` is set.
function fakeGitHub(first = before) {
  const commits = { c1: first, c2: after };
  const calls = [];
  const g = { answered: false, calls };
  g.fetchImpl = async (url, opts) => {
    const u = new URL(url);
    calls.push({ path: u.pathname, ref: u.searchParams.get("ref"), cache: opts.cache });
    const reply = (status, data, raw = false) => ({ ok: status < 300, status,
      headers: { get: () => (raw ? "application/vnd.github.raw+json" : "application/json") },
      json: async () => data, text: async () => (raw ? data : JSON.stringify(data)) });
    if (u.pathname === "/repos/o/r") return reply(200, { default_branch: "main", permissions: { push: true } });
    if (u.pathname === "/repos/o/r/git/ref/heads/main") return reply(200, { object: { sha: g.answered ? "c2" : "c1" } });
    if (u.pathname.startsWith("/repos/o/r/actions/secrets/")) return reply(200, {});
    const m = /^\/repos\/o\/r\/contents\/?(.*)$/.exec(u.pathname);
    if (!m) return reply(404, { message: "Not Found" });
    const path = decodeURIComponent(m[1]);
    const ref = u.searchParams.get("ref");
    let files = commits[ref || "c1"];
    // the answer itself is seen on the branch, the rest of the commit not yet
    if (!ref && g.answered && path === "requests/results/r1.json") files = after;
    if (!files) return reply(404, { message: "No commit found" });
    if (path in files) return reply(200, files[path], true);
    const prefix = path ? `${path}/` : "";
    const names = new Set(Object.keys(files).filter((f) => f.startsWith(prefix))
      .map((f) => f.slice(prefix.length).split("/")[0]));
    if (!names.size) return reply(404, { message: "Not Found" });
    return reply(200, [...names].map((n) => ({ name: n, path: prefix + n,
      type: Object.prototype.hasOwnProperty.call(files, prefix + n) ? "file" : "dir" })));
  };
  return g;
}

test("an archive is read: settings, lines, collections", async () => {
  const g = fakeGitHub();
  const a = await readArchive("tok", "o/r", { fetchImpl: g.fetchImpl });
  assert.equal(a.settings.name, "Papers");
  assert.deepEqual(a.lines.map((o) => o.label), ["kpz"]);
  assert.deepEqual(a.collections, []);
  assert.equal(a.hasWorkflow, true);
});

test("the lines of a discovery document in pages are read from its pages (section 3.1)", async () => {
  const paged = { ...before, "opensheaf.json": JSON.stringify({ objectPages: ["objects/a.json", "objects/c.json", "../x.json"] }),
                  "objects/a.json": JSON.stringify({ format: "opensheaf-objects/0.2", objects: [doc] }),
                  "objects/c.json": JSON.stringify({ format: "opensheaf-objects/0.2", objects: [coll] }) };
  const g = fakeGitHub(paged);
  const a = await readArchive("tok", "o/r", { fetchImpl: g.fetchImpl });
  assert.deepEqual(a.lines.map((o) => o.label), ["kpz", "reading"]);
  assert.equal(a.short.name(DOC), DOC.slice(0, 8));
  assert.ok(!g.calls.some((c) => c.path.includes("x.json")));
});

test("a completed request triggers a reload at the new head, and the new collection appears", async () => {
  const g = fakeGitHub();
  const sleeps = [];
  const done = await awaitRequest(async () => "tok", "o/r", "r1", {
    fetchImpl: g.fetchImpl,
    sleep: async (ms) => { sleeps.push(ms); if (sleeps.length === 2) g.answered = true; },
  });
  assert.ok(done);
  assert.equal(done.result.ok, true);
  assert.equal(done.ref, "c2");
  // the default branch still serves the commit before: the collection is
  // found only because the archive is read at the new head
  assert.deepEqual(done.archive.collections.map((c) => [c.label, c.title, c.members.length]),
                   [["reading", "A reading list", 1]]);
  assert.equal(done.archive.originators.get(`${COLL}:${OWNER}`), OWNER);
  // the answer and the head are read past the browser's cache, the files at c2
  assert.ok(g.calls.filter((c) => c.path.endsWith("/requests/results/r1.json") && !c.ref).every((c) => c.cache === "no-store"));
  assert.ok(g.calls.filter((c) => c.path.endsWith("/git/ref/heads/main")).every((c) => c.cache === "no-store"));
  assert.ok(g.calls.some((c) => c.path === "/repos/o/r/contents/collections" && c.ref === "c2"));
  assert.ok(!g.calls.some((c) => c.path === "/repos/o/r/contents/opensheaf.json" && !c.ref));
});

test("waiting stops when the page leaves the repository", async () => {
  const g = fakeGitHub();
  let n = 0;
  const done = await awaitRequest(async () => "tok", "o/r", "r1", {
    fetchImpl: g.fetchImpl, stop: () => n > 2, sleep: async () => { n++; } });
  assert.equal(done, null);
});

test("URIs shown in canonical form: no owner part for the originator's line", () => {
  assert.equal(canonicalUri(doc, OWNER), `sheaf:${DOC}`);
  assert.equal(canonicalUri({ name: DOC, owner: OTHER }, OWNER), `sheaf:${DOC}:${OTHER}`);
  // originator unknown (a member in another archive): the full form
  assert.equal(canonicalUri(doc), `sheaf:${DOC}:${OWNER}`);
  assert.equal(originatorOf({ kind: "document", originator: OWNER }, doc), OWNER);
  assert.equal(originatorOf({ kind: "owner" }, { name: OWNER, owner: OWNER }), OWNER);
  assert.equal(originatorOf(null, doc), "");
});

test("the base URL of a repository not set up, as the template's setup finds it", async () => {
  const site = (pages, cname, ownPages) => async (url) => {
    const path = new URL(url).pathname;
    const reply = (status, data, raw = false) => ({ ok: status < 300, status,
      headers: { get: () => (raw ? "application/vnd.github.raw+json" : "application/json") },
      json: async () => data, text: async () => (raw ? data : JSON.stringify(data)) });
    if (path === "/repos/Jane/papers/pages" && ownPages) return reply(200, { html_url: ownPages });
    if (path === "/repos/Jane/Jane.github.io/pages" && pages) return reply(200, { cname: pages });
    if (path === "/repos/Jane/Jane.github.io/contents/CNAME" && cname) return reply(200, cname, true);
    return reply(404, { message: "Not Found" });
  };
  const { baseUrl } = await import("../load.js");
  assert.equal((await baseUrl("t", "Jane/papers", site(null, null, "http://jane.org/papers"))).url, "https://jane.org/papers/");
  assert.equal((await baseUrl("t", "Jane/papers", site("Jane.org", null))).url, "https://jane.org/papers/");
  assert.equal((await baseUrl("t", "Jane/papers", site(null, "jane.org\n"))).url, "https://jane.org/papers/");
  assert.equal((await baseUrl("t", "Jane/papers", site(null, null))).url, "https://jane.github.io/papers/");
  assert.equal((await baseUrl("t", "Jane/Jane.github.io", site(null, "jane.org"))).url, "https://jane.org/");
  assert.match((await baseUrl("t", "Jane/papers", site(null, "jane.org"))).rule, /jane\.org/);
});
