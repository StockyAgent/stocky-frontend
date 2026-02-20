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
          ? "border-accent bg-accent/5 shadow-[0px_0px_0px_1px_#00ff66]"
          : "border-white/10 bg-[#1c1c1e] shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)]"
      }`}
    >
      {/* Icon */}
      <div className="mr-4 flex-shrink-0">
        <div className={`flex size-12 items-center justify-center rounded-full ${
          selected ? "bg-accent/10" : "bg-white/5"
        }`}>
          <Image
            src={iconSrc}
            alt={title}
            width={26}
            height={32}
            className="rotate-180"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col items-start pr-2">
        <span className="text-[17px] font-bold text-white">{title}</span>
        <span className="text-sm font-light text-gray-400">{description}</span>
      </div>

      {/* Radio indicator */}
      {selected ? (
        <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-accent bg-accent">
          <div className="size-2 rounded-[4px] bg-black" />
        </div>
      ) : (
        <div className="size-6 flex-shrink-0 rounded-full border-2 border-gray-600" />
      )}
    </button>
  );
}
