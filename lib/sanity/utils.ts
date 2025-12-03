/* eslint-disable @typescript-eslint/no-explicit-any */
export function getExcerpt(body: any[] | undefined, length = 150) {
  if (!body || !Array.isArray(body)) return ""

  return body
    .flatMap((block) => block.children?.map((child: any) => child.text) ?? [])
    .join(" ")
    .slice(0, length)
    .trim()
}
