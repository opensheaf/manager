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
    { Identifier: "kpz", Title: "KPZ", Abstract: "  " },
    { "PDF of this version": [{ name: "paper.pdf", bytes: new Uint8Array([1]) }],
      "Sources": [{ name: "paper.pdf", bytes: new Uint8Array([2]) }, { name: "refs.bib", bytes: new Uint8Array([3]) }] });
  assert.deepEqual(entries.map((e) => e.path), [
    "requests/20261116-090503-abcd/request.json", "requests/20261116-090503-abcd/paper.pdf",
    "requests/20261116-090503-abcd/paper-1.pdf", "requests/20261116-090503-abcd/refs.bib"]);
  const json = JSON.parse(new TextDecoder().decode(entries[0].bytes));
  assert.deepEqual(json, { operation: "deposit", fields: { Identifier: "kpz", Title: "KPZ" },
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
  const entries = buildRequest("x", "notice", { Identifier: "kpz" });
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
  const { fields, missing } = check("deposit", { Identifier: " kpz ", Title: "" }, {});
  assert.deepEqual(fields, { Identifier: "kpz" });
  assert.deepEqual(missing, ["PDF of this version"]);
  assert.deepEqual(check("relicense", { Identifier: "kpz", "New licence": "CC0 1.0 (cc0-1.0)" }).missing,
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
