# N-LIVE 엔라이브 공식 사이트

한중 크로스보더 라이브커머스 에이전시 공식 사이트. Next.js 14 App Router + 정적 export 기반.

## 구조

```
/                          — 메인 (히어로 + 4-축 매트릭스)
/about                     — 회사 소개
/for-korean-brands         — 한국 브랜드 상세 페이지
/for-korean-sellers        — 한국 셀러·인플루언서 상세 페이지
/for-overseas-brands       — 해외 브랜드 상세 페이지
/for-overseas-sellers      — 해외 셀러·왕홍 상세 페이지
/network                   — 네트워크 (왕홍 인프라, 한국 인플루언서 풀)
/process                   — 실행 프레임워크
/contact                   — 문의
```

4개 언어 지원: 한국어 / 중국어 / 영어 / 일본어 (클라이언트 언어 스위처).

## 로컬 개발

```bash
# 1. Node.js 18 이상 설치 필요
npm install
npm run dev
# → http://localhost:3000
```

## Vercel 배포 (추천)

1. 이 폴더(`nlive-app`)를 GitHub 저장소에 푸시
2. [vercel.com](https://vercel.com) 가입 → "Import Project" → GitHub 저장소 선택
3. Framework Preset: **Next.js** 자동 인식
4. "Deploy" 클릭 → 2~3분 후 배포 완료
5. Vercel이 `https://엔라이브-어쩌구.vercel.app` 형태의 임시 URL 제공
6. 본인 도메인(n-live.co.kr 등) 연결: Vercel 대시보드 → Settings → Domains

무료 티어로 충분합니다.

## 정적 HTML export (정적 호스팅용)

```bash
npm run build
# → out/ 폴더에 정적 HTML 파일들이 생성됨
```

생성된 `out/` 폴더는 Netlify, Cloudflare Pages, 일반 웹호스팅에도 그대로 올릴 수 있습니다.

## 문의 폼

현재 `/contact`의 폼은 [FormSubmit.co](https://formsubmit.co)를 통해 `won4646@naver.com`으로 발송됩니다. 첫 제출 시 해당 메일함에 한 번만 인증 클릭 필요.

발송량이 많아지면 Resend/SendGrid 등 전용 서비스로 업그레이드 가능합니다.

## 로고

`public/logo.svg`를 교체하면 사이트 전체 로고가 한 번에 업데이트됩니다.
