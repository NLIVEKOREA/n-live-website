import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로세스 — 파트너십 실행 프레임워크",
  description: "엔라이브의 파트너십 실행 프레임워크: 진단·전략 → 매칭·실행 → 확장·자산화. 한·중 양방향 파트너십 모두에 동일하게 적용되는 3단계 구조.",
  keywords: ["크로스보더 실행 프로세스", "라이브커머스 운영 프로세스", "왕홍 매칭 프로세스", "엔라이브 프로세스"],
  openGraph: { title: "파트너십 실행 프레임워크 · 엔라이브 N-LIVE", description: "전략 → 실행 → 확장. 단계별 파트너십 운영 구조." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
