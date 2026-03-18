"use client";

import Link from "next/link";
import {
  DemoNavBar,
  DemoStreakBanner,
  DemoHighlightCard,
  DemoBriefingCard,
  DemoSectionTitle,
} from "@/components/demo";

export default function DemoDashboardPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white pb-[58px]">
      {/* ─── 헤더 ─── */}
      <div className="flex items-center justify-between px-[18px] pb-[8px] pt-[18px]">
        <span className="text-[15px] font-black tracking-[-0.5px] text-[#1cb863]">STOCKY</span>
        <div
          className="flex size-[33px] items-center justify-center overflow-hidden rounded-full border-2 border-[#1cb863] p-[2px]"
          style={{ backgroundImage: "linear-gradient(145deg, rgb(10,61,31) 0%, rgb(13,122,62) 100%)" }}
        >
          <span className="text-[12px] font-black text-white">남</span>
        </div>
      </div>

      {/* ─── 스트릭 배너 ─── */}
      <div className="mx-[18px] mb-[14px]">
        <DemoStreakBanner streak={5} goal={7} />
      </div>

      {/* ─── 인사 + 섹션 타이틀 ─── */}
      <div className="px-[18px] pb-[3px]">
        <p className="text-[10.5px] font-[350] text-[#8abeaa]">좋은 아침이에요 ☀️</p>
      </div>
      <div className="px-[18px] pb-[14px]">
        <p className="text-[19px] font-black tracking-[-0.5px] text-[#0f2318]">오늘의 리포트</p>
      </div>

      {/* ─── TODAY'S HIGHLIGHT ─── */}
      <div className="mx-[18px] mb-[14px]">
        <DemoHighlightCard
          ticker="NVDA"
          headline={"NVDA, 실적 서프라이즈\n기대감에 장전 +3.2%"}
          changeRate="+3.2%"
          tags={["📊 실적발표", "🔥 급등주"]}
        />
      </div>

      {/* ─── 내 종목 브리핑 ─── */}
      <div className="px-[18px] pb-[9px]">
        <DemoSectionTitle>내 종목 브리핑</DemoSectionTitle>
      </div>

      <div className="flex flex-col gap-[8px] mx-[18px]">
        <Link href="/demo/report">
          <DemoBriefingCard
            ticker="NVDA"
            summary="AI 수요 강세, 상승 여…"
            changeRate="+3.2%"
            aiScore={92}
            iconBg="#e8fcf0"
            icon="📈"
          />
        </Link>
        <Link href="/demo/report">
          <DemoBriefingCard
            ticker="AAPL"
            summary="인도 생산 확대, 공급…"
            changeRate="-0.8%"
            aiScore={83}
            iconBg="#eef4ff"
            icon="🍎"
          />
        </Link>
      </div>

      <DemoNavBar />
    </div>
  );
}
