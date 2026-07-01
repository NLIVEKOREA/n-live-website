-- ============================================================================
-- N-LIVE 라이브 주문시스템 v2 마이그레이션 (멱등)
--  #1·#2 품번 base 그룹핑(색상/사이즈 전체 옵션 자동연동) + 번호표(품번)
--  #3 가예약 제거 — 주문시 재고체크 없음, 결제(입금확인) 먼저 한 사람 기준 실차감
--  #4 product_images: 품번별 상품사진 DB(물류팀 입고사진 보관, 연결시 자동 따라옴)
-- 기존 v1 위에 덮어쓰기(create or replace). 실행: SQL Editor 붙여넣고 Run.
-- ============================================================================

-- 4) 품번별 상품사진 (base code 기준) -----------------------------------------
create table if not exists public.product_images (
  code       text primary key,            -- 품목 base 코드(예: 00054). 6자리 상품번호
  url        text not null,
  updated_at timestamptz not null default now()
);
alter table public.product_images enable row level security;
drop policy if exists pi_auth_all on public.product_images;
create policy pi_auth_all on public.product_images for all to authenticated using (true) with check (true);
drop policy if exists pi_anon_read on public.product_images;
create policy pi_anon_read on public.product_images for select to anon using (true);
grant select, insert, update, delete on public.product_images to authenticated;
grant select on public.product_images to anon;

-- 5) 공개 조회 RPC v2: base코드로 색상/사이즈 전체 옵션 유도. 가예약 차감 없음 ----
create or replace function public.get_live_shop(p_slug text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare s public.live_sessions%rowtype; prods jsonb;
begin
  select * into s from public.live_sessions
   where slug = p_slug and status = 'open'
   order by opened_at desc nulls last, id desc limit 1;
  if not found then return jsonb_build_object('ok', true, 'status', 'closed'); end if;

  select coalesce(jsonb_agg(p order by (p->>'sort')::int, (p->>'id')::bigint), '[]'::jsonb)
    into prods
  from (
    select jsonb_build_object(
      'id', sp.id, 'name', sp.name, 'live_price', sp.live_price, 'image_url', sp.image_url,
      'is_now', sp.is_now, 'sort', sp.sort, 'max_qty', sp.max_qty,
      'code', case when sp.stock_code is not null then split_part(sp.stock_code,'-',1) else null end,
      'linked', (sp.stock_code is not null),
      'options', case
        when sp.stock_code is not null then (
          -- 같은 품번(base)의 모든 색상/사이즈. 판매가능 = 실재고>0 (가예약 없음)
          select coalesce(jsonb_agg(jsonb_build_object(
                   'color', color, 'size', size, 'available', avail) order by color, size), '[]'::jsonb)
          from (
            select color, size, sum(qty) > 0 avail
            from public.stock
            where split_part(code,'-',1) = split_part(sp.stock_code,'-',1)
            group by color, size
          ) o
        )
        else (
          select coalesce(jsonb_agg(jsonb_build_object('color', c, 'size', z, 'available', true)), '[]'::jsonb)
          from (select nullif(trim(c),'') c from unnest(string_to_array(coalesce(sp.colors,''), ',')) c) cc
          cross join (select nullif(trim(z),'') z from unnest(string_to_array(coalesce(sp.sizes,''), ',')) z) zz
        )
      end
    ) p
    from public.session_products sp
    where sp.session_id = s.id and sp.active = true
  ) q;

  return jsonb_build_object('ok', true, 'status', 'open',
    'session', jsonb_build_object('id', s.id, 'seller', s.seller, 'title', s.title,
      'notice', s.notice, 'ship_fee', s.ship_fee, 'free_ship_min', s.free_ship_min, 'slug', s.slug),
    'products', prods);
end $$;

-- 6) 주문 생성 RPC v2: 색/사이즈로 실제 변형코드 해석해 저장. 재고체크·예약 없음 ----
--    (결제 먼저 한 사람 기준으로 입금확인 때 실차감. 재고보다 많이 팔리면 미송 처리)
create or replace function public.create_live_order(
  p_slug text, p_customer jsonb, p_items jsonb
) returns jsonb language plpgsql security definer set search_path = public as $$
declare
  s public.live_sessions%rowtype; it jsonb; sp public.session_products%rowtype; sku public.stock%rowtype;
  qn int; subtotal int := 0; ship_fee int := 0; grp text; cust_name text; cust_id bigint;
  phone_raw text; phone_norm text; receiver text; nick text; full_addr text;
  var_code text; lines jsonb := '[]'::jsonb;
begin
  select * into s from public.live_sessions
   where slug = p_slug and status='open' order by opened_at desc nulls last, id desc limit 1;
  if not found then return jsonb_build_object('ok', false, 'reason', 'closed', 'msg', '방송이 종료되었거나 준비중입니다.'); end if;

  receiver   := nullif(trim(coalesce(p_customer->>'receiver','')),'');
  nick       := nullif(trim(coalesce(p_customer->>'nick','')),'');
  phone_raw  := coalesce(p_customer->>'phone','');
  phone_norm := regexp_replace(phone_raw, '[^0-9]', '', 'g');
  full_addr  := trim(coalesce(p_customer->>'addr','') || ' ' || coalesce(p_customer->>'addr_detail',''));
  if receiver is null then return jsonb_build_object('ok',false,'reason','no_name','msg','받는 분 성함을 입력해 주세요.'); end if;
  if length(phone_norm) < 9 then return jsonb_build_object('ok',false,'reason','bad_phone','msg','휴대폰번호를 정확히 입력해 주세요.'); end if;
  if length(trim(full_addr)) < 4 then return jsonb_build_object('ok',false,'reason','no_addr','msg','배송지를 입력해 주세요.'); end if;
  if coalesce((p_customer->>'agree')::boolean, false) is not true then
    return jsonb_build_object('ok',false,'reason','no_agree','msg','개인정보 수집·구매 동의가 필요합니다.'); end if;
  if p_items is null or jsonb_array_length(p_items) = 0 then
    return jsonb_build_object('ok',false,'reason','empty','msg','상품을 담아주세요.'); end if;

  for it in select * from jsonb_array_elements(p_items) loop
    select * into sp from public.session_products
      where id = (it->>'product_id')::bigint and session_id = s.id and active = true;
    if not found then return jsonb_build_object('ok',false,'reason','bad_item','msg','판매 중이 아닌 상품이 포함되어 있습니다.'); end if;

    qn := greatest(1, coalesce((it->>'qty')::int, 1));
    if sp.max_qty > 0 and qn > sp.max_qty then qn := sp.max_qty; end if;

    if sp.stock_code is not null then
      -- 색/사이즈로 실제 변형 재고행 찾기(차감·연동용 실제 코드 저장). 재고 검증은 안 함(#3)
      select * into sku from public.stock
        where split_part(code,'-',1) = split_part(sp.stock_code,'-',1)
          and color = coalesce(it->>'color','') and size = coalesce(it->>'size','')
        order by id limit 1;
      if not found then return jsonb_build_object('ok',false,'reason','bad_option','msg', sp.name || ' 옵션을 다시 선택해 주세요.'); end if;
      var_code := sku.code;
    else
      var_code := '방송상품';
    end if;

    subtotal := subtotal + sp.live_price * qn;
    lines := lines || jsonb_build_object(
      'code', var_code, 'name', sp.name,
      'tag', case when sp.stock_code is not null then 'LIVE' else '캡처' end,
      'color', coalesce(it->>'color',''), 'size', coalesce(it->>'size',''),
      'qty', qn, 'price', sp.live_price);
  end loop;

  ship_fee := case when s.free_ship_min > 0 and subtotal >= s.free_ship_min then 0 else s.ship_fee end;

  select id, name into cust_id, cust_name from public.customers
    where regexp_replace(coalesce(phone,''), '[^0-9]', '', 'g') = phone_norm
    order by id limit 1;
  if not found then
    insert into public.customers(name, phone, addr, zip, owner, created_at)
      values (receiver, phone_raw, full_addr, nullif(p_customer->>'zip',''), s.seller, now())
      returning id, name into cust_id, cust_name;
  end if;

  grp := 'NL-' || to_char(now() at time zone 'Asia/Seoul','YYMMDD')
         || '-' || lpad((nextval('public.live_order_seq') % 10000)::text, 4, '0');

  -- 주문행: source='shop', pay='unpaid'. reservation_expires_at = 차감대기 마커(now).
  -- 입금확인(payGroup) 때 실제 재고 차감. 가예약/예약만료 개념 없음.
  for it in select * from jsonb_array_elements(lines) loop
    insert into public.orders(
      order_date, staff, cust, phone, addr, code, item_name, tag, color, size, qty, price,
      pay, ship, back, source, session_id, order_group_id, reservation_expires_at, meta)
    values (
      (now() at time zone 'Asia/Seoul')::date, s.seller, cust_name, phone_raw, full_addr,
      it->>'code', it->>'name', it->>'tag', it->>'color', it->>'size',
      (it->>'qty')::int, (it->>'price')::int,
      'unpaid', 'miss', false, 'shop', s.id, grp, now(),
      jsonb_build_object('nick', nick, 'receiver', receiver, 'slug', s.slug));
  end loop;

  if ship_fee > 0 then
    insert into public.orders(
      order_date, staff, cust, phone, addr, code, item_name, tag, color, size, qty, price,
      pay, ship, back, source, session_id, order_group_id, reservation_expires_at, meta)
    values (
      (now() at time zone 'Asia/Seoul')::date, s.seller, cust_name, phone_raw, full_addr,
      '배송비', '배송비', '배송비', '', '', 1, ship_fee,
      'unpaid', 'miss', false, 'shop', s.id, grp, null,
      jsonb_build_object('nick', nick, 'receiver', receiver, 'slug', s.slug));
  end if;

  return jsonb_build_object('ok', true, 'order_group_id', grp,
    'subtotal', subtotal, 'ship_fee', ship_fee, 'total', subtotal + ship_fee, 'seller', s.seller);
end $$;

revoke all on function public.get_live_shop(text)                from public;
revoke all on function public.create_live_order(text,jsonb,jsonb) from public;
grant execute on function public.get_live_shop(text)              to anon, authenticated;
grant execute on function public.create_live_order(text,jsonb,jsonb) to anon, authenticated;

-- 끝. (재실행 안전)
