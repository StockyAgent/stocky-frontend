"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const COACHES = [
  {
    id: "value",
    emoji: "🏛️",
    name: "튼튼한 가치투자 코치",
    tagline: "\"싸게 사서 오래 들고 가자\"",
    tags: ["입문", "장기 보유", "재무 분석"],
    desc: "기업의 본질적 가치를 분석해서 저평가된 보석을 함께 찾아요.",
    example: "\"이 회사 PBR이 0.8이야. 자산 대비 싸다는 뜻인데, 왜 그런지 같이 볼까?\"",
    portfolio: [
      { ticker: "KO", name: "코카콜라", percent: "+2.11%", isUp: true, style: "col-span-4 row-span-4" },
      { ticker: "JNJ", name: "존슨앤존슨", percent: "-1.28%", isUp: false, style: "col-span-2 row-span-4" },
      { ticker: "BRK.B", name: "버크셔 H", percent: "+0.37%", isUp: true, style: "col-span-2 row-span-2" },
      { ticker: "PG", name: "P&G", percent: "+1.28%", isUp: true, style: "col-span-2 row-span-2" },
      { ticker: "PEP", name: "펩시코", percent: "-0.29%", isUp: false, style: "col-span-2 row-span-1" },
      { ticker: "MCD", name: "맥도", percent: "+0.33%", isUp: true, style: "col-span-1 row-span-1" },
      { ticker: "WMT", name: "월마", percent: "+0.86%", isUp: true, style: "col-span-1 row-span-1" }
    ],
  },
  {
    id: "lifestyle",
    emoji: "🛒",
    name: "생활 속 투자 코치",
    tagline: "\"매일 쓰는 것에서 기회를 찾자\"",
    tags: ["입문", "중장기", "소비 트렌드"],
    desc: "우리 일상에서 뜨는 브랜드와 소비 트렌드로 종목을 발굴해요.",
    example: "\"요즘 다들 이 앱 쓰지? 이 회사 매출이 3분기 연속 올랐어!\"",
    portfolio: [
      { ticker: "SBUX", name: "스타벅스", percent: "+1.11%", isUp: true, style: "col-span-4 row-span-3" },
      { ticker: "NKE", name: "나이키", percent: "-2.28%", isUp: false, style: "col-span-2 row-span-5" },
      { ticker: "NFLX", name: "넷플릭스", percent: "+5.37%", isUp: true, style: "col-span-2 row-span-3" },
      { ticker: "AAPL", name: "애플", percent: "+4.29%", isUp: true, style: "col-span-2 row-span-2" },
      { ticker: "AMZN", name: "아마존", percent: "+2.33%", isUp: true, style: "col-span-2 row-span-1" },
      { ticker: "DIS", name: "디즈니", percent: "-1.28%", isUp: false, style: "col-span-1 row-span-1" },
      { ticker: "LULU", name: "룰루", percent: "-3.86%", isUp: false, style: "col-span-1 row-span-1" }
    ],
  },
  {
    id: "tech",
    emoji: "🚀",
    name: "테크 트렌드 코치",
    tagline: "\"세상을 바꿀 기술, 같이 찾자\"",
    tags: ["중급", "AI·반도체", "전기차"],
    desc: "AI, 반도체, 전기차 등 미래 기술의 투자 기회를 분석해요.",
    example: "\"이 회사 AI 칩 점유율이 80%야. 경쟁사가 따라오려면 최소 2년은 걸려.\"",
    portfolio: [
      { ticker: "NVDA", name: "엔비디아", percent: "+17.11%", isUp: true, style: "col-span-3 row-span-5" },
      { ticker: "AAPL", name: "애플", percent: "-3.28%", isUp: false, style: "col-span-3 row-span-3" },
      { ticker: "TSLA", name: "테슬라", percent: "-8.37%", isUp: false, style: "col-span-3 row-span-2" },
      { ticker: "MSFT", name: "M/S", percent: "+6.28%", isUp: true, style: "col-span-2 row-span-1" },
      { ticker: "AMD", name: "AMD", percent: "-4.29%", isUp: false, style: "col-span-2 row-span-1" },
      { ticker: "GOOG", name: "구글", percent: "+5.33%", isUp: true, style: "col-span-1 row-span-1" },
      { ticker: "META", name: "메타", percent: "+3.86%", isUp: true, style: "col-span-1 row-span-1" }
    ],
  },
  {
    id: "macro",
    emoji: "🌐",
    name: "거시경제 코치",
    tagline: "\"금리, 환율, 경기의 흐름을 읽자\"",
    tags: ["중급", "거시경제", "섹터 분석"],
    desc: "경제 전체의 큰 흐름을 읽고 어떤 섹터가 유리한지 알려줘요.",
    example: "\"연준이 금리를 내리면 어떤 업종이 먼저 올라? 같이 정리해보자.\"",
    portfolio: [
      { ticker: "SPY", name: "S&P 500", percent: "+2.11%", isUp: true, style: "col-span-3 row-span-4" },
      { ticker: "TLT", name: "미 국채", percent: "-1.28%", isUp: false, style: "col-span-3 row-span-4" },
      { ticker: "GLD", name: "금 ETF", percent: "+5.37%", isUp: true, style: "col-span-2 row-span-2" },
      { ticker: "QQQ", name: "나스닥", percent: "+3.28%", isUp: true, style: "col-span-2 row-span-2" },
      { ticker: "USO", name: "유가", percent: "-2.29%", isUp: false, style: "col-span-2 row-span-1" },
      { ticker: "UUP", name: "달러", percent: "+1.33%", isUp: true, style: "col-span-1 row-span-1" },
      { ticker: "EEM", name: "신흥국", percent: "-1.86%", isUp: false, style: "col-span-1 row-span-1" }
    ],
  },
];

function CoachPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams?.get("from");
  const [selectedId, setSelectedId] = useState<string>("lifestyle");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [clickOrigin, setClickOrigin] = useState({ x: "50%", y: "50%" });

  const selected = COACHES.find((c) => c.id === selectedId)!;

  const handleSelectCoach = (e: React.MouseEvent, id: string) => {
    setSelectedId(id);
    const rect = e.currentTarget.getBoundingClientRect();
    setClickOrigin({
      x: `${rect.left + rect.width / 2}px`,
      y: `${rect.top + rect.height / 2}px`,
    });
  };

  const handleNext = () => {
    if (from === "my") {
      // 마이페이지에서 왔다면 수정 완료 후 바로 돌아가기
      router.push("/v2/my");
    } else {
      // 코치 인사이드 플로팅 모달 띄우기
      setIsConfirmOpen(true);
    }
  };

  // 맞춤형 첫 인사 텍스트
  const greeting =
    selected.id === "tech"
      ? `"안녕! 나는 네 테크투자 코치야. AI, 반도체, 전기차 같은 미래 기술에서 투자 기회를 찾는 게 내 스타일이야. 매일 아침 네 관심 종목을 같이 볼 건데, 편하게 물어봐!"`
      : selected.id === "value"
      ? `"안녕! 나는 주식의 내재 가치를 찾아내는 가치투자 코치야. 앞으로 매일 아침 탄탄한 기업들을 같이 분석해 볼 건데, 편하게 물어봐!"`
      : selected.id === "lifestyle"
      ? `"안녕! 나는 네 생활 속 투자 코치야. 요즘 유행하는 핫한 브랜드에서 아이디어를 찾는 게 내 스타일이지. 매일 아침 꿀종목들을 찾아볼 건데, 편하게 물어봐!"`
      : `"안녕! 나는 전체적인 큰 그림을 그리는 거시경제 코치야. 금리와 환율, 국제 정세를 바탕으로 투자 기회를 잡는 게 내 스타일이지. 매일 아침 함께 볼 건데, 편하게 물어봐!"`;

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* 상단 고정 헤더 영역 (진행바 + 타이틀) */}
      <div className="sticky top-0 z-20 bg-white pb-4">
        {/* 진행바 (온보딩이 아닐 땐 숨기거나 유지 가능, 현재는 공통) */}
        {!from && (
          <div className="flex gap-1 px-6 pt-6">
            <div className="h-1.5 flex-1 rounded-full bg-[#1cb863]" />
            <div className="h-1.5 flex-1 rounded-full bg-[#e8f5ee]" />
          </div>
        )}

        {/* 헤더 */}
        <div className={`px-6 ${from ? "pt-8" : "pt-6"}`}>
          <h1 className="text-[26px] font-black leading-tight text-[#0f2318]">
            나의 <span className="text-[#1cb863]">투자 코치</span>를<br />선택해보세요 🎯
          </h1>
          <p className="mt-2 text-[13px] text-[#6b9e7e]">코치마다 분석 스타일이 달라요. 언제든 변경 가능!</p>
        </div>
      </div>

      {/* 코치 카드 목록 */}
      <div className="flex flex-col gap-3 px-6 pb-36">
        {COACHES.map((coach) => {
          const isSelected = coach.id === selectedId;
          return (
            <button
              key={coach.id}
              type="button"
              onClick={(e) => handleSelectCoach(e, coach.id)}
              style={{
                transition: "background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              }}
              className={`w-full rounded-[18px] border-2 p-4 text-left overflow-hidden ${
                isSelected
                  ? "border-[#1cb863] bg-[#edfaf3] shadow-[0_5px_0_#b8efd0]"
                  : "border-[#e8e8e8] bg-white shadow-[0_3px_0_#e0e0e0]"
              }`}
            >
              {/* 헤더 행: 아이콘 + 이름 + 체크 */}
              <div className="flex items-center gap-3">
                {/* 아이콘 */}
                <div
                  style={{ transition: "background-color 0.25s ease, box-shadow 0.25s ease" }}
                  className={`flex size-11 shrink-0 items-center justify-center rounded-[14px] text-xl ${
                    isSelected
                      ? "bg-[#1cb863] shadow-[0_3px_0_#159e51]"
                      : "bg-[#f0f0f0] shadow-[0_2px_0_#d8d8d8]"
                  }`}
                >
                  {coach.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    style={{ transition: "color 0.2s ease" }}
                    className={`text-[14px] font-black ${isSelected ? "text-[#0f2318]" : "text-[#2d2d2d]"}`}
                  >
                    {coach.name}
                  </p>
                  <p className="text-[11px] text-[#8abeaa]">{coach.tagline}</p>
                  {/* 태그 */}
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {coach.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{ transition: "background-color 0.2s ease, color 0.2s ease" }}
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isSelected ? "bg-[#d0f0dd] text-[#0d7a3e]" : "bg-[#f0f0f0] text-[#888888]"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 체크 아이콘 */}
                <div
                  style={{
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                    opacity: isSelected ? 1 : 0,
                    transform: isSelected ? "scale(1)" : "scale(0.5)",
                  }}
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#1cb863]"
                >
                  <span className="text-[15px] font-black text-white">✓</span>
                </div>
              </div>

              {/* 확장 영역: 선택 시 슬라이드다운 */}
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isSelected ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.3s ease",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <div className="pt-4 space-y-3">
                    {/* 설명 */}
                    <p className="text-[12.5px] leading-relaxed text-[#3d6b50]">{coach.desc}</p>

                    {/* 예시 인용구 */}
                    <div className="rounded-[12px] border-l-[3px] border-[#1cb863] bg-white px-3 py-3">
                      <p className="mb-1 text-[10px] font-bold text-[#8abeaa]">이런 식으로 분석해줘요</p>
                      <p className="text-[12px] leading-relaxed italic text-[#1a1a1a]">{coach.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-6 pb-8 pt-4 border-t border-[#f0f0f0]">
        <button
          type="button"
          onClick={handleNext}
          style={{ transition: "box-shadow 0.15s ease, transform 0.15s ease" }}
          className="w-full rounded-[16px] bg-[#1cb863] px-5 py-4 text-[15px] font-black text-white shadow-[0_5px_0_#159e51] active:translate-y-1 active:shadow-[0_2px_0_#159e51]"
        >
          {from === "my" ? "변경 완료하기" : `${selected.name}와 다음 →`}
        </button>
        {!from && (
          <p className="mt-3 text-center text-[11px] text-[#aac9b5]">나중에 설정에서 언제든 코치를 변경할 수 있습니다.</p>
        )}
      </div>

      {/* 흐림 처리된 백그라운드 오버레이 */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ease-out ${
          isConfirmOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsConfirmOpen(false)}
      />

      {/* 플로팅 인트로 (Confirm) 확대 모달 */}
      <div 
        style={{ transformOrigin: `${clickOrigin.x} ${clickOrigin.y}` }}
        className={`fixed top-6 bottom-6 left-5 right-5 z-50 flex flex-col overflow-hidden rounded-[32px] bg-[#f5faf7] shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isConfirmOpen ? "scale-100 opacity-100 translate-y-0" : "scale-[0.8] opacity-0 translate-y-0 pointer-events-none"
        }`}
      >
        <div className="flex h-full w-full flex-col items-center overflow-y-auto px-6 py-8 overscroll-contain">
          {/* 드래그 핸들 (제거하거나 디자인용으로 유지) */}
          <div className="mb-6 shrink-0 h-1.5 w-12 rounded-full bg-[#d8ead0]" />

          {/* 코치 아이콘 */}
          <div className="relative mb-6 shrink-0">
            <div className="flex size-[100px] items-center justify-center rounded-[28px] bg-white text-5xl shadow-[0_8px_0_#d0e8d8,0_12px_24px_rgba(0,0,0,0.08)]">
              {selected.emoji}
            </div>
            <div className="absolute -bottom-2 -right-2 flex size-7 items-center justify-center rounded-full bg-[#1cb863] shadow-[0_3px_0_#159e51]">
              <span className="text-[23px] text-white">✓</span>
            </div>
          </div>

          {/* 코치 이름 */}
          <p className="text-[12px] font-bold text-[#8abeaa]">나의 투자 코치</p>
          <h1 className="mt-1 text-[28px] font-black text-[#0f2318]">{selected.name}</h1>
          <p className="mt-1 text-[14px] italic text-[#1cb863]">{selected.tagline}</p>

          {/* 첫 인사 버블 */}
          <div className="mt-8 shrink-0 w-full rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8,0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-base">{selected.emoji}</span>
              <span className="text-[11px] font-black text-[#1cb863]">첫 인사</span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-[#1a1a1a]">
              {greeting}
            </p>
          </div>

          {/* 특징 배지 */}
          <div className="mt-5 shrink-0 flex flex-wrap justify-center gap-2">
            {selected.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[#d0f0dd] bg-[#edfaf3] px-3 py-1.5 text-[11px] font-bold text-[#1cb863]">
                {tag}
              </span>
            ))}
          </div>

          {/* 종목 포트폴리오 힌트 (트리맵 스타일) */}
          {selected.portfolio && (
            <div className="mt-8 shrink-0 w-full text-center">
              <p className="text-[12px] font-bold text-[#8abeaa] mb-4">코치가 지켜보는 대표 종목 맵 👀</p>
              <div className="grid grid-cols-6 grid-rows-6 gap-1 h-[260px] w-full grid-flow-row-dense">
                {selected.portfolio.map((stock: any, idx: number) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center rounded-[8px] text-white overflow-hidden transition-all shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.15)] ${
                      stock.style
                    } ${stock.isUp ? "bg-[#1cb863]" : "bg-[#e84545]"}`}
                  >
                    <span className="text-[14px] font-black leading-tight tracking-tight">{stock.ticker}</span>
                    {!stock.style.includes("col-span-1 row-span-1") && (
                      <span className="text-[11px] font-bold tracking-tight opacity-90">{stock.percent}</span>
                    )}
                    {!stock.style.includes("span-1") && (
                      <span className="text-[10px] opacity-80 mt-1">{stock.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 하단 버튼 */}
          <div className="mt-8 shrink-0 w-full pb-10">
            <button
              type="button"
              onClick={() => router.push("/v2/stocks")}
              className="w-full rounded-[16px] bg-[#1cb863] px-5 py-4 text-[15px] font-black text-white shadow-[0_5px_0_#159e51] transition-all active:translate-y-1 active:shadow-[0_2px_0_#159e51]"
            >
              관심 종목 고르러 가기 →
            </button>
            <button
              type="button"
              onClick={() => setIsConfirmOpen(false)}
              className="mt-3 w-full py-3 text-[13px] font-bold text-[#8abeaa] transition-colors hover:text-[#1cb863]"
            >
              뒤로 가서 다른 코치 둘러보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function V2CoachPage() {
  return (
    <Suspense>
      <CoachPageContent />
    </Suspense>
  );
}
