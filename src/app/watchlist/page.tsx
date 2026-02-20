"use client";

import { useState } from "react";
import Image from "next/image";
import NavBar from "@/components/ui/NavBar";
import SearchBar from "@/components/onboarding/SearchBar";
import CategoryButton from "@/components/onboarding/CategoryButton";
import StockCard from "@/components/onboarding/StockCard";

const CATEGORIES = ["전체", "AI·반도체", "2차전지"];

const MY_STOCKS = [
  { ticker: "NVDA", name: "엔비디아 (NVIDIA Corp.)", marketCap: "시총 2.3T USD", price: "$880.45", logoText: "AI" },
  { ticker: "TSLA", name: "테슬라 (Tesla, Inc.)", marketCap: "시총 540B USD", price: "$240.10", logoText: "AI" },
];

const OTHER_STOCKS = [
  { ticker: "AAPL", name: "애플 (Apple Inc.)", marketCap: "시총 2.6T USD", price: "$173.50", logoText: "AAPL" },
  { ticker: "MSFT", name: "마이크로소프트 (Microsoft)", marketCap: "시총 3.1T USD", price: "$415.20", logoText: "MSFT" },
];

type SortType = "marketCap" | "name";

export default function WatchListPage() {
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

  const modifiedCount = selectedStocks.size;

  return (
    <div className="flex min-h-dvh flex-col bg-[#0d0d0d] pb-[72px]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[rgba(13,13,13,0.95)] pb-4 pt-4 backdrop-blur-sm">
        <div className="flex items-center justify-center px-4 pt-4">
          <h1 className="text-[20px] font-bold tracking-[-0.5px] text-white">내 관심 종목</h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-col px-4 py-2">
        {/* Search */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="종목명 또는 섹터 검색" />

        {/* Category Filters */}
        <div className="flex gap-2.5 py-1.5">
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
        <div className="flex items-center gap-2 px-1 py-1.5">
          <span className="text-xs font-medium text-[#6b7280]">정렬:</span>
          <div className="flex rounded-full border border-white/10 bg-[#1a1a1a] p-[3px]">
            <button
              onClick={() => setSortType("marketCap")}
              type="button"
              className={`rounded-full px-3 py-1 text-xs transition-all cursor-pointer ${
                sortType === "marketCap"
                  ? "bg-white/10 font-bold text-[#0f6]"
                  : "font-medium text-[#9ca3af]"
              }`}
            >
              시가총액순
            </button>
            <button
              onClick={() => setSortType("name")}
              type="button"
              className={`rounded-full px-3 py-1 text-xs transition-all cursor-pointer ${
                sortType === "name"
                  ? "bg-white/10 font-bold text-[#0f6]"
                  : "font-medium text-[#9ca3af]"
              }`}
            >
              종목명순
            </button>
          </div>
        </div>

        {/* 내 종목 Section */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 py-1.5">
            <span className="text-sm font-bold text-[#0f6]">내 종목</span>
            <div className="h-px flex-1 bg-[rgba(0,255,102,0.2)]" />
          </div>
          <div className="flex flex-col gap-3">
            {MY_STOCKS.map((stock) => (
              <StockCard
                key={stock.ticker}
                ticker={stock.ticker}
                name={stock.name}
                marketCap={stock.marketCap}
                price={stock.price}
                logoText={stock.logoText}
                selected={selectedStocks.has(stock.ticker)}
                onClick={() => toggleStock(stock.ticker)}
              />
            ))}
          </div>
        </div>

        {/* 다른 종목 Section */}
        <div className="flex flex-col mt-2">
          <div className="flex items-center gap-3 pb-1.5 pt-3">
            <span className="text-sm font-bold text-[#9ca3af]">다른 종목</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="flex flex-col gap-3">
            {OTHER_STOCKS.map((stock) => (
              <StockCard
                key={stock.ticker}
                ticker={stock.ticker}
                name={stock.name}
                marketCap={stock.marketCap}
                price={stock.price}
                logoText={stock.logoText}
                selected={selectedStocks.has(stock.ticker)}
                onClick={() => toggleStock(stock.ticker)}
              />
            ))}
          </div>

          {/* Loading Indicator */}
          <div className="flex items-center justify-center gap-2 py-12">
            <div className="size-1.5 rounded-full bg-[#6b7280]" />
            <span className="text-sm font-[350] text-[#6b7280]">데이터 로드 중...</span>
          </div>
        </div>
      </main>

      {/* Bottom Edit Bar */}
      {modifiedCount > 0 && (
        <div className="fixed bottom-[72px] left-0 right-0 z-30 px-4 pb-3">
          <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-[#1a1a1a] p-[17px] shadow-2xl">
            <span className="pl-2 text-sm font-bold text-white">{modifiedCount}개 종목 수정됨</span>
            <button className="rounded-[12px] border border-[#0f6] bg-[#0f6] px-[17px] py-[11px] text-sm font-bold text-black shadow-sm cursor-pointer">
              수정 완료
            </button>
          </div>
        </div>
      )}

      <NavBar />
    </div>
  );
}
