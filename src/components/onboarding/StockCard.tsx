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
  selected?: boolean;
  onClick?: () => void;
  showDetail?: boolean;
  variant?: StockVariant;
}

export default function StockCard({
  ticker,
  name,
  marketCap,
  price,
  logoSrc,
  logoText,
  selected,
  onClick,
  showDetail = false,
  variant,
}: StockCardProps) {
  // Determine styles based on variant or legacy selected prop
  const isChecked = variant === "default" || variant === "type3" || (!variant && selected);
  const hasIndicator = variant === "type3" || variant === "type4";
  const isDeselected = variant === "type4";
  const isUnregistered = variant === "type2";

  // Background & border
  let containerClasses: string;
  if (variant === "default" || variant === "type3") {
    containerClasses = "border-[#457b9d] bg-[#e8f4f5]";
  } else if (variant === "type4") {
    containerClasses = "border-[#457b9d] bg-[#f1faee]";
  } else if (variant === "type2") {
    containerClasses = "border-[#e1e1e1] bg-[#f1faee]";
  } else {
    // Legacy fallback
    containerClasses = selected ? "border-[#457b9d] bg-[#e8f4f5]" : "border-[#e1e1e1] bg-[#f1faee]";
  }

  // Determine if "자세히 >" should show
  const shouldShowDetail = showDetail || !!variant;

  return (
    <button
      onClick={onClick}
      type="button"
      className={`relative flex w-full items-center overflow-hidden rounded-xl border p-[17px] transition-all cursor-pointer ${containerClasses}`}
    >
      {/* Left Indicator Bar for type3/type4 */}
      {hasIndicator && (
        <div
          className={`absolute left-0 top-0 h-full bg-[#457b9d] ${isDeselected ? "w-[7px] -ml-px" : "w-[6px]"}`}
        />
      )}

      {/* Checkbox (not shown for type5) */}
      {variant !== undefined ? (
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
      ) : (
        /* Legacy mode with selected prop */
        <div className="mr-3 shrink-0">
          {selected ? (
            <div className="flex size-6 items-center justify-center rounded-md border-2 border-[#457b9d] bg-[#457b9d]">
              <Image src="/icons/check-icon.svg" alt="Selected" width={25} height={25} />
            </div>
          ) : (
            <div className="size-6 rounded-md border-2 border-[#e1e1e1]" />
          )}
        </div>
      )}

      {/* Logo */}
      <div className="mr-4 flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#8ecae6]">
        {logoSrc ? (
          <Image src={logoSrc} alt={ticker} width={20} height={20} />
        ) : (
          <span className="text-[10px] font-bold text-[#457b9d]">
            {logoText || ticker.slice(0, 4)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col items-start">
        <span className="text-base font-bold text-[#1d3557]">{ticker}</span>
        <span className="pt-0.5 text-xs font-[350] text-[#457b9d]">{name}</span>
        <span className="pt-0.5 text-[10px] font-[350] text-[#457b9d]">{marketCap}</span>
      </div>

      {/* Detail Button or Price */}
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
