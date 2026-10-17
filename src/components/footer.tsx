const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="px-6 pb-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 border-t pt-8 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} Adeniyi Oluwaferanmi · Ferdar Limited</span>
        <div className="flex items-center gap-6 font-mono text-[12px]">
          <span>Ibadan, Nigeria</span>
          <a href="mailto:ferdar4444@gmail.com" className="transition-colors hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
