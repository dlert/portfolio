import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ease } from '@/lib/motion'
import { ThemeToggle } from './theme-toggle'
import { SmoothCursorToggle } from './smooth-cursor'

export function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(() => scrollY.get() > 24)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          'flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]',
          scrolled
            ? 'border border-border/70 bg-background/70 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.12)] backdrop-blur-xl'
            : 'border border-transparent',
        )}
      >
        <a href="#top" className="font-mono text-[15px] font-semibold tracking-tight">
          Oluwaferanmi<span className="text-muted-foreground">.</span>
        </a>
        <div className="flex items-center gap-6 font-mono text-[12.5px] text-muted-foreground">
          <a href="#work" className="transition-colors hover:text-foreground">
            Work
          </a>
          <a href="#writing" className="transition-colors hover:text-foreground">
            Writing
          </a>
          <a href="#contact" className="transition-colors hover:text-foreground">
            Contact
          </a>
          <SmoothCursorToggle />
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  )
}
