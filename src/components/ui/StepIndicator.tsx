"use client";

interface StepIndicatorProps {
  currentStep: 1 | 2;
  totalSteps?: number;
}

export default function StepIndicator({ currentStep, totalSteps = 2 }: StepIndicatorProps) {
  return (
    <div className="flex w-full flex-col items-center border-b border-white/5 bg-[#0d0d0d]/90 pb-[1px] backdrop-blur-md">
      <div className="flex h-14 flex-col items-center justify-center">
        <p className="pb-1.5 text-[11px] font-bold uppercase tracking-[1.1px] text-white">
          STEP {currentStep} OF {totalSteps}
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 w-6 rounded-full ${
                i < currentStep
                  ? "bg-accent shadow-[0px_0px_8px_0px_rgba(0,255,102,0.3)]"
                  : "bg-accent/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
