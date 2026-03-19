"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { V2_NOTICES } from "@/data/v2/mock";

export default function V2NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const notice = V2_NOTICES.find((n) => n.id === id);

  if (!notice) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-[#f5faf7]">
        <p className="text-[#3d6b50]">공지사항을 찾을 수 없습니다.</p>
        <button onClick={() => router.back()} className="mt-4 rounded-[12px] bg-[#1cb863] px-4 py-2 font-bold text-white">돌아가기</button>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4 border-b border-[#f0f0f0]">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex size-10 items-center justify-center rounded-[13px] bg-[#f5faf7] text-lg text-[#0f2318] active:bg-[#e8f5ee]"
        >
          ←
        </button>
        <h1 className="text-[16px] font-black text-[#0f2318]">공지사항 상세</h1>
        <div className="size-10" />
      </header>

      <main className="flex-1 px-5 py-6 pb-12">
        {/* 제목 영역 */}
        <div className="mb-6 border-b border-[#e8f0ec] pb-6">
          <div className="mb-3 flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
              notice.type === "업데이트" ? "bg-[#d0f0dd] text-[#0d7a3e]" :
              notice.type === "이벤트" ? "bg-[#ffe0c0] text-[#cc7000]" :
              "bg-[#e0e0e0] text-[#555555]"
            }`}>
              {notice.type}
            </span>
            <span className="text-[12px] text-[#8abeaa]">{notice.date}</span>
          </div>
          <h2 className="text-[18px] font-black leading-snug text-[#0f2318]">
            {notice.title}
          </h2>
        </div>

        {/* 본문 영역 */}
        <div className="text-[14px] leading-[1.8] text-[#3d6b50] whitespace-pre-wrap">
          {notice.content}
        </div>
      </main>
    </div>
  );
}
