"use client";

import { useRouter } from "next/navigation";

export default function V2BriefingsHistoryPage() {
  const router = useRouter();

  const briefings = [
    {
      id: 1,
      date: "오늘 · 07:30",
      content: "NVDA가 실적 서프라이즈를 냈어! AI 칩 수요가 예상보다 40% 높았는데, 이게 네 포트폴리오에 어떤 의미인지 같이 볼까?",
      isNew: true,
      ticker: "NVDA",
    },
    {
      id: 2,
      date: "어제 · 07:45",
      content: "FOMC 금리 동결! 연준의 매파적 발언에도 빅테크 주가는 선방 중. 핵심 포인트는 다음 분기 AI 서버 증설 계획이야.",
      isNew: false,
      ticker: "MSFT",
    },
    {
      id: 3,
      date: "3월 16일 · 08:00",
      content: "TSLA 중국 시장 점유율 하락에 주가 주춤. 하지만 새 FSD 버전 배포가 예정되어 있어 단기 반등 모멘텀은 존재해.",
      isNew: false,
      ticker: "TSLA",
    },
    {
      id: 4,
      date: "3월 15일 · 07:30",
      content: "AAPL이 드디어 생성형 AI 관련 로드맵을 발표했어. 아이폰 교체 사이클과 맞물리면 큰 파급력이 예상돼.",
      isNew: false,
      ticker: "AAPL",
    },
  ];

  return (
    <div className="flex min-h-dvh flex-col bg-[#f5faf7]">
      {/* 고정 헤더 */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white px-5 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex size-8 items-center justify-center rounded-[10px] border-2 border-[#e8f0ec] bg-white text-[#0f2318] shadow-[0_2px_0_#d8ead0]"
          >
            ‹
          </button>
          <h1 className="text-[18px] font-black text-[#0f2318]">브리핑 보관함</h1>
        </div>
        <div className="flex size-9 items-center justify-center rounded-[10px] bg-[#edfaf3] text-[16px] text-[#1cb863]">
          🚀
        </div>
      </header>

      {/* 리스트 본문 */}
      <div className="flex flex-col gap-4 px-5 py-6 pb-12">
        <p className="text-[14px] font-black text-[#0f2318]">테크 트렌드 코치의 지난 분석들 📝</p>

        {briefings.map((b) => (
          <div
            key={b.id}
            className={`cursor-pointer rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_#d0e8d8] ${
              b.isNew ? "border-2 border-[#1cb863]" : "border border-[#e8f0ec]"
            }`}
            onClick={() => router.push(`/v2/report/${b.ticker}`)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="relative flex size-7 items-center justify-center rounded-[8px] bg-[#1cb863] text-[13px] shadow-[0_2px_0_#159e51]">
                  🚀
                  {b.isNew && (
                    <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-[#ff4a4a] ring-[1.5px] ring-white" />
                  )}
                </div>
                <span className="text-[11.5px] font-bold text-[#8abeaa]">{b.date}</span>
              </div>
            </div>

            <p className="text-[13.5px] leading-relaxed text-[#1a1a1a] mb-4">
              "{b.content}"
            </p>

            <div className="flex items-center justify-between border-t border-[#f0f5f2] pt-4">
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-[6px] bg-[#e8f0ec] text-[9px] font-black text-[#3d6b50]">
                  티커
                </span>
                <span className="text-[12px] font-black text-[#0f2318]">{b.ticker}</span>
              </div>
              <span className="text-[11px] font-bold text-[#1cb863]">리포트 보기 ›</span>
            </div>
          </div>
        ))}
        
        <div className="mt-6 text-center text-[12px] text-[#a0b8aa]">
          최근 30일 동안의 브리핑만 보관됩니다.
        </div>
      </div>
    </div>
  );
}
