"use client";

import { useState, useTransition, useOptimistic, useRef } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { updateTodoText, toggleTodo, deleteTodo } from "@/actions/todo";
import { Input } from "@/ui/input";
import type { TodoItemProps } from "@/types/todo";
import { Button } from "@/ui/button";
import { CheckIcon, CloseIcon, EditIcon, TrashIcon } from "@/ui/icons";
import { ConfirmModal } from "@/components/confirm-modal";

export function TodoItem({ todo, index }: Readonly<TodoItemProps>) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const isSavingRef = useRef(false);

  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(
    todo.completed,
  );

  const handleSave = async () => {
    const trimmed = text.trim();
    if (trimmed === "") {
      setText(todo.text);
    } else if (trimmed !== todo.text) {
      await updateTodoText(todo.id, trimmed);
    }
    setIsEditing(false);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setText(todo.text);
    setIsEditing(false);
    setShowConfirm(false);
  };

  const handleBlur = () => {
    if (isSavingRef.current) return;

    const trimmed = text.trim();
    const hasChanges = trimmed !== "" && trimmed !== todo.text;

    if (hasChanges) {
      setShowConfirm(true);
    } else {
      handleCancel();
    }
  };

  const handleToggle = () => {
    startTransition(async () => {
      setOptimisticCompleted(!optimisticCompleted);
      await toggleTodo(todo.id, !todo.completed);
    });
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    startTransition(async () => {
      await deleteTodo(todo.id);
    });
  };

  return (
    <>
      <Draggable draggableId={String(todo.id)} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
            className="pb-4"
          >
            <div
              className={`
              group flex items-center gap-3 px-3 py-2.5 min-h-14 rounded-xl border
              transition-all cursor-grab active:cursor-grabbing
              ${
                snapshot.isDragging
                  ? "bg-slate-50 border-indigo-300 shadow-xl scale-[1.02] dark:bg-indigo-950/40 dark:border-slate-600"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-sm dark:bg-[#1f1f3a] dark:border-slate-800 dark:hover:border-slate-600"
              }
            `}
            >
              {!isEditing && (
                <button
                  type="button"
                  disabled={isPending || isEditing}
                  onClick={handleToggle}
                  aria-label={
                    optimisticCompleted
                      ? "Mark as incomplete"
                      : "Mark as complete"
                  }
                  className={`
              flex items-center justify-center w-5 h-5 rounded-full border
              transition-all shrink-0
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
              ${
                optimisticCompleted
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-slate-300 hover:border-slate-400 dark:border-gray-600 dark:hover:border-gray-400 bg-transparent"
              }
            `}
                >
                  {optimisticCompleted && <CheckIcon />}
                </button>
              )}

              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <Input
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        isSavingRef.current = true;
                        handleSave().finally(() => {
                          isSavingRef.current = false;
                        });
                      }
                      if (e.key === "Escape") {
                        isSavingRef.current = true;
                        handleCancel();
                        isSavingRef.current = false;
                      }
                    }}
                    className="
                  h-8 pl-8 w-full bg-transparent border-slate-300 text-slate-900 
                  dark:border-gray-700 dark:text-slate-100
                  focus-visible:ring-1 focus-visible:ring-blue-500
                "
                  />
                ) : (
                  <span
                    className={`
                  block truncate text-sm transition-colors
                  ${
                    optimisticCompleted
                      ? "line-through text-slate-400 dark:text-gray-500"
                      : "text-slate-700 dark:text-gray-200"
                  }
                `}
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              <div
                className={`
              flex items-center gap-1 transition-opacity
              ${
                isEditing
                  ? "opacity-100"
                  : "opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
              }
              `}
              >
                {isEditing ? (
                  <>
                    <Button
                      variant="icon"
                      onClick={handleSave}
                      title="Save"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-500 dark:hover:text-green-400 dark:hover:bg-green-500/10"
                    >
                      <CheckIcon />
                    </Button>

                    <Button
                      variant="icon"
                      onClick={handleCancel}
                      title="Cancel"
                      className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10"
                    >
                      <CloseIcon />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="icon"
                      onClick={() => setIsEditing(true)}
                      title="Edit"
                      className="text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      variant="icon"
                      disabled={isPending}
                      onClick={() => setShowDeleteConfirm(true)}
                      title="Delete"
                      className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:text-red-400/70 dark:hover:text-red-500 dark:hover:bg-red-500/10 disabled:opacity-50"
                    >
                      <TrashIcon />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </Draggable>

      {showConfirm && (
        <ConfirmModal
          title="Save changes?"
          description="You have made changes to the task. Do you want to save or discard them?"
          onConfirm={handleSave}
          onCancel={handleCancel}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmModal
          title="Delete task?"
          description="Are you sure you want to delete this task? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          confirmLabel="Delete"
        />
      )}
    </>
  );
}
