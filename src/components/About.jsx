import MediaCarousel from "./MediaCarousel.jsx";

// Order is deliberate — add or reorder photos here.
const SLIDES = [
  {
    src: "/hero/hero-1-knee-brace-team.jpg",
    alt: "Roi and his teammates presenting the Aquatic Knee Stabilizer at the Duke design showcase",
  },
  {
    src: "/hero/hero-2-pulse-presentation.jpg",
    alt: "Roi explaining the Pulse research app to a visitor in front of a large display showing the app",
  },
  {
    src: "/hero/hero-3-me-and-brian.jpg",
    alt: "Roi and Brian looking over the Duke Formula SAE race car, with a driver seated in the cockpit",
  },
  {
    src: "/hero/hero-4-bobsled-team.jpg",
    alt: "Roi and his teammates presenting the Bobsled Bonanza toy at the design showcase",
  },
  {
    src: "/hero/hero-5-michelin.jpg",
    alt: "Roi standing next to a Michelin Man statue",
  },
];

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 id="about-title" className="section-title">
            About
          </h2>
          <div className="mt-6 flex max-w-xl flex-col gap-5 text-base leading-7 text-muted sm:text-[1.0625rem]">
            <p>
              I'm a sophomore at Duke studying mechanical engineering, with a certificate
              in aerospace engineering. Outside class, most of my time goes to Duke
              Motorsports, where I work on vehicle dynamics for our Formula SAE car, and
              to the Luck Biomechanics Lab, where I run drop-tower experiments and analyze
              the data in Python.
            </p>
            <p>
              I like projects that end in a physical part someone actually uses: a sensor
              mount that has to fit a steering rack, a knee brace that has to work in a
              pool. I also work at the Duke Co-Lab makerspace, training people on 3D
              printers, laser cutters, the waterjet, and the ShopBot CNC, and I write
              software when a project needs it. In summer 2026 I built iOS features for a
              Duke health-research app.
            </p>
            <p className="text-ink">
              I'm looking for internships in mechanical engineering, especially in
              automotive, aerospace, and medtech.
            </p>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          {/* Autoplays every 3.5s; the arrows don't stop it, the pause button does. */}
          <MediaCarousel
            items={SLIDES}
            label="Photos of Roi"
            aspect="aspect-square"
            autoplayMs={3500}
            keepPlayingOnNavigate
          />
        </div>
      </div>
    </section>
  );
}
