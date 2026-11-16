import { test } from "node:test";
import assert from "node:assert/strict";
import { tokenSource } from "../session.js";

function make(auth, renew, now = () => 1_000_000) {
  const box = { auth, expired: 0 };
  const token = tokenSource({ get: () => box.auth, set: (a) => { box.auth = a; }, renew,
                              expired: () => { box.expired++; box.auth = null; }, now });
  return { box, token };
}

test("a token far from its expiry is used as it is", async () => {
  let renewals = 0;
  const { token } = make({ kind: "app", access_token: "a", refresh_token: "r", expires_at: 1_000_000 + 3600_000 },
                         async () => { renewals++; });
  assert.equal(await token(), "a");
  assert.equal(renewals, 0);
});

test("callers that find the token due share one renewal", async () => {
  let renewals = 0;
  const { token, box } = make({ kind: "app", access_token: "a", refresh_token: "r1", expires_at: 1_000_000 + 60_000 },
    async (rt) => { renewals++; assert.equal(rt, "r1"); await new Promise((r) => setTimeout(r, 10));
                    return { access_token: "b", refresh_token: "r2", expires_at: 1_000_000 + 8 * 3600_000 }; });
  const got = await Promise.all([token(), token(), token()]);
  assert.deepEqual(got, ["b", "b", "b"]);
  assert.equal(renewals, 1);
  assert.equal(box.auth.refresh_token, "r2");
  assert.equal(box.auth.kind, "app");
});

test("a failed renewal keeps a valid token, and ends an expired session", async () => {
  const fail = async () => { throw new Error("bad_refresh_token"); };
  const valid = make({ kind: "app", access_token: "a", refresh_token: "r", expires_at: 1_000_000 + 60_000 }, fail);
  assert.equal(await valid.token(), "a");
  assert.equal(valid.box.expired, 0);
  const gone = make({ kind: "app", access_token: "a", refresh_token: "r", expires_at: 1_000_000 - 1 }, fail);
  await assert.rejects(gone.token(), /sign in again/);
  assert.equal(gone.box.expired, 1);
});

test("a personal access token is never renewed", async () => {
  const { token } = make({ kind: "pat", access_token: "p" }, async () => { throw new Error("no"); });
  assert.equal(await token(), "p");
});
