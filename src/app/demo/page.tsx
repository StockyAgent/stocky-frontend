"use client";

import { useRouter } from "next/navigation";

export default function DemoLandingPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center bg-white px-[18px] pb-6 pt-0">
      {/* Hero area */}
      <div className="flex flex-col items-center pt-6 pb-[22px] w-full">
        {/* Logo circle */}
        <div className="mb-[22px]"
          style={{
            width: 126,
            height: 126,
            borderRadius: 63,
            border: "4px solid #0d7a3e",
            backgroundImage: "linear-gradient(160deg, rgb(10,61,31) 0%, rgb(13,122,62) 55%, rgb(28,184,99) 100%)",
            boxShadow: "0 0 0 8px rgba(28,184,99,0.1), 0 14px 36px 0 rgba(28,184,99,0.28)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 64 }}>🚀</span>
        </div>

        {/* AI STOCK ANALYST */}
        <p className="mb-1 text-[10px] font-black tracking-[2px] text-[#1cb863] uppercase">
          AI STOCK ANALYST
        </p>

        {/* Main heading */}
        <div className="text-center text-[26px] font-black leading-[31.72px] tracking-[-1px] text-[#0f2318]">
          <p>나만의</p>
          <p className="text-[#1cb863]">AI 주식</p>
          <p>애널리스트</p>
        </div>

        {/* Subtitle */}
        <p className="mt-3 text-center text-[12px] font-[350] leading-[21px] text-[#3d6b50]">
          매일 아침 내 종목 맞춤 리포트,<br />
          시장을 가장 먼저 읽으세요.
        </p>

        {/* Feature badge pills */}
        <div className="relative mt-4 h-[57px] w-full">
          {/* 데일리 리포트 */}
          <div className="absolute left-[39px] top-0 flex items-center px-[13px] py-[5px] rounded-[20px] bg-[#e8fcf0] border border-[#d0f5e0]">
            <span className="text-[10.5px] font-bold text-[#0d7a3e]">📈 데일리 리포트</span>
          </div>
          {/* AI 분석 */}
          <div className="absolute right-[26px] top-0 flex items-center px-[13px] py-[5px] rounded-[20px] bg-[#e8fcf0] border border-[#d0f5e0]">
            <span className="text-[10.5px] font-bold text-[#0d7a3e]">🤖 AI 분석</span>
          </div>
          {/* 07:30 발행 */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center px-[13px] py-[5px] rounded-[20px] bg-[#e8fcf0] border border-[#d0f5e0]">
            <span className="text-[10.5px] font-bold text-[#0d7a3e]">⚡ 07:30 발행</span>
          </div>
        </div>
      </div>

      {/* Google button */}
      <button
        onClick={() => router.push("/demo/onboarding/step1")}
        type="button"
        className="flex w-full items-center justify-center gap-[10px] rounded-[16px] border-2 border-b-4 border-[#d8f0e2] bg-white pb-[18px] pt-[16px] cursor-pointer"
      >
        <span className="text-xl">🇬</span>
        <span className="text-[14px] font-bold text-[#0f2318]">Google로 시작하기</span>
      </button>

      {/* Divider */}
      <div className="flex w-full items-center gap-[10px] py-[10px]">
        <div className="h-[2px] flex-1 rounded-[1px] bg-[#e8fcf0]" />
        <span className="text-[11px] font-bold text-[#8abeaa]">또는</span>
        <div className="h-[2px] flex-1 rounded-[1px] bg-[#e8fcf0]" />
      </div>

      {/* Primary CTA */}
      <button
        onClick={() => router.push("/demo/onboarding/step1")}
        type="button"
        className="flex w-full items-center justify-center rounded-[16px] border-b-4 border-[#159e51] bg-[#1cb863] pb-[19px] pt-[15px] cursor-pointer active:scale-[0.98]"
      >
        <span className="text-[15px] font-black text-white">Stocky 시작하기 🚀</span>
      </button>

      {/* Terms */}
      <p className="mt-3 text-center text-[10px] font-[350] text-[#8abeaa]">
        계속하면{" "}
        <span className="text-[#1cb863] underline">이용약관</span>
        {" "}및{" "}
        <span className="text-[#1cb863] underline">개인정보처리방침</span>
        에 동의합니다.
      </p>
    </div>
  );
}
