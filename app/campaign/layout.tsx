import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "샤오홍슈 체험단 모집 · 小红书体验官招募",
  description:
    "엔라이브(N-LIVE)가 직접 운영하는 샤오홍슈 체험단. 검증된 K-브랜드 무상 체험 + 콘텐츠 제작비 지급. 팔로워 규모 무관, 3분 신청. 小红书体验官招募中 — 免费体验韩国优质品牌，获得内容创作费。",
  alternates: { canonical: "/campaign" },
  openGraph: {
    title: "샤오홍슈 체험단 모집 중 · 小红书体验官招募 — 엔라이브 N-LIVE",
    description:
      "검증된 K-브랜드 무상 체험 · 콘텐츠 제작비 지급 · 영업일 48시간 내 회신. 免费体验韩国优质品牌，获得内容创作费，3分钟快速报名。",
    url: "/campaign",
  },
  twitter: {
    title: "샤오홍슈 체험단 모집 중 · 小红书体验官招募",
    description: "검증된 K-브랜드 무상 체험 · 콘텐츠 제작비 지급. 3분 신청.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
