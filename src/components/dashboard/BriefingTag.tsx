interface BriefingTagProps {
  label: string;
}

export default function BriefingTag({ label }: BriefingTagProps) {
  return (
    <span className="rounded-[6px] border border-[#e1e1e1] bg-[#e8f4f5] px-[11px] py-[5px] text-[11px] font-medium text-[#457b9d]">
      {label}
    </span>
  );
}
