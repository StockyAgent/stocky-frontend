"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function V2OnboardingPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <div className="flex flex-1 flex-col items-center justify-between px-8 py-12 gap-8">
        {/* 로켓 아이콘 */}
        <div className="flex size-[120px] items-center justify-center rounded-full bg-[#1cb863] shadow-[0_6px_0_#159e51]">
          <span className="text-6xl">🚀</span>
        </div>

        {/* 타이틀 */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-[11px] font-bold tracking-[2px] text-[#1cb863] uppercase">AI STOCK ANALYST</span>
          <h1 className="text-[32px] font-black leading-tight text-[#0f2318]">
            나만의<br />
            <span className="text-[#1cb863]">AI 주식</span><br />
            애널리스트
          </h1>
          <p className="text-[13px] font-medium leading-relaxed text-[#6b9e7e]">
            매일 아침 내 종목 맞춤 리포트로,<br />시장을 가장 먼저 읽으세요.
          </p>
        </div>

        {/* 기능 배지 */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { emoji: "📈", label: "데일리 리포트" },
            { emoji: "🤖", label: "AI 분석" },
            { emoji: "⚡", label: "07:30 발행" },
          ].map((b) => (
            <span
              key={b.label}
              className="flex items-center gap-1.5 rounded-full border border-[#d0f0dd] bg-[#edfaf3] px-4 py-2 text-[12px] font-bold text-[#1cb863]"
            >
              {b.emoji} {b.label}
            </span>
          ))}
        </div>

        {/* Google 시작 버튼 */}
        <button
          type="button"
          onClick={() => router.push("/v2/coach")}
          className="flex w-full items-center justify-center gap-3 rounded-[16px] bg-[#1cb863] px-6 py-4 text-[15px] font-bold text-white shadow-[0_5px_0_#159e51] transition-all active:translate-y-1 active:shadow-[0_2px_0_#159e51]"
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-white shadow-sm">
            <Image
              src="/icons/google-logo.svg"
              alt="Google"
              width={20}
              height={20}
            />
          </div>
          Google로 시작하기
        </button>

        {/* 약관 */}
        <p className="text-center text-[11px] text-[#aac9b5]">
          계속하면{" "}
          <span onClick={() => router.push('/v2/terms')} className="cursor-pointer underline">이용약관</span> 및{" "}
          <span className="cursor-pointer underline">개인정보처리방침</span>에 동의합니다.
        </p>
      </div>
    </div>
  );
}
