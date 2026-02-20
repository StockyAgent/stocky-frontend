"use client";

interface CategoryButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function CategoryButton({ label, active, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex-shrink-0 rounded-full border px-[17px] py-[7px] text-sm font-medium transition-all cursor-pointer ${
        active
          ? "border-accent bg-accent font-bold text-[#0d0d0d] shadow-[0px_1px_2px_0px_rgba(0,255,102,0.2)]"
          : "border-white/10 bg-card-bg text-gray-400"
      }`}
    >
      {label}
    </button>
  );
}
