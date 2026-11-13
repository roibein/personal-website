import { useRef, useState } from "react";
import { Check, Copy, FileText, Linkedin, Mail, MapPin } from "lucide-react";
import { EMAIL, LINKEDIN_LABEL, LINKEDIN_URL, RESUME_URL } from "../data/site.js";

function Row({ icon: Icon, label, children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-5">
      <dt className="label flex items-center gap-3">
        <Icon size={18} aria-hidden="true" className="text-accent" />
        {label}
      </dt>
      <dd className="flex flex-wrap items-center gap-3 text-base text-ink">{children}</dd>
    </div>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked — fall back to opening the mail client.
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="section-title">
            Let's build something.
          </h2>
          <p className="section-lead">
            I'm open to internship and research opportunities in mechanical engineering,
            especially in automotive, aerospace, and medtech.
          </p>
        </div>

        <dl className="border-b border-line lg:col-span-7">
          <Row icon={Mail} label="Email">
            <a href={`mailto:${EMAIL}`} className="link">
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="btn btn-secondary min-h-[2.5rem] px-3 py-1.5"
            >
              {copied ? (
                <Check size={15} aria-hidden="true" />
              ) : (
                <Copy size={15} aria-hidden="true" />
              )}
              <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
              <span className="sr-only"> email address</span>
            </button>
          </Row>
          <Row icon={Linkedin} label="LinkedIn">
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="link">
              {LINKEDIN_LABEL}
            </a>
          </Row>
          <Row icon={FileText} label="Resume">
            <a href={RESUME_URL} target="_blank" rel="noreferrer" className="link">
              View or download (PDF)
            </a>
          </Row>
          <Row icon={MapPin} label="Location">
            Durham, NC
          </Row>
        </dl>
      </div>
    </section>
  );
}
