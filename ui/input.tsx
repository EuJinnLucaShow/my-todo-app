import { InputHTMLAttributes } from "react";

export function Input({
  className,
  ...props
}: Readonly<InputHTMLAttributes<HTMLInputElement>>) {
  return (
    <input
      className={`px-4 py-3 rounded-lg border outline-none transition-colors 
        bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
        dark:bg-[#1a1b26] dark:border-slate-800 dark:text-slate-50 dark:placeholder:text-slate-500 
        ${className}`}
      {...props}
    />
  );
}
