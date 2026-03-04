"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface SubpageHeaderProps {
  title: string;
}

export default function SubpageHeader({ title }: SubpageHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#e1e1e1] bg-[#f1faee] px-4 pb-[14px] pt-[53px] backdrop-blur-[6px]">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center cursor-pointer"
          aria-label="Go back"
        >
          <Image
            src="/icons/back-icon.svg"
            alt="Back"
            width={24}
            height={24}
            style={{ filter: "brightness(0) saturate(100%) invert(17%) sepia(27%) saturate(2349%) hue-rotate(182deg) brightness(96%) contrast(91%)" }}
          />
        </button>
        <h1 className="text-[20px] font-bold tracking-[-0.5px] text-[#457b9d]">
          {title}
        </h1>
      </div>
      {/* Stocky PRO mini logo */}
      <div className="flex flex-col items-end opacity-80">
        <div className="flex items-center gap-0.5">
          <span className="text-[12.6px] font-extrabold uppercase tracking-[-0.315px] text-[#1d3557]" style={{ fontFamily: "Inter, sans-serif" }}>
            STOCKY
          </span>
          <div className="size-[5.4px] rounded-full bg-[#457b9d] shadow-[0px_0px_15px_0px_rgba(0,255,102,0.4)]" />
        </div>
        <span className="text-[7.2px] font-bold uppercase tracking-[0.72px] text-[#a8dadc]" style={{ fontFamily: "Inter, sans-serif" }}>
          PRO
        </span>
      </div>
    </header>
  );
}
