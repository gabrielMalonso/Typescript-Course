import path from 'node:path'
import vinext from 'vinext'
import { defineConfig } from 'vite'
import hostingConfig from './.openai/hosting.json' with { type: 'json' }
import { sites } from './build/sites-vite-plugin.ts'
import { embedpdfHighlight } from './build/embedpdf-highlight.ts'

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID = '00000000-0000-4000-8000-000000000000'
const { d1, r2 } = hostingConfig

const localBindingConfig = {
  main: './worker/index.ts',
  compatibility_flags: ['nodejs_compat'],
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: 'site-creator-d1',
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: 'site-creator-r2',
        },
      ]
    : [],
}

export default defineConfig(async ({ command }) => {
  process.env.WRANGLER_WRITE_LOGS ??= 'false'
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs'
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry'

  const { cloudflare } = await import('@cloudflare/vite-plugin')

  return {
    // Keep the snippet out of dev prebundling so its compatibility fix also runs there.
    optimizeDeps: { exclude: ['@embedpdf/snippet'] },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@course': path.resolve(__dirname, '..'),
      },
    },
    server: {
      host: true,
      fs: {
        allow: [path.resolve(__dirname, '..')],
      },
    },
    plugins: [
      embedpdfHighlight(),
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
        config: { ...localBindingConfig, assets: { run_worker_first: command === 'build' } },
      }),
    ],
  }
})
