import { NextResponse } from "next/server";
import { COOKIE, roleForCode, tokenFor } from "@/lib/gate";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const code = typeof body?.code === "string" ? body.code.trim() : "";
  const role = roleForCode(code);
  if (!role) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true, role });
  res.cookies.set(COOKIE, tokenFor(role), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12시간
  });
  return res;
}
