"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

// (중략) ...

// Y축 값이 있는 선형 그래프 컴포넌트
function RevenueChart() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 150);
    return () => clearTimeout(timer);
  }, []);
  const data = [
    { quarter: "Q1'23", value: 94.8 },
    { quarter: "Q2'23", value: 81.8 },
    { quarter: "Q3'23", value: 89.5 },
    { quarter: "Q4'23", value: 119.6 },
    { quarter: "Q1'24", value: 90.8 },
    { quarter: "Q2'24", value: 85.0 },
    { quarter: "Q3'24", value: 94.9 },
    { quarter: "Q4'24", value: 124.3 },
  ];

  const maxV = 130;
  const minV = 70;
  const range = maxV - minV;
  const w = 300;
  const h = 150;
  const paddingLeft = 36;
  const paddingBottom = 20;
  const chartW = w - paddingLeft;
  const chartH = h - paddingBottom;

  const points = data.map((d, i) => ({
    x: paddingLeft + (i / (data.length - 1)) * chartW,
    y: chartH - ((d.value - minV) / range) * chartH,
    value: d.value,
    quarter: d.quarter,
  }));

  const animatedPoints = points.map((pt) => ({
    ...pt,
    y: show ? pt.y : chartH,
  }));

  // Bezier curve path
  const pathD = animatedPoints.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = animatedPoints[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX} ${prev.y} ${cpX} ${pt.y} ${pt.x} ${pt.y}`;
  }, "");

  // Fill path (closed)
  const fillD = `${pathD} L ${animatedPoints[animatedPoints.length - 1].x} ${chartH} L ${paddingLeft} ${chartH} Z`;

  // Y축 눈금
  const yTicks = [70, 85, 100, 115, 130];

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id="chartFillV2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1cb863" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1cb863" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Y축 그리드 + 값 */}
      {yTicks.map((tick) => {
        const y = chartH - ((tick - minV) / range) * chartH;
        return (
          <g key={tick}>
            <line x1={paddingLeft} y1={y} x2={w} y2={y} stroke="#e8f0ec" strokeWidth="1" strokeDasharray="3,3" />
            <text x={paddingLeft - 4} y={y + 4} textAnchor="end" className="fill-[#8abeaa] text-[8px]" fontSize="8">
              {tick}B
            </text>
          </g>
        );
      })}

      {/* X축 레이블 */}
      {points
        .filter((_, i) => i % 2 === 0)
        .map((pt) => (
          <text key={pt.quarter} x={pt.x} y={h - 2} textAnchor="middle" fontSize="7" className="fill-[#8abeaa]">
            {pt.quarter}
          </text>
        ))}

      {/* 채우기, 선, 점 (실제 수치로 솟아오르는 트랜지션) */}
      <g>
        <path d={fillD} fill="url(#chartFillV2)" style={{ transition: "d 1s cubic-bezier(0.2, 0.8, 0.2, 1)" }} />
        <path d={pathD} fill="none" stroke="#1cb863" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "d 1s cubic-bezier(0.2, 0.8, 0.2, 1)" }} />
        {animatedPoints.map((pt) => (
          <circle 
            key={pt.quarter} 
            cx={pt.x} 
            cy={pt.y} 
            r="3" 
            fill="#1cb863" 
            stroke="white" 
            strokeWidth="1.5" 
            style={{ transition: "cy 1s cubic-bezier(0.2, 0.8, 0.2, 1)" }}
          />
        ))}
      </g>
    </svg>
  );
}

const SCORES = [
  { label: "재무 안정성", score: 81 },
  { label: "성장성", score: 92 },
  { label: "수익성", score: 89 },
  { label: "해자 (Moat)", score: 85 },
];

export default function V2ReportPage() {
  const router = useRouter();
  const params = useParams();
  const ticker = (params?.ticker as string) ?? "AAPL";

  const targetScore = Math.round(SCORES.reduce((s, r) => s + r.score, 0) / SCORES.length);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    // 마운트 후 애니메이션 시작
    const timer = setTimeout(() => {
      setTotalScore(targetScore);
    }, 100);
    return () => clearTimeout(timer);
  }, [targetScore]);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  return (
    <div className="flex min-h-dvh flex-col bg-[#f5faf7]">
      {/* 헤더 */}
      <header className="flex items-center justify-between bg-white px-5 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex size-8 items-center justify-center rounded-[10px] border-2 border-[#e8f0ec] bg-white text-[#0f2318] shadow-[0_2px_0_#d8ead0]"
          >
            ‹
          </button>
          <h1 className="text-[18px] font-black text-[#0f2318]">{ticker} 심층 리포트</h1>
        </div>
        
        {/* 원형 프로그레스 바 점수 표시 */}
        <div className="relative flex size-11 items-center justify-center">
          <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="#e8f5ee"
              strokeWidth="3.5"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="#1cb863"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="text-[13px] font-black text-[#1cb863]">{targetScore}</span>
        </div>
      </header>
      <div className="flex flex-col gap-4 px-5 py-5 pb-6">
        {/* 코치 한마디 */}
        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8]">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="text-sm">🚀</span>
            <span className="text-[11px] font-black text-[#1cb863]">테크투자 코치의 한마디</span>
          </div>
          <p className="text-[13px] leading-relaxed text-[#1a1a1a]">
            "애플의 기술력은 여전히 탑인데, 지금 주가에는 이미 반영돼 있어.{" "}
            <strong className="text-[#1cb863]">AI 관련 새 칩 발표</strong>가 핵심 변수야.
            발표 전까지는 관망하면서 저점 매수 기회를 노려보자."
          </p>
        </div>

        {/* 가격 정보 */}
        <div className="rounded-[20px] bg-white px-5 py-4 shadow-[0_4px_0_#d0e8d8]">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[32px] font-black text-[#0f2318]">$262.52</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[13px] font-bold text-[#1cb863]">▲ +1.24%</span>
                <span className="rounded-full bg-[#edfaf3] px-2.5 py-1 text-[11px] font-bold text-[#1cb863]">상승 여력 +10.6%</span>
              </div>
            </div>
            <p className="text-[12px] text-[#8abeaa]">목표가 $290.90</p>
          </div>
        </div>

        {/* 매출 성장 그래프 (Y축 값 추가) */}
        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8]">
          <p className="mb-4 text-[13px] font-black text-[#0f2318]">📊 매출 성장 추이 (단위: $B)</p>
          <RevenueChart />
        </div>

        {/* 세부 평가 */}
        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8]">
          <p className="mb-4 text-[13px] font-black text-[#0f2318]">세부 평가</p>
          <div className="flex flex-col gap-4">
            {SCORES.map((item) => (
              <button
                key={item.label}
                type="button"
                className="flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-bold text-[#0f2318]">{item.label}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[12px] font-black text-[#1cb863]">{item.score}</span>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#e8f5ee]">
                    <div
                      className="h-2 rounded-full bg-[#1cb863] transition-all duration-1000 ease-out"
                      style={{ width: totalScore > 0 ? `${item.score}%` : "0%" }}
                    />
                  </div>
                </div>
                <span className="text-[20px] text-[#8abeaa]">›</span>
              </button>
            ))}
          </div>
        </div>

        {/* BULL / BEAR */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[16px] bg-[#edfaf3] p-4 shadow-[0_3px_0_#b8efd0]">
            <p className="mb-2 text-[12px] font-black text-[#0d7a3e]">📈 BULL</p>
            <p className="text-[11px] leading-relaxed text-[#3d6b50]">
              생태계 확장 · 서비스 성장 · 글로벌 확장으로 지속 가능한 경쟁 우위 확보 중
            </p>
          </div>
          <div className="rounded-[16px] bg-[#fdf0ec] p-4 shadow-[0_3px_0_#f0c8b8]">
            <p className="mb-2 text-[12px] font-black text-[#c0391b]">📉 BEAR</p>
            <p className="text-[11px] leading-relaxed text-[#8a4a3a]">
              PEG 1.88 고평가 논란 · 높은 부채 수준 · iPhone 매출 의존도 리스크
            </p>
          </div>
        </div>
        
        {/* 투자 유의사항 (면책 조항) */}
        <div className="mt-8 border-t border-[#e8f0ec] pt-6 pb-6 text-center">
          <p className="text-[10.5px] leading-relaxed text-[#8abeaa]">
            본 리포트는 인공지능(AI) 분석에 기반한 참고용 자료이며, 주식 매수·매도 등의 투자 권유를 목적으로 하지 않습니다.<br />
            제공되는 정보의 정확성이나 수익을 보장하지 않으며, <br />
            모든 투자 결정과 그에 따른 결과에 대한 책임은 투자자 본인에게 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
