import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/for-korean-brands" },
  title: "한국 브랜드의 중국 진출 — 왕홍 매칭·플랫폼 운영",
  description: "엔라이브가 한국 브랜드의 중국 진출을 돕습니다. 검증된 중국 왕홍 500+ 네트워크 매칭, 샤오홍슈·더우인·타오바오 라이브 운영, 현지화·통관까지 원스톱.",
  keywords: ["한국 브랜드 중국 진출", "왕홍 매칭", "샤오홍슈 마케팅", "더우인 라이브", "K-Beauty 중국", "K-Fashion 중국", "엔라이브"],
  openGraph: {
    title: "한국 브랜드 → 중국 진출 · 엔라이브 N-LIVE",
    description: "검증된 중국 왕홍 네트워크와 플랫폼 운영으로 한국 브랜드의 중국 시장 진출을 지원합니다.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
