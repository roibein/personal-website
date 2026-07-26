import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/* Media carousel — every slide fits (object-contain) over a blurred   */
/* backdrop of itself, so CAD renders and photos all sit cleanly.      */
/* ------------------------------------------------------------------ */
export default function MediaCarousel({
  items,
  splitLayout = false,
  aspect = "aspect-[4/3] sm:aspect-[3/2]",
  pad = "p-5 sm:p-8",
}) {
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
      className={`flex w-full flex-col bg-void ${splitLayout ? "h-full min-h-0" : ""}`}
    >
      {/* Fixed-aspect frame — or flex-fill when stacked above a diagram (65/35 split) */}
      <div
        className={`relative w-full overflow-hidden ${
          splitLayout ? "min-h-0 flex-1" : aspect
        }`}
      >
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
              className={`absolute inset-0 h-full w-full object-contain ${pad}`}
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

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
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
          </>
        )}
      </div>

      {items[index]?.caption && (
        <div className="flex shrink-0 justify-center px-3 pb-3 pt-2.5">
          <p className="rounded-full border border-steel/80 bg-iron/95 px-4 py-2 text-center font-mono text-[0.78rem] leading-snug tracking-wide text-ghost shadow-lg shadow-void/70 backdrop-blur-sm">
            {items[index].caption}
          </p>
        </div>
      )}
    </div>
  );
}
