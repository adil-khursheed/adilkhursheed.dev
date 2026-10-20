export function Field({
  id,
  label,
  error,
  hint,
  description,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="font-mono text-[11px] lowercase text-foreground/65"
        >
          {label}
        </label>
        {hint}
      </div>
      {children}
      {description && !error ? (
        <p className="text-[11px]/5 text-foreground/45">{description}</p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
