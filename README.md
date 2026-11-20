# OpenSheaf Manager

> [!WARNING]
> **Draft.** OpenSheaf 0.2 is a draft specification. Until version 1.0, any
> revision may change the format in incompatible ways, and the tools follow
> the latest draft.

A page for keeping an [OpenSheaf](https://opensheaf.org) archive from the
browser, at <https://opensheaf.org/manager/>. It works with archives made
from the [archive template](https://github.com/opensheaf/archive-template),
specification 0.2: set the archive up, deposit papers and new versions
(also from arXiv, by their authors or with their permission), give notices
and new licences, withdraw, create collections (reading lists, journal
issues) and add, vet and remove their members. Papers are named by their
labels in the archive; members of collections by their `sheaf:` URIs (or a
label, in this archive or in another given by its address).

It does not change the archive itself. Each operation is sent to the
archive's repository as a **request**, one commit adding
`requests/ID/request.json` (the operation and the fields of the
corresponding issue form) and the files attached, next to it. The
archive's workflow `from request` carries the request out with `osheaf`,
exactly as the issue forms and the command line do, commits the result,
and writes its answer to `requests/results/ID.json`, which the page reads.
So there is only one implementation of every operation, `osheaf`, and the
archive stays plain files that any tool can keep.

## The owner and its keys

Every version of an archive is signed by its owner (section 6 of the
specification). The manager never makes, holds or sees a key. The owner is
made on the author's computer with `osheaf`, and the archive's workflows
sign with a current key of their own, kept in the repository secret
`OPENSHEAF_SIGNING_KEY`: the *key ceremony* of the template's README. For
a repository not set up yet, the page shows the ceremony step by step (the
commands to run, a link to the repository's settings where the secret is
set, whether the secret and the folder `key-log/` are there), then sends
the setup request with the owner's key log (a zip of the folder of its
owner object: public keys only). It reads whether the secret is set when
the sign-in may (never its value), and warns when it is not.

## Passkey unlock for osheaf

A second page, `unlock.html`, not linked from the manager, serves the
command line: `osheaf key enroll` and `osheaf key unlock`
([opensheaf-py](https://github.com/opensheaf/opensheaf-py)) let a passkey,
with Touch ID, open the keys of an owner kept in a key wallet, instead of
the passphrase. `osheaf` starts a one-time listener on `127.0.0.1` and
opens <https://opensheaf.org/manager/unlock.html?mode=enroll|unlock&port=…&state=…&owner=…&salt=…[&cred=…]>.
The page checks every parameter (and that the salt is that of the owner)
and refuses anything else; says what `osheaf` asks; waits for a click
(*Create the passkey* or *Unlock*), so that a link cannot make it act
alone; then creates a passkey for `opensheaf.org` named after the owner,
or uses one of those named, and derives its secret with the WebAuthn PRF
extension. It hands the credential and the secret back by submitting a
form to `http://127.0.0.1:<port>/callback`, the only address its content
security policy lets it post to (it can reach no other server), or an
error, with which `osheaf` asks for the passphrase instead.

## Signing in

The page writes to the repository with the author's GitHub account:

- **Sign in with GitHub**, through the sign-in service
  [gh-auth](https://github.com/opensheaf/gh-auth): a GitHub App whose
  tokens reach only the repositories where the author installed it, with
  permission to read and write their contents, and expire after eight hours
  (the page renews them). The service gives tokens only to pages at
  `https://opensheaf.org`.
- Or a **fine-grained personal access token**, limited to the archive's
  repository, with the permission *Contents: read and write*. This needs no
  service, and works from a copy of the page anywhere.

The token stays in the tab (`sessionStorage`), and goes only to GitHub's
API. Only those who may write to the repository can send requests, so the
archive's workflow needs no further check.

## Files

- `index.html`, `style.css`: the page, in the design of opensheaf.org; a
  content security policy allows only GitHub's API and the sign-in service.
- `app.js`: the interface: signing in, choosing the repository, reading the
  archive (`osheaf.json`, `opensheaf.json`, the collections' heads), the
  key ceremony of a repository not set up, the forms, sending requests and
  reading their answers.
- `forms.js`: the forms, with the labels of the archive's issue forms.
- `archive.js`: what is read of an archive of specification 0.2, as plain
  functions: the lines of the discovery document by their labels, the
  folder of a line in the storage root (owner-name or hashed layout),
  members of collections and links to the Explorer.
- `github.js`: the GitHub API: reading files, and writing a request as one
  commit (blobs, a tree, a commit, the branch moved; made again on top if
  the branch moved meanwhile).
- `session.js`: the token of the session, renewed before it expires, one
  renewal at a time (a GitHub App's refresh token works only once).
- `markdown.js`: the answers' Markdown, as DOM nodes (never `innerHTML`).
- `gh-auth.js`: a copy of the client of
  [gh-auth](https://github.com/opensheaf/gh-auth) (`client/gh-auth.js`).
- `config.js`: the sign-in service, and the GitHub App's name for the link
  to install it.
- `unlock.html`, `unlock.js`: the page of passkey unlock for `osheaf`
  (above); `unlock-core.js`, its parts that need no browser: the check of
  the parameters, the WebAuthn options, the answer posted to `osheaf`.

## Working on it

No build step: plain JavaScript modules. Tests of the parts that need no
browser: `node --test tests/` (Node 20 or later). To try the page locally,
serve the folder (`python3 -m http.server 8000`) and sign in with a
personal access token (the sign-in service answers only pages at
`https://opensheaf.org`).

## Licence

GPL-3.0-or-later, as the other OpenSheaf tools (`LICENSE`). The OpenSheaf
symbol (`opensheaf-symbol.svg`) is licensed under CC BY 4.0.
