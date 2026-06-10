import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/for-overseas-brands" },
  title: "해외 브랜드의 한국 진출 — 한국 연예인·KOL 마케팅",
  description: "엔라이브가 해외 브랜드에게 한국 정상급 연예인 100+, 한국 KOL 200+ 네트워크와 한국 라이브커머스 진입을 원스톱으로 제공합니다.",
  keywords: ["해외 브랜드 한국 진출", "한국 연예인 PPL", "한국 KOL 마케팅", "한류 마케팅", "K-POP 협업", "드라마 PPL", "엔라이브"],
  openGraph: {
    title: "해외 브랜드 → 한국 진출 · 엔라이브 N-LIVE",
    description: "한류 스타·한국 KOL 자원과 한국 시장 운영을 한 창구에서.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
