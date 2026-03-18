"use client";

import { useRouter } from "next/navigation";
import DemoNavBar from "@/components/demo/DemoNavBar";

// 피그마 MyPage 화면 재현
const MENU = [
  { icon: "📈", label: "관심종목 관리",    href: "/demo/watchlist" },
  { icon: "🔔", label: "알림 설정",         href: "#" },
  { icon: "⭐", label: "구독 플랜",         href: "#", badge: "무료" },
  { icon: "🎯", label: "투자 성향 재설정",  href: "/demo/onboarding/step1" },
];

export default function DemoMyPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col bg-white pb-[58px]">
      {/* 뒤로가기 */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1 px-[18px] pt-[18px] pb-[4px] text-[12px] font-bold text-[#8abeaa] cursor-pointer"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        마이페이지
      </button>

      {/* 프로필 */}
      <div className="flex flex-col items-center gap-[6px] pb-[18px] pt-[8px]">
        <div
          className="flex size-[60px] items-center justify-center rounded-full text-[22px] font-black text-white"
          style={{ backgroundImage: "linear-gradient(145deg, rgb(10,61,31) 0%, rgb(13,122,62) 100%)" }}
        >
          남
        </div>
        <p className="text-[17px] font-black text-[#0f2318]">석준환</p>
        <p className="text-[11px] font-[350] text-[#8abeaa]">stocky@gmail.com</p>
      </div>

      {/* 통계 */}
      <div className="mx-[18px] mb-[18px]">
        <div className="flex divide-x-2 divide-[#d8f0e2] rounded-[16px] border-2 border-[#d8f0e2] bg-white">
          <div className="flex flex-1 flex-col items-center py-[10px]">
            <p className="text-[16px] font-black text-[#0f2318]">🔥5</p>
            <p className="text-[10px] font-[350] text-[#8abeaa]">연속 일수</p>
          </div>
          <div className="flex flex-1 flex-col items-center py-[10px]">
            <p className="text-[16px] font-black text-[#0f2318]">2개</p>
            <p className="text-[10px] font-[350] text-[#8abeaa]">관심종목</p>
          </div>
          <div className="flex flex-1 flex-col items-center py-[10px]">
            <p className="text-[16px] font-black text-[#0f2318]">68개</p>
            <p className="text-[10px] font-[350] text-[#8abeaa]">리포트 수신</p>
          </div>
        </div>
      </div>

      {/* 계정 설정 메뉴 */}
      <p className="mb-[8px] px-[18px] text-[10px] font-bold uppercase tracking-[1px] text-[#8abeaa]">계정 설정</p>
      <div className="flex flex-col gap-[8px] px-[18px]">
        {MENU.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => router.push(item.href)}
            className="flex items-center gap-[13px] rounded-[15px] border-2 border-[#d8f0e2] bg-white px-[16px] py-[14px] shadow-[0px_3px_0px_0px_#d8f0e2] cursor-pointer"
          >
            <div className="flex size-[38px] items-center justify-center rounded-[11px] bg-[#e8fcf0] text-[18px]">
              {item.icon}
            </div>
            <span className="flex-1 text-left text-[13px] font-black text-[#0f2318]">{item.label}</span>
            {item.badge
              ? <span className="rounded-[5px] bg-[#fff8e8] px-[8px] py-[2px] text-[10px] font-black text-[#b45309]">{item.badge}</span>
              : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3L9 7L5 11" stroke="#d8f0e2" strokeWidth="1.5" strokeLinecap="round"/></svg>
            }
          </button>
        ))}
      </div>

      {/* 로그아웃 */}
      <button
        type="button"
        onClick={() => router.push("/demo")}
        className="mx-[18px] mt-[16px] rounded-[15px] border-2 border-[#ffe8e8] bg-white py-[14px] text-[13px] font-black text-[#ff4d4d] shadow-[0px_3px_0px_0px_#ffe8e8] cursor-pointer"
      >
        로그아웃
      </button>

      <DemoNavBar />
    </div>
  );
}
