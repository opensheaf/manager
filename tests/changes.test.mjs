// The changes of the Activity panel (changes.js): the recent commits of the
// branch read afresh from the head, how each was made, and the answer of a
// request read at the commit that wrote it; against a double of GitHub's
// list of commits.
import { test } from "node:test";
import assert from "node:assert/strict";
import { howMade, recentChanges, answerAt } from "../changes.js";

const commit = (sha, message, login, date = "2026-11-21T10:00:00Z") => ({
  sha, html_url: `https://github.com/jane/papers/commit/${sha}`, author: login ? { login } : null,
  commit: { message, author: { name: login || "Jane Doe", date }, committer: { date } } });

test("how a commit was made", () => {
  assert.deepEqual(howMade(commit("a", "Notice about first, version 1 (the OpenSheaf manager)\n\nfirst: v2", "jane")),
                   { how: "page", answers: null });
  assert.deepEqual(howMade(commit("b", "Keys changed: v2 of the key log of abc (the OpenSheaf manager): why", "jane")),
                   { how: "page", answers: null });
  assert.deepEqual(howMade(commit("c", "Notice about first (request 20261121-100000-abcd)", "github-actions[bot]")),
                   { how: "workflow", answers: "20261121-100000-abcd" });
  assert.deepEqual(howMade(commit("d", "Request 20261121-100000-abcd not carried out (see requests/results/20261121-100000-abcd.json)",
                                  "github-actions[bot]")), { how: "workflow", answers: "20261121-100000-abcd" });
  assert.deepEqual(howMade(commit("e", "New deposit kpz (issue #4)", "github-actions[bot]")), { how: "workflow", answers: null });
  assert.deepEqual(howMade(commit("f", "Request 20261121-100000-abcd: Notice: first", "jane")),
                   { how: "request", answers: null, sent: "20261121-100000-abcd" });
  assert.deepEqual(howMade(commit("g", "Fix the README", "jane")), { how: "other", answers: null });
  // a commit whose author is named github-actions[bot] but linked to no account is not the workflow's
  const named = { sha: "h", author: null, commit: { message: "Notice (request 20261121-100000-abcd)",
                                                    author: { name: "github-actions[bot]", date: "2026-11-21T10:00:00Z" } } };
  assert.deepEqual(howMade(named), { how: "other", answers: null });
});

test("the changes are read from the head, past the cache; an answer at its commit", async () => {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push([String(url), init.cache || ""]);
    if (String(url).includes("/commits?")) {
      return new Response(JSON.stringify([commit("c", "Notice (request 20261121-100000-abcd)", "github-actions[bot]"),
                                          commit("f", "Request 20261121-100000-abcd: Notice: first", "jane")]),
                          { status: 200, headers: { "content-type": "application/json" } });
    }
    return new Response(JSON.stringify({ ok: true, message: "Done." }), { status: 200, headers: { "content-type": "application/json" } });
  };
  const list = await recentChanges("t", "jane/papers", { fetchImpl });
  assert.deepEqual(calls[0], ["https://api.github.com/repos/jane/papers/commits?per_page=15", "no-store"]);
  assert.deepEqual(list.map((x) => [x.sha, x.how, x.answers, x.subject]),
                   [["c", "workflow", "20261121-100000-abcd", "Notice (request 20261121-100000-abcd)"],
                    ["f", "request", null, "Request 20261121-100000-abcd: Notice: first"]]);
  assert.equal(list[0].url, "https://github.com/jane/papers/commit/c");
  assert.deepEqual(await answerAt("t", "jane/papers", "20261121-100000-abcd", "c", fetchImpl), { ok: true, message: "Done." });
  assert.match(calls[1][0], /contents\/requests\/results\/20261121-100000-abcd\.json\?ref=c$/);
});
