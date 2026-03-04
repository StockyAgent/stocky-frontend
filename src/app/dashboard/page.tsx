"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/ui/NavBar";
import CategoryButton from "@/components/ui/CategoryButton";
import ReportCard from "@/components/dashboard/ReportCard";
import DailyBriefingItem from "@/components/dashboard/DailyBriefingItem";
import BriefingTag from "@/components/dashboard/BriefingTag";

const REPORT_CATEGORIES = ["전체", "데일리", "위클리"];

const REPORTS = [
  { type: "데일리" as const, date: "2026.03.03", title: "3월 3일 NVDA", description: "엔비디아 GTC 2026 발표 이후 AI 반도체 수요 전…" },
  { type: "데일리" as const, date: "2026.03.02", title: "3월 2일 TSLA", description: "테슬라 자율주행 FSD V13 업데이트 소식에 따른…" },
  { type: "주간" as const, date: "2026.03.01", title: "3월 1주차 요약", description: "주요 기술주 실적 발표 시즌을 앞두고 시장 변동…" },
  { type: "데일리" as const, date: "2026.02.28", title: "2월 28일 AAPL", description: "애플 비전 프로 2세대 출시 예고에 따른 주가 전…" },
  { type: "주간" as const, date: "2026.02.22", title: "2월 4주차 요약", description: "미 연준 금리 동결 결정 이후 시장 안도 랠리 분…" },
];

const BRIEFINGS = [
  { keyword: "환율 변동성", content: "원/달러 환율이 안정세를 찾으며 기관 투자자의 수급 여건이 개선되는 신호를 포착했습니다." },
  { keyword: "AI 섹터 동향", content: "엔비디아의 실적 발표를 앞두고 국내 관련 밸류체인 기업들에 대한 기대감이 고조되고 있습니다." },
  { keyword: "KOSPI 2,654.12 (+1.24%)", content: "외국인 순매수세가 강화되며 반도체 대형주 중심의 강한 반등세를 보이고 있습니다." },
];

export default function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const scrollPositions = useRef<Map<string, number>>(new Map());

  const handleCategoryChange = useCallback((cat: string) => {
    scrollPositions.current.set(activeCategory, window.scrollY);
    setActiveCategory(cat);
    requestAnimationFrame(() => {
      const saved = scrollPositions.current.get(cat);
      if (saved !== undefined) {
        window.scrollTo({ top: saved, behavior: "instant" });
      }
    });
  }, [activeCategory]);

  const filteredReports = useMemo(() => {
    if (activeCategory === "전체") return REPORTS;
    if (activeCategory === "위클리") return REPORTS.filter((r) => r.type === "주간");
    return REPORTS.filter((r) => r.type === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex min-h-dvh flex-col bg-[#f1faee] pb-[72px]">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[#e1e1e1] bg-[#f1faee] px-5 pb-[17px] pt-14 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">
                <span className="text-[24px] font-extrabold uppercase tracking-[-0.6px] text-[#1d3557]" style={{ fontFamily: "Inter, sans-serif" }}>
                  STOCKY
                </span>
                <div className="ml-1 size-2 rounded-full bg-[#a8dadc] shadow-[0px_0px_15px_0px_rgba(0,255,102,0.4)]" />
              </div>
              <span className="mt-2 text-[12px] font-bold uppercase tracking-[1.2px] text-[#a8dadc]" style={{ fontFamily: "Inter, sans-serif" }}>
                PRO
              </span>
            </div>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[1px] text-[#457b9d]" style={{ fontFamily: "Inter, sans-serif" }}>
              AI ANALYSIS DASHBOARD
            </span>
          </div>
          {/* Profile Avatar */}
          <Link href="/mypage" className="relative flex size-10 items-center justify-center rounded-full border border-[#e1e1e1]">
            <Image
              src="/icons/profile-icon.svg"
              alt="Profile"
              width={24}
              height={24}
              style={{ filter: "brightness(0) saturate(100%) invert(52%) sepia(10%) saturate(1397%) hue-rotate(169deg) brightness(89%) contrast(87%)" }}
            />
            <div className="absolute -right-0.5 -top-0.5 z-10 size-3 rounded-full border-2 border-[#f1faee] bg-[#457b9d]" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8 p-5">
        {/* Daily Issue Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-[6px] bg-[rgba(142,202,230,0.2)] p-1">
              <Image
                src="/icons/briefing-icon.svg"
                alt=""
                width={20}
                height={24}
                style={{ filter: "brightness(0) saturate(100%) invert(52%) sepia(10%) saturate(1397%) hue-rotate(169deg) brightness(89%) contrast(87%)" }}
              />
            </div>
            <h2 className="text-[18px] font-bold text-[#1d3557]">데일리 이슈</h2>
          </div>

          <div className="flex flex-col gap-4 rounded-[24px] border border-[#e1e1e1] bg-white p-[21px]">
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
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-[6px] bg-[rgba(142,202,230,0.2)] p-1">
                <Image
                  src="/icons/briefing-icon.svg"
                  alt=""
                  width={20}
                  height={24}
                  style={{ filter: "brightness(0) saturate(100%) invert(52%) sepia(10%) saturate(1397%) hue-rotate(169deg) brightness(89%) contrast(87%)" }}
                />
              </div>
              <h2 className="text-[18px] font-bold text-[#1d3557]">리포트 히스토리</h2>
          </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
            {REPORT_CATEGORIES.map((cat) => (
              <CategoryButton
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => handleCategoryChange(cat)}
              />
            ))}
          </div>

          {/* Report Cards */}
          <div className="flex flex-col gap-3">
            {filteredReports.map((report, i) => (
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
