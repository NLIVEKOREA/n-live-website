// SNS 팔로워 서버사이드 수집 API
// GET /api/sns-followers?platform=<tiktok|instagram|youtube|band>&url=<프로필URL>
//  → { ok, platform, followers(정수|null), method, note }
// 브라우저 CORS 우회용. YouTube는 비교적 안정적, TikTok/Instagram/Band는 플랫폼 차단 시 null.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOW_HOSTS = {
  youtube: ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'],
  instagram: ['instagram.com', 'www.instagram.com'],
  tiktok: ['tiktok.com', 'www.tiktok.com'],
  band: ['band.us', 'www.band.us'],
};
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';

// "12.3만", "3.4천", "1.2M", "1,234" → 정수
function parseNum(raw) {
  if (raw == null) return null;
  let s = String(raw).replace(/[,\s ]/g, '').trim();
  let m;
  if ((m = s.match(/([\d.]+)억/))) return Math.round(parseFloat(m[1]) * 1e8);
  if ((m = s.match(/([\d.]+)만/))) return Math.round(parseFloat(m[1]) * 1e4);
  if ((m = s.match(/([\d.]+)천/))) return Math.round(parseFloat(m[1]) * 1e3);
  if ((m = s.match(/([\d.]+)([MmＭ])/))) return Math.round(parseFloat(m[1]) * 1e6);
  if ((m = s.match(/([\d.]+)([KkＫ])/))) return Math.round(parseFloat(m[1]) * 1e3);
  const digits = s.replace(/[^\d]/g, '');
  return digits ? parseInt(digits, 10) : null;
}

function hostOk(platform, url) {
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return false;
    return (ALLOW_HOSTS[platform] || []).some((h) => u.hostname === h || u.hostname.endsWith('.' + h));
  } catch { return false; }
}

async function grab(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept-Language': 'ko,en;q=0.9', 'Accept': 'text/html' },
    signal: AbortSignal.timeout(9000),
    redirect: 'follow',
  });
  return await res.text();
}

async function scrape(platform, url) {
  const html = await grab(url);
  let m;
  if (platform === 'youtube') {
    m = html.match(/"subscriberCountText":\{"accessibility":\{"accessibilityData":\{"label":"([^"]+?)"/)
      || html.match(/"subscriberCountText":\{"simpleText":"([^"]+?)"/)
      || html.match(/([\d.,]+\s*[만천억]?[MK]?)\s*subscribers/i);
    if (m) { const n = parseNum(m[1]); if (n) return { followers: n, method: 'youtube-html' }; }
    return { followers: null, note: 'YouTube 구독자 파싱 실패(비공개/구조변경)' };
  }
  if (platform === 'instagram') {
    m = html.match(/"edge_followed_by":\{"count":(\d+)\}/)
      || html.match(/"follower_count":(\d+)/)
      || html.match(/content="([\d.,]+[KMkm만천]?)\s*Followers/i)
      || html.match(/([\d.,]+[KMkm만천]?)\s*(?:Followers|팔로워)/i);
    if (m) { const n = parseNum(m[1]); if (n) return { followers: n, method: 'instagram-html' }; }
    return { followers: null, note: 'Instagram 로그인벽/차단 — 수동입력 권장' };
  }
  if (platform === 'tiktok') {
    m = html.match(/"followerCount":(\d+)/)
      || html.match(/"stats":\{[^}]*"followerCount":(\d+)/)
      || html.match(/([\d.,]+[KMkm만천]?)\s*Followers/i);
    if (m) { const n = parseNum(m[1]); if (n) return { followers: n, method: 'tiktok-html' }; }
    return { followers: null, note: 'TikTok 봇차단/JS렌더 — 수동입력 권장' };
  }
  if (platform === 'band') {
    m = html.match(/([\d.,]+[만천]?)\s*(?:멤버|members)/i);
    if (m) { const n = parseNum(m[1]); if (n) return { followers: n, method: 'band-html' }; }
    return { followers: null, note: '네이버밴드는 공개 멤버수 제공 안함 — 수동입력' };
  }
  return { followers: null, note: '지원하지 않는 플랫폼' };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const platform = (searchParams.get('platform') || '').toLowerCase();
  const url = searchParams.get('url') || '';
  if (!ALLOW_HOSTS[platform]) {
    return Response.json({ ok: false, platform, followers: null, method: null, note: '알 수 없는 플랫폼' }, { status: 200 });
  }
  if (!hostOk(platform, url)) {
    return Response.json({ ok: false, platform, followers: null, method: null, note: '허용되지 않은 URL(도메인 불일치)' }, { status: 200 });
  }
  try {
    const r = await scrape(platform, url);
    return Response.json({ ok: r.followers != null, platform, followers: r.followers ?? null, method: r.method || null, note: r.note || null }, { status: 200 });
  } catch (e) {
    return Response.json({ ok: false, platform, followers: null, method: null, note: '수집 실패: ' + (e && e.message ? e.message.slice(0, 80) : '오류') }, { status: 200 });
  }
}
