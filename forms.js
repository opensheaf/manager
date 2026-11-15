// The forms of the manager. Their labels are those of the archive's issue
// forms (.github/ISSUE_TEMPLATE in the archive template), which the
// archive's script reads in both cases: a request carries the fields by
// these labels.

export const LICENCES = ["CC BY 4.0 (cc-by-4.0)", "CC BY-SA 4.0 (cc-by-sa-4.0)", "CC0 1.0 (cc0-1.0)",
                         "All rights reserved"];

// A field: label, type (text, textarea, select, file, files), and options:
// required, help, options (for a select; "collections" or "documents" are
// filled with the archive's), placeholder, accept (for files).
export const FORMS = {
  setup: {
    title: "Set up the archive",
    help: "The repository was made from the archive template and is not set up yet. " +
          "This sets it up; for a selection or a catalogue, it also creates that collection " +
          "and features it on the home page.",
    fields: [
      { label: "Name", required: true, placeholder: "Papers of Jane Doe, or A reading list on ..." },
      { label: "Purpose", type: "select", options: ["papers", "selection", "catalogue"],
        help: "Papers (yours, or a group's); a selection vets particular versions (a reading list, " +
              "a journal issue); a catalogue follows its members." },
      { label: "Description", type: "textarea", help: "For a selection or a catalogue." },
      { label: "Curator", required: true, placeholder: "Doe, Jane", help: "Your name, as Family, Given." },
      { label: "Affiliation" },
      { label: "Contact", help: "A web page or mailto: address." },
      { label: "Archive identifier", help: "Empty for tag:OWNER.github.io,YEAR:REPOSITORY." },
      { label: "Base URL", help: "Empty for the repository's GitHub Pages address; give it if your Pages use your own domain." },
    ],
  },
  deposit: {
    title: "Deposit a paper",
    help: "A new paper, or a new version of a paper already in the archive (the same identifier; " +
          "what is left empty stays as before).",
    fields: [
      { label: "Identifier", required: true, placeholder: "kpz-uniqueness",
        help: "Permanent, in the paper's address: at most 32 characters, lower-case letters and digits, words joined by -." },
      { label: "Title" },
      { label: "Authors", type: "textarea", placeholder: "Doe, Jane|Example University",
        help: "One per line, Family, Given|Affiliation." },
      { label: "Abstract", type: "textarea", help: "Mathematics in $...$." },
      { label: "Keywords", help: "Separated by commas." },
      { label: "Licence", type: "select", options: [...LICENCES, "Keep as before (for a new version)"] },
      { label: "PDF of this version", type: "file", required: true, accept: ".pdf,application/pdf" },
      { label: "Sources", type: "files", help: "One zip, or the source files (then say which is the main one)." },
      { label: "Main source", help: "The main file, as a path inside the zip (e.g. paper.tex)." },
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
  notice: {
    title: "Add a notice",
    help: "A statement about a version (an erratum), kept with it; the version never changes.",
    fields: [
      { label: "Identifier", type: "select", options: "documents", required: true },
      { label: "Document version it is about", required: true, placeholder: "1" },
      { label: "Text of the notice", type: "textarea", required: true },
      { label: "Full statement (optional)", type: "file" },
    ],
  },
  withdraw: {
    title: "Withdraw a paper",
    help: "The paper's files stay in the archive; the withdrawal is shown with it.",
    fields: [
      { label: "Identifier", type: "select", options: "documents", required: true },
      { label: "Reason for the withdrawal", type: "textarea", required: true },
    ],
  },
  relicense: {
    title: "Give a new licence",
    fields: [
      { label: "Identifier", type: "select", options: "documents", required: true },
      { label: "New licence", type: "select", options: LICENCES.slice(0, 3), required: true },
      { label: "How the authors agreed", required: true, placeholder: "I am the only author" },
    ],
  },
  new_collection: {
    title: "Create a collection",
    help: "A reading list, a journal issue, the papers of a group: papers of any OpenSheaf archive, pinned by digest.",
    fields: [
      { label: "Identifier of the new collection", required: true, placeholder: "reading-list" },
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
      { label: "Archive of the new member", required: true, placeholder: "https://mgubi.org/papers/",
        help: "The address of the archive that keeps it (this one included)." },
      { label: "Identifier of the new member", required: true },
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

// The object a request is about, for the commit message.
export function subject(formName, fields) {
  return fields["Identifier"] || fields["Identifier of the new collection"] ||
         fields["Identifier of the new member"] || fields["Member"] || fields["Member to remove"] ||
         fields["Name"] || "";
}
