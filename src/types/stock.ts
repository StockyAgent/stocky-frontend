// ─── Stock 관련 공유 타입 ─────────────────────────

/** 종목 기본 데이터 */
export interface StockData {
  ticker: string;
  name: string;
  marketCap: string;
  logoText: string;
  category: string;
  price?: string;
}

/** AI 추천 배지 종류 (Demo UI 기준) */
export type BadgeVariant = "buy" | "hold" | "watch";

/** 종목 목록 정렬 방식 */
export type SortType = "marketCap" | "name";

/** 투자 성향 */
export type PersonaType = "investor" | "trader";
