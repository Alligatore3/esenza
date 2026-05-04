import type { DastNode } from '~/types/DastNode'

import { renderChildren } from '~/utils/renderChildren'
import { escapeHtml } from '~/utils/escapeHtml'
import { wrapMarks } from '~/utils/wrapMarks'

export const renderNode = (node: DastNode): string => {
  if (!node || typeof node !== 'object') {
    return ''
  }

  // Leaf text node — span (or untyped node carrying a value).
  // Convert literal newlines inside a span to <br> so soft line breaks
  // authored in DatoCMS render visibly inside their parent block.
  if (typeof node.value === 'string' && (!node.type || node.type === 'span')) {
    const html = escapeHtml(node.value).replace(/\r?\n/g, '<br>')
    return wrapMarks(html, node.marks)
  }

  switch (node.type) {
    case 'paragraph':
      return `<p>${renderChildren(node.children)}</p>`
    case 'heading': {
      const level = Math.min(Math.max(node.level ?? 2, 1), 6)
      return `<h${level}>${renderChildren(node.children)}</h${level}>`
    }
    case 'list': {
      const tag = node.style === 'numbered' ? 'ol' : 'ul'
      return `<${tag}>${renderChildren(node.children)}</${tag}>`
    }
    case 'listItem':
      return `<li>${renderChildren(node.children)}</li>`
    case 'link':
      return `<a href="${escapeHtml(node.url ?? '#')}" rel="noopener" target="_blank">${renderChildren(node.children)}</a>`
    case 'blockquote':
      return `<blockquote>${renderChildren(node.children)}</blockquote>`
    case 'code':
      return `<pre><code${
        node.language ? ` class="language-${escapeHtml(node.language)}"` : ''
      }>${escapeHtml(node.code ?? '')}</code></pre>`
    case 'thematicBreak':
      return '<hr>'
    case 'root':
      return renderChildren(node.children)
    default:
      // Unknown node type — fall back to rendering its children if any.
      return renderChildren(node.children)
  }
}
