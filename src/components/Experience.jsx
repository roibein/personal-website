import { useEffect, useRef } from "react";
import gsap from "gsap";

const ENTRIES = [
  {
    company: "Duke University",
    role: "Software Engineering Intern",
    date: "MAY–JUL 2026",
    bullets: [
      "Developed full-stack functionality for a research mobile application used by 100+ participants to collect wearable health data, building SwiftUI frontend interfaces and FastAPI backend services.",
      "Built fitness dashboards, Duke Recreation event integration, social leaderboards, and in-app games to improve user engagement and support continuous health-data collection.",
    ],
  },
  {
    company: "Duke Co-Lab",
    role: "Makerspace Technician",
    date: "JAN 2026–PRESENT",
    bullets: [
      "Train students and researchers on equipment including 3D printers, laser cutters, waterjet, and ShopBot CNC systems.",
      "Maintain 45+ 3D printers — troubleshooting, repairs, and preventative maintenance.",
    ],
  },
  {
    company: "Duke Luck Biomechanics Lab",
    role: "Research Assistant",
    date: "JAN 2026–PRESENT",
    bullets: [
      "Conduct biomechanics experiments using a drop tower, load cell instrumentation, and anthropomorphic test devices.",
      "Analyze and graph 600+ trials of gyroscopic acceleration data using Python.",
    ],
    analysis: {
      label: "DATA ANALYSIS — SENSOR VALIDATION",
      method:
        "Benchmarked a Prevent instrumented mouthguard against a reference lab system — a NOCSAE headform on a drop tower, helmeted, at 8/50/90 cm drop heights. In Python (pandas / NumPy), I parsed the mouthguard and reference time-series, removed pre-impact baseline drift, computed resultant kinematics from the x/y/z channels, differentiated angular velocity to recover angular acceleration, windowed each signal around its impact peak, rejected outliers, then fit least-squares agreement lines against a 1:1 reference.",
      plots: [
        {
          src: "/research/pla.png",
          alt: "Scatter plot of mouthguard vs reference peak linear acceleration, with a best-fit line of slope 0.46 against a 1:1 reference line",
          caption:
            "Peak Linear Acceleration — moderate agreement; the mouthguard systematically under-reads (slope ≈ 0.46 vs 1:1).",
        },
        {
          src: "/research/pav.png",
          alt: "Scatter plot of mouthguard vs reference peak angular velocity, with a best-fit line of slope 0.82 against a 1:1 reference line",
          caption:
            "Peak Angular Velocity — the closest agreement of the three (slope ≈ 0.82).",
        },
        {
          src: "/research/paa.png",
          alt: "Scatter plot of mouthguard vs reference peak angular acceleration, with points collapsing far below the 1:1 reference line",
          caption:
            "Peak Angular Acceleration — the mouthguard fails to capture it; values collapse far below the reference.",
        },
      ],
    },
  },
  {
    company: "Clemson University Bioengineering",
    role: "Lab Aide Intern",
    date: "MAY–AUG 2024",
    bullets: [
      "Created and passaged cell cultures used for testing.",
      "Designed and developed an Arduino-controlled microscope stage using stepper motors and CAD-designed components.",
    ],
  },
  {
    company: "AEOP Internship",
    role: "Lab Aide",
    date: "JUN–AUG 2023",
    bullets: [
      "Created cell cultures, ran experiments, and gathered data on cell signals with a flow cytometer.",
      "Trained machine learning models on this data to recognize differences between cell signals.",
      "Contributed to research published in IEEE Sensors Journal (DOI: 10.1109/JSEN.2025.3551914).",
    ],
  },
];

export default function Experience() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-entry]",
        { y: 30, opacity: 0 },
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
    <section id="work" ref={rootRef} className="bg-void px-6 py-28 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs tracking-widest text-signal">
          02 / EXPERIENCE
        </p>
        <h2 className="mt-3 font-grotesk text-4xl font-bold tracking-tightest text-ghost sm:text-5xl">
          The Chronolog
        </h2>

        <div className="relative mt-16 border-l border-steel pl-6 sm:pl-12">
          <div className="flex flex-col gap-8">
            {ENTRIES.map((entry) => (
              <article
                key={entry.company + entry.date}
                data-entry
                className="hover-card relative rounded-[1.5rem] border border-steel bg-iron p-7 sm:p-9"
              >
                {/* Timeline node */}
                <span
                  aria-hidden="true"
                  className="absolute -left-6 top-10 h-2 w-2 -translate-x-1/2 rounded-full bg-signal sm:-left-12"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-grotesk text-lg font-bold tracking-tightest text-ghost">
                    {entry.company}
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    {entry.date}
                  </span>
                </div>
                <p className="mt-1 font-display text-xl italic text-signal">
                  {entry.role}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {entry.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 font-sans text-sm text-muted"
                    >
                      <span aria-hidden="true" className="mt-[7px] h-px w-4 shrink-0 bg-signal" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {entry.analysis && (
                  <div className="mt-6 rounded-[1.25rem] border border-steel bg-void/60 p-5 sm:p-6">
                    <p className="font-mono text-[0.65rem] tracking-widest text-signal">
                      {entry.analysis.label}
                    </p>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
                      {entry.analysis.method}
                    </p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-3">
                      {entry.analysis.plots.map((plot) => (
                        <figure
                          key={plot.src}
                          className="flex flex-col gap-2.5"
                        >
                          <img
                            src={plot.src}
                            alt={plot.alt}
                            loading="lazy"
                            className="w-full rounded-[0.6rem] border border-steel bg-ghost p-2"
                          />
                          <figcaption className="px-1 text-center font-mono text-[0.68rem] leading-snug tracking-wide text-muted">
                            {plot.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
