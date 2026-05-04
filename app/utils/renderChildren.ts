import type { DastNode } from '~/types/DastNode'

export const renderChildren = (children: DastNode[] | undefined): string =>
  (children ?? []).map(renderNode).join('')
