const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="rounded-t-[3rem] border-t border-steel bg-void px-6 pt-16 sm:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 pb-12 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <p className="font-grotesk text-lg font-bold uppercase tracking-tightest text-ghost">
            ROI BEIN
          </p>
          <p className="font-sans text-sm text-muted">
            Mechanical Engineering · Duke University
          </p>
        </div>

        <nav
          className="flex flex-wrap items-start gap-x-8 gap-y-3 md:justify-center"
          aria-label="Footer"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="lift-link font-mono text-xs text-muted hover:text-ghost"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-start gap-6 md:justify-end">
          <a
            href="https://www.linkedin.com/in/roi-bein/"
            target="_blank"
            rel="noreferrer"
            className="lift-link font-mono text-xs text-muted hover:text-signal"
          >
            LinkedIn
          </a>
          <a
            href="mailto:roi.bein@duke.edu"
            className="lift-link font-mono text-xs text-muted hover:text-signal"
          >
            Email
          </a>
        </div>
      </div>

      <div className="border-t border-steel">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 py-6">
          <p className="font-mono text-[0.65rem] text-muted">© 2026 Roi Bein</p>
          <p className="flex items-center gap-2.5 font-mono text-[0.65rem] tracking-widest text-muted">
            <span className="status-dot" aria-hidden="true" />
            SYSTEMS OPERATIONAL
          </p>
        </div>
      </div>
    </footer>
  );
}
