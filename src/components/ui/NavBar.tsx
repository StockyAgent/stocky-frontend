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
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-[72px] items-center justify-around bg-[#f1faee] px-4">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center gap-0.5"
          >
            <div className="flex size-[34px] items-center justify-center">
              <Image
                src={tab.icon}
                alt={tab.label}
                width={24}
                height={24}
                style={{
                  filter: isActive
                    ? "brightness(0) saturate(100%) invert(17%) sepia(27%) saturate(2349%) hue-rotate(182deg) brightness(96%) contrast(91%)"
                    : "brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)",
                }}
              />
            </div>
            <span
              className={`text-[11px] tracking-[-0.275px] ${
                isActive
                  ? "font-bold text-[#1d3557]"
                  : "font-medium text-[#a0a0a0]"
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
