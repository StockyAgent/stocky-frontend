"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocusChange?: (focused: boolean) => void;
}

export default function SearchBar({
  placeholder = "종목명 또는 섹터 검색",
  value,
  onChange,
  onFocusChange,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
    onFocusChange?.(true);
  };

  const handleBlur = () => {
    // Delay to allow clear button click
    setTimeout(() => {
      setIsFocused(false);
      onFocusChange?.(false);
    }, 150);
  };

  const handleClear = () => {
    onChange?.("");
    inputRef.current?.focus();
  };

  const isActive = isFocused || (value && value.length > 0);

  return (
    <div className="relative w-full py-1.5">
      <div
        className={`relative w-full overflow-hidden rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-white shadow-[0px_2px_8px_0px_rgba(69,123,157,0.15)] ring-1 ring-[#457b9d]"
            : "bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        }`}
      >
        <div className="absolute bottom-0 left-0 top-0 flex items-center pl-3">
          <Image
            src="/icons/search-icon.svg"
            alt="Search"
            width={24}
            height={28}
            className="rotate-180"
            style={{
              filter: isActive
                ? "brightness(0) saturate(100%) invert(17%) sepia(27%) saturate(2349%) hue-rotate(182deg) brightness(96%) contrast(91%)"
                : "brightness(0) saturate(100%) invert(52%) sepia(10%) saturate(1397%) hue-rotate(169deg) brightness(89%) contrast(87%)",
            }}
          />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full bg-transparent py-3 pl-10 pr-10 text-base font-light text-[#1d3557] placeholder:text-[#a0a0a0] focus:outline-none"
        />
        {/* Clear Button */}
        {value && value.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute bottom-0 right-0 top-0 flex items-center pr-3 cursor-pointer"
          >
            <div className="flex size-5 items-center justify-center rounded-full bg-[#a0a0a0]">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
