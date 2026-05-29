"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { getReportData } from "@/data/v2/mock";
import type { ReportDetail, PricePoint } from "@/data/v2/mock";

// ────── 주가 추이 인터랙티브 차트 ──────
type PeriodKey = "1W" | "1M" | "3M" | "1Y";

function PriceChart({ data, period }: { data: PricePoint[]; period: PeriodKey }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(timer);
  }, [period]);

  const prices = data.map((d) => d.price);
  const minP = Math.min(...prices) * 0.98;
  const maxP = Math.max(...prices) * 1.02;
  const range = maxP - minP;

  const w = 320;
  const h = 160;
  const pl = 42;
  const pb = 22;
  const chartW = w - pl;
  const chartH = h - pb;

  const isUp = prices[prices.length - 1] >= prices[0];
  const lineColor = isUp ? "#1cb863" : "#e84545";

  const points = data.map((d, i) => ({
    x: pl + (i / (data.length - 1)) * chartW,
    y: chartH - ((d.price - minP) / range) * chartH,
    price: d.price,
    label: d.date,
  }));

  const animated = points.map((pt) => ({
    ...pt,
    y: show ? pt.y : chartH,
  }));

  const pathD = animated.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = animated[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX} ${prev.y} ${cpX} ${pt.y} ${pt.x} ${pt.y}`;
  }, "");

  const fillD = `${pathD} L ${animated[animated.length - 1].x} ${chartH} L ${pl} ${chartH} Z`;

  const yTickCount = 4;
  const yTicks = Array.from({ length: yTickCount }, (_, i) => minP + (range / (yTickCount - 1)) * i);

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`priceFill-${period}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {yTicks.map((tick) => {
        const y = chartH - ((tick - minP) / range) * chartH;
        return (
          <g key={tick}>
            <line x1={pl} y1={y} x2={w} y2={y} stroke="#e8f0ec" strokeWidth="0.5" strokeDasharray="3,3" />
            <text x={pl - 4} y={y + 3} textAnchor="end" fontSize="7" className="fill-[#8abeaa]">
              ${tick.toFixed(0)}
            </text>
          </g>
        );
      })}
      {points.map((pt, i) => {
        if (data.length > 8 && i % 2 !== 0) return null;
        return (
          <text key={pt.label} x={pt.x} y={h - 3} textAnchor="middle" fontSize="6.5" className="fill-[#8abeaa]">
            {pt.label}
          </text>
        );
      })}
      <path d={fillD} fill={`url(#priceFill-${period})`} style={{ transition: "d 0.8s cubic-bezier(0.2,0.8,0.2,1)" }} />
      <path d={pathD} fill="none" stroke={lineColor} strokeWidth="2" strokeLinecap="round" style={{ transition: "d 0.8s cubic-bezier(0.2,0.8,0.2,1)" }} />
      {animated.map((pt) => (
        <circle key={pt.label} cx={pt.x} cy={pt.y} r="3" fill={lineColor} stroke="white" strokeWidth="1.5" style={{ transition: "cy 0.8s cubic-bezier(0.2,0.8,0.2,1)" }} />
      ))}
      {/* 현재가 라벨 */}
      {show && animated.length > 0 && (
        <g>
          <rect
            x={animated[animated.length - 1].x - 22}
            y={animated[animated.length - 1].y - 18}
            width="44" height="14" rx="4"
            fill={lineColor}
          />
          <text
            x={animated[animated.length - 1].x}
            y={animated[animated.length - 1].y - 8}
            textAnchor="middle" fontSize="7" className="fill-white font-bold"
          >
            ${animated[animated.length - 1].price.toFixed(1)}
          </text>
        </g>
      )}
    </svg>
  );
}

// ────── 레이더 차트 ──────
function RadarChart({ scores, animate }: { scores: { label: string; score: number }[]; animate: boolean }) {
  const cx = 90;
  const cy = 90;
  const maxR = 65;
  const levels = 4;
  const n = scores.length;
  const angleStep = (Math.PI * 2) / n;

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const gridPolygons = Array.from({ length: levels }, (_, lvl) => {
    const r = ((lvl + 1) / levels) * 100;
    return scores.map((_, i) => getPoint(i, r)).map((p) => `${p.x},${p.y}`).join(" ");
  });

  const dataPoints = scores.map((s, i) => getPoint(i, animate ? s.score : 0));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg width="100%" viewBox="0 0 180 180" className="overflow-visible">
      <defs>
        <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1cb863" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1cb863" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {gridPolygons.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="#e8f0ec" strokeWidth="0.5" />
      ))}
      {scores.map((_, i) => {
        const outer = getPoint(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="#e8f0ec" strokeWidth="0.5" />;
      })}
      <polygon
        points={dataPolygon}
        fill="url(#radarFill)"
        stroke="#1cb863"
        strokeWidth="2"
        className="transition-all duration-1000 ease-out"
      />
      {dataPoints.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="#1cb863" stroke="white" strokeWidth="1.5"
          className="transition-all duration-1000 ease-out" />
      ))}
      {scores.map((s, i) => {
        const labelPt = getPoint(i, 120);
        return (
          <text key={i} x={labelPt.x} y={labelPt.y} textAnchor="middle" dominantBaseline="central"
            fontSize="8" className="fill-[#0f2318] font-bold">
            {s.label}
          </text>
        );
      })}
    </svg>
  );
}

// ────── 도넛 차트 ──────
function DonutChart({ segments, animate }: { segments: { label: string; value: number; color: string }[]; animate: boolean }) {
  const cx = 60;
  const cy = 60;
  const r = 42;
  const strokeW = 16;
  const circumference = 2 * Math.PI * r;
  let cumulativeOffset = 0;

  return (
    <div className="flex items-center gap-4">
      <svg width="120" height="120" viewBox="0 0 120 120" className="shrink-0">
        {segments.map((seg) => {
          const segLen = (seg.value / 100) * circumference;
          const offset = circumference - segLen;
          const rotation = (cumulativeOffset / 100) * 360 - 90;
          cumulativeOffset += seg.value;
          return (
            <circle
              key={seg.label}
              cx={cx} cy={cy} r={r}
              fill="none" stroke={seg.color} strokeWidth={strokeW}
              strokeDasharray={`${animate ? segLen : 0} ${circumference}`}
              strokeLinecap="butt"
              transform={`rotate(${rotation} ${cx} ${cy})`}
              className="transition-all duration-1000 ease-out"
            />
          );
        })}
        <circle cx={cx} cy={cy} r={r - strokeW / 2 + 1} fill="white" />
      </svg>
      <div className="flex flex-col gap-1.5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-[10px] text-[#0f2318]">{seg.label}</span>
            <span className="text-[10px] font-black text-[#0f2318] ml-auto">{seg.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────── EPS 비교 바 차트 ──────
function EpsChart({ data, animate }: { data: { quarter: string; estimated: number; actual: number }[]; animate: boolean }) {
  const maxEps = Math.max(...data.flatMap((d) => [d.estimated, d.actual])) * 1.15;

  return (
    <div className="flex items-end gap-3 h-[110px]">
      {data.map((d) => {
        const estH = (d.estimated / maxEps) * 90;
        const actH = (d.actual / maxEps) * 90;
        const beat = d.actual >= d.estimated;
        return (
          <div key={d.quarter} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-end gap-[3px] h-[90px]">
              {/* 예상 */}
              <div className="w-[12px] rounded-t-[3px] bg-[#d8e8de] transition-all duration-700 ease-out"
                style={{ height: animate ? `${estH}px` : "0px" }} />
              {/* 실제 */}
              <div className={`w-[12px] rounded-t-[3px] transition-all duration-700 ease-out ${beat ? "bg-[#1cb863]" : "bg-[#e84545]"}`}
                style={{ height: animate ? `${actH}px` : "0px" }} />
            </div>
            <span className="text-[8px] text-[#8abeaa]">{d.quarter}</span>
          </div>
        );
      })}
    </div>
  );
}

// ────── 경쟁사 비교 ──────
function CompetitorChart({ competitors }: { competitors: { ticker: string; per: number; pbr: number; growth: number }[] }) {
  const maxGrowth = Math.max(...competitors.map((c) => Math.abs(c.growth)));

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-4 gap-1 text-[8px] font-bold text-[#8abeaa] px-1">
        <span>종목</span>
        <span className="text-center">P/E</span>
        <span className="text-center">P/B</span>
        <span className="text-right">성장률</span>
      </div>
      {competitors.map((c, i) => (
        <div key={c.ticker} className={`grid grid-cols-4 gap-1 items-center rounded-[8px] px-2 py-2 ${i === 0 ? "bg-[#edfaf3] border border-[#c0ecd0]" : "bg-[#f9fcfa]"}`}>
          <span className={`text-[10px] font-black ${i === 0 ? "text-[#1cb863]" : "text-[#0f2318]"}`}>{c.ticker}</span>
          <span className="text-[10px] text-[#0f2318] text-center">{c.per > 0 ? c.per.toFixed(1) : "N/A"}</span>
          <span className="text-[10px] text-[#0f2318] text-center">{c.pbr.toFixed(1)}</span>
          <div className="flex items-center justify-end gap-1">
            <div className="h-[4px] rounded-full overflow-hidden bg-[#e8f0ec]" style={{ width: "40px" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min((Math.abs(c.growth) / maxGrowth) * 100, 100)}%`,
                  backgroundColor: c.growth >= 0 ? "#1cb863" : "#e84545",
                }}
              />
            </div>
            <span className={`text-[9px] font-bold ${c.growth >= 0 ? "text-[#1cb863]" : "text-[#e84545]"}`}>
              {c.growth > 0 ? "+" : ""}{c.growth}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ────── 52주 레인지 바 ──────
function Range52W({ low, high, current }: { low: number; high: number; current: number }) {
  const pct = ((current - low) / (high - low)) * 100;
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-[9px] text-[#8abeaa] mb-1">
        <span>52주 최저 ${low.toFixed(0)}</span>
        <span>52주 최고 ${high.toFixed(0)}</span>
      </div>
      <div className="relative h-[6px] w-full rounded-full bg-gradient-to-r from-[#e84545]/20 via-[#e8f0ec] to-[#1cb863]/20">
        <div
          className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full border-2 border-white shadow-md bg-[#1cb863] transition-all duration-700"
          style={{ left: `${pct}%`, transform: `translate(-50%, -50%)` }}
        />
      </div>
    </div>
  );
}

// ────── 매출 성장 그래프 (기존 업그레이드) ──────
function RevenueChart({ data }: { data: { quarter: string; value: number }[] }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const values = data.map((d) => d.value);
  const maxV = Math.max(...values) * 1.1;
  const minV = Math.min(...values) * 0.85;
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

  const pathD = animatedPoints.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = animatedPoints[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX} ${prev.y} ${cpX} ${pt.y} ${pt.x} ${pt.y}`;
  }, "");

  const fillD = `${pathD} L ${animatedPoints[animatedPoints.length - 1].x} ${chartH} L ${paddingLeft} ${chartH} Z`;

  const yTickCount = 5;
  const yTicks = Array.from({ length: yTickCount }, (_, i) => minV + (range / (yTickCount - 1)) * i);

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id="chartFillV2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1cb863" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1cb863" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {yTicks.map((tick) => {
        const y = chartH - ((tick - minV) / range) * chartH;
        return (
          <g key={tick}>
            <line x1={paddingLeft} y1={y} x2={w} y2={y} stroke="#e8f0ec" strokeWidth="1" strokeDasharray="3,3" />
            <text x={paddingLeft - 4} y={y + 4} textAnchor="end" className="fill-[#8abeaa] text-[8px]" fontSize="8">
              {tick.toFixed(0)}B
            </text>
          </g>
        );
      })}
      {points.filter((_, i) => i % 2 === 0).map((pt) => (
        <text key={pt.quarter} x={pt.x} y={h - 2} textAnchor="middle" fontSize="7" className="fill-[#8abeaa]">
          {pt.quarter}
        </text>
      ))}
      <path d={fillD} fill="url(#chartFillV2)" style={{ transition: "d 1s cubic-bezier(0.2, 0.8, 0.2, 1)" }} />
      <path d={pathD} fill="none" stroke="#1cb863" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "d 1s cubic-bezier(0.2, 0.8, 0.2, 1)" }} />
      {animatedPoints.map((pt) => (
        <circle key={pt.quarter} cx={pt.x} cy={pt.y} r="3" fill="#1cb863" stroke="white" strokeWidth="1.5" style={{ transition: "cy 1s cubic-bezier(0.2, 0.8, 0.2, 1)" }} />
      ))}
    </svg>
  );
}

// ────── 투자 타임라인 ──────
function Timeline({ events }: { events: { date: string; label: string; type: string }[] }) {
  const typeConfig: Record<string, { color: string; icon: string }> = {
    earnings: { color: "#1cb863", icon: "📊" },
    product: { color: "#4a90d9", icon: "🚀" },
    regulation: { color: "#e8a020", icon: "⚖️" },
    dividend: { color: "#9b59b6", icon: "💰" },
  };

  return (
    <div className="relative pl-5">
      <div className="absolute left-[7px] top-1 bottom-1 w-[2px] rounded-full bg-[#e8f0ec]" />
      <div className="flex flex-col gap-3">
        {events.map((ev, i) => {
          const cfg = typeConfig[ev.type] ?? typeConfig.earnings;
          return (
            <div key={i} className="relative flex items-start gap-3">
              <div
                className="absolute left-[-13px] top-1.5 size-[10px] rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: cfg.color }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">{cfg.icon}</span>
                  <span className="text-[11px] font-black text-[#0f2318]">{ev.label}</span>
                </div>
                <span className="text-[9px] text-[#8abeaa]">{ev.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ────── BULL/BEAR 프로그레스 ──────
function BullBearGauge({ bullProb, bearProb }: { bullProb: number; bearProb: number }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative h-[8px] w-full rounded-full overflow-hidden bg-[#fdf0ec]">
      <div
        className="absolute left-0 top-0 h-full rounded-full bg-[#1cb863] transition-all duration-1000 ease-out"
        style={{ width: animate ? `${bullProb}%` : "0%" }}
      />
    </div>
  );
}

// ════════════════ 메인 페이지 ════════════════
export default function V2ReportPage() {
  const router = useRouter();
  const params = useParams();
  const ticker = (params?.ticker as string) ?? "AAPL";
  const report = useMemo(() => getReportData(ticker), [ticker]);

  const [pricePeriod, setPricePeriod] = useState<PeriodKey>("1M");
  const [animateAll, setAnimateAll] = useState(false);

  const targetScore = Math.round(report.scores.reduce((s, r) => s + r.score, 0) / report.scores.length);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setTotalScore(targetScore), 100);
    const t2 = setTimeout(() => setAnimateAll(true), 200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [targetScore]);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  const periods: PeriodKey[] = ["1W", "1M", "3M", "1Y"];

  return (
    <div className="flex min-h-dvh flex-col bg-[#f5faf7]">
      {/* 헤더 */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white px-5 py-4 shadow-sm">
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
            <circle cx="22" cy="22" r={radius} fill="none" stroke="#e8f5ee" strokeWidth="3.5" />
            <circle
              cx="22" cy="22" r={radius} fill="none" stroke="#1cb863" strokeWidth="3.5"
              strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="text-[13px] font-black text-[#1cb863]">{targetScore}</span>
        </div>
      </header>

      <div className="flex flex-col gap-4 px-5 py-5 pb-6">

        {/* ① 코치 한마디 */}
        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8]">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🚀</span>
              <span className="text-[11px] font-black text-[#1cb863]">테크투자 코치의 한마디</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-[#edfaf3] px-2 py-0.5 text-[9px] font-bold text-[#1cb863]">
                적중률 {report.coachAccuracy}%
              </span>
              <span className="rounded-full bg-[#f5f5f5] px-2 py-0.5 text-[9px] font-bold text-[#888]">
                {report.coachTotalCalls}건 분석
              </span>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-[#1a1a1a]">
            &quot;{report.coachComment}&quot;
          </p>
        </div>

        {/* ② 가격 정보 + 52주 레인지 */}
        <div className="rounded-[20px] bg-white px-5 py-4 shadow-[0_4px_0_#d0e8d8]">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[32px] font-black text-[#0f2318]">${report.price.toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[13px] font-bold ${report.changePercent >= 0 ? "text-[#1cb863]" : "text-[#e84545]"}`}>
                  {report.changePercent >= 0 ? "▲" : "▼"} {report.change} ({report.changePercent > 0 ? "+" : ""}{report.changePercent}%)
                </span>
                <span className="rounded-full bg-[#edfaf3] px-2.5 py-1 text-[11px] font-bold text-[#1cb863]">
                  상승 여력 +{(((report.targetPrice - report.price) / report.price) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[12px] text-[#8abeaa]">목표가</p>
              <p className="text-[14px] font-black text-[#0f2318]">${report.targetPrice.toFixed(2)}</p>
            </div>
          </div>
          <Range52W low={report.low52w} high={report.high52w} current={report.price} />
          <div className="mt-3 flex items-center justify-center gap-1 rounded-[8px] bg-[#f5faf7] py-1.5">
            <span className="text-[9px] text-[#8abeaa]">시가총액</span>
            <span className="text-[11px] font-black text-[#0f2318]">{report.marketCap}</span>
          </div>
        </div>

        {/* ③ 주가 추이 인터랙티브 차트 */}
        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13px] font-black text-[#0f2318]">📈 주가 추이</p>
            <div className="flex gap-1">
              {periods.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPricePeriod(p)}
                  className={`rounded-[8px] px-2.5 py-1 text-[10px] font-bold transition-all ${
                    p === pricePeriod
                      ? "bg-[#1cb863] text-white shadow-[0_2px_0_#159e51]"
                      : "bg-[#f0f5f2] text-[#8abeaa]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <PriceChart data={report.priceHistory[pricePeriod]} period={pricePeriod} />
        </div>

        {/* ④ 매출 성장 그래프 */}
        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8]">
          <p className="mb-4 text-[13px] font-black text-[#0f2318]">📊 매출 성장 추이 (단위: $B)</p>
          <RevenueChart data={report.quarterlyRevenue} />
        </div>

        {/* ⑤ 세부 평가 – 레이더 차트 + 바 */}
        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8]">
          <p className="mb-2 text-[13px] font-black text-[#0f2318]">🎯 종합 평가</p>
          <RadarChart scores={report.scores} animate={animateAll} />
          <div className="flex flex-col gap-3 mt-3">
            {report.scores.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-bold text-[#0f2318]">{item.label}</span>
                    <span className="text-[12px] font-black text-[#1cb863]">{item.score}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#e8f5ee]">
                    <div
                      className="h-2 rounded-full bg-[#1cb863] transition-all duration-1000 ease-out"
                      style={{ width: animateAll ? `${item.score}%` : "0%" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ⑥ EPS 비교 바 차트 */}
        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8]">
          <p className="mb-1 text-[13px] font-black text-[#0f2318]">💹 EPS 실적 vs 예상</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-[#d8e8de]" />
              <span className="text-[9px] text-[#8abeaa]">예상</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-[#1cb863]" />
              <span className="text-[9px] text-[#8abeaa]">실제 (서프라이즈)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-[#e84545]" />
              <span className="text-[9px] text-[#8abeaa]">실제 (미스)</span>
            </div>
          </div>
          <EpsChart data={report.epsData} animate={animateAll} />
        </div>

        {/* ⑦ 매출 구성비 도넛 차트 */}
        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8]">
          <p className="mb-4 text-[13px] font-black text-[#0f2318]">🍩 매출 구성비</p>
          <DonutChart segments={report.revenueBreakdown} animate={animateAll} />
        </div>

        {/* ⑧ 경쟁사 비교 */}
        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8]">
          <p className="mb-3 text-[13px] font-black text-[#0f2318]">⚔️ 경쟁사 비교</p>
          <CompetitorChart competitors={report.competitors} />
        </div>

        {/* ⑨ 투자 포인트 타임라인 */}
        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8]">
          <p className="mb-4 text-[13px] font-black text-[#0f2318]">📅 주요 이벤트 타임라인</p>
          <Timeline events={report.timeline} />
        </div>

        {/* ⑩ BULL / BEAR */}
        <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_0_#d0e8d8]">
          <p className="mb-3 text-[13px] font-black text-[#0f2318]">⚖️ BULL vs BEAR 분석</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black text-[#0d7a3e]">📈 BULL {report.bull.probability}%</span>
            <span className="text-[11px] font-black text-[#c0391b]">BEAR {report.bear.probability}% 📉</span>
          </div>
          <BullBearGauge bullProb={report.bull.probability} bearProb={report.bear.probability} />
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="rounded-[14px] bg-[#edfaf3] p-3.5">
              <div className="flex flex-col gap-2">
                {report.bull.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-[9px] mt-0.5 text-[#1cb863]">●</span>
                    <p className="text-[10.5px] leading-relaxed text-[#3d6b50]">{pt}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[14px] bg-[#fdf0ec] p-3.5">
              <div className="flex flex-col gap-2">
                {report.bear.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-[9px] mt-0.5 text-[#c0391b]">●</span>
                    <p className="text-[10.5px] leading-relaxed text-[#8a4a3a]">{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 투자 유의사항 */}
        <div className="mt-4 border-t border-[#e8f0ec] pt-6 pb-6 text-center">
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
