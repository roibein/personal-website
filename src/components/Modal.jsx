import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Accessible dialog built on the native <dialog> element, which       */
/* handles the focus trap, Escape, an inert background, and returning  */
/* focus to the button that opened it.                                 */
/* ------------------------------------------------------------------ */
export default function Modal({
  label,
  onClose,
  maxWidth = "max-w-3xl",
  closeLabel = "Close",
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  // Clicking the dimmed backdrop (the dialog element itself) closes it.
  const onBackdropClick = (event) => {
    if (event.target === ref.current) ref.current.close();
  };

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={onBackdropClick}
      className={`m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] ${maxWidth} overflow-y-auto overscroll-contain rounded-xl border border-line bg-paper p-0 text-ink shadow-2xl backdrop:bg-black/60`}
    >
      <div className="sticky top-0 z-20 flex h-0 justify-end">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={closeLabel}
          className="icon-btn mr-3 mt-3 shrink-0"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
