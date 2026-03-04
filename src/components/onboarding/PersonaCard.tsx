"use client";

import Image from "next/image";

interface PersonaCardProps {
  type: "investor" | "trader";
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function PersonaCard({ type, title, description, selected, onClick }: PersonaCardProps) {
  const iconSrc = type === "investor" ? "/icons/investor-icon.svg" : "/icons/trader-icon.svg";

  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex w-full items-center overflow-hidden rounded-2xl border p-[17px] transition-all cursor-pointer ${
        selected
          ? "border-[#457b9d] bg-[#e8f4f5] shadow-[0px_0px_0px_1px_#457b9d]"
          : "border-[#e1e1e1] bg-white shadow-[0px_0px_0px_1px_#e1e1e1]"
      }`}
    >
      {/* Icon */}
      <div className="mr-4 shrink-0">
        <div className={`flex size-12 items-center justify-center rounded-full ${
          selected ? "bg-[rgba(142,202,230,0.2)]" : "bg-[#f1faee]"
        }`}>
          <Image
            src={iconSrc}
            alt={title}
            width={26}
            height={32}
            className="rotate-180"
            style={{ filter: "brightness(0) saturate(100%) invert(17%) sepia(27%) saturate(2349%) hue-rotate(182deg) brightness(96%) contrast(91%)" }}
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col items-start pr-2">
        <span className="text-[17px] font-bold text-[#1d3557]">{title}</span>
        <span className="text-sm font-light text-[#457b9d]">{description}</span>
      </div>

      {/* Radio indicator */}
      {selected ? (
        <div className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-[#457b9d] bg-[#457b9d]">
          <div className="size-2 rounded-[4px] bg-white" />
        </div>
      ) : (
        <div className="size-6 shrink-0 rounded-full border-2 border-[#e1e1e1]" />
      )}
    </button>
  );
}
