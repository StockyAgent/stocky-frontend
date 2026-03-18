"use client";

interface DemoHighlightCardProps {
  ticker: string;
  headline: string;    // 헤드라인 텍스트 (줄바꿈 포함 가능)
  changeRate: string;  // 예: "+3.2%"
  tags?: string[];     // 예: ["📊 실적발표", "🔥 급등주"]
}

/**
 * 피그마 TODAY'S HIGHLIGHT 카드
 * - bg-[#1cb863] rounded-[20px] p-[18px]
 * - 우상단 장식 원: size-[110px] bg-[rgba(255,255,255,0.07)]
 * - 우측: SVG 스파크라인
 */
export default function DemoHighlightCard({ ticker, headline, changeRate, tags = [] }: DemoHighlightCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[20px] bg-[#1cb863] p-[18px]">
      {/* 장식 원 */}
      <div className="absolute -right-[18px] -top-[28px] size-[110px] rounded-full bg-[rgba(255,255,255,0.07)]" />

      <div className="flex items-start gap-[10px]">
        <div className="flex-1 min-w-0">
          <p className="mb-1 text-[10px] font-bold text-[rgba(255,255,255,0.65)]">TODAY&apos;S HIGHLIGHT</p>
          <p className="text-[14.5px] font-black leading-[20px] text-white whitespace-pre-line">
            {headline}
          </p>
          {tags.length > 0 && (
            <div className="mt-[6px] flex flex-wrap gap-[6px]">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-[8px] bg-[rgba(255,255,255,0.2)] px-[9px] py-[3px] text-[10px] font-bold text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {/* 스파크라인 SVG */}
        <div className="mt-[2px] shrink-0">
          <svg width="68" height="48" viewBox="0 0 68 48" fill="none">
            <defs>
              <linearGradient id={`spark-${ticker}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path
              d="M0,40 C8,38 10,34 18,28 C26,22 28,30 36,18 C44,6 50,20 60,8 L68,12 L68,48 L0,48 Z"
              fill={`url(#spark-${ticker})`}
            />
            <path
              d="M0,40 C8,38 10,34 18,28 C26,22 28,30 36,18 C44,6 50,20 60,8 L68,12"
              stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
