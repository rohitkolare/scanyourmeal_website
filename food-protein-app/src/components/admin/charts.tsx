interface SeriesPoint {
  label: string;
  value: number;
}

export function BarChart({ data, color = "bg-cyan-300" }: { data: SeriesPoint[]; color?: string }) {
  const max = Math.max(...data.map((point) => point.value), 1);

  return (
    <div className="space-y-3">
      {data.map((point) => (
        <div key={point.label} className="grid grid-cols-[56px_1fr_64px] items-center gap-3 text-xs">
          <span className="text-white/60">{point.label}</span>
          <div className="h-2 rounded-full bg-white/10">
            <div
              className={`h-2 rounded-full ${color}`}
              style={{ width: `${(point.value / max) * 100}%` }}
            />
          </div>
          <span className="text-right text-white/80">{point.value}</span>
        </div>
      ))}
    </div>
  );
}

export function LineChart({ data }: { data: SeriesPoint[] }) {
  const max = Math.max(...data.map((point) => point.value), 1);
  const min = Math.min(...data.map((point) => point.value), 0);

  const points = data
    .map((point, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * 100;
      const normalized = (point.value - min) / Math.max(max - min, 1);
      const y = 100 - normalized * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="space-y-3">
      <svg viewBox="0 0 100 100" className="h-28 w-full rounded-lg bg-[#0A1017] p-3">
        <polyline fill="none" stroke="#4EEAFF" strokeWidth="2.5" points={points} vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="grid grid-cols-4 gap-2 text-[11px] text-white/55">
        {data.slice(-4).map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}
