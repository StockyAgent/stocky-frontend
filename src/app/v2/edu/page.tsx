"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";

const BG = "#FAFAF7";
const SURFACE = "#FFFFFF";
const HERO = "#F2EFE8";
const ACCENT = "#FF6B3D";
const ACCENT_SOFT = "#FFE7DC";
const ACCENT_DEEP = "#C13E10";
const LINE = "#ECECE8";
const TEXT = "#0A0A0B";
const SUB = "#6B6B70";
// 한국 증권 관행: 빨강 상승 / 파랑 하락
const UP = "#E54848";
const DOWN = "#2B6FE6";

const SHADOW =
  "0 4px 16px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.03)";
const SHADOW_HERO =
  "0 8px 28px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)";

type Tab = "home" | "issue" | "stocks" | "my" | "settings";

type Tier = 1 | 2 | 3;
type Category = "general" | "sector" | "mine";

const CATEGORY_LABEL: Record<Category, string> = {
  general: "시장 전반",
  sector: "섹터",
  mine: "내 종목",
};

const FILTERS = ["general", "sector", "mine"] as const satisfies readonly Category[];
type Filter = Category;

const dailyCards: {
  id: number;
  keywords: string[];
  headline: string;
  coachLine: string;
  tier: Tier;
  category: Category;
  time: string;
}[] = [
  {
    id: 1,
    keywords: ["호르무즈", "이란", "유가"],
    headline: "이란 군부 호르무즈 봉쇄 시사",
    coachLine:
      "야 이거 봐봐. 호르무즈 해협이 막히면 전 세계 원유의 20%가 못 지나가. 항공주는 비명, 방산주는 환호. 과학으로 치면 도미노 첫 조각이 넘어진 거야.",
    tier: 3,
    category: "general",
    time: "19:30",
  },
  {
    id: 2,
    keywords: ["NVDA", "Blackwell", "AI"],
    headline: "엔비디아 Blackwell 양산 본격화",
    coachLine:
      "B200 양산이 2주 앞당겨졌대. 데이터센터 매출이 작년 대비 4배 — 이게 무슨 말이냐면 세상이 진짜 AI로 갈아엎히고 있다는 거.",
    tier: 2,
    category: "mine",
    time: "14:00",
  },
  {
    id: 3,
    keywords: ["연준", "금리", "동결"],
    headline: "연준 5회 연속 금리 동결",
    coachLine:
      "금리 안 내렸다는 건 인플레이션 아직 잡혔다고 안 본다는 뜻. 빅테크가 또 흔들릴 수 있어 — 빌릴 돈이 비싸다는 신호니까.",
    tier: 2,
    category: "general",
    time: "09:00",
  },
];

// ── 오늘의 학습 카드 목록 ──
const lessonCards: {
  issueId: number;
  headline: string;
  subtitle: string;
  emoji: string;
}[] = [
  {
    issueId: 1,
    headline: "이란 군부 호르무즈 봉쇄 시사",
    subtitle: "유가·항공·방산까지 도미노를 따라가 보자",
    emoji: "🛢️",
  },
  {
    issueId: 17,
    headline: "EU AI법 시행 — 빅테크 규제 시대 개막",
    subtitle: "규제가 주가를 어떻게 흔드는지 배워보자",
    emoji: "⚖️",
  },
  {
    issueId: 18,
    headline: "테슬라 FSD 로보택시 공식 출시",
    subtitle: "자율주행 시대, 승자와 패자를 분석해보자",
    emoji: "🚕",
  },
  {
    issueId: 19,
    headline: "글로벌 반도체 랠리 — HBM 공급망 병목",
    subtitle: "AI 가속기가 쏘아올린 공급망 사이클",
    emoji: "🖥️",
  },
  {
    issueId: 20,
    headline: "전기차 수요 캐즘과 가격 치킨게임",
    subtitle: "단가 인하 경쟁이 산업을 어떻게 재편하는지 추적해보자",
    emoji: "⚡",
  },
];

const watchlist = [
  { symbol: "AAPL", name: "애플", change: 1.24, price: "247.30" },
  { symbol: "NVDA", name: "엔비디아", change: -0.82, price: "898.42" },
  { symbol: "TSLA", name: "테슬라", change: 2.41, price: "412.66" },
  { symbol: "005930", name: "삼성전자", change: 0.93, price: "78,400" },
  { symbol: "MSFT", name: "마이크로소프트", change: 0.42, price: "415.30" },
  { symbol: "GOOGL", name: "알파벳", change: 1.08, price: "175.20" },
  { symbol: "AMZN", name: "아마존", change: -0.31, price: "185.60" },
  { symbol: "META", name: "메타", change: 2.14, price: "510.00" },
  { symbol: "000660", name: "SK하이닉스", change: 1.76, price: "182,500" },
  { symbol: "AVGO", name: "브로드컴", change: -1.22, price: "1,420.10" },
];

type Polarity = "positive" | "negative" | "neutral";

type IssueDetail = {
  body?: {
    kind?: "lead" | "paragraph" | "analogy" | "callout";
    title?: string;
    text: string;
  }[];
  ripple?: {
    summary: string;
    affected: {
      sym: string;
      name: string;
      polarity: Polarity;
      reason: string;
    }[];
  };
};

type GeneralTopic = "policy" | "geo" | "index";

type Issue = {
  id: number;
  tier: Tier;
  category: Category;
  symbol?: string;
  sector?: string;
  // category === "general" 일 때만 채워짐 — 섹터의 sector 필드와 동일한 역할
  topic?: GeneralTopic;
  title: string;
  time: string;
  // DB의 content 컬럼 — 카드에 보여줄 1~2문장 요약
  summary?: string;
  // DB의 sentiment 컬럼
  sentiment?: Polarity;
  // DB news_ids.length — 같은 이슈에 묶인 뉴스 개수
  newsCount?: number;
  keywords?: string[];
  coachLine?: string;
  symbols?: string[];
  detail?: IssueDetail;
};

// 섹터 헤더용 — 표시 순서대로 정의 (Object.keys 순회 시 그대로 유지됨)
const SECTOR_META: Record<string, { icon: string }> = {
  반도체: { icon: "💾" },
  전기차: { icon: "🔋" },
  에너지: { icon: "🛢️" },
};

// 시장 전반 토픽 헤더용 — 표시 순서 정의
const GENERAL_META: Record<GeneralTopic, { icon: string; label: string }> = {
  policy: { icon: "🏦", label: "통화·금리" },
  geo: { icon: "🌐", label: "지정학" },
  index: { icon: "📉", label: "지수·수급" },
};

const issueList: Issue[] = [
  // ===== 제너럴 — 매크로/지정학 =====
  {
    id: 1,
    tier: 3,
    category: "general",
    topic: "geo",
    title: "이란 군부 호르무즈 봉쇄 시사",
    time: "19:30",
    summary:
      "이란군이 호르무즈 해협 봉쇄를 시사하며 전 세계 원유 물동량의 20%가 위협받고 있습니다. 이로 인해 유가가 7% 급등했으며 항공·해운 섹터로 단기 충격이 확산되고 있습니다.",
    sentiment: "negative",
    newsCount: 12,
    keywords: ["호르무즈", "이란", "유가"],
    symbols: ["XOM", "DAL", "USO"],
    coachLine:
      "야 이거 봐봐. 호르무즈가 막히면 전 세계 원유의 20%가 못 지나가. 항공주는 비명, 정유주는 환호 — 도미노 첫 조각이 넘어진 거야.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "이란 혁명수비대 사령관이 호르무즈 해협 봉쇄 가능성을 시사했습니다. 미국이 추가 제재를 발표한 직후 나온 발언으로, 시장은 실제 봉쇄 가능성을 즉각 가격에 반영하기 시작했습니다.",
        },
        {
          kind: "analogy",
          title: "호르무즈 해협의 중요성",
          text: "전 세계 원유의 약 20%, 천연가스의 30%가 이 좁은 해협을 통과합니다. 단일 병목 구간이 차단되면 글로벌 에너지 공급망 전체가 마비되는 결과를 초래합니다.",
        },
        {
          kind: "paragraph",
          title: "이슈의 파급 구조",
          text: "1단계로 유가가 급등(+7%)하며, 2단계로 항공 및 해운 업종의 운송비용 증가와 정유주의 정제 마진 확대가 발생합니다. 3단계는 에너지 발 인플레이션 재점화로 인한 금리 인하 기대감 후퇴와 빅테크 기업들의 변동성 확대로 이어집니다.",
        },
        {
          kind: "callout",
          title: "단기적 영향과 대응",
          text: "단기적으로 유류비 비중이 높은 항공주(DAL, AAL)의 약세가 예상되며, 정유주(XOM, CVX)는 반사이익이 기대됩니다. 다만, 실제 봉쇄로 이어지지 않을 경우 유가가 빠르게 안정화될 수 있으므로 추격 매수는 지양해야 합니다.",
        },
      ],
      ripple: {
        summary: "한 사건이 어떻게 4단계로 번지는지",
        affected: [
          {
            sym: "USO",
            name: "원유 ETF",
            polarity: "positive",
            reason: "유가 직접 베팅 — 가장 즉각적인 수혜",
          },
          {
            sym: "XOM",
            name: "엑손모빌",
            polarity: "positive",
            reason: "정유 마진 확대, 배당주라 변동성 낮음",
          },
          {
            sym: "DAL",
            name: "델타항공",
            polarity: "negative",
            reason: "유류비 비중 25% — 마진 직격",
          },
          {
            sym: "QQQ",
            name: "나스닥",
            polarity: "negative",
            reason: "인플레 재점화 → 빅테크 멀티플 압박",
          },
          {
            sym: "CVX",
            name: "셰브론",
            polarity: "positive",
            reason: "엑손과 함께 정유 양강 — 마진 확대 수혜",
          },
          {
            sym: "AAL",
            name: "아메리칸항공",
            polarity: "negative",
            reason: "유류비 부담 + 장거리 노선 비중 높아 더 직격",
          },
          {
            sym: "GLD",
            name: "금 ETF",
            polarity: "positive",
            reason: "지정학 리스크 → 안전자산 선호 강화",
          },
        ],
      },
    },
  },
  {
    id: 2,
    tier: 2,
    category: "general",
    topic: "policy",
    title: "연준 5회 연속 금리 동결",
    time: "09:00",
    summary:
      "기준금리 5.50% 동결. 시장은 9월 인하를 기대했지만 파월은 \"데이터 더 보겠다\" — 빅테크 멀티플 압박 재현 가능.",
    sentiment: "negative",
    newsCount: 8,
    keywords: ["연준", "금리", "동결"],
    symbols: ["SPY", "QQQ", "TLT"],
    coachLine:
      "금리 안 내렸다는 건 인플레 아직 잡혔다고 안 본다는 뜻. 빅테크가 또 흔들릴 수 있어.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "연준이 5회 연속 기준금리 5.50%를 동결. 시장은 9월 첫 인하를 기대했지만, 파월은 \"데이터 더 보겠다\"는 신중한 톤을 유지했어.",
        },
        {
          kind: "analogy",
          title: "쉽게 말하면?",
          text: "돈에도 임대료가 있어 — 그게 금리야. 임대료가 안 내렸다는 건 \"아직 경제가 너무 뜨거우니 식혀야 한다\"고 본다는 뜻. 빌리기 비싼 상태가 더 이어져.",
        },
        {
          kind: "paragraph",
          title: "왜 빅테크가 흔들려?",
          text: "성장주는 미래 이익을 현재 가치로 할인하는데, 그 할인율이 금리야. 금리가 안 내려가면 그 미래 가치도 안 올라가. 반대로 채권은 매력이 유지돼.",
        },
      ],
      ripple: {
        summary: "직접 영향이 큰 자산만 짧게",
        affected: [
          {
            sym: "QQQ",
            name: "나스닥",
            polarity: "negative",
            reason: "인하 기대 후퇴 → 성장주 멀티플 압박",
          },
          {
            sym: "TLT",
            name: "장기채",
            polarity: "negative",
            reason: "장기 금리 ↑ → 채권 가격 ↓",
          },
        ],
      },
    },
  },
  {
    id: 3,
    tier: 1,
    category: "general",
    topic: "index",
    title: "코스피 3,210 마감, 외국인 순매도",
    time: "08:30",
    summary:
      "코스피 -0.4%, 외국인 5,800억 순매도. 환율 1,380원 돌파로 외인 자금 이탈 우려가 다시 고개 듦.",
    sentiment: "neutral",
    newsCount: 5,
    keywords: ["코스피", "외국인", "환율"],
    symbols: ["005930", "000660"],
    coachLine:
      "외국인이 사흘 연속 팔았어. 환율 1,380원대로 오르니 환차손 우려가 커진 듯.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "코스피가 3,210 마감(-0.4%). 외국인이 5,800억 원 순매도. 환율 1,380원 돌파로 외국인 자금 이탈 우려가 다시 부각됐어.",
        },
      ],
      ripple: {
        summary: "환율 흐름이 다음 1주 핵심 변수",
        affected: [
          {
            sym: "005930",
            name: "삼성전자",
            polarity: "neutral",
            reason: "외국인 비중 51% — 환율 민감",
          },
          {
            sym: "000660",
            name: "SK하이닉스",
            polarity: "neutral",
            reason: "외국인 비중 50% — 환율 민감",
          },
        ],
      },
    },
  },
  {
    id: 14,
    tier: 1,
    category: "general",
    topic: "policy",
    title: "한국은행 기준금리 3.50% 동결",
    time: "10:00",
    summary:
      "금통위 만장일치 동결. 한미 금리차(2.0%p) 유지·환율 방어가 핵심 — 연준 인하 시점까지 따라갈 가능성 큼.",
    sentiment: "neutral",
    newsCount: 6,
    keywords: ["한은", "기준금리", "동결"],
    coachLine:
      "한은이 또 동결. 미국 연준이 안 내리니 우리도 못 내려 — 환율 방어가 우선이야.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "한국은행 금융통화위원회가 기준금리 3.50%를 만장일치로 동결. 미국과의 금리차(2.0%p) 유지 + 환율 방어가 핵심 이유.",
        },
        {
          kind: "paragraph",
          title: "왜 못 내려?",
          text: "한국이 먼저 내리면 한미 금리차가 더 벌어져 외국인 자금이 빠지고 환율이 더 오를 수 있어. 연준 인하 시점까지는 따라갈 가능성 큼.",
        },
      ],
    },
  },
  {
    id: 15,
    tier: 2,
    category: "general",
    topic: "geo",
    title: "美, 對中 반도체 추가 관세 검토",
    time: "11:40",
    summary:
      "상무부가 AI 칩·HBM·EUV를 타깃으로 검토 중. 단기 글로벌 매출 감소 vs 한국·대만 반사이익 — 양면 변동성.",
    sentiment: "negative",
    newsCount: 9,
    keywords: ["관세", "미중", "반도체"],
    symbols: ["NVDA", "TSM", "005930"],
    coachLine:
      "미국이 중국향 반도체 관세를 더 올린대. 단기 충격 vs 한국·대만 반사이익 — 양면이야.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "미국 상무부가 중국향 첨단 반도체에 추가 관세를 검토 중. AI 칩·HBM·EUV 장비가 핵심 타깃으로 거론돼.",
        },
        {
          kind: "analogy",
          title: "관세가 어떻게 작용해?",
          text: "관세는 수입품에 매기는 세금. 중국이 미국 반도체를 사기 비싸지면 수요 자체가 줄거나, 한국·대만 같은 우회 공급선으로 옮겨가게 돼.",
        },
        {
          kind: "paragraph",
          title: "단기 충격 vs 장기 반사이익",
          text: "단기로는 글로벌 반도체 매출 일부 감소 우려. 장기로는 한국·대만 메모리·파운드리 반사이익 가능성. 정책 발표 직후 변동성이 가장 큼.",
        },
      ],
      ripple: {
        summary: "한국·대만 메모리·파운드리에 양면 영향",
        affected: [
          {
            sym: "NVDA",
            name: "엔비디아",
            polarity: "negative",
            reason: "중국 매출 비중 17% — 관세 시 가이던스 하향 우려",
          },
          {
            sym: "TSM",
            name: "TSMC",
            polarity: "neutral",
            reason: "미국향은 반사이익, 중국향은 타격 — 상쇄",
          },
        ],
      },
    },
  },
  {
    id: 16,
    tier: 1,
    category: "general",
    topic: "index",
    title: "코스닥 외국인 7거래일 연속 매수",
    time: "16:00",
    summary:
      "외국인이 코스닥에서 누적 8,400억 순매수. AI·바이오·이차전지 중소형주가 매수 상위 — 환율 안정도 배경.",
    sentiment: "positive",
    newsCount: 4,
    keywords: ["코스닥", "외국인", "매수"],
    coachLine:
      "외국인이 코스닥을 일주일 넘게 사들였어. 중소형 성장주에 다시 관심이 붙는 신호일 수 있어.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "코스닥 시장에서 외국인이 7거래일 연속 순매수. 누적 약 8,400억 원. AI·바이오·이차전지 중소형주가 매수 상위에 올라.",
        },
        {
          kind: "paragraph",
          title: "왜 코스닥으로?",
          text: "코스피 대형주가 박스권에 갇히면서 상대적으로 덜 오른 코스닥 성장주에 관심이 옮겨가는 흐름. 환율 안정도 매수 유입 배경.",
        },
      ],
    },
  },
  // ===== 섹터 =====
  {
    id: 4,
    tier: 2,
    category: "sector",
    sector: "반도체",
    title: "AI 반도체 수요 급증, HBM 품귀",
    time: "13:10",
    summary:
      "AI 데이터센터 수요로 HBM 공급이 막혔어. SK·삼성·마이크론 3사 체제, 2026년 물량까지 이미 매진된 상태.",
    sentiment: "positive",
    newsCount: 7,
    keywords: ["HBM", "AI반도체", "공급부족"],
    symbols: ["005930", "000660", "NVDA"],
    coachLine:
      "AI 칩 옆에 붙는 메모리(HBM)가 부족해. 만드는 회사가 전 세계에 3곳뿐 — 한국이 두 자리 잡고 있어.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "AI 데이터센터 수요 폭증으로 HBM(고대역폭 메모리) 공급이 따라가지 못하고 있어. SK하이닉스·삼성전자·마이크론 3사 체제인데 2026년 물량까지 이미 매진.",
        },
        {
          kind: "paragraph",
          title: "한국 메모리 3사 비중",
          text: "HBM3E 12단 기준 SK하이닉스 약 50%, 삼성전자 30% 점유. 가격은 일반 D램 대비 5~7배.",
        },
      ],
      ripple: {
        summary: "한국 메모리 양사 + NVIDIA가 직접 수혜",
        affected: [
          {
            sym: "000660",
            name: "SK하이닉스",
            polarity: "positive",
            reason: "HBM3E 1위, NVIDIA 단독 공급",
          },
          {
            sym: "005930",
            name: "삼성전자",
            polarity: "positive",
            reason: "HBM3E 12단 NVIDIA 퀄 통과",
          },
        ],
      },
    },
  },
  {
    id: 5,
    tier: 1,
    category: "sector",
    sector: "반도체",
    title: "TSMC 3나노 가동률 95% 돌파",
    time: "12:30",
    summary:
      "최첨단 공정이 사실상 풀가동. \"줄 서서 사가는\" 구간이라 단가 인상 협상력이 강해진 상황.",
    sentiment: "positive",
    newsCount: 3,
    keywords: ["TSMC", "3나노", "파운드리"],
    symbols: ["TSM", "AAPL", "NVDA"],
    coachLine:
      "TSMC 가장 최신 공정이 거의 풀가동. 만드는 게 모자라다는 뜻 — 단가 인상 여지가 생겨.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "TSMC 3나노 공정 가동률이 95%를 돌파. 사실상 풀가동 상태로, 단가 인상 협상력이 강해진 상황.",
        },
        {
          kind: "paragraph",
          title: "왜 가동률이 중요해?",
          text: "파운드리는 \"공장이 비어 있느냐 차 있느냐\"가 가격 결정력의 핵심. 가동률 95%면 \"줄 서서 사가야 하는 상태\" — 단가가 오를 수밖에 없어.",
        },
      ],
    },
  },
  {
    id: 6,
    tier: 1,
    category: "sector",
    sector: "전기차",
    title: "전기차 보조금 축소 검토",
    time: "10:45",
    summary:
      "환경부가 26년부터 단계적 축소 검토. 차종별 최대 100만원 ↓ — 신규 구매 둔화 가능성으로 단기 역풍.",
    sentiment: "negative",
    newsCount: 5,
    keywords: ["전기차", "보조금", "정책"],
    symbols: ["TSLA"],
    coachLine:
      "보조금 줄면 차값이 비싸져. 신규 구매 둔화 가능성 — 전기차 업체엔 단기 역풍.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "환경부가 전기차 국고보조금을 2026년부터 단계적으로 축소하는 방안을 검토 중. 차종별 최대 100만 원 줄어들 가능성이 거론돼.",
        },
        {
          kind: "paragraph",
          title: "왜 줄이려는 거야?",
          text: "전기차 보급 초기에는 마중물로 보조금이 컸는데, 이제 시장이 자생할 단계라는 판단. 다만 업계는 \"아직 가격 경쟁력 부족\"이라며 반발 중.",
        },
      ],
    },
  },
  {
    id: 7,
    tier: 2,
    category: "sector",
    sector: "전기차",
    title: "中 BYD, 美 시장 진출 보류",
    time: "09:50",
    summary:
      "100% 관세 장벽으로 BYD가 미국 진출을 26년 이후로 연기. 테슬라엔 점유율 방어 시간이 단기 호재.",
    sentiment: "positive",
    newsCount: 4,
    keywords: ["BYD", "중국", "관세"],
    symbols: ["TSLA"],
    coachLine:
      "중국 1위 BYD가 미국 진출을 미뤘어. 관세 100% 장벽 때문 — 테슬라 입장에선 단기 호재.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "BYD가 미국 시장 진출 시점을 2026년 이후로 연기. 트럼프 행정부의 100% 관세가 직격탄.",
        },
        {
          kind: "analogy",
          title: "쉽게 말하면?",
          text: "BYD가 만든 차를 미국에 팔려면 차값의 100%를 세금으로 내야 해. 1만 달러짜리 차가 2만 달러가 되는 거야 — 사실상 못 들어오게 막은 거.",
        },
        {
          kind: "paragraph",
          title: "테슬라엔 어떻게 작용해?",
          text: "BYD는 글로벌 EV 1위(2024년 판매대수 기준). 미국 진입이 늦춰지는 만큼 테슬라가 안방에서 점유율 방어 시간을 벌어. 다만 멕시코·캐나다 우회 가능성은 남아 있어.",
        },
      ],
      ripple: {
        summary: "테슬라 미국 시장 점유율 방어",
        affected: [
          {
            sym: "TSLA",
            name: "테슬라",
            polarity: "positive",
            reason: "최대 경쟁자 진입 지연 — 점유율 방어",
          },
          {
            sym: "F",
            name: "포드",
            polarity: "positive",
            reason: "미국 EV 라인업 부담 완화",
          },
        ],
      },
    },
  },
  {
    id: 8,
    tier: 2,
    category: "sector",
    sector: "에너지",
    title: "OPEC+ 증산 합의 무산",
    time: "16:20",
    summary:
      "사우디(증산) vs 러시아(동결) 입장 차로 결렬. 공급 부족 우려로 유가 +3% — 정유주 단기 호재.",
    sentiment: "positive",
    newsCount: 6,
    keywords: ["OPEC", "원유", "공급"],
    symbols: ["XOM", "USO"],
    coachLine:
      "산유국 모임에서 증산 합의가 깨졌어. 공급이 안 늘어나니 유가에 단기 호재.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "OPEC+ 회의에서 사우디·러시아 증산 합의가 결렬. 공급 부족 우려로 유가가 +3% 상승 마감.",
        },
        {
          kind: "analogy",
          title: "OPEC이 뭐길래?",
          text: "전 세계 산유국 23개국이 모인 카르텔. \"누가 얼마나 뽑을지\"를 같이 결정해서 유가를 조절해. 합의가 깨지면 결정이 미뤄지고 시장은 \"공급이 안 늘 것\"으로 해석.",
        },
        {
          kind: "paragraph",
          title: "왜 합의가 깨졌어?",
          text: "사우디는 \"점유율 지키기\"로 증산 주장, 러시아는 \"가격 방어\"로 동결 주장 — 입장 차가 좁혀지지 않음. 다음 회의(약 6주 후)까지 불확실성 이어져.",
        },
      ],
      ripple: {
        summary: "정유주에 단기 호재",
        affected: [
          {
            sym: "XOM",
            name: "엑손모빌",
            polarity: "positive",
            reason: "유가 상승 → 정유 마진 확대",
          },
          {
            sym: "USO",
            name: "원유 ETF",
            polarity: "positive",
            reason: "유가 직접 베팅",
          },
        ],
      },
    },
  },
  // ===== 내 종목 =====
  {
    id: 9,
    tier: 2,
    category: "mine",
    symbol: "NVDA",
    title: "Blackwell 양산 2주 앞당김",
    time: "14:00",
    summary:
      "TSMC CoWoS 수율이 빠르게 안정화되며 B200 양산이 2주 단축. 데이터센터 매출 가이던스 상향 가능성.",
    sentiment: "positive",
    newsCount: 8,
    keywords: ["Blackwell", "양산", "AI칩"],
    symbols: ["NVDA", "TSM"],
    coachLine:
      "B200 양산이 2주 앞당겨졌대. 데이터센터 매출이 작년 대비 4배 — 진짜 AI로 세상이 갈아엎히고 있다는 신호야.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "엔비디아의 차세대 AI 칩 Blackwell(B200) 양산이 당초 계획보다 2주 앞당겨졌어. TSMC의 CoWoS 패키징 수율이 예상보다 빠르게 안정화된 덕분.",
        },
        {
          kind: "analogy",
          title: "왜 2주가 큰 일이야?",
          text: "AI 칩 업계에선 2주 앞당기는 게 분기 매출 +5%로 이어져. 클라우드 빅3가 줄 서서 사가는데, 한 분기에 수십억 달러가 왔다 갔다 하니까.",
        },
      ],
      ripple: {
        summary: "AI 공급망 핵심 종목으로 즉시 번짐",
        affected: [
          {
            sym: "NVDA",
            name: "엔비디아",
            polarity: "positive",
            reason: "데이터센터 매출 가이던스 상향 가능성",
          },
          {
            sym: "TSM",
            name: "TSMC",
            polarity: "positive",
            reason: "CoWoS 가동률 상승 + 단가 인상 여지",
          },
        ],
      },
    },
  },
  {
    id: 10,
    tier: 2,
    category: "mine",
    symbol: "AAPL",
    title: "中 매출 -8%, 환율 영향",
    time: "11:20",
    summary:
      "위안 약세로 -4%p, 나머지는 화웨이 점유율 잠식. 중국이 전체 매출 18%라 다음 사이클 회복이 멀티플의 핵심.",
    sentiment: "negative",
    newsCount: 5,
    keywords: ["AAPL", "중국", "환율"],
    symbols: ["AAPL"],
    coachLine:
      "중국 매출이 8% 빠졌어. 환율 탓이 크지만 — 진짜 문제는 화웨이가 살아나서 점유율 까먹는 중이라는 거야.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "Apple의 분기 중국 매출이 전년 대비 -8%. 위안화 약세가 약 -4%p, 나머지는 화웨이 Mate 시리즈에 점유율을 뺏긴 영향이야.",
        },
        {
          kind: "paragraph",
          title: "장기 흐름이 더 걱정",
          text: "중국은 Apple 전체 매출의 약 18%. 이 시장에서 매 분기 점유율을 잃는다는 건 단순 환율로 설명이 안 돼. 다음 아이폰 사이클에서 회복 못 하면 멀티플 하향 압력.",
        },
      ],
      ripple: {
        summary: "Apple 단일 종목 이슈지만 공급망에 약한 파급",
        affected: [
          {
            sym: "AAPL",
            name: "애플",
            polarity: "negative",
            reason: "중국 매출 회복 시점이 멀티플의 핵심 변수",
          },
          {
            sym: "TSM",
            name: "TSMC",
            polarity: "negative",
            reason: "Apple A 시리즈 칩 수요 둔화 가능성",
          },
        ],
      },
    },
  },
  {
    id: 11,
    tier: 1,
    category: "mine",
    symbol: "AAPL",
    title: "비전프로 2세대 발표 시사",
    time: "10:00",
    summary:
      "WWDC 공개 가능성. 무게 30% 감소 + 가격 인하가 핵심 — 1세대의 부진을 뒤집을 보급형 라인 신호.",
    sentiment: "positive",
    newsCount: 3,
    keywords: ["VisionPro", "AR", "신제품"],
    symbols: ["AAPL"],
    coachLine:
      "AAPL이 비전프로 2세대를 곧 보여줄 거래. 1세대는 시장 반응 미적지근했는데, 이번에 가벼워지면 분위기 반전 가능.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "Apple이 WWDC에서 비전프로 2세대를 공개할 가능성이 거론돼. 1세대 대비 무게 30% 감소 + 가격 인하가 핵심 변경점으로 예상.",
        },
        {
          kind: "paragraph",
          title: "왜 중요해?",
          text: "1세대는 가격($3,499)과 무게 때문에 판매 부진. 2세대가 보급형 라인으로 나오면 \"이게 진짜 미래 디바이스 맞다\"는 분위기로 반전될 수 있어.",
        },
      ],
    },
  },
  {
    id: 12,
    tier: 2,
    category: "mine",
    symbol: "TSLA",
    title: "Cybertruck 인도량 사상 최대",
    time: "15:30",
    summary:
      "분기 인도량이 처음으로 21,000대 돌파. 양산 초기 병목이 풀리며 한 대당 마진 정상화 단계.",
    sentiment: "positive",
    newsCount: 6,
    keywords: ["Cybertruck", "TSLA", "인도량"],
    symbols: ["TSLA"],
    coachLine:
      "Cybertruck 분기 인도량이 처음으로 2만대를 넘었대. 양산 안정화 신호 — 마진 회복 기대.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "Cybertruck 분기 인도량이 21,000대로 사상 최대. 양산 초기 병목이 해결되며 마진이 정상화되는 단계.",
        },
        {
          kind: "analogy",
          title: "왜 \"양산 안정화\"가 호재야?",
          text: "처음 새 차 만들 때는 라인 잡는 데 돈이 많이 들어. 한 대당 손해 보면서 만드는 시기 — 인도량이 늘면 라인 비용이 분산되고 한 대당 마진이 살아나.",
        },
        {
          kind: "paragraph",
          title: "테슬라 분기 EPS 영향",
          text: "Cybertruck 마진이 +5%p 개선되면 분기 EPS도 약 +5% 상향 가능. 다만 모델3·Y 판매 둔화가 상쇄 요인.",
        },
      ],
      ripple: {
        summary: "테슬라 단일 종목 호재",
        affected: [
          {
            sym: "TSLA",
            name: "테슬라",
            polarity: "positive",
            reason: "Cybertruck 마진 정상화 — 분기 EPS 상향 가능",
          },
          {
            sym: "ALB",
            name: "앨버말",
            polarity: "positive",
            reason: "리튬 수요 회복 신호 — 가격 안정화 기대",
          },
        ],
      },
    },
  },
  {
    id: 13,
    tier: 2,
    category: "mine",
    symbol: "005930",
    title: "HBM3E 양산 시작",
    time: "12:00",
    summary:
      "NVIDIA 퀄 통과 후 첫 분기 — 일반 D램 대비 5~7배 비싼 HBM이 본격 매출 인식되는 출발점.",
    sentiment: "positive",
    newsCount: 7,
    keywords: ["HBM3E", "삼성전자", "AI메모리"],
    symbols: ["005930"],
    coachLine:
      "삼성전자가 HBM3E 12단 양산을 시작했어. NVIDIA 퀄 통과한 첫 분기 — 본격적인 AI 메모리 매출 인식 시작.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "삼성전자가 HBM3E 12단 양산을 본격 개시. NVIDIA 퀄 통과 후 첫 분기로, AI 메모리 매출이 본격 인식되는 출발점.",
        },
        {
          kind: "analogy",
          title: "\"퀄 통과\"가 뭐야?",
          text: "HBM은 NVIDIA의 AI 칩 옆에 붙는 핵심 부품. NVIDIA가 \"우리 칩에 써도 되겠다\"고 인증해주는 게 \"퀄(quality) 통과\". 그 전엔 아무리 만들어도 못 팔아.",
        },
        {
          kind: "paragraph",
          title: "왜 분기 매출에 큰 영향?",
          text: "HBM3E는 일반 D램 대비 5-7배 비싼 프리미엄 제품. 양산 본격화 = 메모리 평균 판매가(ASP) 자체가 올라감 → 영업이익률 개선 폭이 큼.",
        },
      ],
      ripple: {
        summary: "삼성전자 메모리 사업부 매출 견인",
        affected: [
          {
            sym: "005930",
            name: "삼성전자",
            polarity: "positive",
            reason: "HBM3E 매출 인식 — 메모리 ASP 상승",
          },
          {
            sym: "000660",
            name: "SK하이닉스",
            polarity: "neutral",
            reason: "HBM 1위 자리 경쟁 압박 — 단가 협상력 영향",
          },
        ],
      },
    },
  },
  // ===== 학습 전용 이슈 =====
  {
    id: 17,
    tier: 3,
    category: "general",
    topic: "policy",
    title: "EU AI법 시행 — 빅테크 규제 시대 개막",
    time: "16:00",
    summary:
      "EU AI법(AI Act)이 2026년 6월부터 전면 시행. 고위험 AI에 대한 투명성·설명 의무가 강화되며, 위반 시 매출의 최대 7%까지 과징금이 부과돼.",
    sentiment: "negative",
    newsCount: 15,
    keywords: ["EU", "AI법", "규제", "빅테크"],
    symbols: ["META", "GOOGL", "MSFT", "AAPL"],
    coachLine:
      "AI가 돈을 벌기 시작했는데, 유럽이 규제 울타리를 쳤어. 이게 비용 증가인지 진입장벽인지에 따라 해석이 완전히 달라져.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "EU AI법(AI Act)이 2026년 6월부터 본격 시행됩니다. 범용 AI 모델에 대한 투명성 보고 의무, 고위험 분야(의료·채용·금융) AI의 사전 심사 의무가 핵심이며, 위반 시 글로벌 매출의 최대 7%까지 과징금이 부과될 수 있습니다.",
        },
        {
          kind: "analogy",
          title: "규제의 파급 효과",
          text: "자동차가 처음 등장했을 때 신호등과 교통법규가 뒤따라온 것처럼, AI 산업에도 규칙이 제정되고 있습니다. 규칙을 선제적으로 준수한 기업은 신뢰를 얻지만, 늦은 기업은 막대한 과징금과 영업 제한의 위험에 직면하게 됩니다.",
        },
        {
          kind: "paragraph",
          title: "주요 영향 대상",
          text: "EU에서 AI 서비스를 제공하는 모든 회사가 규제 대상에 포함됩니다. 메타의 인스타그램 추천 알고리즘, 구글의 검색 AI, MS의 코파일럿 등이 해당되며, 이들은 모델 훈련 데이터 출처와 편향성 검증 결과를 매년 공개해야 합니다.",
        },
        {
          kind: "paragraph",
          title: "규제의 양면성",
          text: "규제 준수 비용이 연간 수십억 달러에 달해 중소 AI 스타트업에게는 감당하기 어렵지만, 이미 컴플라이언스 역량을 갖춘 빅테크에게는 오히려 새로운 진입장벽 역할을 하여 시장 지배력을 공고히 할 수 있습니다.",
        },
        {
          kind: "callout",
          title: "투자의 관점",
          text: "새로운 규제는 단기적으로 비용 증가 우려로 작용하지만, 중장기적으로는 규제를 버틸 수 있는 체력을 가진 기업과 그렇지 못한 기업을 나누는 필터 역할을 합니다. 규제를 단순한 악재가 아닌 옥석 가리기의 기준으로 바라보아야 합니다.",
        },
      ],
      ripple: {
        summary: "AI 규제가 빅테크 밸류에이션을 어떻게 재편하는지",
        affected: [
          {
            sym: "META",
            name: "메타",
            polarity: "negative",
            reason: "추천 알고리즘이 고위험 AI로 분류 — 투명성 비용 증가",
          },
          {
            sym: "GOOGL",
            name: "알파벳",
            polarity: "negative",
            reason: "검색·광고 AI 모두 규제 대상 — 데이터 사용 제약",
          },
          {
            sym: "MSFT",
            name: "마이크로소프트",
            polarity: "neutral",
            reason: "엔터프라이즈 컴플라이언스 역량으로 B2B 신뢰도 확보 가능",
          },
          {
            sym: "AAPL",
            name: "애플",
            polarity: "positive",
            reason: "온디바이스 AI 전략이 개인정보 규제에 유리 — 반사수혜",
          },
        ],
      },
    },
  },
  {
    id: 18,
    tier: 3,
    category: "sector",
    sector: "전기차",
    title: "테슬라 FSD 로보택시 공식 출시",
    time: "11:00",
    summary:
      "테슬라가 오스틴에서 완전 무인 로보택시 '사이버캡' 정식 서비스를 개시. 자율주행 소프트웨어 구독 모델로 전환하며 차량 판매 의존도를 낮추는 전략.",
    sentiment: "positive",
    newsCount: 22,
    keywords: ["테슬라", "FSD", "로보택시", "자율주행"],
    symbols: ["TSLA", "UBER", "GOOGL"],
    coachLine:
      "테슬라가 차를 파는 회사에서 킬로미터당 돈을 받는 플랫폼으로 변신하려 해. 우버·리프트가 긴장할 수밖에 없는 이유를 같이 뜯어보자.",
    detail: {
      body: [
        {
          kind: "lead",
          text: "테슬라가 텍사스 오스틴에서 완전 무인 로보택시 '사이버캡' 정식 서비스를 개시했습니다. 앱으로 호출하면 운전자 없이 목적지까지 이동하며, 제한된 지역에서 시작하여 연내 주요 도시로 확장이 예고되었습니다.",
        },
        {
          kind: "analogy",
          title: "비즈니스 모델의 전환",
          text: "지금까지 테슬라가 하드웨어(차량) 판매를 통해 일회성 수익을 창출했다면, 로보택시는 자율주행 소프트웨어를 기반으로 매 이동마다 반복 수익을 발생시킵니다. 이는 PC 판매에서 클라우드 구독 서비스로 진화하는 것과 유사합니다.",
        },
        {
          kind: "paragraph",
          title: "경쟁 구도와 규모의 경제",
          text: "구글의 웨이모가 특정 지역에서 상업 운행을 선점했지만 차량 규모는 제한적입니다. 반면 테슬라는 이미 판매된 수백만 대의 차량을 소프트웨어 업데이트로 로보택시 네트워크에 편입할 수 있어 압도적인 규모의 경제를 확보할 수 있습니다.",
        },
        {
          kind: "paragraph",
          title: "주목해야 할 핵심 지표",
          text: "수익성의 핵심은 '마일당 매출(Revenue per Mile)'입니다. 현재 공유 모빌리티 평균이 $2.50 수준인 반면, 테슬라는 운전자 인건비 절감을 통해 $1.00 이하로 운영이 가능하다고 주장합니다. 다만 자율주행 사고에 따른 책임 비용과 보험료가 변수로 작용할 수 있습니다.",
        },
        {
          kind: "callout",
          title: "투자의 관점",
          text: "기업의 수익 창출 방식(비즈니스 모델) 변화는 밸류에이션(기업가치 평가) 기준 자체를 뒤바꿀 수 있습니다. 테슬라를 단순한 자동차 제조사(낮은 PER)로 평가할지, 모빌리티 소프트웨어 플랫폼(높은 PER)으로 평가할지에 따라 적정 주가의 눈높이가 달라집니다.",
        },
      ],
      ripple: {
        summary: "자율주행 상용화가 모빌리티·보험 업계에 미치는 충격",
        affected: [
          {
            sym: "TSLA",
            name: "테슬라",
            polarity: "positive",
            reason: "하드웨어 → 서비스 전환 시 반복 수익(recurring revenue) 확보",
          },
          {
            sym: "UBER",
            name: "우버",
            polarity: "negative",
            reason: "드라이버 네트워크가 핵심 자산인데 무인 운행에 밀릴 위험",
          },
          {
            sym: "GOOGL",
            name: "알파벳(웨이모)",
            polarity: "positive",
            reason: "자율주행 시장 확대 → 웨이모 부문 가치 재평가",
          },
          {
            sym: "F",
            name: "포드",
            polarity: "negative",
            reason: "자율주행 기술 후발주자 — 전통 OEM 밸류에이션 압박",
          },
        ],
      },
    },
  },
  {
    id: 19,
    tier: 2,
    category: "general",
    topic: "policy",
    title: "글로벌 반도체 랠리 — HBM 공급망 병목",
    time: "10:30",
    summary:
      "AI 모델의 대형화로 엔비디아 GPU에 탑재되는 고대역폭메모리(HBM) 수요가 폭증하며 메모리 반도체 공급망 전체에 심각한 병목 현상이 발생하고 있습니다.",
    sentiment: "positive",
    newsCount: 45,
    keywords: ["HBM", "AI 반도체", "엔비디아", "공급망 병목"],
    symbols: ["NVDA", "005930"],
    detail: {
      body: [
        {
          kind: "lead",
          text: "생성형 AI 모델의 연산 속도를 끌어올리기 위해 HBM(고대역폭메모리) 수요가 급증하고 있습니다. 엔비디아가 요구하는 HBM 물량을 SK하이닉스 등 주요 메모리 제조사가 다 감당하지 못하면서, 반도체 공급망 전체가 타이트해지고 있습니다.",
        },
        {
          kind: "analogy",
          title: "병목 현상의 구조",
          text: "초고속으로 물건을 포장하는 공장(GPU)을 세웠는데, 재료를 실어나르는 도로(메모리 대역폭)가 좁아서 공장 전체 속도가 느려진 상황입니다. 그래서 엄청 넓은 도로(HBM)를 만들 수 있는 업체들의 몸값이 치솟는 것입니다.",
        },
        {
          kind: "paragraph",
          title: "주요 수혜 기업 및 파급",
          text: "가장 직접적인 수혜는 HBM 시장을 선점한 SK하이닉스와 마이크론입니다. 또한 HBM을 쌓을 때 필요한 첨단 패키징 장비를 독점 공급하는 한미반도체, TSMC 같은 밸류체인 소부장(소재/부품/장비) 기업들까지 실적 추정치가 상향되고 있습니다.",
        },
        {
          kind: "callout",
          title: "투자 포인트",
          text: "HBM의 공급이 수요를 맞추기 전까지는 가격 협상력이 제조사에게 있습니다. 하지만 삼성전자가 수율을 극복하고 본격적으로 진입하여 공급 과잉이 일어나는 시점을 면밀히 모니터링해야 합니다.",
        },
      ],
      ripple: {
        summary: "AI 반도체 공급망에 속한 밸류체인별 수혜",
        affected: [
          {
            sym: "NVDA",
            name: "엔비디아",
            polarity: "positive",
            reason: "AI 가속기 압도적 점유율 유지, 병목 해소 시 실적 폭발",
          },
          {
            sym: "005930",
            name: "삼성전자",
            polarity: "neutral",
            reason: "HBM3E 납품 테스트 결과에 따라 추격 여부 결정",
          },
        ],
      },
    },
  },
  {
    id: 20,
    tier: 3,
    category: "sector",
    sector: "전기차",
    title: "전기차 수요 캐즘과 가격 치킨게임",
    time: "14:00",
    summary:
      "얼리어답터 수요가 소진된 후 대중화 단계로 넘어가는 '캐즘(Chasm)'에 진입한 전기차 시장. 업계 선두인 테슬라가 시장 점유율 방어를 위해 전면적인 단가 인하를 주도하고 있습니다.",
    sentiment: "negative",
    newsCount: 38,
    keywords: ["전기차", "캐즘", "치킨게임", "배터리"],
    symbols: ["TSLA", "F"],
    detail: {
      body: [
        {
          kind: "lead",
          text: "전기차 시장이 고금리와 충전 인프라 부족 등으로 인해 성장세가 급격히 둔화되는 캐즘(Chasm) 영역에 돌입했습니다. 이에 테슬라를 필두로 한 주요 제조사들이 수익성을 포기하면서까지 대대적인 가격 인하 경쟁(치킨게임)을 벌이고 있습니다.",
        },
        {
          kind: "analogy",
          title: "캐즘과 가격 경쟁의 연관성",
          text: "스마트폰 초기 시절과 유사합니다. 신제품에 기꺼이 비용을 지불하던 마니아들의 구매가 끝나자, 남은 대중 소비자들을 확보하기 위해 마진을 포기하고 박리다매 경쟁에 들어간 것입니다. 원가 경쟁력이 없는 기업은 이 구간에서 도태됩니다.",
        },
        {
          kind: "paragraph",
          title: "배터리 밸류체인 연쇄 효과",
          text: "완성차의 가격 인하는 배터리 제조사와 양극재 소재 기업에 대한 단가 인하 압박으로 직결됩니다. 게다가 전방 수요가 줄어들며 공장 가동률마저 하락해 배터리 밸류체인 전체가 실적 둔화의 혹한기를 겪고 있습니다.",
        },
        {
          kind: "callout",
          title: "판단 포인트",
          text: "치킨게임의 승자는 결국 '원가 경쟁력을 갖춘 1등 기업'입니다. 이 사이클이 끝난 후 살아남은 기업은 과점 시장의 혜택을 독점하게 됩니다. 기업의 현금 창출력과 부채 비율 건전성을 우선적으로 확인해야 합니다.",
        },
      ],
      ripple: {
        summary: "전기차 수요 둔화가 완성차 및 소재단에 미치는 연쇄 작용",
        affected: [
          {
            sym: "TSLA",
            name: "테슬라",
            polarity: "neutral",
            reason: "수익성은 악화되나, 시장 장악 및 구조조정 주도",
          },
          {
            sym: "F",
            name: "포드",
            polarity: "negative",
            reason: "가격 경쟁력 한계로 전동화 투자 계획 축소 및 지연",
          },
        ],
      },
    },
  },
];

type AxisChart =
  | {
      kind: "line";
      data: number[];
      labels: string[];
      avg?: number;
      unit?: string;
    }
  | {
      kind: "bar";
      data: number[];
      labels: string[];
      unit?: string;
    };

type ScoreAxis = {
  key: string;
  score: number;
  oneLine: string;
  // 모든 종목·관점에 데이터가 있진 않음. 있는 경우만 차트 영역 렌더
  chart?: AxisChart;
  indicators: { name: string; value: string; note?: string }[];
  // 지금 상황을 1~2문장으로 — 어떤 점에서 안정/성장/저평가인지
  desc: string;
  learning: string;
};

// ═══════ 차트용 Mock 데이터 ═══════
type EduPeriodKey = "1W" | "1M" | "3M" | "1Y";
const EDU_PERIODS: EduPeriodKey[] = ["1W", "1M", "3M", "1Y"];

const EDU_PRICE_HISTORY: Record<EduPeriodKey, { date: string; price: number }[]> = {
  "1W": [
    { date: "월", price: 250.2 }, { date: "화", price: 252.5 }, { date: "수", price: 254.1 },
    { date: "목", price: 253.3 }, { date: "금", price: 256.8 }, { date: "토", price: 257.2 }, { date: "일", price: 257.5 },
  ],
  "1M": [
    { date: "2/17", price: 242.3 }, { date: "2/24", price: 245.1 }, { date: "3/3", price: 243.8 },
    { date: "3/10", price: 247.5 }, { date: "3/17", price: 250.2 }, { date: "3/24", price: 253.8 },
    { date: "3/31", price: 255.1 }, { date: "4/7", price: 257.5 },
  ],
  "3M": [
    { date: "1월", price: 228.2 }, { date: "1/3주", price: 232.9 }, { date: "2/1주", price: 238.3 },
    { date: "2/3주", price: 242.5 }, { date: "3/1주", price: 245.1 }, { date: "3/3주", price: 250.2 },
    { date: "4/1주", price: 255.1 }, { date: "4/2주", price: 257.5 },
  ],
  "1Y": [
    { date: "5월", price: 189.8 }, { date: "7월", price: 215.3 }, { date: "9월", price: 235.8 },
    { date: "11월", price: 248.5 }, { date: "1월", price: 228.2 }, { date: "3월", price: 245.1 },
    { date: "4월", price: 257.5 },
  ],
};

const EDU_EPS_DATA = [
  { quarter: "Q1'24", estimated: 1.50, actual: 1.53 },
  { quarter: "Q2'24", estimated: 1.35, actual: 1.40 },
  { quarter: "Q3'24", estimated: 1.45, actual: 1.46 },
  { quarter: "Q4'24", estimated: 2.10, actual: 2.18 },
];

const EDU_REVENUE_BREAKDOWN = [
  { label: "iPhone", value: 52, color: ACCENT },
  { label: "서비스", value: 22, color: "#4A90D9" },
  { label: "Mac", value: 10, color: "#E5A820" },
  { label: "iPad", value: 8, color: "#9B59B6" },
  { label: "웨어러블", value: 8, color: UP },
];

type KGStep = {
  label: string;
  sublabel?: string;
  desc: string;
  relation?: string;
  polarity?: Polarity;
};

type StockKGFlow = {
  title: string;
  scenario: string;
  steps: KGStep[];
  learningPoint: string;
};

type StockKGNode = {
  sym: string;
  name: string;
  polarity: Polarity;
  relation: string;
  reason: string;
  learningPoint?: string;
};

type StockKGNetworkData = {
  title: string;
  scenario: string;
  nodes: StockKGNode[];
};

type EduStockDetail = {
  symbol: string;
  name: string;
  price: string;
  change: number;
  low52w: number;
  high52w: number;
  buyReasons: { icon: string; title: string; desc: string }[];
  sellReasons: { icon: string; title: string; desc: string }[];
  scoreDetails: ScoreAxis[];
  priceHistory: Record<EduPeriodKey, { date: string; price: number }[]>;
  epsData: { quarter: string; estimated: number; actual: number }[];
  revenueBreakdown: { label: string; value: number; color: string }[];
  kgFlows?: StockKGFlow[];
  kgNetwork?: StockKGNetworkData;
};

const stockDetailsMap: Record<string, EduStockDetail> = {
  AAPL: {
    symbol: "AAPL",
    name: "애플",
    price: "257.46",
    change: 1.24,
    low52w: 164.08,
    high52w: 260.10,
    buyReasons: [
      {
        icon: "💪",
        title: "현금 창출력 강함",
        desc: "1년에 100조 넘게 쌓는 회사 — 빚 갚고도 사업 굴릴 여유가 차고 넘쳐.",
      },
      {
        icon: "💰",
        title: "배당금 매년 늘려줌",
        desc: "10년째 한 번도 안 빼먹고 늘림. 주주한테 돈 돌려주는 회사라는 신호.",
      },
      {
        icon: "🛡",
        title: "한 번 쓰면 못 떠나는 락인",
        desc: "아이폰 → 에어팟 → 워치 → 맥. 다른 회사 갈아타려면 다 버려야 함.",
      },
    ],
    sellReasons: [
      {
        icon: "🌏",
        title: "중국 의존도 너무 높음",
        desc: "전체 매출 18%가 중국. 미·중 사이 안 좋아질 때마다 흔들려.",
      },
      {
        icon: "🐢",
        title: "AI 출발이 좀 늦음",
        desc: "구글·MS는 이미 한참 달리는데 애플은 이제야 시작. 따라가는 입장.",
      },
    ],
    scoreDetails: [
      {
        key: "재무안정",
        score: 85,
        oneLine: "빚은 많아도 현금 만드는 속도가 더 빨라",
        indicators: [
          { name: "부채비율 D/E", value: "3.87", note: "낮을수록 안정" },
          { name: "영업현금흐름", value: "$111.5B", note: "5년 연속 100B+" },
          { name: "유동비율", value: "0.89", note: "1.0이 안전선" },
        ],
        desc: "비율(D/E 3.87)은 업계 평균 대비 높은 수준입니다. 그러나 연간 $111B의 영업현금흐름이 이를 충분히 상쇄하며, 채무 상환 능력이 부채 증가 속도를 상회하는 구조입니다.",
        learning:
          "비율(D/E)은 단독으로 재무 건전성을 판단하기 어렵습니다. 영업현금흐름을 병행 분석하면 실질적인 부채 감당 능력을 확인할 수 있습니다.",
      },
      {
        key: "성장성",
        score: 78,
        oneLine: "꾸준히 크는 중인데 폭발적이진 않아",
        chart: {
          kind: "bar",
          data: [365.8, 394.3, 383.3, 391.0, 416.2],
          labels: ["'21", "'22", "'23", "'24", "'25"],
          unit: "B",
        },
        indicators: [
          { name: "5년 성장", value: "+13.8%", note: "연평균 3.3%" },
          { name: "최근 1년", value: "+6.4%", note: "재가속 신호" },
          { name: "서비스 매출", value: "$85B", note: "+14% YoY" },
        ],
        desc: "5년간 매출이 $365B → $416B로 꾸준히 늘었어. 폭발적이진 않지만 흔들림 적고, 최근 1년은 +6.4%로 다시 가속 중이야.",
        learning:
          "성장성은 '얼마나 빠르게 큰지'. 어디서(제품·지역) 자라는지 쪼개 봐야 지속 가능한지 보여.",
      },
      {
        key: "수익성",
        score: 92,
        oneLine: "100원 팔면 27원이 그대로 이익 — 압도적",
        chart: {
          kind: "line",
          data: [29.8, 30.3, 29.8, 31.5, 32.0],
          labels: ["'21", "'22", "'23", "'24", "'25"],
          unit: "%",
        },
        indicators: [
          { name: "영업이익률", value: "32%", note: "업계 평균 12%" },
          { name: "순이익률", value: "27%" },
          { name: "ROE", value: "151%", note: "자본 효율 최상위" },
        ],
        desc: "100원 팔면 27원이 그대로 이익으로 남아. 제조업 평균(10~15%)의 2배 이상이고, 자본 효율(ROE 151%)은 빅테크 중에서도 최상위 수준이야.",
        learning:
          "수익성은 '버는 효율'. 매출이 커도 이익이 안 남으면 의미 없어. 영업이익률·ROE만 봐도 충분.",
      },
      {
        key: "해자",
        score: 85,
        oneLine: "한 번 들어오면 못 빠져나가는 생태계",
        indicators: [
          { name: "재구매 의향", value: "92%", note: "락인 효과" },
          { name: "ASP 격차", value: "3.0x", note: "vs 안드로이드" },
          { name: "구독자", value: "10억명", note: "서비스 매출 $85B" },
        ],
        desc: "한 번 들어오면 못 떠나는 락인이 핵심. 아이폰 → 워치 → 에어팟 → 맥으로 묶이면 다른 브랜드 가려고 다 버려야 하니까 재구매율이 92%까지 나와.",
        learning:
          "해자(Moat)는 '경쟁사가 못 따라오는 구조적 우위'. 브랜드·전환비용·네트워크 효과로 나눠 봐.",
      },
      {
        key: "저평가",
        score: 68,
        oneLine: "비싸진 않은데 싸지도 않아",
        chart: {
          kind: "line",
          data: [22.4, 25.1, 28.3, 30.6, 33.8],
          labels: ["'21", "'22", "'23", "'24", "'25"],
          avg: 25,
          unit: "x",
        },
        indicators: [
          { name: "P/E", value: "33.8x", note: "5년 평균 25x" },
          { name: "PEG", value: "1.84", note: "1.0 미만이면 매력" },
          { name: "상승여력", value: "+13%", note: "목표가 $290.90" },
        ],
        desc: "회사가 좋긴 한데 그 좋음이 이미 가격에 반영된 상태야. 5년 평균(25배)보다 35% 비싼 편. 단, 애널리스트 목표가 기준 +13% 상승 여력은 남아 있어.",
        learning:
          "PER 하나만 보면 함정 — PEG(성장 대비)까지 같이 봐야 진짜 싼 건지 보여.",
      },
    ],
    priceHistory: EDU_PRICE_HISTORY,
    epsData: EDU_EPS_DATA,
    revenueBreakdown: EDU_REVENUE_BREAKDOWN,
    kgFlows: [
      {
        title: "AI 기기 수요가 공급망에 미치는 흐름",
        scenario: "Apple Intelligence 탐재 신제품이 출시될 때, 수요 증가가 어떤 경로로 공급망 전체로 전파되는지 분석합니다.",
        steps: [
          {
            label: "애플 AI 기기 수요 증가",
            sublabel: "AAPL",
            desc: "Apple Intelligence 탐재 신제품 출시로 아이폰·맹 교체 수요 발생",
            relation: "파운드리 주문 급증",
            polarity: "positive" as const,
          },
          {
            label: "TSMC 최첨단 공정 수요 집중",
            sublabel: "TSM",
            desc: "3nm·2nm 공정 가동률 상승, 단가 협상력 강화 및 공급 병목 발생",
            relation: "고성능 메모리 동반 수요 증가",
            polarity: "positive" as const,
          },
          {
            label: "SK하이닉스 메모리 수혜",
            sublabel: "000660",
            desc: "AI 기기용 LPDDR5X 고성능 메모리 주문 증가로 ASP 상승",
            relation: "반도체 섹터 전반 업황 개선",
            polarity: "positive" as const,
          },
          {
            label: "반도체 공급망 동반 강세",
            sublabel: "SOXX · 섬터 ETF",
            desc: "한국·대만 반도체 공급망 기업 실적 개선, 주가 동반 상승 경향",
            polarity: "positive" as const,
          },
        ],
        learningPoint: "대형 제품 사이클은 직접 제조사뿐 아니라 부품·소재 공급망 전체로 영향이 전파됩니다. 공급망 지도를 파악하면 간접 수혜 종목을 조기에 발굴할 수 있습니다.",
      },
      {
        title: "중국 매쳙 리스크의 파급 경로",
        scenario: "미중 관계 악화로 중국 내 애플 점유율이 하락할 때 어떤 기업들이 연쇄적으로 영향을 받는지 분석합니다.",
        steps: [
          {
            label: "미중 갈등 심화",
            sublabel: "지정학",
            desc: "미국의 대중 제재 강화 또는 중국 정부의 애플 견제 정책 시행",
            relation: "중국 시장 점유율 하락",
            polarity: "negative" as const,
          },
          {
            label: "애플 중국 매쳙 감소",
            sublabel: "AAPL",
            desc: "전체 매쳙의 약 18%인 중국 매쳙이 화웨이·BYD 대체재로 이탈",
            relation: "EMS 위탁 생산 주문 감소",
            polarity: "negative" as const,
          },
          {
            label: "폭스콘 수주 물량 감소",
            sublabel: "HON HAI",
            desc: "아이폰 위탁생산 물량 감소로 대만·인도 공장 가동률 하락",
            relation: "한국 부품사 연쇄 영향",
            polarity: "negative" as const,
          },
          {
            label: "한국 부품주 수주 감소",
            sublabel: "삼성전기·LG이노텐",
            desc: "카메라 모듈·MLCC 등 애플향 부품 주문 감소 가능성",
            polarity: "negative" as const,
          },
        ],
        learningPoint: "글로벌 대형주 투자 시에는 지역별 매쳙 의존도를 파악해야 합니다. 지정학 리스크는 해당 기업뿐 아니라 공급망 전체로 영향이 번질 수 있습니다.",
      },
    ],
  },
  NVDA: {
    symbol: "NVDA",
    name: "엔비디아",
    price: "898.42",
    change: -0.82,
    low52w: 474.00,
    high52w: 974.00,
    buyReasons: [
      {
        icon: "🧠",
        title: "AI 칩 시장 독점",
        desc: "AI 가속기 시장 점유율 90% 이상 확보 — CUDA 생태계 지배력.",
      },
      {
        icon: "🚀",
        title: "매출 성장폭 압도적",
        desc: "매 분기 매출 YoY 200%+ 성장 중인 엄청난 속도.",
      },
      {
        icon: "🖥️",
        title: "차세대 블랙웰 기대감",
        desc: "새로운 아키텍처 도입으로 연산 효율 극대화 및 단가 상승.",
      },
    ],
    sellReasons: [
      {
        icon: "📈",
        title: "밸류에이션 부담",
        desc: "주가가 급격히 상승하여 미래 기대감이 매우 크게 반영됨.",
      },
      {
        icon: "🧩",
        title: "공급망 병목 현상",
        desc: "TSMC 파운드리 캐파 부족 시 칩 인도 지연 리스크.",
      },
      {
        icon: "👥",
        title: "빅테크 자체 칩 개발",
        desc: "구글, 아마존, MS 등 주요 고객사들의 자체 AI 칩 설계 시작.",
      },
    ],
    scoreDetails: [
      {
        key: "재무안정",
        score: 90,
        oneLine: "현금이 넘쳐서 부채를 전부 갚고도 남아",
        indicators: [
          { name: "부채비율 D/E", value: "0.17", note: "낮을수록 안정" },
          { name: "영업현금흐름", value: "$28.0B", note: "급격한 상승 추세" },
          { name: "유동비율", value: "3.50", note: "1.0이 안전선" },
        ],
        desc: "AI 칩 판매 급증으로 영업현금흐름이 $28.0B으로 크게 증가했으며, 부채비율(D/E 0.17)과 유동비율(3.50)은 업계 최상위 수준의 재무 건전성을 나타냅니다.",
        learning: "영업현금흐름이 급증하는 시기에는 부채 상환 여력과 추가 투자 여력이 동시에 확대됩니다.",
      },
      {
        key: "성장성",
        score: 98,
        oneLine: "빅테크 역사상 전무후무한 속도로 성장 중",
        chart: {
          kind: "bar",
          data: [26.9, 44.9, 60.9, 96.3, 120.0],
          labels: ["'21", "'22", "'23", "'24", "'25"],
          unit: "B",
        },
        indicators: [
          { name: "최근 1년", value: "+262%", note: "데이터센터 성장 주도" },
          { name: "데이터센터 매출", value: "$22.6B", note: "YoY 400%+" },
          { name: "5년 성장", value: "+65.4%", note: "연평균" },
        ],
        desc: "데이터센터 AI 가속기 매출이 YoY 400%+ 성장하며 전체 실적을 주도하고 있습니다. 이는 일시적 유행이 아닌 AI 인프라 투자 사이클의 구조적 수혜를 반영합니다.",
        learning: "성장성이 지속되는 기간에는 높은 밸류에이션(P/E)도 부분적으로 정당화될 수 있습니다. 성장 꺾임 신호가 핵심 모니터링 지표입니다.",
      },
      {
        key: "수익성",
        score: 95,
        oneLine: "반도체를 파는데 영업이익률이 50%가 넘어",
        chart: {
          kind: "line",
          data: [32.0, 35.5, 40.2, 54.1, 57.0],
          labels: ["'21", "'22", "'23", "'24", "'25"],
          unit: "%",
        },
        indicators: [
          { name: "영업이익률", value: "57%", note: "업계 평균 12%" },
          { name: "순이익률", value: "49%" },
          { name: "ROE", value: "115%", note: "자본 효율 최상위" },
        ],
        desc: "하드웨어 제조 기업임에도 불구하고 소프트웨어 기업 수준인 영업이익률 57%를 기록 중입니다. AI 가속기 시장에서의 독점적 가격 결정력이 이와 같은 마진 구조를 가능하게 합니다.",
        learning: "독점적 시장 지위를 체하는 기업는 가격 결정권 행사를 통해 경쟁사 대비 압도적인 수익성을 지속할 수 있습니다.",
      },
      {
        key: "해자",
        score: 94,
        oneLine: "칩만 잘 만드는 게 아니라 CUDA 소프트웨어로 묶어둠",
        indicators: [
          { name: "개발자 수", value: "450만명", note: "CUDA 플랫폼 기준" },
          { name: "시장 점유율", value: "92%", note: "AI 가속기 독점" },
          { name: "특허 수", value: "7,500+", note: "반도체 및 소프트웨어" },
        ],
        desc: "450만 명의 AI 개발자가 CUDA 플랫폼에 기반해 모델을 구축하고 있습니다. AMD 등 경쟁사 칩으로 전환 시 기존 코드베이스를 전면 재작성해야 하는 구조적 락인이 형성되어 있습니다.",
        learning: "소프트웨어 생태계 기반의 락인(Lock-in)은 하드웨어 성능 격차보다 진입 장벽 효과가 더 강력하고 지속적입니다.",
      },
      {
        key: "저평가",
        score: 55,
        oneLine: "미래 성장성을 당겨 써서 밸류에이션이 높은 편",
        chart: {
          kind: "line",
          data: [40.5, 55.2, 65.1, 75.4, 78.2],
          labels: ["'21", "'22", "'23", "'24", "'25"],
          avg: 45,
          unit: "x",
        },
        indicators: [
          { name: "P/E", value: "78.2x", note: "5년 평균 45x" },
          { name: "PEG", value: "1.12", note: "1.0 미만이면 매력" },
          { name: "상승여력", value: "+8%", note: "목표가 $970.00" },
        ],
        desc: "P/E 78.2x는 5년 평균(45x) 대비 높은 수준이나, 이익 성장률 대비 밸류에이션 지표인 PEG는 1.12로 비교적 합리적인 범위에 있습니다. 향후 성장률 둔화 여부가 핵심 리스크입니다.",
        learning: "P/E가 높더라도 이익 성장률이 그 수준을 뒷받침한다면(낮은 PEG) 과도한 프리미엄으로 단정하기 어렵습니다.",
      },
    ],
    priceHistory: {
      "1W": [
        { date: "월", price: 890.2 }, { date: "화", price: 892.5 }, { date: "수", price: 898.4 },
        { date: "목", price: 895.3 }, { date: "금", price: 896.8 }, { date: "토", price: 897.2 }, { date: "일", price: 898.42 },
      ],
      "1M": [
        { date: "2/17", price: 780.3 }, { date: "2/24", price: 800.1 }, { date: "3/3", price: 820.8 },
        { date: "3/10", price: 850.5 }, { date: "3/17", price: 870.2 }, { date: "3/24", price: 885.8 },
        { date: "3/31", price: 892.1 }, { date: "4/7", price: 898.42 },
      ],
      "3M": [
        { date: "1월", price: 620.2 }, { date: "1/3주", price: 680.9 }, { date: "2/1주", price: 730.3 },
        { date: "2/3주", price: 780.5 }, { date: "3/1주", price: 820.1 }, { date: "3/3주", price: 850.2 },
        { date: "4/1주", price: 880.1 }, { date: "4/2주", price: 898.42 },
      ],
      "1Y": [
        { date: "5월", price: 380.8 }, { date: "7월", price: 460.3 }, { date: "9월", price: 485.8 },
        { date: "11월", price: 540.5 }, { date: "1월", price: 620.2 }, { date: "3월", price: 850.1 },
        { date: "4월", price: 898.42 },
      ],
    },
    epsData: [
      { quarter: "Q1'24", estimated: 3.80, actual: 4.15 },
      { quarter: "Q2'24", estimated: 4.50, actual: 5.16 },
      { quarter: "Q3'24", estimated: 5.20, actual: 6.12 },
      { quarter: "Q4'24", estimated: 5.80, actual: 6.25 },
    ],
    revenueBreakdown: [
      { label: "데이터센터", value: 85, color: ACCENT },
      { label: "게이밍", value: 11, color: "#4A90D9" },
      { label: "프로 비주얼", value: 2, color: "#E5A820" },
      { label: "오토모티브", value: 1, color: "#9B59B6" },
      { label: "OEM/기타", value: 1, color: UP },
    ],
    kgNetwork: {
      title: "AI 칩 공급망 및 생태계 파급효과",
      scenario: "엔비디아의 독점적인 AI 인프라 장악력이 글로벌 공급망 및 경쟁사들에 미치는 영향을 지식 그래프로 확인합니다.",
      nodes: [
        {
          sym: "TSM",
          name: "TSMC",
          polarity: "positive",
          relation: "파운드리 파트너",
          reason: "엔비디아의 모든 최첨단 AI 칩(H100, B200 등)과 CoWoS 패키징을 독점 위탁 생산하며 막대한 수혜를 입고 있습니다.",
          learningPoint: "칩 설계사가 팹리스 구조일 때, 칩 수요 폭발은 파운드리 독점 기업의 병목 현상과 높은 마진으로 직결됩니다.",
        },
        {
          sym: "000660",
          name: "SK하이닉스",
          polarity: "positive",
          relation: "HBM 메모리 공급",
          reason: "AI 가속기 구동에 필수적인 고대역폭 메모리(HBM3/HBM3E)를 엔비디아에 사실상 독점 공급하며 실적이 급증했습니다.",
          learningPoint: "단순 부품사라도 고객사의 핵심 병목을 해소할 기술력(HBM)을 갖추면 구조적 갑의 위치를 점할 수 있습니다.",
        },
        {
          sym: "MSFT",
          name: "Microsoft",
          polarity: "positive",
          relation: "최대 고객사",
          reason: "Azure 클라우드의 AI 주도권을 잡기 위해 엔비디아 GPU를 대량으로 선취매하며 인프라 투자를 주도하고 있습니다.",
          learningPoint: "최대 고객사의 막대한 CapEx 투자는 엔비디아 매출의 가시성을 높이는 강력한 동인이 됩니다.",
        },
        {
          sym: "ASML",
          name: "ASML",
          polarity: "positive",
          relation: "장비 독점",
          reason: "TSMC가 엔비디아 칩을 만들기 위해 필요한 EUV(극자외선) 노광 장비를 전 세계에서 유일하게 공급합니다.",
        },
        {
          sym: "AMD",
          name: "AMD",
          polarity: "negative",
          relation: "직접 경쟁사",
          reason: "자체 AI 가속기(MI300X 등)를 출시하며 추격 중이나, 엔비디아의 견고한 CUDA 생태계 벽에 부딪혀 시장 점유율 확장에 어려움을 겪고 있습니다.",
          learningPoint: "소프트웨어 생태계(CUDA) 락인 효과는 하드웨어 성능 격차보다 경쟁사의 진입 장벽을 높이는 핵심 요소입니다.",
        },
      ]
    },
  },
  TSLA: {
    symbol: "TSLA",
    name: "테슬라",
    price: "412.66",
    change: 2.41,
    low52w: 138.80,
    high52w: 430.00,
    buyReasons: [
      {
        icon: "🚗",
        title: "전기차 압도적 생산 효율",
        desc: "메가캐스팅 등 제조 공정 혁신을 통한 업계 1위 원가 경쟁력.",
      },
      {
        icon: "🤖",
        title: "FSD 및 로보택시 비전",
        desc: "자율주행 데이터 축적량 및 AI 트레이닝 클러스터 최상위권.",
      },
      {
        icon: "⚡",
        title: "ESS 에너지 저장장치 급성장",
        desc: "메가팩 판매량이 전년비 2배 가까이 늘며 새 성장동력 확보.",
      },
    ],
    sellReasons: [
      {
        icon: "📉",
        title: "전기차 수요 둔화",
        desc: "글로벌 전기차 보급 속도 조절(캐즘) 및 경쟁사 할인 경쟁 심화.",
      },
      {
        icon: "🇨🇳",
        title: "중국계 업체들과의 경쟁",
        desc: "BYD, 샤오미 등 중국 기업들의 저가 공세 및 해외 진출 가속화.",
      },
      {
        icon: "🕰️",
        title: "FSD 상용화 지연",
        desc: "자율주행 규제 당국의 감시 강화 및 신차 출시 일정 지연 리스크.",
      },
    ],
    scoreDetails: [
      {
        key: "재무안정",
        score: 82,
        oneLine: "부채는 적고 쌓아둔 현금은 든든해",
        indicators: [
          { name: "부채비율 D/E", value: "0.08", note: "매우 낮음" },
          { name: "영업현금흐름", value: "$13.2B", note: "지속 투자 여력" },
          { name: "유동비율", value: "1.70", note: "1.0이 안전선" },
        ],
        desc: "대규모 자본적 지출(CAPEX)을 지속하면서도 부채비율(D/E)을 0.08 수준으로 철저히 통제 중입니다. 고금리 환경에서도 이자 비용 부담이 제한적인 강력한 재무 구조를 갖췄습니다.",
        learning: "설비 투자가 필수적인 제조업에서 낮은 부채비율은 매크로 충격(금리 인상 등)을 방어하는 핵심 버팀목입니다.",
      },
      {
        key: "성장성",
        score: 72,
        oneLine: "전기차는 잠시 멈춤, 자율주행과 에너지가 바통 터치",
        chart: {
          kind: "bar",
          data: [53.8, 81.4, 96.7, 98.0, 105.0],
          labels: ["'21", "'22", "'23", "'24", "'25"],
          unit: "B",
        },
        indicators: [
          { name: "차량 인도수", value: "180만대", note: "전년비 +3%" },
          { name: "ESS 설치량", value: "14.7GWh", note: "YoY +125%" },
          { name: "5년 성장", value: "+21.2%", note: "연평균" },
        ],
        desc: "차량 인도량 성장세는 다소 둔화(YoY +3%)되었으나, 고마진의 ESS(에너지저장장치, YoY +125%) 및 FSD 구독 서비스가 새로운 성장 동력으로 부상하며 외형 축소를 방어하고 있습니다.",
        learning: "핵심 사업의 성장이 정체 국면에 진입할 경우, 이를 상쇄할 수 있는 신성장 사업(ESS, 소프트웨어 등)의 본격화 여부를 점검해야 합니다.",
      },
      {
        key: "수익성",
        score: 70,
        oneLine: "저가형 경쟁으로 마진이 이전보다 깎였지만 극복 중",
        chart: {
          kind: "line",
          data: [12.1, 16.8, 9.2, 8.5, 9.0],
          labels: ["'21", "'22", "'23", "'24", "'25"],
          unit: "%",
        },
        indicators: [
          { name: "영업이익률", value: "9.0%", note: "최고점 16.8%" },
          { name: "순이익률", value: "7.8%" },
          { name: "ROE", value: "18.5%", note: "자본 효율 양호" },
        ],
        desc: "전기차 가격 인하 경쟁(Price War) 심화로 과거 16%대였던 영업이익률이 9%대까지 하락했습니다. 원가 절감 기술(기가프레스 등)과 에너지 부문 이익 기여도 확대가 향후 수익성 회복의 관건입니다.",
        learning: "제품 단가 인하는 수익성 훼손으로 직결됩니다. 제조 혁신을 통한 원가 절감이나 고부가가치 서비스 모델로의 전환이 필수적입니다.",
      },
      {
        key: "해자",
        score: 88,
        oneLine: "슈퍼차저 충전망과 독보적 자율주행 누적 데이터",
        indicators: [
          { name: "슈퍼차저 점유율", value: "60%", note: "북미 지역 표준화" },
          { name: "누적 주행거리", value: "15B miles", note: "FSD 학습용" },
          { name: "기가팩토리 수", value: "6개", note: "글로벌 생산 거점" },
        ],
        desc: "북미 충전 표준(NACS)으로 채택된 슈퍼차저 인프라와 150억 마일 이상의 실제 주행 데이터(FSD 학습용)는 신생 전기차 및 기존 내연기관 업체들이 단기간에 복제하기 어려운 강력한 구조적 우위입니다.",
        learning: "인프라 표준 선점과 기하급수적으로 누적되는 사용자 데이터는 후발 주자의 추격을 원천 차단하는 가장 강력한 형태의 경제적 해자입니다.",
      },
      {
        key: "저평가",
        score: 52,
        oneLine: "성장성 대비해서 밸류에이션(PER)은 여전히 높은 수준",
        chart: {
          kind: "line",
          data: [120.5, 80.2, 70.1, 60.5, 62.0],
          labels: ["'21", "'22", "'23", "'24", "'25"],
          avg: 78,
          unit: "x",
        },
        indicators: [
          { name: "P/E", value: "62.0x", note: "5년 평균 78x" },
          { name: "PEG", value: "2.84", note: "1.0 미만이면 매력" },
          { name: "상승여력", value: "+15%", note: "목표가 $475.00" },
        ],
        desc: "P/E 62.0x는 전통 자동차 제조사(5~10배) 대비 과도한 프리미엄을 받고 있습니다. 이는 시장이 테슬라를 단순 제조사가 아닌 로보택시·AI 플랫폼 기업으로 평가하며 미래 가치를 선반영했기 때문입니다.",
        learning: "산업의 경계를 넘나드는 융합 기업의 경우, 어떤 피어(Peer) 그룹(제조업 vs. 테크/플랫폼)을 기준으로 밸류에이션할지에 따라 저평가/고평가 판단이 완전히 달라집니다.",
      },
    ],
    priceHistory: {
      "1W": [
        { date: "월", price: 402.1 }, { date: "화", price: 405.5 }, { date: "수", price: 410.2 },
        { date: "목", price: 407.8 }, { date: "금", price: 412.0 }, { date: "토", price: 411.5 }, { date: "일", price: 412.66 },
      ],
      "1M": [
        { date: "2/17", price: 360.5 }, { date: "2/24", price: 375.2 }, { date: "3/3", price: 370.1 },
        { date: "3/10", price: 382.4 }, { date: "3/17", price: 395.2 }, { date: "3/24", price: 402.1 },
        { date: "3/31", price: 408.5 }, { date: "4/7", price: 412.66 },
      ],
      "3M": [
        { date: "1월", price: 280.5 }, { date: "1/3주", price: 310.2 }, { date: "2/1주", price: 335.6 },
        { date: "2/3주", price: 350.2 }, { date: "3/1주", price: 375.4 }, { date: "3/3주", price: 390.1 },
        { date: "4/1주", price: 405.2 }, { date: "4/2주", price: 412.66 },
      ],
      "1Y": [
        { date: "5월", price: 175.2 }, { date: "7월", price: 210.5 }, { date: "9월", price: 250.4 },
        { date: "11월", price: 280.1 }, { date: "1월", price: 280.5 }, { date: "3월", price: 385.2 },
        { date: "4월", price: 412.66 },
      ],
    },
    epsData: [
      { quarter: "Q1'24", estimated: 0.65, actual: 0.45 },
      { quarter: "Q2'24", estimated: 0.60, actual: 0.52 },
      { quarter: "Q3'24", estimated: 0.55, actual: 0.62 },
      { quarter: "Q4'24", estimated: 0.70, actual: 0.76 },
    ],
    revenueBreakdown: [
      { label: "자동차 판매", value: 80, color: ACCENT },
      { label: "에너지 저장", value: 8, color: "#4A90D9" },
      { label: "서비스 및 기타", value: 7, color: "#E5A820" },
      { label: "탄소배출권", value: 3, color: "#9B59B6" },
      { label: "FSD 구독/기타", value: 2, color: UP },
    ],
    kgFlows: [
      {
        title: "전기차 캐즘이 산업 재편으로 이어지는 과정",
        scenario: "전기차 수요 성장 둔화(Chasm) 시기에 가격 경쟁이 공급망을 어떻게 재편하는지 추적합니다.",
        steps: [
          {
            label: "전기차 수요 성장 둔화",
            sublabel: "매크로",
            desc: "고금리와 충전 인프라 부족 등으로 얼리어답터 이후 대중화(Mass Adoption) 지연",
            relation: "재고 증가 및 가격 인하 압박",
            polarity: "negative",
          },
          {
            label: "테슬라 가격 인하 주도",
            sublabel: "TSLA",
            desc: "업계 1위 마진율(원가 경쟁력)을 무기로 시장 점유율 방어를 위해 전면적인 단가 인하 단행",
            relation: "수익성 악화 및 경쟁사 압박",
            polarity: "neutral",
          },
          {
            label: "기존 완성차의 전동화 전략 지연",
            sublabel: "F / GM",
            desc: "가격 경쟁력 확보에 실패한 포드, GM 등 기존 내연기관 업체들이 전기차 투자 계획 축소·연기",
            relation: "배터리 수주 감소 연쇄 작용",
            polarity: "negative",
          },
          {
            label: "배터리 밸류체인 실적 부진",
            sublabel: "LG엔솔·에코프로",
            desc: "전방 수요 감소로 배터리 셀 및 양극재 등 소재 업체들의 공장 가동률 하락 및 실적 충격",
            polarity: "negative",
          },
        ],
        learningPoint: "혁신 산업의 성장 둔화기(Chasm)에는 가장 원가 경쟁력이 높은 선두 기업이 단가 인하로 치킨 게임을 주도하며 후발 주자를 탈락시키는 구조 조정이 발생합니다.",
      },
      {
        title: "자율주행(FSD)이 하드웨어를 소프트웨어 플랫폼으로 바꾸는 마법",
        scenario: "테슬라가 자동차 제조사를 넘어 소프트웨어 플랫폼 기업으로 진화하는 메커니즘을 분석합니다.",
        steps: [
          {
            label: "압도적 주행 데이터 확보",
            sublabel: "TSLA 차량",
            desc: "전 세계 수백만 대의 테슬라 차량이 카메라를 통해 매일 실제 주행 영상 데이터 수집",
            relation: "AI 모델 학습 고도화",
            polarity: "positive",
          },
          {
            label: "FSD(자율주행) 성능 진화",
            sublabel: "소프트웨어",
            desc: "엔드투엔드(End-to-End) AI 네트워크 도입으로 코드 기반 규칙에서 AI 스스로 운전 방식을 학습하는 체계로 진화",
            relation: "구독 수익 창출",
            polarity: "positive",
          },
          {
            label: "고마진 구독 경제 활성화",
            sublabel: "TSLA 실적",
            desc: "FSD 구매(월 $99 구독 등) 비율 증가로 자동차 1대당 생애 가치(LTV) 및 영업이익률 비약적 상승",
            relation: "가치 평가 패러다임 전환",
            polarity: "positive",
          },
          {
            label: "플랫폼(로보택시) 기업으로 재평가",
            sublabel: "밸류에이션",
            desc: "단순 제조 마진이 아닌 글로벌 모빌리티 네트워크 플랫폼으로서 높은 밸류에이션 멀티플(PER) 적용 정당화",
            polarity: "positive",
          },
        ],
        learningPoint: "제조업이 고수익을 창출하려면 하드웨어 1회성 판매에 그치지 않고, 그 위에 지속적인 구독 수익을 창출하는 소프트웨어·서비스 생태계를 구축해야 합니다.",
      },
    ],
  },
};

const stockDetail = stockDetailsMap.AAPL;



const ISSUE_SPARKLINES: Record<string, number[]> = {
  USO: [72, 74, 73, 78, 80, 82, 85], XOM: [108, 109, 107, 110, 112, 114, 116],
  DAL: [48, 47, 45, 44, 42, 41, 40], QQQ: [420, 418, 415, 412, 410, 408, 405],
  CVX: [158, 160, 159, 162, 164, 166, 168], AAL: [16, 15.5, 15, 14.5, 14, 13.5, 13],
  GLD: [195, 196, 198, 200, 202, 204, 207], SPY: [505, 503, 500, 498, 496, 495, 493],
  TLT: [95, 94, 93, 92, 91, 90, 89], NVDA: [820, 835, 842, 838, 855, 870, 880],
  TSM: [142, 144, 143, 146, 148, 150, 152], AAPL: [250, 252, 254, 253, 256, 257, 257.5],
  TSLA: [255, 248, 242, 238, 235, 237, 240], F: [12, 12.2, 12.1, 12.4, 12.5, 12.6, 12.8],
  ALB: [112, 114, 113, 116, 118, 120, 122], "005930": [76, 77, 76.5, 78, 78.5, 79, 78.4],
  "000660": [178, 180, 179, 182, 183, 184, 182.5],
};

// ═══════ 차트 컴포넌트 ═══════

function EduPriceChart({ data, period }: { data: { date: string; price: number }[]; period: EduPeriodKey }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(false); const t = setTimeout(() => setShow(true), 80); return () => clearTimeout(t); }, [period]);
  const prices = data.map((d) => d.price);
  const minP = Math.min(...prices) * 0.98; const maxP = Math.max(...prices) * 1.02;
  const range = maxP - minP; const w = 300; const h = 150; const pl = 40; const pb = 20;
  const chartW = w - pl; const chartH = h - pb;
  const isUp = prices[prices.length - 1] >= prices[0];
  const lineColor = isUp ? UP : DOWN;
  const pts = data.map((d, i) => ({ x: pl + (i / (data.length - 1)) * chartW, y: chartH - ((d.price - minP) / range) * chartH, price: d.price, label: d.date }));
  const anim = pts.map((pt) => ({ ...pt, y: show ? pt.y : chartH }));
  const pathD = anim.reduce((acc, pt, i) => { if (i === 0) return `M ${pt.x} ${pt.y}`; const prev = anim[i - 1]; const cx = (prev.x + pt.x) / 2; return `${acc} C ${cx} ${prev.y} ${cx} ${pt.y} ${pt.x} ${pt.y}`; }, "");
  const fillD = `${pathD} L ${anim[anim.length - 1].x} ${chartH} L ${pl} ${chartH} Z`;
  const yTicks = Array.from({ length: 4 }, (_, i) => minP + (range / 3) * i);
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs><linearGradient id={`eduPF-${period}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={lineColor} stopOpacity="0.18" /><stop offset="100%" stopColor={lineColor} stopOpacity="0.01" /></linearGradient></defs>
      {yTicks.map((tick) => { const y = chartH - ((tick - minP) / range) * chartH; return (<g key={tick}><line x1={pl} y1={y} x2={w} y2={y} stroke={LINE} strokeWidth="0.5" strokeDasharray="3,3" /><text x={pl - 4} y={y + 3} textAnchor="end" fontSize="7" fill={SUB}>${tick.toFixed(0)}</text></g>); })}
      {pts.map((pt, i) => { if (data.length > 8 && i % 2 !== 0) return null; return <text key={pt.label} x={pt.x} y={h - 3} textAnchor="middle" fontSize="6.5" fill={SUB}>{pt.label}</text>; })}
      <path d={fillD} fill={`url(#eduPF-${period})`} style={{ transition: "d 0.8s cubic-bezier(0.2,0.8,0.2,1)" }} />
      <path d={pathD} fill="none" stroke={lineColor} strokeWidth="2" strokeLinecap="round" style={{ transition: "d 0.8s cubic-bezier(0.2,0.8,0.2,1)" }} />
      {anim.map((pt) => <circle key={pt.label} cx={pt.x} cy={pt.y} r="3" fill={lineColor} stroke={SURFACE} strokeWidth="1.5" style={{ transition: "cy 0.8s cubic-bezier(0.2,0.8,0.2,1)" }} />)}
      {show && anim.length > 0 && (<g><rect x={anim[anim.length - 1].x - 22} y={anim[anim.length - 1].y - 18} width="44" height="14" rx="4" fill={lineColor} /><text x={anim[anim.length - 1].x} y={anim[anim.length - 1].y - 8} textAnchor="middle" fontSize="7" fill="#fff" fontWeight="700">${anim[anim.length - 1].price.toFixed(1)}</text></g>)}
    </svg>
  );
}

function EduRadar({ scores, animate }: { scores: { key: string; score: number }[]; animate: boolean }) {
  const cx = 90; const cy = 90; const maxR = 60; const levels = 4; const n = scores.length;
  const angleStep = (Math.PI * 2) / n;
  const getPoint = (index: number, value: number) => { const angle = angleStep * index - Math.PI / 2; const r = (value / 100) * maxR; return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }; };
  const gridPolygons = Array.from({ length: levels }, (_, lvl) => { const r = ((lvl + 1) / levels) * 100; return scores.map((_, i) => getPoint(i, r)).map((p) => `${p.x},${p.y}`).join(" "); });
  const dataPoints = scores.map((s, i) => getPoint(i, animate ? s.score : 0));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <svg width="100%" viewBox="0 0 180 180" className="overflow-visible">
      <defs><linearGradient id="eduRadarFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={ACCENT} stopOpacity="0.3" /><stop offset="100%" stopColor={ACCENT} stopOpacity="0.05" /></linearGradient></defs>
      {gridPolygons.map((pts, i) => <polygon key={i} points={pts} fill="none" stroke={LINE} strokeWidth="0.5" />)}
      {scores.map((_, i) => { const outer = getPoint(i, 100); return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke={LINE} strokeWidth="0.5" />; })}
      <polygon points={dataPolygon} fill="url(#eduRadarFill)" stroke={ACCENT} strokeWidth="2" className="transition-all duration-1000 ease-out" />
      {dataPoints.map((pt, i) => <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill={ACCENT} stroke={SURFACE} strokeWidth="1.5" className="transition-all duration-1000 ease-out" />)}
      {scores.map((s, i) => { const labelPt = getPoint(i, 118); return <text key={i} x={labelPt.x} y={labelPt.y} textAnchor="middle" dominantBaseline="central" fontSize="8" fill={TEXT} fontWeight="700">{s.key}</text>; })}
    </svg>
  );
}

function EduDonut({ segments, animate }: { segments: { label: string; value: number; color: string }[]; animate: boolean }) {
  const cx = 55; const cy = 55; const r = 38; const strokeW = 14;
  const circumference = 2 * Math.PI * r; let cumulativeOffset = 0;
  return (
    <div className="flex items-center gap-4">
      <svg width="110" height="110" viewBox="0 0 110 110" className="shrink-0">
        {segments.map((seg) => { const segLen = (seg.value / 100) * circumference; const rotation = (cumulativeOffset / 100) * 360 - 90; cumulativeOffset += seg.value; return <circle key={seg.label} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={strokeW} strokeDasharray={`${animate ? segLen : 0} ${circumference}`} strokeLinecap="butt" transform={`rotate(${rotation} ${cx} ${cy})`} className="transition-all duration-1000 ease-out" />; })}
        <circle cx={cx} cy={cy} r={r - strokeW / 2 + 1} fill={SURFACE} />
      </svg>
      <div className="flex flex-col gap-1.5">
        {segments.map((seg) => (<div key={seg.label} className="flex items-center gap-2"><div className="size-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} /><span className="text-[10px]" style={{ color: TEXT }}>{seg.label}</span><span className="text-[10px] font-extrabold ml-auto" style={{ color: TEXT }}>{seg.value}%</span></div>))}
      </div>
    </div>
  );
}

function EduEpsBars({ data, animate }: { data: { quarter: string; estimated: number; actual: number }[]; animate: boolean }) {
  const maxEps = Math.max(...data.flatMap((d) => [d.estimated, d.actual])) * 1.15;
  return (
    <div className="flex items-end gap-3 h-[110px]">
      {data.map((d) => { const estH = (d.estimated / maxEps) * 90; const actH = (d.actual / maxEps) * 90; const beat = d.actual >= d.estimated; return (
        <div key={d.quarter} className="flex-1 flex flex-col items-center gap-1">
          <div className="flex items-end gap-[3px] h-[90px]">
            <div className="w-[12px] rounded-t-[3px] transition-all duration-700 ease-out" style={{ height: animate ? `${estH}px` : "0px", background: LINE }} />
            <div className="w-[12px] rounded-t-[3px] transition-all duration-700 ease-out" style={{ height: animate ? `${actH}px` : "0px", background: beat ? UP : DOWN }} />
          </div>
          <span className="text-[8px]" style={{ color: SUB }}>{d.quarter}</span>
        </div>
      ); })}
    </div>
  );
}

function EduRange52W({ low, high, current }: { low: number; high: number; current: number }) {
  const pct = ((current - low) / (high - low)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-[9px] mb-1" style={{ color: SUB }}>
        <span>52주 최저 ${low.toFixed(0)}</span>
        <span>52주 최고 ${high.toFixed(0)}</span>
      </div>
      <div className="relative h-[6px] w-full rounded-full" style={{ background: LINE }}>
        <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${DOWN}40, ${ACCENT}, ${UP}40)` }} />
        <div className="absolute top-1/2 size-3 rounded-full border-2 shadow-sm transition-all duration-700" style={{ left: `${pct}%`, transform: "translate(-50%, -50%)", borderColor: SURFACE, background: ACCENT }} />
      </div>
    </div>
  );
}

function EduSparkline({ data, polarity }: { data: number[]; polarity: Polarity }) {
  const w = 64; const h = 22; const pad = 2;
  const min = Math.min(...data) - 1; const max = Math.max(...data) + 1; const range = max - min;
  const pts = data.map((v, i) => ({ x: pad + (i / (data.length - 1)) * (w - pad * 2), y: pad + (1 - (v - min) / range) * (h - pad * 2) }));
  const pathD = pts.reduce((acc, pt, i) => { if (i === 0) return `M ${pt.x} ${pt.y}`; const prev = pts[i - 1]; const cx = (prev.x + pt.x) / 2; return `${acc} C ${cx} ${prev.y} ${cx} ${pt.y} ${pt.x} ${pt.y}`; }, "");
  const color = polarity === "positive" ? UP : polarity === "negative" ? DOWN : SUB;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2" fill={color} />
    </svg>
  );
}

function EduImpactMeter({ tier }: { tier: Tier }) {
  const [anim, setAnim] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnim(true), 200); return () => clearTimeout(t); }, []);
  const score = tier === 3 ? 92 : tier === 2 ? 65 : 35;
  const label = tier === 3 ? "긴급" : tier === 2 ? "주목" : "참고";
  const color = tier === 3 ? UP : tier === 2 ? ACCENT : SUB;
  const radius = 18; const circumference = 2 * Math.PI * radius;
  const offset = anim ? circumference - (score / 100) * circumference : circumference;
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex size-11 items-center justify-center">
        <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 40 40"><circle cx="20" cy="20" r={radius} fill="none" stroke={LINE} strokeWidth="3" /><circle cx="20" cy="20" r={radius} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" /></svg>
        <span className="text-[10px] font-extrabold" style={{ color }}>{score}</span>
      </div>
      <span className="text-[10px] font-extrabold" style={{ color }}>{label}</span>
    </div>
  );
}

function EduSentimentDonut({ affected }: { affected: { polarity: Polarity }[] }) {
  const [anim, setAnim] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnim(true), 300); return () => clearTimeout(t); }, []);
  const pos = affected.filter((a) => a.polarity === "positive").length;
  const neg = affected.filter((a) => a.polarity === "negative").length;
  const neu = affected.filter((a) => a.polarity === "neutral").length;
  const total = affected.length || 1;
  const segments = [
    { label: "수혜", value: (pos / total) * 100, color: UP },
    { label: "피해", value: (neg / total) * 100, color: DOWN },
    { label: "중립", value: (neu / total) * 100, color: SUB },
  ].filter((s) => s.value > 0);
  const cx = 28; const cy = 28; const r = 20; const strokeW = 8;
  const circumference = 2 * Math.PI * r; let cumOffset = 0;
  return (
    <div className="flex items-center gap-3">
      <svg width="56" height="56" viewBox="0 0 56 56" className="shrink-0">
        {segments.map((seg) => { const segLen = (seg.value / 100) * circumference; const rotation = (cumOffset / 100) * 360 - 90; cumOffset += seg.value; return <circle key={seg.label} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={strokeW} strokeDasharray={`${anim ? segLen : 0} ${circumference}`} transform={`rotate(${rotation} ${cx} ${cy})`} className="transition-all duration-700 ease-out" />; })}
        <circle cx={cx} cy={cy} r={r - strokeW / 2 + 1} fill={SURFACE} />
      </svg>
      <div className="flex flex-col gap-1">
        {segments.map((s) => <div key={s.label} className="flex items-center gap-1.5"><div className="size-1.5 rounded-full" style={{ background: s.color }} /><span className="text-[9px]" style={{ color: TEXT }}>{s.label} {Math.round(s.value)}%</span></div>)}
      </div>
    </div>
  );
}

function EduAffectedBars({ affected }: { affected: { sym: string; name: string; polarity: Polarity }[] }) {
  const [anim, setAnim] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnim(true), 250); return () => clearTimeout(t); }, []);
  return (
    <div className="flex flex-col gap-2">
      {affected.slice(0, 6).map((a) => {
        const color = a.polarity === "positive" ? UP : a.polarity === "negative" ? DOWN : SUB;
        const label = a.polarity === "positive" ? "수혜" : a.polarity === "negative" ? "피해" : "중립";
        const w = a.polarity === "neutral" ? 40 : a.polarity === "positive" ? 70 : 55;
        return (
          <div key={a.sym} className="flex items-center gap-2">
            <span className="w-12 text-[9px] font-extrabold text-right" style={{ color: TEXT }}>{a.sym.length > 5 ? a.sym.slice(0, 5) : a.sym}</span>
            <div className="flex-1 h-[5px] rounded-full overflow-hidden" style={{ background: LINE }}>
              <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: anim ? `${w}%` : "0%", background: color }} />
            </div>
            <span className="w-6 text-[8px] font-bold" style={{ color }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function IssueChartsSection({ issue }: { issue: Issue }) {
  const affected = issue.detail?.ripple?.affected;
  if (!affected || affected.length === 0) return null;
  return (
    <section className="mb-5">
      <SectionHeader title="시각 분석" />
      <div className="flex flex-col gap-3">
        {/* 임팩트 + 센티먼트 */}
        <div className="flex gap-3">
          <div className="flex-1 rounded-[20px] p-4" style={{ background: SURFACE, boxShadow: SHADOW }}>
            <div className="mb-2 text-[10px] font-extrabold" style={{ color: SUB }}>이슈 임팩트</div>
            <EduImpactMeter tier={issue.tier} />
          </div>
          <div className="flex-1 rounded-[20px] p-4" style={{ background: SURFACE, boxShadow: SHADOW }}>
            <div className="mb-2 text-[10px] font-extrabold" style={{ color: SUB }}>센티먼트</div>
            <EduSentimentDonut affected={affected} />
          </div>
        </div>
        {/* 영향 종목 바 차트 */}
        <div className="rounded-[20px] p-4" style={{ background: SURFACE, boxShadow: SHADOW }}>
          <div className="mb-3 text-[11px] font-extrabold" style={{ color: TEXT }}>📊 영향 종목 방향성</div>
          <EduAffectedBars affected={affected} />
        </div>
        {/* 스파크라인 그리드 */}
        <div className="rounded-[20px] p-4" style={{ background: SURFACE, boxShadow: SHADOW }}>
          <div className="mb-3 text-[11px] font-extrabold" style={{ color: TEXT }}>📈 관련 종목 최근 추이</div>
          <div className="grid grid-cols-2 gap-2">
            {affected.slice(0, 4).map((a) => {
              const sparkData = ISSUE_SPARKLINES[a.sym];
              if (!sparkData) return null;
              return (
                <div key={a.sym} className="flex items-center gap-2 rounded-xl p-2" style={{ background: BG }}>
                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold" style={{ color: TEXT }}>{a.sym}</div>
                    <div className="text-[8px]" style={{ color: SUB }}>{a.name}</div>
                  </div>
                  <EduSparkline data={sparkData} polarity={a.polarity} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const STOCK_LOGOS: Record<string, { src: string; color: string }> = {
  AAPL: { src: "/logos/apple.svg", color: "#000000" },
  NVDA: { src: "/logos/nvidia.svg", color: "#76B900" },
  TSLA: { src: "/logos/tesla.svg", color: "#E31937" },
  "005930": { src: "/logos/samsung.svg", color: "#1428A0" },
  MSFT: { src: "/logos/microsoft.svg", color: "#00A4EF" },
  GOOGL: { src: "/logos/google.svg", color: "#4285F4" },
  AMZN: { src: "/logos/amazon.svg", color: "#FF9900" },
  META: { src: "/logos/meta.svg", color: "#0866FF" },
  AVGO: { src: "/logos/broadcom.svg", color: "#CC092F" },
};

function StockLogo({ symbol, size }: { symbol: string; size: number }) {
  const logo = STOCK_LOGOS[symbol];
  if (!logo) {
    return (
      <div
        className="flex flex-shrink-0 items-center justify-center rounded-full font-extrabold"
        style={{
          width: size,
          height: size,
          background: ACCENT_SOFT,
          color: ACCENT_DEEP,
          fontSize: Math.round(size * 0.3),
        }}
      >
        {symbol.slice(0, 2)}
      </div>
    );
  }
  const inner = Math.round(size * 0.56);
  return (
    <div
      className="flex flex-shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: "#FFFFFF",
        boxShadow: "inset 0 0 0 1px rgba(26, 26, 28, 0.06)",
      }}
    >
      <span
        aria-label={symbol}
        style={{
          width: inner,
          height: inner,
          display: "inline-block",
          backgroundColor: logo.color,
          WebkitMaskImage: `url(${logo.src})`,
          maskImage: `url(${logo.src})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </div>
  );
}

function Mascot({
  size = 96,
  withPencil: _withPencil = false,
}: {
  size?: number;
  withPencil?: boolean;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* 그림자 */}
      <ellipse cx="60" cy="114" rx="32" ry="3.5" fill="rgba(0,0,0,0.12)" />
      {/* 몸통 */}
      <path
        d="M28 94 Q28 72 44 70 Q60 68 76 70 Q92 72 92 94 Q92 110 60 110 Q28 110 28 94 Z"
        fill="#1A1A1C"
      />
      {/* 귀(뿔) */}
      <path d="M34 30 Q32 14 44 20 Q48 26 46 32 Z" fill="#1A1A1C" />
      <path d="M86 30 Q88 14 76 20 Q72 26 74 32 Z" fill="#1A1A1C" />
      {/* 머리 */}
      <circle cx="60" cy="50" r="32" fill="#1A1A1C" />
    </svg>
  );
}

function CategoryChip({
  category,
  size = "md",
}: {
  category: Category;
  size?: "sm" | "md";
}) {
  const padding = size === "sm" ? "px-2 py-0.5" : "px-2.5 py-1";
  return (
    <span
      className={`rounded-full ${padding} text-[10.5px] font-bold`}
      style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
    >
      {CATEGORY_LABEL[category]}
    </span>
  );
}

function TierStars({ tier, size = 11 }: { tier: Tier; size?: number }) {
  return (
    <span
      className="inline-flex items-center gap-[1px]"
      aria-label={`중요도 ${tier}/3`}
    >
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="leading-none"
          style={{
            fontSize: size,
            color: ACCENT,
            opacity: i <= tier ? 1 : 0.22,
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function PriceChange({ change }: { change: number }) {
  return (
    <span
      style={{
        color: change >= 0 ? UP : DOWN,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {change >= 0 ? "+" : ""}
      {change.toFixed(2)}%
    </span>
  );
}

function StockRow({
  stock,
  trailing,
  onClick,
  divided = false,
}: {
  stock: { symbol: string; name: string };
  trailing: ReactNode;
  onClick?: () => void;
  divided?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between px-5 py-4 text-left active:opacity-70"
      style={divided ? { borderTop: `1px solid ${LINE}` } : undefined}
    >
      <div className="flex items-center gap-3">
        <StockLogo symbol={stock.symbol} size={40} />
        <div>
          <div className="text-[14.5px] font-extrabold" style={{ color: TEXT }}>
            {stock.name}
          </div>
          <div className="text-[11px]" style={{ color: SUB }}>
            {stock.symbol}
          </div>
        </div>
      </div>
      {trailing}
    </button>
  );
}

function ReasonCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="flex gap-3 rounded-[22px] p-4"
      style={{ background: SURFACE, boxShadow: SHADOW }}
    >
      <div className="text-[20px]">{icon}</div>
      <div>
        <div className="text-[14px] font-extrabold" style={{ color: TEXT }}>
          {title}
        </div>
        <p className="mt-1 text-[12.5px] leading-relaxed" style={{ color: SUB }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  cta,
  onCta,
}: {
  title: string;
  cta?: string;
  onCta?: () => void;
}) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h2
        className="text-[16px] font-extrabold"
        style={{ color: TEXT, letterSpacing: -0.3 }}
      >
        {title}
      </h2>
      {cta && (
        <button
          type="button"
          onClick={onCta}
          className="text-[12px]"
          style={{ color: SUB }}
        >
          {cta}
        </button>
      )}
    </div>
  );
}

function TopBar({ streak }: { streak: number }) {
  return (
    <div
      className="fixed left-0 right-0 top-0 z-40 mx-auto flex max-w-[430px] items-center justify-between px-5 py-3"
      style={{ background: BG }}
    >
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-full px-1 py-0.5 text-[14px] font-extrabold"
        style={{ color: TEXT }}
      >
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full text-[14px]"
          style={{ background: ACCENT, color: "#fff" }}
        >
          🔥
        </span>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{streak}일차</span>
        <span style={{ color: SUB, fontWeight: 500 }}>›</span>
      </button>
      <button
        type="button"
        aria-label="알림"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[16px]"
        style={{ background: "rgba(255,255,255,0.5)", color: TEXT }}
      >
        🔔
      </button>
    </div>
  );
}

function HomeScreen({
  onGoToIssues,
  onOpenIssue,
  onStartLesson,
  onSelectStock,
  lessonStep,
  activeLessonId,
}: {
  onGoToIssues: () => void;
  onOpenIssue: (issue: Issue) => void;
  onStartLesson: (issueId: number) => void;
  onSelectStock: (symbol: string) => void;
  lessonStep: number;
  activeLessonId: number;
}) {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [lessonCurrent, setLessonCurrent] = useState(0);
  const lessonSliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    setCurrent(idx);
  };

  const handleLessonScroll = () => {
    const el = lessonSliderRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    setLessonCurrent(idx);
  };

  const issueCards = dailyCards.slice(1);

  return (
    <div className="pt-2">
      {/* ── 오늘의 학습 카드 슬라이더 ── */}
      <div className="px-5 mb-2">
        <SectionHeader title="오늘의 학습" />
      </div>
      <div
        ref={lessonSliderRef}
        onScroll={handleLessonScroll}
        className="flex overflow-x-auto"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {lessonCards.map((lc) => {
          const isActive = activeLessonId === lc.issueId;
          const inProgress = isActive && lessonStep > 0 && lessonStep < 5;
          const totalSteps = 5;
          return (
            <div
              key={lc.issueId}
              className="w-full flex-shrink-0 px-5"
              style={{ scrollSnapAlign: "start" }}
            >
              <article
                className="relative overflow-hidden rounded-[28px] p-6 pr-4"
                style={{ background: HERO, boxShadow: SHADOW_HERO, minHeight: 180 }}
              >
                <div
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold"
                  style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
                >
                  {inProgress ? "📝 학습 중" : `${lc.emoji} 학습하기`}
                </div>
                <h2
                  className="mt-2 text-[20px] font-extrabold leading-tight"
                  style={{ color: TEXT }}
                >
                  {lc.headline}
                </h2>

                {inProgress ? (
                  <>
                    <div className="mt-3 flex items-center gap-2">
                      <div
                        className="h-2 flex-1 overflow-hidden rounded-full"
                        style={{ background: LINE }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(lessonStep / totalSteps) * 100}%`,
                            background: ACCENT,
                            transition: "width 400ms ease-out",
                          }}
                        />
                      </div>
                      <span
                        className="text-[11px] font-bold"
                        style={{ color: ACCENT_DEEP }}
                      >
                        {lessonStep}/{totalSteps}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onStartLesson(lc.issueId)}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-extrabold active:opacity-80"
                      style={{ background: ACCENT, color: "#fff", boxShadow: SHADOW }}
                    >
                      이어서 학습하기 <span style={{ fontSize: 11 }}>▶</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div
                      className="mt-1.5 text-[12.5px] leading-snug"
                      style={{ color: SUB }}
                    >
                      {lc.subtitle}
                    </div>
                    <button
                      type="button"
                      onClick={() => onStartLesson(lc.issueId)}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-extrabold active:opacity-80"
                      style={{ background: ACCENT, color: "#fff", boxShadow: SHADOW }}
                    >
                      학습 시작하기 <span style={{ fontSize: 11 }}>▶</span>
                    </button>
                  </>
                )}
                <div className="absolute" style={{ right: -6, bottom: -10 }}>
                  <Mascot size={150} withPencil />
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {/* 학습 카드 페이지네이션 닷 */}
      <div className="mb-5 mt-3 flex justify-center gap-1.5">
        {lessonCards.map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: i === lessonCurrent ? 16 : 6,
              height: 6,
              background: i === lessonCurrent ? ACCENT : LINE,
              transition: "width 200ms, background 200ms",
            }}
          />
        ))}
      </div>

      {/* ── 오늘의 이슈 슬라이더 ── */}
      <div className="px-5 mb-2">
        <SectionHeader title="오늘의 이슈" />
      </div>
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {issueCards.map((card) => {
          const issue = issueList.find((i) => i.id === card.id);
          return (
            <div
              key={card.id}
              className="w-full flex-shrink-0 px-5"
              style={{ scrollSnapAlign: "start" }}
            >
              <article
                className="flex cursor-pointer flex-col gap-3 rounded-[22px] p-4 active:opacity-90"
                style={{ background: SURFACE, boxShadow: SHADOW, minHeight: 180 }}
                onClick={() => {
                  if (issue) onOpenIssue(issue);
                  else onGoToIssues();
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CategoryChip category={card.category} />
                    <TierStars tier={card.tier} />
                  </div>
                  <span className="text-[11px]" style={{ color: SUB }}>
                    {card.time}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {card.keywords.map((k) => (
                    <span
                      key={k}
                      className="text-[12px] font-bold"
                      style={{ color: ACCENT_DEEP }}
                    >
                      #{k}
                    </span>
                  ))}
                </div>
                <h3
                  className="text-[15px] font-extrabold leading-snug"
                  style={{ color: TEXT }}
                >
                  {card.headline}
                </h3>
                <div
                  className="flex gap-2 rounded-xl p-3"
                  style={{ background: ACCENT_SOFT }}
                >
                  <Mascot size={32} />
                  <p className="text-[12.5px] leading-relaxed" style={{ color: TEXT }}>
                    {card.coachLine}
                  </p>
                </div>
              </article>
            </div>
          );
        })}

        {/* ── 마지막: 더 많은 이슈 보기 ── */}
        <div
          className="w-full flex-shrink-0 px-5"
          style={{ scrollSnapAlign: "start" }}
        >
          <article
            className="flex flex-col items-center justify-center gap-4 rounded-[22px] p-8 text-center"
            style={{ background: SURFACE, boxShadow: SHADOW, minHeight: 180 }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-[24px]"
              style={{ background: ACCENT_SOFT }}
            >
              📰
            </div>
            <div>
              <div className="text-[17px] font-extrabold" style={{ color: TEXT }}>
                더 많은 이슈
              </div>
              <div className="mt-1 text-[13px]" style={{ color: SUB }}>
                오늘 {issueList.length}개의 이슈가 등록됐어요
              </div>
            </div>
            <button
              type="button"
              onClick={onGoToIssues}
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-extrabold active:opacity-80"
              style={{ background: ACCENT, color: "#fff", boxShadow: SHADOW }}
            >
              전체 이슈 보기 →
            </button>
          </article>
        </div>
      </div>

      {/* 페이지네이션 닷 — 이슈 슬라이더용 */}
      <div className="mb-6 mt-3 flex justify-center gap-1.5">
        {Array.from({ length: issueCards.length + 1 }).map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: i === current ? 16 : 6,
              height: 6,
              background: i === current ? ACCENT : LINE,
              transition: "width 200ms, background 200ms",
            }}
          />
        ))}
      </div>



      {/* 관심 종목 */}
      <div className="px-5 mt-5">
        <SectionHeader title="나의 관심 종목" />
        <ul
          className="overflow-hidden rounded-[22px]"
          style={{ background: SURFACE, boxShadow: SHADOW }}
        >
          {watchlist.slice(0, 3).map((s, i) => (
            <li key={s.symbol}>
              <StockRow
                stock={s}
                divided={i > 0}
                onClick={() => onSelectStock(s.symbol)}
                trailing={
                  <div className="text-right">
                    <div
                      className="text-[14px] font-extrabold"
                      style={{ color: TEXT, fontVariantNumeric: "tabular-nums" }}
                    >
                      {s.price}
                    </div>
                    <div className="text-[12px] font-bold">
                      <PriceChange change={s.change} />
                    </div>
                  </div>
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DailyCard({ card }: { card: (typeof dailyCards)[number] }) {
  return (
    <article
      className="relative flex w-[280px] flex-shrink-0 flex-col gap-3 rounded-[22px] p-4"
      style={{ background: SURFACE, boxShadow: SHADOW }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CategoryChip category={card.category} />
          <TierStars tier={card.tier} />
        </div>
        <span className="text-[11px]" style={{ color: SUB }}>
          {card.time}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {card.keywords.map((k) => (
          <span
            key={k}
            className="text-[12px] font-bold"
            style={{ color: ACCENT_DEEP }}
          >
            #{k}
          </span>
        ))}
      </div>

      <h3
        className="text-[15px] font-extrabold leading-snug"
        style={{ color: TEXT }}
      >
        {card.headline}
      </h3>

      <div
        className="flex gap-2 rounded-xl p-3"
        style={{ background: ACCENT_SOFT }}
      >
        <Mascot size={32} />
        <p className="text-[12.5px] leading-relaxed" style={{ color: TEXT }}>
          {card.coachLine}
        </p>
      </div>
    </article>
  );
}

function IssueScreen({
  active,
  onSetActive,
  onStartLesson,
}: {
  active: Issue | null;
  onSetActive: (issue: Issue | null) => void;
  onStartLesson: (id: number) => void;
}) {
  const [highlight, setHighlight] = useState<Category>("general");
  const generalRef = useRef<HTMLElement>(null);
  const sectorRef = useRef<HTMLElement>(null);
  const mineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = [
      { ref: generalRef, cat: "general" as Category },
      { ref: sectorRef, cat: "sector" as Category },
      { ref: mineRef, cat: "mine" as Category },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const found = targets.find((t) => t.ref.current === entry.target);
            if (found) setHighlight(found.cat);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    targets.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (cat: Category) => {
    const refMap: Record<Category, React.RefObject<HTMLElement | null>> = {
      general: generalRef,
      sector: sectorRef,
      mine: mineRef,
    };
    const el = refMap[cat].current;
    if (!el) return;
    const offset = 152;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setHighlight(cat);
  };

  if (active) {
    return <IssueDetail issue={active} onBack={() => onSetActive(null)} onStartLesson={onStartLesson} />;
  }

  const generalIssues = issueList.filter((i) => i.category === "general");
  const sectorIssues = issueList.filter((i) => i.category === "sector");
  const mineIssues = issueList.filter((i) => i.category === "mine");

  return (
    <>
      <div
        className="sticky z-30 px-5 pb-3 pt-4"
        style={{ top: 56, background: BG }}
      >
        <h1 className="mb-3 text-[20px] font-extrabold" style={{ color: TEXT }}>
          오늘의 이슈
        </h1>
        <div className="flex gap-2">
          {FILTERS.map((f) => {
            const isActive = highlight === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => scrollToSection(f)}
                className="rounded-full px-3.5 py-1.5 text-[12px] font-bold transition"
                style={{
                  background: isActive ? TEXT : SURFACE,
                  color: isActive ? "#fff" : SUB,
                  border: `1px solid ${isActive ? TEXT : LINE}`,
                }}
              >
                {CATEGORY_LABEL[f]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-10 px-5 pb-4">
        <section ref={generalRef}>
          <h2 className="mb-3 text-[15px] font-extrabold" style={{ color: SUB }}>
            시장 전반
          </h2>
          <GeneralGroupedList items={generalIssues} onOpen={onSetActive} />
        </section>

        <section ref={sectorRef}>
          <h2 className="mb-3 text-[15px] font-extrabold" style={{ color: SUB }}>
            섹터
          </h2>
          <SectorGroupedList items={sectorIssues} onOpen={onSetActive} />
        </section>

        <section ref={mineRef}>
          <h2 className="mb-3 text-[15px] font-extrabold" style={{ color: SUB }}>
            내 종목
          </h2>
          <MineGroupedList items={mineIssues} onOpen={onSetActive} />
        </section>
      </div>
    </>
  );
}

function IssueItem({
  issue,
  onOpen,
}: {
  issue: Issue;
  onOpen?: (issue: Issue) => void;
}) {
  const dotColor =
    issue.sentiment === "positive"
      ? UP
      : issue.sentiment === "negative"
        ? DOWN
        : SUB;
  const sentimentLabel =
    issue.sentiment === "positive"
      ? "긍정"
      : issue.sentiment === "negative"
        ? "부정"
        : issue.sentiment === "neutral"
          ? "중립"
          : null;
  const visibleSymbols = issue.symbols?.slice(0, 3) ?? [];
  const hiddenSymbolCount = (issue.symbols?.length ?? 0) - visibleSymbols.length;

  return (
    <li
      className="overflow-hidden rounded-[22px]"
      style={{ background: SURFACE, boxShadow: SHADOW }}
    >
      <button
        type="button"
        onClick={() => onOpen?.(issue)}
        className="block w-full p-4 text-left active:opacity-70"
      >
        <div className="mb-1.5 flex items-center justify-between">
          <TierStars tier={issue.tier} />
          <span className="text-[11px]" style={{ color: SUB }}>
            {issue.time}
          </span>
        </div>
        <p
          className="text-[14.5px] font-bold leading-snug"
          style={{ color: TEXT }}
        >
          {issue.title}
        </p>
        {issue.summary && (
          <p
            className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed"
            style={{ color: SUB }}
          >
            {issue.summary}
          </p>
        )}
        {visibleSymbols.length > 0 && (
          <div className="mt-2.5 flex flex-wrap items-center gap-1">
            {visibleSymbols.map((sym) => (
              <span
                key={sym}
                className="rounded-md px-1.5 py-0.5 text-[10.5px] font-bold"
                style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
              >
                {sym}
              </span>
            ))}
            {hiddenSymbolCount > 0 && (
              <span
                className="text-[10.5px] font-bold"
                style={{ color: SUB }}
              >
                +{hiddenSymbolCount}
              </span>
            )}
          </div>
        )}
        {(sentimentLabel || issue.newsCount) && (
          <div
            className="mt-2.5 flex items-center gap-1.5 text-[11px]"
            style={{ color: SUB }}
          >
            {sentimentLabel && (
              <>
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: dotColor }}
                />
                <span>{sentimentLabel}</span>
              </>
            )}
            {sentimentLabel && issue.newsCount ? <span>·</span> : null}
            {issue.newsCount ? <span>관련 뉴스 {issue.newsCount}건</span> : null}
          </div>
        )}
      </button>
    </li>
  );
}

function GeneralGroupedList({
  items,
  onOpen,
}: {
  items: Issue[];
  onOpen?: (issue: Issue) => void;
}) {
  const order = (Object.keys(GENERAL_META) as GeneralTopic[]).filter((topic) =>
    items.some((i) => i.topic === topic),
  );
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggle = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  if (order.length === 0) {
    return (
      <p
        className="rounded-[22px] px-5 py-8 text-center text-[13px]"
        style={{ background: SURFACE, boxShadow: SHADOW, color: SUB }}
      >
        시장 전반 이슈가 아직 없어요
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {order.map((topic) => {
        const topicIssues = items.filter((i) => i.topic === topic);
        const meta = GENERAL_META[topic];
        const isCollapsed = collapsed[topic] ?? false;
        return (
          <section key={topic}>
            <header className="mb-2 flex items-center gap-2.5 px-1">
              <span
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[14px]"
                style={{ background: ACCENT_SOFT }}
              >
                {meta.icon}
              </span>
              <span className="text-[15px] font-extrabold" style={{ color: TEXT }}>
                {meta.label}
              </span>
              <span className="ml-auto text-[11px] font-bold" style={{ color: ACCENT_DEEP }}>
                {topicIssues.length}건
              </span>
              <button
                type="button"
                onClick={() => toggle(topic)}
                aria-label={isCollapsed ? "펼치기" : "접기"}
                className="ml-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                  style={{ transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 200ms" }}
                >
                  <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </header>
            {!isCollapsed && (
              <ul className="flex flex-col gap-2">
                {topicIssues.map((i) => (
                  <IssueItem key={i.id} issue={i} onOpen={onOpen} />
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}

function SectorGroupedList({
  items,
  onOpen,
}: {
  items: Issue[];
  onOpen?: (issue: Issue) => void;
}) {
  // SECTOR_META 정의 순서를 따르되, 메타에 없는 섹터가 있어도 누락 없이 뒤에 붙임
  const known = Object.keys(SECTOR_META);
  const seen = new Set<string>();
  const order: string[] = [];
  for (const key of known) {
    if (items.some((i) => i.sector === key)) {
      order.push(key);
      seen.add(key);
    }
  }
  for (const i of items) {
    if (i.sector && !seen.has(i.sector)) {
      order.push(i.sector);
      seen.add(i.sector);
    }
  }
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggle = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  if (order.length === 0) {
    return (
      <p
        className="rounded-[22px] px-5 py-8 text-center text-[13px]"
        style={{ background: SURFACE, boxShadow: SHADOW, color: SUB }}
      >
        섹터 이슈가 아직 없어요
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {order.map((sector) => {
        const sectorIssues = items.filter((i) => i.sector === sector);
        const icon = SECTOR_META[sector]?.icon ?? "📊";
        const isCollapsed = collapsed[sector] ?? false;
        return (
          <section key={sector}>
            <header className="mb-2 flex items-center gap-2.5 px-1">
              <span
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[14px]"
                style={{ background: ACCENT_SOFT }}
              >
                {icon}
              </span>
              <span className="text-[15px] font-extrabold" style={{ color: TEXT }}>
                {sector}
              </span>
              <span className="ml-auto text-[11px] font-bold" style={{ color: ACCENT_DEEP }}>
                {sectorIssues.length}건
              </span>
              <button
                type="button"
                onClick={() => toggle(sector)}
                aria-label={isCollapsed ? "펼치기" : "접기"}
                className="ml-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                  style={{ transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 200ms" }}
                >
                  <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </header>
            {!isCollapsed && (
              <ul className="flex flex-col gap-2">
                {sectorIssues.map((i) => (
                  <IssueItem key={i.id} issue={i} onOpen={onOpen} />
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}



function MineGroupedList({
  items,
  onOpen,
}: {
  items: Issue[];
  onOpen?: (issue: Issue) => void;
}) {
  const groups = watchlist
    .map((stock) => ({
      stock,
      issues: items.filter((i) => i.symbol === stock.symbol),
    }))
    .filter((g) => g.issues.length > 0);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggle = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  if (groups.length === 0) {
    return (
      <p
        className="rounded-[22px] px-5 py-8 text-center text-[13px]"
        style={{ background: SURFACE, boxShadow: SHADOW, color: SUB }}
      >
        관심 종목 이슈가 아직 없어요
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {groups.map(({ stock, issues }) => {
        const isCollapsed = collapsed[stock.symbol] ?? false;
        return (
          <section key={stock.symbol}>
            <header className="mb-2 flex items-center gap-2.5 px-1">
              <StockLogo symbol={stock.symbol} size={28} />
              <div className="flex items-baseline gap-1.5">
                <span className="text-[15px] font-extrabold" style={{ color: TEXT }}>
                  {stock.name}
                </span>
                <span className="text-[11px]" style={{ color: SUB }}>
                  {stock.symbol}
                </span>
              </div>
              <span className="ml-auto text-[11px] font-bold" style={{ color: ACCENT_DEEP }}>
                {issues.length}건
              </span>
              <button
                type="button"
                onClick={() => toggle(stock.symbol)}
                aria-label={isCollapsed ? "펼치기" : "접기"}
                className="ml-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                  style={{ transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 200ms" }}
                >
                  <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </header>
            {!isCollapsed && (
              <ul className="flex flex-col gap-2">
                {issues.map((i) => (
                  <IssueItem key={i.id} issue={i} onOpen={onOpen} />
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}

function StocksScreen({ onSelectStock }: { onSelectStock: (symbol: string) => void }) {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();
  const filtered = trimmed
    ? watchlist.filter(
        (s) =>
          s.name.includes(trimmed) ||
          s.symbol.toLowerCase().includes(trimmed.toLowerCase()),
      )
    : watchlist;

  return (
    <div className="px-5 pt-4">
      <h1 className="mb-3 text-[20px] font-extrabold" style={{ color: TEXT }}>
        종목 검색
      </h1>
      <input
        type="search"
        placeholder="종목명·티커 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-5 w-full rounded-xl px-4 py-3 text-[14px] outline-none"
        style={{ background: SURFACE, boxShadow: SHADOW, color: TEXT }}
      />
      <div className="mb-2 text-[12px] font-bold" style={{ color: SUB }}>
        {trimmed ? `"${trimmed}" 검색 결과 ${filtered.length}개` : "최근 본 종목"}
      </div>
      {filtered.length === 0 ? (
        <p
          className="rounded-[22px] px-5 py-8 text-center text-[13px]"
          style={{ background: SURFACE, boxShadow: SHADOW, color: SUB }}
        >
          검색 결과가 없어요
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {filtered.map((s) => (
            <li
              key={s.symbol}
              className="rounded-[22px]"
              style={{ background: SURFACE, boxShadow: SHADOW }}
            >
              <StockRow
                stock={s}
                onClick={() => onSelectStock(s.symbol)}
                trailing={
                  <span className="text-[18px]" style={{ color: SUB }}>
                    ☆
                  </span>
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StockDetail({ symbol, onBack }: { symbol: string; onBack: () => void }) {
  const d = stockDetailsMap[symbol] || stockDetailsMap["AAPL"];
  const [showScores, setShowScores] = useState(false);
  if (showScores) {
    return <StockScoresScreen d={d} onBack={() => setShowScores(false)} />;
  }
  return (
    <StockDetailMain d={d} onBack={onBack} onSeeScores={() => setShowScores(true)} />
  );
}

function StockDetailMain({
  d,
  onBack,
  onSeeScores,
}: {
  d: EduStockDetail;
  onBack: () => void;
  onSeeScores: () => void;
}) {
  const [pricePeriod, setPricePeriod] = useState<EduPeriodKey>("1M");
  const [animCharts, setAnimCharts] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimCharts(true), 200); return () => clearTimeout(t); }, []);
  const totalScore = Math.round(d.scoreDetails.reduce((s, a) => s + a.score, 0) / d.scoreDetails.length);

  return (
    <div className="px-5 pt-2">
      <button
        type="button"
        onClick={onBack}
        className="mb-3 -ml-1 px-1 text-[14px] font-medium"
        style={{ color: SUB }}
      >
        ← 뒤로
      </button>

      <div className="mb-1 flex items-baseline gap-2">
        <h1 className="text-[24px] font-extrabold" style={{ color: TEXT }}>
          {d.name}
        </h1>
        <span className="text-[12px]" style={{ color: SUB }}>
          {d.symbol}
        </span>
      </div>
      <div className="mb-5 flex items-baseline gap-2">
        <span
          className="text-[28px] font-extrabold"
          style={{ color: TEXT, fontVariantNumeric: "tabular-nums" }}
        >
          ${d.price}
        </span>
        <span className="text-[14px] font-bold">
          <PriceChange change={d.change} />
        </span>
      </div>

      {/* 인터랙티브 주가 차트 */}
      <div className="mb-4 rounded-[22px] p-4" style={{ background: SURFACE, boxShadow: SHADOW }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-extrabold" style={{ color: TEXT }}>📈 주가 추이</span>
          <div className="flex gap-1">
            {EDU_PERIODS.map((p) => (
              <button key={p} type="button" onClick={() => setPricePeriod(p)}
                className="rounded-lg px-2.5 py-1 text-[10px] font-bold transition-all"
                style={{ background: p === pricePeriod ? TEXT : BG, color: p === pricePeriod ? "#fff" : SUB }}
              >{p}</button>
            ))}
          </div>
        </div>
        <EduPriceChart data={d.priceHistory[pricePeriod]} period={pricePeriod} />
      </div>

      {/* 레이더 차트 */}
      <div className="mb-4 rounded-[22px] p-4" style={{ background: SURFACE, boxShadow: SHADOW }}>
        <span className="text-[13px] font-extrabold" style={{ color: TEXT }}>🎯 종합 평가 · {totalScore}점</span>
        <EduRadar scores={d.scoreDetails} animate={animCharts} />
        <button
          type="button"
          onClick={onSeeScores}
          className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl py-3 text-[13px] font-bold"
          style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
        >
          자세히 보기 →
        </button>
      </div>



      {d.kgNetwork && (
        <StockKGNetworkGraph data={d.kgNetwork} baseSymbol={d.symbol} />
      )}
      {d.kgFlows && d.kgFlows.length > 0 && !d.kgNetwork && (
        <StockKGChain flows={d.kgFlows} />
      )}


    </div>
  );
}

// ───── KG 흐름 연쇄 컴포넌트 ─────────────────────────────
function StockKGChain({ flows }: { flows: StockKGFlow[] }) {
  if (!flows || flows.length === 0) return null;
  return (
    <div className="mb-6 rounded-[22px] p-5" style={{ background: SURFACE, boxShadow: SHADOW }}>
      <h2 className="mb-4 text-[15px] font-extrabold flex items-center gap-2" style={{ color: TEXT }}>
        <span style={{ fontSize: 16 }}>🔗</span> 파급효과 시나리오
      </h2>
      <div className="flex flex-col gap-6">
        {flows.map((flow, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div>
              <div className="text-[13.5px] font-extrabold mb-1" style={{ color: TEXT }}>{flow.title}</div>
              <div className="text-[12px] leading-relaxed" style={{ color: SUB }}>{flow.scenario}</div>
            </div>
            <div className="flex flex-col gap-2">
              {flow.steps.map((step, si) => (
                <div key={si} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full mt-1.5" style={{ background: step.polarity === 'positive' ? UP : step.polarity === 'negative' ? DOWN : SUB }} />
                    {si < flow.steps.length - 1 && <div className="w-[1.5px] h-full min-h-6 my-1 rounded-full" style={{ background: LINE }} />}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[13px] font-extrabold" style={{ color: step.polarity === 'positive' ? UP : step.polarity === 'negative' ? DOWN : TEXT }}>{step.label}</span>
                      {step.sublabel && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}>{step.sublabel}</span>}
                    </div>
                    <div className="text-[12px] leading-relaxed" style={{ color: SUB }}>{step.desc}</div>
                    {step.relation && (
                      <div className="mt-2 text-[11px] font-bold flex items-center gap-1" style={{ color: TEXT }}>
                        <span style={{ color: SUB }}>↳</span> {step.relation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {flow.learningPoint && (
              <div className="rounded-xl p-3" style={{ background: HERO, color: TEXT }}>
                <div className="text-[11px] font-extrabold mb-1 flex items-center gap-1.5" style={{ color: ACCENT_DEEP }}>
                  💡 학습 포인트
                </div>
                <div className="text-[12px] leading-relaxed">{flow.learningPoint}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ───── Full KG Relation Graph (ported from mobile_stock_relation_detail_real.html) ─────

const KG_CAT_META: Record<string, { color: string; kicker: string; title: string; copy: string }> = {
  supply:      { color: "#3f73d8", kicker: "공급망", title: "의존하는 핵심 부품·생산 파트너",
    copy: "제품이 만들어지려면 이 공급사들이 필요해요. 공급망 뉴스는 출시 일정과 원가를 흔드는 신호로 읽으면 좋아요." },
  demand:      { color: "#169b5f", kicker: "수요",   title: "돈이 들어오는 고객",
    copy: "이 고객들이 매출을 받쳐줘요. 수요가 살아있는지, 한 곳에 쏠려 있지는 않은지 보는 입구예요." },
  competition: { color: "#8e6be8", kicker: "경쟁",   title: "같은 시장을 두고 싸우는 대상",
    copy: "경쟁사가 치고 나오면 점유율과 프리미엄이 시험받아요. 절대 수치보다 방향성이 중요해요." },
  risk:        { color: "#e24646", kicker: "리스크",  title: "가격을 흔드는 약한 고리",
    copy: "규제·비용·수요처럼 나쁜 뉴스의 입구예요. 노출이 큰 곳부터 먼저 확인하는 습관을 들이세요." },
  partner:     { color: "#f2b63b", kicker: "파트너십", title: "함께 가는 협력 관계",
    copy: "투자·공동개발로 엮인 관계예요. 새 기능이 실제 매출로 이어질지 보는 단서로 쓰면 좋아요." },
};

type KGRel = { o: string; n: number; tier: string; sub?: string; ko: string; en: string };
type KGStockData = {
  name: string; ticker: string;
  counts: Record<string, number>;
  interp: string;
  rels: Record<string, KGRel[]>;
};

const KG_STOCKS: Record<string, KGStockData> = {
  NVDA: {
    name: "엔비디아", ticker: "NVDA",
    counts: { supply: 13, demand: 39, competition: 12, risk: 13, partner: 67 },
    interp: "엔비디아는 AI 칩 생태계의 한가운데예요. 칩을 사가는 고객(클라우드·AI 기업)이 압도적으로 많고, 공급은 메모리(HBM)와 파운드리(TSMC)에 의존해요. 리스크는 대부분 중국 수출 규제 한 곳에 몰려 있어요.",
    rels: {
      supply: [
        { o: "SK hynix", n: 8, tier: "B", ko: "이번 협력은 NVIDIA의 AI 인프라 로드맵에 맞춰 메모리 공급을 강화하고, AI 기술을 접목해 반도체 설계·제조의 발전을 앞당길 것으로 보인다.", en: "This collaboration is set to enhance memory supply aligned with NVIDIA's AI infrastructure roadmap." },
        { o: "MU", n: 6, tier: "S", ko: "3대 HBM4 메모리 공급사(삼성, SK하이닉스, 마이크론)가 모두 품질 인증을 통과하고 출하 중이다.", en: "all three major HBM4 memory suppliers (Samsung, SK Hynix, and Micron) qualified and shipping" },
        { o: "TSM", n: 6, tier: "S", ko: "엔비디아의 주요 공급사인 TSMC가 미국 애리조나주에 공장을 짓기 위해 1,650억 달러를 투자하고 있다.", en: "TSMC, a major supplier to Nvidia, is investing $165 billion to build factories in the U.S. state of Arizona." },
        { o: "SK Hynix", n: 4, tier: "B", ko: "3대 HBM4 메모리 공급사(삼성, SK하이닉스, 마이크론)가 모두 품질 인증을 통과하고 출하 중이다.", en: "all three major HBM4 memory suppliers (Samsung, SK Hynix, and Micron) qualified and shipping" },
        { o: "A000660", n: 2, tier: "B", ko: "SK하이닉스와 NVIDIA가 AI 컴퓨팅 플랫폼용 차세대 메모리에 초점을 맞춘 다년간의 기술 파트너십에 합의했다.", en: "SK hynix and NVIDIA have agreed a multiyear technology partnership focused on next generation memory for AI computing platforms." },
        { o: "INTC", n: 2, tier: "B", ko: "구글과 NVIDIA가 인텔을 보조 AI 칩 파운드리(위탁 생산처)로 선택하고 있다.", en: "Google and NVIDIA are choosing Intel as a backup AI chip foundry." },
      ],
      demand: [
        { o: "AAPL", n: 6, tier: "B", ko: "애플은 처음부터 새로 만드는 대신, 엔비디아 및 알파벳의 구글 클라우드와 손잡고 AI 야심에 시동을 걸었다.", en: "Rather than reinvent the wheel, Apple joined forces with Nvidia and Alphabet's Google Cloud to kick-start its AI ambitions." },
        { o: "OpenAI", n: 5, tier: "B", ko: "보도에 따르면 엔비디아는 해당 시설에 하드웨어를 공급하고, OpenAI의 임대와 SB에너지의 자금 조달에 대한 재정 보증도 제공할 것으로 예상된다.", en: "Nvidia is expected to supply hardware in the facility and provide a financial guarantee for OpenAI's lease and SB Energy's financing." },
        { o: "SpaceX", n: 5, tier: "B", ko: "스페이스X는 이미 엔비디아 칩의 대형 구매자다.", en: "SpaceX is already a huge buyer of Nvidia chips." },
        { o: "DELL", n: 4, tier: "S", ko: "베라 루빈의 양산 본격화는 또 다른 의미가 있다. 엔비디아가 이미 차세대 플랫폼을 대량 출하 중임을 확인해 준다.", en: "Vera Rubin's production ramp carries a separate significance: it confirms Nvidia is already shipping its next platform at scale." },
        { o: "Nebius", n: 3, tier: "B", ko: "이번 투자에는 NVIDIA 기반의 첨단 인프라를 새로 구축하는 3건의 배치가 포함된다.", en: "The investment includes three new deployments of advanced NVIDIA-powered infrastructure." },
        { o: "ORCL", n: 3, tier: "S", ko: "오라클의 대표 제품인 제타스케일10 슈퍼클러스터는 엔비디아 하드웨어 위에 구축된다.", en: "Oracle's flagship Zettascale10 superclusters are built on Nvidia hardware" },
      ],
      competition: [
        { o: "AMD", n: 13, tier: "A", ko: "오랫동안 인텔, AMD, 퀄컴이 나눠 가져온 시장에 정면으로 진입하는 것이다.", en: "a direct push into a market long carved up by Intel, Advanced Micro Devices, and Qualcomm" },
        { o: "INTC", n: 10, tier: "A", ko: "오랫동안 인텔, AMD, 퀄컴이 나눠 가져온 시장에 정면으로 진입하는 것이다.", en: "a direct push into a market long carved up by Intel, Advanced Micro Devices, and Qualcomm" },
        { o: "QCOM", n: 6, tier: "B", ko: "엔비디아가 퀄컴이 차지하려 애써온 바로 그 영역에 깃발을 꽂고 있다.", en: "Nvidia is now planting a flag on the exact ground Qualcomm has been working to claim" },
        { o: "AVGO", n: 2, tier: "B", ko: "브로드컴은 AI 작업의 업계 표준으로 군림하는 GPU를 가진 엔비디아와 경쟁한다.", en: "Broadcom races with Nvidia whose dominant graphics processing units remain the industry standard for AI workloads." },
        { o: "Cerebras", n: 1, tier: "B", ko: "세레브라스 시스템즈는 빠른 AI 분야의 잘 알려진 혁신 기업으로, 엔비디아를 바짝 위협하고 있다.", en: "Cerebras Systems, a well-known innovator in fast AI and one that is giving Nvidia a run for its money." },
      ],
      risk: [
        { o: "China", sub: "규제", n: 4, tier: "B", ko: "엔비디아는 여전히 중국에서 자사 AI 칩 판매를 재개하지 못하고 있다.", en: "Nvidia still hasn't been able to relaunch its AI chips in China." },
        { o: "TSM", sub: "비용압박", n: 2, tier: "B", ko: "TSMC는 AI 칩 제조 수요가 폭발하면서 첨단 3나노 칩 가격을 큰 폭으로 올리는 방안을 검토 중인 것으로 전해진다.", en: "TSMC is reportedly considering significant price increases for its advanced 3nm chips due to overwhelming demand." },
        { o: "Taiwan", sub: "규제", n: 2, tier: "B", ko: "대만 당국이 엔비디아 칩의 무단 수출과 연관된 문서 위조 혐의로 3명을 구금했다.", en: "Taiwanese authorities have detained three individuals in connection with allegations of document forgery linked to the unauthorized export of NVIDIA chips." },
        { o: "U.S. Commerce", sub: "규제", n: 2, tier: "B", ko: "미국 상무부가 엔비디아 루빈·블랙웰 프로세서를 중국계 기업에 수출할 수 있게 했던 잠재적 허점을 막기 위해 나섰다.", en: "The U.S. Department of Commerce has moved to close a potential loophole that may have allowed companies to export Nvidia's Rubin and Blackwell processors to Chinese entities." },
        { o: "AI hyperscalers", sub: "노출", n: 1, tier: "B", ko: "엔비디아는 늘 최고의 기술을 시장에 내놨지만, 내년 데이터센터 건설에 얼마를 쓸지는 AI 하이퍼스케일러들의 결정에 달려 있다.", en: "Nvidia has consistently brought the best technology to market, and it's up to the AI hyperscalers to decide how much money they are willing to spend next year on data center construction." },
      ],
      partner: [
        { o: "MSFT", sub: "영향", n: 7, tier: "B", ko: "엔비디아는 마이크로소프트와 함께 윈도우 에이전트 플랫폼을 개발하고 있다.", en: "Nvidia is working with Microsoft on the Windows-agent platform" },
        { o: "INTC", sub: "영향", n: 6, tier: "B", ko: "엔비디아가 50억 달러 규모의 지분을 인수했고, 소프트뱅크는 20억 달러 투자에 합의했다.", en: "Nvidia acquired a $5 billion equity stake; SoftBank agreed to invest $2 billion." },
        { o: "MRVL", sub: "영향", n: 6, tier: "B", ko: "엔비디아와 마벨은 엔비디아가 이 반도체 기업에 20억 달러를 투자하는 내용을 포함한 전략적 파트너십을 발표했다.", en: "Nvidia and Marvell announced a strategic partnership that included a $2 billion investment from Nvidia into the semiconductor company." },
        { o: "Taiwan", sub: "영향", n: 5, tier: "B", ko: "엔비디아 CEO는 대만을 AI 혁명의 '진앙지'라 부르며 매년 약 1,500억 달러를 대만에 투자할 계획이라고 밝혔다.", en: "Nvidia's CEO said the chip company plans to invest around $150 billion a year in Taiwan, terming it the 'epicentre' of the AI revolution." },
        { o: "COHR", sub: "영향", n: 4, tier: "B", ko: "엔비디아의 20억 달러 투자 파트너십으로, AI 데이터센터용 광학 분야에서 코히런트의 확장을 뒷받침한다.", en: "Nvidia's US$2.0 billion investment partnership backs Coherent's expansion in indium phosphide optics for AI data centers." },
        { o: "RTX Spark", sub: "견인", n: 4, tier: "B", ko: "엔비디아가 타이베이 컴퓨텍스 박람회에서 신제품 RTX 스파크 슈퍼칩을 공개하며 PC 시장에 공식 진입했다.", en: "NVIDIA launched its new RTX Spark superchip at the Computex technology show in Taipei, officially entering the PC market." },
      ],
    },
  },
  TSLA: {
    name: "테슬라", ticker: "TSLA",
    counts: { supply: 1, demand: 1, competition: 6, risk: 4, partner: 12 },
    interp: "테슬라는 전기차에서 로보틱스·자율주행으로 경쟁 축이 넓어지고 있어요. 칩은 엔비디아에 기대고, 리스크는 머스크의 다른 회사들(스페이스X·xAI)과 얽힌 지분 노출에 몰려 있어요.",
    rels: {
      supply: [{ o: "NVDA", n: 1, tier: "B", ko: "머스크조차 자신의 회사들이 당분간 엔비디아 제품을 대규모로 계속 구매할 것이라고 인정한다.", en: "even Musk admits that his companies -- SpaceX, Tesla, and xAI -- will continue to buy Nvidia's products at scale for the foreseeable future." }],
      demand: [{ o: "xAI", n: 1, tier: "B", ko: "테슬라는 2025년 xAI에 5억 600만 달러어치의 메가팩 배터리를 팔았다.", en: "Tesla sold $506 million in Megapack batteries to xAI in 2025." }],
      competition: [
        { o: "RIVN", n: 3, tier: "B", ko: "전기차 제조사 리비안이 더 저렴한 SUV 인도를 시작했다. 테슬라 등에서 고객을 빼앗으려는 노림수다.", en: "Electric-vehicle maker Rivian began delivery of a cheaper SUV as it aims to take customers from Tesla and others." },
        { o: "BYD", n: 2, tier: "B", ko: "테슬라가 2026년 1분기에 BYD를 제치고 글로벌 순수전기차 시장 1위를 되찾았다.", en: "Tesla reclaims the global BEV market lead in Q1 2026, overtaking BYD despite modest industry growth." },
        { o: "OpenAI Robotics", n: 2, tier: "B", ko: "OpenAI가 로보틱스에 진출하면서 테슬라의 옵티머스가 새로운 위협에 직면했다.", en: "Tesla's Optimus faces new threat as OpenAI enters robotics" },
        { o: "NVDA", n: 1, tier: "B", ko: "테슬라의 휴머노이드 로봇·자율주행 야심이 더 거센 경쟁에 부딪혔다.", en: "Tesla's humanoid robotics and autonomy ambitions face sharper competition as OpenAI launches a robotics division and Nvidia expands its robotics platforms." },
        { o: "Waymo", n: 1, tier: "B", ko: "웨이모는 미국에서 테슬라에 대한 우위를 굳히려 차량을 늘리고 있다.", en: "Waymo expands its fleet in an effort to cement its lead in the U.S. over Tesla." },
      ],
      risk: [
        { o: "Intel 14A", sub: "노출", n: 1, tier: "B", ko: "테슬라는 오스틴의 테라팹 AI 칩 프로젝트에 인텔 14A 공정을 사용하기로 약속했다.", en: "Tesla committed in April to use Intel's 14A process for its Terafab AI chip project in Austin." },
        { o: "SPCX", sub: "노출", n: 1, tier: "B", ko: "테슬라는 xAI가 스페이스X에 인수되기 전 xAI에 20억 달러를 투자했고, 그 지분 덕분에 스페이스X의 주주가 되었다.", en: "Tesla had invested $2 billion in xAI before it was acquired by SpaceX." },
      ],
      partner: [
        { o: "SpaceX IPO", sub: "영향", n: 2, tier: "B", ko: "스페이스X IPO가 다가오며 투자자들이 테슬라를 팔고 있다는 분석이 나온다.", en: "TSLA Stock Sinks As SpaceX IPO Nears — Analyst Says Investors Are Selling Tesla To Catch A Day-1 Pop In Next Musk Trade" },
        { o: "China", sub: "영향", n: 1, tier: "B", ko: "테슬라는 중국에서 판매되는 자사 전기차에 '완전자율주행(FSD)' 기능을 이제 이용할 수 있다고 발표했다.", en: "Tesla announced that its 'Full Self-Driving' capabilities are now available for its electric vehicles sold in China." },
        { o: "FSD", sub: "영향", n: 1, tier: "B", ko: "테슬라가 2026년 1분기에 처음으로 FSD(완전자율주행) 구독 데이터를 공개했다.", en: "Tesla's disclosure of FSD subscription data for the first time in the first quarter of 2026" },
      ],
    },
  },
};

function kgStrength(n: number): [string, string] {
  if (n >= 5) return ["견고", "#169b5f"];
  if (n >= 3) return ["보통", "#d39200"];
  return ["약함", "#e07b3a"];
}

function StockKGNetworkGraph({ baseSymbol }: { data?: any; baseSymbol: string }) {
  const stockKey = Object.keys(KG_STOCKS).find(k => k === baseSymbol) ?? "NVDA";
  const stock = KG_STOCKS[stockKey] ?? KG_STOCKS["NVDA"];
  const [curCat, setCurCat] = useState("demand");
  const [openQuote, setOpenQuote] = useState<number | null>(null);
  const [openEn, setOpenEn] = useState<number | null>(null);

  const meta = KG_CAT_META[curCat];
  const rels = stock.rels[curCat] ?? [];
  const total = Object.values(stock.counts).reduce((a, b) => a + b, 0);
  const subByCat: Record<string, string> = { supply: "공급사", demand: "고객", competition: "경쟁" };

  const catButtons: { key: string; label: string; sub: string }[] = [
    { key: "supply",      label: "공급망",   sub: "의존하는 곳" },
    { key: "demand",      label: "수요",     sub: "돈이 오는 곳" },
    { key: "competition", label: "경쟁",     sub: "뺏고 뺏기는 곳" },
    { key: "risk",        label: "리스크",   sub: "흔드는 곳" },
    { key: "partner",     label: "파트너십", sub: "함께 가는 곳" },
  ];

  const svgArrows: { path: string; stroke: string; markerId: string }[] = [
    { path: "M205 64 C205 82 205 95 205 109", stroke: "#3f73d8", markerId: "arrow-supply2" },
    { path: "M268 114 C260 122 252 131 244 137", stroke: "#169b5f", markerId: "arrow-demand2" },
    { path: "M142 114 C150 122 158 131 166 137", stroke: "#e24646", markerId: "arrow-risk2" },
    { path: "M157 217 C166 204 174 193 181 183", stroke: "#8e6be8", markerId: "arrow-competition2" },
    { path: "M253 217 C244 205 236 194 229 183", stroke: "#f2b63b", markerId: "arrow-partner2" },
  ];

  return (
    <div className="mb-6" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Pretendard', 'Apple SD Gothic Neo', sans-serif" }}>
      {/* 섹션 헤더 */}
      <div className="flex items-end justify-between gap-3 mb-3">
        <h2 className="text-[18px] font-extrabold tracking-tight m-0" style={{ color: TEXT }}>
          {stock.name}를 움직이는 관계
        </h2>
        <span className="text-[12px] font-bold" style={{ color: SUB }}>KG 관계 {total}개</span>
      </div>

      {/* 관계 카드 */}
      <div className="rounded-[22px] mb-3" style={{ background: SURFACE, boxShadow: SHADOW, padding: "16px 16px 14px", overflow: "hidden" }}>
        {/* 범례 헤더 */}
        <div className="flex items-center justify-between mb-3">
          <strong className="text-[15px] font-extrabold" style={{ color: TEXT }}>KG 관계 타입으로 보기</strong>
          <div className="flex items-center gap-[7px] text-[11px] font-bold" style={{ color: "#7d7d7d" }}>
            <span className="flex items-center gap-[5px]"><i className="w-[7px] h-[7px] rounded-full inline-block" style={{ background: "#3f73d8" }}/> 공급</span>
            <span className="flex items-center gap-[5px]"><i className="w-[7px] h-[7px] rounded-full inline-block" style={{ background: "#e24646" }}/> 리스크</span>
          </div>
        </div>

        {/* 관계망 SVG + 버튼 */}
        <div className="relative rounded-[18px] overflow-hidden" style={{ height: 300, background: "radial-gradient(circle at 50% 50%, rgba(255, 90, 52, 0.15), transparent 31%), linear-gradient(180deg, #fffaf7 0%, #ffffff 62%, #fbfaf7 100%)", border: "1px solid #f2ede8" }}>
          <svg viewBox="0 0 410 300" aria-hidden="true" className="absolute inset-0 w-full h-full">
            <defs>
              {svgArrows.map(a => (
                <marker key={a.markerId} id={a.markerId} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M0 0 L8 4 L0 8 Z" fill={a.stroke}/>
                </marker>
              ))}
            </defs>
            {svgArrows.map((a, i) => (
              <path key={i} d={a.path} fill="none" stroke={a.stroke} strokeWidth="3" strokeLinecap="round" markerEnd={`url(#${a.markerId})`}/>
            ))}
          </svg>

          {/* 중심 노드 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center rounded-full z-10"
            style={{ width: 82, height: 82, background: ACCENT, border: `1px solid ${ACCENT}`, color: "#fff", boxShadow: "0 16px 30px rgba(255, 90, 52, 0.28)", fontSize: 18, fontWeight: 800, lineHeight: 1.18 }}>
            {baseSymbol}
            <small style={{ display: "block", marginTop: 2, color: "rgba(255,255,255,0.78)", fontSize: 9, fontWeight: 750 }}>중심</small>
          </div>

          {/* 카테고리 버튼들 */}
          {catButtons.map((cat) => {
            const catMeta = KG_CAT_META[cat.key];
            const isActive = curCat === cat.key;
            const positions: Record<string, { left: string; top: string }> = {
              supply:      { left: "50%",   top: "10.7%" },
              demand:      { left: "77.3%", top: "37.8%" },
              competition: { left: "33.1%", top: "81.8%" },
              risk:        { left: "22.7%", top: "37.8%" },
              partner:     { left: "66.9%", top: "81.8%" },
            };
            const pos = positions[cat.key];
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => { setCurCat(cat.key); setOpenQuote(null); setOpenEn(null); }}
                className="absolute flex flex-col items-center justify-center text-center"
                style={{
                  left: pos.left, top: pos.top,
                  transform: "translate(-50%, -50%)",
                  width: 92, minHeight: 58,
                  borderRadius: 18,
                  padding: "9px 8px",
                  gap: 2,
                  fontSize: 13, fontWeight: 850, lineHeight: 1.15,
                  zIndex: 2,
                  cursor: "pointer",
                  border: `1px solid ${isActive ? catMeta.color : "#ece8e2"}`,
                  background: isActive ? catMeta.color : "#fff",
                  color: isActive ? "#fff" : "#171717",
                  boxShadow: isActive ? `0 14px 26px rgba(0,0,0,0.18)` : "0 9px 22px rgba(34, 28, 18, 0.08)",
                  transition: "all 150ms",
                }}
              >
                <b style={{ fontSize: 13, fontWeight: 850 }}>{cat.label}</b>
                <span style={{ color: isActive ? "rgba(255,255,255,0.82)" : "#b0b0b0", fontSize: 10, fontWeight: 850 }}>
                  {stock.counts[cat.key]}
                </span>
                <small style={{ color: isActive ? "rgba(255,255,255,0.82)" : "#8a8a8a", fontSize: 9, fontWeight: 750 }}>{cat.sub}</small>
              </button>
            );
          })}
        </div>

        {/* 상세 패널 */}
        <div className="mt-[10px] rounded-[18px] p-[14px]" style={{ border: "1px solid #f0ede7", background: "#faf9f6", "--rel-color": meta.color } as React.CSSProperties}>
          <div className="inline-flex items-center gap-[6px] mb-[8px] text-[12px] font-[850]" style={{ color: meta.color }}>
            <i className="w-[8px] h-[8px] rounded-full inline-block" style={{ background: "currentColor" }}/>
            {meta.kicker} · {stock.counts[curCat]}개 관계{stock.counts[curCat] > rels.length ? ` (견고도 상위 ${rels.length})` : ""}
          </div>
          <h3 className="m-0 mb-[6px] text-[16px] font-extrabold" style={{ color: TEXT }}>{meta.title}</h3>
          <p className="m-0 text-[13px] leading-[1.55]" style={{ color: "#707070" }}>{meta.copy}</p>

          {/* 관계 리스트 */}
          <div className="mt-[12px] flex flex-col gap-[7px]">
            {rels.length === 0 ? (
              <div className="text-[12.5px] leading-[1.6] py-[6px] px-[2px]" style={{ color: "#9a9a9a" }}>아직 이 타입으로 쌓인 KG 관계가 없어요.</div>
            ) : rels.map((rel, idx) => {
              const [slabel, scol] = kgStrength(rel.n);
              const sub = rel.sub ?? subByCat[curCat] ?? "";
              const isOpen = openQuote === idx;
              const isEnOpen = openEn === idx;
              return (
                <div key={idx}>
                  <button
                    type="button"
                    onClick={() => { setOpenQuote(isOpen ? null : idx); setOpenEn(null); }}
                    className="w-full text-left rounded-[12px] flex items-center justify-between gap-[8px] p-[10px_11px]"
                    style={{ background: "#fff", border: "1px solid #efebe5" }}
                  >
                    <span className="flex items-baseline gap-[7px] min-w-0">
                      <span className="text-[12.5px] font-[850] whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: "#1a1a1a" }}>{rel.o}</span>
                      <span className="text-[10.5px] font-[760]" style={{ color: "#9a9a9a" }}>{sub}</span>
                    </span>
                    <span className="flex items-center gap-[7px] flex-none">
                      <span className="text-[11px] font-[850]" style={{ color: scol }}>{slabel}·{rel.n}건</span>
                      <span className="text-[10px]" style={{ color: "#c2c2c2", transition: "transform 0.16s", transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="rounded-[12px] p-[11px_12px] mt-[-2px]" style={{ background: "#fff", border: "1px solid #efebe5" }}>
                      <p className="m-0 text-[12.5px] leading-[1.62]" style={{ color: "#5f5f5f" }}>{rel.ko}</p>
                      <button
                        type="button"
                        onClick={() => setOpenEn(isEnOpen ? null : idx)}
                        className="mt-[9px] bg-transparent border-0 text-[11px] font-[800] p-0 cursor-pointer"
                        style={{ color: "#d83812" }}
                      >
                        {isEnOpen ? "영어 원문 닫기 ▴" : "영어 원문 ▾"}
                      </button>
                      {isEnOpen && (
                        <div className="mt-[7px] text-[11.5px] leading-[1.55] italic pl-[9px]" style={{ color: "#8d8d8d", display: "block", borderLeft: "2px solid #ece8e2" }}>
                          &ldquo;{rel.en}&rdquo;
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 오늘의 해석 카드 */}
      <div className="flex items-start gap-[12px] rounded-[18px] p-[16px] mb-6" style={{ background: SURFACE, boxShadow: SHADOW }}>
        <div className="flex-shrink-0 w-[34px] h-[34px] flex items-center justify-center rounded-[11px] font-[900] text-[16px]"
          style={{ background: "#fff0e9", color: "#d83812" }}>↳</div>
        <div>
          <h3 className="m-0 mb-[6px] text-[15px] font-extrabold" style={{ color: TEXT }}>오늘의 해석</h3>
          <p className="m-0 text-[13px] leading-[1.55]" style={{ color: "#707070" }}>{stock.interp}</p>
        </div>
      </div>
    </div>
  );
}



// ───── 5가지 관점 자세히 보기 ─────────────────────────────

// 이모지 대신 단색 stroke SVG — currentColor로 부모 텍스트 색상 따라감
function AxisIcon({ axisKey, size = 20 }: { axisKey: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (axisKey) {
    case "재무안정":
      return (
        <svg {...common}>
          <path d="M3 9 L12 4 L21 9" />
          <line x1="6" y1="10" x2="6" y2="17" />
          <line x1="12" y1="10" x2="12" y2="17" />
          <line x1="18" y1="10" x2="18" y2="17" />
          <line x1="3" y1="20" x2="21" y2="20" />
        </svg>
      );
    case "성장성":
      return (
        <svg {...common}>
          <polyline points="4 17 10 11 14 14 20 7" />
          <polyline points="14 7 20 7 20 13" />
        </svg>
      );
    case "수익성":
      return (
        <svg {...common}>
          <line x1="19" y1="5" x2="5" y2="19" />
          <circle cx="7" cy="7" r="2.2" />
          <circle cx="17" cy="17" r="2.2" />
        </svg>
      );
    case "해자":
      return (
        <svg {...common}>
          <path d="M12 3 L4 6 V12 C4 16 7 19 12 21 C17 19 20 16 20 12 V6 Z" />
        </svg>
      );
    case "저평가":
      return (
        <svg {...common}>
          <line x1="12" y1="5" x2="12" y2="20" />
          <line x1="4" y1="8" x2="20" y2="8" />
          <path d="M7 8 L4 14 H10 Z" />
          <path d="M17 8 L14 14 H20 Z" />
          <line x1="9" y1="20" x2="15" y2="20" />
        </svg>
      );
  }
  return null;
}

function MyScreen({ onSelectStock }: { onSelectStock: (symbol: string) => void }) {
  const recentIssues = issueList.slice(0, 3);
  return (
    <div className="px-5 pt-4">
      {/* 프로필 히어로 */}
      <div
        className="mb-6 flex flex-col items-center rounded-[28px] p-6"
        style={{ background: HERO, boxShadow: SHADOW_HERO }}
      >
        <Mascot size={140} withPencil />
        <div
          className="mt-3 rounded-full px-3 py-1 text-[12px] font-bold"
          style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
        >
          🔥 7일 연속 학습 중
        </div>
        <div className="mt-3 text-[15px] font-bold" style={{ color: TEXT }}>
          오늘도 보러 와줘서 고마워
        </div>
        <div className="mt-1 text-[12.5px]" style={{ color: SUB }}>
          이 속도면 한 달 안에 시장 보는 눈 생겨
        </div>
      </div>

      {/* 학습 통계 */}
      <SectionHeader title="학습 통계" />
      <div
        className="mb-6 grid grid-cols-3 gap-2"
      >
        <Stat label="이번 주" value="5일" />
        <Stat label="총 학습 이슈" value="42건" />
        <Stat label="연속 일수" value="7일" />
      </div>

      {/* 최근 학습 이슈 */}
      <SectionHeader title="최근 학습한 이슈" />
      <ul
        className="mb-6 overflow-hidden rounded-[22px]"
        style={{ background: SURFACE, boxShadow: SHADOW }}
      >
        {recentIssues.map((issue, i) => (
          <li key={issue.id}>
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderTop: i > 0 ? `1px solid ${LINE}` : "none" }}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold"
                style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
              >
                ✓
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold" style={{ color: TEXT }}>
                  {issue.title}
                </div>
                <div className="mt-0.5 text-[11px]" style={{ color: SUB }}>
                  {CATEGORY_LABEL[issue.category]} · {issue.time}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 관심 종목 관리 */}
      {/* <SectionHeader title="관심 종목 관리" />
      <ul
        className="overflow-hidden rounded-[22px]"
        style={{ background: SURFACE, boxShadow: SHADOW }}
      >
        {watchlist.map((s, i) => (
          <li key={s.symbol}>
            <StockRow
              stock={s}
              divided={i > 0}
              onClick={() => onSelectStock(s.symbol)}
              trailing={
                <div className="text-right">
                  <div
                    className="text-[14px] font-extrabold"
                    style={{ color: TEXT, fontVariantNumeric: "tabular-nums" }}
                  >
                    {s.price}
                  </div>
                  <div className="text-[12px] font-bold">
                    <PriceChange change={s.change} />
                  </div>
                </div>
              }
            />
          </li>
        ))}
      </ul> */}
    </div>
  );
}

function LineMini({
  data,
  labels,
  avg,
  unit,
}: {
  data: number[];
  labels?: string[];
  avg?: number;
  unit?: string;
}) {
  const W = 280;
  const H = 110;
  const P = 16;
  const min = Math.min(...data, ...(avg !== undefined ? [avg] : []));
  const max = Math.max(...data, ...(avg !== undefined ? [avg] : []));
  const range = max - min || 1;
  const xy = data.map(
    (v, i) =>
      [
        P + (i / (data.length - 1)) * (W - 2 * P),
        P + (1 - (v - min) / range) * (H - 2 * P),
      ] as const,
  );
  const path = xy
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ");
  const areaPath = `${path} L${xy[xy.length - 1][0]},${H - P} L${xy[0][0]},${H - P} Z`;
  const last = data[data.length - 1];
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <defs>
          <linearGradient id="line-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.3" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </linearGradient>
        </defs>
        {avg !== undefined && (
          <>
            <line
              x1={P}
              x2={W - P}
              y1={P + (1 - (avg - min) / range) * (H - 2 * P)}
              y2={P + (1 - (avg - min) / range) * (H - 2 * P)}
              stroke={SUB}
              strokeDasharray="4 4"
              strokeWidth="1"
              opacity="0.5"
            />
            <text
              x={W - P}
              y={P + (1 - (avg - min) / range) * (H - 2 * P) - 4}
              textAnchor="end"
              fontSize="9"
              fill={SUB}
              fontWeight="700"
            >
              평균 {avg}
              {unit ?? ""}
            </text>
          </>
        )}
        <path d={areaPath} fill="url(#line-fill)" />
        <path
          d={path}
          fill="none"
          stroke={ACCENT_DEEP}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {xy.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill={ACCENT_DEEP} />
        ))}
        <text
          x={xy[xy.length - 1][0]}
          y={xy[xy.length - 1][1] - 8}
          textAnchor="end"
          fontSize="10"
          fontWeight="800"
          fill={TEXT}
        >
          {last}
          {unit ?? ""}
        </text>
      </svg>
      {labels && (
        <div
          className="mt-1 flex justify-between px-1 text-[10px]"
          style={{ color: SUB }}
        >
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function BarMini({
  data,
  labels,
  unit,
}: {
  data: number[];
  labels: string[];
  unit?: string;
}) {
  const max = Math.max(...data);
  const last = data[data.length - 1];
  return (
    <div>
      <div className="flex h-[110px] items-end gap-2">
        {data.map((v, i) => {
          const h = (v / max) * 100;
          const isLast = i === data.length - 1;
          return (
            <div
              key={i}
              className="relative flex flex-1 flex-col items-center justify-end"
            >
              {isLast && (
                <span
                  className="absolute -top-1 text-[10px] font-extrabold"
                  style={{ color: TEXT }}
                >
                  {last}
                  {unit ?? ""}
                </span>
              )}
              <div
                className="w-full rounded-t-md"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(180deg, ${ACCENT}, ${ACCENT_DEEP})`,
                  minHeight: 4,
                  marginTop: 14,
                }}
              />
            </div>
          );
        })}
      </div>
      <div
        className="mt-1 flex justify-between px-1 text-[10px]"
        style={{ color: SUB }}
      >
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function ScoreChart({ chart }: { chart: AxisChart }) {
  if (chart.kind === "line") {
    return (
      <LineMini
        data={chart.data}
        labels={chart.labels}
        avg={chart.avg}
        unit={chart.unit}
      />
    );
  }
  if (chart.kind === "bar") {
    return <BarMini data={chart.data} labels={chart.labels} unit={chart.unit} />;
  }
  return null;
}

function ScoreAxisCard({ axis }: { axis: ScoreAxis }) {
  const terms = collectGlossaryTerms([{ kind: "paragraph", text: axis.desc + " " + axis.learning }]);

  return (
    <article 
      className="score-axis-card animate-fade-in pb-4" 
      key={axis.key}
    >
      <style jsx>{`
        .animate-fade-in {
          animation: scoreFadeIn 0.3s ease-out forwards;
        }
        @keyframes scoreFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header className="mb-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm"
            style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
          >
            <AxisIcon axisKey={axis.key} size={26} />
          </span>
          <div className="flex-1">
            <div className="text-[18px] font-extrabold tracking-tight" style={{ color: TEXT }}>
              {axis.key}
            </div>
          </div>
          <div
            className="flex h-12 min-w-[54px] items-center justify-center rounded-2xl px-2 text-[20px] font-black shadow-md"
            style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, #E3603B 100%)`,
              color: "#fff",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {axis.score}
          </div>
        </div>
        
        <div className="relative rounded-2xl p-4 mt-1" style={{ background: SURFACE, borderLeft: `4px solid ${ACCENT}` }}>
          <div className="text-[14px] font-bold leading-relaxed" style={{ color: TEXT }}>
            "{axis.oneLine}"
          </div>
        </div>
      </header>

      {axis.chart && (
        <section
          className="mb-6 rounded-[24px] p-4 shadow-sm"
          style={{ background: ACCENT_SOFT }}
        >
          <ScoreChart chart={axis.chart} />
        </section>
      )}

      <div className="mb-6 grid grid-cols-3 gap-3">
        {axis.indicators.map((ind) => (
          <div
            key={ind.name}
            className="flex flex-col justify-center rounded-2xl p-3 shadow-sm"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(10px)",
              border: `1px solid rgba(0,0,0,0.05)`,
            }}
          >
            <div
              className="mb-1 text-[11px] font-extrabold tracking-tight"
              style={{ color: SUB }}
            >
              {ind.name}
            </div>
            <div
              className="text-[16px] font-black tracking-tight"
              style={{ color: ACCENT_DEEP, fontVariantNumeric: "tabular-nums" }}
            >
              {ind.value}
            </div>
            {ind.note && (
              <div
                className="mt-1 text-[10px] font-medium leading-tight"
                style={{ color: SUB }}
              >
                {ind.note}
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="mb-5 flex flex-col gap-3 rounded-[24px] p-5 shadow-sm"
        style={{ background: SURFACE, border: `1px solid ${LINE}` }}
      >
        <div className="flex items-center gap-2">
          <Mascot size={28} />
          <span className="text-[12px] font-black uppercase tracking-wider" style={{ color: ACCENT_DEEP }}>
            심층 분석 (Deep Dive)
          </span>
        </div>
        <div className="text-[13.5px] leading-[1.75]" style={{ color: TEXT }}>
          <HighlightedText text={axis.desc} />
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-[24px] p-5 shadow-md"
        style={{ background: HERO, color: TEXT, border: `1px solid rgba(255, 107, 61, 0.15)` }}
      >
        <div className="absolute top-0 right-0 h-32 w-32 -translate-y-10 translate-x-10 rounded-full blur-[40px]" style={{ background: ACCENT_SOFT, opacity: 0.6 }} />
        <div className="relative z-10">
          <div
            className="mb-2 flex items-center gap-1.5 text-[12px] font-black uppercase tracking-wider"
            style={{ color: ACCENT_DEEP }}
          >
            💡 투자 인사이트
          </div>
          <div className="text-[13.5px] leading-[1.75] font-medium" style={{ color: TEXT }}>
            <HighlightedText text={axis.learning} />
          </div>
        </div>
      </div>

      {terms.length > 0 && (
        <div className="mt-6 flex flex-col gap-2">
          {terms.map((term) => (
            <div
              key={term}
              className="rounded-[16px] p-3.5 shadow-sm"
              style={{ background: SURFACE, border: `1px solid ${LINE}` }}
            >
              <div className="mb-1 text-[11.5px] font-black" style={{ color: ACCENT_DEEP }}>
                📖 {term}
              </div>
              <div className="text-[12px] leading-relaxed" style={{ color: SUB }}>
                {GLOSSARY[term]}
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function StockScoresScreen({ d, onBack }: { d: EduStockDetail; onBack: () => void }) {
  const total = Math.round(
    d.scoreDetails.reduce((s, a) => s + a.score, 0) / d.scoreDetails.length,
  );
  // 첫 진입 — 가장 점수 높은 관점을 기본 선택
  const defaultPick = d.scoreDetails.reduce((a, b) =>
    a.score >= b.score ? a : b,
  ).key;
  const [pick, setPick] = useState<string>(defaultPick);
  const visible = d.scoreDetails.find((a) => a.key === pick);
  const [animCharts, setAnimCharts] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimCharts(true), 200); return () => clearTimeout(t); }, []);

  return (
    <div className="px-5 pb-8 pt-2">
      <button
        type="button"
        onClick={onBack}
        className="mb-3 -ml-1 px-1 text-[14px] font-medium"
        style={{ color: SUB }}
      >
        ← {d.name} 상세
      </button>

      <div
        className="mb-6 relative overflow-hidden rounded-[28px] p-6 shadow-xl"
        style={{
          background: `linear-gradient(135deg, #1A1C20 0%, #0E0F11 100%)`,
          border: `1px solid rgba(255, 255, 255, 0.08)`,
        }}
      >
        <div
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-[60px]"
          style={{ background: ACCENT, opacity: 0.15 }}
        />
        <div className="relative z-10 mb-4 flex items-center gap-3">
          <StockLogo symbol={d.symbol} size={42} />
          <div>
            <div className="text-[20px] font-extrabold tracking-tight text-white">
              {d.name}
            </div>
            <div
              className="text-[12px] font-medium"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              5가지 관점 세부 분석
            </div>
          </div>
        </div>
        <div className="relative z-10 flex items-baseline gap-2">
          <span
            className="text-[48px] font-black leading-none tracking-tighter text-white"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          >
            {total}
          </span>
          <span
            className="text-[18px] font-bold"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            / 100
          </span>
          <span
            className="ml-auto rounded-full px-3 py-1.5 text-[11px] font-extrabold"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            종합 평균 스코어
          </span>
        </div>
      </div>

      {/* 매출 구성비 */}
      <div className="mb-4 rounded-[22px] p-4" style={{ background: SURFACE, boxShadow: SHADOW }}>
        <div className="mb-3 text-[13px] font-extrabold" style={{ color: TEXT }}>🍩 매출 구성비</div>
        <EduDonut segments={d.revenueBreakdown} animate={animCharts} />
      </div>

      {/* EPS 비교 */}
      <div className="mb-6 rounded-[22px] p-4" style={{ background: SURFACE, boxShadow: SHADOW }}>
        <div className="mb-1 text-[13px] font-extrabold" style={{ color: TEXT }}>💹 EPS 실적 vs 예상</div>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1"><div className="size-2 rounded-full" style={{ background: LINE }} /><span className="text-[9px]" style={{ color: SUB }}>예상</span></div>
          <div className="flex items-center gap-1"><div className="size-2 rounded-full" style={{ background: UP }} /><span className="text-[9px]" style={{ color: SUB }}>서프라이즈</span></div>
        </div>
        <EduEpsBars data={d.epsData} animate={animCharts} />
      </div>



      <div className="no-scrollbar -mx-5 mb-6 overflow-x-auto px-5">
        <div className="flex gap-2">
          {d.scoreDetails.map((axis) => {
            const active = pick === axis.key;
            return (
              <button
                key={axis.key}
                type="button"
                onClick={() => setPick(axis.key)}
                className="relative flex flex-shrink-0 items-center gap-1.5 rounded-2xl px-4 py-2.5 text-[13.5px] font-extrabold transition-all duration-300"
                style={{
                  background: active ? TEXT : SURFACE,
                  color: active ? "#fff" : SUB,
                  border: `1px solid ${active ? "transparent" : LINE}`,
                  boxShadow: active ? "0 6px 16px rgba(0,0,0,0.12)" : "none",
                  transform: active ? "scale(1.02)" : "scale(1)",
                }}
              >
                <span
                  className="flex items-center transition-colors"
                  style={{ color: active ? ACCENT : ACCENT_DEEP }}
                >
                  <AxisIcon axisKey={axis.key} size={16} />
                </span>
                <span>{axis.key}</span>
                <span
                  className="text-[12px]"
                  style={{
                    color: active ? "rgba(255,255,255,0.8)" : ACCENT_DEEP,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {axis.score}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {visible && <ScoreAxisCard axis={visible} />}
    </div>
  );
}



function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl px-3 py-3" style={{ background: ACCENT_SOFT }}>
      <div className="text-[11px]" style={{ color: SUB }}>
        {label}
      </div>
      <div
        className="mt-0.5 text-[18px] font-extrabold"
        style={{ color: TEXT, fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </div>
    </div>
  );
}

const SETTINGS_ITEMS: { label: string; danger?: boolean }[] = [
  { label: "회원 정보 수정" },
  { label: "알림 시간 설정" },
  { label: "관심 종목 관리" },
  { label: "이용 약관" },
  { label: "개인정보 처리방침" },
  { label: "버전 정보" },
  { label: "로그아웃", danger: true },
];

function SettingsScreen() {
  const handleItem = (label: string) => {
    if (label === "로그아웃") {
      if (window.confirm("로그아웃 하시겠어요?")) {
        // TODO: 로그아웃 처리
      }
    }
  };

  return (
    <div className="px-5 pt-4">
      <h1 className="mb-3 text-[20px] font-extrabold" style={{ color: TEXT }}>
        설정
      </h1>
      <ul
        className="overflow-hidden rounded-[22px]"
        style={{ background: SURFACE, boxShadow: SHADOW }}
      >
        {SETTINGS_ITEMS.map((it, i) => (
          <li key={it.label}>
            <button
              type="button"
              onClick={() => handleItem(it.label)}
              className="flex w-full items-center justify-between px-4 py-4 text-[14px] active:opacity-60"
              style={{
                color: it.danger ? UP : TEXT,
                ...(i > 0 ? { borderTop: `1px solid ${LINE}` } : {}),
              }}
            >
              <span>{it.label}</span>
              <span style={{ color: SUB }}>›</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

type TabIconProps = { active: boolean };

function IconHome({ active }: TabIconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10.5V20h14v-9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

function IconIssue({ active }: TabIconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 4h11l3 3v13H5z" />
      <path d="M8 9h7" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </svg>
  );
}

function IconStocks({ active }: TabIconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 20V12" />
      <path d="M10 20V8" />
      <path d="M16 20v-6" />
      <path d="M22 20V4" />
    </svg>
  );
}

function IconMy({ active }: TabIconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" />
    </svg>
  );
}

function IconSettings({ active }: TabIconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
    </svg>
  );
}

const TABS: { id: Tab; label: string; Icon: (p: TabIconProps) => React.JSX.Element }[] = [
  { id: "home", label: "홈", Icon: IconHome },
  { id: "issue", label: "이슈", Icon: IconIssue },
  { id: "stocks", label: "종목", Icon: IconStocks },
  { id: "my", label: "마이", Icon: IconMy },
  { id: "settings", label: "설정", Icon: IconSettings },
];

function BottomTabs({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
}) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 mx-auto flex max-w-[430px]"
      style={{
        background: SURFACE,
        borderTop: `1px solid ${LINE}`,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {TABS.map((t) => {
        const active = tab === t.id;
        const Icon = t.Icon;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className="relative flex flex-1 flex-col items-center justify-center gap-1 py-2.5"
            style={{
              color: active ? TEXT : SUB,
              transition: "color 160ms",
            }}
          >
            <Icon active={active} />
            <span
              className="text-[10.5px]"
              style={{
                fontWeight: active ? 800 : 500,
                letterSpacing: -0.1,
              }}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default function EduPage() {
  const [tab, setTab] = useState<Tab>("home");
  // 어느 탭에서든 종목을 누르면 상세로 진입 — 탭 전환 없이 상세를 위에 덮어 띄움
  const [showDetail, setShowDetail] = useState(false);
  const [selectedStockSymbol, setSelectedStockSymbol] = useState<string>("AAPL");
  const openDetail = (symbol: string) => {
    setSelectedStockSymbol(symbol);
    setShowDetail(true);
  };
  // 이슈 상세 상태 — 홈에서 직접 진입 가능하도록 상위로 끌어올림
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
  const openIssue = (issue: Issue) => {
    setActiveIssue(issue);
    setTab("issue");
  };
  // 학습 플로우 상태
  const [showLesson, setShowLesson] = useState(false);
  const [lessonStep, setLessonStep] = useState(0);
  const [activeLessonId, setActiveLessonId] = useState(1);

  const lessonIssue = issueList.find((i) => i.id === activeLessonId) || issueList[0];

  return (
    <div
      className="mx-auto min-h-screen max-w-[430px]"
      style={{
        background: BG,
        color: TEXT,
        fontFamily:
          "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      }}
    >
      <TopBar streak={7} />
      <main className="pb-24 pt-14">
        {showLesson ? (
          <LessonFlow
            issue={lessonIssue}
            onComplete={() => {
              setShowLesson(false);
              setLessonStep(0);
            }}
            onBack={(currentStep) => {
              setShowLesson(false);
              setLessonStep(currentStep);
            }}
            initialStep={lessonStep}
          />
        ) : showDetail ? (
          <StockDetail symbol={selectedStockSymbol} onBack={() => setShowDetail(false)} />
        ) : (
          <>
            {tab === "home" && (
              <HomeScreen
                onGoToIssues={() => setTab("issue")}
                onOpenIssue={openIssue}
                onStartLesson={(issueId) => {
                  setActiveLessonId(issueId);
                  setLessonStep(0);
                  setShowLesson(true);
                }}
                onSelectStock={openDetail}
                lessonStep={lessonStep}
                activeLessonId={activeLessonId}
              />
            )}
            {tab === "issue" && (
              <IssueScreen 
                active={activeIssue} 
                onSetActive={setActiveIssue} 
                onStartLesson={(issueId) => {
                  setActiveLessonId(issueId);
                  setLessonStep(0);
                  setShowLesson(true);
                }}
              />
            )}
            {tab === "stocks" && (
              <StocksScreen onSelectStock={openDetail} />
            )}
            {tab === "my" && <MyScreen onSelectStock={openDetail} />}
            {tab === "settings" && <SettingsScreen />}
          </>
        )}
      </main>
      <BottomTabs
        tab={tab}
        setTab={(t) => {
          // 상세 화면에서 탭 누르면 상세 닫고 해당 탭으로 — 안 그러면 상세에 갇힘
          setShowDetail(false);
          setActiveIssue(null);
          setTab(t);
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        }}
      />
    </div>
  );
}

// ============= 이슈 상세 (3-tier 분기, ADR-022) =============
// tier 3 → critical (파급효과 풀 + 과거 유사 사례)
// tier 2 → medium (파급효과 슬림 + 4관점)
// tier 1 → minor (영향 종목 칩 + 학습 안내)

const TIER_HEAD: Record<
  Tier,
  { eyebrow: string; bg: string; fg: string; barBg: string }
> = {
  3: { eyebrow: "지금 가장 흔들리는 이슈", bg: "#FDECEC", fg: UP, barBg: UP },
  2: {
    eyebrow: "주목할 이슈",
    bg: ACCENT_SOFT,
    fg: ACCENT_DEEP,
    barBg: ACCENT,
  },
  1: { eyebrow: "오늘의 학습 이슈", bg: SURFACE, fg: SUB, barBg: LINE },
};

function IssueDetail({ issue, onBack, onStartLesson }: { issue: Issue; onBack: () => void; onStartLesson: (id: number) => void }) {
  const detail = issue.detail;
  // ADR-022 + 5/2 회의 정합 — 순서: 이슈 → (tier 2-3) 파급효과 → 설명 → 코치 한마디
  const showRipple = issue.tier >= 2 && !!detail?.ripple;
  const head = TIER_HEAD[issue.tier];

  return (
    <div className="px-5 pt-2">
      <button
        type="button"
        onClick={onBack}
        className="mb-3 -ml-1 px-1 text-[14px] font-medium"
        style={{ color: SUB }}
      >
        ← 이슈
      </button>

      <IssueHero issue={issue} head={head} />

      {showRipple && detail?.ripple && (
        <RippleSection data={detail.ripple} tier={issue.tier} issue={issue} />
      )}

      <IssueChartsSection issue={issue} />

      {detail?.body && <BodyBlocks blocks={detail.body} />}

      {detail?.body && <TermSlider blocks={detail.body} />}

      <button
        type="button"
        onClick={() => onStartLesson(issue.id)}
        className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-2xl py-4 text-[15px] font-extrabold shadow-sm active:opacity-80"
        style={{ background: ACCENT, color: "#fff" }}
      >
        이 내용 더 자세히 학습하기 <span style={{ fontSize: 11 }}>▶</span>
      </button>

      <div className="h-12" />
    </div>
  );
}

function IssueHero({
  issue,
  head,
}: {
  issue: Issue;
  head: (typeof TIER_HEAD)[Tier];
}) {
  // 흰 카드 + 좌측 색 띠로 tier 구분 (배경 BG #FCE5D2와 명확히 구분됨)
  return (
    <article
      className="relative mb-4 overflow-hidden rounded-[24px] p-5"
      style={{ background: SURFACE, boxShadow: SHADOW }}
    >
      <span
        className="absolute bottom-5 left-0 top-5 w-1 rounded-r-full"
        style={{ background: head.barBg }}
      />
      <div className="ml-2">
        <div className="flex items-center gap-2">
          <TierStars tier={issue.tier} size={11} />
          <span
            className="text-[10.5px] font-extrabold uppercase"
            style={{ color: head.fg, letterSpacing: 0.4 }}
          >
            {head.eyebrow}
          </span>
        </div>
        <div
          className="mt-1 text-[11px] font-medium"
          style={{ color: SUB }}
        >
          {CATEGORY_LABEL[issue.category]} · {issue.time}
        </div>
        <h1
          className="mt-2 text-[20px] font-extrabold leading-snug"
          style={{ color: TEXT, letterSpacing: -0.4 }}
        >
          {issue.title}
        </h1>

        {issue.keywords && issue.keywords.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {issue.keywords.map((k) => (
              <span
                key={k}
                className="text-[12px] font-bold"
                style={{ color: head.fg }}
              >
                #{k}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

// 설명 카드 밑에 붙는 코치 한마디 — 단일 캐릭터(스토키 거북이) 톤
function CoachOneLiner({ line }: { line: string }) {
  return (
    <section className="mb-5">
      <div
        className="relative flex gap-3 overflow-hidden rounded-[20px] p-4 pl-5"
        style={{ background: SURFACE, boxShadow: SHADOW }}
      >
        <span
          aria-hidden
          className="absolute left-0 top-0 h-full w-1.5"
          style={{ background: ACCENT }}
        />
        <Mascot size={36} />
        <div className="flex-1">
          <div
            className="mb-0.5 text-[10.5px] font-extrabold uppercase"
            style={{ color: ACCENT_DEEP, letterSpacing: 0.4 }}
          >
            스토키 한마디
          </div>
          <p
            className="text-[12.5px] leading-relaxed"
            style={{ color: TEXT }}
          >
            {line}
          </p>
        </div>
      </div>
    </section>
  );
}

// 이슈 본문에서 추출되어 단어장 슬라이더에 카드로 노출됨
const GLOSSARY: Record<string, string> = {
  호르무즈: "페르시아만 입구의 좁은 해협. 전 세계 원유의 약 20%가 지나가.",
  인플레이션: "물가가 계속 오르는 현상. 같은 돈으로 살 수 있는 게 줄어드는 것.",
  인플레: "물가 상승의 줄임말. '인플레이션'과 같은 뜻.",
  스태그플레이션: "물가는 오르는데 경기는 침체되는 최악 조합. 70년대 오일쇼크 때 처음 등장.",
  디플레이션: "물가가 계속 떨어지는 현상. 인플레이션의 반대 — 소비를 미루면서 경제가 위축돼.",
  "금리 인상": "중앙은행이 기준금리를 올리는 것. 시중에 풀린 돈을 회수해 물가를 잡으려는 신호.",
  "금리 인하": "중앙은행이 기준금리를 내리는 것. 경기를 띄우려고 돈을 더 풀겠다는 신호.",
  VIX: "시장 변동성 지수, 일명 '공포 지수'. 30 이상이면 시장이 불안하다는 뜻.",
  멀티플: "PER·PBR 같은 가치 평가 배수. 멀티플이 높다 = 비싸 보인다.",
  기준금리: "한 나라 중앙은행이 정하는 '돈의 기본 임대료'. 모든 대출·예금 금리의 기준.",
  연준: "미국 중앙은행(Federal Reserve). 의장 한 마디에 전 세계 시장이 움직여.",
  환율: "두 나라 돈의 교환 비율. 1달러 = 몇 원인지.",
  위안화: "중국 통화. 위안화가 약해지면 중국 매출이 달러로 환산할 때 줄어들어.",
  빅테크: "구글·애플·MS·아마존·메타·엔비디아 같은 거대 IT 기업들. 시장을 좌우하는 주포.",
  마진: "매출에서 비용을 뺀 이익률. 마진이 두꺼우면 회사가 돈을 잘 번다는 뜻.",
  관세: "수입품에 매기는 세금. 올리면 외국 제품이 비싸져 국내 산업을 보호하는 효과.",
  보조금: "정부가 특정 산업에 주는 지원금. 줄이면 해당 산업이 직격탄.",
  HBM3E: "HBM의 최신 세대. NVIDIA AI 칩에 들어가는 핵심 메모리.",
  HBM: "고대역폭 메모리. AI 칩 옆에 붙는 빠른 메모리.",
  파운드리: "반도체 위탁생산 공장. 설계는 안 하고 제조만 — TSMC가 세계 1위.",
  CoWoS: "TSMC의 첨단 칩 패키징 기술. AI 칩을 만들 때 필수.",
  데이터센터: "클라우드·AI 서버가 모여 있는 시설. AI 시대의 '공장'.",
  OPEC: "석유수출국기구. 산유국들의 모임 — 증산·감산 결정으로 유가에 영향.",
  ASP: "평균 판매가(Average Selling Price). 제품 1개당 평균 가격.",
  컨센: "시장 컨센서스의 줄임말. 애널리스트들의 평균 예상치.",
  PER: "주가수익비율. 주가를 주당순이익(EPS)으로 나눈 값. 높을수록 미래 이익 기대가 선반영된 상태.",
  PEG: "PER을 이익 성장률로 나눈 지표. 1.0 미만이면 성장 대비 저평가로 해석. PER만으로 부족한 성장성 고려를 보완.",
  ROE: "자기자본이익률. 자기자본 대비 순이익 비율. 높을수록 자본을 효율적으로 활용하는 기업.",
  "락인": "Lock-in. 고객이 특정 제품·서비스를 쓰면 다른 브랜드로 이탈하기 어렵게 만드는 구조적 우위.",
  EPS: "주당순이익(Earnings Per Share). 순이익을 발행 주식 수로 나눈 값. 기업 수익성의 핵심 지표.",
};

const GLOSSARY_TERMS = Object.keys(GLOSSARY).sort(
  (a, b) => b.length - a.length,
);

function tokenizeWithTerms(
  text: string,
): { type: "text" | "term"; value: string }[] {
  const tokens: { type: "text" | "term"; value: string }[] = [];
  let remaining = text;
  let safety = 0;
  while (remaining.length > 0 && safety++ < 80) {
    let bestIdx = -1;
    let bestTerm: string | null = null;
    for (const term of GLOSSARY_TERMS) {
      const idx = remaining.indexOf(term);
      if (idx >= 0 && (bestIdx === -1 || idx < bestIdx)) {
        bestIdx = idx;
        bestTerm = term;
      }
    }
    if (bestIdx === -1 || !bestTerm) {
      tokens.push({ type: "text", value: remaining });
      break;
    }
    if (bestIdx > 0) {
      tokens.push({ type: "text", value: remaining.slice(0, bestIdx) });
    }
    tokens.push({ type: "term", value: bestTerm });
    remaining = remaining.slice(bestIdx + bestTerm.length);
  }
  return tokens;
}

/* ── 본문 내 용어 하이라이트 + 팝오버 ── */
function HighlightedText({ text }: { text: string }) {
  const [openTerm, setOpenTerm] = useState<string | null>(null);
  const tokens = tokenizeWithTerms(text);

  return (
    <span>
      {tokens.map((tk, i) => {
        if (tk.type === "text") return <span key={i}>{tk.value}</span>;
        const isOpen = openTerm === tk.value;
        return (
          <span key={i} className="relative inline">
            <button
              type="button"
              onClick={() => setOpenTerm(isOpen ? null : tk.value)}
              className="relative font-bold"
              style={{
                color: ACCENT_DEEP,
                textDecoration: "underline",
                textDecorationColor: ACCENT + "60",
                textUnderlineOffset: 2,
                background: isOpen ? ACCENT_SOFT : "transparent",
                borderRadius: 4,
                padding: "0 2px",
                transition: "background 150ms",
              }}
            >
              {tk.value}
            </button>
            {isOpen && GLOSSARY[tk.value] && (
              <span
                className="absolute left-0 top-full z-50 mt-1 block rounded-xl p-3 text-left"
                style={{
                  width: 220,
                  background: SURFACE,
                  boxShadow: "0 4px 20px rgba(0,0,0,.15)",
                  border: `1px solid ${LINE}`,
                }}
              >
                <span
                  className="mb-1 block text-[11px] font-extrabold"
                  style={{ color: ACCENT_DEEP }}
                >
                  📖 {tk.value}
                </span>
                <span
                  className="block text-[12px] leading-relaxed"
                  style={{ color: TEXT }}
                >
                  {GLOSSARY[tk.value]}
                </span>
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

/* ── BodyBlocks — kind별 시각 차별화 ── */
function BodyBlocks({ blocks }: { blocks: NonNullable<IssueDetail["body"]> }) {
  return (
    <section className="mb-5">
      <SectionHeader title="설명" />
      <div className="flex flex-col gap-3">
        {blocks.map((b, i) => {
          /* lead — 인트로 카드 */
          if (b.kind === "lead") {
            return (
              <div
                key={i}
                className="rounded-[20px] p-5"
                style={{ background: HERO, boxShadow: SHADOW_HERO }}
              >
                <div
                  className="text-[14.5px] font-medium leading-[1.75]"
                  style={{ color: TEXT }}
                >
                  <HighlightedText text={b.text} />
                </div>
              </div>
            );
          }

          /* analogy — 비유 박스 */
          if (b.kind === "analogy") {
            return (
              <div
                key={i}
                className="rounded-[20px] p-5"
                style={{ background: SURFACE, boxShadow: SHADOW }}
              >
                <div className="mb-2 flex items-center gap-1.5">
                  <span
                    className="text-[12px] font-extrabold"
                    style={{ color: ACCENT_DEEP }}
                  >
                    {b.title || "쉽게 말하면"}
                  </span>
                </div>
                <div
                  className="text-[13.5px] leading-[1.75]"
                  style={{ color: TEXT }}
                >
                  <HighlightedText text={b.text} />
                </div>
              </div>
            );
          }

          /* callout — 강조 박스 */
          if (b.kind === "callout") {
            return (
              <div
                key={i}
                className="relative overflow-hidden rounded-[20px] p-5 pl-6"
                style={{ background: SURFACE, boxShadow: SHADOW }}
              >
                <span
                  className="absolute bottom-4 left-0 top-4 w-1 rounded-r-full"
                  style={{ background: UP }}
                />
                <div className="mb-2 flex items-center gap-1.5">
                  <span className="text-[14px]">⚠️</span>
                  <span
                    className="text-[12px] font-extrabold"
                    style={{ color: UP }}
                  >
                    {b.title || "주의"}
                  </span>
                </div>
                <div
                  className="text-[13.5px] leading-[1.75]"
                  style={{ color: TEXT }}
                >
                  <HighlightedText text={b.text} />
                </div>
              </div>
            );
          }

          /* paragraph — 일반 본문 */
          return (
            <div
              key={i}
              className="rounded-[20px] p-5"
              style={{ background: SURFACE, boxShadow: SHADOW }}
            >
              {b.title && (
                <div
                  className="mb-2 text-[13px] font-extrabold"
                  style={{ color: TEXT }}
                >
                  {b.title}
                </div>
              )}
              <div
                className="text-[13.5px] leading-[1.75]"
                style={{ color: TEXT }}
              >
                <HighlightedText text={b.text} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// 본문에 등장하는 GLOSSARY 용어를 등장 순서대로 1번씩만 모음
function collectGlossaryTerms(
  blocks: NonNullable<IssueDetail["body"]>,
): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const b of blocks) {
    const text = (b.title ? b.title + " " : "") + b.text;
    for (const t of tokenizeWithTerms(text)) {
      if (t.type === "term" && !seen.has(t.value)) {
        seen.add(t.value);
        ordered.push(t.value);
      }
    }
  }
  return ordered;
}

// 설명 카드 바로 밑 — 어려운 용어를 가로로 넘기며 보는 단어장
function TermSlider({
  blocks,
}: {
  blocks: NonNullable<IssueDetail["body"]>;
}) {
  const terms = collectGlossaryTerms(blocks);
  if (terms.length === 0) return null;

  return (
    <section className="mb-5">
      <SectionHeader title="이 이슈의 단어장" />
      <div
        className="-mx-5 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-3 px-5">
          {terms.map((term) => (
            <article
              key={term}
              className="shrink-0 rounded-[20px] p-4"
              style={{
                width: 240,
                background: SURFACE,
                boxShadow: SHADOW,
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[14px]"
                  style={{ background: ACCENT_SOFT }}
                >
                  📖
                </span>
                <span
                  className="text-[14px] font-extrabold"
                  style={{ color: TEXT }}
                >
                  {term}
                </span>
              </div>
              <p
                className="text-[12px] leading-relaxed"
                style={{ color: SUB }}
              >
                {GLOSSARY[term]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PolarityChip({ p }: { p: Polarity }) {
  // 한국 증권 관행: 빨강 상승, 파랑 하락
  const map: Record<Polarity, { label: string; bg: string; fg: string }> = {
    positive: { label: "수혜", bg: "#FDECEC", fg: UP },
    negative: { label: "피해", bg: "#EAF1FF", fg: DOWN },
    neutral: { label: "중립", bg: "#F3EEE6", fg: SUB },
  };
  const c = map[p];
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[10px] font-extrabold"
      style={{ background: c.bg, color: c.fg, letterSpacing: 0.3 }}
    >
      {c.label}
    </span>
  );
}

function RippleSection({
  data,
  tier,
  issue,
}: {
  data: NonNullable<IssueDetail["ripple"]>;
  tier: Tier;
  issue: Issue;
}) {
  const limit = tier === 3 ? 8 : 4;
  const items = data.affected.slice(0, limit);
  const [selSym, setSelSym] = useState<string>(items[0]?.sym ?? "");
  const selected = items.find((a) => a.sym === selSym) ?? items[0];

  return (
    <section className="mb-5">
      <SectionHeader title="파급효과" />
      <p className="mb-3 text-[12.5px] leading-relaxed" style={{ color: SUB }}>
        {data.summary}
      </p>

      <RippleGraph
        issue={issue}
        items={items}
        selectedSym={selected?.sym ?? ""}
        onSelect={setSelSym}
      />

      {selected && (
        <div
          key={selected.sym}
          className="ripple-detail-fade rounded-[20px] p-4"
          style={{ background: SURFACE, boxShadow: SHADOW }}
        >
          <div className="mb-1.5 flex items-center gap-2">
            <StockLogo symbol={selected.sym} size={28} />
            <span
              className="text-[13.5px] font-extrabold"
              style={{ color: TEXT }}
            >
              {selected.sym}
            </span>
            <span className="text-[11px]" style={{ color: SUB }}>
              {selected.name}
            </span>
            <span className="ml-auto">
              <PolarityChip p={selected.polarity} />
            </span>
          </div>
          <p
            className="text-[12.5px] leading-relaxed"
            style={{ color: TEXT }}
          >
            {selected.reason}
          </p>
          <p className="mt-2 text-[10.5px]" style={{ color: SUB }}>
            노드를 탭해서 다른 종목의 영향도 볼 수 있어
          </p>
        </div>
      )}

      <style jsx>{`
        .ripple-detail-fade {
          animation: rippleFade 220ms ease-out;
        }
        @keyframes rippleFade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

// KG (이슈)-[AFFECTS]->(종목) 노드 그래프 — 좌측 이슈 1개, 우측 영향 종목 N개를 polarity 색 곡선으로 연결
function RippleGraph({
  issue,
  items,
  selectedSym,
  onSelect,
}: {
  issue: Issue;
  items: NonNullable<IssueDetail["ripple"]>["affected"];
  selectedSym: string;
  onSelect: (sym: string) => void;
}) {
  const W = 320;
  // 종목 수에 따라 간격 동적 조정 — 2~3개는 넉넉하게, 5개+는 촘촘하게
  const stepY = items.length <= 3 ? 46 : items.length <= 5 ? 34 : 26;
  const padY = items.length <= 3 ? 28 : 20;
  const H = Math.max(160, padY * 2 + stepY * Math.max(items.length - 1, 1));

  const issueX = 56;
  const issueY = H / 2;
  const issueR = 30;

  const stockX = 248;
  const stockR = items.length <= 5 ? 20 : 17;

  const stockY = (i: number) => {
    if (items.length === 1) return H / 2;
    const top = (H - stepY * (items.length - 1)) / 2;
    return top + stepY * i;
  };

  const polColor = (p: Polarity) =>
    p === "positive" ? UP : p === "negative" ? DOWN : SUB;
  const polArrow = (p: Polarity) =>
    p === "positive" ? "▲" : p === "negative" ? "▼" : "■";

  const issueLabel = issue.symbol
    ? issue.symbol
    : issue.sector
      ? issue.sector
      : issue.topic
        ? GENERAL_META[issue.topic].label
        : "이슈";
  const issueIcon = issue.topic ? GENERAL_META[issue.topic].icon : "";

  return (
    <div
      className="mb-3 rounded-[20px] p-3"
      style={{ background: SURFACE, boxShadow: SHADOW }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full"
        style={{ maxHeight: H }}
      >
        <defs>
          <radialGradient id="ripple-issue-fill" cx="0.35" cy="0.3" r="0.85">
            <stop offset="0" stopColor="#FFD7B0" />
            <stop offset="1" stopColor={ACCENT} />
          </radialGradient>
        </defs>

        {/* 엣지 (베지어 곡선, polarity 색) — 선택된 엣지는 굵게 + 불투명 */}
        {items.map((a, i) => {
          const y = stockY(i);
          const c = polColor(a.polarity);
          const x1 = issueX + issueR;
          const x2 = stockX - stockR;
          const mx = (x1 + x2) / 2;
          const d = `M ${x1} ${issueY} C ${mx} ${issueY}, ${mx} ${y}, ${x2} ${y}`;
          const isSel = a.sym === selectedSym;
          return (
            <g key={`edge-${a.sym}`}>
              <path
                d={d}
                stroke={c}
                strokeWidth={isSel ? 3 : 1.6}
                fill="none"
                opacity={isSel ? 0.95 : 0.3}
                style={{ transition: "stroke-width 180ms, opacity 180ms" }}
              />
              <circle
                cx={x2 - 2}
                cy={y}
                r={isSel ? 3.5 : 2.2}
                fill={c}
                opacity={isSel ? 1 : 0.45}
              />
            </g>
          );
        })}

        {/* 이슈 노드 (중심 좌측) */}
        <g>
          <circle
            cx={issueX}
            cy={issueY}
            r={issueR + 2}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1}
            opacity={0.35}
          />
          <circle
            cx={issueX}
            cy={issueY}
            r={issueR}
            fill="url(#ripple-issue-fill)"
          />
          {issueIcon && (
            <text
              x={issueX}
              y={issueY - 4}
              textAnchor="middle"
              fontSize={13}
            >
              {issueIcon}
            </text>
          )}
          <text
            x={issueX}
            y={issueIcon ? issueY + 11 : issueY + 4}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize={9.5}
            fontWeight={800}
          >
            {issueLabel.length > 6 ? issueLabel.slice(0, 6) : issueLabel}
          </text>
        </g>

        {/* 종목 노드 (우측) — 클릭 가능, 선택된 노드는 외부 링 + 굵은 테두리 */}
        {items.map((a, i) => {
          const y = stockY(i);
          const c = polColor(a.polarity);
          const isSel = a.sym === selectedSym;
          return (
            <g
              key={`node-${a.sym}`}
              onClick={() => onSelect(a.sym)}
              style={{ cursor: "pointer" }}
            >
              {/* 클릭 히트박스 (투명) */}
              <rect
                x={stockX - stockR - 6}
                y={y - stockR - 4}
                width={stockR * 2 + 30}
                height={stockR * 2 + 8}
                fill="transparent"
              />
              {/* 선택 시 외부 링 */}
              {isSel && (
                <circle
                  cx={stockX}
                  cy={y}
                  r={stockR + 5}
                  fill="none"
                  stroke={c}
                  strokeWidth={1.5}
                  opacity={0.35}
                />
              )}
              <circle
                cx={stockX}
                cy={y}
                r={stockR}
                fill={isSel ? c : SURFACE}
                stroke={c}
                strokeWidth={isSel ? 2.5 : 2}
                style={{ transition: "fill 180ms" }}
              />
              <text
                x={stockX}
                y={y + 3.5}
                textAnchor="middle"
                fill={isSel ? "#FFFFFF" : TEXT}
                fontSize={9.5}
                fontWeight={800}
                style={{ pointerEvents: "none", transition: "fill 180ms" }}
              >
                {a.sym.length > 4 ? a.sym.slice(0, 4) : a.sym}
              </text>
              <text
                x={stockX + stockR + 10}
                y={y + 4}
                fill={c}
                fontSize={11}
                fontWeight={isSel ? 800 : 700}
                style={{ pointerEvents: "none" }}
              >
                {polArrow(a.polarity)}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-1 flex items-center justify-center gap-3 text-[10px]" style={{ color: SUB }}>
        <span className="flex items-center gap-1">
          <span className="inline-block h-[2px] w-3" style={{ background: UP }} />
          상승 영향
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-[2px] w-3" style={{ background: DOWN }} />
          하락 영향
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-[2px] w-3" style={{ background: SUB }} />
          중립
        </span>
      </div>
    </div>
  );
}

// ============= Phase 3: 듀오링고 스타일 학습 플로우 =============

function LessonProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 flex-1 overflow-hidden rounded-full"
          style={{ background: LINE }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: i < current ? "100%" : i === current ? "50%" : "0%",
              background: ACCENT,
              transition: "width 400ms ease-out",
            }}
          />
        </div>
      ))}
    </div>
  );
}

type RippleAffected = NonNullable<IssueDetail["ripple"]>["affected"][number];
type LessonRippleStep = { label: string; text: string };

function splitReason(reason: string) {
  return reason
    .split(/—|→/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function inferIssueMechanism(issue: Issue, summary: string): LessonRippleStep[] {
  const haystack = [
    issue.title,
    issue.summary,
    issue.sector,
    issue.topic,
    ...(issue.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ");

  if (/호르무즈|OPEC|원유|유가|에너지|산유/.test(haystack)) {
    return [
      {
        label: "공급 경로 변화",
        text: "원유가 지나가는 길목이나 산유국 공급 결정이 흔들리면 시장은 먼저 공급 부족 가능성을 가격에 반영해.",
      },
      {
        label: "가격 전달",
        text: "유가가 움직이면 항공·운송 비용, 정유 마진, 인플레이션 기대까지 차례로 영향을 받아.",
      },
    ];
  }

  if (/연준|한은|금리|기준금리|인하|동결|채권/.test(haystack)) {
    return [
      {
        label: "정책 신호",
        text: "중앙은행이 금리를 유지하거나 바꾸면 시장은 경기와 물가를 어떻게 보는지 먼저 해석해.",
      },
      {
        label: "할인율 변화",
        text: "금리 기대가 달라지면 성장주의 미래 이익, 채권 가격, 대출 비용이 동시에 다시 계산돼.",
      },
    ];
  }

  if (/관세|미중|중국|제재|BYD|보조금|정책/.test(haystack)) {
    return [
      {
        label: "정책 장벽",
        text: "정부 정책은 제품 가격, 시장 진입 가능성, 경쟁 구도를 한 번에 바꿔.",
      },
      {
        label: "수요 재배치",
        text: "비용이 오르거나 경쟁자가 막히면 매출은 줄 수도 있고, 반대로 대체 공급자에게 기회가 갈 수도 있어.",
      },
    ];
  }

  if (/AI|HBM|Blackwell|반도체|TSMC|CoWoS|파운드리|데이터센터/.test(haystack)) {
    return [
      {
        label: "수요 압력",
        text: "AI 인프라 투자가 늘면 칩, 메모리, 패키징 같은 병목 부품부터 주문이 몰려.",
      },
      {
        label: "공급망 연결",
        text: "누가 핵심 부품을 만들고 누가 생산 능력을 갖고 있는지에 따라 수혜 종목이 갈려.",
      },
    ];
  }

  if (/환율|외국인|코스피|코스닥|수급/.test(haystack)) {
    return [
      {
        label: "자금 흐름",
        text: "환율과 외국인 매매는 시장 전체 수급을 흔들어서 지수와 대형주에 먼저 반영돼.",
      },
      {
        label: "심리 전이",
        text: "자금이 빠지거나 들어온다는 신호가 나오면 같은 업종 안에서도 민감한 종목부터 움직여.",
      },
    ];
  }

  return [
    {
      label: "시장 해석",
      text: summary,
    },
  ];
}

function buildLessonRippleSteps({
  issue,
  summary,
  item,
  toneLabel,
}: {
  issue: Issue;
  summary: string;
  item: RippleAffected;
  toneLabel: string;
}): LessonRippleStep[] {
  const reasonParts = splitReason(item.reason);
  const steps: LessonRippleStep[] = [
    {
      label: "출발점",
      text: issue.title,
    },
    ...inferIssueMechanism(issue, summary),
  ];

  if (reasonParts[0]) {
    steps.push({
      label: "종목 연결",
      text: `${item.name}은 ${reasonParts[0]} 때문에 이 이슈와 연결돼.`,
    });
  }

  if (reasonParts[1]) {
    steps.push({
      label: "핵심 근거",
      text: reasonParts[1],
    });
  }

  steps.push({
    label: "판단",
    text: `${item.sym}에는 최종적으로 ${toneLabel}으로 해석돼.`,
  });

  return steps;
}

function LessonRippleFlow({
  issue,
  summary,
  item,
}: {
  issue: Issue;
  summary: string;
  item: RippleAffected;
}) {
  const tone =
    item.polarity === "positive"
      ? { color: UP, label: "상승 압력", mark: "▲" }
      : item.polarity === "negative"
        ? { color: DOWN, label: "하락 압력", mark: "▼" }
        : { color: SUB, label: "중립 영향", mark: "—" };
  const steps = buildLessonRippleSteps({
    issue,
    summary,
    item,
    toneLabel: tone.label,
  });

  return (
    <div
      className="mt-3 rounded-[16px] p-4"
      style={{ background: BG, border: `1px solid ${LINE}` }}
    >
      <div className="relative">
        <span
          aria-hidden
          className="absolute bottom-4 left-[15px] top-4 w-px"
          style={{ background: LINE }}
        />
        <div className="flex flex-col gap-3">
          {steps.map((flowStep, i) => (
            <div
              key={flowStep.label}
              className="relative flex gap-3"
              style={{
                animation: "lessonFlowIn 260ms ease-out both",
                animationDelay: `${i * 80}ms`,
              }}
            >
              <span
                className="z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold"
                style={{
                  background: i === steps.length - 1 ? tone.color : SURFACE,
                  color: i === steps.length - 1 ? "#fff" : ACCENT_DEEP,
                  border: `1px solid ${i === steps.length - 1 ? tone.color : ACCENT_SOFT}`,
                }}
              >
                {i === steps.length - 1 ? tone.mark : i + 1}
              </span>
              <div className="min-w-0 flex-1 pb-1">
                <div
                  className="text-[11px] font-extrabold"
                  style={{
                    color: i === steps.length - 1 ? tone.color : ACCENT_DEEP,
                  }}
                >
                  {flowStep.label}
                </div>
                <p
                  className="mt-0.5 text-[12.5px] leading-relaxed"
                  style={{ color: TEXT }}
                >
                  {flowStep.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes lessonFlowIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function lessonTopicText(issue: Issue) {
  return [
    issue.title,
    issue.summary,
    issue.sector,
    issue.topic,
    ...(issue.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

function getLessonIntroPoints(issue: Issue) {
  const haystack = lessonTopicText(issue);
  if (/호르무즈|OPEC|원유|유가|에너지|산유/.test(haystack)) {
    return [
      {
        label: "가격의 시작점",
        text: "원유는 운송·전기·화학제품 원가의 출발점이라 한 번 뛰면 여러 업종의 비용표가 동시에 바뀌어.",
      },
      {
        label: "시장 반응 속도",
        text: "실제 공급 차질이 나기 전에도 선물 가격과 항공·정유주가 먼저 움직이는 경우가 많아.",
      },
    ];
  }
  if (/연준|한은|금리|기준금리|인하|동결|채권/.test(haystack)) {
    return [
      {
        label: "돈의 가격",
        text: "금리는 기업이 돈을 빌리는 비용이자, 투자자가 미래 이익을 현재 가치로 계산할 때 쓰는 기준이야.",
      },
      {
        label: "기대의 재조정",
        text: "동결·인하·인상 자체보다 시장이 기대했던 경로와 얼마나 달라졌는지가 주가를 흔들어.",
      },
    ];
  }
  if (/FSD|로보택시|자율주행|사이버캡|모빌리티/.test(haystack)) {
    return [
      {
        label: "비즈니스 모델 전환",
        text: "차를 한 번 팔아 돈 버는 구조에서, 매 이동마다 수익을 내는 플랫폼 모델로의 전환이 밸류에이션을 바꿔.",
      },
      {
        label: "플랫폼 vs 하드웨어",
        text: "같은 회사라도 '자동차 제조업 PER'과 '소프트웨어 플랫폼 PER'은 전혀 다른 배수가 적용돼.",
      },
    ];
  }
  if (/AI법|AI Act|규제|컴플라이언스|과징금|EU/.test(haystack)) {
    return [
      {
        label: "규제 = 비용 + 진입장벽",
        text: "규제는 준수 비용을 올리지만, 동시에 체력 약한 경쟁자를 걸러내는 필터 역할도 해.",
      },
      {
        label: "선례 학습",
        text: "GDPR 시행 때 빅테크 주가가 어떻게 반응했는지 비교해보면 규제 뉴스의 패턴이 보여.",
      },
    ];
  }
  if (/AI|HBM|Blackwell|반도체|TSMC|CoWoS|파운드리|데이터센터/.test(haystack)) {
    return [
      {
        label: "병목 확인",
        text: "AI 수요가 커질수록 모두가 좋아지는 게 아니라, 부족한 부품이나 생산 능력을 가진 회사가 먼저 주목받아.",
      },
      {
        label: "공급망 지도",
        text: "칩 설계, 메모리, 파운드리, 패키징 중 어디가 막혔는지 보면 수혜 종목을 더 빨리 좁힐 수 있어.",
      },
    ];
  }
  if (/관세|미중|중국|제재|BYD|보조금|정책/.test(haystack)) {
    return [
      {
        label: "정책은 가격을 바꿈",
        text: "관세·보조금·제재는 제품 경쟁력을 단번에 바꿔서 수요와 점유율을 다시 나누게 만들어.",
      },
      {
        label: "승자와 패자 분리",
        text: "같은 정책 뉴스라도 직접 타격을 받는 회사와 반사이익을 받는 회사가 갈릴 수 있어.",
      },
    ];
  }
  return [
    {
      label: "핵심 변수",
      text: "이 이슈가 실적, 비용, 수급, 투자심리 중 어디를 건드리는지 먼저 잡아야 해.",
    },
    {
      label: "다음 반응",
      text: "뉴스 자체보다 시장이 어떤 종목에 먼저 반응하는지 보는 게 학습 포인트야.",
    },
  ];
}

function getLessonBackgroundPoints(issue: Issue) {
  const categoryText =
    issue.category === "general"
      ? "시장 전반에 번질 수 있는 이슈라 지수와 금리, 환율 같은 큰 변수까지 같이 봐야 해."
      : issue.category === "sector"
        ? "특정 섹터 안에서 수요·공급·정책 변화가 어떤 기업에 유리한지 비교해야 해."
        : "내 관심 종목과 직접 연결된 뉴스라 기존 보유 논리가 바뀌는지 확인해야 해.";
  const intensityText =
    issue.tier === 3
      ? "중요도 3단계라 단기 가격 반응뿐 아니라 2차 파급효과까지 확인해야 하는 뉴스야."
      : issue.tier === 2
        ? "중요도 2단계라 관련 종목의 방향성은 흔들 수 있지만, 실제 수치 확인이 필요해."
        : "중요도 1단계라 시장 전체보다 특정 맥락을 이해하는 학습용 이슈에 가까워.";
  return [
    { label: "범위", text: categoryText },
    { label: "강도", text: intensityText },
  ];
}

function getLessonAnalysisFrames(issue: Issue) {
  const haystack = lessonTopicText(issue);
  if (/호르무즈|OPEC|원유|유가|에너지|산유/.test(haystack)) {
    return [
      "먼저 원유 공급이 실제로 줄어드는지, 아니면 위험 프리미엄만 붙은 건지 구분해.",
      "그다음 유가 상승이 비용 증가인지, 판매가 상승인지 업종별로 나눠 봐.",
      "마지막으로 인플레 우려가 커지면 금리 인하 기대가 밀릴 수 있다는 2차 효과를 확인해.",
    ];
  }
  if (/연준|한은|금리|기준금리|인하|동결|채권/.test(haystack)) {
    return [
      "시장 예상과 실제 발표가 얼마나 달랐는지 먼저 봐.",
      "성장주는 할인율, 금융주는 예대마진, 채권은 금리 방향에 각각 다르게 반응해.",
      "발표 직후 반응보다 다음 인하·인상 시점에 대한 기대가 더 중요할 때가 많아.",
    ];
  }
  if (/FSD|로보택시|자율주행|사이버캡|모빌리티/.test(haystack)) {
    return [
      "비즈니스 모델이 바뀌면 회사를 평가하는 기준(PER 배수)부터 달라져.",
      "기존 사업(차량 판매)이 줄더라도 새 사업(구독 서비스)의 마진이 높으면 전체 이익은 늘 수 있어.",
      "경쟁사(우버, 웨이모)의 반응을 보면 시장이 이 변화를 얼마나 심각하게 보는지 알 수 있어.",
    ];
  }
  if (/AI법|AI Act|규제|컴플라이언스|과징금|EU/.test(haystack)) {
    return [
      "규제의 핵심은 '누가 대상'이고 '비용이 얼마'인지를 숫자로 확인하는 거야.",
      "단기 비용 증가와 중장기 경쟁 구도 변화를 분리해서 봐야 해.",
      "과거 유사 규제(GDPR 등)가 시행됐을 때 주가 반응 패턴을 참고하면 판단 기준이 생겨.",
    ];
  }
  if (/AI|HBM|Blackwell|반도체|TSMC|CoWoS|파운드리|데이터센터/.test(haystack)) {
    return [
      "수요가 늘었다는 말보다 어느 부품이 부족한지를 먼저 찾아.",
      "공급 능력을 가진 회사와 단순 기대감만 있는 회사를 나눠 봐.",
      "양산 일정, 수율, 고객사 인증 같은 단어는 실제 매출 전환 가능성을 보여줘.",
    ];
  }
  if (/관세|미중|중국|제재|BYD|보조금|정책/.test(haystack)) {
    return [
      "정책이 가격을 올리는지, 진입을 막는지, 보조를 줄이는지부터 구분해.",
      "직접 피해 기업과 반사이익 기업을 나눠서 봐야 해.",
      "정책 뉴스는 발표 직후보다 시행 시점과 예외 조항에서 방향이 바뀔 수 있어.",
    ];
  }
  return [
    "이슈가 매출, 비용, 밸류에이션, 투자심리 중 무엇을 건드리는지 분류해.",
    "직접 영향과 간접 영향을 나눠서 관련 종목을 봐.",
    "단기 가격 반응과 중장기 실적 영향이 같은 방향인지 확인해.",
  ];
}

function LessonFlow({
  issue,
  onComplete,
  onBack,
  initialStep = 0,
}: {
  issue: Issue;
  onComplete: () => void;
  onBack: (currentStep: number) => void;
  initialStep?: number;
}) {
  const [step, setStep] = useState(initialStep);
  const detail = issue.detail;
  const body = detail?.body || [];

  const leadBlock = body.find((b) => b.kind === "lead");
  const analogyBlocks = body.filter((b) => b.kind === "analogy");
  const analysisBlocks = body.filter((b) => b.kind === "paragraph");
  const calloutBlock = body.find((b) => b.kind === "callout");
  const ripple = detail?.ripple;
  const terms = collectGlossaryTerms(body);
  const introPoints = getLessonIntroPoints(issue);
  const backgroundPoints = getLessonBackgroundPoints(issue);
  const analysisFrames = getLessonAnalysisFrames(issue);

  const STEPS = [
    { label: "요약/서론", icon: "🧭" },
    { label: "배경", icon: "📖" },
    { label: "원인/분석", icon: "🔎" },
    { label: "쟁점", icon: "⚖️" },
  ];

  const totalSteps = STEPS.length;
  const isLast = step >= totalSteps - 1;
  const isComplete = step >= totalSteps;

  const handleNext = () => {
    if (isLast) setStep(totalSteps);
    else setStep(step + 1);
  };

  if (isComplete) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <div
          className="mb-4 flex h-20 w-20 items-center justify-center rounded-full text-[40px]"
          style={{ background: ACCENT_SOFT }}
        >
          🎉
        </div>
        <h2 className="text-[22px] font-extrabold" style={{ color: TEXT }}>
          학습 완료!
        </h2>
        <p className="mt-2 text-[14px]" style={{ color: SUB }}>
          &ldquo;{issue.title}&rdquo; 이슈를 학습했어요
        </p>
        <div
          className="mt-4 rounded-full px-4 py-1.5 text-[13px] font-bold"
          style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
        >
          🔥 학습 스트릭 +1
        </div>
        <button
          type="button"
          onClick={onComplete}
          className="mt-8 rounded-full px-8 py-3 text-[15px] font-extrabold active:opacity-80"
          style={{ background: ACCENT, color: "#fff", boxShadow: SHADOW }}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] flex-col px-5 pt-2">
      {/* 헤더 */}
      <div className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onBack(step)}
          className="text-[14px] font-medium"
          style={{ color: SUB }}
        >
          ✕
        </button>
        <div className="flex-1">
          <LessonProgress current={step} total={totalSteps} />
        </div>
        <span className="text-[12px] font-bold" style={{ color: SUB }}>
          {step + 1}/{totalSteps}
        </span>
      </div>

      {/* 스텝 라벨 */}
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[18px]">{STEPS[step].icon}</span>
        <span
          className="text-[11px] font-extrabold uppercase tracking-wide"
          style={{ color: ACCENT_DEEP }}
        >
          STEP {step + 1} — {STEPS[step].label}
        </span>
      </div>

      {/* 스텝 내용 */}
      <div className="flex-1">
        {step === 0 && (
          <div>
            <h2
              className="mb-4 text-[20px] font-extrabold leading-tight"
              style={{ color: TEXT }}
            >
              {issue.title}
            </h2>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {issue.keywords?.map((k) => (
                <span
                  key={k}
                  className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                  style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
                >
                  #{k}
                </span>
              ))}
            </div>
            {issue.summary && (
              <div
                className="rounded-[20px] p-5"
                style={{ background: HERO, boxShadow: SHADOW_HERO }}
              >
                <div
                  className="mb-2 text-[11px] font-extrabold uppercase"
                  style={{ color: ACCENT_DEEP, letterSpacing: 0.4 }}
                >
                  오늘 잡고 갈 핵심
                </div>
                <div
                  className="line-clamp-3 text-[14.5px] font-medium leading-[1.85]"
                  style={{ color: TEXT }}
                >
                  <HighlightedText text={issue.summary} />
                </div>
              </div>
            )}
            <div className="mt-4 grid grid-cols-1 gap-2">
              {introPoints.map((point) => (
                <div
                  key={point.label}
                  className="rounded-[18px] p-4"
                  style={{ background: SURFACE, boxShadow: SHADOW }}
                >
                  <div
                    className="mb-1 text-[11px] font-extrabold"
                    style={{ color: ACCENT_DEEP }}
                  >
                    {point.label}
                  </div>
                  <p
                    className="text-[12.5px] leading-relaxed"
                    style={{ color: TEXT }}
                  >
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
            {introPoints.length > 0 && (
              <div
                className="mt-4 flex gap-3 rounded-[18px] p-4"
                style={{ background: ACCENT_SOFT }}
              >
                <Mascot size={36} />
                <div className="flex-1">
                  <div
                    className="mb-0.5 text-[10.5px] font-extrabold uppercase"
                    style={{ color: ACCENT_DEEP, letterSpacing: 0.3 }}
                  >
                    스토키
                  </div>
                  <p
                    className="text-[12.5px] leading-relaxed"
                    style={{ color: TEXT }}
                  >
                    {introPoints[0].label}에 집중해서 봐보자.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2
              className="mb-4 text-[18px] font-extrabold leading-tight"
              style={{ color: TEXT }}
            >
              이 이슈가 터진 배경
            </h2>
            {leadBlock ? (
              <div
                className="rounded-[20px] p-5"
                style={{ background: HERO, boxShadow: SHADOW_HERO }}
              >
                <div
                  className="text-[14.5px] font-medium leading-[1.85]"
                  style={{ color: TEXT }}
                >
                  <HighlightedText text={leadBlock.text} />
                </div>
              </div>
            ) : (
              <div
                className="rounded-[20px] p-5"
                style={{ background: SURFACE, boxShadow: SHADOW }}
              >
                <p className="text-[14px] leading-relaxed" style={{ color: SUB }}>
                  이 이슈는 시장 상황 설명 없이도 바로 핵심을 볼 수 있어요.
                </p>
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {backgroundPoints.map((point) => (
                <div
                  key={point.label}
                  className="rounded-[18px] p-4"
                  style={{ background: SURFACE, boxShadow: SHADOW }}
                >
                  <div
                    className="mb-1 text-[11px] font-extrabold"
                    style={{ color: ACCENT_DEEP }}
                  >
                    {point.label}
                  </div>
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ color: TEXT }}
                  >
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="mt-4 flex gap-3 rounded-[18px] p-4"
              style={{ background: ACCENT_SOFT }}
            >
              <Mascot size={36} />
              <div className="flex-1">
                <div
                  className="mb-0.5 text-[10.5px] font-extrabold uppercase"
                  style={{ color: ACCENT_DEEP, letterSpacing: 0.3 }}
                >
                  스토키의 해석
                </div>
                <p
                  className="text-[12.5px] leading-relaxed"
                  style={{ color: TEXT }}
                >
                  이 배경에서 주목할 포인트는 시장이 이미 이 변수를 걱정하고 있었는지야. 같은 뉴스라도 시장이 긴장한 상태였는지 안심하던 상태였는지에 따라 반응이 완전히 달라지거든.
                </p>
              </div>
            </div>
            {terms.length > 0 && (
              <div className="mt-4">
                <div
                  className="mb-2 text-[12px] font-extrabold"
                  style={{ color: SUB }}
                >
                  배경을 이해하는 핵심 용어
                </div>
                <div className="flex flex-wrap gap-2">
                  {terms.slice(0, 4).map((term) => (
                    <span
                      key={term}
                      className="rounded-full px-3 py-1.5 text-[12px] font-bold"
                      style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2
              className="mb-4 text-[18px] font-extrabold leading-tight"
              style={{ color: TEXT }}
            >
              이 이슈가 시장에 영향을 미치는 구조
            </h2>
            <div
              className="mb-4 rounded-[20px] p-5"
              style={{ background: HERO, boxShadow: SHADOW_HERO }}
            >
              <div
                className="mb-2 text-[11px] font-extrabold"
                style={{ color: ACCENT_DEEP }}
              >
                분석 프레임
              </div>
              <div className="flex flex-col gap-2">
                {analysisFrames.map((text, i) => (
                  <div key={text} className="flex gap-2">
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold"
                      style={{
                        background: i === 0 ? ACCENT : SURFACE,
                        color: i === 0 ? "#fff" : ACCENT_DEEP,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-[12.5px] leading-relaxed"
                      style={{ color: TEXT }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="mb-4 flex gap-3 rounded-[18px] p-4"
              style={{ background: ACCENT_SOFT }}
            >
              <Mascot size={36} />
              <div className="flex-1">
                <div
                  className="mb-0.5 text-[10.5px] font-extrabold uppercase"
                  style={{ color: ACCENT_DEEP, letterSpacing: 0.3 }}
                >
                  스토키의 조언
                </div>
                <p
                  className="text-[12.5px] leading-relaxed"
                  style={{ color: TEXT }}
                >
                  이 분석에서 가장 중요한 건 각 요인이 어떻게 톱니바퀴처럼 맞물려 돌아가는지 파악하는 거야.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {[...analogyBlocks, ...analysisBlocks].map((block, i) => (
                <div
                  key={i}
                  className="rounded-[20px] p-5"
                  style={{
                    background:
                      block.kind === "analogy" ? ACCENT_SOFT : SURFACE,
                    boxShadow: SHADOW,
                  }}
                >
                  {block.kind === "analogy" && (
                    <div className="mb-2 flex items-center gap-1.5">
                      <span className="text-[16px]">💡</span>
                      <span
                        className="text-[12px] font-extrabold"
                        style={{ color: ACCENT_DEEP }}
                      >
                        {block.title || "쉽게 말하면"}
                      </span>
                    </div>
                  )}
                  {block.kind === "paragraph" && block.title && (
                    <div
                      className="mb-2 text-[13px] font-extrabold"
                      style={{ color: TEXT }}
                    >
                      {block.title.replace("어떻게 번질까?", "이슈의 파급 구조").replace("왜 빅테크가 흔들려?", "영향을 받는 주요 섹터").replace("누가 가장 영향 받아?", "직접적인 영향을 받는 기업들").replace("규제가 오히려 유리한 경우도 있어?", "새로운 관점에서 본 이슈 해석")}
                    </div>
                  )}
                  <div
                    className="text-[13.5px] leading-[1.75]"
                    style={{ color: TEXT }}
                  >
                    <HighlightedText text={block.text} />
                  </div>
                </div>
              ))}
              {analogyBlocks.length + analysisBlocks.length === 0 && (
                <div
                  className="rounded-[20px] p-5 text-center"
                  style={{ background: SURFACE, boxShadow: SHADOW }}
                >
                  <p className="text-[14px]" style={{ color: SUB }}>
                    이 이슈의 핵심은 배경에서 확인할 수 있어요
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2
              className="mb-4 text-[18px] font-extrabold leading-tight"
              style={{ color: TEXT }}
            >
              핵심 쟁점과 파급효과
            </h2>
            {calloutBlock && (
              <div
                className="relative mb-4 overflow-hidden rounded-[20px] p-5 pl-6"
                style={{ background: SURFACE, boxShadow: SHADOW }}
              >
                <span
                  className="absolute bottom-4 left-0 top-4 w-1 rounded-r-full"
                  style={{ background: UP }}
                />
                <div
                  className="mb-2 text-[12px] font-extrabold"
                  style={{ color: UP }}
                >
                  {calloutBlock.title || "판단 포인트"}
                </div>
                <div
                  className="text-[13.5px] leading-[1.75]"
                  style={{ color: TEXT }}
                >
                  <HighlightedText text={calloutBlock.text} />
                </div>
              </div>
            )}
            {ripple ? (
              <>
                <p className="mb-3 text-[13px]" style={{ color: SUB }}>
                  {ripple.summary}
                </p>
                <div className="flex flex-col gap-2">
                  {ripple.affected.map((a) => {
                    const isOpen = openRippleSym === a.sym;
                    const marker =
                      a.polarity === "positive"
                        ? "▲"
                        : a.polarity === "negative"
                          ? "▼"
                          : "—";
                    const markerColor =
                      a.polarity === "positive"
                        ? UP
                        : a.polarity === "negative"
                          ? DOWN
                          : SUB;
                    return (
                      <article
                        key={a.sym}
                        className="rounded-[16px] p-4"
                        style={{ background: SURFACE, boxShadow: SHADOW }}
                      >
                        <button
                          type="button"
                          className="flex w-full items-center gap-3 text-left"
                        >
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-extrabold"
                            style={{
                              background:
                                a.polarity === "positive"
                                  ? UP + "18"
                                  : a.polarity === "negative"
                                    ? DOWN + "18"
                                    : LINE,
                              color: markerColor,
                            }}
                          >
                            {marker}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline gap-1.5">
                              <span
                                className="text-[14px] font-extrabold"
                                style={{ color: TEXT }}
                              >
                                {a.name}
                              </span>
                              <span className="text-[11px]" style={{ color: SUB }}>
                                {a.sym}
                              </span>
                            </div>
                            <div
                              className="mt-0.5 text-[12px] leading-snug"
                              style={{ color: SUB }}
                            >
                              {a.reason}
                            </div>
                          </div>
                        </button>
                      </article>
                    );
                  })}
                </div>
              </>
            ) : (
              <div
                className="rounded-[20px] p-5 text-center"
                style={{ background: SURFACE, boxShadow: SHADOW }}
              >
                <p className="text-[14px]" style={{ color: SUB }}>
                  이 이슈는 특정 종목에 직접적인 파급효과가 크지 않아요
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="mt-6 pb-4">
        <button
          type="button"
          onClick={handleNext}
          className="w-full rounded-full py-3.5 text-[15px] font-extrabold active:opacity-80"
          style={{ background: ACCENT, color: "#fff", boxShadow: SHADOW }}
        >
          {isLast ? "참여하고 완료하기 🎉" : "다음 →"}
        </button>
      </div>
    </div>
  );
}
