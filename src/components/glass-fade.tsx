/** A frosted, blurred band pinned to the bottom of the viewport: content softly dissolves into it as you scroll. */
export function GlassFade() {
  return <div aria-hidden className="glass-fade pointer-events-none fixed inset-x-0 bottom-0 z-40 h-28 sm:h-36" />
}
