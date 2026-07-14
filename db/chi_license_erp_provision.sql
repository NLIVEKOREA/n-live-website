-- ═══ 위잉치킨 라이선스에 ERP 접속정보 포함(고객별 프로비저닝) — N-LIVE Supabase에서 실행(멱등) ═══
-- 목적: 앱의 ERP설정(URL/AnonKey/slug) 입력칸 제거 → 라이선스 관리(chi-admin)에서 발급자가 지정,
--       앱은 라이선스 확인/활성화 응답에 실려온 값을 자동 적용.

-- 1) 컬럼 추가
alter table public.app_licenses add column if not exists erp_url text;
alter table public.app_licenses add column if not exists erp_anon_key text;
alter table public.app_licenses add column if not exists erp_slug text;

-- 2) check_license: 성공 시 ERP 접속정보 동봉
create or replace function public.check_license(p_key text, p_machine text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare rec public.app_licenses%rowtype;
begin
  select * into rec from public.app_licenses
    where key=p_key and machine=p_machine and active=true
      and (expires_at is null or expires_at > now()) limit 1;
  if not found then return jsonb_build_object('ok', false); end if;
  update public.app_licenses set last_seen=now() where key=p_key;
  return jsonb_build_object('ok', true,
    'erp_url', coalesce(rec.erp_url,''),
    'erp_anon_key', coalesce(rec.erp_anon_key,''),
    'erp_slug', coalesce(rec.erp_slug,''));
end $$;
revoke all on function public.check_license(text,text) from public;
grant execute on function public.check_license(text,text) to anon, authenticated;

-- 3) activate_license: 성공 시 ERP 접속정보 동봉
create or replace function public.activate_license(p_key text, p_machine text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare l public.app_licenses%rowtype;
begin
  select * into l from public.app_licenses where key=p_key;
  if not found then return jsonb_build_object('ok',false,'reason','없는 라이선스 키'); end if;
  if not l.active then return jsonb_build_object('ok',false,'reason','정지된 키'); end if;
  if l.expires_at is not null and l.expires_at <= now() then return jsonb_build_object('ok',false,'reason','기간 만료된 키'); end if;
  if l.machine is not null and l.machine <> p_machine then return jsonb_build_object('ok',false,'reason','다른 기기에 이미 등록된 키'); end if;
  update public.app_licenses set machine=p_machine, activated_at=coalesce(activated_at,now()), last_seen=now() where key=p_key;
  return jsonb_build_object('ok',true,
    'erp_url', coalesce(l.erp_url,''),
    'erp_anon_key', coalesce(l.erp_anon_key,''),
    'erp_slug', coalesce(l.erp_slug,''));
end $$;
revoke all on function public.activate_license(text,text) from public;
grant execute on function public.activate_license(text,text) to anon, authenticated;

-- 4) 관리자: 라이선스에 ERP 접속정보 지정
create or replace function public.admin_set_license_erp(p_secret text, p_key text, p_url text, p_anon text, p_slug text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare v_cnt int;
begin
  if not public._chi_admin_ok(p_secret) then return jsonb_build_object('ok',false,'reason','비밀번호 오류'); end if;
  update public.app_licenses
     set erp_url = nullif(btrim(coalesce(p_url,'')),''),
         erp_anon_key = nullif(btrim(coalesce(p_anon,'')),''),
         erp_slug = nullif(btrim(coalesce(p_slug,'')),'')
   where key = p_key;
  get diagnostics v_cnt = row_count;
  if v_cnt = 0 then return jsonb_build_object('ok',false,'reason','없는 키'); end if;
  return jsonb_build_object('ok',true);
end $$;
revoke all on function public.admin_set_license_erp(text,text,text,text,text) from public;
grant execute on function public.admin_set_license_erp(text,text,text,text,text) to anon, authenticated;

select 'LICENSE ERP PROVISION OK' as result;
