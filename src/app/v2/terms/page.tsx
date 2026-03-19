"use client";

import { useRouter } from "next/navigation";

export default function V2TermsPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex size-10 items-center justify-center rounded-[13px] bg-[#f5faf7] text-lg text-[#0f2318] active:bg-[#e8f5ee]"
        >
          ←
        </button>
        <h1 className="text-[16px] font-black text-[#0f2318]">이용약관</h1>
        <div className="size-10" /> {/* 우측 여백 맞춤용 */}
      </header>

      {/* 본문 */}
      <main className="flex-1 px-5 pb-12 pt-4">
        <div className="rounded-[20px] bg-[#f5faf7] p-6 text-[13px] leading-relaxed text-[#3d6b50]">
          <h2 className="mb-4 text-[15px] font-black text-[#0f2318]">제1조 (목적)</h2>
          <p className="mb-6">
            본 약관은 Stocky(이하 &quot;회사&quot;)가 제공하는 주식 AI 애널리스트 서비스(이하 &quot;서비스&quot;)의 이용조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
          </p>

          <h2 className="mb-4 text-[15px] font-black text-[#0f2318]">제2조 (용어의 정의)</h2>
          <p className="mb-6">
            ① &quot;서비스&quot;란 구현되는 단말기(PC, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이 회원이 이용할 수 있는 Stocky 관련 제반 서비스를 의미합니다.<br />
            ② &quot;회원&quot;이란 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.<br />
            ③ &quot;콘텐츠&quot;란 회사가 서비스 내에서 제공하는 종목 분석 데이터, 데일리 브리핑, AI 리포트 등 일체의 정보를 의미합니다.
          </p>

          <h2 className="mb-4 text-[15px] font-black text-[#0f2318]">제3조 (약관의 효력과 변경)</h2>
          <p className="mb-6">
            ① 회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.<br />
            ② 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며, 개정 시 적용일자 및 개정사유를 명시하여 사전 공지합니다.
          </p>

          <h2 className="mb-4 text-[15px] font-black text-[#0f2318]">제4조 (회사의 의무 및 면책)</h2>
          <p className="mb-6">
            ① 회사는 지속적이고 안정적으로 서비스를 제공하기 위해 최선을 다합니다.<br />
            ② 회사가 제공하는 주식 분석 정보와 리포트는 투자를 위한 보조 지표일 뿐이며, 투자의 최종 결정과 그 결과에 대한 책임은 전적으로 회원 본인에게 있습니다.<br />
            ③ 회사는 AI 분석 결과의 100% 정확성이나 수익을 보장하지 않습니다.
          </p>
          
          <div className="mt-8 border-t border-[#d0e8d8] pt-6 text-center text-[11px] text-[#8abeaa]">
            공고일자: 2026년 3월 1일<br />
            시행일자: 2026년 3월 1일
          </div>
        </div>
      </main>
    </div>
  );
}
