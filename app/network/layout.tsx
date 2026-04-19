import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "네트워크 — 중국 왕홍·한국 인플루언서 자원 풀",
  description: "엔라이브의 검증된 자원 풀: 중국 왕홍 1,500+ 통합 네트워크와 한국 정상급 연예인 200+ 협업 풀. 콘텐츠 왕홍과 커머스 왕홍 두 축의 운영.",
  keywords: ["중국 왕홍 네트워크", "한국 KOL 풀", "콘텐츠 왕홍", "커머스 왕홍", "샤오홍슈 KOL", "더우인 라이브 인플루언서", "엔라이브"],
  openGraph: { title: "왕홍·인플루언서 네트워크 · 엔라이브 N-LIVE", description: "검증된 한·중 자원 풀을 단일 창구로 매칭합니다." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
