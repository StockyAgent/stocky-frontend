"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/ui/NavBar";
import CategoryButton from "@/components/onboarding/CategoryButton";
import ReportCard from "@/components/dashboard/ReportCard";
import DailyBriefingItem from "@/components/dashboard/DailyBriefingItem";
import BriefingTag from "@/components/dashboard/BriefingTag";

const REPORT_CATEGORIES = ["전체", "데일리", "심층분석", "위클리"];

const REPORTS = [
  { type: "데일리" as const, date: "2024.03.21", title: "3월 21일 AAPL", description: "애플에 대한 데일리 분석, 어쩌구 저쩌구 나올…" },
  { type: "주간" as const, date: "2026.03.16", title: "3월 3주차 요약", description: "주차별 리포트, 어떤 내용이 리포트로 쓰여야 좋…" },
  { type: "심층분석" as const, date: "2026.03.19", title: "애플(AAPL) 심층 분석", description: "심층 리포트 내용이 여기로 들어가, 리포트 폼은…" },
];

const BRIEFINGS = [
  { keyword: "환율 변동성", content: "원/달러 환율이 안정세를 찾으며 기관 투자자의 수급 여건이 개선되는 신호를 포착했습니다." },
  { keyword: "AI 섹터 동향", content: "엔비디아의 실적 발표를 앞두고 국내 관련 밸류체인 기업들에 대한 기대감이 고조되고 있습니다." },
  { keyword: "KOSPI 2,654.12 (+1.24%)", content: "외국인 순매수세가 강화되며 반도체 대형주 중심의 강한 반등세를 보이고 있습니다." },
];

export default function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  return (
    <div className="flex min-h-dvh flex-col bg-[#0d0d0d] pb-[72px]">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[rgba(13,13,13,0.95)] px-5 pb-[17px] pt-14 backdrop-blur-[12px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">
                <span className="text-[24px] font-extrabold uppercase tracking-[-0.6px] text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                  STOCKY
                </span>
                <div className="ml-1 size-2 rounded-full bg-[#0f6] shadow-[0px_0px_15px_0px_rgba(0,255,102,0.4)]" />
              </div>
              <span className="mt-2 text-[12px] font-bold uppercase tracking-[1.2px] text-[#0f6]" style={{ fontFamily: "Inter, sans-serif" }}>
                PRO
              </span>
            </div>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[1px] text-[#64748b]" style={{ fontFamily: "Inter, sans-serif" }}>
              AI ANALYSIS DASHBOARD
            </span>
          </div>
          {/* Profile Avatar */}
          <div className="relative flex size-10 items-center justify-center rounded-full border border-white/10">
            <Image src="/icons/profile-icon.svg" alt="Profile" width={24} height={24} className="opacity-60 brightness-0 invert" />
            <div className="absolute right-0 top-0 size-3 rounded-full border-2 border-[#121212] bg-[#0f6]" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8 p-5">
        {/* Daily Briefing Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-[6px] bg-[rgba(0,255,102,0.2)] p-1">
              <Image src="/icons/briefing-icon.svg" alt="" width={20} height={24} className="brightness-0" style={{ filter: "brightness(0) saturate(100%) invert(68%) sepia(74%) saturate(2741%) hue-rotate(95deg) brightness(104%) contrast(107%)" }} />
            </div>
            <h2 className="text-[18px] font-bold text-white">데일리 브리핑</h2>
          </div>

          <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-[#181818] p-[21px]">
            {BRIEFINGS.map((item, i) => (
              <DailyBriefingItem key={i} keyword={item.keyword} content={item.content} />
            ))}
            <div className="flex gap-2 pt-2">
              <BriefingTag label="#반도체강세" />
              <BriefingTag label="#외인매수" />
            </div>
          </div>
        </section>

        {/* Report History Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-white">리포트 히스토리</h2>
            <Link href="/reports" className="flex items-center gap-0.5">
              <span className="text-[12px] font-bold text-white">전체보기</span>
              <Image src="/icons/chevron-right-icon.svg" alt="" width={16} height={20} className="brightness-0 invert" />
            </Link>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
            {REPORT_CATEGORIES.map((cat) => (
              <CategoryButton
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>

          {/* Report Cards */}
          <div className="flex flex-col gap-3">
            {REPORTS.map((report, i) => (
              <ReportCard
                key={i}
                type={report.type}
                date={report.date}
                title={report.title}
                description={report.description}
              />
            ))}
          </div>
        </section>
      </main>

      <NavBar />
    </div>
  );
}
