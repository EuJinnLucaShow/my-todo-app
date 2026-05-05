import { InputHTMLAttributes } from "react";

export function Input({
  className,
  ...props
}: Readonly<InputHTMLAttributes<HTMLInputElement>>) {
  return (
    <input
      className={`flex-1 bg-transparent border border-gray-700 rounded text-white outline-none focus:border-blue-500 transition-colors ${className}`}
      {...props}
    />
  );
}
