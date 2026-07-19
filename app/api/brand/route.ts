import { NextResponse } from "next/server";
import { roleFromCookie } from "@/lib/gate";
import full from "@/data/pool-brands.full.json";

export const dynamic = "force-dynamic";

const VISIBLE = ["게시완료", "게시요청"];

function brandRates(): Record<string, string> {
  try {
    return JSON.parse(process.env.BRAND_RATES || "{}");
  } catch {
    return {};
  }
}

// 단일 브랜드 전체 데이터 (상세 모달용) — 카드 클릭 시 개별 로드
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  const role = roleFromCookie(req.headers.get("cookie"));
  const master = role === "all";

  // 브랜드 상세 = 셀러·바이어 전용 (양방향 포지션 게이트) — 미인증·브랜드 코드는 열람 불가
  if (role !== "seller" && role !== "all") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const b = (full as any[]).find((x) => x.id === id);
  if (!b) return NextResponse.json({ error: "not found" }, { status: 404 });

  const visible = !b.status || VISIBLE.includes(b.status);
  // 비공개/검수전 브랜드는 마스터로도 상세 열람 불가 (홈페이지 비노출)
  if (!visible) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const brand: any = { ...b };
  // 공식 홈페이지 URL·내부 메모는 마스터 전용 (연락처·홈페이지는 매칭 확정 후 안내)
  if (!master) {
    delete brand.url;
    delete brand.note;
  }
  // 공급률은 마스터 인증 시에만 환경변수에서 병합
  if (master) {
    const rates = brandRates();
    if (rates[b.realName]) brand.supplyRate = rates[b.realName];
  }
  return NextResponse.json({ brand }, { headers: { "Cache-Control": "no-store" } });
}
