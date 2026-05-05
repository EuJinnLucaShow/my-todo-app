import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "icon";
};

const variants = {
  default: "",
  icon: "p-1.5 rounded-md border-none bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
};

export function Button({
  className,
  variant = "default",
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      className={`rounded transition-colors disabled:opacity-50 cursor-pointer p-0 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
