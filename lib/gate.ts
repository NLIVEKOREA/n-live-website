import crypto from "crypto";

// 잠금코드·역할은 서버 환경변수(GATE_CODES)에만 존재 — 레포/클라이언트엔 코드값 없음
// GATE_CODES 예시(JSON): {"<셀러코드>":"seller","<브랜드코드>":"brand","<마스터코드>":"all"}
export const COOKIE = "nlive_gate";
export type Role = "seller" | "brand" | "all";

function codeMap(): Record<string, string> {
  try {
    return JSON.parse(process.env.GATE_CODES || "{}");
  } catch {
    return {};
  }
}

// 서명 비밀키는 GATE_CODES에서 파생 (별도 변수 불필요, 코드 바뀌면 기존 쿠키 자동 무효)
function secret(): string {
  return crypto
    .createHash("sha256")
    .update("nlive-gate::" + (process.env.GATE_CODES || ""))
    .digest("hex");
}

function eq(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

// 입력 코드 → 역할 (없으면 null)
export function roleForCode(input: string): Role | null {
  if (!input) return null;
  const map = codeMap();
  for (const [code, role] of Object.entries(map)) {
    if (eq(input, code)) return role as Role;
  }
  return null;
}

function sign(role: string): string {
  return crypto.createHmac("sha256", secret()).update("role:" + role).digest("hex");
}

// 쿠키 토큰 = "역할.서명"
export function tokenFor(role: Role): string {
  return role + "." + sign(role);
}

// 쿠키 → 검증된 역할 (위조 불가, 없으면 null)
export function roleFromCookie(cookieHeader: string | null): Role | null {
  if (!cookieHeader) return null;
  const m = cookieHeader.match(/(?:^|;\s*)nlive_gate=([^;]+)/);
  if (!m) return null;
  const val = decodeURIComponent(m[1]);
  const dot = val.lastIndexOf(".");
  if (dot < 0) return null;
  const role = val.slice(0, dot);
  const sig = val.slice(dot + 1);
  if (!eq(sig, sign(role))) return null;
  if (role !== "seller" && role !== "brand" && role !== "all") return null;
  return role as Role;
}
