export const V2_STOCKS = [
  { ticker: "NVDA", name: "엔비디아", price: "$880.45", change: "+3.2%", isUp: true, category: "AI·반도체", logo: "NV" },
  { ticker: "AAPL", name: "애플", price: "$193.20", change: "-0.8%", isUp: false, category: "빅테크", logo: "AA" },
  { ticker: "TSLA", name: "테슬라", price: "$240.10", change: "+1.5%", isUp: true, category: "전기차", logo: "TS" },
  { ticker: "MSFT", name: "마이크로소프트", price: "$415.30", change: "+0.4%", isUp: true, category: "빅테크", logo: "MS" },
  { ticker: "GOOGL", name: "알파벳", price: "$175.20", change: "+0.9%", isUp: true, category: "빅테크", logo: "GO" },
  { ticker: "AMD", name: "AMD", price: "$165.50", change: "-1.2%", isUp: false, category: "AI·반도체", logo: "AM" },
  { ticker: "AMZN", name: "아마존", price: "$185.60", change: "+0.6%", isUp: true, category: "빅테크", logo: "AZ" },
  { ticker: "META", name: "메타", price: "$510.00", change: "+2.1%", isUp: true, category: "빅테크", logo: "ME" },
];

export const V2_WATCHLIST = [
  { ticker: "NVDA", name: "엔비디아", price: "$880.45", change: "+3.2%", isUp: true, badge: "매수 추천", badgeColor: "#1cb863", logo: "NV" },
  { ticker: "AAPL", name: "애플", price: "$193.20", change: "-0.8%", isUp: false, badge: "보유 유지", badgeColor: "#4a90d9", logo: "AA" },
  { ticker: "TSLA", name: "테슬라", price: "$240.10", change: "+1.5%", isUp: true, badge: "관망", badgeColor: "#e8a020", logo: "TS" },
];

export const V2_HOME_STOCKS = [
  { ticker: "NVDA", name: "엔비디아", change: "+3.2%", isUp: true, brief: "AI 수요 급증, 실적 서프라이즈...", score: 92, logo: "NV" },
  { ticker: "AAPL", name: "애플", change: "-0.8%", isUp: false, brief: "신제품 발표 앞두고 관망세...", score: 63, logo: "AA" },
  { ticker: "TSLA", name: "테슬라", change: "+1.5%", isUp: true, brief: "자율주행 FSD 업데이트 호재...", score: 71, logo: "TS" },
];

export const V2_NOTICES = [
  {
    id: "1",
    type: "이벤트",
    title: "추천 종목 적중률 90% 달성 기념! 프로 코치 무료 체험 이벤트 🎉",
    date: "2026.03.15",
    content: "안녕하세요, Stocky 팀입니다.\n\n저희 Stocky의 AI 투자 코치 추천 종목이 이번 주 적중률 90%를 돌파했습니다! 이를 기념하여 모든 회원분들께 유료 코치(매크로, 퀀트 등) 1주일 무료 체험권을 지급해드립니다.\n\n[이벤트 기간]\n2026년 3월 15일 ~ 3월 25일\n\n[참여 방법]\n마이페이지 > 쿠폰 및 혜택 메뉴에서 지급된 쿠폰 확인 및 사용\n\n많은 참여 부탁드립니다. 감사합니다.",
  },
  {
    id: "2",
    type: "업데이트",
    title: "Stocky v2.0 다크모드 및 코치 변경 프로세스 업데이트 안내 🚀",
    date: "2026.03.10",
    content: "안녕하세요, Stocky 팀입니다.\n\n회원분들이 더욱 편안하게 주식 리포트를 확인하실 수 있도록, 드디어 '다크모드' 기능이 정식으로 도입되었습니다! 마이페이지 우측 상단 해/달 모양 아이콘을 통해 원클릭으로 쉽게 테마를 변경하실 수 있습니다.\n\n또한, 기존에 코치 변경 시 온보딩 프로세스를 모두 거쳐야 했던 불편함을 개선하여, '마이페이지 > 투자 코치 변경' 메뉴에서 언제든 원하는 코치로 즉각 변경하고 돌아올 수 있도록 플로우를 최적화했습니다.\n\n앞으로도 더 나은 서비스 경험을 위해 노력하겠습니다.",
  },
  {
    id: "3",
    type: "안내",
    title: "새벽 시스템 점검에 따른 서비스 일시 중단 안내 🛠️",
    date: "2026.03.01",
    content: "안녕하세요, AI 주식 애널리스트 Stocky입니다.\n\n안정적인 데일리 리포트 발행을 위한 내부 데이터 파이프라인 및 백엔드 서버 인프라 업그레이드 작업이 진행될 예정입니다.\n\n[점검 일시]\n2026년 3월 3일 (화) 02:00 ~ 06:00 (약 4시간)\n\n[영향]\n해당 시간 동안은 어플리케이션 접속 및 브리핑 조회가 불가능합니다. (07:30 브리핑 발행은 정상적으로 진행됩니다.)\n\n이용에 불편을 드려 대단히 죄송하며, 빠르고 안전하게 점검을 마치겠습니다.",
  },
];

// ── 브리핑 카드용 확장 데이터 ──
export const V2_BRIEFING_DETAILS = [
  {
    id: 1,
    date: "오늘 · 07:30",
    content: "NVDA가 실적 서프라이즈를 냈어! AI 칩 수요가 예상보다 40% 높았는데, 이게 네 포트폴리오에 어떤 의미인지 같이 볼까?",
    isRead: false,
    ticker: "NVDA",
    coachName: "테크 트렌드 코치",
    coachEmoji: "🚀",
    tags: ["#실적발표", "#어닝서프라이즈", "#AI반도체"],
    impactScore: 94,
    sparkline: [820, 835, 842, 838, 855, 870, 880],
    keyMetrics: [
      { label: "시가총액", value: "$2.2T", change: "+3.2%" },
      { label: "P/E", value: "65.8", change: "-2.1" },
      { label: "거래량", value: "58.2M", change: "+142%" },
    ],
    relatedStocks: [
      { ticker: "NVDA", change: 3.2, isUp: true },
      { ticker: "AMD", change: 1.8, isUp: true },
      { ticker: "AVGO", change: 2.1, isUp: true },
      { ticker: "INTC", change: -0.4, isUp: false },
    ],
  },
  {
    id: 2,
    date: "어제 · 07:45",
    content: "FOMC 금리 동결! 연준의 매파적 발언에도 빅테크 주가는 선방 중. 핵심 포인트는 다음 분기 AI 서버 증설 계획이야.",
    isRead: true,
    ticker: "MSFT",
    coachName: "매크로 경제 코치",
    coachEmoji: "🌍",
    tags: ["#FOMC", "#금리동결", "#빅테크", "#서버증설"],
    impactScore: 78,
    sparkline: [408, 410, 405, 412, 409, 413, 415],
    keyMetrics: [
      { label: "시가총액", value: "$3.1T", change: "+0.4%" },
      { label: "P/E", value: "35.2", change: "+0.3" },
      { label: "거래량", value: "22.1M", change: "+18%" },
    ],
    relatedStocks: [
      { ticker: "MSFT", change: 0.4, isUp: true },
      { ticker: "GOOGL", change: 0.9, isUp: true },
      { ticker: "AAPL", change: -0.8, isUp: false },
      { ticker: "META", change: 2.1, isUp: true },
    ],
  },
  {
    id: 3,
    date: "3월 16일 · 08:00",
    content: "TSLA 중국 시장 점유율 하락에 주가 주춤. 하지만 새 FSD 버전 배포가 예정되어 있어 단기 반등 모멘텀은 존재해.",
    isRead: true,
    ticker: "TSLA",
    coachName: "테크 트렌드 코치",
    coachEmoji: "🚀",
    tags: ["#시장점유율", "#FSD", "#모멘텀", "#전기차", "#중국시장"],
    impactScore: 65,
    sparkline: [255, 248, 242, 238, 235, 237, 240],
    keyMetrics: [
      { label: "시가총액", value: "$765B", change: "+1.5%" },
      { label: "P/E", value: "58.3", change: "-1.8" },
      { label: "거래량", value: "102M", change: "+35%" },
    ],
    relatedStocks: [
      { ticker: "TSLA", change: 1.5, isUp: true },
      { ticker: "RIVN", change: -2.3, isUp: false },
      { ticker: "NIO", change: -1.1, isUp: false },
      { ticker: "BYD", change: 0.8, isUp: true },
    ],
  },
  {
    id: 4,
    date: "3월 15일 · 07:30",
    content: "AAPL이 드디어 생성형 AI 관련 로드맵을 발표했어. 아이폰 교체 사이클과 맞물리면 큰 파급력이 예상돼.",
    isRead: true,
    ticker: "AAPL",
    coachName: "테크 트렌드 코치",
    coachEmoji: "🚀",
    tags: ["#생성형AI", "#아이폰", "#교체사이클"],
    impactScore: 82,
    sparkline: [188, 190, 192, 191, 194, 195, 193],
    keyMetrics: [
      { label: "시가총액", value: "$2.98T", change: "-0.8%" },
      { label: "P/E", value: "29.1", change: "+0.5" },
      { label: "거래량", value: "48.5M", change: "+22%" },
    ],
    relatedStocks: [
      { ticker: "AAPL", change: -0.8, isUp: false },
      { ticker: "QCOM", change: 1.2, isUp: true },
      { ticker: "TSM", change: 0.6, isUp: true },
      { ticker: "MSFT", change: 0.4, isUp: true },
    ],
  },
];

// ── 종목 리포트용 상세 데이터 ──
export type PricePoint = { date: string; price: number };
export type EpsData = { quarter: string; estimated: number; actual: number };
export type RevenueSegment = { label: string; value: number; color: string };
export type CompetitorData = { ticker: string; per: number; pbr: number; growth: number };
export type TimelineEvent = { date: string; label: string; type: "earnings" | "product" | "regulation" | "dividend" };

export interface ReportDetail {
  ticker: string;
  name: string;
  price: number;
  change: string;
  changePercent: number;
  targetPrice: number;
  high52w: number;
  low52w: number;
  marketCap: string;
  coachComment: string;
  coachAccuracy: number;
  coachTotalCalls: number;

  // 세부 평가 스코어
  scores: { label: string; score: number }[];

  // 주가 히스토리
  priceHistory: {
    "1W": PricePoint[];
    "1M": PricePoint[];
    "3M": PricePoint[];
    "1Y": PricePoint[];
  };

  // 분기별 매출
  quarterlyRevenue: { quarter: string; value: number }[];

  // EPS 비교
  epsData: EpsData[];

  // 매출 구성비
  revenueBreakdown: RevenueSegment[];

  // 경쟁사 비교
  competitors: CompetitorData[];

  // 투자 타임라인
  timeline: TimelineEvent[];

  // BULL / BEAR
  bull: { probability: number; points: string[] };
  bear: { probability: number; points: string[] };
}

export const V2_REPORT_DATA: Record<string, ReportDetail> = {
  AAPL: {
    ticker: "AAPL",
    name: "애플",
    price: 193.20,
    change: "-$1.56",
    changePercent: -0.8,
    targetPrice: 220.00,
    high52w: 237.49,
    low52w: 164.08,
    marketCap: "$2.98T",
    coachComment: "애플의 기술력은 여전히 탑인데, 지금 주가에는 이미 반영돼 있어. AI 관련 새 칩 발표가 핵심 변수야. 발표 전까지는 관망하면서 저점 매수 기회를 노려보자.",
    coachAccuracy: 78,
    coachTotalCalls: 156,
    scores: [
      { label: "재무 안정성", score: 81 },
      { label: "성장성", score: 72 },
      { label: "수익성", score: 89 },
      { label: "해자 (Moat)", score: 95 },
    ],
    priceHistory: {
      "1W": [
        { date: "3/11", price: 188.2 }, { date: "3/12", price: 190.5 },
        { date: "3/13", price: 192.1 }, { date: "3/14", price: 191.3 },
        { date: "3/15", price: 194.8 }, { date: "3/16", price: 195.2 },
        { date: "3/17", price: 193.2 },
      ],
      "1M": [
        { date: "2/17", price: 182.3 }, { date: "2/21", price: 185.1 },
        { date: "2/25", price: 183.8 }, { date: "3/01", price: 187.5 },
        { date: "3/05", price: 186.2 }, { date: "3/09", price: 189.8 },
        { date: "3/13", price: 192.1 }, { date: "3/17", price: 193.2 },
      ],
      "3M": [
        { date: "12월", price: 175.2 }, { date: "1/1주", price: 178.9 },
        { date: "1/3주", price: 181.3 }, { date: "2/1주", price: 180.5 },
        { date: "2/3주", price: 185.1 }, { date: "3/1주", price: 187.5 },
        { date: "3/2주", price: 192.1 }, { date: "3/3주", price: 193.2 },
      ],
      "1Y": [
        { date: "4월", price: 164.08 }, { date: "6월", price: 185.3 },
        { date: "8월", price: 225.8 }, { date: "10월", price: 237.49 },
        { date: "12월", price: 192.5 }, { date: "2월", price: 185.1 },
        { date: "3월", price: 193.2 },
      ],
    },
    quarterlyRevenue: [
      { quarter: "Q1'23", value: 94.8 }, { quarter: "Q2'23", value: 81.8 },
      { quarter: "Q3'23", value: 89.5 }, { quarter: "Q4'23", value: 119.6 },
      { quarter: "Q1'24", value: 90.8 }, { quarter: "Q2'24", value: 85.0 },
      { quarter: "Q3'24", value: 94.9 }, { quarter: "Q4'24", value: 124.3 },
    ],
    epsData: [
      { quarter: "Q1'24", estimated: 1.50, actual: 1.53 },
      { quarter: "Q2'24", estimated: 1.35, actual: 1.40 },
      { quarter: "Q3'24", estimated: 1.45, actual: 1.46 },
      { quarter: "Q4'24", estimated: 2.10, actual: 2.18 },
    ],
    revenueBreakdown: [
      { label: "iPhone", value: 52, color: "#1cb863" },
      { label: "서비스", value: 22, color: "#4a90d9" },
      { label: "Mac", value: 10, color: "#e8a020" },
      { label: "iPad", value: 8, color: "#9b59b6" },
      { label: "웨어러블", value: 8, color: "#e84545" },
    ],
    competitors: [
      { ticker: "AAPL", per: 29.1, pbr: 45.2, growth: 5.2 },
      { ticker: "MSFT", per: 35.2, pbr: 12.8, growth: 15.8 },
      { ticker: "GOOGL", per: 24.5, pbr: 6.8, growth: 12.4 },
      { ticker: "SAMSUNG", per: 15.8, pbr: 1.2, growth: 3.1 },
    ],
    timeline: [
      { date: "4월 2주", label: "Q2 실적 발표", type: "earnings" },
      { date: "6월 1주", label: "WWDC 2026", type: "product" },
      { date: "5월 3주", label: "배당금 지급", type: "dividend" },
      { date: "9월 2주", label: "아이폰 18 발표", type: "product" },
    ],
    bull: {
      probability: 62,
      points: [
        "AI 칩 자체 설계로 생태계 경쟁력 극대화",
        "서비스 매출 비중 지속 증가 (영업이익률 70%↑)",
        "아이폰 16 → 18 교체사이클 진입 예상",
        "자사주 매입 프로그램 확대 ($110B 승인)",
      ],
    },
    bear: {
      probability: 38,
      points: [
        "중국 시장 규제 리스크 및 점유율 하락",
        "PER 29.1x → 성장률 대비 고평가 논란",
        "iPhone 매출 의존도 52% → 단일 제품 리스크",
        "AI 서비스 출시 지연 시 경쟁 열위 가능성",
      ],
    },
  },
  NVDA: {
    ticker: "NVDA",
    name: "엔비디아",
    price: 880.45,
    change: "+$27.30",
    changePercent: 3.2,
    targetPrice: 1050.00,
    high52w: 974.00,
    low52w: 393.00,
    marketCap: "$2.2T",
    coachComment: "엔비디아는 AI 수요의 절대 강자야! 이번 실적 서프라이즈로 Blackwell 아키텍처의 위력이 증명됐어. 단기 과열 우려가 있지만 장기적으로 AI 인프라 지출은 계속 늘어날 거야.",
    coachAccuracy: 85,
    coachTotalCalls: 203,
    scores: [
      { label: "재무 안정성", score: 78 },
      { label: "성장성", score: 98 },
      { label: "수익성", score: 95 },
      { label: "해자 (Moat)", score: 92 },
    ],
    priceHistory: {
      "1W": [
        { date: "3/11", price: 820.0 }, { date: "3/12", price: 835.2 },
        { date: "3/13", price: 842.5 }, { date: "3/14", price: 838.0 },
        { date: "3/15", price: 855.3 }, { date: "3/16", price: 870.1 },
        { date: "3/17", price: 880.5 },
      ],
      "1M": [
        { date: "2/17", price: 722.5 }, { date: "2/21", price: 745.8 },
        { date: "2/25", price: 768.2 }, { date: "3/01", price: 780.1 },
        { date: "3/05", price: 795.5 }, { date: "3/09", price: 810.3 },
        { date: "3/13", price: 842.5 }, { date: "3/17", price: 880.5 },
      ],
      "3M": [
        { date: "12월", price: 495.2 }, { date: "1/1주", price: 545.0 },
        { date: "1/3주", price: 610.2 }, { date: "2/1주", price: 680.5 },
        { date: "2/3주", price: 745.8 }, { date: "3/1주", price: 780.1 },
        { date: "3/2주", price: 842.5 }, { date: "3/3주", price: 880.5 },
      ],
      "1Y": [
        { date: "4월", price: 393.0 }, { date: "6월", price: 468.5 },
        { date: "8월", price: 520.3 }, { date: "10월", price: 580.0 },
        { date: "12월", price: 495.2 }, { date: "2월", price: 745.8 },
        { date: "3월", price: 880.5 },
      ],
    },
    quarterlyRevenue: [
      { quarter: "Q1'23", value: 7.2 }, { quarter: "Q2'23", value: 13.5 },
      { quarter: "Q3'23", value: 18.1 }, { quarter: "Q4'23", value: 22.1 },
      { quarter: "Q1'24", value: 26.0 }, { quarter: "Q2'24", value: 30.0 },
      { quarter: "Q3'24", value: 35.1 }, { quarter: "Q4'24", value: 39.3 },
    ],
    epsData: [
      { quarter: "Q1'24", estimated: 5.58, actual: 6.12 },
      { quarter: "Q2'24", estimated: 6.35, actual: 6.93 },
      { quarter: "Q3'24", estimated: 7.40, actual: 8.10 },
      { quarter: "Q4'24", estimated: 8.20, actual: 8.83 },
    ],
    revenueBreakdown: [
      { label: "데이터센터", value: 83, color: "#1cb863" },
      { label: "게이밍", value: 10, color: "#4a90d9" },
      { label: "프로 시각화", value: 4, color: "#e8a020" },
      { label: "자동차", value: 3, color: "#9b59b6" },
    ],
    competitors: [
      { ticker: "NVDA", per: 65.8, pbr: 52.3, growth: 122.0 },
      { ticker: "AMD", per: 45.2, pbr: 4.5, growth: 10.2 },
      { ticker: "INTC", per: 108.5, pbr: 1.5, growth: -15.8 },
      { ticker: "AVGO", per: 32.1, pbr: 10.8, growth: 44.0 },
    ],
    timeline: [
      { date: "4월 3주", label: "GTC 2026 키노트", type: "product" },
      { date: "5월 4주", label: "Q1'25 실적 발표", type: "earnings" },
      { date: "6월 1주", label: "Blackwell Ultra 출시", type: "product" },
      { date: "7월 2주", label: "AI 규제 청문회", type: "regulation" },
    ],
    bull: {
      probability: 74,
      points: [
        "AI 인프라 투자 사이클 초입 – TAM $300B 전망",
        "Blackwell 아키텍처 성능 4x 향상",
        "클라우드 3사 CapEx 전년비 +60% 증가",
        "CUDA 생태계 → 경쟁사 진입장벽 극대화",
      ],
    },
    bear: {
      probability: 26,
      points: [
        "PER 65.8x → 성장 둔화 시 급격한 밸류에이션 조정",
        "데이터센터 매출 비중 83% → 집중 리스크",
        "미-중 반도체 수출 규제 강화 우려",
      ],
    },
  },
  TSLA: {
    ticker: "TSLA",
    name: "테슬라",
    price: 240.10,
    change: "+$3.55",
    changePercent: 1.5,
    targetPrice: 290.00,
    high52w: 299.29,
    low52w: 138.80,
    marketCap: "$765B",
    coachComment: "테슬라는 지금 변곡점에 서 있어. 중국 시장 점유율은 빠졌지만 FSD V13 배포와 로보택시 발표가 임박해서, 성공하면 재평가 받을 수 있어. 하이리스크 하이리턴 포지션이야.",
    coachAccuracy: 72,
    coachTotalCalls: 189,
    scores: [
      { label: "재무 안정성", score: 68 },
      { label: "성장성", score: 85 },
      { label: "수익성", score: 62 },
      { label: "해자 (Moat)", score: 78 },
    ],
    priceHistory: {
      "1W": [
        { date: "3/11", price: 255.0 }, { date: "3/12", price: 248.3 },
        { date: "3/13", price: 242.1 }, { date: "3/14", price: 238.5 },
        { date: "3/15", price: 235.2 }, { date: "3/16", price: 237.8 },
        { date: "3/17", price: 240.1 },
      ],
      "1M": [
        { date: "2/17", price: 205.3 }, { date: "2/21", price: 218.1 },
        { date: "2/25", price: 232.5 }, { date: "3/01", price: 245.8 },
        { date: "3/05", price: 258.2 }, { date: "3/09", price: 262.1 },
        { date: "3/13", price: 242.1 }, { date: "3/17", price: 240.1 },
      ],
      "3M": [
        { date: "12월", price: 252.8 }, { date: "1/1주", price: 238.5 },
        { date: "1/3주", price: 210.2 }, { date: "2/1주", price: 195.3 },
        { date: "2/3주", price: 218.1 }, { date: "3/1주", price: 245.8 },
        { date: "3/2주", price: 242.1 }, { date: "3/3주", price: 240.1 },
      ],
      "1Y": [
        { date: "4월", price: 138.8 }, { date: "6월", price: 178.5 },
        { date: "8월", price: 215.3 }, { date: "10월", price: 260.5 },
        { date: "12월", price: 252.8 }, { date: "2월", price: 218.1 },
        { date: "3월", price: 240.1 },
      ],
    },
    quarterlyRevenue: [
      { quarter: "Q1'23", value: 23.3 }, { quarter: "Q2'23", value: 24.9 },
      { quarter: "Q3'23", value: 23.4 }, { quarter: "Q4'23", value: 25.2 },
      { quarter: "Q1'24", value: 21.3 }, { quarter: "Q2'24", value: 25.5 },
      { quarter: "Q3'24", value: 25.2 }, { quarter: "Q4'24", value: 25.7 },
    ],
    epsData: [
      { quarter: "Q1'24", estimated: 0.50, actual: 0.45 },
      { quarter: "Q2'24", estimated: 0.62, actual: 0.72 },
      { quarter: "Q3'24", estimated: 0.58, actual: 0.62 },
      { quarter: "Q4'24", estimated: 0.73, actual: 0.71 },
    ],
    revenueBreakdown: [
      { label: "자동차", value: 78, color: "#1cb863" },
      { label: "에너지", value: 11, color: "#4a90d9" },
      { label: "서비스", value: 8, color: "#e8a020" },
      { label: "기타", value: 3, color: "#9b59b6" },
    ],
    competitors: [
      { ticker: "TSLA", per: 58.3, pbr: 14.2, growth: 3.5 },
      { ticker: "BYD", per: 22.1, pbr: 4.8, growth: 45.2 },
      { ticker: "RIVN", per: -12.5, pbr: 3.2, growth: 167.0 },
      { ticker: "F", per: 11.8, pbr: 1.1, growth: 5.8 },
    ],
    timeline: [
      { date: "4월 1주", label: "Q1 인도량 발표", type: "earnings" },
      { date: "4월 3주", label: "Q1 실적 발표", type: "earnings" },
      { date: "6월 2주", label: "FSD V13 글로벌 배포", type: "product" },
      { date: "8월 1주", label: "로보택시 공개 이벤트", type: "product" },
    ],
    bull: {
      probability: 55,
      points: [
        "FSD V13 → 완전자율주행 상용화 임박",
        "에너지 사업부 매출 YoY +100% 고성장",
        "로보택시 사업 → TAM $5T 시장 기회",
        "원가 절감 지속 → 차량당 이익 개선 추세",
      ],
    },
    bear: {
      probability: 45,
      points: [
        "중국 BYD에 가격 경쟁력 밀림 (점유율 하락)",
        "자동차 영업이익률 18% → 16% 하락 추세",
        "PER 58.3x → 자동차 업종 대비 극단적 프리미엄",
        "CEO 리스크 및 브랜드 이미지 훼손 우려",
      ],
    },
  },
  MSFT: {
    ticker: "MSFT",
    name: "마이크로소프트",
    price: 415.30,
    change: "+$1.66",
    changePercent: 0.4,
    targetPrice: 480.00,
    high52w: 468.35,
    low52w: 362.90,
    marketCap: "$3.1T",
    coachComment: "마이크로소프트는 AI 상용화의 최대 수혜주야. Azure AI 매출이 분기마다 가속하고 있고, Copilot 매출도 드디어 실적에 잡히기 시작했어. 안정적인 성장 스토리야.",
    coachAccuracy: 82,
    coachTotalCalls: 178,
    scores: [
      { label: "재무 안정성", score: 92 },
      { label: "성장성", score: 88 },
      { label: "수익성", score: 91 },
      { label: "해자 (Moat)", score: 90 },
    ],
    priceHistory: {
      "1W": [
        { date: "3/11", price: 408.2 }, { date: "3/12", price: 410.5 },
        { date: "3/13", price: 405.3 }, { date: "3/14", price: 412.1 },
        { date: "3/15", price: 409.8 }, { date: "3/16", price: 413.5 },
        { date: "3/17", price: 415.3 },
      ],
      "1M": [
        { date: "2/17", price: 395.2 }, { date: "2/21", price: 398.5 },
        { date: "2/25", price: 402.1 }, { date: "3/01", price: 400.5 },
        { date: "3/05", price: 405.8 }, { date: "3/09", price: 408.2 },
        { date: "3/13", price: 405.3 }, { date: "3/17", price: 415.3 },
      ],
      "3M": [
        { date: "12월", price: 378.9 }, { date: "1/1주", price: 385.2 },
        { date: "1/3주", price: 390.1 }, { date: "2/1주", price: 395.8 },
        { date: "2/3주", price: 398.5 }, { date: "3/1주", price: 400.5 },
        { date: "3/2주", price: 405.3 }, { date: "3/3주", price: 415.3 },
      ],
      "1Y": [
        { date: "4월", price: 362.9 }, { date: "6월", price: 420.5 },
        { date: "8월", price: 450.2 }, { date: "10월", price: 468.4 },
        { date: "12월", price: 378.9 }, { date: "2월", price: 398.5 },
        { date: "3월", price: 415.3 },
      ],
    },
    quarterlyRevenue: [
      { quarter: "Q1'23", value: 52.9 }, { quarter: "Q2'23", value: 56.2 },
      { quarter: "Q3'23", value: 56.5 }, { quarter: "Q4'23", value: 62.0 },
      { quarter: "Q1'24", value: 61.9 }, { quarter: "Q2'24", value: 64.7 },
      { quarter: "Q3'24", value: 65.6 }, { quarter: "Q4'24", value: 69.6 },
    ],
    epsData: [
      { quarter: "Q1'24", estimated: 2.82, actual: 2.94 },
      { quarter: "Q2'24", estimated: 2.93, actual: 3.00 },
      { quarter: "Q3'24", estimated: 3.10, actual: 3.30 },
      { quarter: "Q4'24", estimated: 3.22, actual: 3.23 },
    ],
    revenueBreakdown: [
      { label: "클라우드", value: 43, color: "#1cb863" },
      { label: "오피스", value: 28, color: "#4a90d9" },
      { label: "Windows", value: 14, color: "#e8a020" },
      { label: "게이밍", value: 9, color: "#9b59b6" },
      { label: "링크드인", value: 6, color: "#e84545" },
    ],
    competitors: [
      { ticker: "MSFT", per: 35.2, pbr: 12.8, growth: 15.8 },
      { ticker: "GOOGL", per: 24.5, pbr: 6.8, growth: 12.4 },
      { ticker: "AMZN", per: 42.1, pbr: 8.2, growth: 12.0 },
      { ticker: "ORCL", per: 30.5, pbr: 25.1, growth: 8.5 },
    ],
    timeline: [
      { date: "4월 4주", label: "Q3 FY26 실적 발표", type: "earnings" },
      { date: "5월 2주", label: "MS Build 2026", type: "product" },
      { date: "6월 1주", label: "배당금 지급", type: "dividend" },
      { date: "9월 3주", label: "Copilot 2.0 발표", type: "product" },
    ],
    bull: {
      probability: 70,
      points: [
        "Azure AI 매출 YoY +75% 가속 성장",
        "Copilot 유료 구독자 급증 (매출 잡히기 시작)",
        "영업이익률 44% → 업계 최고 수준 수익성",
        "클라우드 시장 점유율 꾸준히 확대 중",
      ],
    },
    bear: {
      probability: 30,
      points: [
        "AI CapEx 급증 → 단기 FCF 압박",
        "OpenAI 투자 리스크 ($13B+ 투자)",
        "클라우드 경쟁 심화 (AWS, GCP)",
      ],
    },
  },
};

// 기본 폴백 데이터: 존재하지 않는 종목의 경우 AAPL 데이터 활용
export function getReportData(ticker: string): ReportDetail {
  return V2_REPORT_DATA[ticker] ?? { ...V2_REPORT_DATA.AAPL, ticker, name: ticker };
}
