"use client";

import { useRouter } from "next/navigation";

export default function V2CoachConfirmPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center bg-[#f5faf7] px-6 py-10">
      {/* 상단 드래그 핸들 */}
      <div className="mb-8 h-1 w-10 rounded-full bg-[#d8ead0]" />

      {/* 코치 아이콘 */}
      <div className="relative mb-6">
        <div className="flex size-[100px] items-center justify-center rounded-[28px] bg-white text-5xl shadow-[0_8px_0_#d0e8d8,0_12px_24px_rgba(0,0,0,0.08)]">
          🚀
        </div>
        <div className="absolute -bottom-2 -right-2 flex size-7 items-center justify-center rounded-full bg-[#1cb863] shadow-[0_3px_0_#159e51]">
          <span className="text-[14px] text-white">✓</span>
        </div>
      </div>

      {/* 코치 이름 */}
      <p className="text-[12px] font-bold text-[#8abeaa]">나의 투자 코치</p>
      <h1 className="mt-1 text-[28px] font-black text-[#0f2318]">테크 트렌드 코치</h1>
      <p className="mt-1 text-[14px] italic text-[#1cb863]">"세상을 바꿀 기술, 같이 찾자"</p>

      {/* 첫 인사 버블 */}
      <div className="mt-8 w-full rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8,0_8px_24px_rgba(0,0,0,0.06)]">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-base">🚀</span>
          <span className="text-[11px] font-black text-[#1cb863]">첫 인사</span>
        </div>
        <p className="text-[13.5px] leading-relaxed text-[#1a1a1a]">
          "안녕! 나는 네 테크투자 코치야. AI, 반도체, 전기차 같은 미래 기술에서 투자 기회를 찾는 게 내 스타일이야.
          앞으로 매일 아침 네 관심 종목을 같이 볼 건데, 편하게 물어봐!"
        </p>
      </div>

      {/* 특징 배지 */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {["AI·반도체 특화", "미래 기술 분석", "매일 07:30 브리핑"].map((tag) => (
          <span key={tag} className="rounded-full border border-[#d0f0dd] bg-[#edfaf3] px-3 py-1.5 text-[11px] font-bold text-[#1cb863]">
            {tag}
          </span>
        ))}
      </div>

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
