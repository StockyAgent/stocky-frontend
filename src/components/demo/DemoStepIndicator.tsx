"use client";

interface DemoStepIndicatorProps {
  current: 1 | 2;   // 현재 스텝
  total?: number;    // 전체 스텝 수 (기본 2)
}

/**
 * 피그마 스텝 인디케이터
 * - 완료된 스텝: bg-[#1cb863] w-[22px]
 * - 미완료 스텝: bg-[#d8f0e2] w-[8px]
 */
export default function DemoStepIndicator({ current, total = 2 }: DemoStepIndicatorProps) {
  return (
    <div className="flex items-center pt-[12px] pb-[18px] px-[18px]">
      <div className="flex gap-[5px]">
        {Array.from({ length: total }, (_, i) => {
          const filled = i < current;
          return (
            <div
              key={i}
              className={`h-[5px] rounded-[3px] transition-all ${
                filled ? "w-[22px] bg-[#1cb863]" : "w-[8px] bg-[#d8f0e2]"
              }`}
            />
          );
        })}
      </div>
      <div className="flex-1" />
      <span className="text-[11px] font-bold text-[#8abeaa]">{current} / {total}</span>
    </div>
  );
}
