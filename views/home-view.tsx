import { getTodos } from "@/actions/todo";
import { TodoForm } from "@/components/todo-form";
import { TodoList } from "@/components/todo-list";
import { TodoFilter } from "@/components/todo-filter";
import { Suspense } from "react";

interface HomeViewProps {
  filter?: string;
}

export async function HomeView({ filter }: Readonly<HomeViewProps>) {
  let todos = await getTodos();

  if (filter === "active") todos = todos.filter((t) => !t.completed);
  if (filter === "completed") todos = todos.filter((t) => t.completed);

  return (
    <main className="md:min-w-xl min-w-full mx-auto pt-6 max-md:px-2.5">
      <h1 className="text-3xl font-bold mb-8 text-center">TODO List</h1>

      <TodoForm />

      <Suspense fallback={<div className="h-10" />}>
        <TodoFilter />
      </Suspense>

      {todos.length === 0 ? (
        <p className="text-center text-gray-600">The list is empty.</p>
      ) : (
        <TodoList initialTodos={todos} />
      )}
    </main>
  );
}
