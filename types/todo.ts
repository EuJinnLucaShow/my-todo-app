import type { Todo } from "@/app/generated/prisma/client";

export interface TodoItemProps {
  todo: Todo;
  index: number;
}

export interface TodoListProps {
  initialTodos: Todo[];
}
