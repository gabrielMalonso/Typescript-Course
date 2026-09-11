/** PDF fragments count pages within the extracted file, starting at one. */
export function pdfPageFromHash(hash: string, pageCount: number): number {
  const value = /^#page=(\d+)$/.exec(hash)?.[1]
  const page = value ? Number(value) : 1
  return Number.isSafeInteger(page) && page >= 1 && page <= pageCount ? page : 1
}

export function pdfPagesBeforeTargetSettled(page: number, settled: ReadonlySet<number>): boolean {
  for (let n = 1; n <= page; n++) if (!settled.has(n)) return false
  return true
}
