import { NextResponse } from "next/server";
import full from "@/data/pool-brands.full.json";
import sellers from "@/data/pool-sellers.json";
import china from "@/data/pool-china.json";

export const dynamic = "force-dynamic";

const VISIBLE = ["게시완료", "게시요청"];
const MIN_FOLLOWERS = 50000;

// 이름 마스킹: 앞 절반만 노출 (매칭풀 카드와 동일 규칙, 서버에서 처리해 원본 비노출)
function maskName(name: string): string {
  const n = (name || "").trim();
  if (!n) return "";
  const half = Math.ceil(n.length / 2);
  return n.slice(0, half) + "*".repeat(Math.min(n.length - half, 4));
}

// 홈 마퀴 전용 공개 데이터 — 비식별 정보만 (로고 / 마스킹 이름·국가·팔로워). 실명·URL·ID는 미포함
export async function GET() {
  const brands = (full as any[])
    .filter((b) => b.logo && (!b.status || VISIBLE.includes(b.status)))
    .map((b) => ({ logo: b.logo, logoLight: !!b.logoLight }));

  const se = (sellers as any[])
    .filter((s) => s.image && (s.followers || 0) >= MIN_FOLLOWERS)
    .map((s) => ({
      image: s.image,
      name: maskName(s.realName || s.nickname || ""),
      country: s.country || "",
      category: s.category || "",
      followersText: s.followersText || "",
    }));

  const ch = (china as any[])
    .filter((c) => c.image && (c.followers || 0) >= MIN_FOLLOWERS)
    .map((c) => ({
      image: c.image,
      name: maskName(c.name || ""),
      country: "중국",
      category: "왕홍 라이브",
      followersText: c.followersText || "",
    }));

  return NextResponse.json(
    { brands, people: [...se, ...ch] },
    { headers: { "Cache-Control": "public, max-age=300" } }
  );
}
