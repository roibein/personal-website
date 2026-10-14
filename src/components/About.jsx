import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    src: "/hero/hero-1-knee-brace-team.jpg",
    alt: "Roi and his teammates presenting the Aquatic Knee Stabilizer at the Duke design showcase",
  },
  {
    src: "/hero/hero-2-pulse-presentation.jpg",
    alt: "Roi presenting the Pulse research app to a visitor in front of a large display",
  },
  {
    src: "/hero/hero-3-bobsled-team.jpg",
    alt: "Roi and his teammates presenting the Bobsled Bonanza toy at the design showcase",
  },
  {
    src: "/hero/hero-4-michelin.jpg",
    alt: "Roi standing next to a Michelin Man statue",
  },
];

const SLIDE_MS = 6000;

const STATS = [
  { value: 3.96, label: "GPA", decimals: 2 },
  { value: 7, label: "Real-World Projects", decimals: 0 },
  { value: 6, label: "Engineering Experiences", decimals: 0 },
  { value: 5, label: "Programming Languages", decimals: 0 },
  { value: 1, label: "IEEE Publication", decimals: 0 },
];

const CREDENTIALS = [
  { label: "UNIVERSITY", value: "Duke University, Durham NC" },
  { label: "DEGREE", value: "BSE Mechanical Engineering" },
  { label: "CERTIFICATE", value: "Aerospace Engineering" },
  { label: "EXPECTED GRADUATION", value: "May 2029" },
  { label: "LANGUAGES", value: "English · Spanish · Hebrew" },
];

export default function About() {
  const rootRef = useRef(null);
  const slideshowRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideshowInView, setSlideshowInView] = useState(false);

  useEffect(() => {
    const el = slideshowRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setSlideshowInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!slideshowInView) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const id = setTimeout(
      () => setActiveSlide((i) => (i + 1) % SLIDES.length),
      SLIDE_MS
    );
    return () => clearTimeout(id);
  }, [activeSlide, slideshowInView]);

  const goToSlide = (index) => {
    setActiveSlide((index + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      // Skip motion, but still resolve the count-up stats to their final values.
      rootRef.current
        ?.querySelectorAll("[data-counter]")
        .forEach((el) => {
          const target = parseFloat(el.dataset.counter);
          const decimals = parseInt(el.dataset.decimals, 10);
          const suffix = el.dataset.suffix || "";
          el.textContent = target.toFixed(decimals) + suffix;
        });
      return undefined;
    }

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
          <div>
            <p
              data-about
              className="font-mono text-xs tracking-widest text-signal"
            >
              01 / ABOUT
            </p>
            <h2
              data-about
              className="mt-3 font-grotesk text-4xl font-bold tracking-tightest text-ghost sm:text-5xl"
            >
              Background
            </h2>
          </div>
          <p data-about className="max-w-xl font-sans text-muted">
            Sophomore at Duke University studying Mechanical Engineering
            with a Certificate in Aerospace Engineering. I work across the full
            engineering stack — from CAD and FEA in SolidWorks to firmware in
            Arduino and full-stack mobile apps in SwiftUI. Currently racing with
            Duke Motorsports, researching biomechanics, and building hardware
            that solves real problems.
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

        {/* Photo slideshow + Credentials */}
        <div className="flex flex-col gap-8 self-start">
          <figure
            ref={slideshowRef}
            data-about
            className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-steel bg-inset"
          >
            {SLIDES.map((slide, i) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={i === activeSlide ? slide.alt : ""}
                aria-hidden={i === activeSlide ? undefined : "true"}
                loading="lazy"
                decoding="async"
                className={`photo-slide absolute inset-0 h-full w-full object-contain object-center p-1 sm:p-2 ${
                  i === activeSlide ? "is-active" : ""
                }`}
              />
            ))}
            <button
              type="button"
              onClick={() => goToSlide(activeSlide - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-steel bg-void/60 p-2 text-ghost backdrop-blur transition-colors hover:bg-void hover:text-signal"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => goToSlide(activeSlide + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-steel bg-void/60 p-2 text-ghost backdrop-blur transition-colors hover:bg-void hover:text-signal"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 right-3 z-10 flex gap-1.5">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => goToSlide(i)}
                  aria-label={`Show photo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeSlide ? "w-5 bg-signal" : "w-1.5 bg-white/70 hover:bg-white"
                  }`}
                />
              ))}
            </div>
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
