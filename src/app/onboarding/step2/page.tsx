"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { SortType } from "@/types";
import StepIndicator from "@/components/ui/StepIndicator";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SearchBar from "@/components/ui/SearchBar";
import CategoryButton from "@/components/ui/CategoryButton";
import StockCard from "@/components/onboarding/StockCard";
import { ALL_STOCKS, STOCK_CATEGORIES } from "@/data/stocks";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";


export default function Step2Page() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("전체");
  const [selectedStocks, setSelectedStocks] = useState<Set<string>>(new Set(["NVDA"]));
  const [sortType, setSortType] = useState<SortType>("marketCap");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const isSearchMode = isSearchFocused || searchQuery.trim().length > 0;

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

  // All stocks filtered by category (for normal mode)
  const categoryStocks = useMemo(() => {
    if (activeCategory === "전체") return ALL_STOCKS;
    return ALL_STOCKS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    let stocks = categoryStocks;
    return stocks.filter(
      (s) =>
        s.ticker.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [searchQuery, categoryStocks]);

  // Selected stocks data
  const selectedStockData = useMemo(() => {
    return ALL_STOCKS.filter((s) => selectedStocks.has(s.ticker));
  }, [selectedStocks]);

  const { visibleData, isLoading, hasMore, sentinelRef } = useInfiniteScroll({
    data: isSearchMode ? searchResults : categoryStocks,
    pageSize: 10,
  });

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#f1faee]">
      {/* Step Indicator */}
      <div className="sticky top-0 z-20">
        <StepIndicator currentStep={2} />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-5 pt-4 pb-44">
        {/* Heading */}
        <div className="mb-4">
          <h1 className="text-[28px] font-bold leading-[35px] text-[#1d3557]">관심 종목 선택</h1>
        </div>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="종목명 또는 섹터 검색"
          onFocusChange={setIsSearchFocused}
        />

        {/* Category Filters */}
        <div className="flex gap-2.5 py-1.5 overflow-x-auto">
          {STOCK_CATEGORIES.map((cat) => (
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

        {isSearchMode ? (
          /* ===== SEARCH MODE ===== */
          <>
            {/* 검색된 종목 */}
            <div className="flex items-center gap-3 py-1.5">
              <span className="text-sm font-bold text-[#457b9d]">검색된 종목</span>
              <div className="h-px flex-1 bg-[#e1e1e1]" />
            </div>
            <div className="flex flex-col gap-3">
              {visibleData.map((stock) => (
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

            {/* No Results / Loading */}
            <div ref={sentinelRef} className="py-4">
              {isLoading && (
                <div className="flex items-center justify-center gap-2 py-4">
                  <div className="size-1.5 animate-pulse rounded-full bg-[#8ecae6]" />
                  <span className="text-sm font-[350] text-[#457b9d]">데이터 로드 중...</span>
                </div>
              )}
              {!isLoading && searchQuery.trim().length > 0 && searchResults.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 py-12">
                  <span className="text-sm font-bold text-[#457b9d]">검색 결과가 없습니다</span>
                  <span className="text-xs text-[#a0a0a0]">&apos;{searchQuery}&apos;에 해당하는 종목을 찾을 수 없습니다</span>
                </div>
              )}
              {!hasMore && visibleData.length > 0 && !isLoading && (
                <div className="flex justify-center py-4">
                  <span className="text-xs text-[#a0a0a0]">모든 종목을 불러왔습니다</span>
                </div>
              )}
            </div>

            {/* 선택한 종목 */}
            {selectedStockData.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center gap-3 py-1.5">
                  <span className="text-sm font-bold text-[#457b9d]">선택한 종목</span>
                  <div className="h-px flex-1 bg-[#e1e1e1]" />
                </div>
                <div className="flex flex-col gap-3">
                  {selectedStockData.map((stock) => (
                    <StockCard
                      key={stock.ticker}
                      ticker={stock.ticker}
                      name={stock.name}
                      marketCap={stock.marketCap}
                      logoText={stock.logoText}
                      selected={true}
                      onClick={() => toggleStock(stock.ticker)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* ===== NORMAL MODE ===== */
          <>
            <div className="flex flex-col gap-3">
              {visibleData.map((stock) => (
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

            <div ref={sentinelRef} className="py-4">
              {isLoading && (
                <div className="flex items-center justify-center gap-2 py-4">
                  <div className="size-1.5 animate-pulse rounded-full bg-[#8ecae6]" />
                  <span className="text-sm font-[350] text-[#457b9d]">데이터 로드 중...</span>
                </div>
              )}
              {!hasMore && visibleData.length > 0 && !isLoading && (
                <div className="flex justify-center py-4">
                  <span className="text-xs text-[#a0a0a0]">모든 종목을 불러왔습니다</span>
                </div>
              )}
            </div>
          </>
        )}
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
