/**
 * Pill button with "magnetic" scale hover and a sliding background
 * layer that fills on hover. Two variants: signal (solid accent)
 * and ghost (outline).
 */
export default function MagneticButton({
  as: Tag = "a",
  variant = "signal",
  className = "",
  children,
  ...props
}) {
  const isSignal = variant === "signal";
  return (
    <Tag
      className={`magnetic-btn group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 font-grotesk text-sm font-semibold uppercase tracking-wide ${
        isSignal
          ? "bg-signal text-void"
          : "border border-ghost/40 text-ghost"
      } ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 -translate-x-full transition-transform duration-300 ease-magnetic group-hover:translate-x-0 ${
          isSignal ? "bg-ghost" : "bg-signal"
        }`}
      />
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isSignal ? "" : "group-hover:text-void"
        }`}
      >
        {children}
      </span>
    </Tag>
  );
}
