// The changes of an archive: its recent commits on the default branch, read
// afresh from the head every time (never at a commit the page remembers),
// each said with how it was made: signed in this page (the commits of
// writing directly, of a new key, of a setup, whose subject names the
// manager as their origin), by the archive's workflow (github-actions[bot],
// which carries out the issue forms and the requests), a request sent from
// this page to the workflow, or otherwise (a push). A commit of the
// workflow that answers a request names it ("(request ID)", or "Request ID
// not carried out"): its answer is requests/results/ID.json at that commit.
import * as gh from "./github.js";

export const PAGE_ORIGIN = "(the OpenSheaf manager)";
const ID = "\\d{8}-\\d{6}-[a-z]{4}";
const ANSWER = new RegExp(`\\(request (${ID})\\)|^Request (${ID}) not carried out`);
const SENT = new RegExp(`^Request (${ID}): `);
export const WORKFLOW_AUTHOR = "github-actions[bot]";

// How a commit of GitHub's list was made: "page", "workflow", "request"
// (sent from a page) or "other"; and the request it answers, if any. The
// workflow is known by the GitHub account the commit's author is linked to
// (its login), never by the author's name written in the commit, which
// whoever pushes chooses.
export function howMade(c) {
  const subject = String((c.commit && c.commit.message) || "").split("\n")[0];
  const author = (c.author && typeof c.author.login === "string" && c.author.login) || "";
  const answer = ANSWER.exec(subject);
  if (author === WORKFLOW_AUTHOR) return { how: "workflow", answers: answer ? answer[1] || answer[2] : null };
  if (subject.includes(PAGE_ORIGIN)) return { how: "page", answers: null };
  const sent = SENT.exec(subject);
  if (sent) return { how: "request", answers: null, sent: sent[1] };
  return { how: "other", answers: null };
}

// The N latest commits of REPO's default branch: { sha, url, time, subject,
// how, answers, sent }.
export async function recentChanges(token, repo, { n = 15, fetchImpl } = {}) {
  const list = await gh.api(token, `/repos/${repo}/commits?per_page=${n}`, { fetchImpl, fresh: true });
  return (Array.isArray(list) ? list : []).map((c) => {
    const message = String((c.commit && c.commit.message) || "");
    const when = (c.commit && ((c.commit.committer && c.commit.committer.date) || (c.commit.author && c.commit.author.date))) || "";
    return { sha: c.sha, url: c.html_url || `https://github.com/${repo}/commit/${c.sha}`, time: when,
             subject: message.split("\n")[0], ...howMade(c) };
  });
}

// The answer to request ID, as the commit SHA that wrote it holds it.
export async function answerAt(token, repo, id, sha, fetchImpl) {
  return gh.readJSON(token, repo, `requests/results/${id}.json`, { fetchImpl, ref: sha });
}
