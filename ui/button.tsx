import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "icon";
};

const variants = {
  default: "",
  icon: "p-1.5",
};

export function Button({
  className,
  variant = "default",
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      className={`rounded disabled:opacity-50 cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
