import type { Metadata } from 'next'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'
import '../src/styles/reader.css'
import 'highlight.js/styles/github-dark.min.css'

const title = 'Leitor de Aulas — Curso de TypeScript'
const description =
  'Aulas, exercícios e materiais do curso de TypeScript em um leitor confortável.'

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers()
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host')
  const protocol =
    requestHeaders.get('x-forwarded-proto') ?? (host?.startsWith('localhost') ? 'http' : 'https')
  const imageUrl = host ? `${protocol}://${host}/og.png` : undefined

  return {
    title,
    description,
    openGraph: imageUrl
      ? {
          title,
          description,
          images: [{ url: imageUrl, width: 1731, height: 909 }],
        }
      : undefined,
    twitter: imageUrl
      ? {
          card: 'summary_large_image',
          title,
          description,
          images: [imageUrl],
        }
      : undefined,
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
