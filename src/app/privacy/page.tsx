"use client";

import SubpageHeader from "@/components/ui/SubpageHeader";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#f1faee]">
      <SubpageHeader title="개인정보 처리방침" />

      <main className="flex-1 px-5 py-6">
        <h2 className="mb-4 text-lg font-bold text-[#1d3557]">Stocky 개인정보 처리방침</h2>
        <p className="mb-2 text-xs text-[#a0a0a0]">최종 수정일: 2026년 3월 1일</p>

        <div className="flex flex-col gap-6 text-sm font-[350] leading-relaxed text-[#457b9d]">
          <section>
            <h3 className="mb-2 text-[15px] font-bold text-[#1d3557]">1. 수집하는 개인정보 항목</h3>
            <p>
              서비스는 회원가입, 서비스 이용 과정에서 아래의 개인정보를 수집합니다.
            </p>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              <li>Google 계정 정보 (이메일, 이름, 프로필 사진)</li>
              <li>투자 성향 정보 (투자자/트레이더 선택)</li>
              <li>관심 종목 목록</li>
              <li>서비스 이용 기록, 접속 로그</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-2 text-[15px] font-bold text-[#1d3557]">2. 개인정보의 수집 및 이용 목적</h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>맞춤형 AI 주식 분석 브리핑 제공</li>
              <li>관심 종목 기반 개인화 리포트 생성</li>
              <li>서비스 개선 및 신규 기능 개발</li>
              <li>서비스 관련 공지사항 전달</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-2 text-[15px] font-bold text-[#1d3557]">3. 개인정보의 보유 및 이용 기간</h3>
            <p>
              이용자의 개인정보는 서비스 이용 기간 동안 보유하며, 회원 탈퇴 시 지체 없이
              파기합니다. 단, 관계 법령에 의해 보존 의무가 있는 경우 해당 기간 동안 보관합니다.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-[15px] font-bold text-[#1d3557]">4. 개인정보의 제3자 제공</h3>
            <p>
              서비스는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만, 법령에 의해
              요구되는 경우는 예외로 합니다.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-[15px] font-bold text-[#1d3557]">5. 개인정보의 안전성 확보 조치</h3>
            <p>
              서비스는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
            </p>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              <li>개인정보의 암호화</li>
              <li>해킹 등에 대비한 보안 시스템 운영</li>
              <li>개인정보 접근 권한 최소화</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-2 text-[15px] font-bold text-[#1d3557]">6. 이용자의 권리</h3>
            <p>
              이용자는 언제든지 등록된 개인정보를 조회하거나 수정할 수 있으며, 회원 탈퇴를 통해
              개인정보의 삭제를 요청할 수 있습니다.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-[15px] font-bold text-[#1d3557]">7. 개인정보 보호 책임자</h3>
            <p>
              개인정보 처리에 관한 문의사항은 아래 연락처로 문의해 주시기 바랍니다.
            </p>
            <div className="mt-2 rounded-xl border border-[#e1e1e1] bg-white p-4">
              <p>담당자: Stocky 개인정보보호팀</p>
              <p>이메일: privacy@stocky.app</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
