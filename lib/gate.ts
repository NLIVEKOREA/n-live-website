import crypto from "crypto";

// 잠금코드는 서버 환경변수(UNLOCK_CODE)에만 존재 — 레포/클라이언트엔 절대 없음
export const COOKIE = "nlive_gate";
const SALT = "nlive-gate-v1";

export function expectedToken(): string | null {
  const code = process.env.UNLOCK_CODE || "";
  if (!code) return null;
  return crypto.createHmac("sha256", code).update(SALT).digest("hex");
}

export function codeMatches(input: string): boolean {
  const code = process.env.UNLOCK_CODE || "";
  if (!code || !input) return false;
  // 타이밍 공격 방지 비교
  const a = Buffer.from(input);
  const b = Buffer.from(code);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function isAuthed(cookieHeader: string | null): boolean {
  const want = expectedToken();
  if (!want || !cookieHeader) return false;
  const m = cookieHeader.match(/(?:^|;\s*)nlive_gate=([a-f0-9]+)/);
  if (!m) return false;
  const got = Buffer.from(m[1]);
  const exp = Buffer.from(want);
  return got.length === exp.length && crypto.timingSafeEqual(got, exp);
}
