// The token of the session, renewed shortly before it expires. A GitHub
// App's refresh token works only once, so all the callers that find the
// token due share one renewal: two renewals with the same refresh token
// would make the second fail. A renewal that fails while the token is still
// valid is tried again at the next call; once the token has expired, the
// session ends (expired) and the caller is told to sign in again.
//
//   const token = tokenSource({ get, set, renew, expired });
//   const t = await token();
//
// get() and set(auth): the stored sign-in ({ access_token, refresh_token?,
// expires_at?, kind }); renew(refreshToken): a promise of the new one.

export function tokenSource({ get, set, renew, expired = () => {}, now = Date.now, margin = 5 * 60_000 }) {
  let renewing = null;
  return async function token() {
    const a = get();
    if (!a) throw new Error("Not signed in.");
    const due = a.kind === "app" && a.expires_at && a.refresh_token && a.expires_at - now() < margin;
    if (!due) return a.access_token;
    if (!renewing)
      renewing = Promise.resolve(renew(a.refresh_token))
        .then((r) => { set({ ...r, kind: "app" }); })
        .finally(() => { renewing = null; });
    try {
      await renewing;
    } catch (_) {
      if (a.expires_at > now()) return a.access_token;
      expired();
      throw new Error("Your sign-in has expired: sign in again.");
    }
    return get().access_token;
  };
}
