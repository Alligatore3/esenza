// Renders a DatoCMS Structured Text DAST node tree to an HTML string suitable
// for `v-html`. DAST = { schema, document: { type: 'root', children: [...] } }
// where each node has a `type` (paragraph, heading, list, listItem, link,
// blockquote, code, thematicBreak, span). Leaf `span` nodes carry the actual
// text in `value` plus optional `marks` (strong, emphasis, code, underline,
// strikethrough, highlight).
//
// Note: DatoCMS authors are trusted, but we still HTML-escape leaf text to
// avoid surprises if someone pastes raw HTML into the CMS.
export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
