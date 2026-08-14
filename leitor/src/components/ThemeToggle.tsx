import { useTheme } from '../theme/ThemeProvider'

type ThemeToggleProps = {
  className?: string
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={`btn ghost theme-toggle ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isDark ? 'Modo claro' : 'Modo escuro'}
    >
      <span className="theme-toggle-icon" aria-hidden>
        {isDark ? '☀' : '☾'}
      </span>
    </button>
  )
}
