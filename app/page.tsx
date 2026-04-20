"use client";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/components/LangContext";
import Marquee from "@/components/Marquee";
import MeteorBackground from "@/components/MeteorBackground";
import type { Lang } from "@/lib/i18n";

type Interest = "sourcing" | "matching" | "korea-entry" | "overseas-entry" | "nlink";

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
      "sourcing":        { title: "상품 · 브랜드 소싱",   desc: "국내 / 해외 — 검증된 브랜드를 직공급 조건으로 연결합니다.", cta: "소싱 가능 브랜드 보기 →", tag: "SOURCING" },
      "matching":        { title: "셀러 매칭",            desc: "국내 / 해외 — 카테고리와 목표에 맞는 셀러를 제안합니다.",    cta: "매칭 후보 요청하기 →",   tag: "MATCHING" },
      "korea-entry":     { title: "한국시장 진출",        desc: "한국 셀러브리티 · KOL · 라이브 · PPL까지 원스톱 실행.",       cta: "한국 진출 미팅 신청 →",  tag: "KOREA ENTRY" },
      "overseas-entry":  { title: "해외시장 진출",        desc: "왕홍 매칭 · 현지 플랫폼 · 통관 · CS까지 원스톱 실행.",        cta: "해외 진출 미팅 신청 →",  tag: "OVERSEAS ENTRY" },
      "nlink":           { title: "NLINK 어플리케이션 입점", desc: "K-브랜드와 해외 셀러/왕홍을 직접 연결하는 오픈 플랫폼.",    cta: "오픈 소식 받기 →",       tag: "COMING SOON" },
    },
    en: {
      "sourcing":        { title: "Product & Brand Sourcing", desc: "Domestic / overseas — verified brands under direct-supply terms.",  cta: "See available brands →",       tag: "SOURCING" },
      "matching":        { title: "Seller Matching",          desc: "Domestic / overseas — sellers matched to your category and goals.", cta: "Request matching candidates →", tag: "MATCHING" },
      "korea-entry":     { title: "Korea Market Entry",       desc: "Korean celebrities · KOL · live · PPL — one-stop execution.",        cta: "Book Korea entry meeting →",   tag: "KOREA ENTRY" },
      "overseas-entry":  { title: "Overseas Market Entry",    desc: "Wanghong matching · local platforms · customs · CS — one-stop.",    cta: "Book overseas entry meeting →", tag: "OVERSEAS ENTRY" },
      "nlink":           { title: "NLINK App (launching soon)", desc: "Open platform directly connecting K-brands with overseas sellers/KOLs.", cta: "Get launch updates →",   tag: "COMING SOON" },
    },
    zh: {
      "sourcing":        { title: "产品 · 品牌采购",          desc: "国内 / 海外 — 按直供条件对接经验证品牌。",                 cta: "查看可供品牌 →",    tag: "SOURCING" },
      "matching":        { title: "卖家匹配",                  desc: "国内 / 海外 — 根据品类与目标匹配卖家。",                    cta: "申请匹配候选 →",    tag: "MATCHING" },
      "korea-entry":     { title: "韩国市场进入",              desc: "韩国艺人 · KOL · 直播 · PPL 一站式执行。",                   cta: "预约韩国进入会议 →", tag: "KOREA ENTRY" },
      "overseas-entry":  { title: "海外市场进入",              desc: "达人匹配 · 本地平台 · 通关 · 客服一站式。",                  cta: "预约海外进入会议 →", tag: "OVERSEAS ENTRY" },
      "nlink":           { title: "NLINK 应用入驻",            desc: "直接连接 K-品牌与海外卖家/达人的开放平台。",                cta: "接收开放信息 →",    tag: "即将上线" },
    },
    ja: {
      "sourcing":        { title: "商品 · ブランドソーシング",  desc: "国内 / 海外 — 検証済みブランドを直供給条件で連結。",              cta: "ソーシング可能ブランドを見る →", tag: "SOURCING" },
      "matching":        { title: "セラーマッチング",           desc: "国内 / 海外 — カテゴリと目標に合うセラーをご提案。",               cta: "マッチング候補をリクエスト →",   tag: "MATCHING" },
      "korea-entry":     { title: "韓国市場進出",               desc: "韓国芸能人 · KOL · ライブ · PPLまでワンストップ実行。",            cta: "韓国進出MTG予約 →",            tag: "KOREA ENTRY" },
      "overseas-entry":  { title: "海外市場進出",               desc: "KOLマッチング · 現地プラットフォーム · 通関 · CSワンストップ。",  cta: "海外進出MTG予約 →",            tag: "OVERSEAS ENTRY" },
      "nlink":           { title: "NLINK アプリ入居",           desc: "K-ブランドと海外セラー/KOLを直接つなぐオープンプラットフォーム。", cta: "オープン情報を受け取る →",     tag: "COMING SOON" },
    },
  };

  // 관심사 → 연결될 서비스 상세 페이지 URL (nlink은 coming soon — 스크롤만)
  const INTEREST_URL: Record<Interest, string | null> = {
    "sourcing":       "/for-overseas-sellers",
    "matching":       "/for-korean-sellers",
    "korea-entry":    "/for-overseas-brands",
    "overseas-entry": "/for-korean-brands",
    "nlink":          null,
  };

  // 관심사별 메트릭 카드 우선순위 (0=brands, 1=sellers, 2=influencers, 3=celebs)
  const INTEREST_METRIC_ORDER: Record<Interest, number[]> = {
    "sourcing":       [0, 1, 2, 3],
    "matching":       [1, 2, 0, 3],
    "korea-entry":    [3, 2, 0, 1],
    "overseas-entry": [1, 0, 2, 3],
    "nlink":          [0, 1, 2, 3],
  };

  // 관심사별 사례 우선순위
  const INTEREST_CASE_ORDER: Record<Interest, number[]> = {
    "sourcing":       [3, 0, 1, 2],
    "matching":       [0, 1, 3, 2],
    "korea-entry":    [2, 0, 1, 3],
    "overseas-entry": [0, 3, 1, 2],
    "nlink":          [0, 1, 2, 3],
  };

  // 관심사별 최종 CTA
  const INTEREST_FINAL_CTA: Record<Lang, Record<Interest, { h: string; sub: string; btn: string }>> = {
    ko: {
      "sourcing":       { h: "검증된 브랜드 리스트, 지금 요청하세요.",   sub: "150+ 브랜드 중 카테고리 적합 후보를 48시간 내 회신드립니다.",     btn: "브랜드 소싱 리스트 요청 →" },
      "matching":       { h: "맞춤 셀러 후보, 지금 요청하세요.",          sub: "카테고리·예산·목표를 알려주시면 48시간 내 후보 리스트를 보내드립니다.", btn: "매칭 후보 요청 →" },
      "korea-entry":    { h: "한국시장 진출, 전략 미팅으로 시작합니다.", sub: "연예인/KOL/라이브/PPL — 30분 비대면 미팅에서 방향을 정리합니다.",  btn: "한국 진출 미팅 예약 →" },
      "overseas-entry": { h: "해외시장 진출, 전략 미팅으로 시작합니다.", sub: "왕홍/플랫폼/통관/CS — 30분 비대면 미팅에서 방향을 정리합니다.",    btn: "해외 진출 미팅 예약 →" },
      "nlink":          { h: "NLINK 오픈 소식을 가장 먼저 받아보세요.",  sub: "K-브랜드와 해외 셀러/왕홍을 직접 연결하는 입점 플랫폼 — 런칭 예정.", btn: "오픈 알림 신청 →" },
    },
    en: {
      "sourcing":       { h: "Request a verified brand list now.",         sub: "From 150+ brands, we'll send category-fit candidates within 48 hours.",   btn: "Request brand sourcing list →" },
      "matching":       { h: "Request matched seller candidates.",          sub: "Tell us your category, budget, and goals — candidate list within 48 hours.", btn: "Request matching candidates →" },
      "korea-entry":    { h: "Korea market entry starts with strategy.",    sub: "Celebrity/KOL/live/PPL — 30-min remote meeting to align direction.",       btn: "Book Korea entry meeting →" },
      "overseas-entry": { h: "Overseas market entry starts with strategy.", sub: "Wanghong/platforms/customs/CS — 30-min remote meeting to align direction.", btn: "Book overseas entry meeting →" },
      "nlink":          { h: "Be the first to know when NLINK launches.",   sub: "The open platform directly connecting K-brands with overseas sellers/KOLs — launching soon.", btn: "Get launch updates →" },
    },
    zh: {
      "sourcing":       { h: "经验证的品牌清单,立即索取。",                sub: "从150+品牌中,48小时内发送符合品类的候选清单。",               btn: "申请品牌采购清单 →" },
      "matching":       { h: "匹配卖家候选,立即索取。",                    sub: "告知品类·预算·目标,48小时内发送候选清单。",                  btn: "申请匹配候选 →" },
      "korea-entry":    { h: "韩国市场进入,从战略会议开始。",              sub: "艺人/KOL/直播/PPL — 30分钟线上会议梳理方向。",                btn: "预约韩国进入会议 →" },
      "overseas-entry": { h: "海外市场进入,从战略会议开始。",              sub: "达人/平台/通关/客服 — 30分钟线上会议梳理方向。",              btn: "预约海外进入会议 →" },
      "nlink":          { h: "抢先收到 NLINK 上线通知。",                  sub: "直接连接 K-品牌与海外卖家/达人的入驻平台 — 即将上线。",        btn: "申请上线通知 →" },
    },
    ja: {
      "sourcing":       { h: "検証済みブランドリスト、今すぐリクエスト。", sub: "150+ブランドから、カテゴリ適合候補を48時間以内にご返信。",          btn: "ブランドソーシングリスト請求 →" },
      "matching":       { h: "マッチしたセラー候補をリクエスト。",         sub: "カテゴリ・予算・目標をお伝えください。候補リストを48時間以内に送信。", btn: "マッチング候補をリクエスト →" },
      "korea-entry":    { h: "韓国市場進出は戦略MTGから。",                sub: "芸能人/KOL/ライブ/PPL — 30分オンラインMTGで方向性を整理。",          btn: "韓国進出MTG予約 →" },
      "overseas-entry": { h: "海外市場進出は戦略MTGから。",                sub: "KOL/プラットフォーム/通関/CS — 30分オンラインMTGで方向性を整理。",   btn: "海外進出MTG予約 →" },
      "nlink":          { h: "NLINKローンチを最速でお知らせ。",            sub: "K-ブランドと海外セラー/KOLを直接つなぐ入居プラットフォーム — ローンチ予定。", btn: "オープン通知を申請 →" },
    },
  };

  // ═══════════════════════════════════════════════════════
  // COMMON METRICS (150/500/200/100)
  // ═══════════════════════════════════════════════════════
  type MetricItem = { n: string; label: string; sub: string };
  const ALL_METRICS: Record<Lang, MetricItem[]> = {
    ko: [
      { n: "150+", label: "한국 제품 · 브랜드 소싱 연결", sub: "K-Beauty · K-Fashion · 잡화 · 헬스 카테고리에서 검증 협력 브랜드 150+ 풀 매칭" },
      { n: "500+", label: "한·중 셀러 · 왕홍 매칭", sub: "검증된 라이브 운영 셀러 500+ 풀에서 카테고리 적합 후보 제안" },
      { n: "200+", label: "인플루언서 · KOL 마케팅", sub: "메가 KOL부터 마이크로까지 한국 인플루언서 200+ 캠페인 운영" },
      { n: "100+", label: "한국 정상급 연예인 캠페인", sub: "배우 · K-POP · 가수 · 방송인 100+ 협업 풀 · PPL · 광고" },
    ],
    en: [
      { n: "150+", label: "Korean Product · Brand Sourcing", sub: "Matched from 150+ verified brands across K-Beauty, K-Fashion, accessories, and wellness." },
      { n: "500+", label: "K-CN Seller · Wanghong Matching",   sub: "Category-fit candidates proposed from 500+ verified live-operating sellers." },
      { n: "200+", label: "Influencer · KOL Campaigns",        sub: "200+ Korean influencers — mega KOL to micro — with full campaign operations." },
      { n: "100+", label: "Top Korean Celebrity Campaigns",    sub: "100+ actors, K-POP artists, singers, and broadcasters — PPL, ads, collabs." },
    ],
    zh: [
      { n: "150+", label: "韩国产品 · 品牌采购对接", sub: "从美妆、服装、配饰、健康等品类的150+经验证品牌中匹配。" },
      { n: "500+", label: "中韩卖家 · 达人匹配",      sub: "从500+经验证直播运营卖家中,提供符合品类的候选。" },
      { n: "200+", label: "达人 · KOL营销",           sub: "200+韩国达人(头部到中腰部)全覆盖,全链路活动运营。" },
      { n: "100+", label: "韩国顶级艺人营销",         sub: "100+演员、K-POP、歌手、主持人 — PPL、广告、联名。" },
    ],
    ja: [
      { n: "150+", label: "韓国商品 · ブランドソーシング連結", sub: "K-Beauty、K-Fashion、アクセサリー、ヘルスの150+検証済みブランドからマッチング。" },
      { n: "500+", label: "韓中セラー · KOLマッチング",          sub: "500+検証済みライブ運営セラープールからカテゴリ適合候補をご提案。" },
      { n: "200+", label: "インフルエンサー · KOLマーケティング", sub: "メガKOLからマイクロまで韓国インフルエンサー200+キャンペーン運営。" },
      { n: "100+", label: "韓国トップクラス芸能人キャンペーン",   sub: "俳優、K-POP、歌手、放送人100+ — PPL、広告、コラボ。" },
    ],
  };

  // ═══════════════════════════════════════════════════════
  // COMMON CASE HIGHLIGHTS
  // ═══════════════════════════════════════════════════════
  type CaseItem = { type: string; num: string; brand: string; desc: string; cat: string };
  const ALL_CASES: Record<Lang, CaseItem[]> = {
    ko: [
      { type: "판매 성과",   num: "183억 원",        brand: "더후 × 댠댠",         desc: "한국 방문 3일간 4회 라이브, 단일 방송 기준 매출 183억 원",            cat: "m-amber" },
      { type: "판매 성과",   num: "4시간 전량 매진",  brand: "메디큐브 × 더우인",    desc: "더우인 라이브에서 1.2만개 기획세트 전량 소진",                         cat: "m-emerald" },
      { type: "마케팅 성과", num: "매출 50% 증가",    brand: "Dior × 지수",         desc: "BLACKPINK 지수 앰배서더 발탁 후 한국 매출 급증 — 연예인 캠페인 효과", cat: "m-azure" },
      { type: "연결 성과",   num: "2,000억 원",       brand: "왕홍 댠댠 한국 방문", desc: "3일간 K-뷰티 집중 판매 — 해외 왕홍과 한국 브랜드의 연결 규모",        cat: "m-coral" },
    ],
    en: [
      { type: "Sales",       num: "₩18.3B",           brand: "Whoo × Dandan",       desc: "4 lives over a 3-day Korea visit — ₩18.3B in single-broadcast revenue.", cat: "m-amber" },
      { type: "Sales",       num: "Sold out in 4hrs", brand: "Medicube × Douyin",   desc: "12,000 curated sets fully sold out on a Douyin live.",                    cat: "m-emerald" },
      { type: "Marketing",   num: "+50% revenue",     brand: "Dior × Jisoo",        desc: "Korea revenue surged after BLACKPINK Jisoo's ambassadorship — a celebrity campaign effect.", cat: "m-azure" },
      { type: "Connection",  num: "₩200B",            brand: "Dandan Korea Visit",  desc: "3-day total — the scale of connecting an overseas wanghong with Korean brands.", cat: "m-coral" },
    ],
    zh: [
      { type: "销售成果",     num: "183亿韩元",        brand: "后 × 丹丹",           desc: "访韩3天4场直播 — 单场销售额183亿韩元。",                              cat: "m-amber" },
      { type: "销售成果",     num: "4小时全部售罄",    brand: "Medicube × 抖音",     desc: "抖音直播1.2万套策划套装全部售罄。",                                  cat: "m-emerald" },
      { type: "营销成果",     num: "销售额增长50%",    brand: "Dior × 智秀",         desc: "BLACKPINK智秀任大使后韩国销售额激增 — 艺人营销效果。",                cat: "m-azure" },
      { type: "连接成果",     num: "10亿元人民币",     brand: "达人丹丹访韩",        desc: "3天K-Beauty集中销售 — 海外达人与韩国品牌连接的规模。",                cat: "m-coral" },
    ],
    ja: [
      { type: "販売成果",     num: "183億ウォン",      brand: "后 × ダンダン",       desc: "訪韓3日間4回ライブ — 単一放送基準で売上183億ウォン。",                cat: "m-amber" },
      { type: "販売成果",     num: "4時間で完売",      brand: "Medicube × 抖音",     desc: "抖音ライブで1.2万セットの企画セットが完売。",                         cat: "m-emerald" },
      { type: "マーケティング", num: "売上50%増加",     brand: "Dior × ジス",        desc: "BLACKPINKジスのアンバサダー就任後、韓国売上が急増 — 芸能人キャンペーン効果。", cat: "m-azure" },
      { type: "繋がり成果",   num: "2,000億ウォン",    brand: "KOLダンダン訪韓",     desc: "3日間のK-Beauty集中販売 — 海外KOLと韓国ブランドを繋いだ規模。",       cat: "m-coral" },
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
      ko: { 2: "검증된 셀러 후보 · 이력 · 레퍼런스 · 예상 견적을 함께 공유드립니다." },
      en: { 2: "Verified seller candidates — history, references, and quotes included." },
      zh: { 2: "经验证的卖家候选 · 履历 · 参考 · 报价一并提供。" },
      ja: { 2: "検証済みセラー候補・実績・レファレンス・見積を一括共有。" },
    },
    "korea-entry": {
      ko: { 1: "비대면 30분 · 한국 시장 진단 · 연예인/KOL 방향 · 채널/라이브 전략까지 정리합니다." },
      en: { 1: "30 min remote — Korea market diagnosis, celebrity/KOL direction, channel/live strategy." },
      zh: { 1: "线上30分钟 · 韩国市场诊断 · 艺人/KOL方向 · 渠道/直播策略梳理。" },
      ja: { 1: "オンライン30分 — 韓国市場診断・芸能人/KOL方向・チャネル/ライブ戦略を整理。" },
    },
    "overseas-entry": {
      ko: { 1: "비대면 30분 · 해외 시장 진단 · 왕홍/플랫폼 방향 · 통관/CS 전략까지 정리합니다." },
      en: { 1: "30 min remote — overseas market diagnosis, wanghong/platform direction, customs/CS strategy." },
      zh: { 1: "线上30分钟 · 海外市场诊断 · 达人/平台方向 · 通关/客服策略梳理。" },
      ja: { 1: "オンライン30分 — 海外市場診断・KOL/プラットフォーム方向・通関/CS戦略を整理。" },
    },
    "nlink": { ko: {}, en: {}, zh: {}, ja: {} },
  };

  // ═══════════════════════════════════════════════════════
  // WHY N-LIVE (4 pillars) — 공통
  // ═══════════════════════════════════════════════════════
  const WHY: Record<Lang, { eyebrow: string; title: string; lead: string; photoCaption: string; items: { t: string; d: string }[] }> = {
    ko: {
      eyebrow: "WHY N-LIVE · 왜 엔라이브인가",
      title: "한 팀이 실행합니다",
      lead: "외주 에이전시가 아닌, 실제로 현장에서 움직이는 실행팀입니다. 매칭부터 운영, 성과 후속까지 같은 사람이 책임지고 이어갑니다.",
      photoCaption: "엔라이브 실행팀",
      items: [
        { t: "필요한 파트너를 더 빠르게 찾습니다",      d: "검증된 풀에서 카테고리·예산·목표에 맞는 후보를 48시간 내 제안합니다. 시장 조사부터 시작할 필요가 없습니다." },
        { t: "중간 단계를 줄여 실행 속도를 높입니다",   d: "벤더·브로커를 거치지 않고 브랜드·셀러·플랫폼과 직접 매칭. 커뮤니케이션 한 단계가 줄어드는 만큼 빠르게 움직입니다." },
        { t: "연결에서 끝나지 않고 운영까지 이어집니다", d: "매칭 후 콘텐츠 기획·라이브 운영·통관·정산·CS까지 같은 팀이 수행합니다. 공을 넘기는 일이 없습니다." },
        { t: "한 번으로 끝나지 않습니다",               d: "성과 데이터를 기반으로 다음 캠페인·반복 협업·카테고리 확장을 함께 설계합니다. 첫 실행이 두 번째, 세 번째로 이어지는 구조." },
      ],
    },
    en: {
      eyebrow: "WHY N-LIVE",
      title: "One team executes everything",
      lead: "Not an outsourced agency — an execution team actually moving on the ground. The same people own matching, operations, and follow-through.",
      photoCaption: "The N-LIVE execution team",
      items: [
        { t: "Find the right partner, faster",        d: "We propose category, budget, and goal-fit candidates within 48 hours — you don't start from market research." },
        { t: "Fewer steps, faster execution",          d: "No vendors or brokers. We connect brands, sellers, and platforms directly — one less communication layer means we move quicker." },
        { t: "Connection isn't the finish line",       d: "The same team runs content, live ops, customs, settlement, and CS after matching. Nothing gets handed off." },
        { t: "Doesn't end with one campaign",           d: "Based on performance data, we co-design the next campaign, repeat collaborations, and category expansion. First execution becomes the second and third." },
      ],
    },
    zh: {
      eyebrow: "WHY N-LIVE · 为什么选恩联",
      title: "一个团队全程执行",
      lead: "不是外包代理,而是真正在现场运作的执行团队。从匹配到运营、成果跟进,由同一批人负责完成。",
      photoCaption: "恩联执行团队",
      items: [
        { t: "更快找到合适的合作伙伴",          d: "从经验证的资源池中,48小时内提供符合品类、预算与目标的候选 — 您不需要从市场调研开始。" },
        { t: "减少中间环节,提升执行速度",      d: "不经过供应商或经纪人,直接对接品牌、卖家、平台 — 少一层沟通,就能更快行动。" },
        { t: "不止于连接,还要负责运营",        d: "匹配后,同一个团队负责内容、直播、通关、结算、客服 — 没有任何交接。" },
        { t: "不是一次性合作",                   d: "基于成果数据,共同设计下一期活动、重复合作与品类扩展 — 第一次执行延续为第二次、第三次。" },
      ],
    },
    ja: {
      eyebrow: "WHY N-LIVE · なぜN-LIVEか",
      title: "1チームで実行します",
      lead: "外注エージェンシーではなく、実際に現場で動く実行チームです。マッチングから運営、成果のフォローまで、同じメンバーが責任を持って繋ぎます。",
      photoCaption: "N-LIVE実行チーム",
      items: [
        { t: "必要なパートナーをより早く見つけます",     d: "検証済みプールから、カテゴリ・予算・目標に合う候補を48時間以内にご提案。市場調査から始める必要はありません。" },
        { t: "中間ステップを減らし、実行速度を上げます", d: "ベンダー・ブローカーを介さず、ブランド・セラー・プラットフォームと直接マッチング。コミュニケーションが1段階減るぶん早く動けます。" },
        { t: "繋ぐだけで終わらず、運営まで続きます",     d: "マッチング後、コンテンツ・ライブ運営・通関・精算・CSまで同じチームが実行。引き継ぎはありません。" },
        { t: "1回で終わりません",                         d: "成果データに基づき、次のキャンペーン・反復コラボ・カテゴリ拡張を共同で設計。初回の実行が2回目、3回目に続く構造です。" },
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

  // 인터레스트 선택 시 해당 서비스 상세 페이지로 이동 (nlink는 제자리 + 스크롤)
  const selectInterest = (id: Interest) => {
    setInterest(id);
    const url = INTEREST_URL[id];
    if (url) {
      // 해당 서비스 상세 페이지로 이동
      window.location.href = url;
    } else {
      // nlink: Coming Soon — 현재 섹션 유지
      setTimeout(() => {
        document.querySelector("#interest")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
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
  const NET_LABELS: Record<Lang, string> = { ko: "WHAT WE CONNECT · 엔라이브가 연결하는 실행", en: "WHAT WE CONNECT", zh: "恩联连接的实行", ja: "WHAT WE CONNECT · N-LIVEが繋ぐ実行" };
  const NET_TITLE: Record<Lang, string> = { ko: "이런 연결이 가능합니다", en: "These are the connections we enable", zh: "我们能实现的连接", ja: "こうした繋がりが可能です" };
  const CASES_LABELS: Record<Lang, string> = { ko: "RESULTS · 엔라이브가 만드는 결과", en: "RESULTS", zh: "我们创造的结果", ja: "RESULTS · N-LIVEが生む結果" };
  const CASES_TITLE: Record<Lang, string> = { ko: "판매 · 마케팅 · 연결에서 실제로 나온 결과", en: "Actual outcomes across sales, marketing, and connections", zh: "销售 · 营销 · 连接中实际产生的结果", ja: "販売 · マーケティング · 繋がりから生まれた実際の結果" };
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
    ko: { h: "맞춤 협업 가능성, 30분이면 정리됩니다.", sub: "지금 상황과 목표를 알려주시면 — 브랜드 매칭·셀러 매칭·캠페인·라이브 중 실행 가능한 옵션을 미팅에서 정리드립니다. 첫 미팅 무료.", btn: "맞춤 협업 가능성 확인하기 →" },
    en: { h: "See what's possible — in one 30-min meeting.", sub: "Tell us your situation and goals. We'll map out which options — brand/seller matching, campaigns, live — are actually executable. First meeting free.", btn: "Check custom collaboration fit →" },
    zh: { h: "30分钟梳理,您的合作可行性一次看清。", sub: "告诉我们现在的情况与目标 — 我们在会议中整理品牌匹配、卖家匹配、营销、直播中实际可行的方案。首次会议免费。", btn: "确认定制合作可能性 →" },
    ja: { h: "カスタム協業の可能性、30分で整理します。", sub: "現状と目標をお知らせいただければ、ブランド/セラーマッチング・キャンペーン・ライブのうち実行可能なオプションをミーティングで整理します。初回無料。", btn: "カスタム協業の可能性を確認する →" },
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
          <div className="interest-grid interest-grid-main">
            {(["sourcing", "matching", "korea-entry", "overseas-entry"] as Interest[]).map((id) => {
              const c = interestCards[id];
              const isActive = interest === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={`interest-card interest-card-big ${isActive ? "active" : ""}`}
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

          {/* 5번째 — 하단 와이드 바 (NLINK COMING SOON) */}
          <button
            type="button"
            className={`interest-card-wide ${interest === "nlink" ? "active" : ""}`}
            data-interest="nlink"
            onClick={() => selectInterest("nlink")}
          >
            <div className="icw-left">
              <div className="icw-tag">{interestCards["nlink"].tag}</div>
              <h3>{interestCards["nlink"].title}</h3>
            </div>
            <div className="icw-mid">
              <p>{interestCards["nlink"].desc}</p>
            </div>
            <div className="icw-right">
              <span className="icw-cta">{interestCards["nlink"].cta}</span>
            </div>
          </button>
        </div>
      </section>

      {/* WHY N-LIVE */}
      <section id="why" className={`why-section ${interest === "sourcing" ? "highlight" : ""}`}>
        <div className="container">
          <div className="section-eyebrow">— {WHY_LABELS[lang]}</div>
          <h2 className="section-title">{why.title}</h2>
          <p className="why-lead">{why.lead}</p>

          <div className="why-photo image-placeholder tall">
            <div className="ip-tag">TEAM PHOTO</div>
            <div className="ip-caption">{why.photoCaption}</div>
          </div>

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
      <section id="network" className={`metrics topo-bg section-grain ${interest === "matching" || interest === "korea-entry" ? "highlight" : ""}`}>
        <div className="container">
          <div className="metrics-eyebrow">— {NET_LABELS[lang]}</div>
          <h2 className="metrics-title">{NET_TITLE[lang]}</h2>
          <div className="metrics-grid">
            {orderedMetrics.map((m, i) => (
              <div className={`metric-card ${["m-amber", "m-emerald", "m-azure", "m-coral"][metricOrder[i]]} ${i === 0 && interest ? "metric-priority" : ""}`} key={metricOrder[i]}>
                <div className="metric-label metric-label-hero">{m.label}</div>
                <div className="metric-sub">{m.sub}</div>
                <div className="metric-badge">{m.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="case-highlights">
        <div className="container">
          <div className="section-eyebrow">— {CASES_LABELS[lang]}</div>
          <h2 className="cases-title">{CASES_TITLE[lang]}</h2>
          <div className="case-row">
            {orderedCases.map((c, i) => (
              <div className={`case-pill ${c.cat} ${i === 0 && interest ? "case-priority" : ""}`} key={caseOrder[i]}>
                <div className="case-type">{c.type}</div>
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
      <section id="process" className={`process-section ${interest === "korea-entry" || interest === "overseas-entry" ? "highlight" : ""}`}>
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
