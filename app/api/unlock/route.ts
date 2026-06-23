import { NextResponse } from "next/server";
import { COOKIE, codeMatches, expectedToken } from "@/lib/gate";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const code = typeof body?.code === "string" ? body.code.trim() : "";
  const token = expectedToken();
  if (!token || !codeMatches(code)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12시간
  });
  return res;
}
