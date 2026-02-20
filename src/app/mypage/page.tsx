"use client";

import Image from "next/image";
import SubpageHeader from "@/components/ui/SubpageHeader";

export default function MyPagePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#0d0d0d]">
      <SubpageHeader title="마이페이지" />

      {/* Main */}
      <main className="flex flex-col items-center gap-8 p-4">
        {/* Profile Section */}
        <section className="flex flex-col items-center py-6 w-full">
          {/* Avatar */}
          <div className="relative">
            <div className="flex size-[96px] items-center justify-center overflow-hidden rounded-full border-2 border-[rgba(0,255,102,0.2)] p-[6px]">
              <div className="flex size-[84px] items-center justify-center overflow-hidden rounded-full bg-[#f5e6d3]">
                <Image src="/icons/profile-icon.svg" alt="User Profile" width={48} height={48} className="opacity-40" />
              </div>
            </div>
            {/* Edit Badge */}
            <div className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full border-2 border-[#0d0d0d] bg-[#0f6]">
              <Image src="/icons/edit-icon.svg" alt="Edit" width={14} height={14} />
            </div>
          </div>

          {/* Name + Type */}
          <div className="mt-4 flex flex-col items-center gap-1.5">
            <h2 className="text-[18px] font-bold text-white">김O우</h2>
            <span className="rounded-full border border-[rgba(0,255,102,0.3)] bg-[rgba(0,255,102,0.1)] px-[13px] py-[5px] text-[11px] font-bold text-[#0f6]">
              트레이더
            </span>
          </div>
        </section>

        {/* Settings Card */}
        <section className="w-full overflow-hidden rounded-[16px] border border-white/5 bg-[#141414]">
          {/* 투자 성향 수정 */}
          <button className="flex w-full items-center justify-between border-b border-white/[0.08] px-4 py-[14px] cursor-pointer">
            <div className="flex items-center gap-3">
              <Image src="/icons/invest-setting-icon.svg" alt="" width={22} height={22} className="brightness-0" style={{ filter: "brightness(0) saturate(100%) invert(68%) sepia(74%) saturate(2741%) hue-rotate(95deg) brightness(104%) contrast(107%)" }} />
              <span className="text-[15px] font-medium text-white/90">투자 성향 수정</span>
            </div>
            <Image src="/icons/chevron-right-icon.svg" alt="" width={24} height={28} className="opacity-30 brightness-0 invert" />
          </button>

          {/* 구독 관리 */}
          <button className="flex w-full items-center justify-between px-4 py-[15px] cursor-pointer">
            <div className="flex items-center gap-3">
              <Image src="/icons/subscription-icon.svg" alt="" width={22} height={22} className="brightness-0" style={{ filter: "brightness(0) saturate(100%) invert(68%) sepia(74%) saturate(2741%) hue-rotate(95deg) brightness(104%) contrast(107%)" }} />
              <div className="flex flex-col items-start">
                <span className="text-xs font-medium text-[#0f6]">Pro 등급 혜택 이용 중</span>
                <span className="text-[15px] font-medium text-white/90">구독 관리</span>
              </div>
            </div>
            <Image src="/icons/chevron-right-icon.svg" alt="" width={24} height={28} className="opacity-30 brightness-0 invert" />
          </button>
        </section>

        {/* Logout */}
        <button className="py-4 text-[15px] font-bold text-[#64748b] cursor-pointer">
          로그아웃
        </button>
      </main>
    </div>
  );
}
