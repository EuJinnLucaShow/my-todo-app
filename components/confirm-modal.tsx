"use client";

import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { Button } from "@/ui/button";
import { useIsClient } from "@/hooks/useIsClient";
import { CloseIcon } from "@/ui/icons";

interface ConfirmModalProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  title,
  description,
  confirmLabel = "Save",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: Readonly<ConfirmModalProps>) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const isClient = useIsClient();

  const isDanger = confirmLabel.toLowerCase() === "delete";

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  if (!isClient) return null;

  const theme = isDanger
    ? {
        btnConfirm:
          "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 shadow-red-500/25",
      }
    : {
        btnConfirm:
          "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-cyan-500/25",
      };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm">
      <div className="pointer-events-none fixed inset-0 z-99 flex items-center justify-center p-4">
        <dialog
          ref={modalRef}
          open
          className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-2xl border border-cyan-500/40 bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-950 shadow-2xl"
          style={{
            boxShadow:
              "0 0 60px rgba(6, 182, 212, 0.4), 0 0 100px rgba(168, 85, 247, 0.2), inset 0 0 80px rgba(6, 182, 212, 0.08)",
          }}
          aria-modal="true"
        >
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-cyan-500/15 via-transparent to-fuchsia-500/15" />
          <div className="absolute -inset-2 animate-pulse rounded-2xl bg-linear-to-r from-cyan-500 via-fuchsia-500 to-cyan-500 opacity-30 blur-2xl" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/50 to-transparent" />

          <Button
            type="button"
            variant="icon"
            onClick={onCancel}
            autoFocus
            aria-label="Close modal"
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500/30 bg-zinc-800/80 text-cyan-400 transition-all hover:border-cyan-400/50 hover:bg-zinc-700/80 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <CloseIcon />
          </Button>

          <div className="relative space-y-6 p-6">
            <div className="space-y-2 pr-6">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {title}
              </h2>
              <div className="rounded-xl border border-cyan-500/30 bg-linear-to-r from-cyan-500/15 via-fuchsia-500/10 to-cyan-500/15 p-4 backdrop-blur-sm">
                <p className="text-sm leading-relaxed text-zinc-400">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="icon"
                onClick={onCancel}
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800/50 py-2.5 font-medium text-zinc-300 transition-all hover:bg-zinc-700 hover:text-white"
              >
                {cancelLabel}
              </Button>
              <Button
                variant="icon"
                onClick={onConfirm}
                className={`flex-1 rounded-xl py-2.5 font-semibold text-white shadow-lg transition-all ${theme.btnConfirm}`}
              >
                {confirmLabel}
              </Button>
            </div>
          </div>
        </dialog>
      </div>
    </div>,
    document.body,
  );
}
