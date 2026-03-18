"use client";

import { useRouter } from "next/navigation";
import {
  DemoNavBar,
  DemoPortfolioCard,
  DemoWatchlistCard,
  DemoSectionTitle,
} from "@/components/demo";

export default function DemoWatchlistPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col bg-white pb-[58px]">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-[18px] pb-[14px] pt-[18px]">
        <p className="text-[19px] font-black text-[#0f2318]">내 관심종목</p>
        <button
          type="button"
          className="flex size-[33px] items-center justify-center rounded-[11px] bg-[#1cb863] text-white shadow-[0px_3px_0px_0px_#159e51] cursor-pointer"
        >
          <span className="text-[20px] font-light leading-[20px]">+</span>
        </button>
      </div>

      {/* 포트폴리오 카드 */}
      <div className="mx-[18px] mb-[14px]">
        <DemoPortfolioCard
          totalValue="$2,813.70"
          stats={[
            { label: "총 수익",  value: "+$124.30", color: "#ff4d4d" },
            { label: "수익률",   value: "+4.6%",    color: "#ff4d4d" },
            { label: "보유종목", value: "2개",       color: "#0d7a3e" },
          ]}
        />
      </div>

      {/* 종목 섹션 타이틀 */}
      <div className="px-[18px] pb-[9px]">
        <DemoSectionTitle>내 종목</DemoSectionTitle>
      </div>

      {/* 종목 카드들 */}
      <div className="flex flex-col gap-[8px] px-[18px]">
        <DemoWatchlistCard
          logo="NV"  logoBg="#76b900"
          ticker="NVDA" name="엔비디아"
          price="$880.45" badge="buy"
          onClick={() => router.push("/demo/report")}
        />
        <DemoWatchlistCard
          logo="AP"  logoBg="#444"
          ticker="AAPL" name="애플"
          price="$193.20" badge="hold"
          onClick={() => router.push("/demo/report")}
        />
        <DemoWatchlistCard
          logo="TS"  logoBg="#cc0000"
          ticker="TSLA" name="테슬라"
          price="$240.10" badge="watch"
          onClick={() => router.push("/demo/report")}
        />
      </div>

      <DemoNavBar />
    </div>
  );
}
