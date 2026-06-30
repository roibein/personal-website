import { useEffect, useRef } from "react";
import gsap from "gsap";

const CATEGORIES = [
  {
    label: "CAD & SIMULATION",
    skills: ["SolidWorks", "Onshape", "CFD", "FEA"],
  },
  {
    label: "MANUFACTURING",
    skills: ["CNC Mill", "Lathe", "Waterjet", "Laser Cutter", "3D Printing", "ShopBot"],
  },
  {
    label: "PROGRAMMING",
    skills: ["Python", "JavaScript", "Java", "SwiftUI", "Arduino"],
  },
  {
    label: "RESEARCH METHODS",
    skills: [
      "Load Cell Instrumentation",
      "Drop Tower",
      "Flow Cytometry",
      "ML Model Training",
    ],
  },
  {
    label: "SOFTWARE",
    skills: ["FastAPI", "Photoshop", "Microsoft Office"],
  },
  {
    label: "LANGUAGES",
    skills: ["English", "Spanish", "Hebrew"],
  },
];

export default function Skills() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-skill]",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={rootRef} className="bg-void px-6 py-28 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs tracking-widest text-signal">
          04 / SKILLS
        </p>
        <h2 className="mt-3 font-grotesk text-4xl font-bold tracking-tightest text-ghost sm:text-5xl">
          Technical Stack
        </h2>
        <p className="mt-4 font-display text-xl italic text-muted">
          The tools behind the work.
        </p>

        <div className="mt-16 flex flex-col gap-10">
          {CATEGORIES.map((category) => (
            <div key={category.label}>
              <p className="font-mono text-[0.65rem] tracking-widest text-muted">
                {category.label}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    data-skill
                    className="skill-pill rounded-full border border-steel bg-iron px-4 py-2 font-mono text-xs text-ghost"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
