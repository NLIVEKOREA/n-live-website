-- ============================================================================
-- v13: ① 셀러 SNS/카톡 바로가기 URL 4종  ② 고객 '내 주문 조회' RPC.
--   추가 컬럼만 · get_live_shop 반환 확장 · get_my_orders 신규. 재실행 안전.
-- ============================================================================
alter table public.live_sessions
  add column if not exists sns_instagram text,
  add column if not exists sns_tiktok    text,
  add column if not exists kakao_url      text,
  add column if not exists band_url       text;

-- get_live_shop: 세션 json에 SNS 4종 추가 (나머지 동일)
create or replace function public.get_live_shop(p_slug text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare s public.live_sessions%rowtype; prods jsonb;
begin
  select * into s from public.live_sessions where slug = p_slug and status='open'
   order by opened_at desc nulls last, id desc limit 1;
  if not found then return jsonb_build_object('ok', true, 'status', 'closed'); end if;
  select coalesce(jsonb_agg(p order by (p->>'sort')::int, (p->>'id')::bigint), '[]'::jsonb) into prods
  from (
    select jsonb_build_object(
      'id', sp.id, 'name', sp.name, 'live_price', sp.live_price, 'image_url', sp.image_url,
      'is_now', sp.is_now, 'sort', sp.sort, 'max_qty', sp.max_qty,
      'code', case when sp.stock_code is not null then split_part(sp.stock_code,'-',1) else sp.manual_code end,
      'tag', case when sp.stock_code is not null then (
          select tag from public.stock
          where split_part(code,'-',1)=split_part(sp.stock_code,'-',1)
            and tag is not null and btrim(tag)<>'' order by id limit 1)
        else sp.manual_code end,
      'linked', (sp.stock_code is not null),
      'options', case when sp.stock_code is not null then (
          select coalesce(jsonb_agg(jsonb_build_object('color',color,'size',size,'available',avail) order by color,size),'[]'::jsonb)
          from (select color,size, sum(qty)>0 avail from public.stock
                where split_part(code,'-',1)=split_part(sp.stock_code,'-',1) group by color,size) o)
        else (
          select coalesce(jsonb_agg(jsonb_build_object('color',c,'size',z,'available',true)),'[]'::jsonb)
          from (select nullif(trim(c),'') c from unnest(string_to_array(coalesce(sp.colors,''),',')) c) cc
          cross join (select nullif(trim(z),'') z from unnest(string_to_array(coalesce(sp.sizes,''),',')) z) zz)
      end) p
    from public.session_products sp where sp.session_id = s.id and sp.active = true) q;
  return jsonb_build_object('ok', true, 'status', 'open',
    'session', jsonb_build_object('id', s.id, 'seller', s.seller, 'display_name', s.display_name, 'title', s.title, 'notice', s.notice,
      'ship_fee', s.ship_fee, 'free_ship_min', s.free_ship_min, 'slug', s.slug, 'pay_info', s.pay_info,
      'broadcast_type', s.broadcast_type, 'youtube', s.youtube,
      'seller_photo', s.seller_photo, 'hero_video', s.hero_video, 'cover_url', s.cover_url,
      'sns_instagram', s.sns_instagram, 'sns_tiktok', s.sns_tiktok, 'kakao_url', s.kakao_url, 'band_url', s.band_url),
    'products', prods);
end $$;
revoke all on function public.get_live_shop(text) from public;
grant execute on function public.get_live_shop(text) to anon, authenticated;

-- ============================================================================
-- get_my_orders(slug, phone): 이 셀러 shop에서 그 전화번호로 넣은 주문을 그룹별 상태와 함께 반환.
--   상태단계(stage) = 그룹 상품라인 중 '가장 덜 진행된' 라인 기준(진짜 병목을 보여줌).
--     0 입금확인중(unpaid) · 1 상품준비중(미포장) · 2 출고대기(포장완료) · 3 송장등록됨 · 4 발송완료(ship=done+송장)
--   배송비/적립금 라인은 상태계산에서 제외(항상 미포장이라 병목 왜곡 방지). 최근 90일.
-- ============================================================================
create or replace function public.get_my_orders(p_slug text, p_phone text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare s public.live_sessions%rowtype; pn text; res jsonb;
begin
  pn := regexp_replace(coalesce(p_phone,''),'[^0-9]','','g');
  if length(pn) < 9 then return jsonb_build_object('ok', false, 'reason','bad_phone'); end if;
  select * into s from public.live_sessions where slug = p_slug order by id desc limit 1;
  if not found then return jsonb_build_object('ok', false, 'reason','no_seller'); end if;

  select coalesce(jsonb_agg(g order by (g->>'order_date') desc, (g->>'group_id') desc), '[]'::jsonb) into res
  from (
    select jsonb_build_object(
      'group_id', og.order_group_id,
      'order_date', og.order_date,
      'stage', og.stage,
      'track', og.track,
      'amount', og.amount,
      'items', og.items
    ) g
    from (
      select o.order_group_id, max(o.order_date) order_date,
        min(case
              when o.pay='unpaid' then 0
              when o.ship='done' and nullif(btrim(coalesce(o.track,'')),'') is not null then 4
              when nullif(btrim(coalesce(o.track,'')),'') is not null then 3
              when o.prog='포장' then 2
              else 1 end) stage,
        max(nullif(btrim(coalesce(o.track,'')),'')) track,
        sum(case when o.code in ('적립금') then 0 else o.qty*o.price end) amount,
        jsonb_agg(jsonb_build_object('name',o.item_name,'color',o.color,'size',o.size,'qty',o.qty,'price',o.price,'code',o.code)
                  order by o.id) filter (where o.code not in ('배송비','적립금')) items
      from public.orders o
      where o.source='shop' and o.staff = s.seller
        and regexp_replace(coalesce(o.phone,''),'[^0-9]','','g') = pn
        and o.order_date >= (now() at time zone 'Asia/Seoul')::date - 90
        and o.code not in ('배송비','적립금')  -- 상태계산은 상품라인만
      group by o.order_group_id
    ) og
    where og.items is not null
  ) x;
  return jsonb_build_object('ok', true, 'seller', coalesce(s.display_name, s.seller), 'orders', res);
end $$;
revoke all on function public.get_my_orders(text,text) from public;
grant execute on function public.get_my_orders(text,text) to anon, authenticated;
-- 끝.
