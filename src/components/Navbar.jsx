import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";
import { EMAIL, LINKEDIN_URL, NAV_LINKS, RESUME_URL } from "../data/site.js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const menuButtonRef = useRef(null);

  // Hairline under the header once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: mark the nav link for whichever section crosses mid-screen.
  useEffect(() => {
    // "hero" and "off-the-clock" have no nav link; observing them clears the
    // highlight instead of leaving the previous section marked.
    const ids = ["hero", "off-the-clock", ...NAV_LINKS.map((link) => link.href.slice(1))];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: lock page scroll, close on Escape and return focus.
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-paper/90 backdrop-blur transition-colors duration-200 ${
        scrolled || open ? "border-line" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <a
          href="#hero"
          onClick={() => setOpen(false)}
          className="font-display text-base font-semibold tracking-tight text-ink"
        >
          Roi Bein
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                className={`border-b-2 py-1 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "border-accent text-ink"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary hidden min-h-[2.5rem] px-4 py-2 md:inline-flex"
          >
            Resume
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink md:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          // Positioned against the header: its backdrop-filter makes it the
          // containing block, so `fixed` would not reach the viewport bottom.
          className="absolute inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper md:hidden"
        >
          <nav className="container-page flex flex-col py-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-display text-2xl font-semibold tracking-tight text-ink"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Resume (PDF)
              </a>
              <a href={`mailto:${EMAIL}`} className="btn btn-secondary">
                {EMAIL}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                LinkedIn
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
