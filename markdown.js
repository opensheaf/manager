// The little Markdown of the archive's answers (paragraphs, `code`,
// **bold**, <links>, fenced blocks), as DOM nodes: built with
// createElement and text nodes, never innerHTML, since the answers repeat
// what was typed in the forms.

export function render(text, doc = document) {
  const out = doc.createDocumentFragment();
  const blocks = String(text || "").split(/\n{2,}/);
  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i];
    if (block.startsWith("```")) {
      // a fenced block may contain blank lines: gather until the closing fence
      while (!/\n```\s*$/.test(block) && i + 1 < blocks.length) block += "\n\n" + blocks[++i];
      const pre = doc.createElement("pre");
      pre.textContent = block.replace(/^```[^\n]*\n?/, "").replace(/\n?```\s*$/, "");
      out.appendChild(pre);
      continue;
    }
    if (!block.trim()) continue;
    const p = doc.createElement("p");
    inline(block, p, doc);
    out.appendChild(p);
  }
  return out;
}

function inline(text, parent, doc) {
  const pattern = /`([^`]+)`|\*\*([^*]+)\*\*|<(https?:\/\/[^>\s]+)>/g;
  let last = 0;
  for (const m of text.matchAll(pattern)) {
    if (m.index > last) parent.appendChild(doc.createTextNode(text.slice(last, m.index)));
    if (m[1] !== undefined) {
      const code = doc.createElement("code");
      code.textContent = m[1];
      parent.appendChild(code);
    } else if (m[2] !== undefined) {
      const b = doc.createElement("strong");
      b.textContent = m[2];
      parent.appendChild(b);
    } else {
      const a = doc.createElement("a");
      a.href = m[3];
      a.textContent = m[3];
      a.rel = "noopener";
      parent.appendChild(a);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parent.appendChild(doc.createTextNode(text.slice(last)));
}
