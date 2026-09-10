import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getDocument } from '../content/catalog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { rehypeCodeTheme } from '../markdown/rehypeCodeTheme'

type MarkdownViewProps = {
  content: string
  slug: string
}

function extractText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (typeof node === 'object' && 'props' in node) {
    const props = node.props as { children?: ReactNode }
    return extractText(props.children)
  }
  return ''
}

function CopyIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function CodeBlock({ children }: { children?: ReactNode }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const text = extractText(children).replace(/\n$/, '')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="code-block">
      <button
        type="button"
        className={`code-copy-btn${copied ? ' is-copied' : ''}`}
        onClick={handleCopy}
        aria-label={copied ? 'Copiado' : 'Copiar código'}
        title={copied ? 'Copiado' : 'Copiar'}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <pre>{children}</pre>
    </div>
  )
}

export function MarkdownView({ content, slug }: MarkdownViewProps) {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    })
    return () => cancelAnimationFrame(frame)
  }, [slug, hash, content])

  function headingId(children: ReactNode, level: number) {
    const text = extractText(children)
    const number = text.match(/^(\d+)\./)?.[1]
    if (number && slug === '10-complexidade-e-big-o/README' && level === 2) return `etapa-${number}`
    if (number && slug === '10-complexidade-e-big-o/pratica/atividades' && level === 3) return `atividade-${number}`
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
  }
  return (
    <article className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeCodeTheme]}
        components={{
          h2: ({ children }) => <h2 id={headingId(children, 2)}>{children}</h2>,
          h3: ({ children }) => <h3 id={headingId(children, 3)}>{children}</h3>,
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          a: ({ href, children }) => {
            // Resolve links escritos para os arquivos Markdown na rota do leitor.
            if (href && !/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(href)) {
              const resolved = new URL(href, `https://course.local/${slug}.md`)
              const target = decodeURIComponent(resolved.pathname.slice(1)).replace(/\.(?:md|pdf)$/i, '')
              const linked = getDocument(target)
              if (linked?.kind === 'pdf') {
                return <Link className="reading-card" to={`/ler/${target}`}><strong>{children}</strong><span>Modo noturno · Abrir leitura →</span></Link>
              }
              if (linked) {
                return <Link to={`/ler/${target}${resolved.hash}`}>{children}</Link>
              }
            }
            return <a href={href}>{children}</a>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
