"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DemoStepIndicator, DemoPrimaryButton } from "@/components/demo";

export default function DemoStep1Page() {
  const router = useRouter();
  const [selected, setSelected] = useState<"investor" | "trader" | null>("investor");

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* Step indicator */}
      <DemoStepIndicator current={1} total={2} />

      <div className="flex flex-col flex-1 px-[18px] pb-6">
        {/* 타이틀 */}
        <div className="pb-[7px]">
          <div className="text-[22px] font-black leading-[28.16px] tracking-[-0.6px] text-[#0f2318]">
            <p>어떤 투자자</p>
            <p>인가요? 🤔</p>
          </div>
        </div>

        {/* 부제목 */}
        <p className="pb-6 text-[12px] font-[350] leading-[20.4px] text-[#3d6b50]">
          AI가 성향에 맞게 리포트 스타일과<br />분석 깊이를 맞춰드려요.
        </p>

        {/* 투자자 카드 */}
        <div className="pb-[11px]">
          <button
            type="button"
            onClick={() => setSelected("investor")}
            className={`flex w-full items-center gap-[13px] rounded-[18px] border-2 px-[18px] py-[17px] cursor-pointer transition-all ${
              selected === "investor"
                ? "border-[#1cb863] bg-[#e8fcf0] shadow-[0px_3px_0px_0px_#159e51]"
                : "border-[#d8f0e2] bg-white shadow-[0px_3px_0px_0px_#d8f0e2]"
            }`}
          >
            <div className={`flex size-[44px] items-center justify-center rounded-[13px] ${selected === "investor" ? "bg-[rgba(28,184,99,0.15)]" : "bg-[#f4fff8]"}`}>
              <span className="text-2xl">🌱</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[12px] font-black text-[#0f2318]">투자자 🌱</p>
              <p className="text-[11px] font-bold text-[#0d7a3e]">장기 가치·안정 중심</p>
            </div>
            <div className={`flex size-[23px] items-center justify-center rounded-full border-2 ${
              selected === "investor" ? "border-[#1cb863] bg-[#1cb863]" : "border-[#d8f0e2] bg-white"
            }`}>
              {selected === "investor" && <div className="size-[8px] rounded-[4px] bg-white" />}
            </div>
          </button>
        </div>

        {/* 트레이더 카드 */}
        <div className="pb-[11px]">
          <button
            type="button"
            onClick={() => setSelected("trader")}
            className={`flex w-full items-center gap-[13px] rounded-[18px] border-2 px-[18px] py-[17px] cursor-pointer transition-all ${
              selected === "trader"
                ? "border-[#1cb863] bg-[#e8fcf0] shadow-[0px_3px_0px_0px_#159e51]"
                : "border-[#d8f0e2] bg-white shadow-[0px_3px_0px_0px_#d8f0e2]"
            }`}
          >
            <div className={`flex size-[44px] items-center justify-center rounded-[13px] ${selected === "trader" ? "bg-[rgba(28,184,99,0.15)]" : "bg-[#f4fff8]"}`}>
              <span className="text-2xl">⚡</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[12.8px] font-black text-[#0f2318]">트레이더 ⚡</p>
              <p className={`text-[11px] ${selected === "trader" ? "font-[350] text-[#0d7a3e]" : "font-[350] text-[#8abeaa]"}`}>단기 수익·모멘텀 중심</p>
            </div>
            <div className={`flex size-[23px] items-center justify-center rounded-full border-2 ${
              selected === "trader" ? "border-[#1cb863] bg-[#1cb863]" : "border-[#d8f0e2] bg-white"
            }`}>
              {selected === "trader" && <div className="size-[8px] rounded-[4px] bg-white" />}
            </div>
          </button>
        </div>

        <div className="flex-1" />

        {/* CTA 버튼 */}
        <DemoPrimaryButton
          onClick={() => selected && router.push("/demo/onboarding/step2")}
          disabled={!selected}
        >
          다음 →
        </DemoPrimaryButton>
      </div>
    </div>
  );
}
