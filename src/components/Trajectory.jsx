import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Car, Plane, HeartPulse } from "lucide-react";

const FIELDS = [
  {
    icon: Car,
    label: "AUTOMOTIVE",
    thesis: "Vehicle dynamics, validated before fabrication.",
    evidence: [
      {
        text: "Duke Motorsports — FSAE vehicle dynamics: CAD, CFD, and FEA on real components",
        href: "#work",
      },
      {
        text: "Mechanism design under load — sunflower sheller roller torque, gear iteration, and failure analysis",
        href: "#projects",
      },
    ],
    tags: ["CAD / FEA", "CFD", "Vehicle Dynamics", "DFM"],
  },
  {
    icon: Plane,
    label: "AEROSPACE",
    thesis: "Precision, tolerancing, and lightweight structures.",
    evidence: [
      {
        text: "Worst-case tolerance stack-ups — Happy Meal toy DFM, ±0.004in/part resolved to reliable joint fits",
        href: "#projects",
      },
      {
        text: "Parametric, equation-driven design — CD case rebuilds entirely from global variables",
        href: "#projects",
      },
      {
        text: "Simulation-first validation workflow carried over from Motorsports",
        href: "#work",
      },
    ],
    tags: ["Tolerance Analysis", "Parametric Modeling", "FEA", "Lightweighting"],
  },
  {
    icon: HeartPulse,
    label: "MEDTECH",
    thesis: "Human-centered devices, tested on real patients.",
    evidence: [
      {
        text: "Aquatic Knee Stabilization Device — waterproof brace iterated in real aquatic therapy",
        href: "#projects",
      },
      {
        text: "Duke Luck Biomechanics Lab — drop-tower experiments, 600+ trials analyzed in Python",
        href: "#work",
      },
      {
        text: "IEEE Sensors Journal co-authored publication; cell-culture lab work at Clemson & AEOP",
        href: "#work",
      },
    ],
    tags: ["Biomechanics", "Patient-Centered Design", "Research", "Prototyping"],
  },
];

export default function Trajectory() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-field]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="trajectory" ref={rootRef} className="px-6 py-28 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs tracking-widest text-signal">
          05 / TRAJECTORY
        </p>
        <h2 className="mt-3 font-grotesk text-4xl font-bold tracking-tightest text-ghost sm:text-5xl">
          Built for Three Fields
        </h2>
        <p className="mt-4 font-display text-xl italic text-muted">
          Where the work points next.
        </p>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {FIELDS.map((field) => {
            const Icon = field.icon;
            return (
              <div
                key={field.label}
                data-field
                className="hover-card group flex flex-col gap-6 rounded-[2rem] border border-steel bg-iron p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-steel bg-void text-signal transition-colors duration-200 group-hover:border-signal">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs tracking-widest text-muted transition-colors duration-200 group-hover:text-signal">
                    {field.label}
                  </span>
                </div>

                <p className="font-display text-xl italic leading-snug text-ghost">
                  {field.thesis}
                </p>

                <ul className="flex flex-col gap-3">
                  {field.evidence.map((item) => (
                    <li key={item.text}>
                      <a
                        href={item.href}
                        className="group/item flex gap-2.5 font-sans text-sm text-muted transition-colors duration-200 hover:text-ghost"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-steel transition-colors duration-200 group-hover/item:bg-signal" />
                        <span>{item.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {field.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-steel bg-void px-3 py-1.5 font-mono text-[0.6rem] tracking-wide text-ghost/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
