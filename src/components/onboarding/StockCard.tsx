"use client";

import Image from "next/image";

interface StockCardProps {
  ticker: string;
  name: string;
  marketCap: string;
  price: string;
  logoSrc?: string;
  logoText?: string;
  selected: boolean;
  onClick: () => void;
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
}: StockCardProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex w-full items-center overflow-hidden rounded-xl border p-[17px] transition-all cursor-pointer ${
        selected
          ? "border-accent bg-card-bg"
          : "border-white/5 bg-card-bg"
      }`}
    >
      {/* Checkbox */}
      <div className="mr-3 flex-shrink-0">
        {selected ? (
          <div className="flex size-6 items-center justify-center rounded-md border-2 border-accent bg-accent">
            <Image
              src="/icons/check-icon.svg"
              alt="Selected"
              width={25}
              height={25}
            />
          </div>
        ) : (
          <div className="size-6 rounded-md border-2 border-white/20" />
        )}
      </div>

      {/* Logo */}
      <div className="mr-4 flex size-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2c2c2c]">
        {logoSrc ? (
          <Image src={logoSrc} alt={ticker} width={20} height={20} />
        ) : (
          <span className={`text-[10px] font-bold ${selected ? "text-accent" : "text-gray-300"}`}>
            {logoText || ticker.slice(0, 4)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col items-start">
        <span className="text-base font-bold text-white">{ticker}</span>
        <span className="pt-0.5 text-xs font-light text-gray-400">{name}</span>
        <span className="pt-0.5 text-[10px] font-light text-gray-500">{marketCap}</span>
      </div>

      {/* Price */}
      <span className="flex-shrink-0 text-base font-bold text-white">{price}</span>
    </button>
  );
}
