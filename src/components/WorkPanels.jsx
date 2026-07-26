import { useEffect } from "react";
import { X } from "lucide-react";
import MediaCarousel from "./MediaCarousel.jsx";

export function workModalMaxWidth(work) {
  if (work?.kind === "app") return "max-w-5xl";
  return "max-w-4xl";
}

export function WorkModalShell({ label, onClose, maxWidth, children }) {
  useEffect(() => {
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
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex overflow-y-auto bg-void/80 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div
        className={`relative m-auto w-full ${maxWidth} overflow-hidden rounded-[2rem] border border-steel bg-iron`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project work"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-steel bg-void/70 text-ghost backdrop-blur transition-colors hover:border-signal hover:text-signal"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}

export function AnalysisWorkPanel({ work }) {
  return (
    <div className="flex flex-col gap-6 p-8 sm:p-10">
      <p className="font-mono text-[0.65rem] tracking-widest text-signal">
        {work.label}
      </p>
      <p className="max-w-3xl font-sans text-sm leading-relaxed text-muted">
        {work.method}
      </p>
      <div className="grid gap-4 border-t border-steel pt-6 sm:grid-cols-3">
        {work.plots.map((plot) => (
          <figure key={plot.src} className="flex flex-col gap-2.5">
            <img
              src={plot.src}
              alt={plot.alt}
              loading="lazy"
              className="w-full rounded-[0.6rem] border border-steel bg-ghost p-2"
            />
            <figcaption className="px-1 text-center font-mono text-[0.68rem] leading-snug tracking-wide text-muted">
              {plot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function AppWorkPanel({ work }) {
  return (
    <>
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-b-[1.5rem] border-b border-steel">
        <MediaCarousel
          items={work.media}
          aspect="aspect-[4/5]"
          pad="p-3 sm:p-4"
        />
      </div>

      <div className="flex flex-col gap-8 p-8 sm:p-10">
        <p className="font-mono text-[0.65rem] tracking-widest text-signal">
          {work.label}
        </p>

        {work.sections.map((section) => (
          <div key={section.heading} className="flex flex-col gap-3">
            <h4 className="font-mono text-[0.6rem] tracking-widest text-ghost/70">
              {section.heading}
            </h4>
            {section.body && (
              <p className="max-w-3xl font-sans text-sm leading-relaxed text-muted">
                {section.body}
              </p>
            )}
            {section.items && (
              <ol className="mt-1 grid gap-4 sm:grid-cols-2">
                {section.items.map((item, i) => (
                  <li
                    key={item.name}
                    className="rounded-[1rem] border border-steel bg-void/60 p-5"
                  >
                    <p className="flex items-baseline gap-2.5 font-grotesk text-sm font-bold text-ghost">
                      <span className="font-mono text-[0.65rem] text-signal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.name}
                    </p>
                    <p className="mt-2 font-sans text-[0.82rem] leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-3 border-t border-steel pt-7">
          <h4 className="font-mono text-[0.6rem] tracking-widest text-ghost/70">
            STACK
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {work.stack.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-steel bg-void px-3.5 py-1.5 font-mono text-[0.65rem] text-ghost"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function CaseStudyWorkPanel({ work }) {
  return (
    <>
      {work.media && (
        <MediaCarousel
          items={work.media}
          aspect={work.mediaAspect}
          pad={work.mediaPad}
        />
      )}

      <div className="flex flex-col gap-6 p-8 sm:p-10">
        <p className="font-mono text-[0.65rem] tracking-widest text-signal">
          {work.label}
        </p>

        <div className="flex flex-col gap-5 border-t border-steel pt-6">
          {work.blocks.map((block) => (
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

        {work.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-steel pt-6">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-steel bg-void px-3.5 py-1.5 font-mono text-[0.65rem] text-ghost"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export function WorkPanel({ work }) {
  if (work.kind === "app") return <AppWorkPanel work={work} />;
  if (work.kind === "caseStudy") return <CaseStudyWorkPanel work={work} />;
  return <AnalysisWorkPanel work={work} />;
}

export function WorkModal({ work, onClose }) {
  if (!work) return null;

  return (
    <WorkModalShell
      label={work.label}
      onClose={onClose}
      maxWidth={workModalMaxWidth(work)}
    >
      <WorkPanel work={work} />
    </WorkModalShell>
  );
}
