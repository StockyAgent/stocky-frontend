"use client";

import type { BadgeVariant } from "@/types";

const BADGE_CONFIG: Record<BadgeVariant, { bg: string; color: string; label: string }> = {
  buy:   { bg: "#e8fcf0", color: "#0d7a3e", label: "매수 추천" },
  hold:  { bg: "#fff8e8", color: "#b45309", label: "보유 유지" },
  watch: { bg: "#eef2ff", color: "#4338ca", label: "관망" },
};

interface DemoWatchlistCardProps {
  logo: string;
  logoBg: string;
  ticker: string;
  name: string;
  price: string;
  badge: BadgeVariant;
  onClick?: () => void;
}

/**
 * 피그마 워치리스트 종목 카드
 * - bg-white border-[#d8f0e2] rounded-[15px] shadow-[0px_3px_0px_0px_#d8f0e2]
 */
export default function DemoWatchlistCard({
  logo, logoBg, ticker, name, price, badge, onClick,
}: DemoWatchlistCardProps) {
  const b = BADGE_CONFIG[badge];
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-[11px] rounded-[15px] border-2 border-[#d8f0e2] bg-white px-[16px] py-[14px] shadow-[0px_3px_0px_0px_#d8f0e2] text-left cursor-pointer"
    >
      <div
        className="flex size-[38px] shrink-0 items-center justify-center rounded-[11px] text-[11px] font-black text-white"
        style={{ backgroundColor: logoBg }}
      >
        {logo}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13.4px] font-black text-[#0f2318]">{ticker}</p>
        <p className="text-[10.5px] font-[350] text-[#8abeaa]">{name}</p>
      </div>
      <div className="flex flex-col items-end gap-[2px] shrink-0">
        <p className="text-[13.3px] font-black text-[#0f2318]">{price}</p>
        <span
          className="rounded-[5px] px-[8px] py-[2px] text-[10px] font-black"
          style={{ backgroundColor: b.bg, color: b.color }}
        >
          {b.label}
        </span>
      </div>
    </button>
  );
}
