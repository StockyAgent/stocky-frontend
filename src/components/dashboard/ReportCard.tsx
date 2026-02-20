import Image from "next/image";

type ReportType = "데일리" | "주간" | "심층분석";

interface ReportCardProps {
  type: ReportType;
  date: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const TAG_STYLES: Record<ReportType, { bg: string; border: string; text: string }> = {
  "데일리": {
    bg: "rgba(0,255,102,0.1)",
    border: "rgba(0,255,102,0.2)",
    text: "#00ff66",
  },
  "주간": {
    bg: "rgba(51,102,255,0.1)",
    border: "rgba(51,102,255,0.2)",
    text: "#3366ff",
  },
  "심층분석": {
    bg: "rgba(255,77,77,0.1)",
    border: "rgba(255,77,77,0.2)",
    text: "#ff4d4d",
  },
};

export default function ReportCard({ type, date, title, description, onClick }: ReportCardProps) {
  const style = TAG_STYLES[type];

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-[16px] border border-white/5 bg-[#181818] p-[21px] text-left cursor-pointer"
    >
      <div className="flex flex-1 flex-col gap-[6px]">
        {/* Tag + Date */}
        <div className="flex items-center justify-between">
          <span
            className="rounded-[4px] px-[7px] py-[3px] text-[10px] font-bold"
            style={{
              backgroundColor: style.bg,
              border: `1px solid ${style.border}`,
              color: style.text,
            }}
          >
            {type}
          </span>
          <span className="text-[10px] font-medium tracking-[-0.25px] text-[#64748b]" style={{ fontFamily: "Inter, sans-serif" }}>
            {date}
          </span>
        </div>
        {/* Title */}
        <h4 className="truncate text-[15px] font-bold text-white">{title}</h4>
        {/* Description */}
        <p className="truncate text-[12px] font-[350] text-[#94a3b8]">{description}</p>
      </div>
      <Image src="/icons/chevron-right-icon.svg" alt="" width={24} height={24} className="shrink-0 opacity-40 brightness-0 invert" />
    </button>
  );
}
