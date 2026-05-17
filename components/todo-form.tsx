"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { addTodo } from "@/actions/todo/todo.actions";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { useFormStatus } from "react-dom";
import { todoSchema } from "@/actions/todo/schema";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="px-8 bg-[#6366f1] text-white hover:bg-[#4f46e5] font-medium rounded-lg transition-colors disabled:opacity-50"
    >
      Add
    </Button>
  );
}

export function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const [serverState, formAction] = useActionState(addTodo, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (serverState?.success) {
      formRef.current?.reset();
    }
  }, [serverState?.success]);

  const handleSubmit = (formData: FormData) => {
    const rawText = formData.get("text");
    const text = typeof rawText === "string" ? rawText.trim() : "";
    const validationResult = todoSchema.safeParse({ text });

    if (!validationResult.success) {
      setClientError(
        validationResult.error.issues[0]?.message || "Invalid input",
      );
      return;
    }

    setClientError(null);
    formAction(formData);
  };

  const displayError = clientError || serverState?.error;

  return (
    <div className="mb-10">
      <form ref={formRef} action={handleSubmit} className="flex gap-2">
        <Input name="text" placeholder="Add task..." className="flex-1" />
        <SubmitButton />
      </form>
      <div className="min-h-6 mt-1 px-1">
        {displayError && (
          <p className="text-sm text-red-500 font-medium">{displayError}</p>
        )}
      </div>
    </div>
  );
}
