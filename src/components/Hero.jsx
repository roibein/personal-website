import { ArrowRight } from "lucide-react";
import { PROJECTS } from "../data/projects.js";
import { EMAIL, LINKEDIN_URL, RESUME_URL } from "../data/site.js";

const HIDDEN_FROM_STRIP = new Set(["cd-display-case", "robocop-helmet"]);

const PROJECT_PREVIEWS = PROJECTS.filter((project) => !HIDDEN_FROM_STRIP.has(project.id)).map(
  (project) => ({
    id: project.id,
    title: project.title,
    src: project.media[0].src,
    alt: project.media[0].alt,
    fit: project.thumb?.fit,
    position: project.thumb?.position,
  }),
);

const FACTS = [
  {
    label: "Degree",
    value: "BSE Mechanical Engineering",
    detail: "Duke University, May 2029",
  },
  {
    label: "Certificate",
    value: "Aerospace Engineering",
  },
  {
    label: "GPA",
    value: "3.96",
  },
];

export default function Hero() {
  return (
    <section id="hero" className="pt-28 sm:pt-36" aria-labelledby="hero-name">
      <div className="container-page">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {/* Breaks after the major on phones instead of orphaning "2029". */}
            <p className="text-sm font-semibold text-accent sm:text-base">
              <span className="block sm:inline">Mechanical Engineering</span>
              <span className="hidden sm:inline"> · </span>
              <span className="block sm:inline">Duke University · Class of 2029</span>
            </p>
            <h1
              id="hero-name"
              className="mt-4 font-display text-[clamp(3.25rem,9vw,6rem)] font-bold leading-none tracking-tight text-ink"
            >
              Roi Bein
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink sm:text-xl">
              I'm a mechanical engineering sophomore who designs, builds, and tests
              hardware. Right now that means vehicle dynamics on Duke's Formula SAE team
              and biomechanics research in the Luck Lab.
            </p>
            <p className="mt-4 text-base text-muted">
              Open to internships. Available anywhere.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-primary">
                View projects
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                Resume (PDF)
              </a>
            </div>
            <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href={`mailto:${EMAIL}`} className="link py-1">
                {EMAIL}
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="link py-1">
                LinkedIn
              </a>
            </p>
          </div>

          <figure className="order-first lg:order-none lg:col-span-5 lg:justify-self-end">
            <img
              src="/headshot.jpg"
              alt="Roi Bein in a suit beneath the Gothic stone archways at Duke University"
              width="1400"
              height="933"
              fetchPriority="high"
              className="aspect-square w-28 rounded-lg object-cover object-[50%_25%] sm:w-36 lg:aspect-[4/5] lg:w-[22rem]"
            />
          </figure>
        </div>

        <dl className="mt-12 grid grid-cols-2 border-t border-line sm:mt-16 lg:grid-cols-3">
          {FACTS.map((fact) => (
            <div
              key={fact.label}
              className="border-line py-5 pr-4 [&:nth-child(-n+2)]:border-b lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:[&:nth-child(-n+2)]:border-b-0 last:col-span-2 last:border-b-0 last:pr-4 sm:last:col-span-1"
            >
              <dt className="label">{fact.label}</dt>
              <dd className="mt-1 font-display text-lg font-semibold leading-6 tracking-tight text-ink">
                {fact.value}
              </dd>
              {fact.detail && (
                <dd className="mt-1 text-sm font-normal text-muted">{fact.detail}</dd>
              )}
            </div>
          ))}
        </dl>

        <div
          className="project-marquee mt-8 border-t border-line pt-6 sm:mt-10"
          aria-label="Project highlights"
        >
          <div className="project-marquee-track">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex gap-3 pr-3" aria-hidden={copy === 1 || undefined}>
                {PROJECT_PREVIEWS.map((project) => (
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
                        style={project.position ? { objectPosition: project.position } : undefined}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
