import { useEffect, useState } from "react";
import { Menu, X, Linkedin } from "lucide-react";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const RESUME_URL = "/resume.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/in/roi-bein/";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Scroll-spy: highlight the nav link for whichever section is centered.
  useEffect(() => {
    const sections = LINKS.map((l) =>
      document.getElementById(l.href.slice(1))
    ).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed left-1/2 top-5 z-50 flex w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
          scrolled
            ? "border border-steel bg-void/70 backdrop-blur-2xl"
            : "border border-steel/50 bg-void/40 backdrop-blur-xl"
        }`}
      >
        <a
          href="#hero"
          className="lift-link font-grotesk text-sm font-bold uppercase tracking-tightest text-ghost"
        >
          ROI&nbsp;BEIN
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`lift-link font-grotesk text-sm font-medium transition-colors ${
                  isActive ? "text-signal" : "text-ghost/80 hover:text-ghost"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="lift-link hidden text-ghost/80 hover:text-signal md:inline-flex"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="magnetic-btn hidden rounded-full bg-signal px-5 py-2 font-grotesk text-xs font-bold uppercase tracking-wide text-void md:inline-block"
          >
            View Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-ghost md:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-void/95 backdrop-blur-2xl transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-7">
          <span className="font-grotesk text-sm font-bold uppercase tracking-tightest text-ghost">
            ROI BEIN
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-ghost"
            aria-label="Close menu"
          >
            <X size={26} />
          </button>
        </div>
        <nav
          className="flex flex-1 flex-col items-start justify-center gap-8 px-8"
          aria-label="Mobile"
        >
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 font-grotesk text-4xl font-bold tracking-tightest text-ghost"
            >
              <span className="font-mono text-sm text-signal">
                0{i + 1}
              </span>
              {link.label}
            </a>
          ))}
          <div className="mt-6 flex items-center gap-4">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-signal px-7 py-3.5 font-grotesk text-sm font-bold uppercase tracking-wide text-void"
            >
              View Resume
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              aria-label="LinkedIn profile"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-steel text-ghost hover:border-signal hover:text-signal"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
