import { NextResponse } from "next/server";
import { roleFromCookie } from "@/lib/gate";
import sellers from "@/data/pool-sellers.json";

export const dynamic = "force-dynamic";

// 셀러 풀 = 브랜드 전용 (양방향 포지션 게이트) — 미인증·셀러 코드는 목록 0건, 개수만 응답
export async function GET(req: Request) {
  const role = roleFromCookie(req.headers.get("cookie"));
  const allowed = role === "brand" || role === "all";
  const master = role === "all";
  const list = allowed
    ? (sellers as any[]).map((s) => {
        const c: any = { ...s };
        // 희망 브랜드(매칭 확정 후 노출) 존재 여부 플래그 — 값 없이 잠금 표시만
        const dw = s.desiredBrands;
        c.hasWish = !!(Array.isArray(dw) ? dw.length : dw);
        // 채널 URL·내부 메모·희망 브랜드 실값은 마스터 전용
        if (!master) {
          delete c.url;
          delete c.note;
          delete c.desiredBrands;
        }
        return c;
      })
    : [];
  return NextResponse.json(
    { authed: !!role, role: role || null, total: (sellers as any[]).length, sellers: list },
    { headers: { "Cache-Control": "no-store" } }
  );
}
