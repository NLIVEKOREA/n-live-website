import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "한국 셀러·인플루언서 — 해외 왕홍 협업 & 해외 상품 조달",
  description: "엔라이브가 한국 셀러·인플루언서에게 해외 왕홍 콜라보와 해외 브랜드 상품 직공급을 연결합니다. 라이브의 다음 단계.",
  keywords: ["한국 셀러", "라이브커머스 인플루언서", "왕홍 콜라보", "해외 브랜드 직공급", "Grip 라이브", "엔라이브"],
  openGraph: {
    title: "한국 셀러·인플루언서 — 국경을 넘는 협업 · 엔라이브",
    description: "해외 왕홍과 협업하거나, 해외 브랜드를 라이브에서 판매하고 싶은 한국 셀러를 위한 솔루션.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
