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
    <div className="fixed inset-0 z-100 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm transition-colors">
      <div className="pointer-events-none fixed inset-0 z-99 flex items-center justify-center p-4">
        <dialog
          ref={modalRef}
          open
          className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-2xl border transition-all
            bg-white border-indigo-100 shadow-2xl shadow-indigo-500/10
            dark:bg-zinc-950 dark:border-cyan-500/40 dark:bg-linear-to-br dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950
            modal-neon-shadow"
          aria-modal="true"
        >
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-cyan-500/15 dark:via-transparent dark:to-fuchsia-500/15" />

          <div
            className="absolute -inset-2 animate-pulse rounded-2xl bg-linear-to-r blur-2xl 
            from-indigo-400 via-purple-400 to-indigo-400 opacity-10 
            dark:from-cyan-500 dark:via-fuchsia-500 dark:to-cyan-500 dark:opacity-30"
          />

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-white/60 to-transparent dark:from-zinc-950/50" />

          <Button
            type="button"
            variant="icon"
            onClick={onCancel}
            autoFocus
            aria-label="Close modal"
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500
              border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 
              dark:border-cyan-500/30 dark:bg-zinc-800/80 dark:text-cyan-400 dark:hover:border-cyan-400/50 dark:hover:bg-zinc-700/80"
          >
            <CloseIcon />
          </Button>

          <div className="relative space-y-6 p-6">
            <div className="space-y-2 pr-6">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {title}
              </h2>
              <div
                className="rounded-xl border p-4 backdrop-blur-sm
                bg-indigo-50/50 border-indigo-100
                dark:bg-transparent dark:border-cyan-500/30 dark:bg-linear-to-r dark:from-cyan-500/15 dark:via-fuchsia-500/10 dark:to-cyan-500/15"
              >
                <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="icon"
                onClick={onCancel}
                className="flex-1 rounded-xl border py-2.5 font-medium transition-all
                  border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm
                  dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white dark:shadow-none"
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
