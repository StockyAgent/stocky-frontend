"use client";

import { useState } from "react";
import SubpageHeader from "@/components/ui/SubpageHeader";
import SearchBar from "@/components/onboarding/SearchBar";
import CategoryButton from "@/components/onboarding/CategoryButton";
import ReportCard from "@/components/dashboard/ReportCard";

const CATEGORIES = ["전체", "데일리", "심층분석", "위클리"];

const REPORTS = [
  { type: "데일리" as const, date: "2024.03.21", title: "3월 21일 AAPL", description: "애플에 대한 데일리 분석, 어쩌구 저쩌구 나올…" },
  { type: "주간" as const, date: "2026.03.16", title: "3월 3주차 요약", description: "주차별 리포트, 어떤 내용이 리포트로 쓰여야 좋…" },
  { type: "심층분석" as const, date: "2026.03.19", title: "애플(AAPL) 심층 분석", description: "심층 리포트 내용이 여기로 들어가, 리포트 폼은…" },
];

export default function ReportsPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-dvh flex-col bg-[#0d0d0d]">
      <SubpageHeader title="리포트 히스토리" />

      {/* Search */}
      <div className="px-5 py-4 bg-[#0d0d0d]">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="리포트 검색 (제목, 태그, 핵심 키워드)"
        />
      </div>

      {/* Sticky Category Filters */}
      <div className="sticky top-[107px] z-10 border-b border-white/5 bg-[rgba(13,13,13,0.95)] px-5 pb-3 backdrop-blur-[12px]">
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <CategoryButton
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </div>

      {/* Report Cards */}
      <div className="flex flex-col gap-3 px-5 py-3">
        {REPORTS.map((report, i) => (
          <ReportCard
            key={i}
            type={report.type}
            date={report.date}
            title={report.title}
            description={report.description}
          />
        ))}

        {/* Loading Indicator */}
        <div className="flex items-center justify-center gap-2 py-12">
          <div className="size-1.5 rounded-full bg-[#6b7280]" />
          <span className="text-sm font-[350] text-[#6b7280]">데이터 로드 중...</span>
        </div>
      </div>
    </div>
  );
}
