import { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/* One gallery for the whole site: project photos, CAD renders, app    */
/* screenshots, and the personal slideshows.                           */
/*                                                                     */
/* Every image is shown whole (object-contain) in a fixed-aspect       */
/* frame, so mixed portrait/landscape sets never crop or shift layout. */
/*                                                                     */
/* items:      [{ src, alt, caption? }]                                */
/* label:      accessible name, e.g. "Knee brace photos"               */
/* thumbs:     show a thumbnail strip instead of dots                  */
/* autoplayMs: 0 = manual only. Autoplay never starts under            */
/*             prefers-reduced-motion and always has a pause button.   */
/* keepPlayingOnNavigate: arrows don't stop autoplay (About slideshow) */
/* ------------------------------------------------------------------ */
export default function MediaCarousel({
  items,
  label,
  aspect = "aspect-[4/3]",
  thumbs = false,
  autoplayMs = 0,
  keepPlayingOnNavigate = false,
  eager = false,
}) {
  const count = items.length;
  const captionId = useId();
  const frameRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(
    () => autoplayMs > 0 && count > 1 && !prefersReducedMotion()
  );

  // Only advance while the gallery is actually on screen.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !autoplayMs) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoplayMs]);

  useEffect(() => {
    if (!playing || !inView) return undefined;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), autoplayMs);
    return () => clearTimeout(id);
  }, [playing, inView, index, count, autoplayMs]);

  const goTo = (i) => {
    if (!keepPlayingOnNavigate) setPlaying(false);
    setIndex((i + count) % count);
  };

  const onKeyDown = (event) => {
    if (count < 2) return;
    if (event.key === "ArrowLeft") goTo(index - 1);
    if (event.key === "ArrowRight") goTo(index + 1);
  };

  const active = items[index];
  // Reserve two caption lines so the layout below doesn't jump between slides.
  const captionSpace =
    count > 1 && items.some((item) => item.caption) ? "min-h-[2.5rem]" : "";

  return (
    <figure
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="flex w-full min-w-0 flex-col gap-3"
    >
      <div
        ref={frameRef}
        className={`relative w-full overflow-hidden rounded-lg border border-line bg-well ${aspect}`}
      >
        {items.map((item, i) => (
          <img
            key={item.src}
            src={item.src}
            alt={i === index ? item.alt : ""}
            aria-hidden={i === index ? undefined : true}
            aria-describedby={i === index && item.caption ? captionId : undefined}
            loading={eager && i === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`slide absolute inset-0 h-full w-full object-contain ${
              i === index ? "is-active" : ""
            }`}
          />
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
              className="icon-btn absolute left-2 top-1/2 -translate-y-1/2"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
              className="icon-btn absolute right-2 top-1/2 -translate-y-1/2"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </>
        )}

        {autoplayMs > 0 && count > 1 && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="icon-btn absolute bottom-2 right-2"
          >
            {playing ? (
              <Pause size={16} aria-hidden="true" />
            ) : (
              <Play size={16} aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {/* Caption + position. Announced on manual navigation, silent while autoplaying. */}
      <figcaption
        id={captionId}
        aria-live={playing ? "off" : "polite"}
        className={`flex items-baseline justify-between gap-4 text-sm leading-5 text-muted ${captionSpace}`}
      >
        <span>{active.caption}</span>
        {count > 1 && (
          <span className="shrink-0 font-mono text-xs tabular-nums">
            {index + 1} / {count}
          </span>
        )}
      </figcaption>

      {count > 1 &&
        (thumbs ? (
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:thin]">
            {items.map((item, i) => (
              <button
                key={item.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show image ${i + 1} of ${count}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-14 w-14 shrink-0 overflow-hidden rounded-md border bg-well transition-opacity duration-150 ${
                  i === index
                    ? "border-accent opacity-100 ring-2 ring-accent"
                    : "border-line opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-1">
            {items.map((item, i) => (
              <button
                key={item.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show image ${i + 1} of ${count}`}
                aria-current={i === index ? "true" : undefined}
                className="group flex h-8 w-8 items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-150 ${
                    i === index
                      ? "w-5 bg-accent"
                      : "w-2 bg-muted/40 group-hover:bg-muted"
                  }`}
                />
              </button>
            ))}
          </div>
        ))}
    </figure>
  );
}
