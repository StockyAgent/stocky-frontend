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
      className={`shrink-0 rounded-full border px-[17px] py-[7px] text-sm transition-all cursor-pointer ${
        active
          ? "border-[#e1e1e1] bg-[#8ecae6] font-bold text-[#457b9d] shadow-[0px_1px_2px_0px_rgba(0,255,102,0.2)]"
          : "border-[#e1e1e1] bg-white font-medium text-[#457b9d]"
      }`}
    >
      {label}
    </button>
  );
}
