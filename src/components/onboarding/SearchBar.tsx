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
      <div className="relative w-full overflow-hidden rounded-xl bg-card-bg shadow-sm">
        <div className="absolute bottom-0 left-0 top-0 flex items-center pl-3">
          <Image
            src="/icons/search-icon.svg"
            alt="Search"
            width={24}
            height={28}
            className="rotate-180"
          />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-transparent py-3 pl-10 pr-3 text-base font-light text-white placeholder:text-gray-500 focus:outline-none"
        />
      </div>
    </div>
  );
}
