export type DastNode = {
  type?: string
  value?: string
  marks?: string[]
  level?: number
  style?: 'bulleted' | 'numbered'
  url?: string
  language?: string
  code?: string
  children?: DastNode[]
}
