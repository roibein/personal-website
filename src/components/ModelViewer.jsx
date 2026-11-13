import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/* Interactive glTF viewer — lazy-loads <model-viewer> so the three.js */
/* payload stays out of the initial bundle until a model is opened.    */
/* Drag to orbit, scroll/pinch to zoom.                                */
/* ------------------------------------------------------------------ */
function Status({ children }) {
  return (
    <div className="flex h-full w-full items-center justify-center" role="status">
      <span className="text-sm text-muted">{children}</span>
    </div>
  );
}

export default function ModelViewer({ src, alt, poster }) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    let active = true;
    import("@google/model-viewer")
      .then(() => active && setReady(true))
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, []);

  if (failed) return <Status>The 3D viewer couldn't load. Try the photos instead.</Status>;
  if (!ready) return <Status>Loading 3D model…</Status>;

  // No auto-rotation for visitors who prefer reduced motion.
  const rotateProps = reduced ? {} : { "auto-rotate": true, "auto-rotate-delay": 600 };

  return (
    <model-viewer
      src={src}
      alt={alt}
      poster={poster}
      camera-controls
      touch-action="pan-y"
      interaction-prompt="auto"
      rotation-per-second="18deg"
      shadow-intensity="0.7"
      exposure="1.05"
      environment-image="neutral"
      {...rotateProps}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        "--poster-color": "transparent",
      }}
    />
  );
}
