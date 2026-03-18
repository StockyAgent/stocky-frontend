"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "홈", href: "/demo/dashboard" },
  { label: "관심종목", href: "/demo/watchlist" },
  { label: "MY", href: "/demo/mypage" },
];

// 아이콘을 SVG로 직접 그림 (피그마 스타일)
function HomeIcon({ active }: { active: boolean }) {
  const c = active ? "#1cb863" : "#8abeaa";
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path d="M2.625 8.225L10.5 2.625L18.375 8.225V17.5C18.375 17.964 18.191 18.409 17.862 18.737C17.534 19.066 17.089 19.25 16.625 19.25H4.375C3.911 19.25 3.466 19.066 3.138 18.737C2.809 18.409 2.625 17.964 2.625 17.5V8.225Z" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill={active ? "rgba(28,184,99,0.1)" : "none"}/>
      <path d="M7.875 19.25V10.5H13.125V19.25" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WatchIcon({ active }: { active: boolean }) {
  const c = active ? "#1cb863" : "#8abeaa";
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path d="M18.375 13.125C18.375 13.589 18.191 14.034 17.862 14.362C17.534 14.691 17.089 14.875 16.625 14.875H5.25L1.75 18.375V3.5C1.75 3.036 1.934 2.591 2.263 2.263C2.591 1.934 3.036 1.75 3.5 1.75H16.625C17.089 1.75 17.534 1.934 17.862 2.263C18.191 2.591 18.375 3.036 18.375 3.5V13.125Z" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill={active ? "rgba(28,184,99,0.1)" : "none"}/>
    </svg>
  );
}

function MyIcon({ active }: { active: boolean }) {
  const c = active ? "#1cb863" : "#8abeaa";
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <circle cx="10.5" cy="7" r="3.5" stroke={c} strokeWidth="1.75" fill={active ? "rgba(28,184,99,0.1)" : "none"}/>
      <path d="M3.5 18.375C3.5 15.061 6.686 12.25 10.5 12.25C14.314 12.25 17.5 15.061 17.5 18.375" stroke={c} strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  );
}

const ICONS = [HomeIcon, WatchIcon, MyIcon];

export default function DemoNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-[#d8f0e2] bg-white">
      <div className="flex items-start justify-center pb-[4px] pt-[11px]">
        {NAV.map((item, i) => {
          const active = pathname === item.href || pathname.startsWith(item.href);
          const Icon = ICONS[i];
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center gap-[3px]"
            >
              <Icon active={active} />
              <span
                className="text-[10px] font-bold"
                style={{ color: active ? "#1cb863" : "#8abeaa" }}
              >
                {item.label}
              </span>
              {active && (
                <div className="size-[4px] rounded-[2px] bg-[#1cb863]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
