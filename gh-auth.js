// Client side of opensheaf/gh-auth, for pages that write to GitHub.
//
//   import { signIn, refresh } from "./gh-auth.js";
//   const auth = await signIn("https://gh-auth.example.workers.dev");
//   // auth.access_token, and for a GitHub App also auth.expires_in,
//   // auth.refresh_token, auth.refresh_token_expires_in
//   const renewed = await refresh(service, auth.refresh_token);
//
// signIn must be called from a user action (a click), or the browser blocks
// the popup.

const MESSAGE_TYPE = "opensheaf-gh-auth";

export function signIn(service, { width = 600, height = 720 } = {}) {
  const base = new URL(service);
  const login = new URL("/login", base);
  login.searchParams.set("origin", window.location.origin);
  const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2);
  const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2);
  const popup = window.open(login.toString(), "opensheaf-gh-auth",
    `popup,width=${width},height=${height},left=${left},top=${top}`);
  if (!popup)
    return Promise.reject(new Error("The browser blocked the sign-in window."));

  return new Promise((resolve, reject) => {
    const done = (f, v) => {
      window.removeEventListener("message", onMessage);
      clearInterval(timer);
      f(v);
    };
    const onMessage = (event) => {
      if (event.origin !== base.origin || event.source !== popup) return;
      const data = event.data;
      if (!data || data.type !== MESSAGE_TYPE) return;
      if (data.error)
        done(reject, Object.assign(
          new Error(data.error_description || data.error), { code: data.error }));
      else {
        const { type, ...token } = data;
        done(resolve, withExpiry(token));
      }
    };
    window.addEventListener("message", onMessage);
    const timer = setInterval(() => {
      if (popup.closed)
        done(reject, Object.assign(new Error("The sign-in window was closed."),
                                   { code: "closed" }));
    }, 500);
  });
}

export async function refresh(service, refreshToken) {
  const response = await fetch(new URL("/refresh", service), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data || data.error)
    throw Object.assign(
      new Error((data && (data.error_description || data.error)) ||
                `Refresh failed (status ${response.status}).`),
      { code: data && data.error });
  return withExpiry(data);
}

// Adds absolute expiry times (milliseconds since the epoch), easier to
// keep than durations.
function withExpiry(token) {
  const now = Date.now();
  const out = { ...token };
  if (token.expires_in) out.expires_at = now + token.expires_in * 1000;
  if (token.refresh_token_expires_in)
    out.refresh_token_expires_at = now + token.refresh_token_expires_in * 1000;
  return out;
}
