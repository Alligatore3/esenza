import { MARK_TAGS } from '~/constants/MARK_TAGS'

export const wrapMarks = (text: string, marks: string[] | undefined): string => {
  if (!marks?.length) {
    return text
  }

  return marks.reduce((acc, mark) => {
    const tag = MARK_TAGS[mark]
    return tag ? `<${tag}>${acc}</${tag}>` : acc
  }, text)
}
