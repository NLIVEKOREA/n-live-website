import { NextResponse } from "next/server";
import { roleFromCookie } from "@/lib/gate";
import full from "@/data/pool-brands.full.json";

export const dynamic = "force-dynamic";

// 공개 노출 상태 / 민감 필드(공개본에서 제거)
const VISIBLE = ["게시완료", "게시요청"];
const SENSITIVE = ["supplyRate"];

// 공급률 등 민감값은 레포가 아닌 서버 환경변수(BRAND_RATES)에만 존재 — 마스터 인증 시에만 병합
function brandRates(): Record<string, string> {
  try {
    return JSON.parse(process.env.BRAND_RATES || "{}");
  } catch {
    return {};
  }
}

export async function GET(req: Request) {
  const role = roleFromCookie(req.headers.get("cookie"));
  const authed = !!role;
  const master = role === "all";

  let brands = full as any[];
  if (master) {
    // 마스터: 전체 브랜드(숨김 포함) + 환경변수 공급률 병합
    const rates = brandRates();
    brands = brands.map((b) =>
      rates[b.realName] ? { ...b, supplyRate: rates[b.realName] } : b
    );
  } else {
    // 그 외(셀러/브랜드/미인증): 공개 상태 브랜드만 + 민감필드 제거
    brands = brands
      .filter((b) => !b.status || VISIBLE.includes(b.status))
      .map((b) => {
        const c: any = { ...b };
        SENSITIVE.forEach((k) => delete c[k]);
        return c;
      });
  }
  // 응답이 쿠키(인증)에 따라 달라지므로 공유 캐시 금지 — 잘못된 데이터 노출 방지
  return NextResponse.json(
    { authed, role: role || null, brands },
    { headers: { "Cache-Control": "no-store" } }
  );
}
