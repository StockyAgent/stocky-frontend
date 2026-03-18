"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const COACHES = [
  {
    id: "value",
    emoji: "🏛️",
    name: "튼튼한 가치투자 코치",
    tagline: "\"싸게 사서 오래 들고 가자\"",
    tags: ["입문", "장기 보유", "재무 분석"],
    desc: "기업의 본질적 가치를 분석해서 저평가된 보석을 함께 찾아요.",
    example: "\"이 회사 PBR이 0.8이야. 자산 대비 싸다는 뜻인데, 왜 그런지 같이 볼까?\"",
  },
  {
    id: "lifestyle",
    emoji: "🛒",
    name: "생활 속 투자 코치",
    tagline: "\"매일 쓰는 것에서 기회를 찾자\"",
    tags: ["입문", "중장기", "소비 트렌드"],
    desc: "우리 일상에서 뜨는 브랜드와 소비 트렌드로 종목을 발굴해요.",
    example: "\"요즘 다들 이 앱 쓰지? 이 회사 매출이 3분기 연속 올랐어!\"",
  },
  {
    id: "tech",
    emoji: "🚀",
    name: "테크 트렌드 코치",
    tagline: "\"세상을 바꿀 기술, 같이 찾자\"",
    tags: ["중급", "AI·반도체", "전기차"],
    desc: "AI, 반도체, 전기차 등 미래 기술의 투자 기회를 분석해요.",
    example: "\"이 회사 AI 칩 점유율이 80%야. 경쟁사가 따라오려면 최소 2년은 걸려.\"",
  },
  {
    id: "macro",
    emoji: "🌐",
    name: "거시경제 코치",
    tagline: "\"금리, 환율, 경기의 흐름을 읽자\"",
    tags: ["중급", "거시경제", "섹터 분석"],
    desc: "경제 전체의 큰 흐름을 읽고 어떤 섹터가 유리한지 알려줘요.",
    example: "\"연준이 금리를 내리면 어떤 업종이 먼저 올라? 같이 정리해보자.\"",
  },
];

export default function V2CoachPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>("lifestyle");

  const selected = COACHES.find((c) => c.id === selectedId)!;

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* 진행바 */}
      <div className="flex gap-1 px-6 pt-6">
        <div className="h-1.5 flex-1 rounded-full bg-[#1cb863]" />
        <div className="h-1.5 flex-1 rounded-full bg-[#e8f5ee]" />
      </div>

      {/* 헤더 */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-[26px] font-black leading-tight text-[#0f2318]">
          나의 <span className="text-[#1cb863]">투자 코치</span>를<br />선택해보세요 🎯
        </h1>
        <p className="mt-2 text-[13px] text-[#6b9e7e]">코치마다 분석 스타일이 달라요. 언제든 변경 가능!</p>
      </div>

      {/* 코치 카드 목록 */}
      <div className="flex flex-col gap-3 px-6 pb-36">
        {COACHES.map((coach) => {
          const isSelected = coach.id === selectedId;
          return (
            <button
              key={coach.id}
              type="button"
              onClick={() => setSelectedId(coach.id)}
              style={{
                transition: "background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              }}
              className={`w-full rounded-[18px] border-2 p-4 text-left overflow-hidden ${
                isSelected
                  ? "border-[#1cb863] bg-[#edfaf3] shadow-[0_5px_0_#b8efd0]"
                  : "border-[#e8e8e8] bg-white shadow-[0_3px_0_#e0e0e0]"
              }`}
            >
              {/* 헤더 행: 아이콘 + 이름 + 체크 */}
              <div className="flex items-center gap-3">
                {/* 아이콘 */}
                <div
                  style={{ transition: "background-color 0.25s ease, box-shadow 0.25s ease" }}
                  className={`flex size-11 shrink-0 items-center justify-center rounded-[14px] text-xl ${
                    isSelected
                      ? "bg-[#1cb863] shadow-[0_3px_0_#159e51]"
                      : "bg-[#f0f0f0] shadow-[0_2px_0_#d8d8d8]"
                  }`}
                >
                  {coach.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    style={{ transition: "color 0.2s ease" }}
                    className={`text-[14px] font-black ${isSelected ? "text-[#0f2318]" : "text-[#2d2d2d]"}`}
                  >
                    {coach.name}
                  </p>
                  <p className="text-[11px] text-[#8abeaa]">{coach.tagline}</p>
                  {/* 태그 */}
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {coach.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{ transition: "background-color 0.2s ease, color 0.2s ease" }}
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isSelected ? "bg-[#d0f0dd] text-[#0d7a3e]" : "bg-[#f0f0f0] text-[#888888]"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 체크 아이콘 */}
                <div
                  style={{
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                    opacity: isSelected ? 1 : 0,
                    transform: isSelected ? "scale(1)" : "scale(0.5)",
                  }}
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#1cb863]"
                >
                  <span className="text-[13px] font-black text-white">✓</span>
                </div>
              </div>

              {/* 확장 영역: 선택 시 슬라이드다운 */}
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isSelected ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.3s ease",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <div className="pt-4 space-y-3">
                    {/* 설명 */}
                    <p className="text-[12.5px] leading-relaxed text-[#3d6b50]">{coach.desc}</p>

                    {/* 예시 인용구 */}
                    <div className="rounded-[12px] border-l-[3px] border-[#1cb863] bg-white px-3 py-3">
                      <p className="mb-1 text-[10px] font-bold text-[#8abeaa]">이런 식으로 분석해줘요</p>
                      <p className="text-[12px] leading-relaxed italic text-[#1a1a1a]">{coach.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-6 pb-8 pt-4 border-t border-[#f0f0f0]">
        <button
          type="button"
          onClick={() => router.push("/v2/coach/confirm")}
          style={{ transition: "box-shadow 0.15s ease, transform 0.15s ease" }}
          className="w-full rounded-[16px] bg-[#1cb863] px-5 py-4 text-[15px] font-black text-white shadow-[0_5px_0_#159e51] active:translate-y-1 active:shadow-[0_2px_0_#159e51]"
        >
          {selected.name}와 다음 →
        </button>
        <p className="mt-3 text-center text-[11px] text-[#aac9b5]">나중에 설정에서 언제든 코치를 변경할 수 있습니다.</p>
      </div>
    </div>
  );
}
