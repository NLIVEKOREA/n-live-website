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
  const master = role === "all";

  let brands = full as any[];
  // 마스터가 아니면 공개(게시완료/게시요청) 브랜드만
  if (!master) brands = brands.filter((b) => !b.status || VISIBLE.includes(b.status));
  // 목록은 항상 가볍게 (민감필드·무거운 배열 제거)
  brands = brands.map(light);

  return NextResponse.json(
    { authed, role: role || null, brands },
    { headers: { "Cache-Control": "no-store" } }
  );
}
