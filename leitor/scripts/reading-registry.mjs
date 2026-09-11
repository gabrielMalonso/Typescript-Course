import { readFile, readdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
const root = path.resolve(import.meta.dirname, '../..')
const readings = []
for (const chapter of (await readdir(root))
  .filter((x) => /^\d{2}-/.test(x))
  .sort()) {
  const directory = path.join(root, chapter, 'leituras')
  let files
  try {
    files = await readdir(directory)
  } catch (error) {
    if (error.code === 'ENOENT') continue
    throw error
  }
  for (const file of files.filter((x) => x.endsWith('.pdf')).sort()) {
    const base = file.slice(0, -4)
    const metadata = JSON.parse(
      await readFile(path.join(directory, base + '.json'), 'utf8'),
    )
    if (!Number.isInteger(metadata.pageCount) || metadata.pageCount < 1)
      throw new Error('Invalid page count: ' + file)
    const version = createHash('sha256')
      .update(await readFile(path.join(directory, file)))
      .digest('hex')
      .slice(0, 20)
    const slug = `${chapter}/leituras/${base}`
    readings.push({ slug, id: `${slug}@${version}`, pages: metadata.pageCount })
  }
}
const output =
  '// Generated from the reading PDFs. A changed file gets a separate annotation history.\nexport const readings = ' +
  JSON.stringify(readings, null, 2) +
  ' as const\n'
const target = path.resolve(import.meta.dirname, '../shared/readings.ts')
let previous = ''
try {
  previous = await readFile(target, 'utf8')
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}
if (previous !== output) await writeFile(target, output)
console.log(`${readings.length} readings registered`)
