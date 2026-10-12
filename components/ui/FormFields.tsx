"use client";

import { useState, useId, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* ================================================================
   INPUT
   ================================================================ */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = !!props.value || !!props.defaultValue;

  return (
    <div className="relative">
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(
          "peer w-full rounded-lg border bg-bg-soft px-4 pt-6 pb-2",
          "text-cream placeholder-transparent",
          "transition-colors duration-200 ease-smooth",
          "focus:border-accent focus:shadow-gold focus:outline-none",
          error ? "border-danger" : "border-border",
          className
        )}
        placeholder={label}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <label
        htmlFor={inputId}
        className={cn(
          "pointer-events-none absolute left-4 transition-all duration-200 ease-smooth",
          isFocused || hasValue
            ? "top-2 text-xs text-accent"
            : "top-1/2 -translate-y-1/2 text-sm text-muted",
          "peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent",
          "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent"
        )}
      >
        {label}
      </label>
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ================================================================
   TEXTAREA
   ================================================================ */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const autoId = useId();
  const textareaId = id ?? autoId;

  return (
    <div className="relative">
      <textarea
        id={textareaId}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={cn(
          "peer w-full resize-none rounded-lg border bg-bg-soft px-4 pt-6 pb-2",
          "text-cream placeholder-transparent",
          "transition-colors duration-200 ease-smooth",
          "focus:border-accent focus:shadow-gold focus:outline-none",
          "min-h-[120px]",
          error ? "border-danger" : "border-border",
          className
        )}
        placeholder={label}
        {...props}
      />
      <label
        htmlFor={textareaId}
        className={cn(
          "pointer-events-none absolute left-4 top-4 text-sm text-muted",
          "transition-all duration-200 ease-smooth",
          "peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent",
          "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent"
        )}
      >
        {label}
      </label>
      {error && (
        <p id={`${textareaId}-error`} className="mt-1 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ================================================================
   SELECT
   ================================================================ */
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label: string;
  options: SelectOption[];
  error?: string;
}

export function Select({ label, options, error, className, id, ...props }: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className="relative">
      <select
        id={selectId}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
        className={cn(
          "peer w-full appearance-none rounded-lg border bg-bg-soft px-4 pt-6 pb-2",
          "text-cream",
          "transition-colors duration-200 ease-smooth",
          "focus:border-accent focus:shadow-gold focus:outline-none",
          error ? "border-danger" : "border-border",
          className
        )}
        {...props}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={selectId}
        className="pointer-events-none absolute left-4 top-2 text-xs text-accent"
      >
        {label}
      </label>
      {/* Dropdown arrow */}
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted" />
        </svg>
      </div>
      {error && (
        <p id={`${selectId}-error`} className="mt-1 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
