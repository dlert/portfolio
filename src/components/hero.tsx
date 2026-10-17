import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowDown, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ease } from '@/lib/motion'

const headline = ['Hi,', 'I’m', 'Adeniyi', 'Oluwaferanmi.']

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Apple-style exit: the hero gently recedes as you scroll past it
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96])

  return (
    <section id="top" ref={ref} className="relative flex min-h-[calc(100svh/var(--page-zoom))] items-center px-6">
      <motion.div style={{ y, opacity, scale }} className="mx-auto w-full max-w-5xl">
        <h1 className="font-mono text-[clamp(2.5rem,8vw,6.75rem)] leading-[1] font-semibold tracking-[-0.06em]">
          {headline.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden pr-[0.22em] pb-[0.08em] align-bottom">
              <motion.span
                className={i >= 2 ? 'inline-block' : 'inline-block text-muted-foreground'}
                initial={{ y: '105%', opacity: 0, filter: 'blur(10px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.1, ease, delay: 0.2 + i * 0.09 }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease, delay: 0.75 }}
          className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[clamp(0.95rem,1.9vw,1.2rem)] tracking-tight text-muted-foreground"
        >
          <span>BSc Computer Science</span>
          <span aria-hidden className="size-1 rounded-full bg-muted-foreground/50" />
          <span>Founder, Ferdar Limited</span>
          <span aria-hidden className="size-1 rounded-full bg-muted-foreground/50" />
          <span className="text-foreground">Web Developer</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.95 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          <Button asChild size="lg" className="group">
            <a href="#work">
              See my work
              <ArrowDown className="size-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0.5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="group">
            <a href="/Adeniyi-Oluwaferanmi-CV.pdf" download="Adeniyi Oluwaferanmi CV.pdf">
              Download CV
              <Download className="size-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0.5" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
