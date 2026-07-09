// 택배 자동 배송완료 감지 — Delivery Tracker(무료·키 불필요)로 CJ대한통운(kr.cjlogistics) 조회.
// 배송완료된 송장은 orders.delivered_at 설정 → 고객 [내주문]에 "✓ 배송완료" 표시.
// Vercel Cron(매일)이 자동 호출. 별도 API 키/환경변수 없이 동작(선택: CRON_SECRET 설정 시 인증 강제).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SUPA = 'https://qikvvqgxmquevzyykkcm.supabase.co';
const ANON = 'sb_publishable_7dB61aDLDjATF2PMWnS4dw_j506tmao';
const UA = 'Mozilla/5.0 (compatible; nlive-delivery/1.0)';

async function rpc(fn, args) {
  const r = await fetch(SUPA + '/rest/v1/rpc/' + fn, {
    method: 'POST',
    headers: { apikey: ANON, Authorization: 'Bearer ' + ANON, 'Content-Type': 'application/json' },
    body: JSON.stringify(args || {}),
  });
  if (!r.ok) throw new Error(fn + ' ' + r.status + ' ' + (await r.text()).slice(0, 200));
  return r.json();
}

// Delivery Tracker: state.id==='delivered' 또는 마지막 진행상태가 배송완료면 true
async function isDelivered(invoice) {
  const url = 'https://apis.tracker.delivery/carriers/kr.cjlogistics/tracks/' + encodeURIComponent(invoice);
  const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
  if (!r.ok) return false;                       // 404=미등록/조회불가 → 아직 아님
  const j = await r.json().catch(() => null);
  if (!j) return false;
  const norm = (v) => String((v && (v.id || v.text)) || v || '').toLowerCase();
  if (norm(j.state) === 'delivered' || String(j.state && (j.state.text || '')).includes('배송완료')) return true;
  const pr = Array.isArray(j.progresses) ? j.progresses : [];
  const last = pr[pr.length - 1];
  const ls = last && last.status;
  return norm(ls) === 'delivered' || String((ls && ls.text) || '').includes('배송완료');
}

export async function GET(req) {
  const secret = process.env.CRON_SECRET;              // 있으면 인증 강제, 없으면 공개(무해)
  if (secret) {
    const auth = req.headers.get('authorization') || '';
    const key = new URL(req.url).searchParams.get('key') || '';
    if (auth !== 'Bearer ' + secret && key !== secret) {
      return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }
  }
  let tracks = [];
  try { tracks = (await rpc('pending_deliveries')).map((r) => r.track).filter(Boolean); }
  catch (e) { return Response.json({ ok: false, error: String(e) }, { status: 500 }); }

  let checked = 0, delivered = 0, errors = 0;
  for (const t of tracks.slice(0, 150)) {
    const inv = String(t).replace(/[^0-9]/g, '');
    if (inv.length < 6) continue;
    checked++;
    try {
      if (await isDelivered(inv)) { await rpc('set_delivered', { p_track: t }); delivered++; }
    } catch (e) { errors++; }
    await new Promise((r) => setTimeout(r, 120));       // 예의상 간격
  }
  return Response.json({ ok: true, source: 'delivery-tracker', pending: tracks.length, checked, delivered, errors });
}
