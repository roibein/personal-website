import { EMAIL, LINKEDIN_URL, RESUME_URL } from "../data/site.js";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-base font-semibold tracking-tight text-ink">
            Roi Bein
          </p>
          <p className="mt-1 text-sm text-muted">
            Mechanical Engineering · Duke University · © 2026
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href={`mailto:${EMAIL}`} className="link py-1">
            Email
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="link py-1">
            LinkedIn
          </a>
          <a href={RESUME_URL} target="_blank" rel="noreferrer" className="link py-1">
            Resume
          </a>
          <a href="#hero" className="link py-1">
            Back to top
          </a>
        </nav>
      </div>
    </footer>
  );
}
