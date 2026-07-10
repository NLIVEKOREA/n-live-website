-- 위잉치킨 라이선스 시스템 전체 (N-LIVE Supabase: qikvvqgxmquevzyykkcm)
-- 앱 인증 + 기간관리 + 관리자 RPC. SQL Editor에 붙여넣고 Run. 멱등.

-- 1) 라이선스 테이블
create table if not exists public.app_licenses(
  key text primary key,
  machine text,
  label text,
  active boolean not null default true,
  expires_at timestamptz,
  last_seen timestamptz,
  activated_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.app_licenses enable row level security;

-- 2) 관리자 비밀번호
create table if not exists public.app_config(key text primary key, value text);
alter table public.app_config enable row level security;
insert into public.app_config(key,value) values ('chi_admin_secret','CHI-ADMIN-7Q2M9XK4TZ')
  on conflict (key) do nothing;

create or replace function public._chi_admin_ok(p_secret text) returns boolean
language sql security definer set search_path=public as $$
  select exists(select 1 from public.app_config where key='chi_admin_secret' and value=p_secret);
$$;
revoke all on function public._chi_admin_ok(text) from public;

-- 3) 앱: 활성화(첫 기기 바인딩) + 확인(만료반영)
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
  return jsonb_build_object('ok',true);
end $$;
revoke all on function public.activate_license(text,text) from public;
grant execute on function public.activate_license(text,text) to anon, authenticated;

create or replace function public.check_license(p_key text, p_machine text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare ok boolean;
begin
  select exists(select 1 from public.app_licenses
    where key=p_key and machine=p_machine and active=true
      and (expires_at is null or expires_at > now())) into ok;
  if ok then update public.app_licenses set last_seen=now() where key=p_key; end if;
  return jsonb_build_object('ok', ok);
end $$;
revoke all on function public.check_license(text,text) from public;
grant execute on function public.check_license(text,text) to anon, authenticated;

-- 4) 관리자 RPC (비밀번호 검사)
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
   values (p_key, p_label, true, case when coalesce(p_days,0)>0 then now()+(p_days||' days')::interval else null end);
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

-- 5) 자동업데이트 저장소(public 버킷)
insert into storage.buckets (id, name, public, file_size_limit)
  values ('updates','updates', true, 524288000)
  on conflict (id) do update set public=true, file_size_limit=524288000;

-- 6) 테스트 키
insert into public.app_licenses(key,label,active) values ('WEEING-TEST-0001','테스트키',true)
  on conflict (key) do nothing;

select 'NLIVE license system OK' as result;
