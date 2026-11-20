import { test } from "node:test";
import assert from "node:assert/strict";
import { requestId, safeName, buildRequest, base64, commitFiles } from "../github.js";
import { check, FORMS } from "../forms.js";

test("request identifiers sort by time", () => {
  const id = requestId(new Date(Date.UTC(2026, 10, 16, 9, 5, 3)), () => 0);
  assert.equal(id, "20261116-090503-aaaa");
  assert.match(requestId(), /^\d{8}-\d{6}-[a-z]{4}$/);
});

test("file names are made safe and never leave the request folder", () => {
  assert.equal(safeName("../../etc/passwd"), "passwd");
  assert.equal(safeName("C:\\Users\\me\\My Paper (final).pdf"), "My-Paper-final-.pdf");
  assert.equal(safeName("..."), "file");
});

test("a request: request.json first, then the files, names unique", () => {
  const entries = buildRequest("20261116-090503-abcd", "deposit",
    { Label: "kpz", Title: "KPZ", Abstract: "  " },
    { "PDF of this version": [{ name: "paper.pdf", bytes: new Uint8Array([1]) }],
      "Sources": [{ name: "paper.pdf", bytes: new Uint8Array([2]) }, { name: "refs.bib", bytes: new Uint8Array([3]) }] });
  assert.deepEqual(entries.map((e) => e.path), [
    "requests/20261116-090503-abcd/request.json", "requests/20261116-090503-abcd/paper.pdf",
    "requests/20261116-090503-abcd/paper-1.pdf", "requests/20261116-090503-abcd/refs.bib"]);
  const json = JSON.parse(new TextDecoder().decode(entries[0].bytes));
  assert.deepEqual(json, { operation: "deposit", fields: { Label: "kpz", Title: "KPZ" },
    files: { "PDF of this version": ["paper.pdf"], "Sources": ["paper-1.pdf", "refs.bib"] } });
});

test("base64 of bytes, also large", () => {
  assert.equal(base64(new TextEncoder().encode("hello")), "aGVsbG8=");
  const big = new Uint8Array(100000).fill(65);
  assert.equal(Buffer.from(base64(big), "base64").length, 100000);
});

function fakeGitHub({ moveOnce = false } = {}) {
  const calls = [];
  let head = "c0", moved = false;
  const fetchImpl = async (url, opts) => {
    const path = url.replace("https://api.github.com", "");
    const body = opts.body ? JSON.parse(opts.body) : undefined;
    calls.push([opts.method, path, body]);
    const reply = (status, data) => ({ ok: status < 300, status,
      headers: { get: () => "application/json" }, json: async () => data, text: async () => JSON.stringify(data) });
    if (path === "/repos/o/r") return reply(200, { default_branch: "main" });
    if (path === "/repos/o/r/git/blobs") return reply(201, { sha: `b${calls.length}` });
    if (path === "/repos/o/r/git/ref/heads/main") return reply(200, { object: { sha: head } });
    if (path.startsWith("/repos/o/r/git/commits/")) return reply(200, { tree: { sha: "t-" + path.split("/").pop() } });
    if (path === "/repos/o/r/git/trees") return reply(201, { sha: "t-new" });
    if (path === "/repos/o/r/git/commits") return reply(201, { sha: "c-new-" + body.parents[0] });
    if (path === "/repos/o/r/git/refs/heads/main") {
      if (moveOnce && !moved) { moved = true; head = "c1"; return reply(422, { message: "Update is not a fast forward" }); }
      head = body.sha; return reply(200, {});
    }
    return reply(404, { message: "Not Found" });
  };
  return { fetchImpl, calls, get head() { return head; } };
}

test("a request is one commit on the default branch", async () => {
  const g = fakeGitHub();
  const entries = buildRequest("x", "notice", { Label: "kpz" });
  const sha = await commitFiles("tok", "o/r", entries, "Request x", { fetchImpl: g.fetchImpl });
  assert.equal(sha, "c-new-c0");
  const tree = g.calls.find((c) => c[1] === "/repos/o/r/git/trees")[2];
  assert.equal(tree.base_tree, "t-c0");
  assert.deepEqual(tree.tree.map((e) => e.path), ["requests/x/request.json"]);
});

test("if the branch moved meanwhile, the commit is made again on top", async () => {
  const g = fakeGitHub({ moveOnce: true });
  const sha = await commitFiles("tok", "o/r", buildRequest("x", "notice", {}), "m", { fetchImpl: g.fetchImpl });
  assert.equal(sha, "c-new-c1");
  assert.equal(g.head, "c-new-c1");
});

test("forms: the labels the archive's script reads, and the required fields", () => {
  const { fields, missing } = check("deposit", { Label: " kpz ", Title: "" }, {});
  assert.deepEqual(fields, { Label: "kpz" });
  assert.deepEqual(missing, ["This deposit", "PDF of this version"]);
  assert.deepEqual(check("relicense", { Label: "kpz", "New licence": "CC0 1.0 (cc0-1.0)" }).missing,
                   ["How the authors agreed"]);
  for (const form of Object.values(FORMS))
    for (const f of form.fields) assert.ok(f.label && !f.label.includes("\n"));
});

test("raw contents are text, whatever GitHub labels them", async () => {
  const { readText, readJSON } = await import("../github.js");
  const fetchImpl = async () => ({ ok: true, status: 200,
    headers: { get: () => "application/vnd.github.raw+json; charset=utf-8" },
    json: async () => { throw new Error("not JSON"); }, text: async () => "name: verify\n" });
  assert.equal(await readText("t", "o/r", ".github/workflows/verify.yml", fetchImpl), "name: verify\n");
  const jsonFetch = async () => ({ ok: true, status: 200,
    headers: { get: () => "application/vnd.github.raw+json" }, text: async () => '{"a": 1}' });
  assert.deepEqual(await readJSON("t", "o/r", "x.json", jsonFetch), { a: 1 });
});

test("a deposit from arXiv needs the right to deposit it", async () => {
  const { check } = await import("../forms.js");
  const base = { "arXiv identifier": "2303.18112", "Label": "kpz", "Who agreed": "Doe, Jane" };
  assert.deepEqual(check("arxiv", base).missing, ["Right to deposit it"]);
  const ok = check("arxiv", { ...base, "Right to deposit it": "I am an author of the paper" });
  assert.deepEqual(ok.missing, []);
  assert.equal(ok.fields["Right to deposit it"], "I am an author of the paper");
});

test("paths with . or .. segments are refused, repository names are checked", async () => {
  const { encodePath, isRepo, readText } = await import("../github.js");
  assert.equal(encodePath("ocfl/a b/v1/content/x.json"), "ocfl/a%20b/v1/content/x.json");
  assert.throws(() => encodePath("ocfl/../../user"));
  assert.throws(() => encodePath("./x"));
  let called = false;
  await assert.rejects(readText("t", "o/r", "ocfl/../x", async () => { called = true; }));
  assert.equal(called, false);
  assert.ok(isRepo("opensheaf/my-test") && isRepo("a-b/c.d_e"));
  for (const bad of ["opensheaf/..", "opensheaf/.", "a/b/c", "a", "../x", "a b/c", ""]) assert.ok(!isRepo(bad), bad);
});

// The labels of the fields that .github/scripts/osheaf_issue.py of the
// archive template (branch spec-0.2) reads, form by form: a request must
// carry exactly these.
const SCRIPT_FIELDS = {
  setup: ["Name", "Purpose", "Description", "Curator", "Affiliation", "Contact", "Key log of the owner", "Owner", "Base URL"],
  deposit: ["This deposit", "Label", "Title", "Authors", "Abstract", "Keywords", "Licence", "PDF of this version",
            "Sources", "Main source", "Licence file", "If there are no sources, why", "Related identifiers",
            "What changed (for a new version)", "Date this version became public", "Date the paper first appeared",
            "In collection", "Position"],
  arxiv: ["arXiv identifier", "Label", "Versions", "Right to deposit it", "Who agreed", "How the permission was given",
          "In collection", "Position"],
  notice: ["Label", "Document version it is about", "Text of the notice", "Full statement (optional)"],
  withdraw: ["Label", "Reason for the withdrawal"],
  relicense: ["Label", "New licence", "How the authors agreed"],
  new_collection: ["Label of the new collection", "Title of the collection", "Kind", "Description",
                   "Feature it on the home page", "In collection", "Position"],
  add: ["In collection", "New member", "Archive of the new member", "Versions you vet (selection)", "Position", "Why (optional)"],
  vet: ["In collection", "Member", "Versions to vet", "Why (optional)"],
  remove: ["In collection", "Member to remove", "Why (optional)"],
};

test("every form carries the fields the archive's script reads (specification 0.2)", async () => {
  const { FORMS, NEW_PAPER, NEW_VERSION } = await import("../forms.js");
  assert.deepEqual(Object.keys(FORMS).sort(), Object.keys(SCRIPT_FIELDS).sort());
  for (const [name, labels] of Object.entries(SCRIPT_FIELDS))
    assert.deepEqual(FORMS[name].fields.map((f) => f.label), labels, name);
  const deposit = FORMS.deposit.fields.find((f) => f.label === "This deposit");
  assert.deepEqual(deposit.options, [NEW_PAPER, NEW_VERSION]);
  assert.equal(NEW_PAPER, "A new paper");
  assert.equal(NEW_VERSION, "A new version of a paper in the archive");
  assert.ok(!FORMS.setup.fields.some((f) => /identifier/i.test(f.label)), "no archive identifier in 0.2");
});

test("a setup request carries the owner's key log as a file, a member is sent as its sheaf: URI", async () => {
  const { check, subject } = await import("../forms.js");
  const zip = [{ name: "key-log.zip", bytes: new Uint8Array([80, 75]) }];
  const setup = check("setup", { Name: "Papers", Curator: "Doe, Jane" }, { "Key log of the owner": zip });
  assert.deepEqual(setup.missing, []);
  const entries = buildRequest("id", "setup", setup.fields, { "Key log of the owner": zip });
  const json = JSON.parse(new TextDecoder().decode(entries[0].bytes));
  assert.deepEqual(json.files, { "Key log of the owner": ["key-log.zip"] });
  const uri = `sheaf:${"a".repeat(52)}:${"b".repeat(51)}q`;
  const vet = check("vet", { "In collection": "reading", Member: uri, "Versions to vet": "2" });
  assert.deepEqual(vet.fields, { "In collection": "reading", Member: uri, "Versions to vet": "2" });
  assert.equal(subject("vet", vet.fields), `${uri.slice(0, 18)}...`);
  assert.equal(subject("deposit", { Label: "kpz" }), "kpz");
});

test("whether a secret is set: true, false, or unknown without the permission", async () => {
  const { secretExists } = await import("../github.js");
  const reply = (status) => async () => ({ ok: status < 300, status, headers: { get: () => "application/json" },
    json: async () => ({ message: "x" }), text: async () => "{}" });
  assert.equal(await secretExists("t", "o/r", "OPENSHEAF_SIGNING_KEY", reply(200)), true);
  assert.equal(await secretExists("t", "o/r", "OPENSHEAF_SIGNING_KEY", reply(404)), false);
  assert.equal(await secretExists("t", "o/r", "OPENSHEAF_SIGNING_KEY", reply(403)), null);
});
