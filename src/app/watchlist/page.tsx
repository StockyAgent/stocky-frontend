"use client";

import { useState } from "react";
import NavBar from "@/components/ui/NavBar";
import SearchBar from "@/components/ui/SearchBar";
import CategoryButton from "@/components/ui/CategoryButton";
import StockCard from "@/components/onboarding/StockCard";

const CATEGORIES = ["전체", "AI·반도체", "2차전지"];

const MY_STOCKS = [
  { ticker: "NVDA", name: "엔비디아 (NVIDIA Corp.)", marketCap: "시총 2.3T USD", logoText: "AI" },
  { ticker: "TSLA", name: "테슬라 (Tesla, Inc.)", marketCap: "시총 540B USD", logoText: "AI" },
];

const OTHER_STOCKS = [
  { ticker: "AAPL", name: "애플 (Apple Inc.)", marketCap: "시총 2.6T USD", logoText: "AAPL" },
  { ticker: "MSFT", name: "마이크로소프트 (Microsoft)", marketCap: "시총 3.1T USD", logoText: "MSFT" },
];

type SortType = "marketCap" | "name";

export default function WatchListPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  // Track original registered stocks
  const originalRegistered = new Set(MY_STOCKS.map((s) => s.ticker));
  // Track deselected (removed) registered stocks
  const [deselected, setDeselected] = useState<Set<string>>(new Set());
  // Track newly selected unregistered stocks
  const [newlySelected, setNewlySelected] = useState<Set<string>>(new Set());
  const [sortType, setSortType] = useState<SortType>("marketCap");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMyStock = (ticker: string) => {
    setDeselected((prev) => {
      const next = new Set(prev);
      if (next.has(ticker)) {
        next.delete(ticker);
      } else {
        next.add(ticker);
      }
      return next;
    });
  };

  const toggleOtherStock = (ticker: string) => {
    setNewlySelected((prev) => {
      const next = new Set(prev);
      if (next.has(ticker)) {
        next.delete(ticker);
      } else {
        next.add(ticker);
      }
      return next;
    });
  };

  const modifiedCount = deselected.size + newlySelected.size;

  return (
    <div className="flex min-h-dvh flex-col bg-[#f1faee] pb-[72px]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#f1faee] pb-4 pt-4 backdrop-blur-sm">
        <div className="flex items-center justify-center px-4 pt-4">
          <h1 className="text-[20px] font-bold tracking-[-0.5px] text-[#1d3557]">내 관심 종목</h1>
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
          <span className="text-xs font-medium text-[#457b9d]">정렬:</span>
          <div className="flex rounded-full border border-[#e1e1e1] bg-white p-[3px]">
            <button
              onClick={() => setSortType("marketCap")}
              type="button"
              className={`rounded-full px-3 py-1 text-xs transition-all cursor-pointer ${
                sortType === "marketCap"
                  ? "bg-[#e1e1e1] font-bold text-[#457b9d]"
                  : "font-medium text-[#a0a0a0]"
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
                  : "font-medium text-[#a0a0a0]"
              }`}
            >
              종목명순
            </button>
          </div>
        </div>

        {/* 내 종목 Section */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 py-1.5">
            <span className="text-sm font-bold text-[#457b9d]">내 종목</span>
            <div className="h-px flex-1 bg-[#e1e1e1]" />
          </div>
          <div className="flex flex-col gap-3">
            {MY_STOCKS.map((stock) => {
              const isDeselected = deselected.has(stock.ticker);
              return (
                <StockCard
                  key={stock.ticker}
                  ticker={stock.ticker}
                  name={stock.name}
                  marketCap={stock.marketCap}
                  logoText={stock.logoText}
                  onClick={() => toggleMyStock(stock.ticker)}
                  variant={isDeselected ? "type4" : "default"}
                />
              );
            })}
          </div>
        </div>

        {/* 다른 종목 Section */}
        <div className="flex flex-col mt-2">
          <div className="flex items-center gap-3 pb-1.5 pt-3">
            <span className="text-sm font-bold text-[#457b9d]">다른 종목</span>
            <div className="h-px flex-1 bg-[#e1e1e1]" />
          </div>
          <div className="flex flex-col gap-3">
            {OTHER_STOCKS.map((stock) => {
              const isNewlySelected = newlySelected.has(stock.ticker);
              return (
                <StockCard
                  key={stock.ticker}
                  ticker={stock.ticker}
                  name={stock.name}
                  marketCap={stock.marketCap}
                  logoText={stock.logoText}
                  onClick={() => toggleOtherStock(stock.ticker)}
                  variant={isNewlySelected ? "type3" : "type2"}
                />
              );
            })}
          </div>

          {/* Loading Indicator */}
          <div className="flex items-center justify-center gap-2 py-12">
            <div className="size-1.5 rounded-full bg-[#a0a0a0]" />
            <span className="text-sm font-[350] text-[#a0a0a0]">데이터 로드 중...</span>
          </div>
        </div>
      </main>

      {/* Bottom Edit Bar */}
      {modifiedCount > 0 && (
        <div className="fixed bottom-[72px] left-0 right-0 z-30 px-4 pb-3">
          <div className="flex items-center justify-between rounded-[16px] border border-[#e1e1e1] bg-[rgba(241,250,238,0.9)] p-[17px] shadow-[0px_20px_50px_-27px_rgba(0,0,0,0.25)]">
            <span className="pl-2 text-sm font-bold text-[#1d3557]">{modifiedCount}개 종목 수정됨</span>
            <button className="rounded-[12px] border border-[#8ecae6] bg-[#8ecae6] px-[17px] py-[11px] text-sm font-bold text-[#1d3557] shadow-sm cursor-pointer">
              수정 완료
            </button>
          </div>
        </div>
      )}

      <NavBar />
    </div>
  );
}
