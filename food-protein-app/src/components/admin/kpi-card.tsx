interface KpiCardProps {
  label: string;
  value: string;
  hint?: string;
}

export function KpiCard({ label, value, hint }: KpiCardProps) {
  return (
    <article className="rounded-xl border border-cyan-300/20 bg-[#0B121A] p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/70">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {hint ? <p className="mt-1 text-xs text-white/60">{hint}</p> : null}
    </article>
  );
}
