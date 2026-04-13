export function ModuleHeader({
  title,
  description,
  controls,
}: {
  title: string;
  description: string;
  controls?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-white/60">{description}</p>
      </div>
      {controls ? <div className="flex flex-wrap items-center gap-2">{controls}</div> : null}
    </header>
  );
}
