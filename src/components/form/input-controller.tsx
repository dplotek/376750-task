"use client";
import { type HTMLInputTypeAttribute } from "react";
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
}

export default function InputController<T extends FieldValues>({
  control,
  name,
  label,
  type,
  required,
  placeholder,
}: InputControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <label className="block" htmlFor={name}>
            {label + (required ? " *" : "")}
          </label>
          <input
            className="border border-red-400 block"
            id={name}
            type={type}
            {...field}
            placeholder={placeholder}
          />
          {error && <span>{error.message}</span>}
        </>
      )}
    />
  );
}
