"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function TodoFilter() {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "all";

  const filters = [
    { name: "All", value: "all", href: "/" },
    { name: "Active", value: "active", href: "/?filter=active" },
    { name: "Completed", value: "completed", href: "/?filter=completed" },
  ];

  return (
    <div className="flex justify-center gap-6 mb-8 text-sm font-medium">
      {filters.map((f) => (
        <Link
          key={f.value}
          href={f.href}
          className={`transition-colors ${
            currentFilter === f.value
              ? "text-blue-500 dark:text-blue-500"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          {f.name}
        </Link>
      ))}
    </div>
  );
}
