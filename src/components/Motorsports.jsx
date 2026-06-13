import { useEffect, useRef } from "react";
import gsap from "gsap";

const BG_IMG =
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2400&auto=format&fit=crop";

const STAT_PILLS = ["CAD + CFD + FEA", "20+ Team Members", "Formula SAE"];

export default function Motorsports() {
  const rootRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        "[data-moto]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden px-6 py-32 sm:px-12"
      aria-label="Duke Motorsports feature"
    >
      <img
        ref={bgRef}
        src={BG_IMG}
        alt="Macro photograph of precision engine internals"
        loading="lazy"
        className="absolute inset-0 h-[125%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-void/85" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-7">
        <p data-moto className="font-mono text-xs tracking-widest text-signal">
          DUKE MOTORSPORTS — VEHICLE DYNAMICS
        </p>
        <h2
          data-moto
          className="font-grotesk text-4xl font-bold leading-tight tracking-tightest text-ghost sm:text-6xl"
        >
          20+ Engineers. 1 Car. Zero Compromises.
        </h2>
        <p data-moto className="max-w-2xl font-sans text-muted">
          Collaborating with 20+ engineers to design, manufacture, and test a
          Formula SAE race car. Responsible for Vehicle Dynamics — designing
          and validating components using CAD, CFD, and FEA prior to
          fabrication, then machining and manufacturing parts on the CNC mill,
          lathe, and 3D printers.
        </p>
        <div data-moto className="flex flex-wrap gap-3">
          {STAT_PILLS.map((pill) => (
            <span
              key={pill}
              className="skill-pill rounded-full border border-steel bg-iron/80 px-4 py-2 font-mono text-xs text-signal backdrop-blur-sm"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
