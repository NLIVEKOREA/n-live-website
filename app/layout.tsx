import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/components/LangContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Effects from "@/components/Effects";

const SITE_URL = "https://www.n-live.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "엔라이브 N-LIVE · 한중 크로스보더 라이브커머스 에이전시",
    template: "%s · 엔라이브 N-LIVE",
  },
  description:
    "엔라이브(N-LIVE)는 한국과 해외의 브랜드·셀러·인플루언서·왕홍을 직접 연결하는 한중 크로스보더 라이브커머스 에이전시입니다. 중국 왕홍 매칭, 한국 연예인 PPL, K-Beauty·K-Fashion 직공급, 샤오홍슈·더우인 운영까지.",
  keywords: [
    "엔라이브",
    "N-LIVE",
    "한중 라이브커머스",
    "크로스보더 에이전시",
    "왕홍 마케팅",
    "중국 왕홍 매칭",
    "한국 연예인 PPL",
    "K-Beauty 중국 진출",
    "K-Fashion 중국 진출",
    "샤오홍슈 마케팅",
    "더우인 라이브",
    "한국 KOL 네트워크",
    "한국 인플루언서 에이전시",
    "라이브커머스 에이전시",
    "한중 무역",
    "中韩跨境电商",
    "韩国KOL",
    "韩国直播代理",
  ],
  authors: [{ name: "엔라이브 N-LIVE" }],
  creator: "엔라이브",
  publisher: "엔라이브",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
    languages: {
      "ko-KR": "/",
      "en-US": "/",
      "zh-CN": "/",
      "ja-JP": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    url: SITE_URL,
    siteName: "엔라이브 N-LIVE",
    title: "엔라이브 N-LIVE · 한중 크로스보더 라이브커머스 에이전시",
    description:
      "브랜드와 셀러, 국경 너머 직접 연결. 한국과 해외의 브랜드·인플루언서·왕홍을 잇는 크로스보더 에이전시 — 엔라이브.",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "엔라이브 N-LIVE — Korea × Global Brand & Influencer Agency" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "엔라이브 N-LIVE · 한중 크로스보더 에이전시",
    description: "브랜드와 셀러, 국경 너머 직접 연결.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

// ─────────────────────────────────────────────────────
// 구조화된 데이터 (JSON-LD) — 네이버/구글 검색 결과에
// "브랜드 박스" 노출 확률을 높이는 Organization 스키마
// ─────────────────────────────────────────────────────
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "엔라이브",
  alternateName: ["N-LIVE", "恩联", "Nlive"],
  url: SITE_URL,
  logo: `${SITE_URL}/og-square.png`,
  image: `${SITE_URL}/og.png`,
  description:
    "엔라이브(N-LIVE)는 한국과 해외의 브랜드·셀러·인플루언서·왕홍을 직접 연결하는 한중 크로스보더 라이브커머스 에이전시입니다.",
  sameAs: [
    // 필요 시 SNS URL 추가 (Instagram, YouTube, 네이버 블로그 등)
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "won4646@naver.com",
    contactType: "customer support",
    availableLanguage: ["Korean", "Chinese", "English", "Japanese"],
  },
  areaServed: ["KR", "CN", "JP", "US"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "엔라이브 N-LIVE",
  url: SITE_URL,
  inLanguage: ["ko-KR", "zh-CN", "en-US", "ja-JP"],
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+JP:wght@300;400;500;700;900&family=Noto+Sans+SC:wght@300;400;500;700;900&family=Unbounded:wght@400;600;700;800;900&family=Bebas+Neue&family=Anton&family=Big+Shoulders+Display:wght@500;700;800;900&family=Black+Han+Sans&family=Jua&family=Saira+Stencil+One&family=Archivo+Black&family=Bowlby+One&display=swap" rel="stylesheet" />
        <meta name="naver-site-verification" content="" />
        <meta name="google-site-verification" content="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="lang-ko">
        <LangProvider>
          <Effects />
          <Nav />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
