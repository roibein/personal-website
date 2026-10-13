import { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton.jsx";

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
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden"
    >
      <div className="scan-line" aria-hidden="true" />

      <div className="relative z-10 flex w-full flex-col gap-10 px-6 pb-16 pt-32 sm:px-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col items-start gap-5">
          <p
            data-hero
            className="inline-flex rounded-full border border-steel bg-void/65 px-4 py-2 font-mono text-[0.65rem] tracking-widest text-signal backdrop-blur sm:text-xs"
          >
            MECHANICAL ENGINEERING — DUKE UNIVERSITY — CLASS OF '29
          </p>

          <h1
            data-hero
            className="font-grotesk text-[clamp(3.5rem,12vw,10rem)] font-bold leading-[0.95] tracking-tightest text-ghost"
          >
            Roi Bein
          </h1>

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

        <figure
          data-hero
          className="order-first w-[min(60vw,14rem)] shrink-0 rounded-[1.75rem] bg-white p-3 shadow-2xl shadow-black/30 sm:w-64 lg:order-none lg:w-[22rem]"
        >
          <img
            src="/headshot.jpg"
            alt="Roi Bein, photographed beneath the Gothic archways of Duke University"
            className="aspect-[4/5] w-full rounded-[1.25rem] object-cover object-[50%_30%]"
          />
        </figure>
      </div>
    </section>
  );
}
