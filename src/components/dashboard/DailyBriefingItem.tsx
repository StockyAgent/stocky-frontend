interface DailyBriefingItemProps {
  keyword: string;
  content: string;
}

export default function DailyBriefingItem({ keyword, content }: DailyBriefingItemProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-[8px] size-[6px] shrink-0 rounded-full bg-[#0f6]" />
      <p className="text-[14px] leading-[22.75px] font-[350] text-[#e2e8f0]">
        <span className="font-bold text-white">{keyword}</span> {content}
      </p>
    </div>
  );
}
