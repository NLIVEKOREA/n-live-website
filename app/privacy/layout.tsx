import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "엔라이브의 개인정보처리방침. 수집 항목·목적·보유기간·이용자 권리 안내.",
  robots: { index: false, follow: true },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
