"use client";

interface DemoPrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

/**
 * 피그마 CTA 버튼
 * - 활성: bg-[#1cb863] border-b-4 border-[#159e51] rounded-[16px]
 * - 비활성: bg-[#d8f0e2] cursor-not-allowed
 */
export default function DemoPrimaryButton({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}: DemoPrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center rounded-[16px] pb-[19px] pt-[15px] transition-all ${
        disabled
          ? "cursor-not-allowed bg-[#d8f0e2]"
          : "cursor-pointer border-b-4 border-[#159e51] bg-[#1cb863] active:scale-[0.98]"
      } ${className}`}
    >
      <span className="text-[15px] font-black text-white">{children}</span>
    </button>
  );
}
