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

// The originator of a line, from its genesis record (section 5.3): the
// owner it names in `originator`; an owner is its own originator.
export function originatorOf(genesis, line) {
  if (!genesis) return "";
  if (genesis.kind === "owner") return line.name;
  return typeof genesis.originator === "string" ? genesis.originator : "";
}

// A line's sheaf: URI as it is shown, in canonical form (section 12.1):
// sheaf:<name> for the originator's line, sheaf:<name>:<owner> otherwise.
// Without its originator (not read, or a line of another archive, whose
// genesis record is not fetched for this) the full form, which names the
// same line.
export function canonicalUri(o, originator = "") {
  return originator && originator === o.owner ? `sheaf:${o.name}` : `sheaf:${o.name}:${o.owner}`;
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

// Short forms (section 12.2): for people, a name or an owner name shown as
// its shortest prefix that is unique among the lines the archive lists (its
// discovery document's objects and tombstones), names among names and owner
// names among owner names, and never fewer than 8 characters. Only for what
// the page shows of the archive's own lines: files, requests, links and the
// titles of links keep the complete parts. Made once per reading of the
// archive: a line added later may make a prefix ambiguous, and the next
// reading gives a longer one.
export const SHORT_MIN = 8;

export function shortForms(discovery) {
  const names = new Set(), owners = new Set();
  for (const e of [...((discovery && discovery.objects) || []), ...((discovery && discovery.tombstones) || [])]) {
    const parts = typeof (e && e.id) === "string" ? e.id.split(":") : [];
    const name = (e && e.name) || parts[1], owner = (e && e.owner) || parts[2];
    if (name) names.add(name);
    if (owner) owners.add(owner);
  }
  const shortest = (x, among) => {
    for (let k = SHORT_MIN; k < x.length; k++) {
      const p = x.slice(0, k);
      if (![...among].some((y) => y !== x && y.startsWith(p))) return p;
    }
    return x;
  };
  const name = (n) => shortest(n, names), owner = (o) => shortest(o, owners);
  return {
    name, owner,
    // the short sheaf: URI of a line: without the owner part for the
    // originator's line (section 12.1)
    uri: (o, originator = "") => originator && originator === o.owner ? `sheaf:${name(o.name)}`
      : `sheaf:${name(o.name)}:${owner(o.owner)}`,
  };
}

// An owner as the page shows it: its label in this archive (an archive may
// label any line it lists, owners included, section 3.1), else its short
// owner name.
export function ownerShown(owner, archiveLines, short) {
  const o = (archiveLines || []).find((x) => x.kind === "owner" && x.name === owner && x.owner === owner);
  return o ? o.label : short.owner(owner);
}

// A line of another archive, shown by the first 16 characters of its name
// (a prefix unique here says nothing of other archives; section 12.2 asks
// at least 16 where a short form cannot be corrected).
export function foreignName(name) {
  return name.length > 16 ? `${name.slice(0, 16)}…` : name;
}

// --- branches (section 9) -------------------------------------------------------

const lineKey = (o) => `${o.name}:${o.owner}`;

// The papers in the order the page lists them: each line followed by its
// branches in this archive (a branch is listed under its parent line, a
// branch of a branch under that branch), by PARENTOF(line), the `parent` of
// its object.json ({ owner, name }) once read, or null. [{ line, depth }]
export function grouped(docs, parentOf) {
  const byKey = new Map(docs.map((o) => [lineKey(o), o]));
  const children = new Map(), roots = [];
  for (const o of docs) {
    const p = parentOf(o);
    const pk = p && p.name && p.owner ? lineKey(p) : null;
    if (pk && pk !== lineKey(o) && byKey.has(pk)) {
      if (!children.has(pk)) children.set(pk, []);
      children.get(pk).push(o);
    } else roots.push(o);
  }
  const out = [], seen = new Set();
  const visit = (o, depth) => {
    if (seen.has(lineKey(o))) return;
    seen.add(lineKey(o));
    out.push({ line: o, depth });
    for (const c of children.get(lineKey(o)) || []) visit(c, depth + 1);
  };
  for (const o of roots) visit(o, 0);
  for (const o of docs) visit(o, 0);   // a cycle, which no archive that verifies has
  return out;
}

// Where a new version of LINE goes when ACTING deposits it (as the core's
// carryOut decides, from what the page has read): "own", its own line;
// "branch", ACTING's branch of it (LABEL); "originator", the originator's
// own line of the work, ACTING being its originator (LABEL); "new", a new
// branch, made first; "refused", ACTING is the work's originator and its
// own line is not in this archive (an originator never owns a branch of its
// own work, section 5.3). KNOWN is false while the parents of the lines are
// not all read: the archive then decides when the change is sent.
export function continuation(line, acting, docs, parentOf, originator = "") {
  if (!acting || line.owner === acting) return { kind: "own", label: line.label, known: true };
  const known = docs.every((o) => parentOf(o) !== undefined);
  const branch = docs.find((o) => {
    const p = o.owner === acting && parentOf(o);
    return p && p.name === line.name && p.owner === line.owner;
  });
  if (branch) return { kind: "branch", label: branch.label, known: true };
  if (originator && originator === acting) {
    // up the parents to the originator's line, if this archive holds it
    let cur = line;
    for (let k = 0; k < 64 && cur; k++) {
      const p = parentOf(cur);
      if (!p) break;
      cur = docs.find((o) => o.name === p.name && o.owner === p.owner) || null;
      if (cur && cur.owner === acting) return { kind: "originator", label: cur.label, known: true };
    }
    return { kind: "refused", label: "", known };
  }
  return { kind: "new", label: "", known };
}

// The label proposed for a new branch: the line's label and the owner's
// word (its label in the archive, or its short owner name), as a label of
// section 3.1 (at most 64 characters), not taken in the archive.
export function branchLabel(label, word, taken) {
  const clean = (x) => x.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const w = clean(word) || "branch";
  const stem = `${clean(label).slice(0, 63 - w.length)}-${w}`.replace(/-+/g, "-").replace(/^-|-$/g, "");
  let out = stem;
  for (let n = 2; taken.has(out); n++) out = `${stem.slice(0, 63 - String(n).length)}-${n}`;
  return out;
}
