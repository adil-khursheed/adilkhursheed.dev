export function StudioPageHeader({
  title,
  description,
  meta,
  action,
}: {
  title: string;
  description?: string;
  meta?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h1 className="text-3xl tracking-tight sm:text-4xl">{title}</h1>
          {meta ? (
            <span className="font-mono text-[10px] text-foreground/45">
              {meta}
            </span>
          ) : null}
        </div>
        {description ? (
          <p className="mt-3 max-w-[62ch] text-sm/6 text-foreground/65">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
