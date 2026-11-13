import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* One full loop through the duplicated strip used to take 36s (same as the old CSS marquee). */
const LOOP_DURATION_S = 36;
const STOP_LERP = 0.055;
const RESUME_LERP = 0.06;
const STOP_SPEED_EPS = 0.4;

function autoSpeedPxS(el) {
  const half = el.scrollWidth / 2;
  return half > 0 ? half / LOOP_DURATION_S : 0;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function wrapScrollLeft(el) {
  const half = el.scrollWidth / 2;
  if (half <= 0) return;
  if (el.scrollLeft >= half) el.scrollLeft -= half;
}

export default function ProjectMarquee({ projects }) {
  const viewportRef = useRef(null);
  const speedRef = useRef(0);
  const targetSpeedRef = useRef(0);
  const hoveringRef = useRef(false);
  const lastTimeRef = useRef(null);
  const [arrowsVisible, setArrowsVisible] = useState(false);

  const syncArrows = useCallback(() => {
    const stopped =
      hoveringRef.current &&
      targetSpeedRef.current === 0 &&
      Math.abs(speedRef.current) < STOP_SPEED_EPS;
    setArrowsVisible(stopped);
  }, []);

  const setHover = useCallback((active) => {
    hoveringRef.current = active;
    const el = viewportRef.current;
    if (active || prefersReducedMotion()) {
      targetSpeedRef.current = 0;
    } else if (el) {
      targetSpeedRef.current = autoSpeedPxS(el);
    }
    if (!active) setArrowsVisible(false);
  }, []);

  useEffect(() => {
    const reduced = prefersReducedMotion();

    let frame = 0;
    const tick = (now) => {
      const el = viewportRef.current;
      if (el) {
        if (lastTimeRef.current == null) lastTimeRef.current = now;
        const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
        lastTimeRef.current = now;

        if (!hoveringRef.current && !reduced) {
          const auto = autoSpeedPxS(el);
          if (auto > 0) targetSpeedRef.current = auto;
        }

        const target = targetSpeedRef.current;
        const lerp = target === 0 ? STOP_LERP : RESUME_LERP;
        let speed = speedRef.current + (target - speedRef.current) * lerp;
        if (target === 0 && Math.abs(speed) < STOP_SPEED_EPS) speed = 0;
        speedRef.current = speed;

        if (speed > 0) {
          el.scrollLeft += speed * dt;
          wrapScrollLeft(el);
        }

        syncArrows();
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [syncArrows]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || prefersReducedMotion()) return undefined;

    const apply = () => {
      if (hoveringRef.current) return;
      const auto = autoSpeedPxS(el);
      if (auto <= 0) return;
      targetSpeedRef.current = auto;
      if (speedRef.current < STOP_SPEED_EPS) speedRef.current = auto;
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [projects]);

  const onScroll = () => {
    const el = viewportRef.current;
    if (!el || speedRef.current > STOP_SPEED_EPS) return;
    wrapScrollLeft(el);
  };

  const nudge = (dir) => {
    viewportRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <div
      className="project-marquee relative"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHover(false);
      }}
    >
      <button
        type="button"
        aria-label="Scroll project highlights left"
        onClick={() => nudge(-1)}
        className={`icon-btn absolute left-1 top-1/2 z-10 -translate-y-1/2 transition-opacity duration-200 sm:left-2 ${
          arrowsVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        tabIndex={arrowsVisible ? 0 : -1}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Scroll project highlights right"
        onClick={() => nudge(1)}
        className={`icon-btn absolute right-1 top-1/2 z-10 -translate-y-1/2 transition-opacity duration-200 sm:right-2 ${
          arrowsVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        tabIndex={arrowsVisible ? 0 : -1}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>

      <div
        ref={viewportRef}
        className="project-marquee-viewport"
        onScroll={onScroll}
        tabIndex={0}
        role="region"
        aria-label="Scroll project highlights horizontally"
      >
        <div className="project-marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex gap-3 pr-3" aria-hidden={copy === 1 || undefined}>
              {projects.map((project) => (
                <li key={`${copy}-${project.id}`} className="h-36 w-56 shrink-0 sm:h-44 sm:w-72">
                  <a
                    href={`#${project.id}`}
                    aria-label={project.title}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="block h-full w-full overflow-hidden rounded-md border border-line bg-well"
                  >
                    <img
                      src={project.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full ${
                        project.fit === "contain" ? "object-contain p-2" : "object-cover"
                      }`}
                      style={
                        project.position ? { objectPosition: project.position } : undefined
                      }
                    />
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
