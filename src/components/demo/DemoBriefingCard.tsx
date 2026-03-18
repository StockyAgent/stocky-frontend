"use client";

interface DemoBriefingCardProps {
  ticker: string;
  summary: string;       // 한 줄 요약
  changeRate: string;    // 예: "+3.2%" | "-0.8%"
  aiScore: number;       // 0~100
  iconBg?: string;       // 아이콘 배경색 (기본 #e8fcf0)
  icon?: string;         // 이모지 아이콘
  href?: string;         // 클릭 시 이동 경로
}

/**
 * 피그마 내 종목 브리핑 카드
 * - bg-white border-[#d8f0e2] border-2 rounded-[15px] shadow-[0px_3px_0px_0px_#d8f0e2]
 * - 상승: text-[#ff4d4d], 하락: text-[#3b82f6]
 */
export default function DemoBriefingCard({
  ticker, summary, changeRate, aiScore,
  iconBg = "#e8fcf0", icon = "📈", href,
}: DemoBriefingCardProps) {
  const isPositive = changeRate.startsWith("+");
  const rateColor = isPositive ? "text-[#ff4d4d]" : "text-[#3b82f6]";

  const content = (
    <div className="flex items-center gap-[11px] rounded-[15px] border-2 border-[#d8f0e2] bg-white px-[16px] py-[14px] shadow-[0px_3px_0px_0px_#d8f0e2]">
      <div
        className="flex size-[40px] shrink-0 items-center justify-center rounded-[12px] text-lg"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13.4px] font-black text-[#0f2318]">{ticker}</p>
        <p className="truncate text-[10.5px] font-[350] text-[#8abeaa]">{summary}</p>
      </div>
      <div className="flex flex-col items-end gap-[2px] shrink-0">
        <span className={`text-[13.3px] font-black ${rateColor}`}>{changeRate}</span>
        <span className="text-[10px] font-[350] text-[#8abeaa]">AI점수 {aiScore}</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }
  return content;
}
