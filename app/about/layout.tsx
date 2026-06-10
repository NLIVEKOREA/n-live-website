import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "회사소개",
  description: "엔라이브(N-LIVE)는 한중 크로스보더 라이브커머스 에이전시. 한국과 해외의 브랜드·셀러·왕홍·인플루언서를 잇는 4가지 구조적 경쟁력.",
  openGraph: {
    title: "회사소개 · 엔라이브 N-LIVE",
    description: "한중 크로스보더 라이브커머스 에이전시 엔라이브의 경쟁력과 회사 정보.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
