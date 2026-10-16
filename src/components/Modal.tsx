"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
export default function Modal({
  open,
  onClose,
  title,
  kind = "",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  kind?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const motion = gsap.context(() => {
      if (
        !matchMedia("(prefers-reduced-motion: reduce)").matches &&
        kind === "menu-modal"
      ) {
        gsap.from(dialog.querySelectorAll("nav a"), {
          y: 70,
          rotationX: -20,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "expo.out",
          delay: 0.1,
        });
      }
    }, dialog);
    const scroll = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      motion.revert();
      dialog.close();
      document.documentElement.style.overflow = scroll;
      previous?.focus({ preventScroll: true });
    };
  }, [open, kind]);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      className={`modal ${kind}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="modal-inner">
        <button
          autoFocus
          className="icon-button modal-close"
          aria-label={`Close ${title.toLowerCase()}`}
          onClick={onClose}
        >
          <X size={22} />
        </button>
        {open && children}
      </div>
    </dialog>
  );
}
