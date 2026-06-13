import { useEffect, useRef } from "react";
import gsap from "gsap";

const STATS = [
  { value: 3.96, label: "GPA", decimals: 2 },
  { value: 2, label: "Research Labs", decimals: 0 },
  { value: 1, label: "IEEE Publication", decimals: 0 },
  { value: 20, label: "Engineers on Motorsports Team", decimals: 0, suffix: "+" },
];

const CREDENTIALS = [
  { label: "UNIVERSITY", value: "Duke University, Durham NC" },
  { label: "DEGREE", value: "BSE Mechanical Engineering" },
  { label: "CERTIFICATE", value: "Robotics & Automation" },
  { label: "EXPECTED GRADUATION", value: "May 2029" },
  { label: "LANGUAGES", value: "English · Spanish · Hebrew" },
];

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about]",
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

      gsap.utils.toArray("[data-counter]").forEach((el) => {
        const target = parseFloat(el.dataset.counter);
        const decimals = parseInt(el.dataset.decimals, 10);
        const suffix = el.dataset.suffix || "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals) + suffix;
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="px-6 py-28 sm:px-12">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[60fr_40fr]">
        {/* The Statement */}
        <div className="flex flex-col gap-8">
          <p
            data-about
            className="font-display italic text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] text-ghost"
          >
            I build things that move, heal, and endure.
          </p>
          <p data-about className="max-w-xl font-sans text-muted">
            Rising sophomore at Duke University studying Mechanical Engineering
            with a Certificate in Robotics &amp; Automation. I work across the
            full engineering stack — from CAD and FEA in SolidWorks to firmware
            in Arduino and full-stack mobile apps in SwiftUI. Currently racing
            with Duke Motorsports, researching biomechanics, and building
            hardware that solves real problems.
          </p>
          <div data-about className="flex flex-wrap gap-3">
            {STATS.map((stat) => (
              <span
                key={stat.label}
                className="skill-pill inline-flex items-baseline gap-2 rounded-full border border-steel bg-iron px-4 py-2 font-mono text-xs"
              >
                <span
                  className="font-bold text-signal"
                  data-counter={stat.value}
                  data-decimals={stat.decimals}
                  data-suffix={stat.suffix || ""}
                >
                  0
                </span>
                <span className="text-muted">{stat.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Portrait + Credentials */}
        <div className="flex flex-col gap-8 self-start">
          <figure
            data-about
            className="relative overflow-hidden rounded-[1.5rem] border border-steel bg-iron"
          >
            <img
              src="/headshot.jpg"
              alt="Roi Bein, photographed beneath the Gothic archways of Duke University"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover object-[center_30%]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-void/90 via-void/40 to-transparent px-4 pb-3 pt-12 font-mono text-[0.6rem] tracking-widest">
              <span className="text-signal">ROI BEIN</span>
              <span className="text-ghost/70">DURHAM, NC</span>
            </figcaption>
          </figure>

          <div data-about className="flex flex-col">
            {CREDENTIALS.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-6 border-b border-steel py-4"
              >
                <span className="font-mono text-[0.65rem] tracking-widest text-muted">
                  {row.label}
                </span>
                <span className="text-right font-grotesk text-sm font-medium text-ghost">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
