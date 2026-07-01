-- v5: 미송 사입 상태 (거래처 발주 관리)
alter table public.orders add column if not exists bo_status text; -- null/need=주문필요, ordered=거래처주문완료(입고전)
