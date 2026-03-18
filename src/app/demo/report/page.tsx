"use client";

import { useRouter } from "next/navigation";
import { DemoScoreBar, DemoLineChart } from "@/components/demo";

const SCORES = [
  { label: "재무 안정성", score: 81 },
  { label: "성장성",      score: 92 },
  { label: "수익성",      score: 89 },
  { label: "해자",        score: 85 },
  { label: "저평가 여부", score: 68 },
];

const REVENUE_DATA = [
  { year: "2021", value: 274 }, { year: "2022", value: 394 },
  { year: "2023", value: 383 }, { year: "2024", value: 391 },
  { year: "2025", value: 421 },
];

export default function DemoReportPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* 헤더 */}
      <div className="flex items-center gap-[11px] px-[18px] pb-[16px] pt-[18px]">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex size-[33px] items-center justify-center rounded-[11px] border-2 border-[#d8f0e2] bg-[#f4fff8] cursor-pointer"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M9.5 3.5L5.5 7.5L9.5 11.5" stroke="#0f2318" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-black text-[#0f2318]">AAPL 심층 리포트</p>
          <p className="text-[10.5px] font-[350] text-[#8abeaa]">2026.03.05 · AI 분석</p>
        </div>
        {/* AI 종합점수 */}
        <div className="flex size-[46px] flex-col items-center justify-center rounded-[13px] bg-[#1cb863] shadow-[0px_3px_0px_0px_#159e51] shrink-0">
          <p className="text-[16px] font-black leading-[16px] text-white">83</p>
          <p className="text-[8px] font-bold text-[rgba(255,255,255,0.7)]">종합점수</p>
        </div>
      </div>

      {/* 가격 카드 */}
      <div className="mx-[18px] mb-[14px]">
        <div className="flex items-center gap-[14px] rounded-[15px] border-2 border-[#d0f5e0] bg-[#e8fcf0] p-[16px]">
          <div className="flex flex-col gap-[5px]">
            <p className="text-[24px] font-black tracking-[-0.8px] text-[#0f2318]">$262.52</p>
            <span className="inline-block rounded-[7px] bg-[#ffe8e8] px-[9px] py-[3px] text-[11.8px] font-black text-[#ff4d4d]">▲ +1.24%</span>
          </div>
          <div className="ml-auto flex flex-col items-end gap-px">
            <p className="text-[9.5px] font-[350] text-[#8abeaa]">목표가 (평균)</p>
            <p className="text-[11.5px] font-bold text-[#0f2318]">$290.90</p>
            <p className="text-[9.5px] font-[350] text-[#8abeaa]">상승 여력</p>
            <p className="text-[11.5px] font-bold text-[#ff4d4d]">+10.8%</p>
          </div>
        </div>
      </div>

      {/* 세부 평가 - DemoScoreBar 사용 */}
      <div className="mx-[18px] mb-[12px]">
        <div className="rounded-[16px] border-2 border-[#d8f0e2] bg-white p-[14px] shadow-[0px_3px_0px_0px_#d8f0e2]">
          <p className="mb-[14px] text-[12px] font-black text-[#0f2318]">세부 평가</p>
          <div className="flex flex-col gap-[17px]">
            {SCORES.map((s) => (
              <DemoScoreBar key={s.label} label={s.label} score={s.score} />
            ))}
          </div>
        </div>
      </div>

      {/* 매출 성장 차트 - DemoLineChart 사용 */}
      <div className="mx-[18px] mb-[12px]">
        <div className="flex flex-col gap-[8px] rounded-[16px] border-2 border-[#d8f0e2] bg-white p-[16px] shadow-[0px_3px_0px_0px_#d8f0e2]">
          <DemoLineChart data={REVENUE_DATA} title="📊 매출 성장 추이 (단위: $B)" unit="B" />
        </div>
      </div>

      {/* Bull vs Bear */}
      <div className="mx-[18px] mb-6">
        <div className="overflow-hidden rounded-[16px] border-2 border-[#d8f0e2] bg-white shadow-[0px_3px_0px_0px_#d8f0e2]">
          <div className="flex">
            <div className="flex flex-col gap-[6px] border-r border-[#d8f0e2] bg-[#f0fff5] p-[12px] flex-1">
              <p className="text-[9.8px] font-black text-[#0d7a3e]">🐂 Bull Case</p>
              <p className="text-[10px] font-[350] leading-[15px] text-[#3d6b50]">
                생태계 락인·서비스 성장·글로벌 확장으로 지속 가능한 경쟁 우위 확보
              </p>
            </div>
            <div className="flex flex-col gap-[6px] bg-[#fff5f5] p-[12px] flex-1">
              <p className="text-[9.8px] font-black text-[#c53030]">🐻 Bear Case</p>
              <p className="text-[10px] font-[350] leading-[15px] text-[#3d6b50]">
                PEG 1.88 고평가·높은 부채·iPhone 의존도 리스크 상존
              </p>
            </div>
          </div>
          {/* AI 결론 */}
          <div className="flex items-center gap-[6px] border-t border-[#d8f0e2] bg-[#f0fff8] px-[12px] py-[10px]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" fill="#1cb863"/>
              <path d="M3.5 7L6 9.5L10.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className="text-[10.5px] font-bold text-[#3d6b50]">AI 결론: 매수 · 확신도 75%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
