"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepIndicator from "@/components/ui/StepIndicator";
import PrimaryButton from "@/components/ui/PrimaryButton";
import PersonaCard from "@/components/onboarding/PersonaCard";

type PersonaType = "investor" | "trader" | null;

export default function Step1Page() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>("investor");
  const router = useRouter();

  const handleNext = () => {
    if (selectedPersona) {
      router.push("/onboarding/step2");
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#f1faee]">
      {/* Step Indicator */}
      <div className="sticky top-0 z-20">
        <StepIndicator currentStep={1} />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-5 pt-8 pb-44">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold leading-[35px] text-[#1d3557]">
            당신의 투자 성향은
            <br />
            무엇인가요?
          </h1>
          <p className="mt-3 text-base font-light leading-relaxed text-[#457b9d]">
            AI가 투자 성향을 분석하여 맞춤형 주식 브리핑과
            <br />
            추천 정보를 제공해 드립니다.
          </p>
        </div>

        {/* Persona Selection */}
        <div className="flex flex-col gap-4">
          <PersonaCard
            type="investor"
            title="투자자"
            description="장기적인 가치 중심"
            selected={selectedPersona === "investor"}
            onClick={() => setSelectedPersona("investor")}
          />
          <PersonaCard
            type="trader"
            title="트레이더"
            description="장기적인 가치 중심"
            selected={selectedPersona === "trader"}
            onClick={() => setSelectedPersona("trader")}
          />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-linear-to-t from-[#f1faee] via-[#f1faee] to-transparent pb-8 pt-5 flex justify-center px-5">
        <PrimaryButton onClick={handleNext} disabled={!selectedPersona}>
          다음
        </PrimaryButton>
      </div>
    </div>
  );
}
