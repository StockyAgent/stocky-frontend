"use client";

import { useRouter } from "next/navigation";
import { V2_NOTICES } from "@/data/v2/mock";

export default function V2NoticesPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col bg-[#f5faf7]">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4 shadow-sm">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex size-10 items-center justify-center rounded-[13px] bg-[#f5faf7] text-lg text-[#0f2318] active:bg-[#e8f5ee]"
        >
          ←
        </button>
        <h1 className="text-[18px] font-black text-[#0f2318]">공지사항</h1>
        <div className="size-10" />
      </header>

      {/* 목록 */}
      <main className="flex-1 px-5 py-6 pb-12">
        <div className="flex flex-col gap-3">
          {V2_NOTICES.map((notice) => (
            <button
              key={notice.id}
              onClick={() => router.push(`/v2/notices/${notice.id}`)}
              className="flex flex-col items-start gap-2 rounded-[16px] bg-white p-5 text-left shadow-[0_4px_0_#d0e8d8] transition-all active:translate-y-1 active:shadow-[0_1px_0_#d0e8d8]"
            >
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  notice.type === "업데이트" ? "bg-[#d0f0dd] text-[#0d7a3e]" :
                  notice.type === "이벤트" ? "bg-[#ffe0c0] text-[#cc7000]" :
                  "bg-[#e0e0e0] text-[#555555]"
                }`}>
                  {notice.type}
                </span>
                <span className="text-[11px] text-[#8abeaa]">{notice.date}</span>
              </div>
              <h2 className="text-[14px] font-black leading-snug text-[#0f2318] line-clamp-2">
                {notice.title}
              </h2>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
