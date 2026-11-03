// Drops anything still marked [TO ADD] so unfinished notes never reach the page.
// Removes paragraphs, list items and headings containing the marker, then any
// heading whose section is left empty.
const MARKER = '[TO ADD';

function text(node) {
  if (typeof node.value === 'string') return node.value;
  return (node.children ?? []).map(text).join('');
}

function strip(parent) {
  parent.children = parent.children.filter((node) => {
    if (!text(node).includes(MARKER)) return true;
    if (node.type === 'list' || node.type === 'blockquote') {
      strip(node);
      return node.children.length > 0;
    }
    return false;
  });
}

function dropEmptySections(root) {
  const out = [];
  const nodes = root.children;
  nodes.forEach((node, i) => {
    if (node.type === 'heading') {
      const next = nodes.slice(i + 1).find((n) => n.type !== 'thematicBreak');
      const empty = !next || (next.type === 'heading' && next.depth <= node.depth);
      if (empty) return;
    }
    out.push(node);
  });
  root.children = out;
}

export default function remarkStripTodo() {
  return (tree) => {
    strip(tree);
    dropEmptySections(tree);
  };
}
