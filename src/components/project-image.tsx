import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Shows the screenshot at `src` if it exists in /public, otherwise a clean placeholder.
 * To add a screenshot: drop the file at the path listed in src/data/projects.ts.
 */
export function ProjectImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={cn(
        'relative aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] bg-placeholder ring-1 ring-border/60 ring-inset',
        className,
      )}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            'size-full object-cover transition-all duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
      {(failed || !loaded) && (
        <div className="placeholder-grid absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/70">
          <ImageIcon className="size-6 stroke-[1.25]" />
          <span className="font-mono text-[11px] tracking-wider uppercase">Screenshot</span>
        </div>
      )}
    </div>
  )
}
