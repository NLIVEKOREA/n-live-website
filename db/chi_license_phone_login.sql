-- ═══ 폰 컴패니언 로그인 — N-LIVE Supabase (멱등) ═══
-- 폰은 데스크탑과 다른 기기라 기기바인딩 검사(activate/check)를 통과 못 함.
-- 폰은 '컴패니언'이므로 기기바인딩 없이: 유효(활성+미만료) 키면 ERP 접속정보를 내려준다.
-- (ERP anon키·app_secret은 정당한 키 소유자에게만 노출 — 기존 데스크탑 프로비저닝과 동일 수준)

create or replace function public.phone_login(p_key text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare rec public.app_licenses%rowtype;
begin
  select * into rec from public.app_licenses
   where key = p_key and active = true
     and (expires_at is null or expires_at > now())
   limit 1;
  if not found then return jsonb_build_object('ok', false, 'reason', '유효하지 않거나 만료된 키'); end if;
  update public.app_licenses set last_seen = now() where key = p_key;
  return jsonb_build_object('ok', true,
    'label', coalesce(rec.label,''),
    'erp_url', coalesce(rec.erp_url,''),
    'erp_anon_key', coalesce(rec.erp_anon_key,''),
    'erp_slug', coalesce(rec.erp_slug,''),
    'erp_app_secret', coalesce(rec.erp_app_secret,''));
end $$;
revoke all on function public.phone_login(text) from public;
grant execute on function public.phone_login(text) to anon, authenticated;

select 'PHONE LOGIN RPC OK' as result;
