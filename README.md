# OpenSheaf Manager

> [!WARNING]
> **Draft.** OpenSheaf 0.2 is a draft specification. Until version 1.0, any
> revision may change the format in incompatible ways, and the tools follow
> the latest draft.

A page for keeping an [OpenSheaf](https://opensheaf.org) archive from the
browser, at <https://manager.opensheaf.org/>. It works with archives made
from the [archive template](https://github.com/opensheaf/archive-template),
specification 0.2: set the archive up, deposit papers and new versions
(also from arXiv, by their authors or with their permission), give notices
and new licences, withdraw, create collections (reading lists, journal
issues) and add, vet and remove their members. Papers are named by their
labels in the archive; members of collections by their `sheaf:` URIs (or a
label, in this archive or in another given by its address).

## Writing directly

Each operation is carried out **in the page**, by
[opensheaf-js](https://github.com/opensheaf/opensheaf-js) (the JavaScript
port of `osheaf`), exactly as the archive's workflow carries it out with
opensheaf-py: the same fields, checks, commands, files and messages (the
tests of opensheaf-js compare the two). The page reads the archive at the
head of its branch through GitHub's API, carries the operation out in
memory, signs the new versions with the owner's current keys, and writes
the result as **one commit** (blobs, a tree, a commit, the branch moved,
never forced; if the branch moved meanwhile, the operation is carried out
again on the new head). No workflow runs for it; GitHub Pages then
publishes the commit, as for any push. A notice takes about 10 seconds to
commit and a new paper about 20, then Pages about 25; a request to the
workflow took about 25 seconds, then Pages.

The archive's site is written by the operation itself (the archive's
templates, as `osheaf index` writes them), in the same commit: no workflow
of the archive is needed to present it. The template's `verify` workflow
still checks every push.

**The keys.** The owner's current keys are those of its key wallet, a
private GitHub repository where `osheaf key push --wallet
github:OWNER/REPOSITORY` put them, each locked with the passphrase and the
owner's passkeys (`osheaf key enroll`). The wallet is the first that
the archive's `osheaf.json` hints for the owner (`"keys": {"<owner>":
{"wallets": [...]}}`, or the earlier `"keys": {"wallet": ...}` for every
owner), or else the one given in the page (kept in this browser: a name,
not a secret). Wallets and owners are many to many (a wallet may hold the
keys of several owners, several people may share an owner's keys, each
with a passkey of their own, and an owner's keys may be in several
wallets); choosing a wallet, then the owners to unlock in it, is the
next step of the page. The passkeys belong to
<https://unlock.opensheaf.org/>, which no other page can ask; the page
opens it in a **popup** ("Unlock with your passkey", or the first change
sent): the popup asks for the passkey (Touch ID), seals its secret to a
one-time key of this page, exactly as for `osheaf key unlock`, and sends
it back by a window message, to this page's origin only; you type here the
code of six digits the popup shows, and the page opens the seal with it,
then the keys. The keys are kept in the page's memory only, as WebCrypto
keys that cannot be exported, until the page is closed or locked ("Lock");
they are never written to the browser's storage. The GitHub sign-in must
be able to read the wallet: install the OpenSheaf app on the wallet's
repository too (the page only reads it, except to set it up, below).

**Setting up a wallet from the page.** An owner whose current key is on
one computer only, in `osheaf`'s key store, sets up the wallet under
"Write directly", "Set up a key wallet", while the keys are locked (the
wallet named next to "Unlock with your passkey" is checked in the
background when the archive opens: once it holds enough of the owner's
current keys and a passkey opens them, the panel is folded as "The key
wallet: ready (manage)"; once the keys are unlocked, it is not shown):

1. *The wallet*: a private repository of the person's, never the
   archive's (a link opens GitHub's page to create it, filled in:
   `owner`, `name=opensheaf-keys`, `visibility=private`, `description`,
   the query parameters GitHub documents), added to the repositories of
   the OpenSheaf app (a link to the installation's settings, which GitHub
   gives the page, or to install the app). The page checks that the
   repository is private, not the archive's, and that the sign-in can read
   and write it; `osheaf key push` refuses a public repository too. Once
   the wallet holds keys of the owner, and the archive's `osheaf.json`
   hints no wallet for it, the page records it there, in a commit, as a
   hint for the owner (as `osheaf key push --wallet` does), and says so.
2. *The current key*: the person picks the key file of `osheaf`'s key
   store (`~/.config/opensheaf/keys/OWNER/K.key`, one line, the seed in
   base64) or pastes it, or the text of `osheaf key export --stdout` when
   the key is in the system's credential store. The page checks that it is
   a current key of the owner's key log, asks the passphrase (twice, or
   once when the wallet holds keys of the owner already, and checks it
   against them), locks the key as `osheaf key push` does (the same file
   `OWNER/K.key.enc`, the same commit message) and commits it with the
   contents API; the seed is wiped once it is locked. A key already there
   is left as it is.

   Or, when the key is not at hand, *a new key made here* ("Create a new
   key here"): the page makes a new current key and the next version of
   the owner's key log, which adds it to the current keys (the others and
   the threshold kept) and commits new rotation keys, as `osheaf owner
   rotate --add DID` makes it, the same bytes; it is signed by the
   rotation keys of the latest version that the person gives:
   - as files (`rotation-OWNER-K.txt`, as `osheaf init --export` or
     `osheaf owner rotate --export` wrote them, locked with the passphrase
     or in clear, or a typed sheet; with another passphrase than the
     wallet's, said by a tick): the new rotation keys are then given
     back as files of the same names and text, locked with the passphrase,
     saved as one zip (`rotation-keys-OWNER16-vN.zip`, the files at its top
     level, to unpack onto the offline media: a browser downloads one file
     per click) or one by one, and as the printable sheets of `--print`; the
     version is committed only once the check of each file is typed back,
     as `osheaf owner rotate --export` asks;
   - or from the wallet, when it keeps the owner's rotation keys (the
     security level `--keys github:OWNER/REPO`; offered only then): they
     are opened with the passphrase, and the new ones are put there,
     locked with it, before the version is committed, as `osheaf owner
     rotate --keys` does.

   The version is made on the head of the archive's branch, verified and
   committed as one commit (with `opensheaf.json` and the indexes, as
   `osheaf owner rotate` writes them); the new key is then put in the
   wallet as above. If that fails, the key stays in the page's memory, to
   put again. The keys are in memory only, never in the browser's
   storage, and their seeds are wiped once used. The rotation keys pass
   through the page's memory, as through `osheaf`'s on a computer: the
   maximum security level keeps them offline, used by `osheaf` alone.
3. *The passkey*: as `osheaf key enroll`, every key of the owner in the
   wallet is opened with the passphrase first; then the popup of
   unlock.opensheaf.org, in the mode `popup-enroll`, creates a passkey for
   `unlock.opensheaf.org` (excluding those the owner has) and seals its
   secret to the page exactly as for `osheaf` (the mode in the
   authenticated data); or, when a passkey of the owner opens some keys
   already, the popup unlocks with it, as `osheaf key enroll` without
   `--new-passkey` does. Each key gets one more lock, written and read
   back.

"Unlock with your passkey" then works as above, and `osheaf key pull` and
`osheaf key unlock` take the same files.

## Requests to the workflow

The other way, kept for archives whose owners have no wallet or no
passkey, and for the setup and the imports from arXiv (arXiv cannot be
read from a page): tick "Send the changes to the archive's workflow
instead". Each operation is then sent to the archive's repository as a
**request**, one commit adding `requests/ID/request.json` (the operation
and the fields of the corresponding issue form) and the files attached,
next to it. The archive's workflow `from request` carries the request out
with `osheaf`, exactly as the issue forms and the command line do,
commits the result, and writes its answer to `requests/results/ID.json`,
which the page reads.

## The owner and its keys

Every version of a line is signed by the line's owner (section 6 of the
specification); an archive hosts owners, and the `owner` of its
`osheaf.json` is the default owner of its tools, which signs the papers
and collections deposited there unless another is chosen (the page shows
it as "Default owner"). Its current keys sign, and its rotation keys, two of
three, sign any change of the current keys. The archive's workflows sign
with a current key of their own, kept in the repository secret
`OPENSHEAF_SIGNING_KEY`.

**A new archive, set up from the page.** A repository made from the
[archive template](https://github.com/new?template_owner=opensheaf&template_name=archive-template)
and not set up yet opens on "Create the owner and set up the archive
here": the archive's fields (those of the template's setup: name,
purpose, description, curator, affiliation, contact, base URL, empty for
the address the setup finds), a label for the owner in the archive (optional: shown instead
of its name, written in the discovery document as `osheaf` keeps labels;
the archive's, not signed by the owner), the owner's keeper (optional: an ORCID iD
or `https://DOMAIN/`), the key wallet (a private repository, checked as
above), the security level of the rotation keys, whether the archive's
workflow signs too (ticked by default), and a passphrase, twice. The page
then makes, in its memory only:

- the owner's current key, which signs in the page;
- the current key of the workflows (if ticked);
- three rotation keys, two of which sign the next version of the key log;
- the first version of the owner's key log, with both current keys and
  threshold 1, byte for byte what `osheaf init --new-owner --key DID`
  makes for the same keys and time.

At the offline level (the maximum), the rotation keys are given as the
files of `osheaf init --export`, locked with the passphrase (one zip, or
one by one) and as printable sheets, and nothing is committed until the
check of each is typed back. At the wallet level (`osheaf init --keys`),
they are put in the wallet, locked with the passphrase, before anything
is committed. Then, in order, each step said as it goes and tried again
where it stopped, the keys kept in memory meanwhile (leaving the page asks
first):

1. the archive set up as the template's setup sets it up (`osheaf init`
   with that owner; the key wallet recorded in `osheaf.json` as a hint for
   the owner, the setup's field "Key wallet"; for a selection or a
   catalogue, its collection created and featured on the home page),
   verified, one commit;
2. the labels of the issue forms, if the sign-in may create labels
   (*Issues: read and write*; the App does not ask for it: the workflow
   "Set up the archive", run once, creates them);
3. the owner's current key in the wallet, as `osheaf key push` puts it;
4. the workflows' key as the repository secret `OPENSHEAF_SIGNING_KEY`,
   sealed to the repository's public key (libsodium's sealed box) and
   stored through GitHub's API, if the sign-in may (*Secrets: read and
   write*, and an administrator of the repository); otherwise it is shown
   once, with a Copy button and a link to the repository's secrets, and
   forgotten when the person goes on;
5. the passkey, as in step 3 of the wallet's setup (or later);
6. GitHub Pages turned on (branch `main`, its root), if the sign-in may
   (*Pages: write*); otherwise a link to Settings, Pages.

The archive then opens with the owner's key unlocked: changes are written
directly. The seeds are wiped once used; nothing is kept in the browser's
storage but the wallet's name.

**Or on a computer: the key ceremony.** Folded under the form, the page
shows the *key ceremony* of the template's README step by step (the
commands to run, a link to the repository's settings where the secret is
set, whether the secret and the folder `key-log/` are there), then sends
the setup request with the owner's key log (a zip of the folder of its
owner object: public keys only) to the archive's workflow. The rotation
keys then never pass through a browser. The page reads whether the secret
is set when the sign-in may (never its value), and warns when it is not.

## Passkey unlock for osheaf

The passkey unlock page of `osheaf key enroll` and `osheaf key unlock` was
here, at `unlock.html`, and made passkeys for `opensheaf.org`. It moved to
an origin of its own, <https://unlock.opensheaf.org/> (repository
[opensheaf/unlock](https://github.com/opensheaf/unlock)), whose passkeys
are for `unlock.opensheaf.org`. `unlock.html` here only says so, runs no
script, and tells the user of an older `osheaf` to update it.

## Its own origin

The page is served at `https://manager.opensheaf.org` (the file `CNAME`;
GitHub Pages redirects `https://opensheaf.org/manager/` there). An origin
of its own keeps the page apart from the other pages of the project's
sites, the archives and collections served under `https://opensheaf.org/`
among them: only this origin receives tokens from the sign-in service,
and only it may open the passkey's popup (`POPUP_OPENERS` of the unlock
page). Its fonts are those of opensheaf.org, which serves them to any
origin.

## Signing in

The page writes to the repository with the author's GitHub account:

- **Sign in with GitHub**, through the sign-in service
  [gh-auth](https://github.com/opensheaf/gh-auth): a GitHub App whose
  tokens reach only the repositories where the author installed it, with
  permission to read and write their contents, and expire after eight hours
  (the page renews them). The service gives tokens only to pages at
  `https://manager.opensheaf.org`.
- Or a **fine-grained personal access token**, limited to the archive's
  repository, with the permission *Contents: read and write*. This needs no
  service, and works from a copy of the page anywhere.

Setting up a new archive also uses, when the sign-in has them, the
permissions *Secrets: read and write* (the workflows' key stored as the
repository's secret), *Issues: read and write* (the labels of the issue
forms) and *Pages: read and write* (GitHub Pages turned on); without
them, the page says what to do by hand. GitHub lets only an administrator
of the repository set its secrets or Pages.

The token stays in the tab (`sessionStorage`), and goes only to GitHub's
API. Only those who may write to the repository can commit to it or send
requests, so the archive's workflow needs no further check. A personal
access token limited to the archive's repository cannot read the key
wallet: give it the wallet's repository too (Contents: read).

## Files

- `index.html`, `style.css`: the page, in the design of opensheaf.org; its
  content security policy allows scripts of the page only (and
  WebAssembly, for the digests and key derivations of opensheaf-js), and
  connections over https only: GitHub's API, the sign-in service, the
  archive's own site (a faster copy of its files, each checked against
  its git name), and the other archives whose papers a collection holds.
- `app.js`: the interface: signing in, choosing the repository, showing
  the archive, the setup of a repository not set up (the owner made in the
  page, or the key ceremony), the forms,
  sending requests and reading their answers; messages float at the top
  right (a success for a few seconds, a refusal until closed), and the
  Activity bar at the bottom says how the website and the requests are, and
  opens on the Changes and the history of messages. The Changes are the
  requests waiting, then the archive's recent commits (`changes.js`), read
  afresh from the head of its branch whenever the panel opens and after
  each change: each with its time, its subject, a link to it on GitHub,
  and how it was made: signed in this page (its subject names the
  manager, "(the OpenSheaf manager)"), by the archive's workflow (by
  `github-actions[bot]`), a request sent from this page, or pushed. A
  commit of the workflow that answers a request has the answer folded
  under it (`requests/results/ID.json` at that commit), with "Correct and
  send again" for a request refused.
- `changes.js`: the archive's recent commits, and how each was made.
- `load.js`: reading the archive (`osheaf.json`, `opensheaf.json`, the
  collections' heads), where the site of a repository not set up will be
  served (as the template's setup finds it), and waiting for the answer to
  a request, after which the archive is read again at the commit that holds
  the answer (GitHub may serve the branch's files from before a push for a
  while), so that the change shows at once.
- `forms.js`: the forms, with the labels of the archive's issue forms.
- `direct.js`: writing directly: the popup of the passkey, the keys of
  the wallet, setting the wallet up, a new archive and its owner made in
  the page, and an operation carried out and committed.
- `zip.js`: a zip of text files, stored, for the rotation-key files saved
  at once.
- `pages.js`: after each commit, whether GitHub Pages has published the
  website yet: one file the commit wrote is fetched from the site until it
  is served as committed (the App cannot read Actions, so the site itself
  is watched).
- `vendor/opensheaf-manager.js`: opensheaf-js's `web/manager.js`, bundled
  (`deno task bundle` in opensheaf-js), with the JSON Schemas and the
  default templates of the website; its first line names the commit of
  opensheaf-js it was made from.
- `tools/live-test.mjs`: a test of writing directly against a real
  repository, from Node, with the page's own code; the key comes from a
  key file instead of the passkey. For throwaway archives.
- `archive.js`: what is read of an archive of specification 0.2, as plain
  functions: the lines of the discovery document by their labels, the
  folder of a line in the storage root (owner-name or hashed layout),
  members of collections, `sheaf:` URIs in canonical form (no owner part
  for the originator's line, read from its genesis record; the full form
  for a line whose originator is not known) and links to the Explorer;
  the short forms the page shows (section 12.2): an owner by its label in
  the archive if it has one, names and owner names by their shortest
  prefix unique among the lines the archive lists (objects and
  tombstones), never fewer than 8 characters, computed at each reading;
  a line of another archive by the first 16 characters of its name. Full
  forms stay in the titles of links, in links, and in what is written.
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
- `unlock.html`: where the passkey unlock page was; it says that it moved
  (above).

## Working on it

No build step: plain JavaScript modules, and the bundle of opensheaf-js in
`vendor/`, copied from opensheaf-js (`deno task bundle`, then `cp
dist/opensheaf-manager.js` here) when it changes. Tests of the parts that
need no browser: `node --test tests/` (Node 22 or later); the popup is
tested against doubles of the windows. To try the page locally, serve the
folder (`python3 -m http.server 8000`) and sign in with a personal access
token (the sign-in service answers only pages at
`https://manager.opensheaf.org`); the passkey's popup answers only that
origin too, so that writing directly is tried on the published page, or
with `tools/live-test.mjs`:

    GH_TOKEN=... node tools/live-test.mjs --repo OWNER/REPO --key KEYFILE \
      --operation notice --fields '{"Label": "x", "Document version it is about": "1", "Text of the notice": "..."}'

## Licence

GPL-3.0-or-later, as the other OpenSheaf tools (`LICENSE`). The OpenSheaf
symbol (`opensheaf-symbol.svg`) is licensed under CC BY 4.0.
