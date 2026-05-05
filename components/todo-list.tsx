"use client";

import { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { reorderTodos } from "@/actions/todo";
import { TodoListProps } from "@/types/todo";
import { Todo } from "@/app/generated/prisma/client";
import { TodoItem } from "./todo-item";

export function TodoList({ initialTodos }: Readonly<TodoListProps>) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [prevInitialTodos, setPrevInitialTodos] = useState(initialTodos);

  if (initialTodos !== prevInitialTodos) {
    setTodos(initialTodos);
    setPrevInitialTodos(initialTodos);
  }

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
    await reorderTodos(items.map((i) => i.id));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="w-full"
          >
            {todos.map((todo, index) => (
              <TodoItem key={todo.id} todo={todo} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
