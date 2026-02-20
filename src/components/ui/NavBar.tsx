"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "홈", icon: "/icons/home-icon.svg", href: "/dashboard" },
  { label: "관심종목", icon: "/icons/watchlist-icon.svg", href: "/watchlist" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-[72px] items-center justify-around border-t border-white/5 bg-[#0d0d0d] px-4">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center gap-0.5"
          >
            <div
              className="flex size-[34px] items-center justify-center"
              style={{ color: isActive ? "#00ff66" : "#64748b" }}
            >
              <Image src={tab.icon} alt={tab.label} width={24} height={24} className="brightness-0" style={{ filter: isActive ? "brightness(0) saturate(100%) invert(68%) sepia(74%) saturate(2741%) hue-rotate(95deg) brightness(104%) contrast(107%)" : "brightness(0) saturate(100%) invert(44%) sepia(11%) saturate(1397%) hue-rotate(182deg) brightness(95%) contrast(88%)" }} />
            </div>
            <span
              className={`text-[11px] tracking-[-0.275px] ${
                isActive ? "font-bold text-[#0f6]" : "font-medium text-[#64748b]"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
