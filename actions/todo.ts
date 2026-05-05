"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  return await prisma.todo.findMany({
    orderBy: { order: "asc" },
  });
}

export async function addTodo(formData: FormData) {
  const text = formData.get("text") as string;
  if (!text || text.trim() === "") return;

  try {
    const minOrderTodo = await prisma.todo.findFirst({
      orderBy: { order: "asc" },
      select: { order: true },
    });

    const newOrder = minOrderTodo ? minOrderTodo.order - 1 : 0;

    await prisma.todo.create({
      data: {
        text,
        order: newOrder,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Database error:", error);
  }
}

export async function toggleTodo(id: string, completed: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { completed },
  });
  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({
    where: { id },
  });
  revalidatePath("/");
}

export async function reorderTodos(ids: string[]) {
  try {
    const transactions = ids.map((id, index) =>
      prisma.todo.update({
        where: { id },
        data: { order: index },
      }),
    );

    await prisma.$transaction(transactions);
    revalidatePath("/");
  } catch (error) {
    console.error("Reorder error:", error);
  }
}

export async function updateTodoText(id: string, text: string) {
  if (!text || text.trim() === "") return;
  await prisma.todo.update({
    where: { id },
    data: { text },
  });
  revalidatePath("/");
}
