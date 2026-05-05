import { Button } from "@/ui/button";

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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#1f1f3a] border border-gray-700 rounded-2xl p-6 w-80 shadow-2xl">
        <h2 className="text-white font-semibold text-base mb-1">{title}</h2>
        <p className="text-gray-400 text-sm mb-5">{description}</p>
        <div className="flex gap-2 justify-end">
          <Button
            variant="icon"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
          >
            {cancelLabel}
          </Button>
          <Button
            variant="icon"
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
