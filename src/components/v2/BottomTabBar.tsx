"use client";

import { useRouter, usePathname } from "next/navigation";

interface BottomTabBarProps {
  isDark?: boolean;
}

export default function BottomTabBar({ isDark = false }: BottomTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { icon: "🏠", label: "홈", href: "/v2/home" },
    { icon: "👤", label: "MY", href: "/v2/my" },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 flex pb-safe transition-colors duration-300 ${
        isDark ? "border-t border-[#333] bg-[#1e1e1e]" : "border-t border-[#eef5f2] bg-white"
      }`}
    >
      {tabs.map((tab) => {
        // v2/home, v2/watchlist, v2/my 경로 매칭
        const active = pathname.startsWith(tab.href);
        
        return (
          <button
            key={tab.label}
            type="button"
            onClick={() => router.push(tab.href)}
            className={`flex flex-1 flex-col items-center gap-1 py-3 transition-all ${
              isDark ? "active:bg-[#2a2a2a]" : "active:bg-[#f5faf7]"
            }`}
          >
            <span
              className={`text-xl transition-all ${
                active ? "-translate-y-0.5 scale-110" : ""
              }`}
            >
              {tab.icon}
            </span>
            <span
              className={`text-[10px] font-bold transition-colors ${
                active ? "text-[#1cb863]" : "text-[#b0c8b8]"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
