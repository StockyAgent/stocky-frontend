"use client";

interface DataPoint {
  year: string;
  value: number;
}

interface DemoLineChartProps {
  data: DataPoint[];
  title?: string;
  unit?: string;
  color?: string;
  /** SVG gradient ID — 같은 페이지에 여러 차트 렌더 시 ID 충돌 방지 */
  gradientId?: string;
}

export default function DemoLineChart({ data, title, unit = "", color = "#1cb863", gradientId = "areaGrad" }: DemoLineChartProps) {
  const W = 280;
  const H = 120;
  const PAD_X = 32;
  const PAD_Y = 16;
  const INNER_W = W - PAD_X * 2;
  const INNER_H = H - PAD_Y * 2;

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  const toX = (i: number) => PAD_X + (i / (data.length - 1)) * INNER_W;
  const toY = (v: number) => PAD_Y + INNER_H - ((v - minVal) / range) * INNER_H;

  const points = data.map((d, i) => ({ x: toX(i), y: toY(d.value) }));

  // Cubic bezier smooth curve path
  function smoothCurvePath(pts: { x: number; y: number }[]): string {
    if (pts.length < 2) return "";
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const tension = 0.35;
      const dx = curr.x - prev.x;
      const cp1x = prev.x + dx * tension;
      const cp1y = prev.y;
      const cp2x = curr.x - dx * tension;
      const cp2y = curr.y;
      d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
    }
    return d;
  }

  const curvePath = smoothCurvePath(points);
  const areaPath = `${curvePath} L${points[points.length - 1].x},${H - PAD_Y} L${points[0].x},${H - PAD_Y} Z`;

  return (
    <div className="w-full">
      {title && (
        <p className="mb-2 text-[10.5px] font-black text-[#0f2318]">{title}</p>
      )}
      <div className="w-full overflow-hidden rounded-xl">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 110 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[0, 0.5, 1].map((t, i) => {
            const y = PAD_Y + INNER_H * (1 - t);
            const val = minVal + range * t;
            return (
              <g key={i}>
                <line x1={PAD_X} y1={y} x2={W - PAD_X} y2={y} stroke="#e8fcf0" strokeWidth="1" strokeDasharray="4 3" />
                <text x={PAD_X - 4} y={y + 4} textAnchor="end" fontSize="7" fill="#8abeaa">
                  {Math.round(val)}{unit}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaPath} fill={`url(#${gradientId})`} />

          {/* Curve */}
          <path
            d={curvePath}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points + labels */}
          {points.map((p, i) => (
            <g key={i}>
              {/* Point circle */}
              <circle cx={p.x} cy={p.y} r="4" fill="white" stroke={color} strokeWidth="2" />
              {/* Year label */}
              <text x={p.x} y={H - 2} textAnchor="middle" fontSize="7" fill="#8abeaa">
                {data[i].year}
              </text>
              {/* Value label above point */}
              <text x={p.x} y={p.y - 7} textAnchor="middle" fontSize="7.5" fill={color} fontWeight="900">
                {data[i].value}{unit}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
