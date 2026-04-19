import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "이용약관",
  description: "엔라이브 홈페이지 이용약관.",
  robots: { index: false, follow: true },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
