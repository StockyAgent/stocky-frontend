interface DailyBriefingItemProps {
  keyword: string;
  content: string;
}

export default function DailyBriefingItem({ keyword, content }: DailyBriefingItemProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-[8px] size-[6px] shrink-0 rounded-full bg-[#8ecae6]" />
      <p className="text-[14px] leading-[22.75px] font-[350] text-[#457b9d]">
        <span className="font-bold text-[#1d3557]">{keyword}</span> {content}
      </p>
    </div>
  );
}
