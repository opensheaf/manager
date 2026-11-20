// What the manager reads of an archive of specification 0.2, as plain
// functions (no DOM, no network), so that the tests can check them: the
// lines of the discovery document by their labels, the folder of a line in
// the storage root, members of collections, and links to the Explorer.

export const EXPLORER = "https://opensheaf.org/explorer/";

// The lines of the archive, from its discovery document (opensheaf.json):
// those with a label, which names them in the archive (section 3.1).
export function lines(discovery) {
  return ((discovery && discovery.objects) || []).filter((o) => o && o.label && o.name && o.owner);
}

export function sheafId(o) {
  return `sheaf:${o.name}:${o.owner}`;
}

const NAME = /^[a-z2-7]{52}$/;
const OWNER = /^[a-z2-7]{51}[aq]$/;

// The folder of a line in the storage root (section 3.2): <owner>/<name>/ in
// the owner-name layout; in the hashed layout (OCFL extension 0003, its
// default parameters) three folders of the SHA-256 of the identifier and
// the identifier percent-encoded, cut to 100 characters and followed by the
// digest. Names and owners are checked, so that a path built from the
// archive's files cannot lead elsewhere.
export async function objectPath(o, layout = "", digest = sha256hex) {
  if (!NAME.test(o.name) || !OWNER.test(o.owner)) throw new Error(`not a line: ${o.id || o.name}`);
  const id = sheafId(o);
  if (!/hash/.test(layout || "")) return `ocfl/${o.owner}/${o.name}`;
  const h = await digest(id);
  let enc = "";
  for (const c of id) {
    if (/[A-Za-z0-9_-]/.test(c)) enc += c;
    else for (const b of new TextEncoder().encode(c)) enc += "%" + b.toString(16).padStart(2, "0");
  }
  if (enc.length > 100) enc = `${enc.slice(0, 100)}-${h}`;
  return `ocfl/${h.slice(0, 3)}/${h.slice(3, 6)}/${h.slice(6, 9)}/${enc}`;
}

export async function sha256hex(text) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// A member of a collection (members.json of specification 0.2: kind, name,
// owner, at, version or revisions, cite) as the forms name it: its sheaf: URI.
export function memberUri(m) {
  return `sheaf:${m.name}:${m.owner}`;
}

// The label of a member that is a line of this archive, or "".
export function ownLabel(m, archiveLines) {
  const o = archiveLines.find((x) => x.name === m.name && x.owner === m.owner);
  return o ? o.label : "";
}

// A link to the Explorer: the archive at BASE, a line by its label there or
// by its sheaf: identifier, possibly one of its object versions (v5).
export function explorerLink(base, { line = "", kind = "document", version = "", owner = "" } = {}) {
  let hash = "";
  if (owner) hash = `#/owner/${encodeURIComponent(owner)}`;
  else if (line) {
    const page = kind === "collection" ? "collection" : "object";
    hash = `#/${page}/${encodeURIComponent(line)}${version ? `/${encodeURIComponent(version)}` : ""}`;
  }
  return `${EXPLORER}?url=${encodeURIComponent(base)}${hash}`;
}

// The Explorer's link for a member: in this archive by its label, elsewhere
// in the first archive of its `at` by its identifier.
export function memberLink(m, ownBase, archiveLines, version = "") {
  const label = ownLabel(m, archiveLines);
  const base = label ? ownBase : ((m.at && m.at[0]) || ownBase);
  return explorerLink(base, { line: label || memberUri(m), kind: m.kind, version });
}
