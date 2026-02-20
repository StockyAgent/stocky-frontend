"use client";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function PrimaryButton({ children, onClick, disabled }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex h-14 w-full max-w-[342px] items-center justify-center rounded-xl bg-accent px-5 text-base font-bold tracking-wide text-[#0d0d0d] transition-transform active:scale-[0.98] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      type="button"
    >
      {children}
    </button>
  );
}
