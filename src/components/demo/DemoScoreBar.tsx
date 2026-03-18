"use client";

type ScoreColor = "green" | "yellow" | "red";

interface DemoScoreBarProps {
  label: string;    // 예: "재무 안정성"
  score: number;    // 0 ~ 100
  color?: ScoreColor;
}

const COLOR_MAP: Record<ScoreColor, { from: string; to: string }> = {
  green:  { from: "#1cb863", to: "#159e51" },
  yellow: { from: "#f59e0b", to: "#d97706" },
  red:    { from: "#ff4d4d", to: "#e63939" },
};

function getAutoColor(score: number): ScoreColor {
  if (score >= 80) return "green";
  if (score >= 60) return "yellow";
  return "red";
}

/**
 * 피그마 세부 평가 점수 바
 * - track: bg-[#e8fcf0] h-[7px] rounded-[4px]
 * - fill: bg-gradient-to-r, 너비 = score%
 * - label: text-[10.5px] #3d6b50, score: text-[10.3px] #0f2318
 */
export default function DemoScoreBar({ label, score, color }: DemoScoreBarProps) {
  const c = COLOR_MAP[color ?? getAutoColor(score)];

  return (
    <div className="flex flex-col gap-[4px]">
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] font-bold text-[#3d6b50]">{label}</span>
        <span className="text-[10.3px] font-black text-[#0f2318]">{score}</span>
      </div>
      <div className="h-[7px] w-full overflow-hidden rounded-[4px] bg-[#e8fcf0]">
        <div
          className="h-full rounded-[4px]"
          style={{
            width: `${score}%`,
            backgroundImage: `linear-gradient(to right, ${c.from}, ${c.to})`,
          }}
        />
      </div>
    </div>
  );
}
