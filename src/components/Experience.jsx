import { useState } from "react";
import { ArrowRight, BarChart3 } from "lucide-react";
import Modal from "./Modal.jsx";

// Python analysis from the Luck Lab, shown in a dialog from that entry.
const SENSOR_VALIDATION = {
  title: "Sensor validation analysis",
  context: "Duke Luck Biomechanics Lab · Research Assistant",
  method:
    "Benchmarked a Prevent instrumented mouthguard against a reference lab system: a helmeted NOCSAE headform on a drop tower, at 8, 50, and 90 cm drop heights. In Python (pandas / NumPy), I parsed the mouthguard and reference time series, removed pre-impact baseline drift, computed resultant kinematics from the x/y/z channels, differentiated angular velocity to recover angular acceleration, windowed each signal around its impact peak, rejected outliers, then fit least-squares agreement lines against a 1:1 reference.",
  plots: [
    {
      src: "/research/pla.png",
      alt: "Scatter plot of mouthguard vs reference peak linear acceleration, with a best-fit line of slope 0.46 against a 1:1 reference line",
      caption:
        "Peak linear acceleration: moderate agreement. The mouthguard systematically under-reads (slope ≈ 0.46 vs 1:1).",
    },
    {
      src: "/research/pav.png",
      alt: "Scatter plot of mouthguard vs reference peak angular velocity, with a best-fit line of slope 0.82 against a 1:1 reference line",
      caption: "Peak angular velocity: the closest agreement of the three (slope ≈ 0.82).",
    },
    {
      src: "/research/paa.png",
      alt: "Scatter plot of mouthguard vs reference peak angular acceleration, with points collapsing far below the 1:1 reference line",
      caption:
        "Peak angular acceleration: the mouthguard fails to capture it. Values collapse far below the reference.",
    },
  ],
};

// Current roles first, then most recent.
const ENTRIES = [
  {
    role: "Vehicle Dynamics Engineer",
    org: "Duke Motorsports (Formula SAE)",
    dates: "Aug 2025 – Present",
    bullets: [
      "Collaborate with 20+ engineers to design, manufacture, and test a Formula SAE race car.",
      "Use Optimum Kinematics to evaluate suspension geometry and optimize camber, toe, and steering characteristics.",
      "Designed and fabricated a 3D-printed steering sensor mount for integration with the steering rack.",
      "Machine and manufacture parts using CNC mill, lathe, and 3D printers.",
    ],
    projects: [
      { href: "#suspension", label: "Project: 2027 suspension" },
      { href: "#bearing-carriers", label: "Project: bearing carriers" },
      { href: "#steering-sensor-mount", label: "Project: steering angle sensor mount" },
    ],
  },
  {
    role: "Research Assistant",
    org: "Duke Luck Biomechanics Lab",
    dates: "Jan 2026 – Present",
    bullets: [
      "Conduct biomechanics experiments using a drop tower, load cell instrumentation, and anthropomorphic test devices.",
      "Analyze and graph 600+ trials of gyroscopic acceleration data using Python.",
    ],
    analysis: SENSOR_VALIDATION,
  },
  {
    role: "Makerspace Technician",
    org: "Duke Co-Lab",
    dates: "Jan 2026 – Present",
    bullets: [
      "Train students and researchers on equipment including 3D printers, laser cutters, waterjet, and ShopBot CNC systems.",
      "Maintain 45+ 3D printers: troubleshooting, repairs, and preventative maintenance.",
    ],
  },
  {
    role: "Software Engineering Intern",
    org: "Duke University",
    dates: "May – Jul 2026",
    bullets: [
      "Developed full-stack functionality for a research mobile application used by 100+ participants to collect wearable health data, building SwiftUI frontend interfaces and FastAPI backend services.",
      "Built fitness dashboards, Duke Recreation event integration, social leaderboards, and in-app games to improve user engagement and support continuous health-data collection.",
      "Presented project progress and final deliverables to researchers, stakeholders, and colleagues, communicating technical design decisions and feature implementations.",
    ],
    project: { href: "#pulse-app", label: "Project: Pulse research app" },
  },
  {
    role: "Lab Aide Intern",
    org: "Clemson University Bioengineering",
    dates: "May – Aug 2024",
    bullets: [
      "Created and passaged cell cultures used for testing.",
      "Designed and developed an Arduino-controlled microscope stage using stepper motors and CAD-designed components.",
    ],
  },
  {
    role: "Lab Aide",
    org: "AEOP Internship",
    dates: "Jun – Aug 2023",
    bullets: [
      "Created cell cultures, ran experiments, and gathered data on cell signals with a flow cytometer.",
      "Trained machine learning models on this data to recognize differences between cell signals.",
    ],
  },
];

function AnalysisDialog({ analysis, onClose }) {
  return (
    <Modal label={analysis.title} onClose={onClose} maxWidth="max-w-4xl">
      <div className="flex flex-col gap-6 p-5 sm:p-8">
        <header className="pr-14">
          <p className="label">{analysis.context}</p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {analysis.title}
          </h2>
        </header>
        <p className="max-w-3xl text-[0.9375rem] leading-7 text-muted">{analysis.method}</p>
        <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
          {analysis.plots.map((plot) => (
            <figure key={plot.src} className="flex flex-col gap-3">
              <img
                src={plot.src}
                alt={plot.alt}
                width="1100"
                height="825"
                loading="lazy"
                className="w-full rounded-md border border-line bg-white"
              />
              <figcaption className="text-sm leading-5 text-muted">{plot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default function Experience() {
  const [analysis, setAnalysis] = useState(null);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container-page">
        <h2 id="work-title" className="section-title">
          Experience
        </h2>

        <div className="mt-10">
          {ENTRIES.map((entry) => (
            <article
              key={entry.org + entry.dates}
              className="grid gap-2 border-t border-line py-8 last:pb-0 lg:grid-cols-12 lg:gap-12"
            >
              <p className="font-mono text-sm text-muted lg:col-span-3 lg:pt-1">
                {entry.dates}
              </p>
              <div className="lg:col-span-9">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                  {entry.role}
                </h3>
                <p className="mt-0.5 text-base text-muted">{entry.org}</p>
                <ul className="mt-4 flex max-w-2xl list-disc flex-col gap-2 pl-5 text-[0.9375rem] leading-6 text-muted marker:text-muted/50">
                  {entry.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>

                {(entry.projects ?? (entry.project ? [entry.project] : [])).length > 0 && (
                  <div className="mt-5 flex flex-col items-start gap-2">
                    {(entry.projects ?? [entry.project]).map((project) => (
                      <a
                        key={project.href}
                        href={project.href}
                        className="link inline-flex items-center gap-1.5 text-sm"
                      >
                        {project.label}
                        <ArrowRight size={15} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                )}
                {entry.analysis && (
                  <button
                    type="button"
                    onClick={() => setAnalysis(entry.analysis)}
                    className="btn btn-secondary mt-5"
                  >
                    <BarChart3 size={16} aria-hidden="true" />
                    View sensor validation analysis
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {analysis && <AnalysisDialog analysis={analysis} onClose={() => setAnalysis(null)} />}
    </section>
  );
}
