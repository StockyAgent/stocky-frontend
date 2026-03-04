"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepIndicator from "@/components/ui/StepIndicator";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SearchBar from "@/components/ui/SearchBar";
import CategoryButton from "@/components/ui/CategoryButton";
import StockCard from "@/components/onboarding/StockCard";

const CATEGORIES = ["전체", "AI·반도체", "2차전지", "헬스케어", "플랫폼"];

const STOCKS = [
  { ticker: "NVDA", name: "엔비디아 (NVIDIA Corp.)", marketCap: "시총 2.3T USD", price: "$880.45", logoText: "AI" },
  { ticker: "TSLA", name: "테슬라 (Tesla, Inc.)", marketCap: "시총 540B USD", price: "$240.10", logoText: "AI" },
  { ticker: "AAPL", name: "애플 (Apple Inc.)", marketCap: "시총 2.6T USD", price: "$173.50", logoText: "AAPL" },
  { ticker: "MSFT", name: "마이크로소프트 (Microsoft)", marketCap: "시총 3.1T USD", price: "$415.20", logoText: "MSFT" },
  { ticker: "GOOGL", name: "구글 (Alphabet Inc.)", marketCap: "시총 1.8T USD", price: "$152.26", logoText: "GOOGL" },
];

type SortType = "marketCap" | "name";

export default function Step2Page() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("전체");
  const [selectedStocks, setSelectedStocks] = useState<Set<string>>(new Set(["NVDA"]));
  const [sortType, setSortType] = useState<SortType>("marketCap");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleStock = (ticker: string) => {
    setSelectedStocks((prev) => {
      const next = new Set(prev);
      if (next.has(ticker)) {
        next.delete(ticker);
      } else {
        next.add(ticker);
      }
      return next;
    });
  };

  const filteredStocks = STOCKS.filter(
    (s) =>
      s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#f1faee]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#f1faee]">
        <StepIndicator currentStep={2} />
        <div className="px-4 pt-2 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-[#1d3557]">
            관심 종목 선택
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pb-44">
        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Category Buttons */}
        <div className="flex gap-2.5 overflow-x-auto py-1.5 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <CategoryButton
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center justify-between px-1 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#457b9d]">정렬:</span>
            <div className="flex rounded-full border border-[#e1e1e1] bg-white p-[3px]">
              <button
                onClick={() => setSortType("marketCap")}
                type="button"
                className={`rounded-full px-3 py-1 text-xs transition-all cursor-pointer ${
                  sortType === "marketCap"
                    ? "bg-[#e1e1e1] font-bold text-[#457b9d]"
                    : "text-[#a0a0a0] font-medium"
                }`}
              >
                시가총액순
              </button>
              <button
                onClick={() => setSortType("name")}
                type="button"
                className={`rounded-full px-3 py-1 text-xs transition-all cursor-pointer ${
                  sortType === "name"
                    ? "bg-[#e1e1e1] font-bold text-[#457b9d]"
                    : "text-[#a0a0a0] font-medium"
                }`}
              >
                종목명순
              </button>
            </div>
          </div>
        </div>

        {/* Stock List */}
        <div className="flex flex-col gap-3">
          {filteredStocks.map((stock) => (
            <StockCard
              key={stock.ticker}
              ticker={stock.ticker}
              name={stock.name}
              marketCap={stock.marketCap}
              logoText={stock.logoText}
              selected={selectedStocks.has(stock.ticker)}
              onClick={() => toggleStock(stock.ticker)}
            />
          ))}
        </div>

        {/* Loading Indicator */}
        <div className="flex items-center justify-center gap-2 py-12">
          <div className="size-1.5 rounded-full bg-[#a0a0a0]" />
          <span className="text-sm font-light text-[#a0a0a0]">데이터 로드 중...</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-linear-to-t from-[#f1faee] via-[#f1faee] to-transparent pb-8 pt-5 flex justify-center px-5">
        <PrimaryButton onClick={() => router.push("/dashboard")} disabled={selectedStocks.size === 0}>
          Stocky 시작하기
        </PrimaryButton>
      </div>
    </div>
  );
}
