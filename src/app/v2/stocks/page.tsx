"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { V2_STOCKS } from "@/data/v2/mock";

const CATEGORIES = ["전체", "AI·반도체", "빅테크", "전기차"];

export default function V2StocksPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set(["NVDA", "AAPL"]));
  const [category, setCategory] = useState("전체");
  const [search, setSearch] = useState("");

  const toggle = (ticker: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(ticker) ? next.delete(ticker) : next.add(ticker);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = V2_STOCKS;
    if (category !== "전체") list = list.filter((s) => s.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((s) => s.ticker.toLowerCase().includes(q) || s.name.includes(q));
    }
    return list;
  }, [category, search]);

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* 고정 헤더 */}
      <div className="sticky top-0 z-10 bg-white px-5 pt-5 pb-3">
        {/* 진행바 */}
        <div className="mb-5 flex gap-1">
          <div className="h-1.5 flex-1 rounded-full bg-[#1cb863]" />
          <div className="h-1.5 flex-1 rounded-full bg-[#1cb863]" />
        </div>

        {/* 타이틀 */}
        <div className="mb-3">
          <h1 className="text-[24px] font-black leading-tight text-[#0f2318]">
            관심 종목을<br />
            <span className="text-[#1cb863]">골라봐요 📈</span>
          </h1>
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex size-5 items-center justify-center rounded-[6px] bg-[#1cb863] text-[10px]">🚀</div>
            <p className="text-[12px] font-bold text-[#3d6b50]">테크투자 코치가 매일 분석해드려요</p>
          </div>
        </div>

        {/* 검색창 */}
        <div className="mb-3 flex items-center gap-2 rounded-[13px] border-2 border-[#d8f0e2] bg-white px-4 py-3 shadow-[0_2px_0_#d8f0e2]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="#8abeaa" strokeWidth="1.5" />
            <path d="M10.5 10.5L13 13" stroke="#8abeaa" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="종목명 또는 티커 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-[12.5px] text-[#0f2318] placeholder:text-[#8abeaa] focus:outline-none"
          />
        </div>

        {/* 카테고리 */}
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-[22px] border-2 px-4 py-1.5 text-[11.5px] font-bold transition-all active:translate-y-[1.5px] ${
                cat === category
                  ? "border-[#1cb863] bg-[#1cb863] text-white shadow-[0_3px_0_#159e51] active:shadow-[0_1.5px_0_#159e51]"
                  : "border-[#d8f0e2] bg-white text-[#3d6b50] shadow-[0_2px_0_#d8f0e2] active:shadow-[0_0.5px_0_#d8f0e2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 선택 카운트 */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 rounded-full border border-[#d0f5e0] bg-[#e8fcf0] px-3 py-1.5">
            <div className="size-1.5 rounded-full bg-[#1cb863]" />
            <span className="text-[11px] font-black text-[#0d7a3e]">{selected.size}개 선택됨</span>
          </div>
          <span className="text-[10.5px] text-[#8abeaa]">최소 1개 이상</span>
        </div>
      </div>

      {/* 종목 목록 */}
      <div className="flex flex-col gap-2 px-5 py-3 pb-28">
        {filtered.map((stock) => {
          const isSel = selected.has(stock.ticker);
          return (
            <button
              key={stock.ticker}
              type="button"
              onClick={() => toggle(stock.ticker)}
              className={`flex w-full items-center gap-3 rounded-[16px] border-2 px-4 py-3.5 text-left transition-all duration-150 ${
                isSel
                  ? "-translate-y-[2px] border-[#1cb863] bg-[#edfaf3] shadow-[0_2.5px_0_#50cf84] active:translate-y-0 active:shadow-[0_0.5px_0_#50cf84]"
                  : "translate-y-0 border-[#eef5f2] bg-white shadow-none"
              }`}
            >
              {/* 체크박스 */}
              <div className={`flex size-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                isSel ? "border-[#1cb863] bg-[#1cb863]" : "border-[#d0e8d8] bg-white"
              }`}>
                {isSel && <span className="text-[12px] font-black text-white">✓</span>}
              </div>

              {/* 로고 */}
              <div className={`flex size-9 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-black text-white shadow-[0_2px_0_rgba(0,0,0,0.15)] ${
                isSel ? "bg-[#1cb863]" : "bg-[#b0c8b8]"
              }`}>
                {stock.logo}
              </div>

              {/* 종목 정보 */}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-black text-[#0f2318]">{stock.ticker}</p>
                <p className="text-[11px] text-[#8abeaa]">{stock.name} · {stock.category}</p>
              </div>

              {/* 가격 */}
              <div className="shrink-0 text-right">
                <p className="text-[13px] font-black text-[#0f2318]">{stock.price}</p>
                <p className={`text-[11px] font-bold ${stock.isUp ? "text-[#1cb863]" : "text-[#e84545]"}`}>
                  {stock.change}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 하단 CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-5 pb-8 pt-4">
        <button
          type="button"
          disabled={selected.size === 0}
          onClick={() => router.push("/v2/home")}
          className="w-full rounded-[16px] bg-[#1cb863] px-5 py-4 text-[15px] font-black text-white shadow-[0_5px_0_#159e51] transition-all disabled:opacity-50 active:translate-y-1 active:shadow-[0_2px_0_#159e51]"
        >
          Stocky 시작하기 ✨
        </button>
        <p className="mt-2 text-center text-[11px] text-[#aac9b5]">나중에 설정에서 언제든 종목을 변경할 수 있습니다.</p>
      </div>
    </div>
  );
}
