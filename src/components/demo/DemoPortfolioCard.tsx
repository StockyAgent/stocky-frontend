"use client";

interface PortfolioStat {
  label: string;
  value: string;
  color?: string; // 기본 #0f2318, 상승이면 #ff4d4d
}

interface DemoPortfolioCardProps {
  totalValue: string;     // 예: "$2,813.70"
  stats: PortfolioStat[]; // 좌측부터 표시할 통계 (최대 3개)
}

/**
 * 피그마 포트폴리오 카드
 * - bg-[#e8fcf0] border-[#d0f5e0] rounded-[18px] p-[18px]
 * - 총 평가금액: text-[26px] font-black tracking-[-0.8px]
 * - 통계: 구분 없이 gap-[14px] 나열
 */
export default function DemoPortfolioCard({ totalValue, stats }: DemoPortfolioCardProps) {
  return (
    <div className="flex flex-col gap-[3px] rounded-[18px] border-2 border-[#d0f5e0] bg-[#e8fcf0] p-[18px]">
      <p className="text-[10.5px] font-bold text-[#8abeaa]">총 평가금액</p>
      <p className="text-[26px] font-black tracking-[-0.8px] text-[#0f2318]">{totalValue}</p>
      <div className="flex gap-[14px] pt-[4px]">
        {stats.map((s, i) => (
          <div key={i}>
            <p className="text-[10px] font-[350] text-[#8abeaa]">{s.label}</p>
            <p
              className="text-[11.8px] font-black"
              style={{ color: s.color ?? "#0f2318" }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
