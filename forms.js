// The forms of the manager. Their labels are those of the archive's issue
// forms (.github/ISSUE_TEMPLATE in the archive template), which the
// archive's script (.github/scripts/osheaf_issue.py) reads in both cases: a
// request carries the fields by these labels. Specification 0.2: papers
// are named by their labels in the archive, members of collections by their
// sheaf: URIs (or a label, here or in the archive given).

export const LICENCES = ["CC BY 4.0 (cc-by-4.0)", "CC BY-SA 4.0 (cc-by-sa-4.0)", "CC0 1.0 (cc0-1.0)",
                         "All rights reserved"];
export const NEW_PAPER = "A new paper";
export const NEW_VERSION = "A new version of a paper in the archive";

// A field: label, type (text, textarea, select, file, files), and options:
// required, help, options (for a select; "collections", "documents",
// "members" or "versions" (of the paper chosen) are filled with the archive's), blank (a select of fixed options
// that starts with no choice, so that one must be made), placeholder, accept
// (for files).
export const FORMS = {
  setup: {
    title: "Set up the archive",
    help: "The archive's owner is made on your computer by the key ceremony (above), never in the " +
          "browser. This sets the archive up with that owner, from its key log; for a selection or a " +
          "catalogue, it also creates that collection and features it on the home page.",
    fields: [
      { label: "Name", required: true, placeholder: "Papers of Jane Doe, or A reading list on ..." },
      { label: "Purpose", type: "select", options: ["papers", "selection", "catalogue"],
        help: "Papers (yours, or a group's); a selection vets particular versions (a reading list, " +
              "a journal issue); a catalogue follows its members." },
      { label: "Description", type: "textarea", help: "For a selection or a catalogue." },
      { label: "Curator", required: true, placeholder: "Doe, Jane", help: "Your name, as Family, Given." },
      { label: "Affiliation" },
      { label: "Contact", help: "A web page or mailto: address." },
      { label: "Key log of the owner", type: "file", accept: ".zip,application/zip",
        help: "A zip of the folder key-log made by the key ceremony (ocfl/<owner>/<owner>/ of the archive " +
              "where the owner was made). Not needed if the repository has the folder key-log/ already. " +
              "It holds only public keys." },
      { label: "Owner", placeholder: "the owner name printed by osheaf init",
        help: "Optional: checked against the key log." },
      { label: "Base URL", help: "Where the site is served. Empty: the address of the repository's GitHub Pages " +
              "site if on, else https://DOMAIN/REPOSITORY/ if your OWNER.github.io site has a domain of its own, " +
              "else https://OWNER.github.io/REPOSITORY/." },
    ],
  },
  deposit: {
    title: "Deposit a paper",
    help: "A new paper, or a new version of a paper already in the archive (its label; what is left " +
          "empty stays as before). Every version is signed for the archive's owner by its workflow.",
    fields: [
      { label: "This deposit", type: "select", blank: true, required: true, options: [NEW_PAPER, NEW_VERSION],
        help: "A new paper gets a new label and a permanent name (its sheaf URI), made once; a new version keeps them." },
      { label: "Label", required: true, placeholder: "kpz-uniqueness",
        help: "The paper's label in the archive, in the address of its page (paper/LABEL/); for a new paper, " +
              "at most 32 characters, lower-case letters and digits, words joined by -. Its permanent name is its sheaf: URI; a label is only an address, best never changed." },
      { label: "Title" },
      { label: "Authors", type: "textarea", placeholder: "Doe, Jane|Example University",
        help: "One per line, Family, Given|Affiliation." },
      { label: "Abstract", type: "textarea", help: "Mathematics in $...$." },
      { label: "Keywords", help: "Separated by commas." },
      { label: "Licence", type: "select", options: [...LICENCES, "Keep as before (for a new version)"] },
      { label: "PDF of this version", type: "file", required: true, accept: ".pdf,application/pdf" },
      { label: "Sources", type: "files", help: "One zip, or the source files (then say which is the main one)." },
      { label: "Main source", help: "The main file, as a path inside the zip (e.g. paper.tex)." },
      { label: "Licence file", placeholder: "LICENSE",
        help: "Optional: the file among the sources that holds the full text or terms of the licence, as a path inside the zip; recorded as the licence of the paper's files." },
      { label: "If there are no sources, why" },
      { label: "Related identifiers", type: "textarea", placeholder: "IsIdenticalTo:arxiv:1508.07764" },
      { label: "What changed (for a new version)" },
      { label: "Date this version became public", placeholder: "YYYY-MM-DD", help: "Empty for today." },
      { label: "Date the paper first appeared", placeholder: "YYYY-MM-DD" },
      { label: "In collection", type: "select", options: "collections", optional: true,
        help: "Optional: a collection of the archive to add the paper to." },
      { label: "Position", help: "Where in that collection (1 for the first); empty for the end." },
    ],
  },
  arxiv: {
    title: "Deposit from arXiv",
    help: "A paper on arXiv, with all its versions or some of them, byte for byte. arXiv's licence lets " +
          "arXiv distribute a paper, not others: deposit it only if you are one of its authors, or if its " +
          "authors gave you permission. What you state is recorded with each version.",
    fields: [
      { label: "arXiv identifier", required: true, placeholder: "2303.18112",
        help: "The paper's identifier, or the address of its page. With a version (2303.18112v2), only that version." },
      { label: "Label", required: true, placeholder: "kpz-uniqueness",
        help: "Its label in this archive, in the address of its page: " +
              "at most 32 characters, lower-case letters and digits, words joined by -. For a paper already imported from arXiv, its label adds the new versions." },
      { label: "Versions", placeholder: "v1, v3", help: "Empty for all the versions on arXiv." },
      { label: "Right to deposit it", type: "select", blank: true, required: true,
        options: ["I am an author of the paper", "The authors gave me permission"] },
      { label: "Who agreed", type: "textarea", required: true, placeholder: "Doe, Jane",
        help: "Your name if you are an author; otherwise the authors who gave permission, one per line (Family, Given)." },
      { label: "How the permission was given", placeholder: "by e-mail, 3 May 2026",
        help: "If the authors gave permission: how and when. No e-mail addresses." },
      { label: "In collection", type: "select", options: "collections", optional: true,
        help: "Optional: a collection of the archive to add the paper to." },
      { label: "Position", help: "Where in that collection (1 for the first); empty for the end." },
    ],
  },
  notice: {
    title: "Add a notice",
    help: "A statement about a version (an erratum), kept with it; the version never changes.",
    fields: [
      { label: "Label", type: "select", options: "documents", required: true },
      { label: "Document version it is about", type: "select", options: "versions", required: true },
      { label: "Text of the notice", type: "textarea", required: true },
      { label: "Full statement (optional)", type: "file" },
    ],
  },
  withdraw: {
    title: "Withdraw a paper",
    help: "The paper's files stay in the archive; the withdrawal is shown with it.",
    fields: [
      { label: "Label", type: "select", options: "documents", required: true },
      { label: "Reason for the withdrawal", type: "textarea", required: true },
    ],
  },
  relicense: {
    title: "Give a new licence",
    fields: [
      { label: "Label", type: "select", options: "documents", required: true },
      { label: "New licence", type: "select", options: LICENCES.slice(0, 3), required: true },
      { label: "How the authors agreed", required: true, placeholder: "I am the only author" },
    ],
  },
  new_collection: {
    title: "Create a collection",
    help: "A reading list, a journal issue, the papers of a group: papers of any OpenSheaf archive, pinned by digest.",
    fields: [
      { label: "Label of the new collection", required: true, placeholder: "reading-list",
        help: "Its label in the archive, in the address of its page: at most 32 characters, lower-case letters and digits, words joined by -." },
      { label: "Title of the collection", required: true },
      { label: "Kind", type: "select", options: ["selection", "catalogue"],
        help: "A selection vets particular versions; a catalogue follows its members." },
      { label: "Description", type: "textarea" },
      { label: "Feature it on the home page", type: "select", options: ["No", "Yes"] },
      { label: "In collection", type: "select", options: "collections", optional: true,
        help: "Optional: to put it inside another collection." },
      { label: "Position" },
    ],
  },
  add: {
    title: "Add a member to a collection",
    fields: [
      { label: "In collection", type: "select", options: "collections", required: true },
      { label: "New member", required: true, placeholder: "kpz-uniqueness, or sheaf:<name>:<owner>",
        help: "A paper or a collection: its label in this archive, or its sheaf URI (shown on its page), " +
              "or its label in the archive given below." },
      { label: "Archive of the new member", placeholder: "https://mgubi.org/papers/",
        help: "For a member of another archive: the address of an archive that keeps it (the folder of its " +
              "opensheaf.json); empty for this archive, or when the sheaf URI says it (?at=)." },
      { label: "Versions you vet (selection)", placeholder: "5, 6", help: "Empty for the current version." },
      { label: "Position" },
      { label: "Why (optional)" },
    ],
  },
  vet: {
    title: "Vet a new version",
    help: "In a selection, add a later version of a member to the versions you vet.",
    fields: [
      { label: "In collection", type: "select", options: "collections", required: true },
      { label: "Member", type: "select", options: "members", required: true },
      { label: "Versions to vet", required: true, placeholder: "6" },
      { label: "Why (optional)" },
    ],
  },
  remove: {
    title: "Remove a member",
    fields: [
      { label: "In collection", type: "select", options: "collections", required: true },
      { label: "Member to remove", type: "select", options: "members", required: true },
      { label: "Why (optional)" },
    ],
  },
};

// The fields of a form as a request carries them, and the missing required
// ones. values: { label: string }; files: { label: [File-like] }.
export function check(formName, values, files = {}) {
  const form = FORMS[formName];
  const missing = form.fields.filter((f) => f.required && (
    f.type === "file" || f.type === "files" ? !(files[f.label] && files[f.label].length)
                                            : !String(values[f.label] ?? "").trim()))
    .map((f) => f.label);
  const fields = {};
  for (const f of form.fields)
    if (f.type !== "file" && f.type !== "files" && String(values[f.label] ?? "").trim())
      fields[f.label] = String(values[f.label]).trim();
  return { fields, missing };
}

// What a request is about, for the commit message: a label, a member, a name.
export function subject(formName, fields) {
  const member = fields["New member"] || fields["Member"] || fields["Member to remove"] || "";
  const short = member.startsWith("sheaf:") ? `${member.slice(0, 18)}...` : member;
  return fields["Label"] || fields["Label of the new collection"] || short || fields["Name"] || "";
}
