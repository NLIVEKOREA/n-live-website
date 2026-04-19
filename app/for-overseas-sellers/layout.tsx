import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "해외 셀러·왕홍 — 한국 상품 직공급 & 한국 콘텐츠 제작",
  description: "엔라이브가 해외 왕홍·셀러에게 K-Beauty·K-Fashion 직공급과 한국 현지 콘텐츠 제작·연예인 콜라보를 지원합니다.",
  keywords: ["해외 왕홍", "중국 왕홍", "K-Beauty 직공급", "K-Fashion 직공급", "한국 콘텐츠 제작", "한국 연예인 콜라보", "엔라이브"],
  openGraph: {
    title: "해외 셀러·왕홍을 위한 한국 상품·콘텐츠 · 엔라이브",
    description: "한국 브랜드 직공급과 한국 현지 운영 지원으로 해외 왕홍·셀러의 한국 비즈니스를 풀어드립니다.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
