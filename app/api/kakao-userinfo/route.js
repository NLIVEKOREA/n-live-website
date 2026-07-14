// 카카오 로그인 후 사용자 정보(이름·전화·배송지) 서버사이드 조회
// POST /api/kakao-userinfo  body: { token: <카카오 access_token = supabase provider_token> }
//   → { ok, name, phone, receiver, addr, addr_detail, addr_phone, nickname }
// 브라우저에서 kapi.kakao.com 직접 호출은 CORS로 막히므로 서버가 대신 호출(우회).
// 토큰은 '그 사용자 본인'의 access_token이라 본인 정보만 조회됨(권한 상승 없음).

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// "+82 10-1234-5678" / "+8210..." → "010-1234-5678"
function normPhone(p) {
  if (!p) return '';
  let s = String(p).trim();
  s = s.replace(/^\+82\s*/, '0');   // 국가번호 → 0
  s = s.replace(/\s+/g, '');         // 공백 제거
  return s;
}

export async function POST(req) {
  let token = '';
  try {
    const body = await req.json();
    token = (body && body.token) ? String(body.token) : '';
  } catch { /* body 파싱 실패 */ }

  if (!token) {
    return Response.json({ ok: false, reason: 'missing_token' }, { status: 400 });
  }

  try {
    const res = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      return Response.json({ ok: false, reason: 'kakao_' + res.status, detail: txt.slice(0, 200) }, { status: 200 });
    }
    const data = await res.json();
    const acc = (data && data.kakao_account) || {};
    const prof = acc.profile || {};

    // 기본 배송지 우선(없으면 첫 번째)
    const ships = Array.isArray(acc.shipping_addresses) ? acc.shipping_addresses : [];
    const ship = ships.find((s) => s && s.is_default) || ships[0] || null;

    const name = acc.name || '';
    const nickname = prof.nickname || '';
    const phone = normPhone(acc.phone_number);

    let receiver = '', addr = '', addr_detail = '', addr_phone = '';
    if (ship) {
      receiver = ship.receiver_name || '';
      addr = ship.base_address || '';
      addr_detail = ship.detail_address || '';
      addr_phone = normPhone(ship.receiver_phone_number1 || ship.receiver_phone_number2);
    }

    return Response.json({
      ok: true,
      name,
      nickname,
      phone,
      receiver: receiver || name,      // 수령인명 없으면 실명으로
      addr,
      addr_detail,
      addr_phone,
    });
  } catch (e) {
    return Response.json({ ok: false, reason: String((e && e.message) || e) }, { status: 200 });
  }
}
