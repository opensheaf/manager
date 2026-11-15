// Settings of this page. The sign-in service gives tokens only to pages at
// the origins on its list (https://opensheaf.org for the service below);
// a copy of this page elsewhere uses a service of its own, or a personal
// access token.
export const SERVICE = "https://opensheaf-gh-auth.opensheaf.workers.dev";
// The GitHub App of the service (https://github.com/apps/<APP_SLUG>), for
// the link to install it on an archive's repository; empty if unknown.
export const APP_SLUG = "";
// Where the archive template lives, for archives that lack its workflows.
export const TEMPLATE = "https://github.com/opensheaf/archive-template";
