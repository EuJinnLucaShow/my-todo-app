"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { todoSchema } from "./schema";
import { ActionState } from "@/lib/types/action";

export async function getTodos() {
  return await prisma.todo.findMany({
    orderBy: { order: "asc" },
  });
}

export async function addTodo(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const validatedFields = todoSchema.safeParse({
    text: formData.get("text"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0]?.message || "Validation error",
      success: false,
    };
  }

  try {
    const minOrderTodo = await prisma.todo.findFirst({
      orderBy: { order: "asc" },
      select: { order: true },
    });

    const newOrder = minOrderTodo ? minOrderTodo.order - 1 : 0;

    await prisma.todo.create({
      data: {
        text: validatedFields.data.text,
        order: newOrder,
      },
    });
    revalidatePath("/");
    return { success: true, error: null };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Failed to create task", success: false };
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
  const validatedFields = todoSchema.safeParse({ text });

  if (!validatedFields.success) {
    return;
  }

  try {
    await prisma.todo.update({
      where: { id },
      data: { text: validatedFields.data.text },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Update text error:", error);
  }
}
