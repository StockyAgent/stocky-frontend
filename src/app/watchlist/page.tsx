"use client";

import { useState, useMemo } from "react";
import NavBar from "@/components/ui/NavBar";
import SearchBar from "@/components/ui/SearchBar";
import CategoryButton from "@/components/ui/CategoryButton";
import StockCard from "@/components/onboarding/StockCard";
import { ALL_STOCKS } from "@/data/stocks";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const CATEGORIES = ["전체", "AI·반도체", "2차전지"];

const MY_STOCK_TICKERS = new Set(["NVDA", "TSLA"]);

type SortType = "marketCap" | "name";

export default function WatchListPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [deselected, setDeselected] = useState<Set<string>>(new Set());
  const [newlySelected, setNewlySelected] = useState<Set<string>>(new Set());
  const [sortType, setSortType] = useState<SortType>("marketCap");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const isSearchMode = isSearchFocused || searchQuery.trim().length > 0;

  const myStocks = ALL_STOCKS.filter((s) => MY_STOCK_TICKERS.has(s.ticker));

  // Search results (across all stocks) when in search mode
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    let stocks = ALL_STOCKS;
    if (activeCategory !== "전체") {
      stocks = stocks.filter((s) => s.category === activeCategory);
    }
    return stocks.filter(
      (s) =>
        s.ticker.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [searchQuery, activeCategory]);

  // Other stocks (non-search mode)
  const otherStocksAll = useMemo(() => {
    let stocks = ALL_STOCKS.filter((s) => !MY_STOCK_TICKERS.has(s.ticker));
    if (activeCategory !== "전체") {
      stocks = stocks.filter((s) => s.category === activeCategory);
    }
    return stocks;
  }, [activeCategory]);

  const { visibleData: visibleOtherStocks, isLoading, hasMore, sentinelRef } = useInfiniteScroll({
    data: isSearchMode ? searchResults : otherStocksAll,
    pageSize: 10,
  });

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

  const getVariant = (ticker: string) => {
    if (MY_STOCK_TICKERS.has(ticker)) {
      return deselected.has(ticker) ? "type4" as const : "default" as const;
    }
    return newlySelected.has(ticker) ? "type3" as const : "type2" as const;
  };

  const toggleStock = (ticker: string) => {
    if (MY_STOCK_TICKERS.has(ticker)) {
      toggleMyStock(ticker);
    } else {
      toggleOtherStock(ticker);
    }
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
      <main className={`flex flex-col px-4 py-2 ${modifiedCount > 0 ? "pb-24" : ""}`}>
        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="종목명 또는 섹터 검색"
          onFocusChange={setIsSearchFocused}
        />

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

        {isSearchMode ? (
          /* ===== SEARCH MODE ===== */
          <div className="flex flex-col">
            <div className="flex items-center gap-3 py-1.5">
              <span className="text-sm font-bold text-[#457b9d]">검색된 종목</span>
              <div className="h-px flex-1 bg-[#e1e1e1]" />
            </div>
            <div className="flex flex-col gap-3">
              {visibleOtherStocks.map((stock) => (
                <StockCard
                  key={stock.ticker}
                  ticker={stock.ticker}
                  name={stock.name}
                  marketCap={stock.marketCap}
                  logoText={stock.logoText}
                  onClick={() => toggleStock(stock.ticker)}
                  variant={getVariant(stock.ticker)}
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
              {!hasMore && visibleOtherStocks.length > 0 && !isLoading && (
                <div className="flex justify-center py-4">
                  <span className="text-xs text-[#a0a0a0]">모든 종목을 불러왔습니다</span>
                </div>
              )}
            </div>

            {/* Still show 내 종목 below search results */}
            <div className="flex items-center gap-3 py-1.5 mt-2">
              <span className="text-sm font-bold text-[#457b9d]">내 종목</span>
              <div className="h-px flex-1 bg-[#e1e1e1]" />
            </div>
            <div className="flex flex-col gap-3">
              {myStocks.map((stock) => (
                <StockCard
                  key={stock.ticker}
                  ticker={stock.ticker}
                  name={stock.name}
                  marketCap={stock.marketCap}
                  logoText={stock.logoText}
                  onClick={() => toggleMyStock(stock.ticker)}
                  variant={deselected.has(stock.ticker) ? "type4" : "default"}
                />
              ))}
            </div>

            {/* 선택한 종목 (내 종목 제외, 새로 추가 선택한 종목) */}
            {newlySelected.size > 0 && (
              <div className="mt-2">
                <div className="flex items-center gap-3 py-1.5">
                  <span className="text-sm font-bold text-[#457b9d]">선택한 종목</span>
                  <div className="h-px flex-1 bg-[#e1e1e1]" />
                </div>
                <div className="flex flex-col gap-3">
                  {ALL_STOCKS.filter((s) => newlySelected.has(s.ticker)).map((stock) => (
                    <StockCard
                      key={stock.ticker}
                      ticker={stock.ticker}
                      name={stock.name}
                      marketCap={stock.marketCap}
                      logoText={stock.logoText}
                      onClick={() => toggleOtherStock(stock.ticker)}
                      variant="type3"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ===== NORMAL MODE ===== */
          <>
            {/* 내 종목 Section */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 py-1.5">
                <span className="text-sm font-bold text-[#457b9d]">내 종목</span>
                <div className="h-px flex-1 bg-[#e1e1e1]" />
              </div>
              <div className="flex flex-col gap-3">
                {myStocks.map((stock) => (
                  <StockCard
                    key={stock.ticker}
                    ticker={stock.ticker}
                    name={stock.name}
                    marketCap={stock.marketCap}
                    logoText={stock.logoText}
                    onClick={() => toggleMyStock(stock.ticker)}
                    variant={deselected.has(stock.ticker) ? "type4" : "default"}
                  />
                ))}
              </div>
            </div>

            {/* 다른 종목 Section */}
            <div className="flex flex-col mt-2">
              <div className="flex items-center gap-3 pb-1.5 pt-3">
                <span className="text-sm font-bold text-[#457b9d]">다른 종목</span>
                <div className="h-px flex-1 bg-[#e1e1e1]" />
              </div>
              <div className="flex flex-col gap-3">
                {visibleOtherStocks.map((stock) => (
                  <StockCard
                    key={stock.ticker}
                    ticker={stock.ticker}
                    name={stock.name}
                    marketCap={stock.marketCap}
                    logoText={stock.logoText}
                    onClick={() => toggleOtherStock(stock.ticker)}
                    variant={newlySelected.has(stock.ticker) ? "type3" : "type2"}
                  />
                ))}
              </div>

              {/* Infinite Scroll Sentinel + Loading */}
              <div ref={sentinelRef} className="py-4">
                {isLoading && (
                  <div className="flex items-center justify-center gap-2 py-4">
                    <div className="size-1.5 animate-pulse rounded-full bg-[#8ecae6]" />
                    <span className="text-sm font-[350] text-[#457b9d]">데이터 로드 중...</span>
                  </div>
                )}
                {!hasMore && visibleOtherStocks.length > 0 && !isLoading && (
                  <div className="flex justify-center py-4">
                    <span className="text-xs text-[#a0a0a0]">모든 종목을 불러왔습니다</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
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
