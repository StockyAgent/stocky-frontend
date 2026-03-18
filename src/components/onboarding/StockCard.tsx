"use client";

import Image from "next/image";

type StockVariant = "default" | "type2" | "type3" | "type4";

interface StockCardProps {
  ticker: string;
  name: string;
  marketCap: string;
  price?: string;
  logoSrc?: string;
  logoText?: string;
  /** variant 방식 (권장): 명시적으로 상태를 지정 */
  variant?: StockVariant;
  /** 레거시 호환용 — variant가 없을 때만 activated */
  selected?: boolean;
  onClick?: () => void;
  showDetail?: boolean;
}

/** variant → 스타일 매핑 */
const VARIANT_CONTAINER: Record<StockVariant, string> = {
  default: "border-[#457b9d] bg-[#e8f4f5]",
  type2:   "border-[#e1e1e1] bg-[#f1faee]",
  type3:   "border-[#457b9d] bg-[#e8f4f5]",
  type4:   "border-[#457b9d] bg-[#f1faee]",
};

export default function StockCard({
  ticker,
  name,
  marketCap,
  price,
  logoSrc,
  logoText,
  variant,
  selected,
  onClick,
  showDetail = false,
}: StockCardProps) {
  // variant 우선, 없으면 selected fallback
  const effectiveVariant: StockVariant | "legacy-unselected" =
    variant ?? (selected ? "default" : "legacy-unselected");

  const isChecked =
    effectiveVariant === "default" ||
    effectiveVariant === "type3" ||
    (effectiveVariant === "legacy-unselected" && false); // legacy unselected = unchecked

  const hasIndicator =
    effectiveVariant === "type3" || effectiveVariant === "type4";

  const isDeselected = effectiveVariant === "type4";

  const containerClass =
    effectiveVariant === "legacy-unselected"
      ? "border-[#e1e1e1] bg-[#f1faee]"
      : VARIANT_CONTAINER[effectiveVariant as StockVariant];

  const shouldShowDetail = showDetail || !!variant;

  return (
    <button
      onClick={onClick}
      type="button"
      className={`relative flex w-full items-center overflow-hidden rounded-xl border p-[17px] transition-all cursor-pointer ${containerClass}`}
    >
      {/* Left Indicator Bar for type3/type4 */}
      {hasIndicator && (
        <div
          className={`absolute left-0 top-0 h-full bg-[#457b9d] ${
            isDeselected ? "w-[7px] -ml-px" : "w-[6px]"
          }`}
        />
      )}

      {/* Checkbox */}
      <div className="mr-3 shrink-0">
        {isChecked ? (
          <div className="flex size-6 items-center justify-center rounded-md border-2 border-[#457b9d] bg-[#457b9d]">
            <Image src="/icons/check-icon.svg" alt="Selected" width={25} height={25} />
          </div>
        ) : isDeselected ? (
          <div className="size-6 rounded-md border-2 border-[rgba(160,160,160,0.4)]" />
        ) : (
          <div className="size-6 rounded-md border-2 border-[#e1e1e1]" />
        )}
      </div>

      {/* Logo */}
      <div className="mr-4 flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#8ecae6]">
        {logoSrc ? (
          <Image src={logoSrc} alt={ticker} width={20} height={20} />
        ) : (
          <span className="text-[10px] font-bold text-[#457b9d]">
            {logoText ?? ticker.slice(0, 2)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col items-start">
        <span className="text-base font-bold text-[#1d3557]">{ticker}</span>
        <span className="pt-0.5 text-xs font-[350] text-[#457b9d]">{name}</span>
        <span className="pt-0.5 text-[10px] font-[350] text-[#457b9d]">{marketCap}</span>
      </div>

      {/* Detail or Price */}
      {shouldShowDetail ? (
        <div className="flex items-center gap-px shrink-0">
          <span className="text-base font-bold text-[#1d3557]">자세히</span>
          <Image
            src="/icons/chevron-right-icon.svg"
            alt=""
            width={16}
            height={20}
            style={{ filter: "brightness(0) saturate(100%) invert(17%) sepia(27%) saturate(2349%) hue-rotate(182deg) brightness(96%) contrast(91%)" }}
          />
        </div>
      ) : price ? (
        <span className="shrink-0 text-base font-bold text-[#1d3557]">{price}</span>
      ) : null}
    </button>
  );
}
