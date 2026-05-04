"use client";

import { useState, type ReactNode } from "react";

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
      "혁명수비대 사령관이 봉쇄를 시사. 전 세계 원유의 20%가 지나가는 길목이라 유가 +7%, 항공·해운 단기 충격이 번지는 중.",
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
          text: "이란 혁명수비대 사령관이 호르무즈 해협 봉쇄를 시사했어. 미국이 추가 제재를 발표한 직후 나온 발언이라 시장은 진짜 일어날 가능성을 가격에 반영하기 시작했어.",
        },
        {
          kind: "analogy",
          title: "왜 호르무즈가 그렇게 중요해?",
          text: "전 세계 원유의 약 20%, 천연가스의 30%가 이 좁은 해협을 지나. 좁은 다리 하나에 트럭들이 줄 서 있는 상황을 상상해봐. 다리가 닫히면 모든 게 멈춰.",
        },
        {
          kind: "paragraph",
          title: "어떻게 번질까?",
          text: "1단계는 유가 급등(이미 +7%). 2단계는 항공·해운 비용 증가, 정유주 마진 확대. 3단계는 인플레 재점화로 금리 인하 기대가 후퇴하면서 빅테크 변동성까지 번져.",
        },
        {
          kind: "callout",
          title: "지금 가장 흔들릴 것",
          text: "단기적으로는 항공주(DAL, AAL)가 가장 빠르게 빠질 가능성. 정유주(XOM, CVX)는 반대로 단기 강세. 다만 실제 봉쇄가 일어나지 않으면 며칠 안에 되돌림이 올 수 있으니 추격 매수는 위험.",
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

const stockDetail: {
  symbol: string;
  name: string;
  price: string;
  change: number;
  buyReasons: { icon: string; title: string; desc: string }[];
  sellReasons: { icon: string; title: string; desc: string }[];
  scoreDetails: ScoreAxis[];
} = {
  symbol: "AAPL",
  name: "애플",
  price: "257.46",
  change: 1.24,
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
  // 5개 관점 — 각 관점은 점수 + 한줄평 + 핵심 지표 + 학습 포인트로 압축. 차트는 데이터가 깔끔히 잡히는 관점에만.
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
      desc: "빚(D/E 3.87)은 업계 평균보다 많지만, 영업으로 1년에 $111B 현금을 찍어내는 회사야. 갚을 능력이 빚보다 빠르게 자라는 중이라 망할 걱정은 거의 없어.",
      learning:
        "부채비율(D/E)만 보면 함정 — 영업현금흐름이랑 같이 봐야 진짜 망할 회사인지 보여.",
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
};

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
  withPencil = false,
}: {
  size?: number;
  withPencil?: boolean;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <ellipse cx="60" cy="114" rx="32" ry="3.5" fill="rgba(0,0,0,0.14)" />
      <path
        d="M28 94 Q28 72 44 70 Q60 68 76 70 Q92 72 92 94 Q92 110 60 110 Q28 110 28 94 Z"
        fill="#1A1A1C"
      />
      <ellipse cx="48" cy="84" rx="14" ry="5" fill="#3A3A3F" opacity="0.45" />
      <path d="M34 30 Q32 14 44 20 Q48 26 46 32 Z" fill="#1A1A1C" />
      <path d="M86 30 Q88 14 76 20 Q72 26 74 32 Z" fill="#1A1A1C" />
      <circle cx="60" cy="50" r="32" fill="#1A1A1C" />
      <ellipse cx="48" cy="40" rx="13" ry="7" fill="#3A3A3F" opacity="0.4" />
      <ellipse cx="48" cy="50" rx="7" ry="8" fill="#fff" />
      <ellipse cx="72" cy="50" rx="7" ry="8" fill="#fff" />
      <ellipse cx="48.5" cy="51" rx="4" ry="5.6" fill="#1A1A1C" />
      <ellipse cx="72.5" cy="51" rx="4" ry="5.6" fill="#1A1A1C" />
      <circle cx="50" cy="48" r="1.4" fill="#fff" />
      <circle cx="74" cy="48" r="1.4" fill="#fff" />
      <path d="M57 60 L63 60 L60 63.5 Z" fill="#FFB892" />
      <path
        d="M60 63.5 L60 66"
        stroke="#3A3A3F"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M55 67.5 Q57.5 69.5 60 66.5"
        stroke="#3A3A3F"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M65 67.5 Q62.5 69.5 60 66.5"
        stroke="#3A3A3F"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M50 78 L60 84 L70 78 L67 88 L53 88 Z" fill="#fff" />
      <rect x="55.5" y="81" width="9" height="7" rx="1.5" fill="#fff" />
      <line
        x1="60"
        y1="82.5"
        x2="60"
        y2="86.5"
        stroke="#1A1A1C"
        strokeWidth="0.6"
        opacity="0.35"
      />
      {withPencil && (
        <g transform="rotate(-18 30 86)">
          <rect x="10" y="82" width="34" height="8" rx="2" fill="#F4C99B" />
          <rect x="10" y="82" width="5" height="8" fill={ACCENT_DEEP} />
          <polygon points="44,82 52,86 44,90" fill="#FFE3C7" />
          <polygon points="50,85 52,86 50,87" fill="#1A1A1C" />
        </g>
      )}
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
  onSeeAllStocks,
  onSelectStock,
}: {
  onSeeAllStocks: () => void;
  onSelectStock: () => void;
}) {
  const top = dailyCards[0];
  return (
    <div className="px-5 pt-2">
      <article
        className="relative mb-3 overflow-hidden rounded-[28px] p-6 pr-4"
        style={{ background: HERO, boxShadow: SHADOW_HERO, minHeight: 200 }}
      >
        <div
          className="text-[12px] font-bold"
          style={{ color: ACCENT_DEEP, letterSpacing: -0.1 }}
        >
          오늘의 시장 브리핑
        </div>
        <h2
          className="mt-1 text-[22px] font-extrabold leading-tight"
          style={{ color: TEXT, letterSpacing: -0.4 }}
        >
          {top.headline}
        </h2>
        <div
          className="mt-1.5 flex items-center gap-2 text-[13px] font-medium"
          style={{ color: TEXT, opacity: 0.7 }}
        >
          <TierStars tier={top.tier} size={12} />
          <span>
            {CATEGORY_LABEL[top.category]} · {top.time}
          </span>
        </div>
        <button
          type="button"
          className="mt-5 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-extrabold"
          style={{ background: ACCENT, color: "#fff", boxShadow: SHADOW }}
        >
          보러가기 <span style={{ fontSize: 11 }}>▶</span>
        </button>
        <div className="absolute" style={{ right: -6, bottom: -10 }}>
          <Mascot size={150} withPencil />
        </div>
      </article>

      <SectionHeader title="더 많은 이슈" cta="전체보기 →" />
      <div
        className="-mx-5 mb-7 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-3 px-5">
          {dailyCards.slice(1).map((card) => (
            <DailyCard key={card.id} card={card} />
          ))}
        </div>
      </div>

      <SectionHeader
        title="나의 관심 종목"
        cta={`전체 ${watchlist.length}개 →`}
        onCta={onSeeAllStocks}
      />
      <ul
        className="overflow-hidden rounded-[24px]"
        style={{ background: SURFACE, boxShadow: SHADOW }}
      >
        {watchlist.slice(0, 3).map((s, i) => (
          <li key={s.symbol}>
            <StockRow
              stock={s}
              divided={i > 0}
              onClick={onSelectStock}
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

function IssueScreen() {
  const [filter, setFilter] = useState<Filter>("general");
  const [active, setActive] = useState<Issue | null>(null);
  const visible = issueList.filter((i) => i.category === filter);

  if (active) {
    return <IssueDetail issue={active} onBack={() => setActive(null)} />;
  }

  return (
    <div className="px-5 pt-4">
      <h1 className="mb-3 text-[20px] font-extrabold" style={{ color: TEXT }}>
        오늘의 이슈
      </h1>
      <div className="mb-4 flex gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="rounded-full px-3.5 py-1.5 text-[12px] font-bold transition"
              style={{
                background: active ? TEXT : SURFACE,
                color: active ? "#fff" : SUB,
                border: `1px solid ${active ? TEXT : LINE}`,
              }}
            >
              {CATEGORY_LABEL[f]}
            </button>
          );
        })}
      </div>

      {filter === "mine" ? (
        <MineGroupedList items={visible} onOpen={setActive} />
      ) : filter === "sector" ? (
        <SectorGroupedList items={visible} onOpen={setActive} />
      ) : (
        <GeneralGroupedList items={visible} onOpen={setActive} />
      )}
    </div>
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
        return (
          <section key={topic}>
            <header className="mb-2 flex items-center gap-2.5 px-1">
              <span
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[14px]"
                style={{ background: ACCENT_SOFT }}
              >
                {meta.icon}
              </span>
              <span
                className="text-[15px] font-extrabold"
                style={{ color: TEXT }}
              >
                {meta.label}
              </span>
              <span
                className="ml-auto text-[11px] font-bold"
                style={{ color: ACCENT_DEEP }}
              >
                {topicIssues.length}건
              </span>
            </header>
            <ul className="flex flex-col gap-2">
              {topicIssues.map((i) => (
                <IssueItem key={i.id} issue={i} onOpen={onOpen} />
              ))}
            </ul>
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
        return (
          <section key={sector}>
            <header className="mb-2 flex items-center gap-2.5 px-1">
              <span
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[14px]"
                style={{ background: ACCENT_SOFT }}
              >
                {icon}
              </span>
              <span
                className="text-[15px] font-extrabold"
                style={{ color: TEXT }}
              >
                {sector}
              </span>
              <span
                className="ml-auto text-[11px] font-bold"
                style={{ color: ACCENT_DEEP }}
              >
                {sectorIssues.length}건
              </span>
            </header>
            <ul className="flex flex-col gap-2">
              {sectorIssues.map((i) => (
                <IssueItem key={i.id} issue={i} onOpen={onOpen} />
              ))}
            </ul>
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
  // 관심종목 순서대로 그룹핑 — 이슈 없는 종목은 안 보여줌
  const groups = watchlist
    .map((stock) => ({
      stock,
      issues: items.filter((i) => i.symbol === stock.symbol),
    }))
    .filter((g) => g.issues.length > 0);

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
      {groups.map(({ stock, issues }) => (
        <section key={stock.symbol}>
          <header className="mb-2 flex items-center gap-2.5 px-1">
            <StockLogo symbol={stock.symbol} size={28} />
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-[15px] font-extrabold"
                style={{ color: TEXT }}
              >
                {stock.name}
              </span>
              <span className="text-[11px]" style={{ color: SUB }}>
                {stock.symbol}
              </span>
            </div>
            <span
              className="ml-auto text-[11px] font-bold"
              style={{ color: ACCENT_DEEP }}
            >
              {issues.length}건
            </span>
          </header>
          <ul className="flex flex-col gap-2">
            {issues.map((i) => (
              <IssueItem key={i.id} issue={i} onOpen={onOpen} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function StocksScreen({ onSelectStock }: { onSelectStock: () => void }) {
  return (
    <div className="px-5 pt-4">
      <h1 className="mb-3 text-[20px] font-extrabold" style={{ color: TEXT }}>
        종목 검색
      </h1>
      <input
        type="search"
        placeholder="종목명·티커 검색"
        className="mb-5 w-full rounded-xl px-4 py-3 text-[14px] outline-none"
        style={{ background: SURFACE, boxShadow: SHADOW, color: TEXT }}
      />

      <div className="mb-2 text-[12px] font-bold" style={{ color: SUB }}>
        최근 본 종목
      </div>
      <ul className="flex flex-col gap-2">
        {watchlist.map((s) => (
          <li
            key={s.symbol}
            className="rounded-[22px]"
            style={{ background: SURFACE, boxShadow: SHADOW }}
          >
            <StockRow
              stock={s}
              onClick={onSelectStock}
              trailing={
                <span className="text-[18px]" style={{ color: SUB }}>
                  ☆
                </span>
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function StockDetail({ onBack }: { onBack: () => void }) {
  const d = stockDetail;
  const [showScores, setShowScores] = useState(false);
  if (showScores) {
    return <StockScoresScreen onBack={() => setShowScores(false)} />;
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
  d: typeof stockDetail;
  onBack: () => void;
  onSeeScores: () => void;
}) {
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

      <div
        className="mb-6 rounded-[22px] p-4"
        style={{ background: SURFACE, boxShadow: SHADOW }}
      >
        <svg
          viewBox="0 0 320 80"
          className="w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="apri" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,55 C40,50 60,60 90,42 C120,28 150,38 180,30 C210,24 240,40 270,22 C290,12 310,18 320,14 L320,80 L0,80 Z"
            fill="url(#apri)"
          />
          <path
            d="M0,55 C40,50 60,60 90,42 C120,28 150,38 180,30 C210,24 240,40 270,22 C290,12 310,18 320,14"
            fill="none"
            stroke={ACCENT_DEEP}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <div className="mt-2 text-[11px]" style={{ color: SUB }}>
          최근 한 달 동향 — 자세한 가격은 추후
        </div>
      </div>

      <h2 className="mb-2 text-[15px] font-extrabold" style={{ color: TEXT }}>
        살 이유
      </h2>
      <div className="mb-6 flex flex-col gap-2">
        {d.buyReasons.map((r) => (
          <ReasonCard key={r.title} {...r} />
        ))}
      </div>

      <h2 className="mb-2 text-[15px] font-extrabold" style={{ color: TEXT }}>
        팔 이유
      </h2>
      <div className="mb-6 flex flex-col gap-2">
        {d.sellReasons.map((r) => (
          <ReasonCard key={r.title} {...r} />
        ))}
      </div>

      <h2 className="mb-2 text-[15px] font-extrabold" style={{ color: TEXT }}>
        5가지 관점 평가
      </h2>
      <div
        className="mb-3 rounded-[22px] p-4"
        style={{ background: SURFACE, boxShadow: SHADOW }}
      >
        <ul className="flex flex-col gap-3">
          {d.scoreDetails.map((axis) => (
            <li key={axis.key} className="flex items-center gap-3">
              <span
                className="flex w-5 items-center justify-center"
                style={{ color: ACCENT_DEEP }}
              >
                <AxisIcon axisKey={axis.key} size={18} />
              </span>
              <span
                className="w-14 text-[12.5px] font-medium"
                style={{ color: SUB }}
              >
                {axis.key}
              </span>
              <div
                className="h-2 flex-1 overflow-hidden rounded-full"
                style={{ background: LINE }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${axis.score}%`, background: ACCENT }}
                />
              </div>
              <span
                className="w-8 text-right text-[13px] font-extrabold"
                style={{ color: TEXT, fontVariantNumeric: "tabular-nums" }}
              >
                {axis.score}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={onSeeScores}
        className="mb-2 flex w-full items-center justify-center gap-1 rounded-xl py-3.5 text-[14px] font-bold"
        style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
      >
        자세히 보기 →
      </button>
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
  return (
    <article
      className="rounded-[22px] p-5"
      style={{ background: SURFACE, boxShadow: SHADOW }}
    >
      <header className="mb-4 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{ background: ACCENT_SOFT, color: ACCENT_DEEP }}
        >
          <AxisIcon axisKey={axis.key} size={22} />
        </span>
        <div className="flex-1">
          <div className="text-[15px] font-extrabold" style={{ color: TEXT }}>
            {axis.key}
          </div>
          <div className="text-[12px]" style={{ color: SUB }}>
            {axis.oneLine}
          </div>
        </div>
        <div
          className="flex h-9 min-w-[44px] items-center justify-center rounded-xl px-2 text-[14px] font-extrabold"
          style={{
            background: ACCENT,
            color: "#fff",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {axis.score}
        </div>
      </header>

      {axis.chart && (
        <section
          className="mb-4 rounded-2xl p-3"
          style={{ background: ACCENT_SOFT }}
        >
          <ScoreChart chart={axis.chart} />
        </section>
      )}

      <div className="mb-4 grid grid-cols-3 gap-2">
        {axis.indicators.map((ind) => (
          <div
            key={ind.name}
            className="rounded-2xl p-2.5"
            style={{ border: `1px solid ${LINE}`, background: SURFACE }}
          >
            <div
              className="mb-1 text-[10.5px] font-bold leading-tight"
              style={{ color: SUB }}
            >
              {ind.name}
            </div>
            <div
              className="text-[15px] font-extrabold leading-none"
              style={{ color: ACCENT_DEEP, fontVariantNumeric: "tabular-nums" }}
            >
              {ind.value}
            </div>
            {ind.note && (
              <div
                className="mt-1 text-[10px] leading-tight"
                style={{ color: SUB }}
              >
                {ind.note}
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="mb-3 flex gap-2 rounded-2xl p-3"
        style={{ background: ACCENT_SOFT }}
      >
        <Mascot size={28} />
        <p className="text-[12.5px] leading-relaxed" style={{ color: TEXT }}>
          {axis.desc}
        </p>
      </div>

      <div className="rounded-2xl p-3" style={{ background: HERO, color: TEXT }}>
        <div
          className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold"
          style={{ color: ACCENT_DEEP, letterSpacing: 0.3 }}
        >
          💡 학습 포인트
        </div>
        <p className="text-[12.5px] leading-relaxed" style={{ color: TEXT }}>
          {axis.learning}
        </p>
      </div>
    </article>
  );
}

function StockScoresScreen({ onBack }: { onBack: () => void }) {
  const d = stockDetail;
  const total = Math.round(
    d.scoreDetails.reduce((s, a) => s + a.score, 0) / d.scoreDetails.length,
  );
  // 첫 진입 — 가장 점수 높은 관점을 기본 선택
  const defaultPick = d.scoreDetails.reduce((a, b) =>
    a.score >= b.score ? a : b,
  ).key;
  const [pick, setPick] = useState<string>(defaultPick);
  const visible = d.scoreDetails.find((a) => a.key === pick);

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
        className="mb-5 rounded-[24px] p-5"
        style={{ background: HERO, boxShadow: SHADOW_HERO }}
      >
        <div className="mb-2 flex items-center gap-2">
          <StockLogo symbol={d.symbol} size={36} />
          <div>
            <div className="text-[18px] font-extrabold" style={{ color: TEXT }}>
              {d.name}
            </div>
            <div className="text-[11px]" style={{ color: ACCENT_DEEP }}>
              5가지 관점 자세히
            </div>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className="text-[40px] font-extrabold leading-none"
            style={{ color: TEXT, letterSpacing: -1 }}
          >
            {total}
          </span>
          <span className="text-[16px] font-extrabold" style={{ color: SUB }}>
            / 100
          </span>
          <span
            className="ml-2 text-[12.5px] font-bold"
            style={{ color: ACCENT_DEEP }}
          >
            5개 관점 평균
          </span>
        </div>
      </div>

      <div className="no-scrollbar -mx-5 mb-4 overflow-x-auto px-5">
        <div className="flex gap-2">
          {d.scoreDetails.map((axis) => {
            const active = pick === axis.key;
            return (
              <button
                key={axis.key}
                type="button"
                onClick={() => setPick(axis.key)}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-bold transition"
                style={{
                  background: active ? TEXT : SURFACE,
                  color: active ? "#fff" : SUB,
                  border: `1px solid ${active ? TEXT : LINE}`,
                }}
              >
                <span
                  className="flex items-center"
                  style={{ color: active ? "#fff" : ACCENT_DEEP }}
                >
                  <AxisIcon axisKey={axis.key} size={14} />
                </span>
                <span>{axis.key}</span>
                <span
                  className="text-[11px] font-extrabold"
                  style={{
                    color: active ? "rgba(255,255,255,0.7)" : ACCENT_DEEP,
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

function MyScreen({ onSelectStock }: { onSelectStock: () => void }) {
  return (
    <div className="px-5 pt-4">
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
          오늘도 보러 와줬구나
        </div>
        <div className="mt-1 text-[12.5px]" style={{ color: SUB }}>
          이 속도면 한 달 안에 시장 보는 눈 생겨
        </div>

        <div className="mt-5 grid w-full grid-cols-2 gap-2">
          <Stat label="오늘 학습한 이슈" value="7건" />
          <Stat label="누적 학습일" value="38일" />
        </div>
      </div>

      <div className="mb-2 flex items-baseline gap-1.5">
        <h2 className="text-[15px] font-extrabold" style={{ color: TEXT }}>
          내 관심 종목
        </h2>
        <span className="text-[12px] font-bold" style={{ color: SUB }}>
          {watchlist.length}
        </span>
      </div>
      <ul
        className="overflow-hidden rounded-[22px]"
        style={{ background: SURFACE, boxShadow: SHADOW }}
      >
        {watchlist.map((s, i) => (
          <li key={s.symbol}>
            <StockRow
              stock={s}
              divided={i > 0}
              onClick={onSelectStock}
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

const SETTINGS_ITEMS = [
  "회원 정보 수정",
  "알림 시간 설정",
  "관심 종목 관리",
  "이용 약관",
  "개인정보 처리방침",
  "버전 정보",
  "로그아웃",
];

function SettingsScreen() {
  return (
    <div className="px-5 pt-4">
      <h1 className="mb-3 text-[20px] font-extrabold" style={{ color: TEXT }}>
        설정
      </h1>
      <ul
        className="rounded-[22px]"
        style={{ background: SURFACE, boxShadow: SHADOW }}
      >
        {SETTINGS_ITEMS.map((it, i) => (
          <li
            key={it}
            className="flex items-center justify-between px-4 py-4 text-[14px]"
            style={{
              color: TEXT,
              ...(i > 0 ? { borderTop: `1px solid ${LINE}` } : {}),
            }}
          >
            <span>{it}</span>
            <span style={{ color: SUB }}>›</span>
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
  const openDetail = () => setShowDetail(true);

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
        {showDetail ? (
          <StockDetail onBack={() => setShowDetail(false)} />
        ) : (
          <>
            {tab === "home" && (
              <HomeScreen
                onSeeAllStocks={() => setTab("stocks")}
                onSelectStock={openDetail}
              />
            )}
            {tab === "issue" && <IssueScreen />}
            {tab === "stocks" && <StocksScreen onSelectStock={openDetail} />}
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
          setTab(t);
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

function IssueDetail({ issue, onBack }: { issue: Issue; onBack: () => void }) {
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

      {detail?.body && <BodyBlocks blocks={detail.body} />}

      {detail?.body && <TermSlider blocks={detail.body} />}

      {issue.coachLine && <CoachOneLiner line={issue.coachLine} />}

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

function BodyBlocks({ blocks }: { blocks: NonNullable<IssueDetail["body"]> }) {
  return (
    <section className="mb-5">
      <SectionHeader title="설명" />
      <div
        className="rounded-[20px] p-5"
        style={{ background: SURFACE, boxShadow: SHADOW }}
      >
        {blocks.map((b, i) => (
          <div key={i} className={i > 0 ? "mt-4" : ""}>
            {b.title && (
              <div
                className="mb-1.5 text-[13px] font-extrabold"
                style={{ color: TEXT }}
              >
                {b.title}
              </div>
            )}
            <div
              className="text-[13.5px] leading-relaxed"
              style={{
                color: TEXT,
                fontWeight: b.kind === "lead" ? 500 : 400,
              }}
            >
              {b.text}
            </div>
          </div>
        ))}
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

