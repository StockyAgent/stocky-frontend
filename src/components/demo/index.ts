// ──────────────────────────────────────────────
// Demo Design System — 컴포넌트 인덱스
// 피그마 "준환 디자인" 기반 정확한 디자인 토큰
// ──────────────────────────────────────────────

/** 피그마에서 추출한 정확한 색상 토큰 */
export const DEMO_COLORS = {
  primary:       "#1cb863",  // 주 초록
  primaryDark:   "#0d7a3e",  // 어두운 초록
  primaryBorder: "#159e51",  // 버튼 하단 그림자
  bg:            "#e8fcf0",  // 연한 초록 배경
  bgBorder:      "#d0f5e0",  // 연한 배경 테두리
  cardBorder:    "#d8f0e2",  // 카드 테두리
  dark:          "#0f2318",  // 메인 텍스트
  sub:           "#3d6b50",  // 서브 텍스트 (진함)
  muted:         "#8abeaa",  // 서브 텍스트 (연함)
  positive:      "#ff4d4d",  // 상승
  negative:      "#3b82f6",  // 하락
  warning:       "#f59e0b",  // 경고
} as const;

// ── 레이아웃 ──────────────────────────────────
export { default as DemoNavBar }        from "./DemoNavBar";

// ── 온보딩 ────────────────────────────────────
export { default as DemoStepIndicator } from "./DemoStepIndicator";
export { default as DemoPrimaryButton } from "./DemoPrimaryButton";

// ── 대시보드 ──────────────────────────────────
export { default as DemoStreakBanner }  from "./DemoStreakBanner";
export { default as DemoHighlightCard } from "./DemoHighlightCard";
export { default as DemoBriefingCard }  from "./DemoBriefingCard";
export { default as DemoSectionTitle }  from "./DemoSectionTitle";

// ── 워치리스트 ────────────────────────────────
export { default as DemoWatchlistCard } from "./DemoWatchlistCard";
export { default as DemoPortfolioCard } from "./DemoPortfolioCard";

// ── 리포트 ────────────────────────────────────
export { default as DemoScoreBar }      from "./DemoScoreBar";
export { default as DemoLineChart }     from "./DemoLineChart";
