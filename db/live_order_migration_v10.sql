-- ============================================================================
-- v10: get_live_shop이 상품별 '번호표'(stock.tag)를 함께 내려줌.
--   고객이 방송에서 부르는 번호 = 창고/ERP 번호표 = 재고관리 tag 로 통일.
--   (재고연동 상품: base 품번의 tag 첫값 / 개별상품: manual_code)
--   shop.html은 p.tag 우선 표시, 없으면 기존 code(품번번호)로 폴백.
--   추가 필드만 — 주문 로직/재고차감 무영향. 재실행 안전.
-- ============================================================================
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
    'session', jsonb_build_object('id', s.id, 'seller', s.seller, 'title', s.title, 'notice', s.notice,
      'ship_fee', s.ship_fee, 'free_ship_min', s.free_ship_min, 'slug', s.slug, 'pay_info', s.pay_info,
      'broadcast_type', s.broadcast_type, 'youtube', s.youtube),
    'products', prods);
end $$;
revoke all on function public.get_live_shop(text) from public;
grant execute on function public.get_live_shop(text) to anon, authenticated;
-- 끝.
