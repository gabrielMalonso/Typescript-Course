import { resolve } from 'node:path'
import { buildWeb } from 'typescript-pad/build-web.mjs'

await buildWeb({ outDir: resolve('public/pad'), envDir: process.cwd() })
