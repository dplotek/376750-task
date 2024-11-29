"use client";
import { cn } from "@/utils/cn";
import { ReactNode, type HTMLInputTypeAttribute } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface InputControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  placeholder: string;
  icon?: ReactNode;
}

export default function InputController<T extends FieldValues>({
  control,
  name,
  label,
  type,
  required,
  placeholder,
  icon,
}: InputControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-2">
          <label
            className={cn(
              "block font-medium mb-1.5",
              error ? "text-red-400" : "text-secondary-700"
            )}
            htmlFor={name}
          >
            {label + (required ? " *" : "")}
          </label>
          <div className="relative">
            {icon && (
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
              </span>
            )}
            <input
              className={cn(
                "border rounded-md w-full block text-base py-2 px-3",
                error ? "border-red-400" : "border-primary-border",
                icon ? "pl-10" : ""
              )}
              id={name}
              type={type}
              {...field}
              placeholder={placeholder}
            />
          </div>
          {error && <span className="text-red-400">{error.message}</span>}
        </div>
      )}
    />
  );
}
