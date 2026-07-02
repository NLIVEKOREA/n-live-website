-- ============================================================================
-- 레거시 배송비 중복 정리 (일회성) — 초기 버전(취합 없던 시절) 주문에 배송비가
-- 여러 개 붙은 것을, (세션·전화·날짜)별 배송비 1개로 재정리. shop 미결제만.
-- v9가 신규 중복은 이미 방지하므로, 이거 한 번 돌리면 깨끗해짐. 재실행 안전.
-- 실데이터 안전: 결제완료·수동주문은 건드리지 않음.
-- ============================================================================
do $$
declare g record; s public.live_sessions%rowtype; comb int; fee int;
begin
  for g in (
    select distinct o.session_id, o.order_date,
           regexp_replace(coalesce(o.phone,''),'[^0-9]','','g') as pn
    from public.orders o
    where o.source='shop' and o.pay='unpaid' and o.code not in ('배송비','적립금')
  ) loop
    select * into s from public.live_sessions where id=g.session_id;
    continue when not found;
    select coalesce(sum(qty*price),0) into comb from public.orders
      where source='shop' and pay='unpaid' and session_id=g.session_id and order_date=g.order_date
        and regexp_replace(coalesce(phone,''),'[^0-9]','','g')=g.pn and code not in ('배송비','적립금');
    fee := case when s.free_ship_min>0 and comb>=s.free_ship_min then 0 else s.ship_fee end;
    -- 이 그룹의 배송비 전부 제거
    delete from public.orders where source='shop' and pay='unpaid'
      and session_id=g.session_id and order_date=g.order_date
      and regexp_replace(coalesce(phone,''),'[^0-9]','','g')=g.pn and code='배송비';
    -- 필요 시 1개만 재삽입 (그룹의 대표 주문 정보 사용)
    if fee>0 then
      insert into public.orders(order_date,staff,cust,phone,addr,code,item_name,tag,color,size,qty,price,
        pay,payway,ship,back,source,session_id,order_group_id,meta)
      select g.order_date, o.staff, o.cust, o.phone, o.addr, '배송비','배송비(합배)','배송비','','',1,fee,
        'unpaid', o.payway, 'miss', false, 'shop', g.session_id, o.order_group_id, o.meta
      from public.orders o
      where o.source='shop' and o.pay='unpaid' and o.session_id=g.session_id and o.order_date=g.order_date
        and regexp_replace(coalesce(o.phone,''),'[^0-9]','','g')=g.pn and o.code not in ('배송비','적립금')
      order by o.id desc limit 1;
    end if;
  end loop;
end $$;
-- 끝.
