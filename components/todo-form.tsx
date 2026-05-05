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
        className="px-4 py-2"
      />
      <Button
        type="submit"
        className="h-11 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition"
      >
        Add
      </Button>
    </form>
  );
}
