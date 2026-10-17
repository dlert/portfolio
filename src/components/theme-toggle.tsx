import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

const media = window.matchMedia('(prefers-color-scheme: dark)')

/** The theme actually on screen: the saved choice (set on <html> by index.html), else the system setting. */
function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme
  if (set === 'light' || set === 'dark') return set
  return media.matches ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  // Keep the icon in sync with system changes while no theme has been picked.
  useEffect(() => {
    const onChange = () => setTheme(currentTheme())
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    root.classList.add('theme-transition')
    root.dataset.theme = next
    window.setTimeout(() => root.classList.remove('theme-transition'), 450)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage blocked: the choice still applies for this visit.
    }
    setTheme(next)
  }

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative flex size-4 items-center justify-center transition-colors hover:text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
