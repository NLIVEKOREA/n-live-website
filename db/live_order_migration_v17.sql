-- ============================================================================
-- v17: 택배 자동 배송완료용 RPC.
--   pending_deliveries() = 출고완료(ship=done,track있음)인데 아직 배송완료 아닌 송장(최근20일) 목록
--   set_delivered(track) = 그 송장 주문들 delivered_at=now()
--   /api/check-deliveries 라우트(스마트택배)가 사용. SECURITY DEFINER(anon 호출).
-- ============================================================================
create or replace function public.pending_deliveries()
returns table(track text) language sql security definer set search_path=public as $$
  select distinct o.track from public.orders o
  where o.ship='done' and nullif(btrim(coalesce(o.track,'')),'') is not null and o.delivered_at is null
    and coalesce(o.shipped_date, o.order_date::text) >= to_char((now() at time zone 'Asia/Seoul')::date - 20,'YYYY-MM-DD')
  limit 300;
$$;
revoke all on function public.pending_deliveries() from public;
grant execute on function public.pending_deliveries() to anon, authenticated;

create or replace function public.set_delivered(p_track text)
returns int language plpgsql security definer set search_path=public as $$
declare n int; begin
  update public.orders set delivered_at = now()
   where nullif(btrim(coalesce(track,'')),'') = btrim(coalesce(p_track,'')) and delivered_at is null;
  get diagnostics n = row_count; return n;
end $$;
revoke all on function public.set_delivered(text) from public;
grant execute on function public.set_delivered(text) to anon, authenticated;
-- 끝.
