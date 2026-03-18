"use client";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export default function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
  className = "",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-14 w-full max-w-[342px] items-center justify-center rounded-xl bg-[#a8dadc] px-5 text-base font-bold tracking-wide text-[#0d0d0d] transition-transform active:scale-[0.98] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
