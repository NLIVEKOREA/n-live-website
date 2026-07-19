import { NextResponse } from "next/server";
import { roleFromCookie } from "@/lib/gate";
import full from "@/data/pool-brands.full.json";

export const dynamic = "force-dynamic";

const VISIBLE = ["게시완료", "게시요청"];
// 목록(카드)엔 불필요한 무거운 필드 — 상세는 /api/brand 로 개별 로드 (성능)
const HEAVY = [
  "shopProducts",
  "pricedProducts",
  "i18n",
  "marketingItems",
  "carriedBrands",
  "repProductUrls",
  "marketingUrls",
  "supplyRate",
];
function light(b: any) {
  const c: any = { ...b };
  HEAVY.forEach((k) => delete c[k]);
  return c;
}

export async function GET(req: Request) {
  const role = roleFromCookie(req.headers.get("cookie"));
  const authed = !!role;

  // 비공개/검수전 등은 5712(마스터)로도 노출 안 함 — 게시완료/게시요청만 홈페이지 노출
  const visibleAll = (full as any[]).filter((b) => !b.status || VISIBLE.includes(b.status));

  // 브랜드 풀 = 셀러·바이어 전용 (양방향 포지션 게이트) — 미인증·브랜드 코드는 목록 0건, 개수만 응답
  const allowed = role === "seller" || role === "all";
  const master = role === "all";
  const brands = allowed
    ? visibleAll.map((b) => {
        const c = light(b);
        // 공식 홈페이지 URL·내부 메모는 마스터 전용 (연락처·홈페이지는 매칭 확정 후 안내)
        if (!master) {
          delete c.url;
          delete c.note;
        }
        return c;
      })
    : [];

  return NextResponse.json(
    { authed, role: role || null, total: visibleAll.length, brands },
    { headers: { "Cache-Control": "no-store" } }
  );
}
