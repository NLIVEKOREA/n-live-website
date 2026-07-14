-- v19: 입장화면(로그인 게이트) 전용 미디어 + 스토리지 캐시 헤더
--  ① live_sessions.gate_video / gate_image 컬럼 추가
--  ② get_live_shop 반환 session에 gate_video/gate_image 포함 (v18 기반)
--  ③ 기존 'live' 버킷 파일들 Cache-Control 장기화(로딩 속도 개선: CDN 캐시)
-- 멱등(create or replace / if not exists) — SQL 편집기에서 통째로 실행.

alter table public.live_sessions add column if not exists gate_video text;
alter table public.live_sessions add column if not exists gate_image text;

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
          from (select color,size,
                       (sum(qty)>0 or bool_or(coalesce(sample,false))) avail   -- 샘플이면 재고 0이어도 available
                from public.stock
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
      'gate_video', s.gate_video, 'gate_image', s.gate_image,          -- ★ 입장화면 전용 미디어
      'sns_youtube',   ss.sns_youtube,
      'sns_instagram', coalesce(ss.sns_instagram, s.sns_instagram),
      'sns_tiktok',    coalesce(ss.sns_tiktok,    s.sns_tiktok),
      'kakao_url',     coalesce(ss.kakao_url,     s.kakao_url),
      'band_url',      coalesce(ss.band_url,      s.band_url)),
    'products', prods);
end $$;
revoke all on function public.get_live_shop(text) from public;
grant execute on function public.get_live_shop(text) to anon, authenticated;

-- ③ 기존 'live' 버킷 파일 캐시 헤더 장기화 (매 접속 캐시미스 → CDN 캐시로 빠르게)
--    Supabase는 storage.objects.metadata->>'cacheControl' 을 응답 Cache-Control 로 서빙함.
update storage.objects
   set metadata = coalesce(metadata,'{}'::jsonb) || '{"cacheControl":"max-age=31536000"}'::jsonb
 where bucket_id = 'live'
   and coalesce(metadata->>'cacheControl','') <> 'max-age=31536000';
-- 끝.
