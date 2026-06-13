import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import MagneticButton from "./MagneticButton.jsx";

const RESUME_URL = "/resume.pdf";

export default function Contact() {
  const rootRef = useRef(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("roi.bein@duke.edu");
      setToast(true);
      setTimeout(() => setToast(false), 2200);
    } catch {
      window.location.href = "mailto:roi.bein@duke.edu";
    }
  };

  const rows = [
    {
      icon: Mail,
      label: "EMAIL",
      value: "roi.bein@duke.edu",
      onClick: copyEmail,
      hint: "Click to copy",
    },
    {
      icon: Phone,
      label: "PHONE",
      value: "+1 (864) 650-7422",
      href: "tel:+18646507422",
    },
    {
      icon: Linkedin,
      label: "LINKEDIN",
      value: "linkedin.com/in/roi-bein",
      href: "https://www.linkedin.com/in/roi-bein/",
      newTab: true,
    },
    {
      icon: MapPin,
      label: "LOCATION",
      value: "Durham, NC",
    },
  ];

  return (
    <section id="contact" ref={rootRef} className="bg-void px-6 py-32 sm:px-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2
          data-contact
          className="font-display italic text-[clamp(3rem,8vw,6rem)] leading-[1.05] text-ghost"
        >
          Let's build something.
        </h2>
        <p data-contact className="mt-6 max-w-xl font-grotesk text-muted">
          Open to internship and research opportunities across mechanical
          engineering — with a particular focus on automotive, aerospace, and
          medtech.
        </p>

        <div data-contact className="mt-16 w-full text-left">
          {rows.map((row) => {
            const Icon = row.icon;
            const content = (
              <>
                <span className="flex items-center gap-4">
                  <Icon size={18} className="text-signal" aria-hidden="true" />
                  <span className="font-mono text-[0.65rem] tracking-widest text-muted">
                    {row.label}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="font-grotesk text-sm font-medium text-ghost">
                    {row.value}
                  </span>
                  {row.hint && (
                    <span className="hidden font-mono text-[0.6rem] text-muted sm:inline">
                      {row.hint}
                    </span>
                  )}
                </span>
              </>
            );
            const rowClass =
              "flex w-full items-center justify-between gap-4 border-b border-steel px-4 py-5 transition-colors duration-200 hover:bg-iron";

            if (row.onClick) {
              return (
                <button
                  key={row.label}
                  type="button"
                  onClick={row.onClick}
                  className={`${rowClass} cursor-pointer text-left`}
                >
                  {content}
                </button>
              );
            }
            if (row.href) {
              return (
                <a
                  key={row.label}
                  href={row.href}
                  target={row.newTab ? "_blank" : undefined}
                  rel={row.newTab ? "noreferrer" : undefined}
                  className={`${rowClass} cursor-pointer`}
                >
                  {content}
                </a>
              );
            }
            return (
              <div key={row.label} className={rowClass}>
                {content}
              </div>
            );
          })}
        </div>

        <div data-contact className="mt-14">
          <MagneticButton
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            variant="signal"
            className="px-10 py-4 text-base"
          >
            Download Resume
          </MagneticButton>
        </div>
      </div>

      {/* Copy toast */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-8 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-signal bg-iron px-6 py-3 font-mono text-xs text-signal transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        EMAIL COPIED TO CLIPBOARD
      </div>
    </section>
  );
}
