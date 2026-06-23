import { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton.jsx";

const HERO_IMG =
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2400&auto=format&fit=crop";

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero]",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex h-[100dvh] flex-col justify-end overflow-hidden"
    >
      <img
        src={HERO_IMG}
        alt="Formula race car cornering on a circuit at speed"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, var(--void) 30%, transparent 100%)",
        }}
      />
      <div className="scan-line" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-start gap-5 px-6 pb-16 sm:pl-12">
        <p
          data-hero
          className="font-mono text-[0.65rem] tracking-widest text-signal sm:text-xs"
        >
          MECHANICAL ENGINEERING — DUKE UNIVERSITY — CLASS OF '29
        </p>

        <h1 className="flex flex-col">
          <span
            data-hero
            className="font-grotesk text-[clamp(1.5rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tightest text-ghost"
          >
            Engineering at the
          </span>
          <span
            data-hero
            className="font-display italic text-[clamp(3.5rem,12vw,10rem)] leading-[0.95] text-ghost"
          >
            Intersection.
          </span>
        </h1>

        <p data-hero className="font-sans text-base font-normal text-muted">
          Automotive · Aerospace · MedTech
        </p>

        <span
          data-hero
          className="inline-flex items-center gap-2.5 rounded-full border border-steel bg-void/40 px-4 py-2 font-mono text-[0.6rem] tracking-widest text-ghost/90 backdrop-blur sm:text-[0.65rem]"
        >
          <span className="status-dot" aria-hidden="true" />
          OPEN TO INTERNSHIPS — AVAILABLE ANYWHERE
        </span>

        <div data-hero className="mt-3 flex flex-wrap gap-4">
          <MagneticButton href="#projects" variant="signal">
            See My Work
          </MagneticButton>
          <MagneticButton
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            variant="ghost"
          >
            View Resume
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get In Touch
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
