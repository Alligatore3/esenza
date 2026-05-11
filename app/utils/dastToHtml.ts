import type { DastNode } from '~/types/DastNode'
import { renderNode } from '~/utils/renderNode'

export const dastToHtml = (dast: unknown): string => {
  if (!dast || typeof dast !== 'object') {
    return ''
  }

  const root = (dast as { document?: DastNode }).document ?? (dast as DastNode)
  return renderNode(root)
}
