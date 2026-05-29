"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { V2_BRIEFING_DETAILS } from "@/data/v2/mock";

// 미니 스파크라인 차트 컴포넌트
function Sparkline({ data, isUp }: { data: number[]; isUp: boolean }) {
  const w = 80;
  const h = 28;
  const padding = 2;
  const min = Math.min(...data) - 2;
  const max = Math.max(...data) + 2;
  const range = max - min;

  const points = data.map((v, i) => ({
    x: padding + (i / (data.length - 1)) * (w - padding * 2),
    y: padding + (1 - (v - min) / range) * (h - padding * 2),
  }));

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX} ${prev.y} ${cpX} ${pt.y} ${pt.x} ${pt.y}`;
  }, "");

  const fillD = `${pathD} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;
  const color = isUp ? "#1cb863" : "#e84545";
  const gradId = `spark-${isUp ? "up" : "down"}-${data[0]}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={fillD} fill={`url(#${gradId})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="2" fill={color} />
    </svg>
  );
}

// 임팩트 스코어 미니 게이지
function ImpactGauge({ score, animate }: { score: number; animate: boolean }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = animate ? circumference - (score / 100) * circumference : circumference;
  const color = score >= 80 ? "#1cb863" : score >= 60 ? "#e8a020" : "#e84545";

  return (
    <div className="relative flex size-10 items-center justify-center shrink-0">
      <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r={radius} fill="none" stroke="#e8f5ee" strokeWidth="3" />
        <circle
          cx="18" cy="18" r={radius} fill="none"
          stroke={color} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="text-[10px] font-black" style={{ color }}>{score}</span>
    </div>
  );
}

// 관련 종목 가로 바 차트
function RelatedStocksBar({ stocks }: { stocks: { ticker: string; change: number; isUp: boolean }[] }) {
  const maxChange = Math.max(...stocks.map((s) => Math.abs(s.change)));

  return (
    <div className="flex flex-col gap-1.5">
      {stocks.map((s) => (
        <div key={s.ticker} className="flex items-center gap-2">
          <span className="w-10 text-[9px] font-black text-[#0f2318] text-right">{s.ticker}</span>
          <div className="flex-1 h-[6px] rounded-full bg-[#f0f5f2] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${(Math.abs(s.change) / maxChange) * 100}%`,
                backgroundColor: s.isUp ? "#1cb863" : "#e84545",
              }}
            />
          </div>
          <span className={`w-10 text-[9px] font-bold ${s.isUp ? "text-[#1cb863]" : "text-[#e84545]"}`}>
            {s.isUp ? "+" : ""}{s.change}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default function V2BriefingsHistoryPage() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [animateGauge, setAnimateGauge] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateGauge(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex min-h-dvh flex-col bg-[#f5faf7]">
      {/* 고정 헤더 */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white px-5 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex size-8 items-center justify-center rounded-[10px] border-2 border-[#e8f0ec] bg-white text-[#0f2318] shadow-[0_2px_0_#d8ead0]"
          >
            ‹
          </button>
          <h1 className="text-[18px] font-black text-[#0f2318]">브리핑 보관함</h1>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-[#edfaf3] px-3 py-1.5">
          <div className="size-1.5 rounded-full bg-[#1cb863]" />
          <span className="text-[10px] font-bold text-[#0d7a3e]">{V2_BRIEFING_DETAILS.length}개 브리핑</span>
        </div>
      </header>

      {/* 리스트 본문 */}
      <div className="flex flex-col gap-4 px-5 py-6 pb-12">
        <p className="text-[14px] font-black text-[#0f2318]">코치들의 지난 분석들 📝</p>

        {V2_BRIEFING_DETAILS.map((b) => {
          const isExpanded = expandedId === b.id;
          const stockData = b.relatedStocks[0];
          const isUp = stockData?.isUp ?? true;

          return (
            <div
              key={b.id}
              className={`rounded-[20px] bg-white shadow-[0_4px_0_#d0e8d8] transition-all duration-300 ${
                !b.isRead ? "border-2 border-[#1cb863]" : "border border-[#e8f0ec]"
              }`}
            >
              {/* 카드 헤더 영역 */}
              <div
                className="cursor-pointer p-5 pb-0"
                onClick={() => toggleExpand(b.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="relative flex size-7 items-center justify-center rounded-[8px] bg-[#1cb863] text-[13px] shadow-[0_2px_0_#159e51]">
                      {b.coachEmoji}
                      {!b.isRead && (
                        <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-[#ff4a4a] ring-[1.5px] ring-white" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-black text-[#0f2318]">{b.coachName}</span>
                      <span className="text-[10px] text-[#8abeaa]">{b.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkline data={b.sparkline} isUp={isUp} />
                    <ImpactGauge score={b.impactScore} animate={animateGauge} />
                  </div>
                </div>

                <p className="text-[13.5px] leading-relaxed text-[#1a1a1a] mb-3">
                  &quot;{b.content}&quot;
                </p>

                {/* 핵심 지표 미니 카드 */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {b.keyMetrics.map((m) => (
                    <div key={m.label} className="rounded-[10px] bg-[#f5faf7] px-2.5 py-2 text-center">
                      <p className="text-[8px] text-[#8abeaa] mb-0.5">{m.label}</p>
                      <p className="text-[12px] font-black text-[#0f2318]">{m.value}</p>
                      <p className={`text-[9px] font-bold ${m.change.startsWith("+") ? "text-[#1cb863]" : m.change.startsWith("-") ? "text-[#e84545]" : "text-[#8abeaa]"}`}>
                        {m.change}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 확장 섹션: 관련 종목 바 차트 */}
              <div
                className="grid transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-2 pt-1">
                    <div className="rounded-[12px] border border-[#e8f0ec] bg-[#fafdf8] p-3">
                      <p className="text-[10px] font-black text-[#0f2318] mb-2">📊 관련 종목 등락률</p>
                      <RelatedStocksBar stocks={b.relatedStocks} />
                    </div>
                  </div>
                </div>
              </div>

              {/* 카드 푸터 */}
              <div className="px-5 pb-5 pt-2">
                <div className="flex items-center justify-between border-t border-[#f0f5f2] pt-3">
                  <div className="flex items-center gap-1.5 flex-wrap flex-1 mr-4">
                    {b.tags.map((tag, idx) => (
                      <span key={idx} className="rounded-[6px] bg-[#e8f0ec] px-2 py-1 text-[10px] font-bold text-[#3d6b50]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/v2/report/${b.ticker}`);
                    }}
                    className="shrink-0 rounded-[8px] bg-[#1cb863] px-3 py-1.5 text-[10px] font-black text-white shadow-[0_2px_0_#159e51] transition-all active:translate-y-0.5 active:shadow-none"
                  >
                    리포트 보기 ›
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-6 text-center text-[12px] text-[#a0b8aa]">
          최근 30일 동안의 브리핑만 보관됩니다.
        </div>
      </div>
    </div>
  );
}
