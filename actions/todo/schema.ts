import { z } from "zod";

export const todoSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Task cannot be empty")
    .min(3, "Task must be at least 3 characters")
    .max(100, "Task is too long")
    .refine(
      (val) => /[\p{L}\p{N}]/u.test(val),
      "Task must contain at least one letter or number",
    ),
});

export type TodoInput = z.infer<typeof todoSchema>;
