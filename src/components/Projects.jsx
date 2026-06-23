import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  X,
  ArrowUpRight,
  Link2,
  Check,
  Box,
} from "lucide-react";
import ModelViewer from "./ModelViewer.jsx";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/* Media carousel — every slide fits (object-contain) over a blurred   */
/* backdrop of itself, so CAD renders and photos all sit cleanly.      */
/* ------------------------------------------------------------------ */
function MediaCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);
  const hasLooped = useRef(false);
  const count = items.length;

  // Only begin once the carousel is scrolled into view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance every 3s, in view, until it stops or the visitor takes over.
  // After the last slide, wrap back to the first slide for one final beat.
  useEffect(() => {
    if (!autoplay || !inView || count <= 1 || prefersReducedMotion())
      return undefined;
    const id = setInterval(() => {
      setIndex((i) => {
        if (i >= count - 1) {
          hasLooped.current = true;
          return 0;
        }
        return i + 1;
      });
    }, 3000);
    return () => clearInterval(id);
  }, [autoplay, inView, count]);

  // Once it has wrapped back to the first slide, stop and rest there.
  useEffect(() => {
    if (hasLooped.current && index === 0) setAutoplay(false);
  }, [index]);

  const goTo = (i) => {
    setAutoplay(false);
    setIndex((i + count) % count);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col overflow-hidden bg-void"
    >
      {/* Image stage — captions sit below this, never on top of it */}
      <div className="relative min-h-0 flex-1">
        {items.map((item, i) => (
          <div
            key={item.src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i === index ? undefined : true}
          >
            <img
              src={item.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
            />
            <div className="absolute inset-0 bg-void/40" />
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain p-5 sm:p-8"
            />
          </div>
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-steel bg-void/60 p-2 text-ghost backdrop-blur transition-colors hover:bg-void hover:text-signal"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-steel bg-void/60 p-2 text-ghost backdrop-blur transition-colors hover:bg-void hover:text-signal"
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute right-3 top-3 z-10 rounded-full bg-void/60 px-2.5 py-1 font-mono text-[0.6rem] tracking-widest text-ghost backdrop-blur">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </div>
          </>
        )}

        {/* Caption pill above the dots — translucent bubble, no backing band */}
        {(items[index]?.caption || count > 1) && (
          <div className="absolute inset-x-0 bottom-3 z-10 flex flex-col items-center gap-2.5 px-3">
            {items[index]?.caption && (
              <p className="rounded-full border border-ghost/15 bg-ghost/10 px-4 py-1.5 text-center font-mono text-[0.78rem] leading-snug tracking-wide text-ghost/90 shadow-lg shadow-void/40 backdrop-blur-md">
                {items[index].caption}
              </p>
            )}
            {count > 1 && (
              <div className="flex items-center gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-5 bg-signal" : "w-1.5 bg-ghost/40 hover:bg-ghost/70"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Case-study modal — fuller writeup, reuses the media carousel        */
/* ------------------------------------------------------------------ */
function ProjectModal({ project, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  useEffect(() => setCopied(false), [project]);

  if (!project) return null;

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${project.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex overflow-y-auto bg-void/80 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div
        className="relative m-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-steel bg-iron"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-steel bg-void/70 text-ghost backdrop-blur transition-colors hover:border-signal hover:text-signal"
        >
          <X size={18} />
        </button>

        {project.media && (
          <div className="relative h-[38vh] min-h-[240px] w-full">
            <MediaCarousel items={project.media} />
          </div>
        )}

        <div className="flex flex-col gap-6 p-8 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-mono text-xs tracking-widest text-signal">
              {project.label}
            </p>
            <p className="font-mono text-[0.65rem] text-muted">{project.date}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-grotesk text-3xl font-bold tracking-tightest text-ghost">
              {project.title}
            </h3>
            <p className="font-display text-xl italic text-muted">
              {project.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={copyLink}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-steel bg-void px-3.5 py-2 font-mono text-[0.6rem] tracking-widest text-ghost transition-colors hover:border-signal hover:text-signal"
          >
            {copied ? <Check size={13} /> : <Link2 size={13} />}
            {copied ? "LINK COPIED" : "COPY LINK TO THIS PROJECT"}
          </button>

          {project.model && (
            <div className="flex flex-col gap-2.5 border-t border-steel pt-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-2 font-mono text-[0.65rem] tracking-widest text-signal">
                  <Box size={14} />
                  INTERACTIVE 3D MODEL
                </p>
                <p className="font-mono text-[0.6rem] tracking-widest text-muted">
                  DRAG TO ROTATE · SCROLL TO ZOOM
                </p>
              </div>
              <div className="h-[46vh] min-h-[300px] w-full overflow-hidden rounded-[1rem] border border-steel bg-gradient-to-b from-iron to-void">
                <ModelViewer src={project.model.src} alt={project.model.alt} />
              </div>
            </div>
          )}

          {project.caseStudy && (
            <div className="flex flex-col gap-5 border-t border-steel pt-6">
              {project.caseStudy.map((block) => (
                <div key={block.h} className="flex flex-col gap-1.5">
                  <p className="font-mono text-[0.65rem] tracking-widest text-signal">
                    {block.h}
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-muted">
                    {block.p}
                  </p>
                </div>
              ))}
            </div>
          )}

          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn inline-flex w-fit items-center gap-2.5 rounded-full bg-signal px-5 py-3 font-grotesk text-xs font-bold uppercase tracking-wide text-void"
            >
              <FileText size={16} />
              {project.link.label}
            </a>
          )}

          <div className="flex flex-wrap gap-2 border-t border-steel pt-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-steel bg-void px-3.5 py-1.5 font-mono text-[0.65rem] text-ghost"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Interactive element 1 — knee brace side-view, draw-in on scroll     */
/* ------------------------------------------------------------------ */
function KneeBraceDiagram() {
  const ref = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".draw-path", { strokeDashoffset: 0 });
        return;
      }
      gsap.fromTo(
        ".draw-path",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.inOut",
          stagger: 0.15,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const pathProps = {
    className: "draw-path",
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round",
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 260"
      className="h-40 w-auto"
      role="img"
      aria-label="Side-view line diagram of a hinged knee brace"
    >
      {/* Upper thigh cuff */}
      <path d="M60 20 Q100 8 140 20 L136 60 Q100 50 64 60 Z" stroke="var(--muted)" {...pathProps} />
      {/* Upper strut */}
      <path d="M70 60 L78 118" stroke="var(--ghost)" {...pathProps} />
      <path d="M130 60 L122 118" stroke="var(--ghost)" {...pathProps} />
      {/* Hinge */}
      <circle cx="78" cy="130" r="12" stroke="var(--signal)" {...pathProps} />
      <circle cx="122" cy="130" r="12" stroke="var(--signal)" {...pathProps} />
      {/* Lower strut */}
      <path d="M78 142 L70 200" stroke="var(--ghost)" {...pathProps} />
      <path d="M122 142 L130 200" stroke="var(--ghost)" {...pathProps} />
      {/* Lower calf cuff */}
      <path d="M64 200 Q100 210 136 200 L140 240 Q100 252 60 240 Z" stroke="var(--muted)" {...pathProps} />
      {/* Water line marks */}
      <path d="M20 90 Q30 84 40 90 Q50 96 60 90" stroke="var(--signal)" {...pathProps} />
      <path d="M150 170 Q160 164 170 170 Q180 176 190 170" stroke="var(--signal)" {...pathProps} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Interactive element 2 — rotating crank mechanism                    */
/* ------------------------------------------------------------------ */
function GearMechanism() {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.to(".gear-a", {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 6,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".gear-b", {
        rotation: -360,
        transformOrigin: "50% 50%",
        duration: 6,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const gearTeeth = (cx, cy, r, n) => {
    const teeth = [];
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2;
      const x1 = cx + Math.cos(angle) * r;
      const y1 = cy + Math.sin(angle) * r;
      const x2 = cx + Math.cos(angle) * (r + 8);
      const y2 = cy + Math.sin(angle) * (r + 8);
      teeth.push(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="4" />
      );
    }
    return teeth;
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 220 120"
      className="h-32 w-auto"
      role="img"
      aria-label="Animated geared roller pair, like the machine's dual-roller cracking mechanism"
    >
      <g className="gear-a" stroke="var(--signal)" fill="none">
        <circle cx="70" cy="60" r="34" strokeWidth="2" />
        <circle cx="70" cy="60" r="8" strokeWidth="2" />
        {gearTeeth(70, 60, 34, 12)}
      </g>
      <g className="gear-b" stroke="var(--muted)" fill="none">
        <circle cx="152" cy="60" r="26" strokeWidth="2" />
        <circle cx="152" cy="60" r="6" strokeWidth="2" />
        {gearTeeth(152, 60, 26, 9)}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Interactive element 3 — exploded-view sequence, parts stagger in    */
/* ------------------------------------------------------------------ */
function ExplodedView() {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-part]",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.25,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const panels = [
    { label: "BOBSLED", desc: "Figure, square-peg fit" },
    { label: "DISK", desc: "Two-tier launch base" },
    { label: "LAUNCHER", desc: "Arms, pusher, connector" },
  ];

  return (
    <div ref={ref} className="grid grid-cols-3 gap-3">
      {panels.map((panel, i) => (
        <div
          key={panel.label}
          data-part
          className="flex flex-col items-center gap-2 rounded-[1rem] border border-steel bg-void p-4"
        >
          <svg viewBox="0 0 60 60" className="h-12 w-12" aria-hidden="true">
            {i === 0 && (
              <path
                d="M12 40 Q12 14 30 14 Q48 14 48 40 Z"
                fill="none"
                stroke="var(--signal)"
                strokeWidth="2"
              />
            )}
            {i === 1 && (
              <g fill="none" stroke="var(--ghost)" strokeWidth="2">
                <circle cx="30" cy="30" r="12" />
                <line x1="30" y1="14" x2="30" y2="46" />
                <line x1="14" y1="30" x2="46" y2="30" />
              </g>
            )}
            {i === 2 && (
              <g fill="none" stroke="var(--muted)" strokeWidth="2">
                <rect x="12" y="34" width="36" height="12" rx="3" />
                <line x1="20" y1="34" x2="20" y2="26" />
                <line x1="40" y1="34" x2="40" y2="26" />
              </g>
            )}
          </svg>
          <span className="font-mono text-[0.6rem] tracking-widest text-signal">
            {panel.label}
          </span>
          <span className="text-center font-sans text-[0.65rem] text-muted">
            {panel.desc}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Interactive element 4 — CD case parametric schematic (real data)    */
/* ------------------------------------------------------------------ */
function CDCaseSchematic() {
  const equations = [
    ['"CD_Height"', "125mm"],
    ['"CD_Thickness"', "10mm"],
    ['"CD_Width"', "142mm"],
    ['"Wall_Thickness"', "10mm"],
    ['"Tolerance"', "1mm"],
    ['"Total_Height"', '3 * "CD_Height" + 2 * "Wall_Thickness" + 4mm'],
    ['"Total_Width"', '"CD_Width" * 3 + "Wall_Thickness" * 2 + 4mm'],
    ['"Dist_Btwn_Pegs"', '("Total_Height" - 2 * "Peg_Buffer") / ("Num_Pegs" - 1)'],
  ];

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <svg
        viewBox="0 0 314 280"
        className="h-auto w-full max-w-sm self-center"
        role="img"
        aria-label="Front-view schematic of the 3 by 3 CD display case with overall dimensions 450 by 399 millimeters"
      >
        <rect
          x="20"
          y="20"
          width="260"
          height="230"
          rx="6"
          fill="none"
          stroke="var(--ghost)"
          strokeWidth="2"
        />
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={32 + col * 82}
              y={32 + row * 70}
              width={70}
              height={58}
              fill="none"
              stroke="var(--steel)"
              strokeWidth="1.5"
            />
          ))
        )}
        {/* Dimension lines */}
        <line x1="20" y1="264" x2="280" y2="264" stroke="var(--signal)" strokeWidth="1" />
        <text x="150" y="278" textAnchor="middle" fill="var(--signal)" fontSize="11" fontFamily="Space Mono, monospace">
          450mm
        </text>
        <line x1="292" y1="20" x2="292" y2="250" stroke="var(--signal)" strokeWidth="1" />
        <text
          x="296"
          y="135"
          fill="var(--signal)"
          fontSize="11"
          fontFamily="Space Mono, monospace"
          transform="rotate(90 296 135)"
          textAnchor="middle"
        >
          399mm
        </text>
      </svg>

      <div className="min-w-0 max-w-full overflow-x-auto rounded-[1rem] border border-steel bg-void p-5">
        <p className="mb-3 font-mono text-[0.6rem] tracking-widest text-muted">
          SOLIDWORKS GLOBAL VARIABLES — ACTUAL MODEL EQUATIONS
        </p>
        <div className="flex flex-col gap-1.5 font-mono text-[0.65rem] leading-relaxed">
          {equations.map(([name, value]) => (
            <div key={name} className="flex gap-2 whitespace-nowrap">
              <span className="text-signal">{name}</span>
              <span className="text-muted">=</span>
              <span className="text-ghost">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Project data                                                        */
/* ------------------------------------------------------------------ */
const PROJECTS = [
  {
    id: "knee-brace",
    label: "01 / MEDTECH",
    title: "Aquatic Knee Stabilization Device",
    subtitle: "Functional underwater. Engineered for recovery.",
    date: "AUG–DEC 2025",
    caseStudy: [
      {
        h: "THE CHALLENGE",
        p: "A spinal-cord-injury patient needed knee stabilization during aquatic physical therapy. Off-the-shelf braces aren't waterproof, grow heavy when saturated, and restrict the range of motion that therapy depends on.",
      },
      {
        h: "THE APPROACH",
        p: "Our team ran tight model–print–test–revise loops, testing each prototype in water and tuning cuff fit, hinge resistance, and strap retention. CAD was built in SolidWorks and Onshape; every printed iteration was validated against real therapy conditions rather than bench assumptions.",
      },
      {
        h: "THE OUTCOME",
        p: "A working, waterproof prototype that stabilizes the joint without fighting the patient's motion — validated in an actual pool therapy session and presented at the Duke Pratt design showcase.",
      },
    ],
    body: [
      "Collaborated to create a knee brace that functions underwater to aid a spinal cord injury patient in aquatic physical therapy. The brief demanded a device that is waterproof, lightweight, and non-restrictive — stabilizing the joint without fighting the patient's range of motion in the pool.",
      "Used CAD and physical, mechanical, iterative design to engineer a working prototype: model, print, test in water, measure, revise. Each cycle tightened fit, hinge behavior, and strap retention until the brace held up under real therapy conditions.",
    ],
    tags: [
      "SolidWorks / Onshape",
      "Iterative Prototyping",
      "Biomechanics",
      "Patient-Centered Design",
    ],
    link: {
      href: "/knee-brace-poster.pdf",
      label: "View Project Poster",
      style: "button",
    },
    media: [
      {
        type: "image",
        src: "/projects/knee-brace-0.jpg",
        alt: "The printed Aquatic Knee Stabilizer prototype mounted on a pole — green and red 3D-printed cuffs with purple hinges and adjustable straps",
        caption: "Working prototype — 3D-printed cuffs, hinged struts, and adjustable straps.",
      },
      {
        type: "image",
        src: "/projects/knee-brace-pool-test.jpg",
        alt: "Roi and his team at poolside fitting the knee brace during an aquatic physical therapy session with the patient in the water",
        caption: "In-pool validation — fitting and testing the brace with the patient during an actual aquatic therapy session.",
      },
      {
        type: "image",
        src: "/projects/knee-brace-1.jpg",
        alt: "Roi and his teammates presenting the Aquatic Knee Stabilizer poster, holding the printed brace, at the Duke design showcase",
        caption: "Presenting at the Duke Pratt design showcase.",
      },
      {
        type: "image",
        src: "/projects/knee-brace-2.jpg",
        alt: "A patient wearing the knee brace during aquatic physical therapy in the pool",
        caption: "The brace in use during aquatic physical therapy.",
      },
    ],
    imageLeft: true,
    extra: <KneeBraceDiagram />,
  },
  {
    id: "happy-meal-toy",
    label: "02 / CONSUMER PRODUCT",
    title: "Happy Meal Toy — Bobsled Bonanza",
    subtitle: "Consumer constraints. Engineering precision.",
    date: "DESIGN CHALLENGE — MAR 2026",
    caseStudy: [
      {
        h: "THE BRIEF",
        p: "A McDonald's Happy Meal challenge: a Winter-Olympics bobsled launcher built from five injection-moldable recycled-ABS parts, assembled entirely with interference fits (no adhesives), at $0.22 per unit, and safe for ages 3+.",
      },
      {
        h: "MY ROLE",
        p: "I designed the launcher arms — curvature tight enough to retain the disk, pliant enough to release it at speed. Fit was governed by worst-case tolerance analysis: ±0.004in printer accuracy per part stacking to ±0.008in per two-part joint, then tuned per fit — interference where parts must lock, clearance where the pusher must glide.",
      },
      {
        h: "THE OUTCOME",
        p: "A fully assembled, demonstrable launcher meeting cost, safety, and manufacturability constraints — every exposed edge filleted (which also improves mold flow) and every part at least 1.50in wide to pass the choking-hazard test.",
      },
    ],
    body: [
      "A Winter Olympics-themed bobsled launcher designed to a McDonald's Happy Meal brief: five separately injection-moldable parts in recycled ABS — bobsled figure, disk, pusher, arms, and back connector — assembled entirely with interference fits instead of adhesives, at $0.22 per unit. I designed the launcher arms: curvature tight enough to hold the disk, pliant enough to release it at speed.",
      "Fit was governed by worst-case tolerance analysis: ±0.004in printer accuracy per part stacked to ±0.008in per two-part joint, then tuned per fit — interference where parts must lock, clearance where the pusher must glide. Safety came first for the 3+ demographic: fillets on every exposed edge (which also improve mold flow), and every part at least 1.50in wide to pass the choking-hazard cylinder test.",
    ],
    tags: ["SolidWorks", "Injection Molding DFM", "Worst-Case Tolerancing", "Recycled ABS"],
    link: {
      href: "/happy-meal-toy-technical-memo.pdf",
      label: "Read Technical Memo",
      style: "button",
    },
    model: {
      src: "/models/happy-meal/Bobsled_Assembly.gltf",
      alt: "Interactive 3D model of the Bobsled Bonanza launcher assembly — figure, disk, pusher, arms, and back connector",
    },
    media: [
      {
        type: "image",
        src: "/projects/bobsled-bonanza.png",
        alt: "The final 3D-printed Bobsled Bonanza toy: blue bobsled figure with USA flag mounted on the disk, with the pusher drawn back in the launcher",
        caption: "Final printed launcher — pusher drawn back, figure seated on the disk.",
      },
      {
        type: "image",
        src: "/projects/happy-meal-arms-drawing.jpg",
        alt: "Toleranced engineering drawing of the launcher arms with title block, Section A-A, and multiple views",
        caption: "Launcher-arm drawing — 0.012 in interference fit at the hinge, 0.05 in clearance so the pusher slides freely, 0.01 in to kill wiggle.",
      },
      {
        type: "image",
        src: "/projects/bobsled-assembly.png",
        alt: "SolidWorks exploded view of the bobsled toy showing the launcher arms, pusher, and figure on the disk",
        caption: "Exploded view — the five injection-moldable parts: figure, disk, pusher, arms, back connector.",
      },
      {
        type: "image",
        src: "/projects/toy-flyer.png",
        alt: "Bobsled Bonanza marketing flyer with assembly instructions and the five-part breakdown",
        caption: "Packaging flyer — assembly steps and the five-part breakdown.",
      },
      {
        type: "image",
        src: "/projects/team-picture.jpg",
        alt: "Roi and his teammates presenting the Bobsled Bonanza toy at the design showcase",
        caption: "The team at the design showcase.",
      },
    ],
    imageLeft: false,
    extra: <ExplodedView />,
  },
  {
    id: "sunflower-sheller",
    label: "03 / MECHANISM DESIGN",
    title: "Sunflower Shelling Machine",
    subtitle: "Crack the shell. Spare the kernel.",
    date: "EGR 121 — FEB 2026",
    caseStudy: [
      {
        h: "THE CHALLENGE",
        p: "Design a hand-cranked, fully human-powered machine that cracks sunflower seeds while sparing the kernel — a group project in which I owned all CAD, from every part file to the print-ready assembly.",
      },
      {
        h: "THE APPROACH",
        p: "A dual-roller concept won a weighted value matrix (4.65/5) over splitter and crusher-plate designs. Testing showed identical rollers either crushed kernels or let seeds slip through; the fix paired one horizontal-bump roller with one vertical-bump roller to balance distributed against point force. Two semicircular PLA filters (6.5mm and 4.3mm holes, sized from caliper measurements of real shells) separate output, with twist handles to clear clogs mid-run.",
      },
      {
        h: "THE OUTCOME",
        p: "A class-high yield of 24 seeds per minute. Mid-test, the crank handle snapped under torsional load — a hard-earned durability lesson pointing to higher infill density and a more rigid, non-PLA handle.",
      },
    ],
    body: [
      "A hand-cranked, fully human-powered machine that cracks sunflower seeds and separates shells from kernels — a group project where I owned the CAD, building every SolidWorks part file and the full assembly for 3D printing. The dual-roller concept beat splitter and crusher-plate alternatives in a weighted value matrix (4.65 of 5).",
      "Testing drove the core insight: identical bumpy rollers either crushed the kernel or let seeds slip through untouched. The final configuration pairs one horizontal-bump roller with one vertical-bump roller, balancing distributed force against point force so the shell cracks while the seed survives. Downstream, two semicircular 3D-printed PLA filters — hole sizes of 6.5mm and 4.3mm chosen by sampling real shells with calipers — separate output, with twist handles to dislodge clogs mid-run.",
      "After iterating on gear types and roller thicknesses, the design achieved a class-high yield of 24 seeds per minute. The handle later snapped under torsional load mid-test — a hard-earned durability lesson: higher infill density and a more rigid, non-PLA handle next time.",
    ],
    tags: ["SolidWorks", "3D Printing (PLA)", "Mechanism Design", "Value Matrix"],
    media: [
      {
        type: "image",
        src: "/projects/sheller-assembly.png",
        alt: "SolidWorks assembly of the sunflower shelling machine: hopper box with dual geared rollers and hand crank",
        caption: "Dual-roller assembly — one horizontal-bump roller paired with one vertical-bump roller; the hand crank drives both through the gear train.",
      },
    ],
    model: {
      src: "/models/sunflower/Grinder_Assembly.gltf",
      alt: "Interactive 3D model of the sunflower sheller grinder assembly — dual rollers, crank, and funnel",
    },
    imageLeft: true,
    extra: <GearMechanism />,
  },
  {
    id: "cd-display-case",
    label: "04 / TOLERANCE ANALYSIS",
    title: "CD Display Case",
    subtitle: "Nine CDs. One millimeter of clearance.",
    date: "PERSONAL PROJECT",
    caseStudy: [
      {
        h: "THE GOAL",
        p: "Build a wall-mounted case holding nine CDs in a 3×3 grid that rebuilds itself automatically if any dimension changes.",
      },
      {
        h: "THE APPROACH",
        p: "A fully parametric SolidWorks model driven by global variables — 142mm CD width, 125mm height, 10mm thickness, 10mm walls, and a deliberate 1mm slot tolerance. The mounting system uses four 5mm pegs in 15mm-deep holes, with peg spacing derived by equation from total height, buffer, and peg count rather than hand-placed.",
      },
      {
        h: "THE OUTCOME",
        p: "A 450×399mm envelope that resolves automatically from the equations, printed in orange PLA and wall-mounted holding nine albums.",
      },
    ],
    body: [
      "A fully parametric SolidWorks model of a wall-mounted display case holding nine CDs in a 3×3 grid. The entire geometry is driven by global variables: 142mm CD width, 125mm height, 10mm thickness, 10mm walls, and a deliberate 1mm tolerance on every slot — change one number and the whole case rebuilds.",
      "Overall envelope resolves to 450mm wide by 399mm tall. The mounting system uses four 5mm pegs in 15mm-deep holes, with spacing computed by equation rather than hand-placed: peg distance derives from total height, buffer, and peg count, so the pattern stays valid at any scale.",
    ],
    tags: ["SolidWorks", "Parametric Modeling", "Tolerance Analysis", "Design Equations"],
    media: [
      {
        type: "image",
        src: "/projects/cd-display-case.jpg",
        alt: "The finished wall-mounted CD display case in orange PLA, holding nine classic hip-hop albums in a 3 by 3 grid",
        caption: "Printed in orange PLA, wall-mounted, holding nine albums in a 3×3 grid.",
      },
      {
        type: "image",
        src: "/projects/cd-assembly.png",
        alt: "SolidWorks assembly showing the four interlocking panels of the CD display case with mounting pegs",
        caption: "Parametric assembly — four interlocking panels; equation-driven peg spacing.",
      },
    ],
    model: {
      src: "/models/cd-display/Full_CD_Display_Case_Assembly.gltf",
      alt: "Interactive 3D model of the CD display case assembly — four interlocking panels with mounting pins",
    },
    imageLeft: false,
    extra: <CDCaseSchematic />,
  },
  {
    id: "robocop-helmet",
    label: "05 / SURFACE MODELING",
    title: "Toy RoboCop Helmet",
    subtitle: "First CAD project. Built for my brother.",
    date: "PERSONAL PROJECT",
    caseStudy: [
      {
        h: "THE IDEA",
        p: "Model the RoboCop (1987) helmet to fit onto a Lego Bionicle head — my first personal CAD project, and a gift for my brother.",
      },
      {
        h: "THE APPROACH",
        p: "I measured and built around the existing Bionicle head so the helmet would seat correctly, then used Onshape surface-modeling features to mirror the iconic on-screen silhouette into printable geometry.",
      },
      {
        h: "THE OUTCOME",
        p: "A printed helmet that fits the figure — an early proof that CAD could translate a reference image into a real, physical part, and the project that kicked off my CAD work.",
      },
    ],
    body: [
      "The helmet from RoboCop (1987), modeled in Onshape to fit onto a Lego Bionicle head — a gift for my brother, and my first personal CAD project.",
      "The challenge was twofold: measuring and building around an existing part so the helmet seats correctly on the Bionicle head, and using CAD features to mirror a visual design — translating an iconic on-screen silhouette into printable geometry. Engineering put to work on something cool and fun.",
    ],
    tags: ["Onshape", "Surface Modeling", "Reverse-Engineered Fit", "3D Printing"],
    link: {
      href: "https://cad.onshape.com/documents/c57e6c0af198edbf7f9126a2/w/cd66e504ddfa145e3869a074/e/43f2697d61a75598f6f19398?renderMode=0&uiState=693b8bfb61f7a400401c0e6b",
      label: "VIEW LIVE CAD MODEL ON ONSHAPE",
    },
    model: {
      src: "/models/robocop/RoboCopDemo.gltf",
      alt: "Interactive 3D model of the RoboCop helmet",
    },
    media: [
      {
        type: "image",
        src: "/projects/robocop-helmet.jpg",
        alt: "The 3D-printed grey RoboCop helmet fitted onto a red Lego Bionicle figure",
        caption: "Printed helmet seated on the Bionicle head it was reverse-measured to fit.",
      },
      {
        type: "image",
        src: "/projects/robocop-helmet-2.jpg",
        alt: "Close-up of the printed RoboCop helmet held in hand, showing the visor detail",
        caption: "Visor and brow detail off the print bed.",
      },
      {
        type: "image",
        src: "/projects/robocop-cad.png",
        alt: "Onshape CAD model of the RoboCop helmet with the OCP POLICE 001 detailing",
        caption: "Onshape surface model — swept brow, domed crown, embossed “OCP POLICE 001.”",
      },
      {
        type: "image",
        src: "/projects/robocop-1987.jpg",
        alt: "RoboCop from the 1987 film in full armored suit — the reference the helmet model was based on",
        caption: "The 1987 film reference the silhouette was modeled from.",
      },
    ],
    imageLeft: true,
    extra: null,
  },
];

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Projects() {
  const rootRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  // Open a case study from the URL hash on first load (shareable deep links).
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    const match = PROJECTS.find((p) => p.id === id);
    if (match) setActiveProject(match);
  }, []);

  const openProject = (project) => {
    setActiveProject(project);
    window.history.replaceState(null, "", `#${project.id}`);
  };

  const closeProject = () => {
    setActiveProject(null);
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  };

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-spread]").forEach((spread) => {
        gsap.fromTo(
          spread,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: spread, start: "top 80%" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={rootRef} className="px-6 py-28 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs tracking-widest text-signal">
          03 / PROJECTS
        </p>
        <h2 className="mt-3 font-grotesk text-4xl font-bold tracking-tightest text-ghost sm:text-5xl">
          The Build Log
        </h2>
        <p className="mt-4 font-display text-xl italic text-muted">
          Five projects, written up the way I'd hand them off — the problem, the
          decisions, and the numbers behind each one.
        </p>

        <div className="mt-20 flex flex-col gap-20">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              id={project.id}
              data-spread
              style={{ scrollMarginTop: "6rem" }}
              className="project-card grid items-stretch overflow-hidden rounded-[2.5rem] border border-steel bg-iron lg:grid-cols-2"
            >
              {/* Visual side */}
              <div
                className={`relative min-h-[260px] min-w-0 ${
                  project.imageLeft ? "lg:order-1" : "lg:order-2"
                }`}
              >
                {project.media ? (
                  <MediaCarousel items={project.media} />
                ) : (
                  <div className="flex h-full items-center justify-center bg-iron p-8">
                    {project.extra}
                  </div>
                )}
              </div>

              {/* Content side */}
              <div
                className={`flex min-w-0 flex-col gap-5 p-8 sm:p-12 ${
                  project.imageLeft ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-mono text-xs tracking-widest text-signal">
                    {project.label}
                  </p>
                  <p className="font-mono text-[0.65rem] text-muted">
                    {project.date}
                  </p>
                </div>
                <h3 className="font-grotesk text-3xl font-bold tracking-tightest text-ghost">
                  {project.title}
                </h3>
                <p className="font-display text-xl italic text-muted">
                  {project.subtitle}
                </p>
                {project.body.map((para) => (
                  <p key={para.slice(0, 40)} className="font-sans text-sm text-muted">
                    {para}
                  </p>
                ))}
                {(project.caseStudy || project.link || project.model) && (
                  <div className="flex flex-wrap items-center gap-3">
                    {project.caseStudy && (
                      <button
                        type="button"
                        onClick={() => openProject(project)}
                        className="hover-card inline-flex w-fit items-center gap-2 rounded-full border border-steel bg-void px-4 py-2.5 font-mono text-[0.65rem] tracking-widest text-ghost"
                      >
                        READ CASE STUDY
                        <ArrowUpRight size={14} />
                      </button>
                    )}
                    {project.model && (
                      <button
                        type="button"
                        onClick={() => openProject(project)}
                        className="hover-card inline-flex w-fit items-center gap-2 rounded-full border border-signal/60 bg-signal/10 px-4 py-2.5 font-mono text-[0.65rem] tracking-widest text-signal"
                      >
                        <Box size={14} />
                        EXPLORE IN 3D
                      </button>
                    )}
                    {project.link &&
                      (project.link.style === "button" ? (
                        <a
                          href={project.link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="magnetic-btn inline-flex w-fit items-center gap-2.5 rounded-full bg-signal px-5 py-3 font-grotesk text-xs font-bold uppercase tracking-wide text-void"
                        >
                          <FileText size={16} />
                          {project.link.label}
                        </a>
                      ) : (
                        <a
                          href={project.link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="lift-link inline-flex items-center gap-2 font-mono text-xs tracking-widest text-signal"
                        >
                          {project.link.label} →
                        </a>
                      ))}
                  </div>
                )}
                {project.media && project.extra && (
                  <div className="min-w-0 py-2">{project.extra}</div>
                )}
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="skill-pill rounded-full border border-steel bg-void px-3.5 py-1.5 font-mono text-[0.65rem] text-ghost"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={closeProject} />
    </section>
  );
}
