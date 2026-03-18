"use client";

interface DemoSectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 피그마 섹션 타이틀 (내 종목 브리핑, 내 관심종목 등)
 * - text-[12.5px] font-black text-[#0f2318]
 */
export default function DemoSectionTitle({ children, className = "" }: DemoSectionTitleProps) {
  return (
    <p className={`text-[12.5px] font-black text-[#0f2318] ${className}`}>
      {children}
    </p>
  );
}
