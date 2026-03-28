"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { COACHES } from "../page";

function CoachConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id") ?? "tech";
  const coach = COACHES.find((c) => c.id === id) ?? COACHES.find((c) => c.id === "tech")!;

  // 맞춤형 첫 인사 텍스트
  const greeting =
    coach.id === "tech"
      ? `"안녕! 나는 네 테크투자 코치야. AI, 반도체, 전기차 같은 미래 기술에서 투자 기회를 찾는 게 내 스타일이야. 앞으매일 아침 네 관심 종목을 같이 볼 건데, 편하게 물어봐!"`
      : coach.id === "value"
      ? `"안녕! 나는 주식의 내재 가치를 찾아내는 가치투자 코치야. 앞으로 매일 아침 탄탄한 기업들을 같이 분석해 볼 건데, 편하게 물어봐!"`
      : coach.id === "lifestyle"
      ? `"안녕! 나는 네 생활 속 투자 코치야. 요즘 유행하는 핫한 브랜드에서 아이디어를 찾는 게 내 스타일이지. 매일 아침 꿀종목들을 찾아볼 건데, 편하게 물어봐!"`
      : `"안녕! 나는 전체적인 큰 그림을 그리는 거시경제 코치야. 금리와 환율, 국제 정세를 바탕으로 투자 기회를 잡는 게 내 스타일이지. 매일 아침 함께 볼 건데, 편하게 물어봐!"`;

  return (
    <div className="flex min-h-dvh flex-col items-center bg-[#f5faf7] px-6 py-10">
      {/* 상단 드래그 핸들 */}
      <div className="mb-8 h-1 w-10 rounded-full bg-[#d8ead0]" />

      {/* 코치 아이콘 */}
      <div className="relative mb-6">
        <div className="flex size-[100px] items-center justify-center rounded-[28px] bg-white text-5xl shadow-[0_8px_0_#d0e8d8,0_12px_24px_rgba(0,0,0,0.08)]">
          {coach.emoji}
        </div>
        <div className="absolute -bottom-2 -right-2 flex size-7 items-center justify-center rounded-full bg-[#1cb863] shadow-[0_3px_0_#159e51]">
          <span className="text-[23px] text-white">✓</span>
        </div>
      </div>

      {/* 코치 이름 */}
      <p className="text-[12px] font-bold text-[#8abeaa]">나의 투자 코치</p>
      <h1 className="mt-1 text-[28px] font-black text-[#0f2318]">{coach.name}</h1>
      <p className="mt-1 text-[14px] italic text-[#1cb863]">{coach.tagline}</p>

      {/* 첫 인사 버블 */}
      <div className="mt-8 w-full rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8,0_8px_24px_rgba(0,0,0,0.06)]">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-base">{coach.emoji}</span>
          <span className="text-[11px] font-black text-[#1cb863]">첫 인사</span>
        </div>
        <p className="text-[13.5px] leading-relaxed text-[#1a1a1a]">
          {greeting}
        </p>
      </div>

      {/* 특징 배지 */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {coach.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-[#d0f0dd] bg-[#edfaf3] px-3 py-1.5 text-[11px] font-bold text-[#1cb863]">
            {tag}
          </span>
        ))}
      </div>

      {/* 종목 포트폴리오 힌트 (트리맵 스타일) */}
      {coach.portfolio && (
        <div className="mt-8 w-full text-center">
          <p className="text-[12px] font-bold text-[#8abeaa] mb-4">코치가 지켜보는 대표 종목 맵 👀</p>
          <div className="grid grid-cols-6 grid-rows-4 gap-1 h-[220px] w-full grid-flow-row-dense">
            {coach.portfolio.map((stock: any, idx: number) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center rounded-[8px] text-white overflow-hidden transition-all shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.15)] ${
                  stock.style
                } ${stock.isUp ? "bg-[#1cb863]" : "bg-[#e84545]"}`}
              >
                <span className="text-[14px] font-black leading-tight tracking-tight">{stock.ticker}</span>
                <span className="text-[11px] font-bold tracking-tight opacity-90">{stock.percent}</span>
                {stock.style.includes("span-4") && (
                  <span className="text-[10px] opacity-80 mt-1">{stock.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 하단 버튼 */}
      <div className="mt-auto w-full pt-10">
        <button
          type="button"
          onClick={() => router.push("/v2/stocks")}
          className="w-full rounded-[16px] bg-[#1cb863] px-5 py-4 text-[15px] font-black text-white shadow-[0_5px_0_#159e51] transition-all active:translate-y-1 active:shadow-[0_2px_0_#159e51]"
        >
          관심 종목 고르러 가기 →
        </button>
        <button
          type="button"
          onClick={() => router.push("/v2/coach")}
          className="mt-3 w-full py-3 text-[13px] font-bold text-[#8abeaa] transition-colors hover:text-[#1cb863]"
        >
          다른 코치 둘러보기
        </button>
      </div>
    </div>
  );
}

export default function V2CoachConfirmPage() {
  return (
    <Suspense>
      <CoachConfirmContent />
    </Suspense>
  );
}
