"use client";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/components/LangContext";
import Marquee from "@/components/Marquee";
import MeteorBackground from "@/components/MeteorBackground";
import type { Lang } from "@/lib/i18n";

type Interest = "sourcing" | "matching" | "marketing" | "live-ops" | "market-entry";

/* ────────────────────────────────────────────────────────
   COMMON MAIN + INTEREST-BASED QUICK BRANCHING
   - 첫 화면은 누구나 이해하는 공통 Hero
   - 그 아래에서 "어떤 협업을 찾고 계신가요?" 5개 카드 선택
   - 선택된 관심사에 따라 섹션 강조 / CTA / 사례 순서 변경
   ──────────────────────────────────────────────────────── */

export default function HomePage() {
  const { t, lang } = useLang();
  const [interest, setInterest] = useState<Interest | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ═══════════════════════════════════════════════════════
  // COMMON HERO (역할 선택 X — 회사의 실행 범위를 한 번에)
  // ═══════════════════════════════════════════════════════
  const HERO: Record<Lang, { eyebrow: string; title1: string; title2: string; sub: string; cta1: string; cta2: string }> = {
    ko: {
      eyebrow: "LIVE COMMERCE AGENCY · KOREA × CHINA",
      title1: "브랜드와 셀러가 만나는",
      title2: "가장 확실한 방법",
      sub: "브랜드 소싱 · 셀러·왕홍 매칭 · 인플루언서/연예인 캠페인 · 라이브커머스 운영 · 양방향 시장 진출. 한국과 중국을 연결하는 모든 실행을 한 팀에서.",
      cta1: "관심 분야 찾기 ↓",
      cta2: "문의하기",
    },
    en: {
      eyebrow: "LIVE COMMERCE AGENCY · KOREA × CHINA",
      title1: "The most reliable way",
      title2: "for brands and sellers to meet",
      sub: "Brand sourcing · seller/KOL matching · influencer & celebrity campaigns · live commerce operations · two-way market entry. Every execution that connects Korea and China — from one team.",
      cta1: "Find your interest ↓",
      cta2: "Contact us",
    },
    zh: {
      eyebrow: "直播电商代理 · 韩国 × 中国",
      title1: "品牌与卖家相遇",
      title2: "最确定的方式",
      sub: "品牌采购 · 卖家/达人匹配 · 达人/艺人营销 · 直播电商运营 · 双向市场进入。连接中韩的所有执行,由一支团队完成。",
      cta1: "寻找您的关注领域 ↓",
      cta2: "联系我们",
    },
    ja: {
      eyebrow: "LIVE COMMERCE AGENCY · KOREA × CHINA",
      title1: "ブランドとセラーが出会う",
      title2: "最も確実な方法",
      sub: "ブランドソーシング · セラー/KOLマッチング · インフルエンサー/芸能人キャンペーン · ライブコマース運営 · 双方向市場進出。韓国と中国を繋ぐすべての実行を、一つのチームで。",
      cta1: "関心分野を探す ↓",
      cta2: "お問い合わせ",
    },
  };

  // ═══════════════════════════════════════════════════════
  // 5 INTERESTS (핵심 — 관심사 선택 카드)
  // ═══════════════════════════════════════════════════════
  type InterestCard = { title: string; desc: string; cta: string; tag: string };
  const INTEREST_CARDS: Record<Lang, Record<Interest, InterestCard>> = {
    ko: {
      "sourcing":     { title: "상품 · 브랜드 소싱",             desc: "검증된 한국/해외 브랜드를 직공급 조건으로 연결합니다.",       cta: "소싱 가능 브랜드 보기 →",   tag: "SOURCING" },
      "matching":     { title: "셀러 · 왕홍 매칭",               desc: "카테고리와 목표에 맞는 한·중 셀러·왕홍을 제안합니다.",          cta: "매칭 후보 요청하기 →",     tag: "MATCHING" },
      "marketing":    { title: "인플루언서 · 연예인 마케팅",      desc: "한국 인플루언서 200+ · 정상급 연예인 100+ 캠페인을 운영합니다.", cta: "캠페인 옵션 상담 →",      tag: "MARKETING" },
      "live-ops":     { title: "라이브커머스 운영",              desc: "샤오홍슈 · 더우인 · 타오바오 · 네이버 · 그립 실전 운영.",       cta: "라이브 운영 상담 →",      tag: "LIVE OPS" },
      "market-entry": { title: "한국 / 중국 시장 진출",          desc: "통관 · 정품 · CS · 현지 파트너까지 양방향 진출 원스톱 실행.",  cta: "진출 전략 미팅 신청 →",   tag: "MARKET ENTRY" },
    },
    en: {
      "sourcing":     { title: "Product & Brand Sourcing",       desc: "Verified Korean/global brands connected under direct-supply terms.",   cta: "See available brands →",        tag: "SOURCING" },
      "matching":     { title: "Seller · KOL Matching",          desc: "Korean/Chinese sellers and KOLs matched to your category and goals.",   cta: "Request matching candidates →", tag: "MATCHING" },
      "marketing":    { title: "Influencer · Celebrity Marketing", desc: "200+ Korean influencers · 100+ top celebrities — full campaign execution.", cta: "Discuss campaign options →",   tag: "MARKETING" },
      "live-ops":     { title: "Live Commerce Operations",       desc: "Hands-on ops on Xiaohongshu · Douyin · Taobao · Naver · Grip.",        cta: "Talk about live ops →",         tag: "LIVE OPS" },
      "market-entry": { title: "Korea / China Market Entry",     desc: "Customs · authentication · CS · local partners — two-way, one-stop.",  cta: "Book market entry meeting →",   tag: "MARKET ENTRY" },
    },
    zh: {
      "sourcing":     { title: "产品 · 品牌采购",                desc: "经验证的韩国/海外品牌,按直供条件对接。",                       cta: "查看可供品牌 →",              tag: "SOURCING" },
      "matching":     { title: "卖家 · 达人匹配",                desc: "根据您的品类与目标,匹配中韩卖家与达人。",                      cta: "申请匹配候选 →",              tag: "MATCHING" },
      "marketing":    { title: "达人 · 艺人营销",                desc: "韩国达人200+ · 顶级艺人100+ 的全链路营销。",                    cta: "咨询营销方案 →",              tag: "MARKETING" },
      "live-ops":     { title: "直播电商运营",                    desc: "小红书 · 抖音 · 淘宝 · Naver · Grip 的实战运营。",              cta: "咨询直播运营 →",              tag: "LIVE OPS" },
      "market-entry": { title: "韩国 / 中国市场进入",            desc: "通关 · 正品 · 客服 · 本地合作 — 双向一站式进入。",              cta: "预约市场进入会议 →",           tag: "MARKET ENTRY" },
    },
    ja: {
      "sourcing":     { title: "商品 · ブランドソーシング",       desc: "検証済みの韓国/海外ブランドを直供給条件で連結します。",         cta: "ソーシング可能ブランドを見る →", tag: "SOURCING" },
      "matching":     { title: "セラー · KOLマッチング",          desc: "カテゴリと目標に合う韓中のセラー・KOLをご提案します。",          cta: "マッチング候補をリクエスト →",   tag: "MATCHING" },
      "marketing":    { title: "インフルエンサー · 芸能人マーケ",  desc: "韓国インフルエンサー200+ · トップ芸能人100+ のキャンペーン運営。", cta: "キャンペーンオプション相談 →", tag: "MARKETING" },
      "live-ops":     { title: "ライブコマース運営",               desc: "小紅書 · 抖音 · 淘宝 · Naver · Grip の実戦運営。",               cta: "ライブ運営相談 →",             tag: "LIVE OPS" },
      "market-entry": { title: "韓国 / 中国市場進出",             desc: "通関 · 正規品 · CS · 現地パートナーまで双方向ワンストップ。",    cta: "進出戦略MTG予約 →",          tag: "MARKET ENTRY" },
    },
  };

  // 관심사 → 스크롤 타겟 섹션 ID
  const INTEREST_TARGET: Record<Interest, string> = {
    "sourcing":     "#why",
    "matching":     "#network",
    "marketing":    "#network",
    "live-ops":     "#process",
    "market-entry": "#process",
  };

  // 관심사별 메트릭 카드 우선순위 (0=brands, 1=sellers, 2=influencers, 3=celebs)
  const INTEREST_METRIC_ORDER: Record<Interest, number[]> = {
    "sourcing":     [0, 1, 2, 3],
    "matching":     [1, 2, 0, 3],
    "marketing":    [3, 2, 0, 1],
    "live-ops":     [1, 2, 3, 0],
    "market-entry": [0, 3, 1, 2],
  };

  // 관심사별 사례 우선순위
  const INTEREST_CASE_ORDER: Record<Interest, number[]> = {
    "sourcing":     [3, 0, 1, 2],
    "matching":     [0, 1, 3, 2],
    "marketing":    [2, 0, 1, 3],
    "live-ops":     [1, 0, 2, 3],
    "market-entry": [0, 3, 2, 1],
  };

  // 관심사별 최종 CTA
  const INTEREST_FINAL_CTA: Record<Lang, Record<Interest, { h: string; sub: string; btn: string }>> = {
    ko: {
      "sourcing":     { h: "검증된 브랜드 리스트, 지금 요청하세요.",     sub: "150+ 브랜드 중 카테고리 적합 후보를 48시간 내 회신드립니다.",         btn: "브랜드 소싱 리스트 요청 →" },
      "matching":     { h: "맞춤 셀러·왕홍 후보, 지금 요청하세요.",      sub: "카테고리·예산·목표를 알려주시면 48시간 내 후보 리스트를 보내드립니다.", btn: "매칭 후보 요청 →" },
      "marketing":    { h: "캠페인 전략, 무료 미팅에서 설계합니다.",     sub: "비대면 30분 · 연예인/KOL 방향 · 캠페인 옵션 · 예상 효과까지.",         btn: "무료 캠페인 미팅 예약 →" },
      "live-ops":     { h: "라이브 운영, 어떤 플랫폼이든 바로 시작.",    sub: "샤오홍슈 · 더우인 · 타오바오 · 네이버 · 그립 실행 상담 예약.",        btn: "라이브 운영 상담 →" },
      "market-entry": { h: "한국·중국 진출, 전략 미팅으로 시작합니다.",  sub: "시장 진단 · 채널 · 파트너 · 예산까지 30분 미팅에서 정리합니다.",      btn: "무료 진출 전략 미팅 예약 →" },
    },
    en: {
      "sourcing":     { h: "Request a verified brand list now.",       sub: "From 150+ brands, we'll send category-fit candidates within 48 hours.", btn: "Request brand sourcing list →" },
      "matching":     { h: "Request matched seller/KOL candidates.",    sub: "Tell us your category, budget, and goals — candidate list within 48 hours.", btn: "Request matching candidates →" },
      "marketing":    { h: "Design your campaign in a free meeting.",   sub: "30 min remote — celebrity/KOL direction, campaign options, projected impact.", btn: "Book free campaign meeting →" },
      "live-ops":     { h: "Live ops, on any platform, starts now.",    sub: "Book a consultation for Xiaohongshu, Douyin, Taobao, Naver, or Grip.",        btn: "Talk about live ops →" },
      "market-entry": { h: "Korea/China entry starts with strategy.",   sub: "Market diagnosis, channels, partners, budget — organized in a 30-min meeting.", btn: "Book free entry strategy meeting →" },
    },
    zh: {
      "sourcing":     { h: "经验证的品牌清单,立即索取。",                sub: "从150+品牌中,48小时内发送符合品类的候选清单。",                     btn: "申请品牌采购清单 →" },
      "matching":     { h: "匹配卖家/达人候选,立即索取。",                sub: "告知品类·预算·目标,48小时内发送候选清单。",                       btn: "申请匹配候选 →" },
      "marketing":    { h: "在免费会议中设计您的营销方案。",              sub: "线上30分钟 · 艺人/KOL方向 · 营销选项 · 预期效果。",                  btn: "预约免费营销会议 →" },
      "live-ops":     { h: "直播运营,任何平台立即开始。",                 sub: "预约小红书/抖音/淘宝/Naver/Grip的运营咨询。",                       btn: "咨询直播运营 →" },
      "market-entry": { h: "中韩市场进入,从战略会议开始。",               sub: "市场诊断 · 渠道 · 合作伙伴 · 预算 — 在30分钟会议中完成梳理。",      btn: "预约免费进入战略会议 →" },
    },
    ja: {
      "sourcing":     { h: "検証済みブランドリスト、今すぐリクエスト。",  sub: "150+ブランドから、カテゴリ適合候補を48時間以内にご返信。",            btn: "ブランドソーシングリスト請求 →" },
      "matching":     { h: "マッチしたセラー/KOL候補をリクエスト。",       sub: "カテゴリ・予算・目標をお伝えください。候補リストを48時間以内に送信。", btn: "マッチング候補をリクエスト →" },
      "marketing":    { h: "キャンペーン戦略を無料MTGで設計します。",      sub: "オンライン30分 · 芸能人/KOL方向 · キャンペーンオプション · 予想効果。", btn: "無料キャンペーンMTG予約 →" },
      "live-ops":     { h: "ライブ運営、どのプラットフォームでも今すぐ。", sub: "小紅書・抖音・淘宝・Naver・Gripの運営相談を予約。",                    btn: "ライブ運営相談 →" },
      "market-entry": { h: "韓国・中国進出は戦略MTGから。",                sub: "市場診断・チャネル・パートナー・予算を30分MTGで整理。",               btn: "無料進出戦略MTG予約 →" },
    },
  };

  // ═══════════════════════════════════════════════════════
  // COMMON METRICS (150/500/200/100)
  // ═══════════════════════════════════════════════════════
  type MetricItem = { n: string; label: string; sub: string };
  const ALL_METRICS: Record<Lang, MetricItem[]> = {
    ko: [
      { n: "150+", label: "검증 협력 브랜드", sub: "K-Beauty · K-Fashion · 잡화 · 헬스 등" },
      { n: "500+", label: "한·중 라이브커머스 셀러", sub: "검증된 라이브 운영 셀러 풀" },
      { n: "200+", label: "한국 유명 인플루언서", sub: "메가 KOL부터 마이크로까지 전 등급" },
      { n: "100+", label: "한국 정상급 연예인", sub: "배우 · K-POP · 가수 · 방송인" },
    ],
    en: [
      { n: "150+", label: "Verified Partner Brands", sub: "K-Beauty · K-Fashion · accessories · wellness" },
      { n: "500+", label: "K-CN Live Commerce Sellers", sub: "Verified live-operating seller pool" },
      { n: "200+", label: "Korean Influencers", sub: "Mega-KOL to micro across all tiers" },
      { n: "100+", label: "Top Korean Celebrities", sub: "Actors · K-POP · singers · broadcasters" },
    ],
    zh: [
      { n: "150+", label: "经验证的合作品牌", sub: "美妆 · 服装 · 配饰 · 健康等" },
      { n: "500+", label: "中韩直播电商卖家", sub: "经验证的直播运营卖家池" },
      { n: "200+", label: "韩国知名达人", sub: "从头部 KOL 到中腰部全覆盖" },
      { n: "100+", label: "韩国顶级艺人", sub: "演员 · K-POP · 歌手 · 主持人" },
    ],
    ja: [
      { n: "150+", label: "検証済みパートナーブランド", sub: "K-Beauty · K-Fashion · アクセサリー · ヘルス等" },
      { n: "500+", label: "韓中ライブコマースセラー", sub: "検証済みライブ運営セラープール" },
      { n: "200+", label: "韓国有名インフルエンサー", sub: "メガKOLからマイクロまで全等級" },
      { n: "100+", label: "韓国トップクラス芸能人", sub: "俳優 · K-POP · 歌手 · 放送人" },
    ],
  };

  // ═══════════════════════════════════════════════════════
  // COMMON CASE HIGHLIGHTS
  // ═══════════════════════════════════════════════════════
  type CaseItem = { num: string; brand: string; desc: string; cat: string };
  const ALL_CASES: Record<Lang, CaseItem[]> = {
    ko: [
      { num: "183억 원",        brand: "더후 × 댠댠",          desc: "단일 라이브 매출 — 한국 방문 3일, 4회 라이브",            cat: "m-amber" },
      { num: "4시간 전량 매진",  brand: "메디큐브",             desc: "더우인 라이브에서 1.2만개 기획세트 전량 소진",             cat: "m-emerald" },
      { num: "매출 50% 증가",    brand: "Dior × 지수",          desc: "BLACKPINK 지수 앰배서더 발탁 후 한국 매출 급증",          cat: "m-azure" },
      { num: "2,000억 원",       brand: "왕홍 댠댠 한국 방문",  desc: "3일간 총 매출 — K-뷰티 집중 판매",                       cat: "m-coral" },
    ],
    en: [
      { num: "₩18.3B",           brand: "Whoo × Dandan",        desc: "Single live revenue — 3-day Korea visit, 4 broadcasts",   cat: "m-amber" },
      { num: "Sold out in 4hrs", brand: "Medicube",             desc: "12,000 curated sets sold out on Douyin live",             cat: "m-emerald" },
      { num: "+50% revenue",     brand: "Dior × Jisoo",         desc: "Korea revenue surged after BLACKPINK Jisoo ambassadorship", cat: "m-azure" },
      { num: "₩200B",            brand: "Dandan Korea Visit",   desc: "3-day total — focused K-Beauty sales",                   cat: "m-coral" },
    ],
    zh: [
      { num: "183亿韩元",        brand: "后 × 丹丹",            desc: "单场直播销售额 — 访韩3天4场直播",                       cat: "m-amber" },
      { num: "4小时全部售罄",    brand: "Medicube",             desc: "抖音直播1.2万套策划套装全部售罄",                       cat: "m-emerald" },
      { num: "销售额增长50%",    brand: "Dior × 智秀",          desc: "BLACKPINK智秀任大使后韩国销售额激增",                   cat: "m-azure" },
      { num: "10亿元人民币",     brand: "达人丹丹访韩",         desc: "3天总销售额 — K-Beauty集中销售",                       cat: "m-coral" },
    ],
    ja: [
      { num: "183億ウォン",       brand: "后 × ダンダン",        desc: "単一ライブ売上 — 訪韓3日間4回ライブ",                    cat: "m-amber" },
      { num: "4時間で完売",       brand: "Medicube",             desc: "抖音ライブで1.2万セット完売",                           cat: "m-emerald" },
      { num: "売上50%増加",       brand: "Dior × ジス",          desc: "BLACKPINKジスアンバサダー就任後、韓国売上急増",           cat: "m-azure" },
      { num: "2,000億ウォン",     brand: "KOLダンダン訪韓",      desc: "3日間の総売上 — K-Beauty集中販売",                      cat: "m-coral" },
    ],
  };

  // ═══════════════════════════════════════════════════════
  // COMMON 5-STEP PROCESS (공통. 관심사 선택 시 문구 변형)
  // ═══════════════════════════════════════════════════════
  const STEPS_BASE: Record<Lang, { n: string; t: string; d: string }[]> = {
    ko: [
      { n: "01", t: "문의 접수",            d: "관심 분야 · 카테고리 · 목표를 알려주시면 48시간 이내 전담 매니저가 회신합니다." },
      { n: "02", t: "무료 컨셉 미팅",       d: "비대면 30분 · 시장 진단 · 방향 제안 · 예산 범위 합의까지 1회 미팅에서 정리." },
      { n: "03", t: "맞춤 제안",            d: "후보 리스트 · 실행 옵션 · 예상 효과 · 견적을 포함한 제안서를 공유드립니다." },
      { n: "04", t: "실행",                 d: "매칭 · 콘텐츠 · 라이브 · 플랫폼 운영 · 물류 · CS까지 한 팀이 수행합니다." },
      { n: "05", t: "결과 공유 · 후속 제안", d: "성과 리포트와 데이터 기반으로 다음 단계 확장안을 함께 설계합니다." },
    ],
    en: [
      { n: "01", t: "Inquiry",                d: "Tell us your interest, category, and goals — dedicated manager reply within 48 hrs." },
      { n: "02", t: "Free Concept Meeting",   d: "30 min remote — market diagnosis, direction, and budget alignment in one sitting." },
      { n: "03", t: "Tailored Proposal",       d: "Candidate list, execution options, projected impact, and quote — all in one deck." },
      { n: "04", t: "Execution",               d: "Matching, content, live, platform ops, logistics, CS — all executed by one team." },
      { n: "05", t: "Results & Next Steps",    d: "Performance report and data-driven expansion plan, co-designed with you." },
    ],
    zh: [
      { n: "01", t: "咨询受理",               d: "告知关注领域·品类·目标,48小时内专属经理回复。" },
      { n: "02", t: "免费概念会议",           d: "线上30分钟 · 市场诊断 · 方向建议 · 预算范围一次性梳理。" },
      { n: "03", t: "定制方案",               d: "候选清单 · 执行选项 · 预期效果 · 报价,一份方案提供。" },
      { n: "04", t: "执行",                   d: "匹配 · 内容 · 直播 · 平台运营 · 物流 · 客服,由一个团队完成。" },
      { n: "05", t: "结果共享·后续建议",      d: "基于成果报告与数据,共同设计下一阶段扩展方案。" },
    ],
    ja: [
      { n: "01", t: "お問い合わせ",           d: "関心分野・カテゴリ・目標をお知らせください。専任マネージャーが48時間以内にご返信。" },
      { n: "02", t: "無料コンセプトMTG",      d: "オンライン30分 — 市場診断・方向性・予算レンジを1回でまとめます。" },
      { n: "03", t: "カスタム提案",           d: "候補リスト・実行オプション・予想効果・見積を含む提案書を共有。" },
      { n: "04", t: "実行",                   d: "マッチング・コンテンツ・ライブ・運営・物流・CSを一つのチームで。" },
      { n: "05", t: "結果共有・次の提案",     d: "成果レポートとデータに基づき、次のステップを共同設計。" },
    ],
  };

  // 관심사별 프로세스 문구 미세 변형 (각 단계의 d를 일부 교체)
  const STEP_OVERRIDE: Record<Interest, Record<Lang, Partial<Record<number, string>>>> = {
    "sourcing": {
      ko: { 2: "직공급 가능 브랜드 리스트 · 샘플 · 가격 · 물류 조건까지 제안서 1장으로 공유." },
      en: { 2: "Direct-supply brand list, samples, pricing, logistics terms — all in one proposal." },
      zh: { 2: "直供品牌清单·样品·价格·物流条件,一份方案提供。" },
      ja: { 2: "直供給可能ブランドリスト・サンプル・価格・物流条件を提案書1枚で。" },
    },
    "matching": {
      ko: { 2: "검증된 셀러/왕홍 후보 · 이력 · 레퍼런스 · 예상 견적을 함께 공유드립니다." },
      en: { 2: "Verified seller/KOL candidates — history, references, and quotes included." },
      zh: { 2: "经验证的卖家/达人候选 · 履历 · 参考 · 报价一并提供。" },
      ja: { 2: "検証済みセラー/KOL候補・実績・レファレンス・見積を一括共有。" },
    },
    "marketing": {
      ko: { 3: "연예인/KOL 섭외 · 콘텐츠/라이브 제작 · 광고 캠페인 집행까지 운영." },
      en: { 3: "Talent booking, content/live production, ad campaign delivery — end-to-end." },
      zh: { 3: "艺人/KOL邀约·内容/直播制作·广告投放,端到端执行。" },
      ja: { 3: "芸能人/KOLブッキング・コンテンツ/ライブ制作・広告キャンペーン実施まで。" },
    },
    "live-ops": {
      ko: { 3: "플랫폼 셋업 · 라이브 운영 · 통관 · 정산 · CS 원스톱 실행." },
      en: { 3: "Platform setup, live operations, customs, settlement, CS — all-in-one." },
      zh: { 3: "平台搭建·直播运营·通关·结算·客服一站式。" },
      ja: { 3: "プラットフォーム設定・ライブ運営・通関・精算・CSワンストップ。" },
    },
    "market-entry": {
      ko: { 1: "비대면 30분 · 시장 진단 · 채널/파트너 방향 · 예산 범위 · 리스크까지 정리합니다." },
      en: { 1: "30 min remote — market diagnosis, channel/partner direction, budget range, risks." },
      zh: { 1: "线上30分钟 · 市场诊断 · 渠道/合作伙伴方向 · 预算 · 风险一次性梳理。" },
      ja: { 1: "オンライン30分 — 市場診断・チャネル/パートナー方向・予算・リスクを整理。" },
    },
  };

  // ═══════════════════════════════════════════════════════
  // WHY N-LIVE (4 pillars) — 공통
  // ═══════════════════════════════════════════════════════
  const WHY: Record<Lang, { eyebrow: string; title: string; items: { t: string; d: string }[] }> = {
    ko: {
      eyebrow: "WHY N-LIVE · 왜 엔라이브인가",
      title: "한 팀이 실행합니다",
      items: [
        { t: "검증된 한·중 네트워크",       d: "브랜드 150+ · 셀러 500+ · 인플루언서 200+ · 연예인 100+ 모두 직접 미팅을 거친 풀." },
        { t: "벤더 없는 직접 매칭",         d: "중간 에이전시 없이 브랜드·셀러·플랫폼을 직접 연결합니다." },
        { t: "실행 범위 원스톱",            d: "매칭부터 라이브 · 통관 · 정산 · CS까지 한 팀이 수행." },
        { t: "실적 기반 리포트 · 재운영",   d: "데이터 기반 성과 리포트 · 다음 캠페인 확장 설계." },
      ],
    },
    en: {
      eyebrow: "WHY N-LIVE",
      title: "One team executes everything",
      items: [
        { t: "Verified Korea-China Network",    d: "150+ brands · 500+ sellers · 200+ influencers · 100+ celebrities — all directly met." },
        { t: "Direct Matching, No Middlemen",   d: "Brands, sellers, and platforms connected without intermediary agencies." },
        { t: "Full-Stack Execution",            d: "Matching to live, customs, settlement, CS — all by one team." },
        { t: "Performance Report & Repeat",     d: "Data-driven reports and expansion plans for next campaigns." },
      ],
    },
    zh: {
      eyebrow: "WHY N-LIVE · 为什么选恩联",
      title: "一个团队全程执行",
      items: [
        { t: "经验证的中韩网络",               d: "品牌150+ · 卖家500+ · 达人200+ · 艺人100+,全部经过直接对接。" },
        { t: "无中介直接匹配",                 d: "品牌、卖家、平台无需中介代理直接对接。" },
        { t: "全链路一站式执行",               d: "从匹配到直播、通关、结算、客服,一个团队完成。" },
        { t: "基于业绩的报告与复投",           d: "数据驱动的报告 · 下一期扩展方案设计。" },
      ],
    },
    ja: {
      eyebrow: "WHY N-LIVE · なぜN-LIVEか",
      title: "1チームで実行します",
      items: [
        { t: "検証済み韓中ネットワーク",          d: "ブランド150+ · セラー500+ · インフルエンサー200+ · 芸能人100+、すべて直接対面。" },
        { t: "中間業者なしの直接マッチング",      d: "ブランド・セラー・プラットフォームを中間エージェンシーなしで直接接続。" },
        { t: "フルスタック実行",                  d: "マッチングからライブ、通関、精算、CSまで1チームで。" },
        { t: "パフォーマンス報告・リピート",      d: "データドリブンのレポート、次のキャンペーン拡張設計。" },
      ],
    },
  };

  // ═══════════════════════════════════════════════════════
  // FAQ
  // ═══════════════════════════════════════════════════════
  const FAQS: Record<Lang, { q: string; a: string }[]> = {
    ko: [
      { q: "최소 프로젝트 규모가 있나요?",              a: "고정 최소 금액은 없습니다. 카테고리와 목표에 맞춰 단발 캠페인부터 장기 운영까지 모두 가능합니다." },
      { q: "첫 미팅은 유료인가요?",                      a: "첫 30분 비대면 컨셉 미팅은 무료입니다. 시장 진단과 방향 제안까지 제공합니다." },
      { q: "진행 중인 사례 레퍼런스를 볼 수 있나요?",   a: "프로젝트 자료는 비공개로 운영합니다. NDA 사전 체결 후 직접 공유드립니다." },
      { q: "중국어/영어 커뮤니케이션이 가능한가요?",     a: "한·중·영·일 4개 언어로 전담 커뮤니케이션이 가능합니다." },
      { q: "통관, 정산, CS까지 엔라이브에서 운영하나요?", a: "네. 별도 업체를 끼지 않고 한 팀에서 실행합니다." },
    ],
    en: [
      { q: "Is there a minimum project size?",              a: "No fixed minimum. From single campaigns to long-term operations — we tailor to your category and goals." },
      { q: "Is the first meeting paid?",                     a: "The first 30-minute remote concept meeting is free. Includes market diagnosis and direction proposal." },
      { q: "Can I see ongoing project references?",          a: "Project materials are kept confidential. We share details directly after an NDA is signed." },
      { q: "Is Chinese/English communication available?",    a: "Dedicated communication in Korean, Chinese, English, and Japanese." },
      { q: "Do you operate customs, settlement, and CS?",    a: "Yes. All executed by one team, no separate vendors." },
    ],
    zh: [
      { q: "有最小项目规模要求吗?",                          a: "没有固定最低金额。从单次活动到长期运营,都可根据您的品类和目标定制。" },
      { q: "首次会议收费吗?",                                a: "首次30分钟线上概念会议免费。提供市场诊断与方向建议。" },
      { q: "可以看到正在进行的案例参考吗?",                  a: "项目资料保密运营。签署NDA后直接分享。" },
      { q: "可以用中文/英语沟通吗?",                         a: "可提供中韩英日4种语言专属沟通。" },
      { q: "通关、结算、客服也由恩联运营吗?",                a: "是的。无需另找供应商,由一个团队执行。" },
    ],
    ja: [
      { q: "最小プロジェクト規模はありますか?",              a: "固定の最低金額はありません。単発から長期運営まで、カテゴリと目標に合わせて対応。" },
      { q: "初回ミーティングは有料ですか?",                   a: "初回30分のオンラインコンセプトMTGは無料。市場診断と方向提案まで含みます。" },
      { q: "進行中の事例リファレンスは見られますか?",         a: "プロジェクト資料は非公開で運営しています。NDA締結後に直接共有します。" },
      { q: "中国語/英語でコミュニケーション可能ですか?",      a: "韓・中・英・日の4言語で専任コミュニケーション可能です。" },
      { q: "通関・精算・CSもN-LIVEで運営しますか?",           a: "はい。別途業者を介さず、1チームで実行します。" },
    ],
  };

  // ═══════════════════════════════════════════════════════
  // DERIVED DATA (based on selected interest)
  // ═══════════════════════════════════════════════════════
  const hero = HERO[lang];
  const interestCards = INTEREST_CARDS[lang];
  const metrics = ALL_METRICS[lang];
  const cases = ALL_CASES[lang];
  const stepsBase = STEPS_BASE[lang];
  const why = WHY[lang];
  const faqs = FAQS[lang];

  // 관심사 기반 정렬
  const metricOrder = interest ? INTEREST_METRIC_ORDER[interest] : [0, 1, 2, 3];
  const caseOrder   = interest ? INTEREST_CASE_ORDER[interest]   : [0, 1, 2, 3];
  const orderedMetrics = metricOrder.map(i => metrics[i]);
  const orderedCases   = caseOrder.map(i => cases[i]);

  // 관심사 기반 프로세스 문구 변형
  const steps = stepsBase.map((s, i) => {
    if (!interest) return s;
    const override = STEP_OVERRIDE[interest][lang]?.[i];
    return override ? { ...s, d: override } : s;
  });

  const finalCTA = interest ? INTEREST_FINAL_CTA[lang][interest] : null;

  // 인터레스트 선택 시 해당 섹션으로 스크롤
  const selectInterest = (id: Interest) => {
    setInterest(id);
    setTimeout(() => {
      const target = document.querySelector(INTEREST_TARGET[id]);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // 공통 i18n
  const INTEREST_SECTION: Record<Lang, { eyebrow: string; question: string; hint: string }> = {
    ko: { eyebrow: "WHAT DO YOU NEED · 관심 분야 선택", question: "어떤 협업을 찾고 계신가요?", hint: "관심 분야를 선택하시면 관련 정보와 CTA를 먼저 보여드립니다." },
    en: { eyebrow: "WHAT DO YOU NEED",                  question: "What are you looking to do?",    hint: "Pick an area — we'll surface the relevant sections and CTAs first." },
    zh: { eyebrow: "您的关注领域",                       question: "您想找什么样的合作?",           hint: "选择关注领域,我们会优先展示相关信息与CTA。" },
    ja: { eyebrow: "WHAT DO YOU NEED · 関心分野",        question: "どのような協業をお探しですか?", hint: "関心分野を選ぶと、関連情報とCTAを優先表示します。" },
  };
  const is = INTEREST_SECTION[lang];

  const WHY_LABELS: Record<Lang, string> = { ko: "WHY N-LIVE", en: "WHY N-LIVE", zh: "WHY N-LIVE", ja: "WHY N-LIVE" };
  const NET_LABELS: Record<Lang, string> = { ko: "VERIFIED NETWORK · 검증된 네트워크", en: "VERIFIED NETWORK", zh: "经验证的网络", ja: "検証済みネットワーク" };
  const CASES_LABELS: Record<Lang, string> = { ko: "PROVEN RESULTS · 검증된 성과", en: "PROVEN RESULTS", zh: "验证的成果", ja: "検証された成果" };
  const PROCESS_LABELS: Record<Lang, string> = { ko: "HOW WE WORK · 진행 방식", en: "HOW WE WORK", zh: "我们的工作方式", ja: "進め方" };
  const PROCESS_TITLE: Record<Lang, string> = { ko: "문의부터 실행까지, 5단계", en: "From inquiry to execution — 5 steps", zh: "从咨询到执行 5 步", ja: "問い合わせから実行まで5ステップ" };
  const FAQ_LABELS: Record<Lang, string> = { ko: "FAQ · 자주 묻는 질문", en: "FREQUENTLY ASKED", zh: "常见问题", ja: "よくある質問" };
  const FAQ_TITLE: Record<Lang, string> = { ko: "궁금한 점이 있으신가요?", en: "Have questions?", zh: "有疑问吗?", ja: "ご質問はありますか?" };
  const CASE_NOTE: Record<Lang, string> = {
    ko: "위 사례는 공개 보도 기반입니다. 프로젝트별 상세 데이터는 NDA 체결 후 공유드립니다.",
    en: "Cases above are based on public reporting. Per-project details are shared after NDA.",
    zh: "以上案例基于公开报道。项目详细数据可在签署NDA后共享。",
    ja: "上記事例は公開報道に基づきます。プロジェクト詳細はNDA締結後に共有します。",
  };
  const CTA_DEFAULT: Record<Lang, { h: string; sub: string; btn: string }> = {
    ko: { h: "시작하실 준비가 되셨나요?", sub: "첫 30분 비대면 미팅은 무료입니다. 관심 분야와 목표만 알려주세요.", btn: "문의하기 →" },
    en: { h: "Ready to start?", sub: "The first 30-min remote meeting is free. Just tell us your focus and goals.", btn: "Contact us →" },
    zh: { h: "准备好开始了吗?", sub: "首次30分钟线上会议免费。请告知您的关注领域与目标。", btn: "联系我们 →" },
    ja: { h: "始める準備はできましたか?", sub: "初回30分オンラインMTGは無料。関心分野と目標をお知らせください。", btn: "お問い合わせ →" },
  };
  const ctaBlock = finalCTA || CTA_DEFAULT[lang];

  // Multi-language marquee
  const marquee1 = [
    "KOREA × CHINA", "한국 × 중국", "BRAND × SELLER", "브랜드 × 셀러",
    "SOURCING · MATCHING · MARKETING · LIVE OPS · MARKET ENTRY",
    "1,500+ WANGHONG NETWORK", "왕홍 네트워크", "K-BEAUTY · K-FASHION",
    "N-LIVE · 恩联 · 엔라이브",
  ];

  return (
    <>
      {/* HERO — 공통 */}
      <section className="hero">
        <MeteorBackground />
        <div className="container hero-content">
          <div className="hero-eyebrow">{hero.eyebrow}</div>
          <h1 className="hero-title">
            <span className="line-mask"><span className="line-inner">{hero.title1}</span></span>
            <span className="line-mask"><span className="line-inner"><em>{hero.title2}</em></span></span>
          </h1>
          <p className="hero-sub">{hero.sub}</p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary btn-hero-contact">{hero.cta2}</Link>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => document.querySelector("#interest")?.scrollIntoView({ behavior: "smooth" })}
            >
              {hero.cta1}
            </button>
          </div>
        </div>
      </section>

      <Marquee items={marquee1} />

      {/* INTEREST PICKER — 핵심 */}
      <section id="interest" className="interest-section">
        <div className="container">
          <div className="section-eyebrow">— {is.eyebrow}</div>
          <h2 className="section-title">{is.question}</h2>
          <p className="section-desc">{is.hint}</p>
          <div className="interest-grid">
            {(Object.keys(interestCards) as Interest[]).map((id) => {
              const c = interestCards[id];
              const isActive = interest === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={`interest-card ${isActive ? "active" : ""}`}
                  data-interest={id}
                  onClick={() => selectInterest(id)}
                >
                  <div className="interest-tag">{c.tag}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <span className="interest-cta">{c.cta}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY N-LIVE */}
      <section id="why" className={`why-section ${interest === "sourcing" ? "highlight" : ""}`}>
        <div className="container">
          <div className="section-eyebrow">— {WHY_LABELS[lang]}</div>
          <h2 className="section-title">{why.title}</h2>
          <div className="why-grid">
            {why.items.map((item, i) => (
              <div className="why-item" key={i}>
                <div className="why-num">0{i + 1}</div>
                <h4>{item.t}</h4>
                <p>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NETWORK / METRICS — 관심사별 순서 변경 */}
      <section id="network" className={`metrics topo-bg section-grain ${interest === "matching" || interest === "marketing" ? "highlight" : ""}`}>
        <div className="container">
          <div className="metrics-eyebrow">— {NET_LABELS[lang]}</div>
          <div className="metrics-grid">
            {orderedMetrics.map((m, i) => (
              <div className={`metric-card ${["m-amber", "m-emerald", "m-azure", "m-coral"][metricOrder[i]]} ${i === 0 && interest ? "metric-priority" : ""}`} key={metricOrder[i]}>
                <div className="metric-num-big">{m.n}</div>
                <div className="metric-label">{m.label}</div>
                <div className="metric-sub">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="case-highlights">
        <div className="container">
          <div className="section-eyebrow">— {CASES_LABELS[lang]}</div>
          <div className="case-row">
            {orderedCases.map((c, i) => (
              <div className={`case-pill ${c.cat} ${i === 0 && interest ? "case-priority" : ""}`} key={caseOrder[i]}>
                <div className="case-num-big">{c.num}</div>
                <div className="case-brand">{c.brand}</div>
                <p className="case-desc">{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="case-highlight-note">{CASE_NOTE[lang]}</p>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className={`process-section ${interest === "live-ops" || interest === "market-entry" ? "highlight" : ""}`}>
        <div className="container">
          <div className="section-eyebrow">— {PROCESS_LABELS[lang]}</div>
          <h2 className="section-title">{PROCESS_TITLE[lang]}</h2>
          <div className="step-list">
            {steps.map((s, i) => (
              <div className="step-row" key={i}>
                <div className="step-num">{s.n}</div>
                <div className="step-body">
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <div className="section-eyebrow">— {FAQ_LABELS[lang]}</div>
          <h2 className="section-title">{FAQ_TITLE[lang]}</h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={i}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} type="button">
                  <span>{f.q}</span>
                  <span className="faq-toggle">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div className="faq-a"><p>{f.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — 관심사별 문구 변경 */}
      <section className="final-cta">
        <div className="container">
          <h3>{ctaBlock.h}</h3>
          <p>{ctaBlock.sub}</p>
          <Link href={`/contact${interest ? `?interest=${interest}` : ""}`} className="btn btn-primary">
            {ctaBlock.btn}
          </Link>
        </div>
      </section>
    </>
  );
}
