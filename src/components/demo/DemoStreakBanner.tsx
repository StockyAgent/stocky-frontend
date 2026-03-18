"use client";

interface DemoStreakBannerProps {
  streak: number;       // 현재 연속 일수
  goal?: number;        // 목표 일수 (기본 7)
  message?: string;     // 서브 메시지 override
}

/**
 * 피그마 스트릭 배너
 * - bg-[#e8fcf0] border-[#d0f5e0] rounded-[12px]
 * - 연속 일수 채워진 점 (bg-[#1cb863]) + 빈 점 (bg-[#d8f0e2])
 */
export default function DemoStreakBanner({ streak, goal = 7, message }: DemoStreakBannerProps) {
  const dots = Array.from({ length: goal }, (_, i) => i < streak);
  const sub = message ?? `내일도 확인하면 ${goal}일 달성 🎯`;

  return (
    <div className="flex items-center gap-[8px] rounded-[12px] border border-[#d0f5e0] bg-[#e8fcf0] px-[13px] py-[9px]">
      <span className="text-[16px]">🔥</span>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-black text-[#0f2318]">{streak}일 연속 리포트 확인!</p>
        <p className="text-[10px] font-[350] text-[#8abeaa]">{sub}</p>
      </div>
      <div className="flex items-center gap-[4px] shrink-0">
        {dots.map((filled, i) => (
          <div
            key={i}
            className={`size-[8px] rounded-[3px] ${filled ? "bg-[#1cb863]" : "bg-[#d8f0e2]"}`}
          />
        ))}
      </div>
    </div>
  );
}
