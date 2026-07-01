// 동대문 사입 영수증 사진 → AI(gpt-4o-mini)로 품목·색상·사이즈·단가·수량 파싱
// POST { image: "data:image/jpeg;base64,..." } → { ok, items:[{name,color,size,price,qty}], note }
// OPENAI_API_KEY 환경변수 필요 (Vercel Settings → Environment Variables)

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const PROMPT = `너는 한국 동대문 의류 도매 사입 영수증을 읽는 도우미다. 첨부한 영수증 사진에서 "입고할 품목"을 정확히 추출해라.

규칙:
- 각 줄의 품명은 보통 "품목명/색상" 또는 "품목명/색상/사이즈" 형태다. 슬래시(/)로 구분해서 name(품목명), color(색상), size(사이즈)로 나눠라. 사이즈가 없으면 size는 빈 문자열.
- price는 단가(원, 숫자만). qty는 수량(숫자). 수량은 손글씨 동그라미로 적혀 있을 수 있는데, 반드시 "금액 ÷ 단가 = 수량"으로 검산해서 정확한 정수를 넣어라. 금액이 안 보이면 손글씨 수량을 읽어라.
- "판매소계/발송소계/합계" 같은 요약 줄, 배송비, 계좌/연락처/안내문구는 제외하고 실제 품목만 넣어라.
- 품목코드만 있고 이름이 없으면(예: "2257/S") name에 코드를, size에 뒷부분을 넣어라.
- 반드시 아래 JSON만 출력. 다른 말/설명/마크다운 금지.

출력 형식:
{"items":[{"name":"반다나독T","color":"백염","size":"","price":11000,"qty":1}]}

품목이 하나도 없으면 {"items":[]} 출력.`;

export async function POST(request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return Response.json({ ok: false, items: [], note: 'OPENAI_API_KEY가 서버에 설정되지 않았습니다. Vercel 환경변수에 등록하세요.' }, { status: 200 });
  let image;
  try { const b = await request.json(); image = b.image; } catch { return Response.json({ ok: false, items: [], note: '잘못된 요청' }, { status: 200 }); }
  if (!image || typeof image !== 'string' || !image.startsWith('data:image')) {
    return Response.json({ ok: false, items: [], note: '이미지 데이터가 없습니다' }, { status: 200 });
  }
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: [
          { type: 'text', text: PROMPT },
          { type: 'image_url', image_url: { url: image, detail: 'high' } },
        ] }],
        max_tokens: 1500,
        temperature: 0,
        response_format: { type: 'json_object' },
      }),
      signal: AbortSignal.timeout(55000),
    });
    if (!res.ok) {
      const t = await res.text();
      return Response.json({ ok: false, items: [], note: 'AI 오류(' + res.status + '): ' + t.slice(0, 120) }, { status: 200 });
    }
    const data = await res.json();
    const txt = data.choices?.[0]?.message?.content || '{}';
    let parsed; try { parsed = JSON.parse(txt); } catch { return Response.json({ ok: false, items: [], note: 'AI 응답 파싱 실패' }, { status: 200 }); }
    const items = Array.isArray(parsed.items) ? parsed.items.map(it => ({
      name: String(it.name || '').trim(),
      color: String(it.color || '').trim(),
      size: String(it.size || '').trim(),
      price: Math.max(0, parseInt(String(it.price).replace(/[^\d]/g, ''), 10) || 0),
      qty: Math.max(1, parseInt(String(it.qty).replace(/[^\d]/g, ''), 10) || 1),
    })).filter(it => it.name) : [];
    return Response.json({ ok: true, items, note: items.length ? null : '품목을 못 찾았어요 — 사진이 흐리면 다시 찍어보세요' }, { status: 200 });
  } catch (e) {
    return Response.json({ ok: false, items: [], note: '처리 실패: ' + (e && e.message ? e.message.slice(0, 100) : '오류') }, { status: 200 });
  }
}
