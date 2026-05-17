ALTER TABLE "Todo" RENAME TO "todos";

ALTER TABLE "todos" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "todos" RENAME COLUMN "updatedAt" TO "updated_at";

ALTER TABLE "todos" RENAME CONSTRAINT "Todo_pkey" TO "todos_pkey";
