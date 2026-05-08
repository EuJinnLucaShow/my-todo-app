"use client";

import { useRef } from "react";
import { addTodo } from "@/actions/todo";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

export function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    await addTodo(formData);
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} action={clientAction} className="flex gap-2 mb-10">
      <Input
        name="text"
        placeholder="Add task..."
        required
        className="flex-1"
      />
      <Button
        type="submit"
        className="px-8 bg-[#6366f1] text-white hover:bg-[#4f46e5] font-medium rounded-lg transition-colors"
      >
        Add
      </Button>
    </form>
  );
}
