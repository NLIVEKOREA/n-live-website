import { NextResponse } from "next/server";
import { roleFromCookie } from "@/lib/gate";
import china from "@/data/pool-china.json";

export const dynamic = "force-dynamic";

// 중국관 왕홍 = 브랜드·마스터 전용 (셀러 코드·미인증은 목록 0건, 개수만 응답)
export async function GET(req: Request) {
  const role = roleFromCookie(req.headers.get("cookie"));
  const allowed = role === "brand" || role === "all";
  const master = role === "all";
  const list = allowed
    ? (china as any[]).map((c) => {
        const x: any = { ...c };
        // 프로필 URL·抖音 ID·내부 메모는 마스터 전용
        if (!master) {
          delete x.url;
          delete x.douyinId;
          delete x.note;
        }
        return x;
      })
    : [];
  return NextResponse.json(
    { authed: !!role, role: role || null, total: (china as any[]).length, kols: list },
    { headers: { "Cache-Control": "no-store" } }
  );
}
