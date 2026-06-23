import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/gate";
import full from "@/data/pool-brands.full.json";

export const dynamic = "force-dynamic";

// 공개 노출 상태 / 민감 필드(공개본에서 제거)
const VISIBLE = ["게시완료", "게시요청"];
const SENSITIVE = ["supplyRate"];

// 공급률 등 민감값은 레포가 아닌 서버 환경변수(BRAND_RATES)에만 존재 — 인증 시에만 병합
function brandRates(): Record<string, string> {
  try {
    return JSON.parse(process.env.BRAND_RATES || "{}");
  } catch {
    return {};
  }
}

export async function GET(req: Request) {
  const authed = isAuthed(req.headers.get("cookie"));
  let brands = full as any[];
  if (authed) {
    // 인증: 전체 브랜드 + 환경변수의 공급률 병합
    const rates = brandRates();
    brands = brands.map((b) =>
      rates[b.realName] ? { ...b, supplyRate: rates[b.realName] } : b
    );
  } else {
    // 미인증: 공개 상태 브랜드만 + 민감필드 제거 → 숨김브랜드/공급률은 서버 밖으로 안 나감
    brands = brands
      .filter((b) => !b.status || VISIBLE.includes(b.status))
      .map((b) => {
        const c: any = { ...b };
        SENSITIVE.forEach((k) => delete c[k]);
        return c;
      });
  }
  return NextResponse.json(
    { authed, brands },
    { headers: { "Cache-Control": "no-store" } }
  );
}
