-- 위잉치킨 라이선스 관리 (n-live.co.kr/chi-admin 용) ─ 기간관리 + 관리자 RPC
-- Supabase(xpiacfovaaeownbaqmde) SQL Editor에 붙여넣고 Run. 멱등.

-- 1) 기간(구독) 컬럼
alter table public.app_licenses add column if not exists expires_at timestamptz;
alter table public.app_licenses add column if not exists last_seen  timestamptz;

-- 2) 관리자 비밀번호 저장 (원하면 value 변경)
create table if not exists public.app_config(key text primary key, value text);
alter table public.app_config enable row level security;   -- anon 직접읽기 차단(함수만 접근)
insert into public.app_config(key,value) values ('chi_admin_secret','CHI-ADMIN-7Q2M9XK4TZ')
  on conflict (key) do nothing;

create or replace function public._chi_admin_ok(p_secret text) returns boolean
language sql security definer set search_path=public as $$
  select exists(select 1 from public.app_config where key='chi_admin_secret' and value=p_secret);
$$;
revoke all on function public._chi_admin_ok(text) from public;

-- 3) 라이선스 확인 시 만료도 반영 (앱이 켤 때마다 체크)
create or replace function public.check_license(p_key text, p_machine text)
returns jsonb language sql security definer set search_path=public as $$
  select jsonb_build_object('ok', exists(
    select 1 from public.app_licenses
    where key=p_key and machine=p_machine and active=true
      and (expires_at is null or expires_at > now())));
$$;

-- 4) 관리자 RPC (모두 비밀번호 p_secret 검사)
create or replace function public.admin_list_licenses(p_secret text)
returns jsonb language plpgsql security definer set search_path=public as $$
begin
  if not public._chi_admin_ok(p_secret) then return jsonb_build_object('ok',false,'reason','비밀번호 오류'); end if;
  return jsonb_build_object('ok',true,'rows',(
    select coalesce(jsonb_agg(to_jsonb(l) order by l.created_at desc),'[]'::jsonb) from public.app_licenses l));
end $$;

create or replace function public.admin_create_license(p_secret text, p_key text, p_label text, p_days int)
returns jsonb language plpgsql security definer set search_path=public as $$
begin
  if not public._chi_admin_ok(p_secret) then return jsonb_build_object('ok',false,'reason','비밀번호 오류'); end if;
  if coalesce(btrim(p_key),'')='' then return jsonb_build_object('ok',false,'reason','키 비어있음'); end if;
  insert into public.app_licenses(key,label,active,expires_at)
   values (p_key, p_label, true,
     case when coalesce(p_days,0)>0 then now()+(p_days||' days')::interval else null end);
  return jsonb_build_object('ok',true);
exception when unique_violation then return jsonb_build_object('ok',false,'reason','이미 있는 키');
end $$;

create or replace function public.admin_update_license(p_secret text, p_key text, p_active boolean, p_add_days int, p_reset_machine boolean)
returns jsonb language plpgsql security definer set search_path=public as $$
begin
  if not public._chi_admin_ok(p_secret) then return jsonb_build_object('ok',false,'reason','비밀번호 오류'); end if;
  update public.app_licenses set
    active = coalesce(p_active, active),
    machine = case when coalesce(p_reset_machine,false) then null else machine end,
    expires_at = case when coalesce(p_add_days,0)<>0
                   then coalesce(expires_at, now()) + (p_add_days||' days')::interval
                   else expires_at end
  where key=p_key;
  return jsonb_build_object('ok', found);
end $$;

create or replace function public.admin_delete_license(p_secret text, p_key text)
returns jsonb language plpgsql security definer set search_path=public as $$
begin
  if not public._chi_admin_ok(p_secret) then return jsonb_build_object('ok',false,'reason','비밀번호 오류'); end if;
  delete from public.app_licenses where key=p_key;
  return jsonb_build_object('ok', found);
end $$;

grant execute on function public.admin_list_licenses(text) to anon, authenticated;
grant execute on function public.admin_create_license(text,text,text,int) to anon, authenticated;
grant execute on function public.admin_update_license(text,text,boolean,int,boolean) to anon, authenticated;
grant execute on function public.admin_delete_license(text,text) to anon, authenticated;

select 'chi license admin OK' as result;
