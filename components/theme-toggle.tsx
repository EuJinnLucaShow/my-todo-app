"use client";

import { useIsClient } from "@/hooks/useIsClient";
import { Button } from "@/ui/button";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  const isClient = useIsClient();

  if (!isClient) {
    return <div className="w-10 h-10" />;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="cursor-pointer p-2 rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? "☀️" : "🌙"}
    </Button>
  );
}
