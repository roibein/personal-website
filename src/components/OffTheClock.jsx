import MediaCarousel from "./MediaCarousel.jsx";

// Order is deliberate — add or reorder photos here.
const PHOTOS = [
  { src: "/off-the-clock/pic-1.jpg", alt: "Standing on a city street at night" },
  { src: "/off-the-clock/pic-2.jpg", alt: "Kayaking on a lake with friends" },
  {
    src: "/off-the-clock/pic-3.jpg",
    alt: "With friends in a basketball arena, wearing Duke jerseys and blue face paint",
  },
  {
    src: "/off-the-clock/pic-4.jpg",
    alt: "On the platform of a zipline tower in helmets and harnesses",
  },
  { src: "/off-the-clock/pic-5.jpg", alt: "Selfie with two friends beside equipment trailers" },
  {
    src: "/off-the-clock/pic-6.jpg",
    alt: "In the stands with a crowd of Duke fans in blue jerseys",
  },
  {
    src: "/off-the-clock/pic-7.jpg",
    alt: "A piggyback ride in front of a Space Shuttle mounted on its carrier aircraft",
  },
  {
    src: "/off-the-clock/pic-8.jpg",
    alt: "A young boy in oversized sunglasses drinking through a straw",
  },
];

export default function OffTheClock() {
  return (
    <section id="off-the-clock" className="section" aria-labelledby="off-the-clock-title">
      <div className="container-page grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="off-the-clock-title" className="section-title">
            Off the clock
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-[1.0625rem]">
            Outside of engineering I'm a huge basketball fan: I play whenever I can and
            watch even more. I root for the Boston Celtics, the Connecticut Sun, and of
            course the Duke Blue Devils. I also train Brazilian Jiu-Jitsu, make music,
            watch a lot of movies, and enjoy old-school hip-hop.
          </p>
        </div>

        <div className="min-w-0 lg:col-span-7">
          {/* Autoplays until the visitor navigates or pauses. */}
          <MediaCarousel
            items={PHOTOS}
            label="Photos from outside engineering"
            autoplayMs={3500}
          />
        </div>
      </div>
    </section>
  );
}
