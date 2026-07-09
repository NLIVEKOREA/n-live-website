-- ============================================================================
-- v14: SNS·카톡을 '셀러별'로 저장(seller_socials) → 그 셀러의 모든 방송에 자동 적용.
--   유튜브 아이콘은 실시간 방송URL이 아니라 셀러가 등록한 '채널 URL'(sns_youtube)로 연결.
--   get_live_shop이 셀러값 우선(coalesce) 반환. 카톡 URL 2건(연시/로아) 시드.
-- ============================================================================
create table if not exists public.seller_socials(
  seller        text primary key,
  sns_youtube   text,   -- 유튜브 채널 URL(구독/방문용, 라이브영상 아님)
  sns_instagram text,
  sns_tiktok    text,
  kakao_url     text,   -- 카카오톡 채널(문의 버튼)
  band_url      text,
  updated_at    timestamptz default now()
);
alter table public.seller_socials enable row level security;
drop policy if exists seller_socials_rw on public.seller_socials;
create policy seller_socials_rw on public.seller_socials for all to anon, authenticated using (true) with check (true);
grant select, insert, update on public.seller_socials to anon, authenticated;

-- 셀러별 카톡 채널 시드(연시언니=박시연 / 로아언니=류지우)
insert into public.seller_socials(seller, kakao_url) values
  ('박시연','http://pf.kakao.com/_NqCixj'),
  ('류지우','http://pf.kakao.com/_xltxfPX')
on conflict (seller) do update set kakao_url = excluded.kakao_url, updated_at = now();

-- get_live_shop: 셀러 SNS를 seller_socials에서 우선 가져와 반환(없으면 세션값 폴백)
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
