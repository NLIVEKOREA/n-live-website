-- v6: 샘플 상품(반납대상) 플래그
alter table public.stock add column if not exists sample boolean default false;
