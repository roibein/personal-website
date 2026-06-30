import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PHOTOS = [
  { src: "/off-the-clock/pic-1.jpg", alt: "Roi Bein off the clock — photo 1" },
  { src: "/off-the-clock/pic-2.jpg", alt: "Roi Bein off the clock — photo 2" },
  { src: "/off-the-clock/pic-3.jpg", alt: "Roi Bein off the clock — photo 3" },
  { src: "/off-the-clock/pic-4.jpg", alt: "Roi Bein off the clock — photo 4" },
  { src: "/off-the-clock/pic-5.jpg", alt: "Roi Bein off the clock — photo 5" },
  { src: "/off-the-clock/pic-6.jpg", alt: "Roi Bein off the clock — photo 6" },
  { src: "/off-the-clock/pic-7.jpg", alt: "Roi Bein off the clock — photo 7" },
];

function PhotoSlideshow() {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const count = PHOTOS.length;

  useEffect(() => {
    if (!autoplay || count <= 1) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 3000);
    return () => clearInterval(id);
  }, [autoplay, count]);

  const goTo = (i) => {
    setAutoplay(false);
    setIndex((i + count) % count);
  };

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-steel bg-void">
      {PHOTOS.map((photo, i) => (
        <div
          key={photo.src}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i === index ? undefined : true}
        >
          <img
            src={photo.src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
          />
          <div className="absolute inset-0 bg-void/40" />
          <img
            src={photo.src}
            alt={photo.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-contain p-3 sm:p-4"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-steel bg-void/60 p-2 text-ghost backdrop-blur transition-colors hover:bg-void hover:text-signal"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-steel bg-void/60 p-2 text-ghost backdrop-blur transition-colors hover:bg-void hover:text-signal"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute right-3 top-3 z-10 rounded-full bg-void/60 px-2.5 py-1 font-mono text-[0.6rem] tracking-widest text-ghost backdrop-blur">
        {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </div>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-signal" : "w-1.5 bg-ghost/40 hover:bg-ghost/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function OffTheClock() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-off-clock]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="off-the-clock" ref={rootRef} className="px-6 py-28 sm:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-off-clock className="flex flex-col gap-5">
          <p className="font-mono text-xs tracking-widest text-signal">
            05 / OFF THE CLOCK
          </p>
          <h2 className="font-grotesk text-4xl font-bold tracking-tightest text-ghost sm:text-5xl">
            Life Outside the Lab
          </h2>
          <p className="font-sans text-sm leading-relaxed text-muted sm:text-base">
            Outside of engineering, I am a huge basketball enthusiast: I play
            whenever I can and watch even more. I support the Boston Celtics,
            Connecticut Sun, and of course the Duke Blue Devils. I also train
            Brazilian Jiu-Jitsu, am a huge cinephile, challenge my friends in
            chess, and enjoy old-school hip-hop.
          </p>
        </div>

        <div data-off-clock>
          <PhotoSlideshow />
        </div>
      </div>
    </section>
  );
}
