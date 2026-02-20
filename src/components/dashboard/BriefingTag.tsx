interface BriefingTagProps {
  label: string;
}

export default function BriefingTag({ label }: BriefingTagProps) {
  return (
    <span className="rounded-[6px] border border-white/5 bg-[#1e1e1e] px-[11px] py-[5px] text-[11px] font-medium text-[#94a3b8]">
      {label}
    </span>
  );
}
