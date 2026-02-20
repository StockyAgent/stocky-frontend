# Stocky Frontend

AI 기반 주식 분석 서비스 **Stocky**의 프론트엔드 애플리케이션입니다.

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **폰트**: Noto Sans KR (Google Fonts)

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

`http://localhost:3000`에서 앱을 확인할 수 있습니다.

## 페이지 구조

| 경로                | 설명                                      |
| ------------------- | ----------------------------------------- |
| `/onboarding/step1` | 투자 성향 선택 (투자자 / 트레이더)        |
| `/onboarding/step2` | 관심 종목 선택                            |
| `/dashboard`        | AI 분석 대시보드 (데일리 브리핑 + 리포트) |
| `/reports`          | 리포트 히스토리 전체 목록                 |
| `/watchlist`        | 관심 종목 관리                            |
| `/mypage`           | 마이페이지 (프로필, 설정)                 |

## 프로젝트 구조

```
src/
├── app/                    # 페이지 (App Router)
│   ├── dashboard/
│   ├── reports/
│   ├── watchlist/
│   ├── mypage/
│   └── onboarding/
│       ├── step1/
│       └── step2/
├── components/
│   ├── ui/                 # 공유 UI (NavBar, SubpageHeader, ...)
│   ├── onboarding/         # 온보딩 전용 (StockCard, SearchBar, ...)
│   └── dashboard/          # 대시보드 전용 (ReportCard, BriefingTag, ...)
public/
└── icons/                  # SVG 아이콘
```
