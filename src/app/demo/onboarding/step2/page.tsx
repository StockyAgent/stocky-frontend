"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DemoStepIndicator, DemoPrimaryButton } from "@/components/demo";
import { STOCK_CATEGORIES } from "@/data/stocks";

const STOCKS = [
  { ticker: "NVDA", name: "엔비디아 Corp.", price: "$880.45", marketCap: "시총 2.3T", category: "AI·반도체", defaultSelected: true },
  { ticker: "AAPL", name: "애플 Inc.",      price: "$193.20", marketCap: "시총 3.0T", category: "AI·반도체", defaultSelected: true },
  { ticker: "TSLA", name: "테슬라 Inc.",    price: "$240.10", marketCap: "시총 540B", category: "AI·반도체", defaultSelected: false },
  { ticker: "MSFT", name: "마이크로소프트", price: "$415.30", marketCap: "시총 3.1T", category: "AI·반도체", defaultSelected: false },
  { ticker: "GOOGL", name: "알파벳 Inc.",   price: "$175.20", marketCap: "시총 1.9T", category: "AI·반도체", defaultSelected: false },
  { ticker: "AMD",  name: "AMD Inc.",        price: "$165.50", marketCap: "시총 230B", category: "AI·반도체", defaultSelected: false },
  { ticker: "LG에너지", name: "LG에너지솔루션", price: "₩82,000",  marketCap: "시총 80T",  category: "2차전지", defaultSelected: false },
  { ticker: "삼성SDI",  name: "삼성SDI",       price: "₩380,000", marketCap: "시총 25T",  category: "2차전지", defaultSelected: false },
  { ticker: "CATL",     name: "닝더스다이",     price: "$35.20",   marketCap: "시총 150B", category: "2차전지", defaultSelected: false },
];


export default function DemoStep2Page() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(
    new Set(STOCKS.filter(s => s.defaultSelected).map(s => s.ticker))
  );
  const [activeCategory, setActiveCategory] = useState("전체");
  const [sort, setSort] = useState<"시가총액순" | "종목명순">("시가총액순");
  const [search, setSearch] = useState("");

  const toggleStock = (ticker: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(ticker) ? next.delete(ticker) : next.add(ticker);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = STOCKS;
    if (activeCategory !== "전체") list = list.filter(s => s.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(s => s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
    }
    if (sort === "종목명순") list = [...list].sort((a, b) => a.ticker.localeCompare(b.ticker));
    return list;
  }, [activeCategory, sort, search]);

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* Step indicator */}
      <DemoStepIndicator current={2} total={2} />

      {/* 상단 고정 영역 */}
      <div className="px-[18px]">
        {/* 타이틀 */}
        <div className="pb-[7px]">
          <div className="text-[22px] font-black leading-[28.16px] tracking-[-0.6px] text-[#0f2318]">
            <p>관심 종목을</p>
            <p>골라봐요 📈</p>
          </div>
        </div>

        {/* 검색창 */}
        <div className="pb-[11px]">
          <div className="flex items-center gap-[9px] rounded-[13px] border-2 border-[#d8f0e2] bg-white px-[16px] py-[13px] shadow-[0px_2px_0px_0px_#d8f0e2]">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0">
              <circle cx="6.5" cy="6.5" r="5" stroke="#8abeaa" strokeWidth="1.5"/>
              <path d="M11 11L13.5 13.5" stroke="#8abeaa" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="종목명 또는 섹터 검색"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-[12.5px] font-[350] text-[#0f2318] placeholder:text-[#8abeaa] focus:outline-none"
            />
          </div>
        </div>

        {/* 카테고리 탭 */}
        <div className="flex gap-[7px] pb-[9px]">
          {STOCK_CATEGORIES.slice(0, 3).map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-[22px] border-2 px-[15px] py-[8px] text-[11.5px] font-bold cursor-pointer transition-all ${
                activeCategory === cat
                  ? "border-[#1cb863] bg-[#1cb863] text-white shadow-[0px_3px_0px_0px_#159e51]"
                  : "border-[#d8f0e2] bg-white text-[#3d6b50] shadow-[0px_2px_0px_0px_#d8f0e2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 정렬 탭 */}
        <div className="flex items-center gap-[6px] pb-[10px]">
          {(["시가총액순", "종목명순"] as const).map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => setSort(opt)}
              className={`rounded-[8px] px-[12px] py-[5px] text-[11px] font-bold cursor-pointer transition-all ${
                sort === opt
                  ? "bg-[#1cb863] text-white shadow-[0px_2px_0px_0px_#159e51]"
                  : "border-2 border-[#d8f0e2] bg-white text-[#8abeaa] shadow-[0px_2px_0px_0px_#d8f0e2]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* 선택 카운트 배지 */}
        <div className="flex items-center justify-between pb-[10px]">
          <div className="flex items-center gap-[6px] rounded-[20px] border border-[#d0f5e0] bg-[#e8fcf0] px-[13px] py-[6px]">
            <div className="size-[7px] rounded-[3.5px] bg-[#1cb863]" />
            <span className="text-[11px] font-black text-[#0d7a3e]">{selected.size}개 선택됨</span>
          </div>
          <span className="text-[10.5px] font-[350] text-[#8abeaa]">최소 1개 이상</span>
        </div>
      </div>

      {/* 종목 목록 */}
      <div className="flex flex-col gap-[8px] px-[18px] pb-[100px]">
        {filtered.map(stock => {
          const isSelected = selected.has(stock.ticker);
          return (
            <button
              key={stock.ticker}
              type="button"
              onClick={() => toggleStock(stock.ticker)}
              className={`flex w-full items-center gap-[10px] rounded-[15px] border-2 px-[16px] py-[14px] text-left cursor-pointer transition-all ${
                isSelected
                  ? "border-[#1cb863] bg-[#e8fcf0] shadow-[0px_3px_0px_0px_#159e51]"
                  : "border-[#d8f0e2] bg-white shadow-[0px_3px_0px_0px_#d8f0e2]"
              }`}
            >
              {/* 체크박스 */}
              <div className={`flex size-[23px] shrink-0 items-center justify-center rounded-[7px] border-2 transition-all ${
                isSelected ? "border-[#1cb863] bg-[#1cb863]" : "border-[#d8f0e2] bg-white"
              }`}>
                {isSelected && <span className="text-[13px] font-black leading-none text-white">✓</span>}
              </div>
              {/* AI 배지 */}
              <div className="shrink-0 rounded-[5px] bg-[#e8fcf0] px-[7px] py-[2px]">
                <span className="text-[9px] font-black text-[#0d7a3e]">AI</span>
              </div>
              {/* 종목명 */}
              <div className="flex-1 min-w-0">
                <p className="text-[13.4px] font-black text-[#0f2318]">{stock.ticker}</p>
                <p className="truncate text-[10.5px] font-[350] text-[#8abeaa]">{stock.name}</p>
              </div>
              {/* 가격/시총 */}
              <div className="flex flex-col items-end gap-px shrink-0 w-[54px]">
                <p className="text-[13.3px] font-black text-[#0f2318]">{stock.price}</p>
                <p className="text-[10px] font-[350] text-[#8abeaa]">{stock.marketCap}</p>
              </div>
            </button>
          );
        })}

        {filtered.length > 0 && (
          <div className="flex items-center justify-center py-[9px]">
            <span className="text-[10.5px] font-bold text-[#8abeaa]">⟳ 더 불러오는 중...</span>
          </div>
        )}
        {filtered.length === 0 && (
          <div className="flex items-center justify-center py-10">
            <span className="text-[12px] text-[#8abeaa]">검색 결과가 없습니다</span>
          </div>
        )}
      </div>

      {/* 하단 CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-[18px] pb-[24px] pt-[12px]">
        <DemoPrimaryButton
          onClick={() => selected.size > 0 && router.push("/demo/dashboard")}
          disabled={selected.size === 0}
        >
          Stocky 시작하기 🚀
        </DemoPrimaryButton>
      </div>
    </div>
  );
}
