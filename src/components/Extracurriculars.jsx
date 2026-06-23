import { useEffect, useRef } from "react";
import gsap from "gsap";
import { GraduationCap, FlaskConical } from "lucide-react";

export default function Extracurriculars() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-extra]",
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
    <section ref={rootRef} className="px-6 py-28 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs tracking-widest text-signal">
          06 / BEYOND THE LAB
        </p>
        <h2 className="mt-3 font-grotesk text-4xl font-bold tracking-tightest text-ghost sm:text-5xl">
          The Signal Beyond the Lab
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <article
            data-extra
            className="hover-card flex flex-col gap-5 rounded-[1.5rem] border border-steel bg-iron p-8"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-steel bg-void text-signal">
                <GraduationCap size={22} aria-hidden="true" />
              </span>
              <span className="font-mono text-[0.65rem] text-muted">
                OCT 2025–PRESENT
              </span>
            </div>
            <h3 className="font-grotesk text-xl font-bold tracking-tightest text-ghost">
              Duke STEM Connect
            </h3>
            <p className="font-sans text-sm text-muted">
              Volunteer at a local Durham elementary school designing and
              teaching fun, engaging STEM lessons. Building relationships with
              20+ students and cultivating early STEM engagement.
            </p>
          </article>

          <article
            data-extra
            className="hover-card flex flex-col gap-5 rounded-[1.5rem] border border-steel bg-iron p-8"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-steel bg-void text-signal">
                <FlaskConical size={22} aria-hidden="true" />
              </span>
              <span className="rounded-full bg-signal px-3 py-1 font-mono text-[0.6rem] font-bold tracking-widest text-void">
                PUBLISHED
              </span>
            </div>
            <h3 className="font-grotesk text-xl font-bold tracking-tightest text-ghost">
              Research Publication
            </h3>
            <p className="font-sans text-sm text-muted">
              Co-contributed to published research on ML-classified cell
              signals using flow cytometry data.{" "}
              <em className="font-display italic text-ghost">
                IEEE Sensors Journal
              </em>
              , 2025.
            </p>
            <a
              href="https://doi.org/10.1109/JSEN.2025.3551914"
              target="_blank"
              rel="noreferrer"
              className="lift-link font-mono text-xs text-signal"
            >
              DOI: 10.1109/JSEN.2025.3551914
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
