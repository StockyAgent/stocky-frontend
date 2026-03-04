"use client";

interface StepIndicatorProps {
  currentStep: 1 | 2;
  totalSteps?: number;
}

export default function StepIndicator({ currentStep, totalSteps = 2 }: StepIndicatorProps) {
  return (
    <div className="flex w-full flex-col items-center border-b border-[#e1e1e1] bg-[#f1faee]/90 pb-px backdrop-blur-md">
      <div className="flex h-14 flex-col items-center justify-center">
        <p className="pb-1.5 text-[11px] font-bold uppercase tracking-[1.1px] text-[#1d3557]">
          STEP {currentStep} OF {totalSteps}
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 w-6 rounded-full ${
                i < currentStep
                  ? "bg-[#8ecae6] shadow-[0px_0px_8px_0px_rgba(142,202,230,0.3)]"
                  : "bg-[#8ecae6]/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
