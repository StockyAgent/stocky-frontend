"use client";

import SubpageHeader from "@/components/ui/SubpageHeader";

export default function TermsPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#f1faee]">
      <SubpageHeader title="이용약관" />

      <main className="flex-1 px-5 py-6">
        <h2 className="mb-4 text-lg font-bold text-[#1d3557]">Stocky 서비스 이용약관</h2>
        <p className="mb-2 text-xs text-[#a0a0a0]">최종 수정일: 2026년 3월 1일</p>

        <div className="flex flex-col gap-6 text-sm font-[350] leading-relaxed text-[#457b9d]">
          <section>
            <h3 className="mb-2 text-[15px] font-bold text-[#1d3557]">제1조 (목적)</h3>
            <p>
              본 약관은 Stocky(이하 &quot;서비스&quot;)가 제공하는 AI 기반 주식 분석 및 브리핑 서비스의 이용 조건과
              절차, 이용자와 서비스 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-[15px] font-bold text-[#1d3557]">제2조 (정의)</h3>
            <p>
              ① &quot;서비스&quot;란 Stocky가 제공하는 AI 주식 애널리스트 플랫폼으로, 맞춤형 데일리 브리핑,
              주간 리포트, 관심 종목 관리 등의 기능을 포함합니다.
            </p>
            <p className="mt-2">
              ② &quot;이용자&quot;란 본 약관에 따라 서비스가 제공하는 서비스를 이용하는 자를 말합니다.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-[15px] font-bold text-[#1d3557]">제3조 (서비스 제공)</h3>
            <p>
              ① 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 단, 시스템 점검 등의 사유로
              일시적으로 중단될 수 있습니다.
            </p>
            <p className="mt-2">
              ② AI 분석 결과는 참고 목적으로만 제공되며, 투자에 대한 최종 결정과 책임은 이용자 본인에게
              있습니다.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-[15px] font-bold text-[#1d3557]">제4조 (이용자의 의무)</h3>
            <p>
              이용자는 서비스를 이용함에 있어 관련 법령, 본 약관의 규정, 이용 안내 및 주의사항을
              준수하여야 하며, 기타 서비스의 업무에 방해되는 행위를 하여서는 안 됩니다.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-[15px] font-bold text-[#1d3557]">제5조 (면책 조항)</h3>
            <p>
              ① 서비스는 AI가 생성한 분석 결과의 정확성, 완전성, 신뢰성을 보증하지 않습니다.
            </p>
            <p className="mt-2">
              ② 서비스를 통해 제공되는 정보를 기반으로 한 투자 손실에 대해 서비스는 책임을 지지
              않습니다.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-[15px] font-bold text-[#1d3557]">제6조 (약관의 변경)</h3>
            <p>
              서비스는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해
              게시합니다. 변경된 약관에 동의하지 않는 이용자는 서비스 이용을 중단할 수 있습니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
