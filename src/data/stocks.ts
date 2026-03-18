import type { StockData } from "@/types";

export type { StockData };

/** 종목 카테고리 목록 상수 — 각 페이지에서 공통 사용 */
export const STOCK_CATEGORIES = ["전체", "AI·반도체", "2차전지", "헬스케어", "플랫폼"] as const;
export type StockCategory = (typeof STOCK_CATEGORIES)[number];

export const ALL_STOCKS: StockData[] = [
  { ticker: "NVDA",   name: "엔비디아 (NVIDIA Corp.)",      marketCap: "시총 2.3T USD", logoText: "NV",   category: "AI·반도체", price: "$880.45"  },
  { ticker: "TSLA",   name: "테슬라 (Tesla, Inc.)",          marketCap: "시총 540B USD",  logoText: "TS",   category: "AI·반도체", price: "$240.10"  },
  { ticker: "AAPL",   name: "애플 (Apple Inc.)",             marketCap: "시총 2.6T USD",  logoText: "AP",   category: "AI·반도체", price: "$193.20"  },
  { ticker: "MSFT",   name: "마이크로소프트 (Microsoft)",    marketCap: "시총 3.1T USD",  logoText: "MS",   category: "AI·반도체", price: "$415.30"  },
  { ticker: "GOOGL",  name: "구글 (Alphabet Inc.)",          marketCap: "시총 1.9T USD",  logoText: "GO",   category: "AI·반도체", price: "$175.20"  },
  { ticker: "AMZN",   name: "아마존 (Amazon.com)",           marketCap: "시총 1.8T USD",  logoText: "AZ",   category: "플랫폼",    price: "$185.50"  },
  { ticker: "META",   name: "메타 (Meta Platforms)",         marketCap: "시총 1.2T USD",  logoText: "FB",   category: "플랫폼",    price: "$510.20"  },
  { ticker: "AMD",    name: "AMD (Advanced Micro)",          marketCap: "시총 230B USD",  logoText: "AMD",  category: "AI·반도체", price: "$165.50"  },
  { ticker: "INTC",   name: "인텔 (Intel Corp.)",            marketCap: "시총 110B USD",  logoText: "IN",   category: "AI·반도체", price: "$20.40"   },
  { ticker: "QCOM",   name: "퀄컴 (Qualcomm)",               marketCap: "시총 190B USD",  logoText: "QC",   category: "AI·반도체", price: "$170.80"  },
  { ticker: "AVGO",   name: "브로드컴 (Broadcom)",           marketCap: "시총 620B USD",  logoText: "AV",   category: "AI·반도체", price: "$145.30"  },
  { ticker: "LG에너지", name: "LG에너지솔루션",             marketCap: "시총 80T KRW",   logoText: "LG",   category: "2차전지",   price: "₩82,000" },
  { ticker: "삼성SDI",  name: "삼성SDI",                    marketCap: "시총 25T KRW",   logoText: "SDI",  category: "2차전지",   price: "₩380,000"},
  { ticker: "CATL",   name: "CATL (닝더스다이)",             marketCap: "시총 150B USD",  logoText: "CT",   category: "2차전지",   price: "$35.20"   },
  { ticker: "PANW",   name: "팔로알토 (Palo Alto)",         marketCap: "시총 95B USD",   logoText: "PA",   category: "AI·반도체", price: "$175.60"  },
  { ticker: "CRM",    name: "세일즈포스 (Salesforce)",       marketCap: "시총 250B USD",  logoText: "SF",   category: "플랫폼",    price: "$290.10"  },
  { ticker: "NFLX",   name: "넷플릭스 (Netflix)",            marketCap: "시총 260B USD",  logoText: "NF",   category: "플랫폼",    price: "$620.40"  },
  { ticker: "JNJ",    name: "존슨앤존슨 (J&J)",              marketCap: "시총 380B USD",  logoText: "JJ",   category: "헬스케어",  price: "$155.20"  },
  { ticker: "UNH",    name: "유나이티드헬스 (UNH)",          marketCap: "시총 450B USD",  logoText: "UH",   category: "헬스케어",  price: "$490.30"  },
  { ticker: "PFE",    name: "화이자 (Pfizer)",               marketCap: "시총 160B USD",  logoText: "PF",   category: "헬스케어",  price: "$28.10"   },
  { ticker: "ABBV",   name: "애브비 (AbbVie)",               marketCap: "시총 280B USD",  logoText: "AB",   category: "헬스케어",  price: "$175.80"  },
  { ticker: "MRK",    name: "머크 (Merck & Co.)",            marketCap: "시총 310B USD",  logoText: "MK",   category: "헬스케어",  price: "$90.20"   },
  { ticker: "SK이노", name: "SK이노베이션",                  marketCap: "시총 15T KRW",   logoText: "SK",   category: "2차전지",   price: "₩105,000"},
  { ticker: "에코프로", name: "에코프로비엠",                marketCap: "시총 12T KRW",   logoText: "EC",   category: "2차전지",   price: "₩78,000" },
  { ticker: "BABA",   name: "알리바바 (Alibaba)",            marketCap: "시총 220B USD",  logoText: "BA",   category: "플랫폼",    price: "$85.40"   },
];
