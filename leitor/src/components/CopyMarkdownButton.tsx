import { useEffect, useRef, useState } from 'react'

type CopyMarkdownButtonProps = {
  content: string
}

type CopyStatus = 'idle' | 'copied' | 'error'

function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
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
      width="16"
      height="16"
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

export function CopyMarkdownButton({ content }: CopyMarkdownButtonProps) {
  const [status, setStatus] = useState<CopyStatus>('idle')
  const resetTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    setStatus('idle')
    window.clearTimeout(resetTimer.current)

    return () => window.clearTimeout(resetTimer.current)
  }, [content])

  async function handleCopy() {
    window.clearTimeout(resetTimer.current)

    try {
      await navigator.clipboard.writeText(content)
      setStatus('copied')
    } catch {
      setStatus('error')
    }

    resetTimer.current = window.setTimeout(() => setStatus('idle'), 2000)
  }

  const label =
    status === 'copied'
      ? 'Markdown copiado'
      : status === 'error'
        ? 'Não foi possível copiar'
        : 'Copiar Markdown'

  return (
    <button
      type="button"
      className={`btn ghost toolbar-btn copy-markdown-btn is-${status}`}
      onClick={handleCopy}
      aria-label={label}
      title={label}
    >
      {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
      <span className="copy-markdown-label" aria-live="polite">
        {label}
      </span>
    </button>
  )
}
