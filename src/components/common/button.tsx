import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "primary" | "secondary";
  variant?: "contained" | "outlined" | "text";
  icon?: React.ReactNode;
}

const buttonVariants = {
  contained: {
    primary: "bg-primary-button-bg text-primary-button-fg rounded-md",
    secondary: "bg-secondary-button-bg text-secondary-button-fg rounded-md",
  },
  outlined: {
    primary:
      "border border-primary-button-bg text-primary-button-bg rounded-md",
    secondary:
      "border border-secondary-button-bg text-secondary-button-bg bg-white rounded-md",
  },
  text: {
    primary: "",
    secondary: "",
  },
};

export default function Button({
  children,
  color = "primary",
  variant = "contained",
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm inline-flex items-center font-semibold",
        buttonVariants[variant][color]
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
