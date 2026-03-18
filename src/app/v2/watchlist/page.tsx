"use client";

import { useRouter } from "next/navigation";

const WATCHLIST = [
  { ticker: "NVDA", name: "엔비디아", price: "$880.45", change: "+3.2%", isUp: true, badge: "매수 추천", badgeColor: "#1cb863", logo: "NV" },
  { ticker: "AAPL", name: "애플", price: "$193.20", change: "-0.8%", isUp: false, badge: "보유 유지", badgeColor: "#4a90d9", logo: "AA" },
  { ticker: "TSLA", name: "테슬라", price: "$240.10", change: "+1.5%", isUp: true, badge: "관망", badgeColor: "#e8a020", logo: "TS" },
];

export default function V2WatchlistPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col bg-[#f5faf7]">
      {/* 헤더 */}
      <header className="flex items-center justify-between bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[20px] font-black text-[#0f2318]">내 관심종목</h1>
        <button
          type="button"
          onClick={() => router.push("/v2/watchlist/edit")}
          className="flex size-10 items-center justify-center rounded-[13px] bg-[#1cb863] text-lg shadow-[0_3px_0_#159e51] active:translate-y-0.5 active:shadow-[0_1.5px_0_#159e51] transition-all"
        >
          <span className="-scale-x-100">✏️</span>
        </button>
      </header>

      {/* 총 평가금액 카드 */}
      <div className="mx-5 mt-4 rounded-[20px] bg-white p-5 shadow-[0_6px_0_#d0e8d8,0_8px_24px_rgba(0,0,0,0.06)]">
        <p className="text-[11px] font-bold text-[#8abeaa]">총 평가금액</p>
        <p className="mt-2 text-[34px] font-black text-[#0f2318]">$2,813.70</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-[13px] font-bold text-[#1cb863]">총 수익 +$124.30</span>
          <span className="text-[13px] font-bold text-[#1cb863]">수익률 +4.6%</span>
        </div>
        <p className="mt-1 text-[11px] text-[#8abeaa]">보유 종목 3개</p>
      </div>

      {/* 목록 */}
      <div className="mx-5 mt-5 mb-24">
        <p className="mb-3 text-[11px] font-bold text-[#8abeaa]">목록</p>
        <div className="flex flex-col gap-2">
          {WATCHLIST.map((stock) => (
            <button
              key={stock.ticker}
              type="button"
              onClick={() => router.push(`/v2/report/${stock.ticker}`)}
              className="flex items-center gap-3 rounded-[18px] bg-white px-4 py-4 shadow-[0_4px_0_#d8ead0,0_6px_16px_rgba(0,0,0,0.05)] transition-all active:translate-y-0.5 active:shadow-none"
            >
              {/* 로고 */}
              <div className="flex size-11 shrink-0 items-center justify-center rounded-[13px] bg-[#1cb863] text-[12px] font-black text-white shadow-[0_3px_0_#159e51]">
                {stock.logo}
              </div>

              {/* 종목명 */}
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[15px] font-black text-[#0f2318]">{stock.ticker}</p>
                <p className="text-[11.5px] text-[#8abeaa]">{stock.name}</p>
              </div>

              {/* 가격 + 배지 */}
              <div className="flex flex-col items-end gap-1">
                <p className="text-[15px] font-black text-[#0f2318]">{stock.price}</p>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10.5px] font-black text-white"
                  style={{ backgroundColor: stock.badgeColor }}
                >
                  {stock.badge}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 flex border-t border-[#eef5f2] bg-white">
        {[
          { icon: "🏠", label: "홈", href: "/v2/home", active: false },
          { icon: "⭐", label: "관심종목", href: "/v2/watchlist", active: true },
          { icon: "👤", label: "MY", href: "/v2/my", active: false },
        ].map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => router.push(tab.href)}
            className="flex flex-1 flex-col items-center gap-1 py-3"
          >
            <span className="text-xl">{tab.icon}</span>
            <span className={`text-[10px] font-bold ${tab.active ? "text-[#1cb863]" : "text-[#b0c8b8]"}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
