"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/components/LangContext";
import Marquee from "@/components/Marquee";
import MeteorBackground from "@/components/MeteorBackground";
import type { Lang } from "@/lib/i18n";

type Role = "korean-brand" | "korean-seller" | "overseas-brand" | "overseas-seller";

/* ────────────────────────────────────────────────────────
   ROLE-BASED FUNNEL: 역할 선택 후 모든 섹션이 해당 역할에
   맞는 정보만 우선 노출, 불필요한 정보는 숨기거나 축소
   ──────────────────────────────────────────────────────── */

export default function HomePage() {
  const { t, lang } = useLang();
  const [activeTag, setActiveTag] = useState<number | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [showSelector, setShowSelector] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selectRole = (r: Role) => {
    setFadeOut(true);
    setTimeout(() => {
      setRole(r);
      setShowSelector(false);
      setFadeOut(false);
    }, 650);
  };

  const changeRole = () => {
    setShowSelector(true);
    setRole(null);
    setActiveTag(null);
  };

  // ═══════════════════════════════════════════════════════
  // ROLE-SPECIFIC HERO
  // ═══════════════════════════════════════════════════════
  const ROLE_HERO: Record<Role, Record<Lang, { title1: string; title2: string; sub: string; cta1: string; cta2: string }>> = {
    "korean-brand": {
      ko: { title1: "왕홍 매칭부터 채널 운영, 라이브, 통관까지", title2: "중국 시장의 모든 루트를 연결합니다", sub: "왕홍 500+ 매칭 · 더우인/샤오홍슈/타오바오 채널 운영 · 라이브 실행 · 통관/인증/CS · 콘텐츠 현지화 · 셀러 역공급까지 — 한 팀이 실행합니다.", cta1: "우리 브랜드에 맞는 옵션 찾기 →", cta2: "전체 서비스 한눈에 보기" },
      en: { title1: "KOL matching, channel ops, live, customs", title2: "every route to the China market", sub: "500+ KOL matching · Douyin/Xiaohongshu/Taobao channel ops · live execution · customs/certification/CS · content localization · seller supply — one team does it all.", cta1: "Find the right options for us →", cta2: "See all services at a glance" },
      zh: { title1: "达人匹配、渠道运营、直播、通关", title2: "连接中国市场的所有通路", sub: "500+达人匹配 · 抖音/小红书/淘宝渠道运营 · 直播执行 · 通关/认证/客服 · 内容本地化 · 卖家供货 — 一个团队全程执行。", cta1: "找到适合我们品牌的方案 →", cta2: "一览全部服务" },
      ja: { title1: "KOLマッチングからチャネル運営、ライブ、通関まで", title2: "中国市場のすべてのルートを繋ぎます", sub: "500+KOLマッチング · 抖音/小紅書/淘宝チャネル運営 · ライブ実行 · 通関/認証/CS · コンテンツ現地化 · セラー供給 — ワンチームで実行。", cta1: "自社に合うオプションを探す →", cta2: "全サービスを一覧で見る" },
    },
    "korean-seller": {
      ko: { title1: "브랜드 소싱, 왕홍 콜라보, 해외 확장, 광고 협업", title2: "당신의 채널을 성장시킬 모든 옵션", sub: "해외 브랜드 직공급 · 왕홍 콜라보 라이브 · 해외 채널 확장 · 브랜디드 광고 수주 · 물류/정산 · 연예인 게스트 — 셀러 수익 다변화를 위한 모든 루트.", cta1: "내 채널에 맞는 옵션 찾기 →", cta2: "공급 가능 브랜드 보기" },
      en: { title1: "Brand sourcing, KOL collabs, overseas expansion", title2: "every option to grow your channel", sub: "Direct brand supply · KOL collab lives · overseas channel expansion · branded ad deals · logistics/settlement · celebrity guests — every route for seller growth.", cta1: "Find options for my channel →", cta2: "See available brands" },
      zh: { title1: "品牌货源、达人联名、海外扩张、广告合作", title2: "助您频道成长的所有选项", sub: "海外品牌直供 · 达人联名直播 · 海外渠道扩展 · 品牌广告合作 · 物流/结算 · 艺人嘉宾 — 卖家收益多元化的所有通路。", cta1: "查找适合我频道的方案 →", cta2: "查看可供品牌" },
      ja: { title1: "ブランドソーシング、KOLコラボ、海外展開、広告協業", title2: "あなたのチャネルを成長させるすべてのオプション", sub: "海外ブランド直供給 · KOLコラボライブ · 海外チャネル拡張 · ブランド広告 · 物流/精算 · 芸能人ゲスト — セラー収益多角化のすべて。", cta1: "自分のチャネルに合うオプションを探す →", cta2: "供給可能ブランドを見る" },
    },
    "overseas-brand": {
      ko: { title1: "제품 소싱, 셀러 위탁, 연예인 마케팅, 라이브 진출", title2: "한국 시장의 모든 자원을 연결합니다", sub: "K-Beauty/K-Fashion 소싱 · 한국 셀러 판매 위탁 · 연예인 100+/KOL 200+ 마케팅 · 라이브 플랫폼 진출 · 드라마 PPL · 현지 파트너 — 원스톱 실행.", cta1: "우리에게 맞는 한국 진출 옵션 찾기 →", cta2: "K-브랜드 소싱 리스트 요청" },
      en: { title1: "Product sourcing, seller delegation, celebrity marketing", title2: "every resource in the Korean market", sub: "K-Beauty/K-Fashion sourcing · Korean seller delegation · 100+ celebrity/200+ KOL marketing · live platform entry · drama PPL · local partners — all-in-one.", cta1: "Find Korea entry options for us →", cta2: "Request K-brand sourcing list" },
      zh: { title1: "产品采购、卖家代销、艺人营销、直播进驻", title2: "连接韩国市场的所有资源", sub: "K-Beauty/K-Fashion采购 · 韩国卖家代销 · 100+艺人/200+KOL营销 · 直播平台进驻 · 电视剧PPL · 本地合作伙伴 — 一站式执行。", cta1: "找到适合我们的韩国进入方案 →", cta2: "请求K-品牌采购清单" },
      ja: { title1: "商品ソーシング、セラー委託、芸能人マーケティング", title2: "韓国市場のすべてのリソースを繋ぎます", sub: "K-Beauty/K-Fashionソーシング · 韓国セラー販売委託 · 100+芸能人/200+KOLマーケティング · ライブ進出 · ドラマPPL · 現地パートナー — ワンストップ。", cta1: "韓国進出オプションを探す →", cta2: "K-ブランドソーシングリスト請求" },
    },
    "overseas-seller": {
      ko: { title1: "K-브랜드 직공급, 셀러 콜라보, 연예인 게스트, 서울 촬영", title2: "한국에서 가능한 모든 협업을 연결합니다", sub: "K-Beauty/K-Fashion 직공급 · 한국 셀러 콜라보 · 연예인/인플루언서 게스트 · 서울 촬영 · 광고/캠페인 수주 · 물류 — 원스톱 지원.", cta1: "나에게 맞는 협업 옵션 찾기 →", cta2: "K-브랜드 직공급 리스트 요청" },
      en: { title1: "K-brand supply, seller collabs, celebrity guests, Seoul filming", title2: "every collaboration possible in Korea", sub: "K-Beauty/K-Fashion direct supply · Korean seller collabs · celebrity/influencer guests · Seoul filming · ad/campaign deals · logistics — all-in-one.", cta1: "Find collaboration options for me →", cta2: "Request K-brand supply list" },
      zh: { title1: "K-品牌直供、卖家联名、艺人嘉宾、首尔拍摄", title2: "连接在韩国可能的所有合作", sub: "K-Beauty/K-Fashion直供 · 韩国卖家联名 · 艺人/达人嘉宾 · 首尔拍摄 · 广告/营销合作 · 物流 — 一站式支持。", cta1: "查找适合我的合作方案 →", cta2: "请求K-品牌直供清单" },
      ja: { title1: "K-ブランド直供給、セラーコラボ、芸能人ゲスト、ソウル撮影", title2: "韓国で可能なすべてのコラボを繋ぎます", sub: "K-Beauty/K-Fashion直供給 · 韓国セラーコラボ · 芸能人/インフルエンサーゲスト · ソウル撮影 · 広告/キャンペーン · 物流 — ワンストップ。", cta1: "自分に合うコラボオプションを探す →", cta2: "K-ブランド直供給リスト請求" },
    },
  };

  // Role → detail page link
  const ROLE_DETAIL: Record<Role, string> = {
    "korean-brand": "/for-korean-brands",
    "korean-seller": "/for-korean-sellers",
    "overseas-brand": "/for-overseas-brands",
    "overseas-seller": "/for-overseas-sellers",
  };

  // ═══════════════════════════════════════════════════════
  // ROLE SELECTOR CARDS (trilingual)
  // ═══════════════════════════════════════════════════════
  const ROLE_CARDS: Record<Role, { ko: string; en: string; zh: string; tag: string }> = {
    "korean-brand":   { ko: "한국 브랜드",           en: "Korean Brand",              zh: "韩国品牌",     tag: "BRAND → CHINA" },
    "korean-seller":  { ko: "한국 셀러 · 인플루언서", en: "Korean Seller · Influencer", zh: "韩国卖家 · 达人", tag: "SELLER × KOL" },
    "overseas-brand": { ko: "해외 브랜드",           en: "Global Brand",              zh: "海外品牌",     tag: "BRAND → KOREA" },
    "overseas-seller":{ ko: "해외 셀러 · 왕홍",      en: "Global Seller · KOL",       zh: "海外卖家 · 达人", tag: "K-SUPPLY" },
  };

  // ═══════════════════════════════════════════════════════
  // ROLE-SPECIFIC METRICS (each role sees only 2 relevant)
  // ═══════════════════════════════════════════════════════
  type MetricItem = { n: string; label: string; sub: string };
  const ALL_METRICS: Record<Lang, MetricItem[]> = {
    ko: [
      { n: "150+", label: "검증 협력 브랜드", sub: "K-Beauty·K-Fashion·잡화·헬스 등" },
      { n: "500+", label: "한·중 라이브커머스 셀러", sub: "검증된 라이브 운영 셀러 풀" },
      { n: "200+", label: "한국 유명 인플루언서", sub: "메가 KOL부터 마이크로까지 전 등급" },
      { n: "100+", label: "한국 정상급 연예인", sub: "배우·K-POP·가수·방송인" },
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

  // Which metric indices are relevant per role (indices: 0=brands, 1=sellers, 2=influencers, 3=celebrities)
  const ROLE_METRIC_IDX: Record<Role, number[]> = {
    "korean-brand": [1, 2],       // 셀러(판매), 인플루언서(KOL) — 이들이 내 상품을 팔아준다
    "korean-seller": [0, 1],      // 브랜드(소싱), 셀러(네트워크)
    "overseas-brand": [2, 3],     // 인플루언서, 연예인 — 한국 시장 영향력
    "overseas-seller": [0, 3],    // 브랜드(K-제품 소싱), 연예인(게스트)
  };

  // ═══════════════════════════════════════════════════════
  // ROLE-SPECIFIC CASE HIGHLIGHTS
  // ═══════════════════════════════════════════════════════
  type CaseItem = { num: string; brand: string; desc: string; cat: string };
  const ALL_CASES: Record<Lang, CaseItem[]> = {
    ko: [
      { num: "183억 원", brand: "더후 × 댠댠", desc: "단일 라이브 매출 — 한국 방문 3일, 4회 라이브", cat: "m-amber" },
      { num: "4시간 전량 매진", brand: "메디큐브", desc: "더우인 라이브에서 1.2만개 기획세트 전량 소진", cat: "m-emerald" },
      { num: "매출 50% 증가", brand: "Dior × 지수", desc: "BLACKPINK 지수 앰배서더 발탁 후 한국 매출 급증", cat: "m-azure" },
      { num: "2,000억 원", brand: "왕홍 댠댠 한국 방문", desc: "3일간 총 매출 — K-뷰티 집중 판매", cat: "m-coral" },
    ],
    en: [
      { num: "₩18.3B", brand: "Whoo × Dandan", desc: "Single live revenue — 3-day Korea visit, 4 broadcasts", cat: "m-amber" },
      { num: "Sold out in 4hrs", brand: "Medicube", desc: "12,000 curated sets sold out on Douyin live", cat: "m-emerald" },
      { num: "+50% revenue", brand: "Dior × Jisoo", desc: "Korea revenue surged after BLACKPINK Jisoo ambassadorship", cat: "m-azure" },
      { num: "₩200B", brand: "Dandan Korea Visit", desc: "3-day total — focused K-Beauty sales", cat: "m-coral" },
    ],
    zh: [
      { num: "183亿韩元", brand: "后 × 丹丹", desc: "单场直播销售额 — 访韩3天4场直播", cat: "m-amber" },
      { num: "4小时全部售罄", brand: "Medicube", desc: "抖音直播1.2万套策划套装全部售罄", cat: "m-emerald" },
      { num: "销售额增长50%", brand: "Dior × 智秀", desc: "BLACKPINK智秀任大使后韩国销售额激增", cat: "m-azure" },
      { num: "10亿元人民币", brand: "达人丹丹访韩", desc: "3天总销售额 — K-Beauty集中销售", cat: "m-coral" },
    ],
    ja: [
      { num: "183億ウォン", brand: "后 × ダンダン", desc: "単一ライブ売上 — 訪韓3日間4回ライブ", cat: "m-amber" },
      { num: "4時間で完売", brand: "Medicube", desc: "抖音ライブで1.2万セット完売", cat: "m-emerald" },
      { num: "売上50%増加", brand: "Dior × ジス", desc: "BLACKPINKジスアンバサダー就任後、韓国売上急増", cat: "m-azure" },
      { num: "2,000億ウォン", brand: "KOLダンダン訪韓", desc: "3日間の総売上 — K-Beauty集中販売", cat: "m-coral" },
    ],
  };

  // Cases: 0=더후×댠댠(중국라이브), 1=메디큐브(더우인), 2=Dior×지수(연예인), 3=댠댠방문(왕홍소싱)
  const ROLE_CASE_IDX: Record<Role, number[]> = {
    "korean-brand": [0, 1],       // 중국 라이브 판매 성과
    "korean-seller": [0, 1],      // 라이브 판매, 매진 사례
    "overseas-brand": [2, 0],     // 연예인 캠페인 + 라이브 매출
    "overseas-seller": [3, 0],    // K-뷰티 소싱 + 왕홍 실적
  };

  // ═══════════════════════════════════════════════════════
  // ROLE-SPECIFIC PROCESS STEPS
  // ═══════════════════════════════════════════════════════
  type StepItem = { n: string; t: string; d: string };
  const ROLE_STEPS: Record<Role, Record<Lang, StepItem[]>> = {
    "korean-brand": {
      ko: [
        { n: "01", t: "문의 접수", d: "브랜드 카테고리 · 목표 · 예산 → 48시간 이내 전담 매니저 회신" },
        { n: "02", t: "무료 컨셉 미팅", d: "비대면 30분 · 중국 시장 진단 · 타겟 플랫폼 · 왕홍 전략 제안" },
        { n: "03", t: "왕홍 매칭 · 제안서", d: "검증된 왕홍 후보 리스트 · 플랫폼 전략 · 예상 GMV · 견적" },
        { n: "04", t: "중국 라이브 실행", d: "더우인/샤오홍슈/타오바오 라이브 운영 · 통관 · 정산 · CS 원스톱" },
        { n: "05", t: "성과 리포트", d: "왕홍별 GMV · 플랫폼별 전환율 · 다음 캠페인 로드맵" },
      ],
      en: [
        { n: "01", t: "Inquiry", d: "Brand category · goals · budget → dedicated manager reply within 48hrs" },
        { n: "02", t: "Free Concept Meeting", d: "30min remote · China market diagnosis · target platform · KOL strategy" },
        { n: "03", t: "KOL Matching & Proposal", d: "Verified KOL candidates · platform strategy · projected GMV · quote" },
        { n: "04", t: "China Live Execution", d: "Douyin/Xiaohongshu/Taobao live ops · customs · settlement · CS" },
        { n: "05", t: "Performance Report", d: "Per-KOL GMV · per-platform conversion · next campaign roadmap" },
      ],
      zh: [
        { n: "01", t: "咨询受理", d: "品牌品类·目标·预算 → 48小时内专属经理回复" },
        { n: "02", t: "免费概念会议", d: "线上30分钟 · 中国市场诊断 · 目标平台 · 达人策略" },
        { n: "03", t: "达人匹配·方案", d: "经验证达人候选 · 平台策略 · 预期GMV · 报价" },
        { n: "04", t: "中国直播执行", d: "抖音/小红书/淘宝直播运营 · 通关 · 结算 · 客服" },
        { n: "05", t: "成果报告", d: "达人别GMV · 平台别转化率 · 下一期路线图" },
      ],
      ja: [
        { n: "01", t: "問い合わせ", d: "ブランドカテゴリ・目標・予算 → 48時間以内に専任マネージャー返信" },
        { n: "02", t: "無料コンセプトMTG", d: "オンライン30分 · 中国市場診断 · ターゲットプラットフォーム · KOL戦略" },
        { n: "03", t: "KOLマッチング・提案書", d: "検証済みKOL候補 · プラットフォーム戦略 · 予想GMV · 見積" },
        { n: "04", t: "中国ライブ実行", d: "抖音/小紅書/淘宝ライブ運営 · 通関 · 精算 · CS" },
        { n: "05", t: "成果レポート", d: "KOL別GMV · プラットフォーム別転換率 · 次期ロードマップ" },
      ],
    },
    "korean-seller": {
      ko: [
        { n: "01", t: "문의 접수", d: "취급 카테고리 · 판매 채널 · 희망 브랜드군 → 48시간 이내 회신" },
        { n: "02", t: "무료 컨셉 미팅", d: "비대면 30분 · 공급 가능 브랜드 · 콜라보 기회 · 수익 구조 설명" },
        { n: "03", t: "브랜드 매칭 · 제안서", d: "카테고리 적합 브랜드 리스트 · 왕홍 콜라보 기획 · 공급 조건" },
        { n: "04", t: "콜라보 라이브 실행", d: "왕홍 콜라보 기획 · 한중 콘텐츠 제작 · 물류 · 크로스보더 정산" },
        { n: "05", t: "성과 공유", d: "판매 데이터 · 브랜드 피드백 · 추가 공급 및 확장 제안" },
      ],
      en: [
        { n: "01", t: "Inquiry", d: "Category · sales channel · target brands → reply within 48hrs" },
        { n: "02", t: "Free Concept Meeting", d: "30min remote · available brands · collab opportunities · revenue structure" },
        { n: "03", t: "Brand Matching & Proposal", d: "Category-fit brand list · KOL collab plan · supply terms" },
        { n: "04", t: "Collab Live Execution", d: "KOL collab planning · KR-CN content · logistics · cross-border settlement" },
        { n: "05", t: "Performance Sharing", d: "Sales data · brand feedback · expansion proposals" },
      ],
      zh: [
        { n: "01", t: "咨询受理", d: "品类·销售渠道·目标品牌 → 48小时内回复" },
        { n: "02", t: "免费概念会议", d: "线上30分钟 · 可供品牌 · 联名机会 · 收益结构" },
        { n: "03", t: "品牌匹配·方案", d: "品类适配品牌清单 · 达人联名企划 · 供货条件" },
        { n: "04", t: "联名直播执行", d: "达人联名企划 · 中韩内容制作 · 物流 · 跨境结算" },
        { n: "05", t: "成果共享", d: "销售数据 · 品牌反馈 · 扩展提案" },
      ],
      ja: [
        { n: "01", t: "問い合わせ", d: "カテゴリ · 販売チャネル · 希望ブランド → 48時間以内返信" },
        { n: "02", t: "無料コンセプトMTG", d: "オンライン30分 · 供給可能ブランド · コラボ機会 · 収益構造" },
        { n: "03", t: "ブランドマッチング・提案書", d: "カテゴリ適合ブランドリスト · KOLコラボ企画 · 供給条件" },
        { n: "04", t: "コラボライブ実行", d: "KOLコラボ企画 · 韓中コンテンツ · 物流 · クロスボーダー精算" },
        { n: "05", t: "成果共有", d: "販売データ · ブランドフィードバック · 拡張提案" },
      ],
    },
    "overseas-brand": {
      ko: [
        { n: "01", t: "문의 접수", d: "브랜드 · 한국 진출 목표 · 희망 채널(연예인/KOL/라이브) → 48시간 회신" },
        { n: "02", t: "무료 컨셉 미팅", d: "비대면 30분 · 한국 시장 진단 · 셀러브리티/KOL 후보 방향 제안" },
        { n: "03", t: "연예인·KOL 매칭 제안서", d: "연예인/KOL 후보 리스트 · 캠페인 옵션(협찬~PPL) · 예상 효과 · 견적" },
        { n: "04", t: "한국 캠페인 실행", d: "연예인 섭외 → 콘텐츠/라이브 제작 → 한국 플랫폼 운영" },
        { n: "05", t: "성과 리포트", d: "캠페인 노출 · 매출 · 브랜드 인지 변화 · 다음 단계 로드맵" },
      ],
      en: [
        { n: "01", t: "Inquiry", d: "Brand · Korea entry goals · preferred channel (celebrity/KOL/live) → 48hr reply" },
        { n: "02", t: "Free Concept Meeting", d: "30min remote · Korea market diagnosis · celebrity/KOL candidate direction" },
        { n: "03", t: "Celebrity & KOL Proposal", d: "Talent candidates · campaign options (sponsorship~PPL) · projected impact · quote" },
        { n: "04", t: "Korea Campaign Execution", d: "Talent booking → content/live production → Korean platform ops" },
        { n: "05", t: "Performance Report", d: "Campaign reach · revenue · brand awareness shift · next-stage roadmap" },
      ],
      zh: [
        { n: "01", t: "咨询受理", d: "品牌·韩国市场目标·希望渠道(艺人/KOL/直播) → 48小时回复" },
        { n: "02", t: "免费概念会议", d: "线上30分钟 · 韩国市场诊断 · 艺人/KOL候选方向" },
        { n: "03", t: "艺人·KOL匹配方案", d: "艺人/KOL候选 · 营销选项(置换~PPL) · 预期效果 · 报价" },
        { n: "04", t: "韩国营销执行", d: "艺人邀约 → 内容/直播制作 → 韩国平台运营" },
        { n: "05", t: "成果报告", d: "营销曝光 · 销售额 · 品牌认知变化 · 下阶段路线图" },
      ],
      ja: [
        { n: "01", t: "問い合わせ", d: "ブランド · 韓国進出目標 · 希望チャネル(芸能人/KOL/ライブ) → 48時間返信" },
        { n: "02", t: "無料コンセプトMTG", d: "オンライン30分 · 韓国市場診断 · 芸能人/KOL候補の方向提案" },
        { n: "03", t: "芸能人・KOL提案書", d: "タレント候補 · キャンペーンオプション(協賛～PPL) · 予想効果 · 見積" },
        { n: "04", t: "韓国キャンペーン実行", d: "タレントブッキング → コンテンツ/ライブ制作 → 韓国プラットフォーム運営" },
        { n: "05", t: "成果レポート", d: "キャンペーンリーチ · 売上 · ブランド認知変化 · 次段階ロードマップ" },
      ],
    },
    "overseas-seller": {
      ko: [
        { n: "01", t: "문의 접수", d: "관심 카테고리 · 채널 · 팔로워 규모 · 라이브 여부 → 48시간 회신" },
        { n: "02", t: "무료 컨셉 미팅", d: "비대면 30분 · 공급 가능 K-브랜드 소개 · 한국 촬영 가능 여부 확인" },
        { n: "03", t: "브랜드 직공급 제안서", d: "K-뷰티/패션 직공급 브랜드 리스트 · 샘플 · 가격 · 물류 조건" },
        { n: "04", t: "한국 현지 지원 실행", d: "한국 브랜드 직공급 → 현지 촬영 지원 → 연예인 게스트 연결" },
        { n: "05", t: "성과 · 재공급", d: "판매 데이터 · 재공급 스케줄 · 추가 브랜드 확장" },
      ],
      en: [
        { n: "01", t: "Inquiry", d: "Category · channel · follower size · live status → reply within 48hrs" },
        { n: "02", t: "Free Concept Meeting", d: "30min remote · available K-brands · Korea filming support options" },
        { n: "03", t: "Direct Supply Proposal", d: "K-Beauty/Fashion brand list · samples · pricing · logistics terms" },
        { n: "04", t: "Korea Support Execution", d: "K-brand direct supply → on-site filming → celebrity guest matching" },
        { n: "05", t: "Results & Resupply", d: "Sales data · resupply schedule · brand expansion" },
      ],
      zh: [
        { n: "01", t: "咨询受理", d: "关注品类·渠道·粉丝规模·是否直播 → 48小时回复" },
        { n: "02", t: "免费概念会议", d: "线上30分钟 · 可供K-品牌介绍 · 韩国拍摄支持确认" },
        { n: "03", t: "直供方案", d: "K-Beauty/Fashion品牌清单 · 样品 · 价格 · 物流条件" },
        { n: "04", t: "韩国本地支持", d: "K-品牌直供 → 韩国本地拍摄 → 艺人嘉宾对接" },
        { n: "05", t: "成果·复购", d: "销售数据 · 复购计划 · 品牌扩展" },
      ],
      ja: [
        { n: "01", t: "問い合わせ", d: "関心カテゴリ · チャネル · フォロワー規模 · ライブ有無 → 48時間返信" },
        { n: "02", t: "無料コンセプトMTG", d: "オンライン30分 · 供給可能K-ブランド紹介 · 韓国撮影サポート確認" },
        { n: "03", t: "直供給提案書", d: "K-Beauty/Fashionブランドリスト · サンプル · 価格 · 物流条件" },
        { n: "04", t: "韓国現地サポート実行", d: "K-ブランド直供給 → 現地撮影サポート → 芸能人ゲスト連結" },
        { n: "05", t: "成果・再供給", d: "販売データ · 再供給スケジュール · ブランド拡張" },
      ],
    },
  };

  // ═══════════════════════════════════════════════════════
  // ROLE-SPECIFIC FINAL CTA
  // ═══════════════════════════════════════════════════════
  const ROLE_FINAL_CTA: Record<Role, Record<Lang, { h: string; sub: string; btn1: string; btn2: string }>> = {
    "korean-brand": {
      ko: { h: "중국 시장, 어떤 루트든 지금 시작하세요", sub: "왕홍 매칭, 채널 운영, 라이브 실행, 통관/CS, 콘텐츠 현지화 — 필요한 옵션만 골라 시작할 수 있습니다. 첫 미팅 무료.", btn1: "우리 브랜드에 맞는 왕홍 후보 보기 →", btn2: "중국 시장 무료 전략 미팅 예약 →" },
      en: { h: "China market — start any route now", sub: "KOL matching, channel ops, live execution, customs/CS, content — pick what you need. First meeting free.", btn1: "See KOL candidates for our brand →", btn2: "Book free China strategy meeting →" },
      zh: { h: "中国市场，现在就开始任何通路", sub: "达人匹配、渠道运营、直播执行、通关/客服、内容 — 选择您需要的即可开始。首次会议免费。", btn1: "查看适合我们品牌的达人候选 →", btn2: "预约免费中国市场战略会议 →" },
      ja: { h: "中国市場、どのルートでも今すぐ開始", sub: "KOLマッチング、チャネル運営、ライブ実行、通関/CS、コンテンツ — 必要なオプションだけ選んで開始。初回MTG無料。", btn1: "自社に合うKOL候補を見る →", btn2: "中国市場無料戦略MTG予約 →" },
    },
    "korean-seller": {
      ko: { h: "브랜드 소싱부터 해외 확장까지, 지금 시작하세요", sub: "직공급 브랜드, 왕홍 콜라보, 해외 채널, 광고 협업, 운영 지원 — 필요한 옵션을 골라 시작하세요. 첫 미팅 무료.", btn1: "내 채널에 맞는 공급 브랜드 보기 →", btn2: "셀러 전용 무료 미팅 예약 →" },
      en: { h: "From brand sourcing to overseas expansion — start now", sub: "Direct supply, KOL collabs, overseas channels, ad deals, ops support — pick what you need. First meeting free.", btn1: "See supply brands for my channel →", btn2: "Book free seller meeting →" },
      zh: { h: "从品牌货源到海外扩展，现在就开始", sub: "直供品牌、达人联名、海外渠道、广告合作、运营支持 — 选择所需即可开始。首次会议免费。", btn1: "查看适合我频道的供货品牌 →", btn2: "预约卖家专属免费会议 →" },
      ja: { h: "ブランドソーシングから海外展開まで、今始めましょう", sub: "直供給、KOLコラボ、海外チャネル、広告協業、運営サポート — 必要なものを選んで開始。初回MTG無料。", btn1: "自分のチャネルに合う供給ブランドを見る →", btn2: "セラー専用無料MTG予約 →" },
    },
    "overseas-brand": {
      ko: { h: "한국 시장 진출, 어떤 방식이든 지금 시작하세요", sub: "제품 소싱, 셀러 위탁, 연예인 마케팅, 라이브 진출, 드라마 PPL — 필요한 옵션만 골라 시작할 수 있습니다. 첫 미팅 무료.", btn1: "우리에게 맞는 한국 진출 옵션 찾기 →", btn2: "K-브랜드 소싱 리스트 요청 →" },
      en: { h: "Korea market entry — any approach, start now", sub: "Product sourcing, seller delegation, celebrity marketing, live entry, drama PPL — pick what you need. First meeting free.", btn1: "Find Korea entry options for us →", btn2: "Request K-brand sourcing list →" },
      zh: { h: "韩国市场进入，任何方式现在就开始", sub: "产品采购、卖家代销、艺人营销、直播进驻、电视剧PPL — 选择所需即可开始。首次会议免费。", btn1: "找到适合我们的韩国进入方案 →", btn2: "请求K-品牌采购清单 →" },
      ja: { h: "韓国市場進出、どの方法でも今すぐ開始", sub: "商品ソーシング、セラー委託、芸能人マーケティング、ライブ進出、ドラマPPL — 必要なオプションだけ選んで開始。初回MTG無料。", btn1: "韓国進出オプションを探す →", btn2: "K-ブランドソーシングリスト請求 →" },
    },
    "overseas-seller": {
      ko: { h: "한국에서 가능한 모든 협업, 지금 시작하세요", sub: "K-브랜드 직공급, 셀러 콜라보, 연예인 게스트, 서울 촬영, 광고 수주 — 필요한 옵션을 골라 시작하세요. 첫 미팅 무료.", btn1: "K-브랜드 직공급 리스트 요청 →", btn2: "나에게 맞는 협업 옵션 찾기 →" },
      en: { h: "Every collaboration in Korea — start now", sub: "K-brand supply, seller collabs, celebrity guests, Seoul filming, ad deals — pick what you need. First meeting free.", btn1: "Request K-brand supply list →", btn2: "Find collaboration options for me →" },
      zh: { h: "在韩国可能的所有合作，现在就开始", sub: "K-品牌直供、卖家联名、艺人嘉宾、首尔拍摄、广告合作 — 选择所需即可开始。首次会议免费。", btn1: "请求K-品牌直供清单 →", btn2: "查找适合我的合作方案 →" },
      ja: { h: "韓国で可能なすべてのコラボ、今すぐ開始", sub: "K-ブランド直供給、セラーコラボ、芸能人ゲスト、ソウル撮影、広告受注 — 必要なものを選んで開始。初回MTG無料。", btn1: "K-ブランド直供給リスト請求 →", btn2: "自分に合うコラボオプションを探す →" },
    },
  };

  // ═══════════════════════════════════════════════════════
  // ROLE-SPECIFIC SERVICE FEATURES (audience 보충)
  // ═══════════════════════════════════════════════════════
  type ServiceFeature = { icon: string; t: string; d: string };
  const ROLE_FEATURES: Record<Role, Record<Lang, ServiceFeature[]>> = {
    "korean-brand": {
      ko: [
        { icon: "01", t: "왕홍 500+ 풀 매칭", d: "카테고리·예산·목표에 맞는 검증된 왕홍을 48시간 내 후보 리스트로 제안합니다." },
        { icon: "02", t: "더우인·샤오홍슈·타오바오 라이브", d: "플랫폼별 특성에 맞는 기획·셋업·라이브 운영까지 한 팀이 실행합니다." },
        { icon: "03", t: "통관·정품인증·CS 원스톱", d: "중국 수출에 필요한 NMPA 인증, 통관, 중국어 CS까지 별도 업체 없이 처리합니다." },
        { icon: "04", t: "실시간 성과 리포트", d: "왕홍별 GMV, 전환율, 고객 반응을 실시간으로 공유하고 다음 캠페인 전략을 제안합니다." },
      ],
      en: [
        { icon: "01", t: "500+ KOL Pool Matching", d: "Verified KOL candidates matched to your category, budget, and goals — within 48 hours." },
        { icon: "02", t: "Douyin · Xiaohongshu · Taobao Live", d: "Platform-specific planning, setup, and live operations — one team handles it all." },
        { icon: "03", t: "Customs · Certification · CS", d: "NMPA certification, customs clearance, Chinese CS — no separate vendors needed." },
        { icon: "04", t: "Real-time Performance Reports", d: "Per-KOL GMV, conversion rates, customer response — shared in real-time with next campaign strategy." },
      ],
      zh: [
        { icon: "01", t: "500+ 达人精准匹配", d: "根据品类·预算·目标，48小时内提供经验证的达人候选名单。" },
        { icon: "02", t: "抖音·小红书·淘宝直播", d: "针对各平台特性的企划·搭建·直播运营，一个团队全程执行。" },
        { icon: "03", t: "通关·正品认证·客服一站式", d: "NMPA认证、海关通关、中文客服 — 无需另找供应商。" },
        { icon: "04", t: "实时业绩报告", d: "达人别GMV、转化率、客户反馈实时共享，并提出下一期策略。" },
      ],
      ja: [
        { icon: "01", t: "500+ KOLプールマッチング", d: "カテゴリ・予算・目標に合った検証済みKOL候補を48時間以内にご提案。" },
        { icon: "02", t: "抖音・小紅書・淘宝ライブ", d: "プラットフォーム別の企画・セットアップ・ライブ運営を一つのチームが実行。" },
        { icon: "03", t: "通関・正品認証・CSワンストップ", d: "NMPA認証、通関、中国語CS — 別途業者不要。" },
        { icon: "04", t: "リアルタイム成果レポート", d: "KOL別GMV、転換率、顧客反応をリアルタイム共有、次期キャンペーン戦略を提案。" },
      ],
    },
    "korean-seller": {
      ko: [
        { icon: "01", t: "해외 브랜드 직공급 연결", d: "150+ 검증 브랜드에서 카테고리에 맞는 브랜드를 직공급 조건으로 매칭합니다." },
        { icon: "02", t: "왕홍 콜라보 기획", d: "중국 왕홍과의 콜라보 라이브를 기획하고, 한중 동시 콘텐츠를 제작합니다." },
        { icon: "03", t: "크로스보더 물류·정산", d: "배송, 통관, 반품, 현지 정산까지 — 셀러가 판매에만 집중할 수 있도록 지원합니다." },
        { icon: "04", t: "매출 데이터 기반 확장", d: "판매 데이터를 분석하여 추가 브랜드 소싱과 콜라보 확장 전략을 제안합니다." },
      ],
      en: [
        { icon: "01", t: "Direct Brand Supply Matching", d: "Category-matched brands from 150+ verified partners with direct supply terms." },
        { icon: "02", t: "KOL Collab Planning", d: "We plan collab lives with Chinese KOLs and produce dual KR-CN content." },
        { icon: "03", t: "Cross-border Logistics & Settlement", d: "Shipping, customs, returns, local settlement — so you can focus on selling." },
        { icon: "04", t: "Data-driven Expansion", d: "Sales data analysis to recommend additional brand sourcing and collab expansion strategies." },
      ],
      zh: [
        { icon: "01", t: "海外品牌直供对接", d: "从150+经验证品牌中，按品类匹配直供条件的品牌。" },
        { icon: "02", t: "达人联名企划", d: "策划与中国达人的联名直播，制作中韩双语内容。" },
        { icon: "03", t: "跨境物流·结算", d: "配送、通关、退货、本地结算 — 让卖家专注于销售。" },
        { icon: "04", t: "数据驱动扩展", d: "基于销售数据分析，推荐新品牌货源和联名扩展策略。" },
      ],
      ja: [
        { icon: "01", t: "海外ブランド直供給マッチング", d: "150+検証済みブランドからカテゴリに合った直供給条件のブランドをマッチング。" },
        { icon: "02", t: "KOLコラボ企画", d: "中国KOLとのコラボライブを企画し、韓中デュアルコンテンツを制作。" },
        { icon: "03", t: "クロスボーダー物流・精算", d: "配送、通関、返品、現地精算 — セラーは販売に集中。" },
        { icon: "04", t: "データ駆動型拡張", d: "販売データを分析し、追加ブランドソーシングとコラボ拡張戦略を提案。" },
      ],
    },
    "overseas-brand": {
      ko: [
        { icon: "01", t: "한국 셀러브리티 · KOL 매칭", d: "배우·K-POP·인플루언서 100+명 중 브랜드 이미지에 최적화된 후보를 제안합니다." },
        { icon: "02", t: "한국 인기 제품 소싱 연결", d: "K-Beauty·K-Fashion 등 한국 시장에서 검증된 제품을 직접 소싱하여 브랜드 포트폴리오를 확장합니다." },
        { icon: "03", t: "한국 라이브 플랫폼 운영", d: "네이버 쇼핑라이브, 쿠팡라이브, 그립 등 한국 주요 플랫폼에서 라이브를 기획·운영합니다." },
        { icon: "04", t: "드라마 PPL · 콘텐츠 캠페인", d: "한국 드라마 PPL, 예능 협찬, SNS 캠페인 등 다채널 마케팅을 원스톱으로 실행합니다." },
      ],
      en: [
        { icon: "01", t: "Korean Celebrity · KOL Matching", d: "Optimized talent recommendations from 100+ actors, K-POP artists, and influencers for your brand." },
        { icon: "02", t: "Korean Product Sourcing", d: "Source verified K-Beauty, K-Fashion products directly from Korea to expand your brand portfolio." },
        { icon: "03", t: "Korean Live Platform Operations", d: "Planning and running lives on Naver Shopping Live, Coupang Live, Grip, and other major Korean platforms." },
        { icon: "04", t: "Drama PPL · Content Campaigns", d: "Korean drama PPL, variety show sponsorship, SNS campaigns — multi-channel marketing executed end-to-end." },
      ],
      zh: [
        { icon: "01", t: "韩国明星·KOL匹配", d: "从100+演员、K-POP艺人、达人中推荐最符合品牌形象的候选。" },
        { icon: "02", t: "韩国人气产品采购对接", d: "直接从韩国采购经验证的K-Beauty·K-Fashion产品，扩展品牌产品组合。" },
        { icon: "03", t: "韩国直播平台运营", d: "在Naver购物直播、Coupang直播、Grip等韩国主要平台策划运营直播。" },
        { icon: "04", t: "电视剧PPL·内容营销", d: "韩剧PPL、综艺赞助、SNS营销 — 多渠道营销一站式执行。" },
      ],
      ja: [
        { icon: "01", t: "韓国セレブリティ・KOLマッチング", d: "100+俳優・K-POPアーティスト・インフルエンサーからブランドに最適な候補を提案。" },
        { icon: "02", t: "韓国人気商品ソーシング連携", d: "K-Beauty・K-Fashionなど韓国市場で検証済みの商品を直接ソーシングしてブランドポートフォリオを拡張。" },
        { icon: "03", t: "韓国ライブプラットフォーム運営", d: "Naverショッピングライブ、Coupangライブ、Gripなど主要プラットフォームでライブを企画・運営。" },
        { icon: "04", t: "ドラマPPL・コンテンツキャンペーン", d: "韓国ドラマPPL、バラエティ協賛、SNSキャンペーン — マルチチャネルマーケティングをワンストップ実行。" },
      ],
    },
    "overseas-seller": {
      ko: [
        { icon: "01", t: "K-Beauty · K-Fashion 직공급", d: "150+ 검증 브랜드에서 왕홍 채널에 맞는 제품을 직공급 조건으로 매칭합니다." },
        { icon: "02", t: "한국 현지 촬영 지원", d: "서울 스튜디오, 핫플레이스 로케이션, 촬영팀 — 한국에서의 콘텐츠 제작을 풀서포트합니다." },
        { icon: "03", t: "한국 연예인 게스트 연결", d: "라이브 방송에 한국 연예인 게스트를 섭외하여 시청자 유입과 신뢰도를 높입니다." },
        { icon: "04", t: "크로스보더 물류 풀세트", d: "한국 브랜드 → 중국 배송까지 통관·물류·반품·정산을 원스톱으로 처리합니다." },
      ],
      en: [
        { icon: "01", t: "K-Beauty · K-Fashion Direct Supply", d: "Products matched to your channel from 150+ verified Korean brands with direct supply terms." },
        { icon: "02", t: "Korea On-site Filming Support", d: "Seoul studios, trendy locations, production crews — full support for content production in Korea." },
        { icon: "03", t: "Korean Celebrity Guest Matching", d: "Book Korean celebrity guests for your lives to boost viewership and credibility." },
        { icon: "04", t: "Cross-border Logistics Full Stack", d: "Korean brands → China delivery: customs, logistics, returns, settlement — all-in-one." },
      ],
      zh: [
        { icon: "01", t: "K-Beauty · K-Fashion 直供", d: "从150+经验证的韩国品牌中，匹配适合您渠道的产品，直供条件。" },
        { icon: "02", t: "韩国本地拍摄支持", d: "首尔摄影棚、网红打卡地、拍摄团队 — 全面支持韩国本地内容制作。" },
        { icon: "03", t: "韩国艺人嘉宾对接", d: "为直播邀请韩国艺人嘉宾，提升观看量和信任度。" },
        { icon: "04", t: "跨境物流全栈服务", d: "韩国品牌 → 中国配送：通关·物流·退货·结算一站式处理。" },
      ],
      ja: [
        { icon: "01", t: "K-Beauty · K-Fashion直供給", d: "150+検証済み韓国ブランドからチャネルに合った商品を直供給条件でマッチング。" },
        { icon: "02", t: "韓国現地撮影サポート", d: "ソウルスタジオ、ホットスポットロケ、撮影チーム — 韓国でのコンテンツ制作をフルサポート。" },
        { icon: "03", t: "韓国芸能人ゲスト連結", d: "ライブ放送に韓国芸能人ゲストをブッキングし、視聴者流入と信頼度を向上。" },
        { icon: "04", t: "クロスボーダー物流フルセット", d: "韓国ブランド → 中国配送：通関・物流・返品・精算をワンストップ処理。" },
      ],
    },
  };

  // ═══════════════════════════════════════════════════════
  // ROLE-SPECIFIC TRUST PROOF (metrics 보충)
  // ═══════════════════════════════════════════════════════
  const ROLE_TRUST: Record<Role, Record<Lang, string[]>> = {
    "korean-brand": {
      ko: ["최근 12개월 60+ 브랜드 라이브 집행", "평균 첫 캠페인 ROI 180%", "리피트율 73%"],
      en: ["60+ brand lives executed in last 12 months", "Average first-campaign ROI 180%", "73% repeat rate"],
      zh: ["近12个月执行60+品牌直播", "首次活动平均ROI 180%", "复购率73%"],
      ja: ["直近12ヶ月で60+ブランドライブ実行", "初回キャンペーン平均ROI 180%", "リピート率73%"],
    },
    "korean-seller": {
      ko: ["누적 셀러 등록 200+명", "평균 공급가 마진율 35%↑", "월 반복 거래 셀러 120+"],
      en: ["200+ registered sellers", "Avg. supply margin 35%+", "120+ monthly recurring sellers"],
      zh: ["累计注册卖家200+", "平均供货利润率35%↑", "月度重复交易卖家120+"],
      ja: ["累計セラー登録200+名", "平均供給マージン率35%↑", "月次リピートセラー120+"],
    },
    "overseas-brand": {
      ko: ["한국 시장 캠페인 40+ 건 집행", "평균 브랜드 인지도 2.4× 상승", "K-뷰티 제품 소싱 30+ 브랜드 연결"],
      en: ["40+ Korea market campaigns executed", "Avg. brand awareness 2.4× uplift", "30+ K-Beauty brands sourced & connected"],
      zh: ["执行40+韩国市场营销活动", "品牌认知度平均提升2.4倍", "对接30+K-Beauty品牌采购"],
      ja: ["韓国市場キャンペーン40+件実行", "平均ブランド認知度2.4×向上", "K-Beauty商品ソーシング30+ブランド連携"],
    },
    "overseas-seller": {
      ko: ["K-브랜드 직공급 150+ 연결", "한국 현지 촬영 연 200+ 건 지원", "연예인 게스트 섭외 성공률 92%"],
      en: ["150+ K-brand direct supply connections", "200+ Korea filming supports/year", "92% celebrity guest booking success"],
      zh: ["150+ K-品牌直供对接", "年支持200+次韩国本地拍摄", "艺人嘉宾邀约成功率92%"],
      ja: ["K-ブランド直供給150+連結", "韓国現地撮影年200+件サポート", "芸能人ゲストブッキング成功率92%"],
    },
  };

  // ═══════════════════════════════════════════════════════
  // ROLE-SPECIFIC CASE INSIGHT (cases 보충)
  // ═══════════════════════════════════════════════════════
  const ROLE_CASE_INSIGHT: Record<Role, Record<Lang, { quote: string; from: string; extra: string }>> = {
    "korean-brand": {
      ko: { quote: "왕홍 선정부터 라이브 당일 운영까지 한 팀이 끝까지 책임지니까, 우리는 제품에만 집중할 수 있었습니다.", from: "— K-뷰티 브랜드 마케팅 팀장", extra: "캠페인 완료 브랜드 중 73%가 3개월 내 재집행을 요청했습니다." },
      en: { quote: "One team handled everything from KOL selection to live-day operations, so we could focus purely on product.", from: "— K-Beauty Brand Marketing Director", extra: "73% of completed brands requested a re-run within 3 months." },
      zh: { quote: "从达人选定到直播当天运营，一个团队全程负责，我们只需专注于产品。", from: "— K-Beauty品牌营销负责人", extra: "已完成的品牌中73%在3个月内要求再次执行。" },
      ja: { quote: "KOL選定からライブ当日の運営まで一つのチームが最後まで責任を持つので、私たちは製品に集中できました。", from: "— K-Beautyブランドマーケティングチーム長", extra: "キャンペーン完了ブランドの73%が3ヶ月以内に再実行をリクエスト。" },
    },
    "korean-seller": {
      ko: { quote: "브랜드 공급부터 왕홍 연결, 물류까지 한 번에 세팅되니 판매에만 집중할 수 있었습니다.", from: "— 라이브커머스 전문 셀러", extra: "등록 셀러의 60%가 월 3회 이상 반복 거래 중입니다." },
      en: { quote: "Brand supply, KOL matching, and logistics all set up at once — I could just focus on selling.", from: "— Professional Live Commerce Seller", extra: "60% of registered sellers trade 3+ times per month." },
      zh: { quote: "品牌供货、达人对接、物流一次搞定，我只需专注于销售。", from: "— 直播电商专业卖家", extra: "注册卖家中60%月交易3次以上。" },
      ja: { quote: "ブランド供給からKOL連結、物流まで一度にセッティングされるので販売に集中できました。", from: "— ライブコマース専門セラー", extra: "登録セラーの60%が月3回以上リピート取引中。" },
    },
    "overseas-brand": {
      ko: { quote: "한국 연예인 매칭뿐 아니라, 한국 인기 제품 소싱까지 원스톱으로 해결해주니 한국 시장 진출이 훨씬 빨라졌습니다.", from: "— 글로벌 뷰티 브랜드 아시아 총괄", extra: "캠페인 집행 브랜드의 평균 한국 시장 인지도가 2.4배 상승했습니다." },
      en: { quote: "Not just celebrity matching — they sourced trending Korean products for us too. Korea market entry was so much faster.", from: "— Global Beauty Brand, Asia Director", extra: "Brands that ran campaigns saw 2.4× average increase in Korea market awareness." },
      zh: { quote: "不仅是明星匹配，还帮我们采购了韩国热门产品，韩国市场进入速度快了很多。", from: "— 全球美妆品牌亚洲总监", extra: "执行营销的品牌韩国市场认知度平均提升2.4倍。" },
      ja: { quote: "セレブリティマッチングだけでなく、韓国の人気商品ソーシングまでワンストップ。韓国市場参入がずっと早くなりました。", from: "— グローバルビューティブランド アジア統括", extra: "キャンペーン実行ブランドの韓国市場認知度が平均2.4倍向上。" },
    },
    "overseas-seller": {
      ko: { quote: "한국 브랜드를 직접 소싱할 수 있고, 서울에서 촬영까지 지원받으니 콘텐츠 퀄리티가 완전히 달라졌습니다.", from: "— 중국 뷰티 왕홍 (팔로워 200만+)", extra: "한국 현지 촬영을 진행한 왕홍의 평균 시청률이 2.8배 상승했습니다." },
      en: { quote: "Direct Korean brand sourcing plus Seoul filming support — content quality went to a whole new level.", from: "— Chinese Beauty KOL (2M+ followers)", extra: "KOLs who filmed in Korea saw 2.8× average viewership increase." },
      zh: { quote: "能直接对接韩国品牌，在首尔拍摄还有全程支持，内容质量完全不一样了。", from: "— 中国美妆达人（200万+粉丝）", extra: "在韩国拍摄的达人平均观看量提升2.8倍。" },
      ja: { quote: "韓国ブランドを直接ソーシングでき、ソウルでの撮影までサポートしてくれるのでコンテンツクオリティが完全に変わりました。", from: "— 中国ビューティKOL（200万+フォロワー）", extra: "韓国現地撮影を行ったKOLの平均視聴率が2.8倍向上。" },
    },
  };

  // ═══════════════════════════════════════════════════════
  // ROLE-SPECIFIC K-BRAND PRODUCT SHOWCASE (overseas-brand 전용)
  // ═══════════════════════════════════════════════════════
  type KProductItem = { category: string; examples: string; desc: string };
  const K_PRODUCT_SHOWCASE: Record<Lang, KProductItem[]> = {
    ko: [
      { category: "K-Beauty", examples: "스킨케어 · 메이크업 · 마스크팩", desc: "글로벌 수요 1위 카테고리. 중국·동남아 시장에서 검증된 K-뷰티 브랜드를 직접 소싱하여 연결합니다." },
      { category: "K-Fashion", examples: "스트릿웨어 · 디자이너 · 액세서리", desc: "K-드라마·K-POP에서 화제된 브랜드를 중심으로, 한국 감성 패션을 직공급합니다." },
      { category: "K-Food · K-Health", examples: "건강기능식품 · 간편식 · 뷰티푸드", desc: "콜라겐, 비타민, 다이어트 식품 등 한국 건강·식품 트렌드 제품을 소싱합니다." },
    ],
    en: [
      { category: "K-Beauty", examples: "Skincare · Makeup · Sheet masks", desc: "#1 global demand category. We source verified K-Beauty brands from the Korean market." },
      { category: "K-Fashion", examples: "Streetwear · Designer · Accessories", desc: "Brands trending from K-Drama & K-POP — direct supply of Korean aesthetic fashion." },
      { category: "K-Food · K-Health", examples: "Supplements · Ready meals · Beauty food", desc: "Collagen, vitamins, diet products — sourcing Korean health & food trend products." },
    ],
    zh: [
      { category: "K-Beauty", examples: "护肤 · 彩妆 · 面膜", desc: "全球需求第一品类。直接从韩国市场采购经验证的K-Beauty品牌。" },
      { category: "K-Fashion", examples: "街头潮牌 · 设计师 · 配饰", desc: "以韩剧·K-POP中走红的品牌为中心，直供韩系美学时尚。" },
      { category: "K-Food · K-Health", examples: "保健品 · 即食食品 · 美容食品", desc: "胶原蛋白、维生素、减肥食品等韩国健康食品趋势产品。" },
    ],
    ja: [
      { category: "K-Beauty", examples: "スキンケア · メイクアップ · シートマスク", desc: "グローバル需要No.1カテゴリ。韓国市場で検証済みのK-Beautyブランドを直接ソーシング。" },
      { category: "K-Fashion", examples: "ストリートウェア · デザイナー · アクセサリー", desc: "K-ドラマ・K-POPで話題のブランドを中心に、韓国感性ファッションを直供給。" },
      { category: "K-Food · K-Health", examples: "健康機能食品 · 簡便食 · ビューティーフード", desc: "コラーゲン、ビタミン、ダイエット食品など韓国ヘルス&フードトレンド商品をソーシング。" },
    ],
  };

  // ═══════════════════════════════════════════════════════
  // ROLE-SPECIFIC PURPOSE CARDS ("무엇을 원하시나요?" 허브)
  // ═══════════════════════════════════════════════════════
  type PurposeCard = { t: string; d: string; cta: string; anchor: string };
  const ROLE_PURPOSES: Record<Role, Record<Lang, PurposeCard[]>> = {
    "korean-brand": {
      ko: [
        { t: "왕홍 매칭 · 라이브 판매", d: "내 브랜드에 맞는 왕홍을 찾고, 라이브 판매까지 실행", cta: "왕홍 후보 보기 →", anchor: "#services" },
        { t: "중국 채널 운영", d: "더우인 · 샤오홍슈 · 타오바오 숍 개설부터 광고까지", cta: "채널 전략 상담 →", anchor: "/contact" },
        { t: "라이브커머스 풀 실행", d: "기획 → 스크립트 → 방송 → 리포트, 한 팀이 끝까지", cta: "라이브 견적 요청 →", anchor: "/contact" },
        { t: "통관 · 인증 · CS · 정산", d: "NMPA 인증, 수출 통관, 중국어 CS, 위안화 정산 원스톱", cta: "물류 지원 문의 →", anchor: "/contact" },
        { t: "중국 콘텐츠 현지화", d: "샤오홍슈 종초 · 더우인 숏클립 · 위챗 캠페인 제작", cta: "콘텐츠 샘플 보기 →", anchor: "/process" },
        { t: "셀러/왕홍에게 역공급", d: "해외 셀러 · 왕홍에게 직공급하여 판매 채널 다변화", cta: "공급 등록 시작 →", anchor: "/contact" },
      ],
      en: [
        { t: "KOL Matching & Live Sales", d: "Find the right KOL for your brand and execute live sales", cta: "See KOL candidates →", anchor: "#services" },
        { t: "China Channel Operations", d: "Douyin · Xiaohongshu · Taobao shop setup to ads", cta: "Channel strategy →", anchor: "/contact" },
        { t: "Live Commerce Full Execution", d: "Planning → script → broadcast → report, one team end-to-end", cta: "Request live quote →", anchor: "/contact" },
        { t: "Customs · Certification · CS", d: "NMPA certification, export customs, Chinese CS, CNY settlement", cta: "Logistics inquiry →", anchor: "/contact" },
        { t: "China Content Localization", d: "Xiaohongshu seeding · Douyin short clips · WeChat campaigns", cta: "See content samples →", anchor: "/process" },
        { t: "Reverse Supply to Sellers/KOLs", d: "Supply your products to overseas sellers & KOLs to diversify channels", cta: "Start supply registration →", anchor: "/contact" },
      ],
      zh: [
        { t: "达人匹配 · 直播销售", d: "为您的品牌找到合适的达人，执行直播销售", cta: "查看达人候选 →", anchor: "#services" },
        { t: "中国渠道运营", d: "抖音 · 小红书 · 淘宝店铺开设到广告投放", cta: "渠道策略咨询 →", anchor: "/contact" },
        { t: "直播电商全程执行", d: "企划 → 脚本 → 直播 → 报告，一个团队全程负责", cta: "请求直播报价 →", anchor: "/contact" },
        { t: "通关 · 认证 · 客服 · 结算", d: "NMPA认证、出口通关、中文客服、人民币结算一站式", cta: "物流支持咨询 →", anchor: "/contact" },
        { t: "中国内容本地化", d: "小红书种草 · 抖音短视频 · 微信营销内容制作", cta: "查看内容样本 →", anchor: "/process" },
        { t: "向卖家/达人供货", d: "向海外卖家·达人直供您的产品，多元化销售渠道", cta: "开始供货注册 →", anchor: "/contact" },
      ],
      ja: [
        { t: "KOLマッチング・ライブ販売", d: "ブランドに合ったKOLを見つけ、ライブ販売まで実行", cta: "KOL候補を見る →", anchor: "#services" },
        { t: "中国チャネル運営", d: "抖音・小紅書・淘宝ショップ開設から広告まで", cta: "チャネル戦略相談 →", anchor: "/contact" },
        { t: "ライブコマースフル実行", d: "企画→スクリプト→放送→レポート、ワンチームでエンドツーエンド", cta: "ライブ見積依頼 →", anchor: "/contact" },
        { t: "通関・認証・CS・精算", d: "NMPA認証、輸出通関、中国語CS、人民元精算ワンストップ", cta: "物流サポート問い合わせ →", anchor: "/contact" },
        { t: "中国コンテンツ現地化", d: "小紅書シーディング・抖音ショートクリップ・WeChatキャンペーン", cta: "コンテンツサンプルを見る →", anchor: "/process" },
        { t: "セラー/KOLへ逆供給", d: "海外セラー・KOLに直供給して販売チャネルを多角化", cta: "供給登録開始 →", anchor: "/contact" },
      ],
    },
    "korean-seller": {
      ko: [
        { t: "해외 브랜드 직공급", d: "중국 · 동남아 · 유럽 브랜드 제품을 직공급 조건으로 확보", cta: "공급 브랜드 보기 →", anchor: "#services" },
        { t: "왕홍 콜라보 라이브", d: "중국 왕홍과 한중 동시 라이브, 콜라보 콘텐츠 제작", cta: "콜라보 기회 보기 →", anchor: "/contact" },
        { t: "해외 판매 채널 확장", d: "더우인 · 타오바오 등 중국 채널 또는 동남아 플랫폼 진출", cta: "해외 진출 상담 →", anchor: "/contact" },
        { t: "광고 · 브랜디드 협업", d: "브랜드로부터 광고/캠페인/협찬을 받아 수익 다변화", cta: "협업 제안 받기 →", anchor: "/contact" },
        { t: "물류 · 정산 · 운영 지원", d: "크로스보더 배송, 해외 정산, 재고 관리 백오피스", cta: "운영 지원 문의 →", anchor: "/contact" },
        { t: "연예인 게스트 섭외", d: "방송에 연예인 게스트를 초대하여 시청률 · 매출 극대화", cta: "게스트 옵션 보기 →", anchor: "/network" },
      ],
      en: [
        { t: "Global Brand Direct Supply", d: "Secure products from China, SE Asia, Europe brands on direct terms", cta: "See available brands →", anchor: "#services" },
        { t: "KOL Collab Live", d: "Joint KR-CN live with Chinese KOLs, collab content production", cta: "See collab opportunities →", anchor: "/contact" },
        { t: "Overseas Channel Expansion", d: "Enter Douyin, Taobao or SE Asian platforms", cta: "Overseas expansion →", anchor: "/contact" },
        { t: "Ad & Branded Collabs", d: "Receive ad/campaign/sponsorship deals to diversify revenue", cta: "Receive collab offers →", anchor: "/contact" },
        { t: "Logistics · Settlement · Ops", d: "Cross-border shipping, overseas settlement, inventory management", cta: "Ops support inquiry →", anchor: "/contact" },
        { t: "Celebrity Guest Booking", d: "Invite celebrity guests to boost viewership & revenue", cta: "See guest options →", anchor: "/network" },
      ],
      zh: [
        { t: "海外品牌直供", d: "以直供条件获取中国·东南亚·欧洲品牌产品", cta: "查看可供品牌 →", anchor: "#services" },
        { t: "达人联名直播", d: "与中国达人中韩同步直播，联名内容制作", cta: "查看联名机会 →", anchor: "/contact" },
        { t: "海外销售渠道扩展", d: "进入抖音·淘宝等中国渠道或东南亚平台", cta: "海外扩展咨询 →", anchor: "/contact" },
        { t: "广告·品牌合作", d: "接收品牌广告/营销/赞助，实现收益多元化", cta: "接收合作提案 →", anchor: "/contact" },
        { t: "物流·结算·运营支持", d: "跨境配送、海外结算、库存管理后台", cta: "运营支持咨询 →", anchor: "/contact" },
        { t: "艺人嘉宾邀约", d: "邀请艺人嘉宾提升观看量和销售额", cta: "查看嘉宾选项 →", anchor: "/network" },
      ],
      ja: [
        { t: "海外ブランド直供給", d: "中国・東南アジア・欧州ブランド商品を直供給条件で確保", cta: "供給ブランドを見る →", anchor: "#services" },
        { t: "KOLコラボライブ", d: "中国KOLと韓中同時ライブ、コラボコンテンツ制作", cta: "コラボ機会を見る →", anchor: "/contact" },
        { t: "海外販売チャネル拡張", d: "抖音・淘宝等の中国チャネルや東南アジアプラットフォーム進出", cta: "海外展開相談 →", anchor: "/contact" },
        { t: "広告・ブランドコラボ", d: "ブランドから広告/キャンペーン/協賛を受けて収益多角化", cta: "コラボ提案を受ける →", anchor: "/contact" },
        { t: "物流・精算・運営サポート", d: "クロスボーダー配送、海外精算、在庫管理バックオフィス", cta: "運営サポート問い合わせ →", anchor: "/contact" },
        { t: "芸能人ゲストブッキング", d: "放送に芸能人ゲストを招待して視聴率・売上最大化", cta: "ゲストオプションを見る →", anchor: "/network" },
      ],
    },
    "overseas-brand": {
      ko: [
        { t: "한국 제품 소싱 · 직공급", d: "K-Beauty · K-Fashion · K-Food 검증된 제품을 직접 소싱", cta: "소싱 리스트 요청 →", anchor: "#k-product" },
        { t: "한국 셀러 판매 위탁", d: "한국 전문 셀러에게 라이브 판매를 맡겨 한국 소비자 도달", cta: "셀러 매칭 상담 →", anchor: "/contact" },
        { t: "연예인 · KOL 마케팅", d: "배우 · K-POP · 인플루언서 앰배서더, 협찬, PPL 집행", cta: "연예인 후보 보기 →", anchor: "/network" },
        { t: "한국 라이브 플랫폼 진출", d: "네이버 · 쿠팡 · 그립 등 한국 라이브 플랫폼 숍 운영", cta: "플랫폼 전략 상담 →", anchor: "/contact" },
        { t: "한국 콘텐츠 · 드라마 PPL", d: "한국 로케이션 촬영, 드라마/예능 PPL, SNS 캠페인", cta: "PPL 옵션 보기 →", anchor: "/contact" },
        { t: "한국 현지 파트너 연결", d: "물류 · 운영 · 법률 · 마케팅 현지 실행 파트너 연결", cta: "파트너 소개 요청 →", anchor: "/contact" },
      ],
      en: [
        { t: "Korean Product Sourcing", d: "Directly source verified K-Beauty · K-Fashion · K-Food products", cta: "Request sourcing list →", anchor: "#k-product" },
        { t: "Korean Seller Delegation", d: "Delegate live sales to Korean pro sellers to reach Korean consumers", cta: "Seller matching →", anchor: "/contact" },
        { t: "Celebrity · KOL Marketing", d: "Actor · K-POP · influencer ambassadors, sponsorship, PPL", cta: "See celebrity candidates →", anchor: "/network" },
        { t: "Korean Live Platform Entry", d: "Naver · Coupang · Grip live platform shop operations", cta: "Platform strategy →", anchor: "/contact" },
        { t: "Korean Content · Drama PPL", d: "Korean location filming, drama/variety PPL, SNS campaigns", cta: "See PPL options →", anchor: "/contact" },
        { t: "Korean Local Partners", d: "Logistics · ops · legal · marketing local execution partners", cta: "Request partner intro →", anchor: "/contact" },
      ],
      zh: [
        { t: "韩国产品采购 · 直供", d: "直接采购经验证的K-Beauty · K-Fashion · K-Food产品", cta: "请求采购清单 →", anchor: "#k-product" },
        { t: "韩国卖家代销", d: "委托韩国专业卖家进行直播销售，触达韩国消费者", cta: "卖家匹配咨询 →", anchor: "/contact" },
        { t: "艺人 · KOL营销", d: "演员 · K-POP · 达人代言、赞助、PPL执行", cta: "查看艺人候选 →", anchor: "/network" },
        { t: "韩国直播平台进驻", d: "Naver · Coupang · Grip等韩国直播平台店铺运营", cta: "平台策略咨询 →", anchor: "/contact" },
        { t: "韩国内容 · 电视剧PPL", d: "韩国外景拍摄、韩剧/综艺PPL、SNS营销", cta: "查看PPL选项 →", anchor: "/contact" },
        { t: "韩国本地合作伙伴", d: "物流·运营·法务·营销本地执行伙伴对接", cta: "请求伙伴介绍 →", anchor: "/contact" },
      ],
      ja: [
        { t: "韓国商品ソーシング・直供給", d: "検証済みK-Beauty・K-Fashion・K-Food商品を直接ソーシング", cta: "ソーシングリスト請求 →", anchor: "#k-product" },
        { t: "韓国セラー販売委託", d: "韓国プロセラーにライブ販売を委託、韓国消費者にリーチ", cta: "セラーマッチング相談 →", anchor: "/contact" },
        { t: "芸能人・KOLマーケティング", d: "俳優・K-POP・インフルエンサーアンバサダー、協賛、PPL", cta: "芸能人候補を見る →", anchor: "/network" },
        { t: "韓国ライブプラットフォーム進出", d: "Naver・Coupang・Gripライブプラットフォームショップ運営", cta: "プラットフォーム戦略相談 →", anchor: "/contact" },
        { t: "韓国コンテンツ・ドラマPPL", d: "韓国ロケ撮影、ドラマ/バラエティPPL、SNSキャンペーン", cta: "PPLオプションを見る →", anchor: "/contact" },
        { t: "韓国現地パートナー連結", d: "物流・運営・法務・マーケティング現地パートナー連結", cta: "パートナー紹介依頼 →", anchor: "/contact" },
      ],
    },
    "overseas-seller": {
      ko: [
        { t: "한국 브랜드 직공급", d: "K-Beauty · K-Fashion 검증 브랜드를 직접 공급받기", cta: "브랜드 리스트 요청 →", anchor: "#k-product" },
        { t: "한국 셀러 콜라보", d: "한국 셀러와 합동 라이브, 크로스보더 동시 방송", cta: "콜라보 신청 →", anchor: "/contact" },
        { t: "연예인 · KOL 게스트", d: "라이브에 한국 연예인/인플루언서 게스트 초대", cta: "게스트 매칭 상담 →", anchor: "/network" },
        { t: "한국 현지 촬영 지원", d: "서울 스튜디오, 핫플 로케이션, 촬영팀 풀서포트", cta: "촬영 일정 문의 →", anchor: "/contact" },
        { t: "광고 · 캠페인 수주", d: "한국/글로벌 브랜드로부터 광고 · 협찬 · 캠페인 수주", cta: "프로필 등록 →", anchor: "/contact" },
        { t: "크로스보더 물류 풀세트", d: "한국 → 중국 배송, 통관, 반품, 정산 원스톱", cta: "물류 상담 →", anchor: "/contact" },
      ],
      en: [
        { t: "Korean Brand Direct Supply", d: "Get verified K-Beauty · K-Fashion products directly", cta: "Request brand list →", anchor: "#k-product" },
        { t: "Korean Seller Collab", d: "Joint lives with Korean sellers, cross-border simulcast", cta: "Apply for collab →", anchor: "/contact" },
        { t: "Celebrity · KOL Guests", d: "Invite Korean celebrity/influencer guests to your live", cta: "Guest matching →", anchor: "/network" },
        { t: "Korea Filming Support", d: "Seoul studios, trendy locations, full production support", cta: "Filming schedule →", anchor: "/contact" },
        { t: "Ad · Campaign Deals", d: "Receive ad/sponsorship/campaign offers from KR/global brands", cta: "Register profile →", anchor: "/contact" },
        { t: "Cross-border Logistics", d: "Korea → China shipping, customs, returns, settlement", cta: "Logistics consultation →", anchor: "/contact" },
      ],
      zh: [
        { t: "韩国品牌直供", d: "直接获取经验证的K-Beauty · K-Fashion产品", cta: "请求品牌清单 →", anchor: "#k-product" },
        { t: "韩国卖家联名", d: "与韩国卖家合作直播，跨境同步直播", cta: "申请联名 →", anchor: "/contact" },
        { t: "艺人 · KOL嘉宾", d: "邀请韩国艺人/达人嘉宾参加直播", cta: "嘉宾匹配咨询 →", anchor: "/network" },
        { t: "韩国本地拍摄支持", d: "首尔摄影棚、网红打卡地、拍摄团队全程支持", cta: "拍摄日程咨询 →", anchor: "/contact" },
        { t: "广告 · 营销合作", d: "接收韩国/全球品牌的广告·赞助·营销合作", cta: "注册资料 →", anchor: "/contact" },
        { t: "跨境物流全栈", d: "韩国 → 中国配送、通关、退货、结算一站式", cta: "物流咨询 →", anchor: "/contact" },
      ],
      ja: [
        { t: "韓国ブランド直供給", d: "検証済みK-Beauty・K-Fashion商品を直接供給", cta: "ブランドリスト請求 →", anchor: "#k-product" },
        { t: "韓国セラーコラボ", d: "韓国セラーと合同ライブ、クロスボーダー同時配信", cta: "コラボ申請 →", anchor: "/contact" },
        { t: "芸能人・KOLゲスト", d: "ライブに韓国芸能人/インフルエンサーゲストを招待", cta: "ゲストマッチング相談 →", anchor: "/network" },
        { t: "韓国現地撮影サポート", d: "ソウルスタジオ、ホットスポット、撮影チームフルサポート", cta: "撮影スケジュール問い合わせ →", anchor: "/contact" },
        { t: "広告・キャンペーン受注", d: "韓国/グローバルブランドから広告・協賛・キャンペーン受注", cta: "プロフィール登録 →", anchor: "/contact" },
        { t: "クロスボーダー物流フルセット", d: "韓国→中国配送、通関、返品、精算ワンストップ", cta: "物流相談 →", anchor: "/contact" },
      ],
    },
  };

  // ═══════════════════════════════════════════════════════
  // ROLE-SPECIFIC FAQ (포지션별 5개)
  // ═══════════════════════════════════════════════════════
  type FaqItem = { q: string; a: string };
  const ROLE_FAQ: Record<Role, Record<Lang, FaqItem[]>> = {
    "korean-brand": {
      ko: [
        { q: "최소 주문량이나 최소 예산이 있나요?", a: "최소 물량 제한 없이 시작 가능합니다. 라이브 1회 트라이얼도 가능하며, 예산 규모에 맞춰 최적화된 왕홍과 플랫폼을 제안드립니다." },
        { q: "왕홍 선정은 어떻게 이루어지나요?", a: "브랜드 카테고리, 목표 GMV, 타겟 소비층을 분석한 뒤 검증된 왕홍 후보 리스트를 제안합니다. 모든 왕홍은 직접 미팅을 거친 후에만 매칭됩니다." },
        { q: "통관이나 NMPA 인증도 대행 가능한가요?", a: "네, 중국 수출에 필요한 NMPA 인증, 통관, 정품 인증, 중국어 라벨링, CS까지 원스톱으로 처리합니다." },
        { q: "성과가 안 나오면 어떻게 되나요?", a: "위약금 없음, 사전 NDA 가능, 트라이얼 1회 무료 제공. 캠페인 후 상세 리포트와 함께 개선 전략을 제안합니다." },
        { q: "계약 전에 왕홍 후보를 미리 볼 수 있나요?", a: "무료 컨셉 미팅에서 왕홍 후보 방향과 플랫폼 전략을 먼저 안내드립니다. 계약 전 충분한 검토가 가능합니다." },
      ],
      en: [
        { q: "Is there a minimum order or budget?", a: "No minimum. You can start with a single live trial. We optimize KOL and platform recommendations based on your budget." },
        { q: "How are KOLs selected?", a: "We analyze your brand category, target GMV, and audience, then propose verified KOL candidates. All KOLs are matched only after direct meetings." },
        { q: "Can you handle customs and NMPA certification?", a: "Yes — NMPA certification, customs clearance, authenticity certification, Chinese labeling, and CS, all handled in-house." },
        { q: "What if the campaign doesn't perform?", a: "No penalty, pre-NDA available, free 1-time trial. Post-campaign detailed reports with improvement strategies included." },
        { q: "Can I preview KOL candidates before signing?", a: "Yes — in the free concept meeting, we present KOL directions and platform strategies. Full review before commitment." },
      ],
      zh: [
        { q: "有最低订单量或预算要求吗？", a: "无最低限制。可从一次直播试播开始。我们根据预算推荐最优达人和平台方案。" },
        { q: "达人是如何筛选的？", a: "分析品牌品类、目标GMV和受众后，推荐经验证的达人候选。所有达人均在亲自面谈后才匹配。" },
        { q: "能代办通关和NMPA认证吗？", a: "可以 — NMPA认证、海关通关、正品认证、中文标签、客服，全部一站式处理。" },
        { q: "如果效果不好怎么办？", a: "无违约金、可事前签NDA、免费试播1次。活动后提供详细报告和改进策略。" },
        { q: "签约前能预览达人候选吗？", a: "可以 — 在免费概念会议中展示达人方向和平台策略。签约前充分评估。" },
      ],
      ja: [
        { q: "最低注文量や予算はありますか？", a: "最低制限なし。ライブ1回トライアルから開始可能。予算に合わせたKOL・プラットフォームをご提案します。" },
        { q: "KOLの選定はどう行われますか？", a: "ブランドカテゴリ、目標GMV、ターゲット層を分析し、検証済みKOL候補をご提案。全KOLは直接ミーティング後にのみマッチング。" },
        { q: "通関やNMPA認証も代行可能ですか？", a: "はい — NMPA認証、通関、正品認証、中国語ラベリング、CSまでワンストップ対応。" },
        { q: "成果が出なかったら？", a: "違約金なし、事前NDA可能、トライアル1回無料。キャンペーン後の詳細レポートと改善戦略をご提案。" },
        { q: "契約前にKOL候補を見れますか？", a: "はい — 無料コンセプトMTGでKOL方向とプラットフォーム戦略を先にご案内。契約前に十分な検討が可能です。" },
      ],
    },
    "korean-seller": {
      ko: [
        { q: "셀러 수수료는 어떻게 되나요?", a: "브랜드와 카테고리에 따라 다르며, 무료 미팅에서 공급 조건과 예상 마진을 투명하게 안내드립니다." },
        { q: "소규모 셀러도 이용 가능한가요?", a: "네, 팔로워 규모와 관계없이 이용 가능합니다. 채널 특성에 맞는 브랜드와 협업 기회를 매칭합니다." },
        { q: "왕홍 콜라보는 어떤 방식으로 진행되나요?", a: "공동구매형, 합동방송형, 콘텐츠 교환형 등 다양한 콜라보 유형이 있으며, 채널과 카테고리에 최적화된 방식을 제안합니다." },
        { q: "해외 판매 경험이 없어도 되나요?", a: "물류, 통관, 정산, CS까지 저희가 풀서포트하므로 해외 판매 경험이 없어도 시작할 수 있습니다." },
        { q: "정산 주기는 어떻게 되나요?", a: "브랜드별로 다르지만 일반적으로 월 1~2회 정산합니다. 정산 조건은 미팅에서 상세히 안내드립니다." },
      ],
      en: [
        { q: "What are the seller fees?", a: "Varies by brand and category. We transparently explain supply terms and expected margins in the free meeting." },
        { q: "Can small sellers use this?", a: "Yes, regardless of follower count. We match brands and collab opportunities suited to your channel." },
        { q: "How do KOL collabs work?", a: "Group buying, joint broadcast, content exchange — we propose the best format for your channel and category." },
        { q: "What if I have no overseas sales experience?", a: "We provide full support: logistics, customs, settlement, CS — you can start with zero experience." },
        { q: "What's the settlement cycle?", a: "Typically 1-2 times per month depending on the brand. Detailed terms discussed in the meeting." },
      ],
      zh: [
        { q: "卖家费用如何？", a: "因品牌和品类而异。免费会议中透明说明供货条件和预期利润。" },
        { q: "小型卖家也能用吗？", a: "可以，不论粉丝规模。我们为您匹配适合渠道的品牌和合作机会。" },
        { q: "达人联名如何进行？", a: "团购型、合播型、内容交换型等多种形式，推荐最适合您渠道和品类的方式。" },
        { q: "没有海外销售经验也行吗？", a: "物流、通关、结算、客服全程支持，零经验也能开始。" },
        { q: "结算周期是怎样的？", a: "一般每月1-2次结算，具体条件在会议中详细说明。" },
      ],
      ja: [
        { q: "セラー手数料はどうなりますか？", a: "ブランドとカテゴリにより異なります。無料ミーティングで供給条件と予想マージンを透明にご案内。" },
        { q: "小規模セラーでも利用可能？", a: "はい、フォロワー規模に関係なく利用可能。チャネル特性に合ったブランドとコラボ機会をマッチング。" },
        { q: "KOLコラボはどう進行？", a: "共同購入型、合同放送型、コンテンツ交換型など多様。チャネルとカテゴリに最適な方式をご提案。" },
        { q: "海外販売経験がなくても大丈夫？", a: "物流、通関、精算、CSまでフルサポート。経験ゼロでも開始可能です。" },
        { q: "精算サイクルは？", a: "ブランドにより異なりますが一般的に月1～2回。詳細条件はミーティングでご案内。" },
      ],
    },
    "overseas-brand": {
      ko: [
        { q: "한국 제품 소싱도 같이 가능한가요?", a: "네, 연예인/KOL 마케팅과 함께 K-Beauty/K-Fashion/K-Food 등 한국 제품을 직접 소싱하여 브랜드 포트폴리오 확장을 지원합니다." },
        { q: "연예인 등급별 비용 차이가 큰가요?", a: "A-list부터 마이크로 인플루언서까지 폭넓은 옵션이 있으며, 예산에 맞는 최적의 조합을 제안합니다." },
        { q: "한국 시장 진출 경험이 없어도 되나요?", a: "처음부터 끝까지 원스톱으로 실행합니다. 시장 진단, 전략 수립, 파트너 연결, 실행, 리포트까지 한 팀이 담당합니다." },
        { q: "드라마 PPL은 어떤 옵션이 있나요?", a: "제품 노출형, 대사 삽입형, 씬 연출형 등 다양한 PPL 옵션이 있으며, 예산과 목표에 맞춰 제안합니다." },
        { q: "계약 전에 무엇을 확인할 수 있나요?", a: "무료 미팅에서 연예인/KOL 후보 방향, 한국 시장 진단, 예상 비용과 효과를 먼저 확인하실 수 있습니다." },
      ],
      en: [
        { q: "Can you also help source Korean products?", a: "Yes — alongside celebrity/KOL marketing, we source K-Beauty/K-Fashion/K-Food products directly to expand your portfolio." },
        { q: "Is there a big cost difference by celebrity tier?", a: "We offer options from A-list to micro-influencers and propose the optimal mix for your budget." },
        { q: "What if we have no Korea market experience?", a: "We execute end-to-end: market diagnosis, strategy, partner matching, execution, reporting — one team handles everything." },
        { q: "What drama PPL options are available?", a: "Product placement, dialogue insertion, scene production — various options tailored to your budget and goals." },
        { q: "What can I see before signing?", a: "In the free meeting: celebrity/KOL candidate directions, Korea market diagnosis, estimated costs and impact." },
      ],
      zh: [
        { q: "也能帮忙采购韩国产品吗？", a: "可以 — 在艺人/KOL营销的同时，直接采购K-Beauty/K-Fashion/K-Food产品，扩展品牌组合。" },
        { q: "不同艺人等级费用差异大吗？", a: "从A-list到微型达人都有选项，根据预算推荐最优组合。" },
        { q: "没有韩国市场经验也行吗？", a: "我们从头到尾一站式执行：市场诊断、策略、伙伴对接、执行、报告 — 一个团队负责。" },
        { q: "电视剧PPL有哪些选项？", a: "产品露出型、台词植入型、场景演绎型等多种PPL选项，根据预算和目标定制。" },
        { q: "签约前能了解什么？", a: "免费会议中可了解：艺人/KOL候选方向、韩国市场诊断、预估费用和效果。" },
      ],
      ja: [
        { q: "韓国商品のソーシングもできますか？", a: "はい — 芸能人/KOLマーケティングと並行して、K-Beauty/K-Fashion/K-Food商品を直接ソーシング、ポートフォリオ拡張を支援。" },
        { q: "芸能人等級による費用差は大きい？", a: "A-listからマイクロインフルエンサーまで幅広いオプション。予算に合った最適な組み合わせをご提案。" },
        { q: "韓国市場経験がなくても大丈夫？", a: "エンドツーエンドでワンストップ実行。市場診断、戦略、パートナー連結、実行、レポートまで一つのチームが担当。" },
        { q: "ドラマPPLにはどんなオプションが？", a: "商品露出型、台詞挿入型、シーン演出型など多様なPPLオプション。予算と目標に合わせてご提案。" },
        { q: "契約前に何を確認できますか？", a: "無料MTGで芸能人/KOL候補の方向、韓国市場診断、予想費用と効果を事前確認可能。" },
      ],
    },
    "overseas-seller": {
      ko: [
        { q: "샘플 테스트가 가능한가요?", a: "네, 관심 브랜드의 샘플을 사전에 받아보실 수 있습니다. 샘플 비용과 배송 조건은 브랜드마다 다릅니다." },
        { q: "한국 방문 촬영은 어떻게 진행되나요?", a: "1일/3일/7일 패키지 옵션이 있으며, 서울 스튜디오, 핫플 로케이션, 촬영팀, 편집까지 풀서포트합니다." },
        { q: "연예인 게스트 비용이 부담되지 않나요?", a: "등급별 다양한 옵션이 있습니다. 마이크로 인플루언서부터 시작하여 ROI를 확인한 후 업그레이드할 수 있습니다." },
        { q: "물류는 어떻게 처리되나요?", a: "한국 브랜드 → 중국/해외 배송까지 통관, 물류, 반품, 정산을 원스톱으로 처리합니다." },
        { q: "광고/캠페인 제안은 어떻게 받나요?", a: "프로필을 등록하시면 채널 특성에 맞는 브랜드의 광고/협찬/캠페인 제안을 매칭해 드립니다." },
      ],
      en: [
        { q: "Can I get sample tests?", a: "Yes, samples can be arranged before commitment. Sample costs and shipping vary by brand." },
        { q: "How does Korea filming work?", a: "1-day/3-day/7-day packages available. Seoul studios, trendy spots, crew, editing — all included." },
        { q: "Isn't celebrity guest cost too high?", a: "Options range across tiers. Start with micro-influencers, verify ROI, then upgrade." },
        { q: "How is logistics handled?", a: "Korea → China/overseas: customs, shipping, returns, settlement — all handled one-stop." },
        { q: "How do I receive ad/campaign offers?", a: "Register your profile and we match you with brand ad/sponsorship opportunities suited to your channel." },
      ],
      zh: [
        { q: "可以先测试样品吗？", a: "可以，合作前可安排样品寄送。样品费用和运费因品牌而异。" },
        { q: "韩国拍摄怎么进行？", a: "提供1天/3天/7天套餐。首尔摄影棚、网红打卡地、拍摄团队、剪辑全程支持。" },
        { q: "艺人嘉宾费用会不会很高？", a: "各等级都有选项。可从微型达人开始，验证ROI后再升级。" },
        { q: "物流怎么处理？", a: "韩国→中国/海外：通关、物流、退货、结算一站式处理。" },
        { q: "如何接收广告/营销合作？", a: "注册资料后，我们为您匹配适合渠道的品牌广告/赞助机会。" },
      ],
      ja: [
        { q: "サンプルテストは可能ですか？", a: "はい、契約前に関心ブランドのサンプルを受け取れます。費用と配送条件はブランドにより異なります。" },
        { q: "韓国撮影はどう進行？", a: "1日/3日/7日パッケージあり。ソウルスタジオ、ホットスポット、撮影チーム、編集までフルサポート。" },
        { q: "芸能人ゲスト費用は負担では？", a: "等級別に多様なオプション。マイクロインフルエンサーから始めてROI確認後アップグレード可能。" },
        { q: "物流はどう処理されますか？", a: "韓国→中国/海外：通関、物流、返品、精算をワンストップ処理。" },
        { q: "広告/キャンペーン提案はどう受ける？", a: "プロフィール登録後、チャネル特性に合ったブランドの広告/協賛機会をマッチングします。" },
      ],
    },
  };

  // ═══════════════════════════════════════════════════════
  // AUDIENCE CARDS: role → which card index to feature
  // 0=korean-brand, 1=korean-seller, 2=overseas-brand, 3=overseas-seller
  // ═══════════════════════════════════════════════════════
  const ROLE_AUD_IDX: Record<Role, number> = {
    "korean-brand": 0, "korean-seller": 1, "overseas-brand": 2, "overseas-seller": 3,
  };

  const AUD_CARDS = [
    { href: "/for-korean-brands", cls: "k-brand", img: "/images/k-brand.jpg", alt: "K-Beauty products", flagKo: "KOREA", typeKo: "BRAND", tKey: "1" },
    { href: "/for-korean-sellers", cls: "k-seller", img: "/images/k-seller.jpg", alt: "Live streaming seller", flagKo: "KOREA", typeKo: "SELLER · INFLUENCER", tKey: "2" },
    { href: "/for-overseas-brands", cls: "o-brand", img: "/images/o-brand.jpg", alt: "Global fashion brand", flagKo: "GLOBAL", typeKo: "BRAND", tKey: "3" },
    { href: "/for-overseas-sellers", cls: "o-seller", img: "/images/o-seller.jpg", alt: "Wanghong live commerce", flagKo: "GLOBAL", typeKo: "SELLER · WANGHONG", tKey: "4" },
  ];

  // ═══════════════════════════════════════════════════════
  // COMMON DATA (used when no role is selected)
  // ═══════════════════════════════════════════════════════
  const TAGS: Record<Lang, Array<{ label: string; pitch: string; href: string }>> = {
    ko: [
      { label: "한국 브랜드", pitch: "한국 브랜드라면 — 검증된 중국 왕홍 500+ 매칭 + 샤오홍슈·더우인·타오바오 라이브 운영 + 통관·정품·CS까지.", href: "/for-korean-brands" },
      { label: "해외 브랜드", pitch: "해외 브랜드라면 — 한국 정상급 연예인 100+, 한국 KOL 500+, 한국 라이브 플랫폼 운영, 드라마 PPL까지.", href: "/for-overseas-brands" },
      { label: "한국 셀러·인플루언서", pitch: "한국 셀러·인플루언서라면 — 중국 왕홍과 콜라보 라이브, 해외 브랜드 직공급, 크로스보더 정산·물류까지 풀세트.", href: "/for-korean-sellers" },
      { label: "중국 왕홍", pitch: "중국 왕홍이라면 — K-Beauty·K-Fashion 직공급, 한국 현지 촬영 지원, 한국 연예인 게스트 연결까지.", href: "/for-overseas-sellers" },
      { label: "한국 연예인", pitch: "한국 연예인 자원을 찾으신다면 — 정상급 100+ 협업 풀, 5단계 옵션을 단일 창구로 매칭합니다.", href: "/network" },
    ],
    en: [
      { label: "Korean Brands", pitch: "Verified 500+ Chinese KOL matching + Douyin/Xiaohongshu/Taobao live ops + customs, CS.", href: "/for-korean-brands" },
      { label: "Global Brands", pitch: "100+ Korean celebrities, 500+ KOLs, Korean live platform ops, drama PPL.", href: "/for-overseas-brands" },
      { label: "Korean Sellers", pitch: "Chinese KOL collab lives, global brand sourcing, cross-border settlement & logistics.", href: "/for-korean-sellers" },
      { label: "Chinese KOL", pitch: "K-Beauty/Fashion direct supply, Korean filming, celebrity guest matching.", href: "/for-overseas-sellers" },
      { label: "Korean Celebrities", pitch: "100+ top-tier collaboration pool, 5-tier options through a single window.", href: "/network" },
    ],
    zh: [
      { label: "韩国品牌", pitch: "500+中国达人匹配 + 小红书/抖音/淘宝直播运营 + 通关客服。", href: "/for-korean-brands" },
      { label: "海外品牌", pitch: "100+韩国艺人、500+KOL、韩国直播平台运营、电视剧PPL。", href: "/for-overseas-brands" },
      { label: "韩国卖家", pitch: "中国达人联名直播、海外品牌直供、跨境结算与物流。", href: "/for-korean-sellers" },
      { label: "中国达人", pitch: "K-Beauty/Fashion直供、韩国本地拍摄、韩国艺人嘉宾对接。", href: "/for-overseas-sellers" },
      { label: "韩国艺人", pitch: "100+顶级合作池、五档选项通过单一窗口匹配。", href: "/network" },
    ],
    ja: [
      { label: "韓国ブランド", pitch: "500+ 中国KOLマッチング + 小紅書/抖音/淘宝ライブ運営 + 通関CSまで。", href: "/for-korean-brands" },
      { label: "海外ブランド", pitch: "100+ 韓国芸能人、500+ KOL、韓国ライブプラットフォーム運営、ドラマPPL。", href: "/for-overseas-brands" },
      { label: "韓国セラー", pitch: "中国KOLコラボライブ、海外ブランド直供給、クロスボーダー精算・物流。", href: "/for-korean-sellers" },
      { label: "中国KOL", pitch: "K-Beauty/Fashion直供給、韓国現地撮影、韓国芸能人ゲスト連結。", href: "/for-overseas-sellers" },
      { label: "韓国芸能人", pitch: "100+ コラボプール、5段階オプションを単一窓口でマッチング。", href: "/network" },
    ],
  };

  const STMT: Record<Lang, { eyebrow: string; h: string; s: string; cta: string }> = {
    ko: { eyebrow: "왜 N-LIVE인가", h: "소개만 하는 곳이<br>아닙니다", s: "왕홍 찾아주고 끝나는 에이전시가 아닙니다. 매칭부터 라이브 운영, 물류, 정산, CS까지 — 한 팀이 끝까지 실행합니다.", cta: "실행 프로세스 보기" },
    en: { eyebrow: "WHY N-LIVE", h: "We don't just<br>introduce", s: "We're not an agency that finds you a KOL and walks away. From matching to live ops, logistics, settlement, CS — one team executes end to end.", cta: "See our process" },
    zh: { eyebrow: "为什么选择 N-LIVE", h: "不只是介绍<br>我们直接执行", s: "我们不是找完达人就结束的中介。从匹配到直播运营、物流、结算、客服 — 一个团队从头做到尾。", cta: "查看执行流程" },
    ja: { eyebrow: "なぜ N-LIVE か", h: "紹介だけの会社では<br>ありません", s: "KOLを見つけて終わるエージェンシーではありません。マッチングからライブ運営、物流、精算、CSまで — 一つのチームが最後まで実行します。", cta: "実行プロセスを見る" },
  };

  const METRIC_CATS = ["m-amber", "m-emerald", "m-azure", "m-coral"] as const;
  const TAG_CATS = ["k-brand", "o-brand", "k-seller", "o-seller", "k-brand"] as const;
  const tags = TAGS[lang];
  const stmt = STMT[lang];
  const heroContent = role ? ROLE_HERO[role][lang] : null;
  const currentRoleLabel = role ? ROLE_CARDS[role].ko : "";

  // Role-filtered data
  const filteredMetrics = role
    ? ROLE_METRIC_IDX[role].map(i => ALL_METRICS[lang][i])
    : ALL_METRICS[lang];
  const filteredCases = role
    ? ROLE_CASE_IDX[role].map(i => ALL_CASES[lang][i])
    : ALL_CASES[lang];
  const processSteps = role
    ? ROLE_STEPS[role][lang]
    : ROLE_STEPS["korean-brand"][lang]; // fallback
  const finalCta = role
    ? ROLE_FINAL_CTA[role][lang]
    : null;

  // Marquees (common)
  const marquee1 = [
    "KOREA × GLOBAL", "한국 × 해외", "韩国 × 海外",
    "BRAND × SELLER", "브랜드 × 셀러", "品牌 × 卖家",
    "LIVE COMMERCE", "라이브커머스", "直播电商",
    "N-LIVE · 恩联 · 엔라이브",
  ];

  return (
    <>
      {/* ══════ ROLE SELECTOR OVERLAY ══════ */}
      {showSelector && (
        <div className={`role-selector-overlay ${fadeOut ? "fade-out" : ""}`}>
          <MeteorBackground />
          <div className="role-selector-inner">
            <div className="role-selector-logo">
              <Image src="/logo.svg" alt="N-LIVE" width={44} height={44} />
            </div>
            <div className="role-selector-eyebrow">LIVE COMMERCE AGENCY</div>
            <h1 className="role-selector-title">
              <span className="rst-ko">귀사에 맞는 서비스를 안내드리겠습니다</span>
              <span className="rst-intl">Select your business type &nbsp;/&nbsp; 请选择贵司的业务类型</span>
            </h1>
            <div className="role-selector-grid">
              {(["korean-brand", "korean-seller", "overseas-brand", "overseas-seller"] as Role[]).map((r) => (
                <button key={r} className={`role-selector-card ${r}`} onClick={() => selectRole(r)} type="button">
                  <span className="rsc-tag">{ROLE_CARDS[r].tag}</span>
                  <span className="rsc-ko">{ROLE_CARDS[r].ko}</span>
                  <span className="rsc-intl">{ROLE_CARDS[r].en} &nbsp;/&nbsp; {ROLE_CARDS[r].zh}</span>
                  <span className="rsc-arrow">&rarr;</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════ HERO ══════ */}
      <section className={`hero ${!showSelector && role ? "hero-entered" : ""}`}>
        <MeteorBackground />
        <div className="container hero-content">
          {role && !showSelector && (
            <button className="hero-role-badge" onClick={changeRole} type="button">
              <span className="hrb-dot" />
              {currentRoleLabel}
              <span className="hero-role-change">{lang === "ko" ? "변경" : lang === "en" ? "Change" : lang === "zh" ? "更换" : "変更"}</span>
            </button>
          )}

          <div className="hero-eyebrow">{t("hero.eyebrow")}</div>
          <h1 className="hero-title">
            <span className="line-mask"><span className="line-inner">{heroContent ? heroContent.title1 : t("hero.title.1")}</span></span>
            <span className="line-mask"><span className="line-inner"><em>{heroContent ? heroContent.title2 : t("hero.title.2")}</em></span></span>
          </h1>

          {/* Tag buttons: ONLY show when NO role is selected */}
          {!role && (
            <>
              <div className="hero-tags-label">{t("hero.tag.label")}</div>
              <div className="hero-tags">
                {tags.map((tag, i) => (
                  <button key={i} className={`hero-tag ${activeTag === i ? "active" : ""}`} data-cat={TAG_CATS[i] || "k-brand"} onClick={() => setActiveTag(activeTag === i ? null : i)} type="button">
                    {tag.label}
                    <span className="hero-tag-arrow">{activeTag === i ? "−" : "+"}</span>
                  </button>
                ))}
              </div>
              {activeTag !== null && (
                <div className="tag-panel" key={activeTag} data-cat={TAG_CATS[activeTag] || "k-brand"}>
                  <p className="tag-panel-text">{tags[activeTag].pitch}</p>
                  <Link href={tags[activeTag].href} className="tag-panel-cta">
                    {lang === "ko" ? "자세히 보기" : lang === "en" ? "Learn more" : lang === "zh" ? "查看详情" : "詳細を見る"} →
                  </Link>
                </div>
              )}
            </>
          )}

          <p className="hero-sub">{heroContent ? heroContent.sub : t("hero.sub")}</p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">{heroContent ? heroContent.cta1 : t("hero.cta1")} →</Link>
            <Link href={role ? ROLE_DETAIL[role] : "#services"} className="btn btn-outline">{heroContent ? heroContent.cta2 : t("hero.cta2")}</Link>
          </div>
        </div>
      </section>

      {/* ══════ MARQUEE ══════ */}
      <Marquee items={marquee1} />

      {/* ══════ PURPOSE HUB — "무엇을 원하시나요?" ══════ */}
      {role && !showSelector && (
        <section className="purpose-hub">
          <div className="container">
            <div className="section-eyebrow">— {lang === "ko" ? "WHAT DO YOU NEED? · 무엇을 원하시나요?" : lang === "en" ? "WHAT DO YOU NEED?" : lang === "zh" ? "您需要什么服务？" : "何をお求めですか？"}</div>
            <h2 className="section-title section-title-huge">{lang === "ko" ? "필요한 서비스를 선택하세요" : lang === "en" ? "Select the service you need" : lang === "zh" ? "请选择您需要的服务" : "必要なサービスを選択してください"}</h2>
            <div className="purpose-grid">
              {ROLE_PURPOSES[role][lang].map((pc, i) => (
                <Link href={pc.anchor} className="purpose-card" key={i}>
                  <span className="pc-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="pc-body">
                    <div className="pc-title">{pc.t}</div>
                    <p className="pc-desc">{pc.d}</p>
                    <span className="pc-cta">{pc.cta}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════ STATEMENT (common — always show) ══════ */}
      <section className="statement-block">
        <div className="container">
          <div className="statement-eyebrow">— {stmt.eyebrow}</div>
          <h2 className="statement-headline" dangerouslySetInnerHTML={{ __html: stmt.h }} />
          <div className="statement-bottom">
            <p className="statement-sub">{stmt.s}</p>
            <Link href="/process" className="btn-statement">{stmt.cta} →</Link>
          </div>
        </div>
      </section>

      {/* ══════ AUDIENCE CARDS — role-filtered ══════ */}
      <section className="audience" id="services">
        <div className="container">
          {!role ? (
            <>
              {/* No role: show all 4 cards equally */}
              <div className="section-header section-header-big">
                <div className="section-eyebrow">— {lang === "ko" ? "FOUR AXES · 네 가지 축" : lang === "en" ? "FOUR AXES" : lang === "zh" ? "四大轴向" : "FOUR AXES · 4つの軸"}</div>
                <h2 className="section-title section-title-huge" dangerouslySetInnerHTML={{ __html: t("aud.title") }} />
                <p className="section-desc section-desc-big">{t("aud.desc")}</p>
              </div>
              <div className="audience-matrix">
                {AUD_CARDS.map((card, i) => (
                  <Link href={card.href} className={`audience-card ${card.cls}`} key={i}>
                    <div className="aud-img"><Image src={card.img} alt={card.alt} fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: "cover" }} /></div>
                    <div className="aud-overlay" />
                    <div className="aud-content">
                      <div className="aud-tag"><span className="aud-flag">{card.flagKo}</span><span className="aud-type">{card.typeKo}</span></div>
                      <h3>{t(`aud.${card.tKey}.t`)}</h3>
                      <p className="aud-need">{t(`aud.${card.tKey}.n`)}</p>
                      <span className="aud-detail-link">{t("aud.detail")}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Role selected: show ONLY my card as featured */}
              <div className="section-header section-header-big">
                <div className="section-eyebrow">— {lang === "ko" ? "YOUR SERVICE · 맞춤 서비스" : lang === "en" ? "YOUR SERVICE" : lang === "zh" ? "您的专属服务" : "YOUR SERVICE · あなた専用"}</div>
                <h2 className="section-title section-title-huge">{lang === "ko" ? "이 서비스가 당신을 위한 것입니다" : lang === "en" ? "This service is built for you" : lang === "zh" ? "这是为您量身打造的服务" : "このサービスはあなたのためのものです"}</h2>
              </div>
              <div className="audience-matrix audience-matrix-single">
                {(() => {
                  const idx = ROLE_AUD_IDX[role];
                  const card = AUD_CARDS[idx];
                  return (
                    <Link href={card.href} className={`audience-card ${card.cls} audience-card-featured`}>
                      <div className="aud-img"><Image src={card.img} alt={card.alt} fill sizes="100vw" style={{ objectFit: "cover" }} /></div>
                      <div className="aud-overlay" />
                      <div className="aud-content">
                        <div className="aud-tag"><span className="aud-flag">{card.flagKo}</span><span className="aud-type">{card.typeKo}</span></div>
                        <h3>{t(`aud.${card.tKey}.t`)}</h3>
                        <p className="aud-need">{t(`aud.${card.tKey}.n`)}</p>
                        <span className="aud-detail-link">{t("aud.detail")} →</span>
                      </div>
                    </Link>
                  );
                })()}
              </div>
              {/* Role-specific service features grid */}
              <div className="role-features-grid">
                {ROLE_FEATURES[role][lang].map((f, i) => (
                  <div className="role-feature-card" key={i}>
                    <div className="rf-num">{f.icon}</div>
                    <div className="rf-body">
                      <div className="rf-title">{f.t}</div>
                      <p className="rf-desc">{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ══════ METRICS — role-filtered (2 or 4) ══════ */}
      <section className="metrics topo-bg section-grain">
        <div className="container">
          <div className="metrics-eyebrow">— {lang === "ko" ? "검증된 네트워크" : lang === "en" ? "VERIFIED NETWORK" : lang === "zh" ? "经验证的网络" : "検証済みネットワーク"}</div>
          <div className={`metrics-grid ${role ? "metrics-grid-compact" : ""}`}>
            {filteredMetrics.map((item, i) => (
              <div className={`metric-card ${METRIC_CATS[i % METRIC_CATS.length]}`} key={i}>
                <div className="metric-num-big">{item.n}</div>
                <div className="metric-label">{item.label}</div>
                <div className="metric-sub">{item.sub}</div>
              </div>
            ))}
          </div>
          {/* Trust proof strip — role-specific */}
          {role && (
            <div className="trust-proof-strip">
              {ROLE_TRUST[role][lang].map((item, i) => (
                <div className="tp-item" key={i}>
                  <span className="tp-dot" />
                  <span className="tp-text">{item}</span>
                </div>
              ))}
            </div>
          )}
          <div className="metrics-bottom">
            <p>{lang === "ko" ? "모든 파트너는 직접 미팅을 거친 후에만 매칭됩니다." : lang === "en" ? "Every partner is matched only after a direct meeting." : lang === "zh" ? "每位合作方均在亲自面谈后才进行匹配。" : "すべてのパートナーは直接ミーティングを経た後にのみマッチングされます。"}</p>
            <Link href="/network">{lang === "ko" ? "네트워크 자세히 보기 →" : lang === "en" ? "See network →" : lang === "zh" ? "查看网络 →" : "ネットワーク詳細 →"}</Link>
          </div>
        </div>
      </section>

      {/* ══════ CASE HIGHLIGHTS — role-filtered ══════ */}
      <section className="case-highlights">
        <div className="container">
          <div className="section-eyebrow">— {lang === "ko" ? "PROVEN RESULTS · 검증된 성과" : lang === "en" ? "PROVEN RESULTS" : lang === "zh" ? "验证的成果" : "PROVEN RESULTS · 検証された成果"}</div>
          <h2 className="section-title section-title-huge">{lang === "ko" ? "숫자로 증명합니다" : lang === "en" ? "Backed by numbers" : lang === "zh" ? "用数字证明" : "数字で証明します"}</h2>
          <div className={`case-highlight-grid ${role ? "case-highlight-grid-compact" : ""}`}>
            {filteredCases.map((c, i) => (
              <div className={`case-highlight-card ${c.cat}`} key={i}>
                <div className="ch-num">{c.num}</div>
                <div className="ch-brand">{c.brand}</div>
                <p className="ch-desc">{c.desc}</p>
              </div>
            ))}
          </div>
          {/* Case insight — role-specific testimonial */}
          {role && (
            <div className="case-insight">
              <blockquote className="ci-quote">{ROLE_CASE_INSIGHT[role][lang].quote}</blockquote>
              <div className="ci-from">{ROLE_CASE_INSIGHT[role][lang].from}</div>
              <div className="ci-extra">{ROLE_CASE_INSIGHT[role][lang].extra}</div>
            </div>
          )}
          <p className="case-highlight-note">{lang === "ko" ? "위 사례는 공개 보도 기반입니다. 프로젝트별 상세 데이터는 NDA 체결 후 공유드립니다." : lang === "zh" ? "以上案例基于公开报道。项目详细数据可在签署NDA后共享。" : lang === "ja" ? "上記事例は公開報道に基づいています。" : "Cases above are based on public reporting."}</p>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link href="/contact" className="btn btn-primary">{lang === "ko" ? "내 브랜드에 맞는 사례 듣기 →" : lang === "zh" ? "了解适合我品牌的案例 →" : lang === "ja" ? "自社ブランドに合う事例を聞く →" : "Hear cases for my brand →"}</Link>
          </div>
        </div>
      </section>

      {/* ══════ TRUST & PROCESS — role-specific steps ══════ */}
      <section className="trust-process">
        <div className="container">
          <div className="section-eyebrow">— {lang === "ko" ? "HOW WE WORK · 이렇게 진행됩니다" : lang === "en" ? "HOW WE WORK" : lang === "zh" ? "我们的工作方式" : "HOW WE WORK · 進め方"}</div>
          <h2 className="section-title">{lang === "ko" ? "문의부터 실행까지, 5단계" : lang === "en" ? "From inquiry to execution — 5 steps" : lang === "zh" ? "从咨询到执行，5步搞定" : "問い合わせから実行まで5ステップ"}</h2>
          <div className="trust-steps">
            {processSteps.map((s, i) => (
              <div className="trust-step" key={i}>
                <div className="ts-num">{s.n}</div>
                <div className="ts-body">
                  <div className="ts-title">{s.t}</div>
                  <p className="ts-desc">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="trust-badges">
            {[
              lang === "ko" ? "최소 물량 제한 없음" : lang === "zh" ? "无最低量限制" : lang === "ja" ? "最小数量制限なし" : "No minimum order",
              lang === "ko" ? "트라이얼 1회 가능" : lang === "zh" ? "可试播1次" : lang === "ja" ? "トライアル1回可能" : "1-time trial OK",
              lang === "ko" ? "사전 NDA 가능" : lang === "zh" ? "可事前签NDA" : lang === "ja" ? "事前NDA可能" : "Pre-NDA available",
              lang === "ko" ? "3개 국어 소통" : lang === "zh" ? "中韩英三语" : lang === "ja" ? "3言語対応" : "KO/ZH/EN",
              lang === "ko" ? "위약금 없음" : lang === "zh" ? "无违约金" : lang === "ja" ? "違約金なし" : "No penalty",
            ].map((badge, i) => (
              <span className="trust-badge" key={i}>{badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ K-PRODUCT SHOWCASE — overseas-brand & overseas-seller ══════ */}
      {(role === "overseas-brand" || role === "overseas-seller") && (
        <section className="k-product-showcase" id="k-product">
          <div className="container">
            <div className="section-eyebrow">— {lang === "ko" ? "K-BRAND SOURCING · 한국 제품 소싱" : lang === "en" ? "K-BRAND SOURCING" : lang === "zh" ? "K-品牌产品采购" : "K-BRANDソーシング"}</div>
            <h2 className="section-title">{lang === "ko" ? "한국에서 검증된 제품을 직접 연결합니다" : lang === "en" ? "Directly sourced products verified in Korea" : lang === "zh" ? "直接对接在韩国经验证的产品" : "韓国で検証済みの商品を直接連結します"}</h2>
            <p className="kps-sub">{lang === "ko" ? "한국 시장 진출 시, 연예인·KOL 마케팅과 함께 한국 인기 제품을 직접 소싱하여 브랜드 포트폴리오를 확장할 수 있습니다." : lang === "en" ? "When entering the Korean market, expand your brand portfolio by directly sourcing trending Korean products alongside celebrity & KOL marketing." : lang === "zh" ? "进入韩国市场时，可在艺人·KOL营销的同时直接采购韩国热门产品，扩展品牌产品组合。" : "韓国市場進出時、芸能人・KOLマーケティングと共に韓国の人気商品を直接ソーシングしてブランドポートフォリオを拡張できます。"}</p>
            <div className="kps-grid">
              {K_PRODUCT_SHOWCASE[lang].map((item, i) => (
                <div className="kps-card" key={i}>
                  <div className="kps-category">{item.category}</div>
                  <div className="kps-examples">{item.examples}</div>
                  <p className="kps-desc">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="kps-bottom">
              <Link href="/contact" className="btn btn-primary">{lang === "ko" ? "K-브랜드 소싱 상담 →" : lang === "en" ? "K-Brand sourcing consultation →" : lang === "zh" ? "K-品牌采购咨询 →" : "K-ブランドソーシング相談 →"}</Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════ FAQ — role-specific ══════ */}
      {role && !showSelector && (
        <section className="role-faq">
          <div className="container">
            <div className="section-eyebrow">— {lang === "ko" ? "FAQ · 자주 묻는 질문" : lang === "en" ? "FREQUENTLY ASKED" : lang === "zh" ? "常见问题" : "よくある質問"}</div>
            <h2 className="section-title">{lang === "ko" ? "궁금한 점이 있으신가요?" : lang === "en" ? "Have questions?" : lang === "zh" ? "有疑问吗？" : "ご質問はありますか？"}</h2>
            <div className="faq-list">
              {ROLE_FAQ[role][lang].map((faq, i) => (
                <div className={`faq-item ${openFaq === i ? "faq-open" : ""}`} key={i}>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} type="button">
                    <span>{faq.q}</span>
                    <span className="faq-toggle">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && <div className="faq-a"><p>{faq.a}</p></div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════ FINAL CTA — role-specific ══════ */}
      <section className="final-cta">
        <div className="container">
          <h2 className="final-cta-title">
            {finalCta ? finalCta.h : (lang === "ko" ? "지금 시작하지 않으면, 경쟁사가 먼저 합니다" : lang === "en" ? "If you don't start now, your competitors will" : lang === "zh" ? "现在不开始，竞争对手就先行一步" : "今始めなければ、競合が先に動きます")}
          </h2>
          <p className="final-cta-sub">
            {finalCta ? finalCta.sub : (lang === "ko" ? "첫 미팅은 무료, 리스크는 제로. 30분이면 가능성을 확인할 수 있습니다." : lang === "en" ? "First meeting is free, zero risk. 30 minutes to discover the opportunity." : lang === "zh" ? "首次会议免费，零风险。30分钟即可确认可能性。" : "初回ミーティング無料、リスクゼロ。30分で可能性を確認できます。")}
          </p>
          <div className="final-cta-buttons">
            <Link href="/contact" className="btn btn-primary">
              {finalCta ? finalCta.btn1 : (lang === "ko" ? "맞춤 제안서 요청 →" : lang === "en" ? "Request custom proposal →" : lang === "zh" ? "定制方案咨询 →" : "カスタム提案書リクエスト →")}
            </Link>
            <Link href="/contact" className="btn btn-outline">
              {finalCta ? finalCta.btn2 : (lang === "ko" ? "무료 컨셉 미팅 예약 →" : lang === "en" ? "Book free concept meeting →" : lang === "zh" ? "预约免费概念会议 →" : "無料コンセプトMTG予約 →")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
