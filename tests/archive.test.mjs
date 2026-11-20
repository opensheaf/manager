import { test } from "node:test";
import assert from "node:assert/strict";
import { lines, objectPath, memberUri, memberLink, explorerLink, ownLabel } from "../archive.js";

const NAME = "a".repeat(52), OWNER = "b".repeat(51) + "q";
const line = { id: `sheaf:${NAME}:${OWNER}`, kind: "document", name: NAME, owner: OWNER, label: "kpz" };

test("the lines of a discovery document are those with a label", () => {
  const disc = { objects: [line, { id: `sheaf:${OWNER}:${OWNER}`, kind: "owner", name: OWNER, owner: OWNER }] };
  assert.deepEqual(lines(disc), [line]);
  assert.deepEqual(lines(null), []);
});

test("the folder of a line: owner-name layout, and the hashed layout as opensheaf-py computes it", async () => {
  assert.equal(await objectPath(line, "opensheaf-owner-name-storage-layout"), `ocfl/${OWNER}/${NAME}`);
  assert.equal(await objectPath(line), `ocfl/${OWNER}/${NAME}`);
  // core.path_of(id, HASHED_LAYOUT) of opensheaf-py (branch spec-0.2)
  assert.equal(await objectPath(line, "0003-hash-and-id-n-tuple-storage-layout"),
    "ocfl/349/425/290/sheaf%3aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa%3abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-" +
    "349425290635875e5dca16fcdbe3a7c96b97c9c02c99586b31c31a921815130f");
});

test("a path is never built from names that are not names", async () => {
  await assert.rejects(objectPath({ name: "../x", owner: OWNER }));
  await assert.rejects(objectPath({ name: NAME, owner: "draft" }));
});

test("members: their sheaf: URIs, and Explorer links by label here or by identifier elsewhere", () => {
  const own = { kind: "document", name: NAME, owner: OWNER, at: ["https://example.org/a/"] };
  const other = { kind: "collection", name: "c".repeat(52), owner: OWNER, at: ["https://other.example/b/"] };
  assert.equal(memberUri(own), `sheaf:${NAME}:${OWNER}`);
  assert.equal(ownLabel(own, [line]), "kpz");
  assert.equal(ownLabel(other, [line]), "");
  assert.equal(memberLink(own, "https://example.org/a/", [line]),
    "https://opensheaf.org/explorer/?url=https%3A%2F%2Fexample.org%2Fa%2F#/object/kpz");
  assert.equal(memberLink(own, "https://example.org/a/", [line], "v5"),
    "https://opensheaf.org/explorer/?url=https%3A%2F%2Fexample.org%2Fa%2F#/object/kpz/v5");
  assert.equal(memberLink(other, "https://example.org/a/", [line]),
    `https://opensheaf.org/explorer/?url=https%3A%2F%2Fother.example%2Fb%2F#/collection/${encodeURIComponent(memberUri(other))}`);
  assert.equal(explorerLink("https://example.org/a/", { owner: OWNER }),
    `https://opensheaf.org/explorer/?url=https%3A%2F%2Fexample.org%2Fa%2F#/owner/${OWNER}`);
  assert.equal(explorerLink("https://example.org/a/"), "https://opensheaf.org/explorer/?url=https%3A%2F%2Fexample.org%2Fa%2F");
});
