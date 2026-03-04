"use client";

import Image from "next/image";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchBar({ placeholder = "종목명 또는 섹터 검색", value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full py-1.5">
      <div className="relative w-full overflow-hidden rounded-xl bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <div className="absolute bottom-0 left-0 top-0 flex items-center pl-3">
          <Image
            src="/icons/search-icon.svg"
            alt="Search"
            width={24}
            height={28}
            className="rotate-180"
            style={{ filter: "brightness(0) saturate(100%) invert(52%) sepia(10%) saturate(1397%) hue-rotate(169deg) brightness(89%) contrast(87%)" }}
          />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-transparent py-3 pl-10 pr-3 text-base font-light text-[#1d3557] placeholder:text-[#a0a0a0] focus:outline-none"
        />
      </div>
    </div>
  );
}
