"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STOCKS = [
  { ticker: "NVDA", name: "엔비디아", change: "+3.2%", isUp: true, brief: "AI 수요 급증, 실적 서프라이즈...", score: 92, logo: "NV" },
  { ticker: "AAPL", name: "애플", change: "-0.8%", isUp: false, brief: "신제품 발표 앞두고 관망세...", score: 63, logo: "AA" },
  { ticker: "TSLA", name: "테슬라", change: "+1.5%", isUp: true, brief: "자율주행 FSD 업데이트 호재...", score: 71, logo: "TS" },
];

export default function V2HomePage() {
  const router = useRouter();

  const [showCoachBriefing, setShowCoachBriefing] = useState(true);

  return (
    <div className="flex min-h-dvh flex-col bg-[#f5faf7]">
      {/* 헤더 */}
      <header className="flex items-center justify-between bg-white px-5 py-4 shadow-sm">
        <span className="text-[20px] font-black tracking-wider text-[#0f2318]">STOCKY</span>
        <button
          type="button"
          onClick={() => router.push("/v2/briefings")}
          className="relative flex size-10 items-center justify-center rounded-[13px] bg-[#1cb863] text-xl shadow-[0_3px_0_#159e51] active:translate-y-0.5 active:shadow-[0_1.5px_0_#159e51] transition-all"
        >
          🚀
          <span 
            className={`absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-[#ff4a4a] shadow-sm ring-[1.5px] ring-white transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              !showCoachBriefing ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`} 
          />
        </button>
      </header>

      {/* 연속 리포트 스트릭 */}
      <div className="mx-5 mt-4 flex items-center gap-2 rounded-[12px] bg-[#fff9e6] px-4 py-2.5 shadow-[0_2px_0_#f0e0b0]">
        <span>🔥</span>
        <span className="text-[12px] font-bold text-[#c47a00]">5일 연속 리포트 확인!</span>
        <div className="ml-auto flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="size-2 rounded-full bg-[#1cb863]" />
          ))}
          <div className="size-2 rounded-full bg-[#e0e0e0]" />
        </div>
      </div>

      {/* 코치 브리핑 카드 */}
      <div 
        className={`relative z-10 grid transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${!showCoachBriefing ? "pointer-events-none" : ""}`}
        style={{ gridTemplateRows: showCoachBriefing ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-visible">
          <div 
            className="mx-5 bg-white p-5 rounded-[20px]"
            style={{
              marginTop: showCoachBriefing ? "1rem" : "0",
              opacity: showCoachBriefing ? 1 : 0,
              boxShadow: showCoachBriefing ? "0 6px 0 #d0e8d8, 0 8px 24px rgba(0,0,0,0.06)" : "none",
              pointerEvents: showCoachBriefing ? "auto" : "none",
              transition: "margin-top 500ms cubic-bezier(0.2,0.8,0.2,1), opacity 150ms ease-out, box-shadow 150ms ease-out"
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex size-8 items-center justify-center rounded-[10px] bg-[#1cb863] text-base shadow-[0_2px_0_#159e51]">🚀</div>
              <div>
                <p className="text-[13px] font-black text-[#0f2318]">테크 트렌드 코치</p>
                <p className="text-[10.5px] text-[#8abeaa]">오늘의 브리핑 · 07:30</p>
              </div>
            </div>
            <div className="rounded-[12px] border-l-2 border-[#1cb863] bg-[#f5faf7] px-4 py-3 mb-4">
              <p className="text-[12.5px] leading-relaxed text-[#1a1a1a] italic">
                &quot;NVDA가 실적 서프라이즈를 냈어! AI 칩 수요가 예상보다 40% 높았는데, 이게 네 포트폴리오에 어떤 의미인지 같이 볼까?&quot;
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => router.push("/v2/report/AAPL")}
                className="flex-1 rounded-[12px] bg-[#1cb863] px-4 py-3 text-[13px] font-black text-white shadow-[0_4px_0_#159e51] transition-all active:translate-y-1 active:shadow-none"
              >
                자세히 보기
              </button>
              <button
                type="button"
                onClick={() => setShowCoachBriefing(false)}
                className="flex-1 rounded-[12px] border-2 border-[#e0e0e0] bg-white px-4 py-3 text-[13px] font-bold text-[#5a5a5a] shadow-[0_3px_0_#e0e0e0] transition-all active:translate-y-1 active:shadow-none"
              >
                나중에 읽기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 오늘의 하이라이트 */}
      <div className="mx-5 mt-5">
        <p className="mb-3 text-[11px] font-bold text-[#8abeaa]">오늘의 하이라이트</p>
        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8,0_6px_16px_rgba(0,0,0,0.05)]">
          <p className="mb-2 text-[9px] font-black tracking-widest text-[#1cb863]">TODAY&apos;S HIGHLIGHT</p>
          <h2 className="text-[18px] font-black leading-snug text-[#0f2318]">
            NVDA, 실적 서프라이즈 이후<br />기대감에 장전 +3.2%
          </h2>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-[#edfaf3] px-2.5 py-1 text-[10.5px] font-bold text-[#1cb863]">실적발표</span>
            <span className="rounded-full bg-[#edfaf3] px-2.5 py-1 text-[10.5px] font-bold text-[#1cb863]">급등주</span>
          </div>
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => router.push("/v2/report/NVDA")}
              className="text-[12px] font-bold text-[#9ca3af]"
            >
              자세히보기 &gt;
            </button>
          </div>
        </div>
      </div>

      {/* 내 종목 브리핑 */}
      <div className="mx-5 mt-5 mb-24">
        <p className="mb-3 text-[11px] font-bold text-[#8abeaa]">내 종목 브리핑</p>
        <div className="flex flex-col gap-2">
          {STOCKS.map((stock) => (
            <button
              key={stock.ticker}
              type="button"
              onClick={() => router.push(`/v2/report/${stock.ticker}`)}
              className="flex items-center gap-3 rounded-[16px] bg-white px-4 py-3.5 shadow-[0_3px_0_#d8ead0,0_4px_12px_rgba(0,0,0,0.04)] transition-all active:translate-y-0.5 active:shadow-none"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#1cb863] text-[11px] font-black text-white shadow-[0_2px_0_#159e51]">
                {stock.logo}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13.5px] font-black text-[#0f2318]">{stock.ticker}</span>
                  <span className={`text-[11px] font-bold ${stock.isUp ? "text-[#1cb863]" : "text-[#e84545]"}`}>
                    {stock.change}
                  </span>
                </div>
                <p className="truncate text-[11px] text-[#8abeaa]">{stock.brief}</p>
              </div>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#edfaf3] text-[11px] font-black text-[#1cb863]">
                {stock.score}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 flex border-t border-[#eef5f2] bg-white pb-safe">
        {[
          { icon: "🏠", label: "홈", href: "/v2/home", active: true },
          { icon: "⭐", label: "관심종목", href: "/v2/watchlist", active: false },
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
