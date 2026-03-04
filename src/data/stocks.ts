export interface StockData {
  ticker: string;
  name: string;
  marketCap: string;
  logoText: string;
  category: string;
}

export const ALL_STOCKS: StockData[] = [
  { ticker: "NVDA", name: "엔비디아 (NVIDIA Corp.)", marketCap: "시총 2.3T USD", logoText: "AI", category: "AI·반도체" },
  { ticker: "TSLA", name: "테슬라 (Tesla, Inc.)", marketCap: "시총 540B USD", logoText: "AI", category: "AI·반도체" },
  { ticker: "AAPL", name: "애플 (Apple Inc.)", marketCap: "시총 2.6T USD", logoText: "AAPL", category: "AI·반도체" },
  { ticker: "MSFT", name: "마이크로소프트 (Microsoft)", marketCap: "시총 3.1T USD", logoText: "MSFT", category: "AI·반도체" },
  { ticker: "GOOGL", name: "구글 (Alphabet Inc.)", marketCap: "시총 1.9T USD", logoText: "GOOGL", category: "AI·반도체" },
  { ticker: "AMZN", name: "아마존 (Amazon.com)", marketCap: "시총 1.8T USD", logoText: "AMZN", category: "플랫폼" },
  { ticker: "META", name: "메타 (Meta Platforms)", marketCap: "시총 1.2T USD", logoText: "META", category: "플랫폼" },
  { ticker: "AMD", name: "AMD (Advanced Micro)", marketCap: "시총 230B USD", logoText: "AMD", category: "AI·반도체" },
  { ticker: "INTC", name: "인텔 (Intel Corp.)", marketCap: "시총 110B USD", logoText: "INTC", category: "AI·반도체" },
  { ticker: "QCOM", name: "퀄컴 (Qualcomm)", marketCap: "시총 190B USD", logoText: "QCOM", category: "AI·반도체" },
  { ticker: "AVGO", name: "브로드컴 (Broadcom)", marketCap: "시총 620B USD", logoText: "AVGO", category: "AI·반도체" },
  { ticker: "LG에너지", name: "LG에너지솔루션", marketCap: "시총 80T KRW", logoText: "LG", category: "2차전지" },
  { ticker: "삼성SDI", name: "삼성SDI", marketCap: "시총 25T KRW", logoText: "SDI", category: "2차전지" },
  { ticker: "CATL", name: "CATL (닝더스다이)", marketCap: "시총 150B USD", logoText: "CATL", category: "2차전지" },
  { ticker: "PANW", name: "팔로알토 (Palo Alto)", marketCap: "시총 95B USD", logoText: "PANW", category: "AI·반도체" },
  { ticker: "CRM", name: "세일즈포스 (Salesforce)", marketCap: "시총 250B USD", logoText: "CRM", category: "플랫폼" },
  { ticker: "NFLX", name: "넷플릭스 (Netflix)", marketCap: "시총 260B USD", logoText: "NFLX", category: "플랫폼" },
  { ticker: "JNJ", name: "존슨앤존슨 (J&J)", marketCap: "시총 380B USD", logoText: "JNJ", category: "헬스케어" },
  { ticker: "UNH", name: "유나이티드헬스 (UNH)", marketCap: "시총 450B USD", logoText: "UNH", category: "헬스케어" },
  { ticker: "PFE", name: "화이자 (Pfizer)", marketCap: "시총 160B USD", logoText: "PFE", category: "헬스케어" },
  { ticker: "ABBV", name: "애브비 (AbbVie)", marketCap: "시총 280B USD", logoText: "ABBV", category: "헬스케어" },
  { ticker: "MRK", name: "머크 (Merck & Co.)", marketCap: "시총 310B USD", logoText: "MRK", category: "헬스케어" },
  { ticker: "SK이노", name: "SK이노베이션", marketCap: "시총 15T KRW", logoText: "SK", category: "2차전지" },
  { ticker: "에코프로", name: "에코프로비엠", marketCap: "시총 12T KRW", logoText: "ECO", category: "2차전지" },
  { ticker: "BABA", name: "알리바바 (Alibaba)", marketCap: "시총 220B USD", logoText: "BABA", category: "플랫폼" },
];
