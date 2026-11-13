import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Box, ChevronDown, FileText, Presentation } from "lucide-react";
import MediaCarousel from "./MediaCarousel.jsx";
import Modal from "./Modal.jsx";
import ModelViewer from "./ModelViewer.jsx";
import { PROJECTS } from "../data/projects.js";

const FEATURED = PROJECTS.filter((p) => p.featured);
const MORE = PROJECTS.filter((p) => !p.featured);

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/* ------------------------------------------------------------------ */
/* Problem / My role / Methods / Result, set as a spec table           */
/* ------------------------------------------------------------------ */
function FactList({ facts, tags }) {
  return (
    <dl className="border-b border-line">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="grid gap-1 border-t border-line py-3.5 sm:grid-cols-[5.5rem_1fr] sm:gap-5"
        >
          <dt className="text-sm font-semibold leading-6 text-ink">{fact.label}</dt>
          <dd className="text-[0.9375rem] leading-6 text-muted">{fact.text}</dd>
        </div>
      ))}
      {tags?.length > 0 && (
        <div className="grid gap-1 border-t border-line py-3.5 sm:grid-cols-[5.5rem_1fr] sm:gap-5">
          <dt className="text-sm font-semibold leading-6 text-ink">Tools</dt>
          <dd className="text-[0.9375rem] leading-6 text-muted">{tags.join(" · ")}</dd>
        </div>
      )}
    </dl>
  );
}

function DocumentLink({ link }) {
  const Icon = link.external ? ArrowUpRight : FileText;
  return (
    <a href={link.href} target="_blank" rel="noreferrer" className="btn btn-secondary">
      <Icon size={16} aria-hidden="true" />
      {link.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Featured project — the full write-up, on the page                   */
/* ------------------------------------------------------------------ */
function FeaturedProject({ project, onOpen }) {
  // Side-by-side layouts show the write-up; on a phone it sits behind one tap
  // so four projects don't become seven screens of scrolling.
  const isWide = useMediaQuery("(min-width: 1024px)");
  const facts = <FactList facts={project.facts} tags={project.tags} />;

  return (
    <article
      id={project.id}
      className="grid gap-8 border-t border-line py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-12"
    >
      {/* min-w-0 lets the thumbnail strip scroll instead of widening the column. */}
      <div className="min-w-0 self-start lg:col-span-6">
        <MediaCarousel
          items={project.media}
          label={`${project.title} images`}
          thumbs
          autoplayMs={3500}
        />
      </div>

      <div className="min-w-0 lg:col-span-6">
        <p className="label">
          {project.category} · {project.context}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem] sm:leading-9">
          {project.title}
        </h3>
        <p className="mb-6 mt-3 text-base text-ink">{project.summary}</p>

        {isWide ? (
          facts
        ) : (
          <details className="group">
            <summary className="flex min-h-[2.75rem] cursor-pointer list-none items-center justify-between gap-4 border-y border-line py-3 text-sm font-semibold text-ink group-open:border-b-0 [&::-webkit-details-marker]:hidden">
              {project.facts.map((fact) => fact.label).join(" · ")}
              <ChevronDown
                size={18}
                aria-hidden="true"
                className="shrink-0 text-muted transition-transform duration-150 group-open:rotate-180"
              />
            </summary>
            {facts}
          </details>
        )}

        {(project.models || project.link || project.writeup || project.slides) && (
          <div className="mt-4 flex flex-wrap gap-3">
            {project.slides && (
              <button
                type="button"
                onClick={() => onOpen(project, "slides")}
                className="btn btn-secondary"
              >
                <Presentation size={16} aria-hidden="true" />
                Design review slides
              </button>
            )}
            {project.models && (
              <button
                type="button"
                onClick={() => onOpen(project, "model")}
                className="btn btn-primary"
              >
                <Box size={16} aria-hidden="true" />
                Explore 3D model
              </button>
            )}
            {project.writeup && (
              <button
                type="button"
                onClick={() => onOpen(project, "writeup")}
                className="btn btn-primary"
              >
                Read the full write-up
              </button>
            )}
            {project.link && <DocumentLink link={project.link} />}
          </div>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Smaller project — compact card that opens the details dialog        */
/* ------------------------------------------------------------------ */
function CompactProject({ project, onOpen }) {
  const cover = project.media[0];
  const fit = project.thumb?.fit === "contain" ? "object-contain" : "object-cover";
  return (
    <article id={project.id} className="group relative flex flex-col">
      <div className="aspect-[4/3] overflow-hidden rounded-lg border border-line bg-well transition-colors duration-150 group-hover:border-ink">
        <img
          src={cover.src}
          alt=""
          loading="lazy"
          decoding="async"
          className={`h-full w-full ${fit}`}
          style={{ objectPosition: project.thumb?.position }}
        />
      </div>
      <p className="label mt-4">
        {project.category} · {project.context}
      </p>
      <h4 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
        {/* The ::after stretches the button over the whole card. */}
        <button
          type="button"
          onClick={() => onOpen(project, "details")}
          className="text-left after:absolute after:inset-0 after:content-['']"
        >
          {project.title}
        </button>
      </h4>
      <p className="mt-1.5 text-sm leading-5 text-muted">{project.summary}</p>
      <p
        aria-hidden="true"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
      >
        View details
        <ArrowRight size={15} />
      </p>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Dialog — project details, the 3D viewer, or the long write-up       */
/* ------------------------------------------------------------------ */
function ProjectDialog({ project, mode, onMode, onClose }) {
  const [modelIndex, setModelIndex] = useState(0);
  const models = project.models ?? [];
  const slides = project.slides ?? [];
  const showModel = mode === "model" && models.length > 0;
  const showSlides = mode === "slides" && slides.length > 0;
  const activeModel = models[Math.min(modelIndex, models.length - 1)];
  const isWriteup = mode === "writeup" && project.writeup;

  return (
    <Modal
      label={showSlides ? `${project.title} slides` : project.title}
      onClose={onClose}
      maxWidth={isWriteup ? "max-w-3xl" : showSlides ? "max-w-5xl" : "max-w-4xl"}
    >
      <div className="flex min-w-0 flex-col gap-6 p-5 sm:p-8">
        <header>
          <p className="label pr-14">
            {showSlides ? "Design review" : `${project.category} · ${project.context}`}
          </p>
          <h2 className="mt-1 pr-14 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {project.title}
          </h2>
          {!showSlides && (
            <p className="mt-3 max-w-2xl text-base text-ink">{project.summary}</p>
          )}
        </header>

        {isWriteup ? (
          <Writeup writeup={project.writeup} />
        ) : showSlides ? (
          <MediaCarousel
            items={slides}
            label={`${project.title} slides`}
            aspect="aspect-video"
            thumbs
            autoplayMs={3500}
          />
        ) : (
          <>
            {models.length > 0 && (
              <div className="flex flex-wrap gap-2" role="group" aria-label="View">
                <button
                  type="button"
                  onClick={() => onMode("details")}
                  aria-pressed={!showModel}
                  className={`btn ${showModel ? "btn-secondary" : "btn-primary"}`}
                >
                  Photos
                </button>
                <button
                  type="button"
                  onClick={() => onMode("model")}
                  aria-pressed={showModel}
                  className={`btn ${showModel ? "btn-primary" : "btn-secondary"}`}
                >
                  <Box size={16} aria-hidden="true" />
                  3D model
                </button>
              </div>
            )}

            {showModel ? (
              <div className="flex flex-col gap-3">
                <div className="relative h-[55vh] min-h-[320px] w-full overflow-hidden rounded-lg border border-line bg-well">
                  <ModelViewer key={activeModel.src} src={activeModel.src} alt={activeModel.alt} />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-muted">Drag to rotate. Scroll or pinch to zoom.</p>
                  {models.length > 1 && (
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Model">
                      {models.map((model, i) => (
                        <button
                          key={model.src}
                          type="button"
                          onClick={() => setModelIndex(i)}
                          aria-pressed={i === modelIndex}
                          className={`btn ${i === modelIndex ? "btn-primary" : "btn-secondary"}`}
                        >
                          {model.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="mx-auto w-full min-w-0 max-w-2xl">
                <MediaCarousel
                  items={project.media}
                  label={`${project.title} images`}
                  aspect="aspect-[3/2]"
                  thumbs
                  autoplayMs={3500}
                />
              </div>
            )}

            {/* Featured projects already show their write-up on the page. */}
            {!project.featured && <FactList facts={project.facts} tags={project.tags} />}

            {project.equations && <Equations rows={project.equations} />}

            {!project.featured && project.link && (
              <div>
                <DocumentLink link={project.link} />
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}

function Equations({ rows }) {
  return (
    <section aria-label="SolidWorks global variables">
      <h3 className="text-sm font-semibold text-ink">
        SolidWorks global variables, copied from the model
      </h3>
      <div
        tabIndex={0}
        className="mt-3 overflow-x-auto rounded-lg border border-line bg-well p-4 font-mono text-[0.8125rem] leading-6"
      >
        {rows.map(([name, value]) => (
          <div key={name} className="flex gap-2 whitespace-nowrap">
            <span className="text-accent">{name}</span>
            <span className="text-muted">=</span>
            <span className="text-ink">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Writeup({ writeup }) {
  return (
    <div className="flex flex-col gap-8">
      {writeup.sections.map((section) => (
        <section key={section.heading}>
          <h3 className="font-display text-lg font-semibold text-ink">{section.heading}</h3>
          {section.body && (
            <p className="mt-2 text-[0.9375rem] leading-7 text-muted">{section.body}</p>
          )}
          {section.items && (
            <dl className="mt-3 border-b border-line">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="grid gap-1 border-t border-line py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-5"
                >
                  <dt className="text-sm font-semibold leading-6 text-ink">{item.name}</dt>
                  <dd className="text-[0.9375rem] leading-6 text-muted">{item.body}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      ))}
      <section>
        <h3 className="font-display text-lg font-semibold text-ink">Stack</h3>
        <p className="mt-2 text-[0.9375rem] leading-7 text-muted">{writeup.stack.join(" · ")}</p>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
const clearHash = () =>
  window.history.replaceState(null, "", window.location.pathname + window.location.search);

export default function Projects() {
  const [dialog, setDialog] = useState(null); // { project, mode }

  // Deep links: /#knee-brace scrolls to a featured project,
  // /#cd-display-case opens that project's details. Also handles clicks
  // from the hero strip after the page has loaded.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      const project = PROJECTS.find((p) => p.id === id);
      if (!project) return;
      if (project.featured) {
        setDialog(null);
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
      } else {
        setDialog({ project, mode: "details" });
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const openProject = useCallback((project, mode) => {
    setDialog({ project, mode });
    if (!project.featured) window.history.replaceState(null, "", `#${project.id}`);
  }, []);

  const closeProject = () => {
    if (dialog && !dialog.project.featured) clearHash();
    setDialog(null);
  };

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container-page">
        <h2 id="projects-title" className="section-title">
          Projects
        </h2>

        <div className="mt-12">
          {FEATURED.map((project) => (
            <FeaturedProject key={project.id} project={project} onOpen={openProject} />
          ))}
        </div>

        <div className="border-t border-line pt-12">
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
            More projects
          </h3>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
            {MORE.map((project) => (
              <CompactProject key={project.id} project={project} onOpen={openProject} />
            ))}
          </div>
        </div>
      </div>

      {dialog && (
        <ProjectDialog
          key={dialog.project.id}
          project={dialog.project}
          mode={dialog.mode}
          onMode={(mode) => setDialog((current) => ({ ...current, mode }))}
          onClose={closeProject}
        />
      )}
    </section>
  );
}
