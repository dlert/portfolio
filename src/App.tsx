import { MotionConfig } from 'motion/react'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Stack } from '@/components/stack'
import { Experience } from '@/components/experience'
import { Work } from '@/components/work'
import { Story } from '@/components/story'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { GlassFade } from '@/components/glass-fade'
import { SmoothCursor } from '@/components/smooth-cursor'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <About />
        <Stack />
        <Experience />
        <Work />
        <Story />
        <Contact />
      </main>
      <Footer />
      <GlassFade />
      <SmoothCursor />
    </MotionConfig>
  )
}
