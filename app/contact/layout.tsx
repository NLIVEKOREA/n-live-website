import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "문의하기 — 파트너십 상담",
  description: "엔라이브 파트너십 문의. 브랜드, 셀러·인플루언서, 왕홍, 미디어 파트너 모두 환영합니다. 영업일 48시간 이내 회신.",
  keywords: ["엔라이브 문의", "한중 라이브커머스 상담", "왕홍 매칭 문의", "엔라이브 파트너십"],
  openGraph: { title: "파트너십 문의 · 엔라이브 N-LIVE", description: "한중 크로스보더 파트너십 문의 — 영업일 48시간 이내 회신." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
