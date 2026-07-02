-- ============================================================================
-- v9 (보안 하드닝): create_live_order
--   ① 입력 소독: receiver/nick/addr에서 <> 제거 (저장 XSS 원천차단)
--   ② 스팸 쿨다운: 같은 전화가 2초 내 재주문 차단
--   ③ 용량 상한: 한 주문 최대 30품목
--   (v8의 전화번호 취합 유지. 추가만 — 정상 주문 무영향)
-- ============================================================================
create or replace function public.create_live_order(
  p_slug text, p_customer jsonb, p_items jsonb
) returns jsonb language plpgsql security definer set search_path = public as $$
declare
  s public.live_sessions%rowtype; it jsonb; sp public.session_products%rowtype; sku public.stock%rowtype;
  qn int; grp text; cust_name text; cust_id bigint; today date;
  phone_raw text; phone_norm text; receiver text; nick text; full_addr text; paymethod text;
  var_code text; lines jsonb := '[]'::jsonb; combined int; ship_fee int;
begin
  select * into s from public.live_sessions where slug=p_slug and status='open'
   order by opened_at desc nulls last, id desc limit 1;
  if not found then return jsonb_build_object('ok',false,'reason','closed','msg','방송이 종료되었거나 준비중입니다.'); end if;

  receiver   := nullif(trim(regexp_replace(coalesce(p_customer->>'receiver',''),'[<>]','','g')),'');
  nick       := nullif(trim(regexp_replace(coalesce(p_customer->>'nick',''),'[<>]','','g')),'');
  phone_raw  := regexp_replace(coalesce(p_customer->>'phone',''),'[<>]','','g');
  phone_norm := regexp_replace(phone_raw,'[^0-9]','','g');
  full_addr  := trim(regexp_replace(coalesce(p_customer->>'addr','')||' '||coalesce(p_customer->>'addr_detail',''),'[<>]','','g'));
  paymethod  := case when coalesce(p_customer->>'paymethod','')='카드' then '카드' else '현금' end;
  if receiver is null then return jsonb_build_object('ok',false,'reason','no_name','msg','받는 분 성함을 입력해 주세요.'); end if;
  if length(phone_norm)<9 then return jsonb_build_object('ok',false,'reason','bad_phone','msg','휴대폰번호를 정확히 입력해 주세요.'); end if;
  if length(trim(full_addr))<4 then return jsonb_build_object('ok',false,'reason','no_addr','msg','배송지를 입력해 주세요.'); end if;
  if coalesce((p_customer->>'agree')::boolean,false) is not true then
    return jsonb_build_object('ok',false,'reason','no_agree','msg','개인정보 수집·구매 동의가 필요합니다.'); end if;
  if p_items is null or jsonb_array_length(p_items)=0 then
    return jsonb_build_object('ok',false,'reason','empty','msg','상품을 담아주세요.'); end if;
  if jsonb_array_length(p_items) > 30 then
    return jsonb_build_object('ok',false,'reason','too_many','msg','한 번에 담을 수 있는 상품이 너무 많습니다.'); end if;
  -- 스팸 쿨다운: 같은 전화가 방금(2초 내) 주문 생성했으면 차단
  if exists(select 1 from public.orders o where o.source='shop'
      and o.reservation_expires_at > now() - interval '2 seconds'
      and regexp_replace(coalesce(o.phone,''),'[^0-9]','','g')=phone_norm) then
    return jsonb_build_object('ok',false,'reason','too_fast','msg','잠시 후 다시 시도해 주세요.'); end if;

  for it in select * from jsonb_array_elements(p_items) loop
    select * into sp from public.session_products
      where id=(it->>'product_id')::bigint and session_id=s.id and active=true;
    if not found then return jsonb_build_object('ok',false,'reason','bad_item','msg','판매 중이 아닌 상품이 포함되어 있습니다.'); end if;
    qn := greatest(1, coalesce((it->>'qty')::int,1));
    if sp.max_qty>0 and qn>sp.max_qty then qn:=sp.max_qty; end if;
    if qn > 999 then qn := 999; end if;
    if sp.stock_code is not null then
      select * into sku from public.stock
        where split_part(code,'-',1)=split_part(sp.stock_code,'-',1)
          and color=coalesce(it->>'color','') and size=coalesce(it->>'size','') order by id limit 1;
      if not found then return jsonb_build_object('ok',false,'reason','bad_option','msg',sp.name||' 옵션을 다시 선택해 주세요.'); end if;
      var_code := sku.code;
    else var_code := coalesce(sp.manual_code,'방송상품'); end if;
    lines := lines || jsonb_build_object('code',var_code,'name',sp.name,
      'tag',case when sp.stock_code is not null then 'LIVE' else '개별' end,
      'color',coalesce(it->>'color',''),'size',coalesce(it->>'size',''),'qty',qn,'price',sp.live_price);
  end loop;

  select id, name into cust_id, cust_name from public.customers
    where regexp_replace(coalesce(phone,''),'[^0-9]','','g')=phone_norm order by id limit 1;
  if not found then
    insert into public.customers(name,phone,addr,zip,owner,created_at)
      values (receiver,phone_raw,full_addr,nullif(regexp_replace(coalesce(p_customer->>'zip',''),'[<>]','','g'),''),s.seller,now())
      returning id,name into cust_id,cust_name;
  end if;

  today := (now() at time zone 'Asia/Seoul')::date;
  grp := 'NL-'||to_char(now() at time zone 'Asia/Seoul','YYMMDD')||'-'||lpad((nextval('public.live_order_seq')%10000)::text,4,'0');

  for it in select * from jsonb_array_elements(lines) loop
    insert into public.orders(order_date,staff,cust,phone,addr,code,item_name,tag,color,size,qty,price,
      pay,payway,ship,back,source,session_id,order_group_id,reservation_expires_at,meta)
    values (today,s.seller,cust_name,phone_raw,full_addr,it->>'code',it->>'name',it->>'tag',it->>'color',it->>'size',
      (it->>'qty')::int,(it->>'price')::int,'unpaid',paymethod,'miss',false,'shop',s.id,grp,now(),
      jsonb_build_object('nick',nick,'receiver',receiver,'slug',s.slug,'paymethod',paymethod));
  end loop;

  select coalesce(sum(qty*price),0) into combined from public.orders
    where source='shop' and pay='unpaid' and session_id=s.id and order_date=today
      and regexp_replace(coalesce(phone,''),'[^0-9]','','g')=phone_norm
      and code not in ('배송비','적립금');
  ship_fee := case when s.free_ship_min>0 and combined>=s.free_ship_min then 0 else s.ship_fee end;
  delete from public.orders where source='shop' and pay='unpaid'
    and session_id=s.id and order_date=today and code='배송비'
    and regexp_replace(coalesce(phone,''),'[^0-9]','','g')=phone_norm;
  if ship_fee>0 then
    insert into public.orders(order_date,staff,cust,phone,addr,code,item_name,tag,color,size,qty,price,
      pay,payway,ship,back,source,session_id,order_group_id,reservation_expires_at,meta)
    values (today,s.seller,cust_name,phone_raw,full_addr,'배송비','배송비(합배)','배송비','','',1,ship_fee,
      'unpaid',paymethod,'miss',false,'shop',s.id,grp,null,
      jsonb_build_object('nick',nick,'receiver',receiver,'slug',s.slug,'paymethod',paymethod));
  end if;

  update public.orders set payway=paymethod
    where source='shop' and pay='unpaid' and session_id=s.id and order_date=today
      and regexp_replace(coalesce(phone,''),'[^0-9]','','g')=phone_norm;

  return jsonb_build_object('ok',true,'order_group_id',grp,
    'subtotal',combined,'ship_fee',ship_fee,'total',combined+ship_fee,
    'paymethod',paymethod,'pay_info',s.pay_info,'seller',s.seller,'receiver',receiver);
end $$;
revoke all on function public.create_live_order(text,jsonb,jsonb) from public;
grant execute on function public.create_live_order(text,jsonb,jsonb) to anon, authenticated;
-- 끝.
