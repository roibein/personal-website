import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FileText } from "lucide-react";
import { PULSE_WORK } from "../data/pulse.js";
import { STEERING_MOUNT_WORK } from "../data/steeringMount.js";
import { WorkModal } from "./WorkPanels.jsx";

const ENTRIES = [
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
    company: "Duke Motorsports",
    role: "Vehicle Dynamics Engineer",
    date: "AUG 2025–PRESENT",
    bullets: [
      "Collaborate with 20+ engineers to design, manufacture, and test a Formula SAE race car.",
      "Use Optimum Kinematics to evaluate suspension geometry and optimize camber, toe, and steering characteristics.",
      "Designed and fabricated a 3D-printed steering sensor mount for integration with the steering rack.",
      "Machine and manufacture parts using CNC mill, lathe, and 3D printers.",
    ],
    work: STEERING_MOUNT_WORK,
  },
  {
    company: "Duke Luck Biomechanics Lab",
    role: "Research Assistant",
    date: "JAN 2026–PRESENT",
    bullets: [
      "Conduct biomechanics experiments using a drop tower, load cell instrumentation, and anthropomorphic test devices.",
      "Analyze and graph 600+ trials of gyroscopic acceleration data using Python.",
    ],
    work: {
      kind: "analysis",
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
    company: "Duke University",
    role: "Software Engineering Intern",
    date: "MAY–JUL 2026",
    bullets: [
      "Developed full-stack functionality for a research mobile application used by 100+ participants to collect wearable health data, building SwiftUI frontend interfaces and FastAPI backend services.",
      "Built fitness dashboards, Duke Recreation event integration, social leaderboards, and in-app games to improve user engagement and support continuous health-data collection.",
      "Presented project progress and final deliverables to researchers, stakeholders, and colleagues, communicating technical design decisions and feature implementations.",
    ],
    work: PULSE_WORK,
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
  const [activeWork, setActiveWork] = useState(null);

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
                className="experience-card hover-card relative rounded-[1.5rem] border border-steel bg-iron p-7 sm:p-9"
              >
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
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-px w-4 shrink-0 bg-signal"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {entry.work && (
                  <button
                    type="button"
                    onClick={() => setActiveWork(entry.work)}
                    className="magnetic-btn mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-signal px-5 py-3 font-grotesk text-xs font-bold uppercase tracking-wide text-on-signal"
                  >
                    <FileText size={16} />
                    See Project Work
                  </button>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>

      <WorkModal work={activeWork} onClose={() => setActiveWork(null)} />
    </section>
  );
}
