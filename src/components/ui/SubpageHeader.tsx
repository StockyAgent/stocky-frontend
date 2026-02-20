"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface SubpageHeaderProps {
  title: string;
}

export default function SubpageHeader({ title }: SubpageHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-[rgba(13,13,13,0.95)] px-4 pb-[14px] pt-[53px] backdrop-blur-[12px]">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center cursor-pointer"
          aria-label="Go back"
        >
          <Image src="/icons/back-icon.svg" alt="Back" width={24} height={24} className="brightness-0 invert" />
        </button>
        <h1 className="text-[20px] font-bold tracking-[-0.5px] text-white">
          {title}
        </h1>
      </div>
      {/* Stocky PRO mini logo */}
      <div className="flex flex-col items-end opacity-80">
        <div className="flex items-center gap-0.5">
          <span className="text-[12.6px] font-extrabold uppercase tracking-[-0.315px] text-white" style={{ fontFamily: "Inter, sans-serif" }}>
            STOCKY
          </span>
          <div className="size-[5.4px] rounded-full bg-[#0f6] shadow-[0px_0px_15px_0px_rgba(0,255,102,0.4)]" />
        </div>
        <span className="text-[7.2px] font-bold uppercase tracking-[0.72px] text-[#0f6]" style={{ fontFamily: "Inter, sans-serif" }}>
          PRO
        </span>
      </div>
    </header>
  );
}
