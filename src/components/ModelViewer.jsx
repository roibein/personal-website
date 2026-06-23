import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/* Interactive glTF viewer — lazy-loads <model-viewer> so the ~300KB   */
/* three.js payload stays out of the initial bundle until a model is   */
/* actually opened. Drag to orbit, scroll/pinch to zoom.               */
/* ------------------------------------------------------------------ */
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

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-void">
        <span className="font-mono text-[0.65rem] tracking-widest text-muted">
          3D VIEWER UNAVAILABLE
        </span>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-void">
        <span className="animate-pulse font-mono text-[0.65rem] tracking-widest text-muted">
          LOADING 3D MODEL…
        </span>
      </div>
    );
  }

  const rotateProps = reduced
    ? {}
    : { "auto-rotate": true, "auto-rotate-delay": 600 };

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
