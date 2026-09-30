import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

const controlClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-50";
const controlErrorClass =
  "border-red-400 focus:border-red-600 focus:ring-red-600/10";

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  disabled?: boolean;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  autoFocus?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  /** Marca o campo como inválido e announces via aria-invalid/aria-describedby. */
  error?: boolean;
  errorText?: string;
  hint?: ReactNode;
  className?: string;
};

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
  disabled,
  autoComplete,
  autoFocus,
  inputRef,
  error = false,
  errorText,
  hint,
  className,
}: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const describedBy = error && errorText ? errorId : undefined;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500"
      >
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        disabled={disabled}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        aria-invalid={error || undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
        className={`${controlClass} ${error ? controlErrorClass : ""}`}
      />
      {error && errorText ? (
        <p id={errorId} className="mt-1 text-xs font-medium text-red-700">
          {errorText}
        </p>
      ) : hint ? (
        <p className="mt-1 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

const variantClass = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-slate-800",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50",
  ghost:
    "inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50",
  danger:
    "inline-flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700",
} as const;

type ButtonVariant = keyof typeof variantClass;

type ActionButtonProps = {
  variant?: ButtonVariant;
  /** `submit` só no botão principal do formulário; o resto permanece `button`. */
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export function ActionButton({
  variant = "primary",
  type = "button",
  onClick,
  disabled,
  title,
  ariaLabel,
  children,
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      className={`${variantClass[variant]} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
