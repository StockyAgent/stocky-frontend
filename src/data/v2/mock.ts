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
