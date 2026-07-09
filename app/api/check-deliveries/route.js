// 택배 자동 배송완료 감지 (스마트택배 API) — CJ대한통운 기준(t_code=04)
// 배송완료된 송장은 orders.delivered_at 설정 → 고객 [내주문]에 "✓ 배송완료" 표시.
// Vercel Cron(매일)이 자동 호출. 인증: Authorization: Bearer <CRON_SECRET> 또는 ?key=<CRON_SECRET>.
// 필요한 환경변수(Vercel): SWEETTRACKER_KEY(스마트택배 무료키), CRON_SECRET(임의 비밀문자열).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SUPA = 'https://qikvvqgxmquevzyykkcm.supabase.co';
const ANON = 'sb_publishable_7dB61aDLDjATF2PMWnS4dw_j506tmao';

async function rpc(fn, args) {
  const r = await fetch(SUPA + '/rest/v1/rpc/' + fn, {
    method: 'POST',
    headers: { apikey: ANON, Authorization: 'Bearer ' + ANON, 'Content-Type': 'application/json' },
    body: JSON.stringify(args || {}),
  });
  if (!r.ok) throw new Error(fn + ' ' + r.status + ' ' + (await r.text()).slice(0, 200));
  return r.json();
}

async function isDelivered(tkey, invoice) {
  const u = 'https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=' + encodeURIComponent(tkey) +
            '&t_code=04&t_invoice=' + encodeURIComponent(invoice);
  const r = await fetch(u, { headers: { 'User-Agent': 'nlive-delivery' } });
  const j = await r.json().catch(() => ({}));
  // 스마트택배: completeYN='Y' 또는 level>=6(배송완료)
  return !!(j && (j.completeYN === 'Y' || j.complete === true || Number(j.level) >= 6));
}

export async function GET(req) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization') || '';
  const key = new URL(req.url).searchParams.get('key') || '';
  if (secret && auth !== 'Bearer ' + secret && key !== secret) {
    return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  const tkey = process.env.SWEETTRACKER_KEY;
  if (!tkey) return Response.json({ ok: false, error: 'SWEETTRACKER_KEY 미설정 (Vercel 환경변수)' }, { status: 500 });

  let tracks = [];
  try { tracks = (await rpc('pending_deliveries')).map((r) => r.track).filter(Boolean); }
  catch (e) { return Response.json({ ok: false, error: String(e) }, { status: 500 }); }

  let checked = 0, delivered = 0, errors = 0;
  for (const t of tracks.slice(0, 120)) {           // 1회 최대 120건(쿼터 보호)
    const inv = String(t).replace(/[^0-9]/g, '');
    if (inv.length < 6) continue;
    checked++;
    try {
      if (await isDelivered(tkey, inv)) { await rpc('set_delivered', { p_track: t }); delivered++; }
    } catch (e) { errors++; }
  }
  return Response.json({ ok: true, pending: tracks.length, checked, delivered, errors });
}
