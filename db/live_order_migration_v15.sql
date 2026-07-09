-- ============================================================================
-- v15: 방송상품에 '영상' 등록 지원.
--   product_images.video_url (품번별 영상, 사진처럼 영구·재사용)
--   session_products.video_url (개별상품 영상)
--   get_live_shop 상품 json에 'video' 반환(개별상품 우선, 없으면 품번 영상).
-- ============================================================================
alter table public.product_images  add column if not exists video_url text;
alter table public.session_products add column if not exists video_url text;

create or replace function public.get_live_shop(p_slug text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare s public.live_sessions%rowtype; ss public.seller_socials%rowtype; prods jsonb;
begin
  select * into s from public.live_sessions where slug = p_slug and status='open'
   order by opened_at desc nulls last, id desc limit 1;
  if not found then return jsonb_build_object('ok', true, 'status', 'closed'); end if;
  select * into ss from public.seller_socials where seller = s.seller;
  select coalesce(jsonb_agg(p order by (p->>'sort')::int, (p->>'id')::bigint), '[]'::jsonb) into prods
  from (
    select jsonb_build_object(
      'id', sp.id, 'name', sp.name, 'live_price', sp.live_price, 'image_url', sp.image_url,
      'is_now', sp.is_now, 'sort', sp.sort, 'max_qty', sp.max_qty,
      'video', case when sp.stock_code is not null
          then coalesce(sp.video_url, (select video_url from public.product_images where code=split_part(sp.stock_code,'-',1) limit 1))
          else sp.video_url end,
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
      'sns_youtube',   ss.sns_youtube,
      'sns_instagram', coalesce(ss.sns_instagram, s.sns_instagram),
      'sns_tiktok',    coalesce(ss.sns_tiktok,    s.sns_tiktok),
      'kakao_url',     coalesce(ss.kakao_url,     s.kakao_url),
      'band_url',      coalesce(ss.band_url,      s.band_url)),
    'products', prods);
end $$;
revoke all on function public.get_live_shop(text) from public;
grant execute on function public.get_live_shop(text) to anon, authenticated;
-- 끝.
