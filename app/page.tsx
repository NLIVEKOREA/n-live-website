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
      ko: { title1: "당신의 브랜드를", title2: "중국 라이브에 올립니다", sub: "왕홍 500+ 매칭 · 더우인·샤오홍슈·타오바오 라이브 운영 · 통관·정산·CS까지 — 원스톱.", cta1: "중국 진출 상담 시작", cta2: "서비스 상세 보기" },
      en: { title1: "Put your brand", title2: "on China's live stream", sub: "500+ KOL matching · Douyin/Xiaohongshu/Taobao live ops · customs, settlement, CS — all-in-one.", cta1: "Start China entry consultation", cta2: "See service details" },
      zh: { title1: "把您的品牌", title2: "搬上中国直播间", sub: "500+ 达人匹配 · 抖音/小红书/淘宝直播运营 · 通关/结算/客服 — 一站式服务。", cta1: "开始中国市场咨询", cta2: "查看服务详情" },
      ja: { title1: "あなたのブランドを", title2: "中国ライブに載せます", sub: "500+ KOLマッチング · 抖音/小紅書/淘宝ライブ運営 · 通関・精算・CSまでワンストップ。", cta1: "中国進出相談を始める", cta2: "サービス詳細を見る" },
    },
    "korean-seller": {
      ko: { title1: "해외 브랜드 직공급 ×", title2: "왕홍 콜라보 라이브", sub: "브랜드 소싱 · 왕홍 콜라보 기획 · 한중 이중 콘텐츠 · 크로스보더 정산·물류까지 풀세트 지원.", cta1: "셀러 전용 상담 시작", cta2: "셀러 서비스 보기" },
      en: { title1: "Direct brand supply ×", title2: "KOL collab live", sub: "Brand sourcing · KOL collab planning · KR-CN dual content · cross-border settlement & logistics — full stack.", cta1: "Start seller consultation", cta2: "See seller services" },
      zh: { title1: "海外品牌直供 ×", title2: "达人联名直播", sub: "品牌货源 · 达人联名企划 · 中韩双语内容 · 跨境结算物流 — 全栈支持。", cta1: "开始卖家专属咨询", cta2: "查看卖家服务" },
      ja: { title1: "海外ブランド直供給 ×", title2: "KOLコラボライブ", sub: "ブランドソーシング · KOLコラボ企画 · 韓中デュアルコンテンツ · クロスボーダー精算・物流までフルサポート。", cta1: "セラー専用相談を始める", cta2: "セラーサービスを見る" },
    },
    "overseas-brand": {
      ko: { title1: "한국 셀러브리티 100+", title2: "당신의 브랜드와 연결합니다", sub: "연예인 매칭 · KOL 캠페인 · 한국 라이브 플랫폼 운영 · 드라마 PPL까지 — 한국 시장 진출의 모든 채널.", cta1: "한국 진출 상담 시작", cta2: "서비스 상세 보기" },
      en: { title1: "100+ Korean celebrities", title2: "connected to your brand", sub: "Celebrity matching · KOL campaigns · Korean live platform ops · drama PPL — every channel for Korean market entry.", cta1: "Start Korea entry consultation", cta2: "See service details" },
      zh: { title1: "100+ 韩国明星", title2: "与您的品牌连接", sub: "艺人匹配 · KOL营销 · 韩国直播平台运营 · 电视剧PPL — 进入韩国市场的所有渠道。", cta1: "开始韩国市场咨询", cta2: "查看服务详情" },
      ja: { title1: "韓国セレブリティ100+", title2: "あなたのブランドと繋ぎます", sub: "芸能人マッチング · KOLキャンペーン · 韓国ライブプラットフォーム運営 · ドラマPPLまで — 韓国市場参入のすべて。", cta1: "韓国進出相談を始める", cta2: "サービス詳細を見る" },
    },
    "overseas-seller": {
      ko: { title1: "K-Beauty · K-Fashion", title2: "직공급 + 한국 현지 지원", sub: "한국 브랜드 소싱 · 현지 촬영 지원 · 한국 연예인 게스트 연결 · 크로스보더 물류까지.", cta1: "왕홍 전용 상담 시작", cta2: "왕홍 서비스 보기" },
      en: { title1: "K-Beauty · K-Fashion", title2: "direct supply + Korea support", sub: "Korean brand sourcing · on-site filming support · Korean celebrity guest matching · cross-border logistics.", cta1: "Start KOL consultation", cta2: "See KOL services" },
      zh: { title1: "K-Beauty · K-Fashion", title2: "直供 + 韩国本地支持", sub: "韩国品牌货源 · 韩国本地拍摄支持 · 韩国艺人嘉宾对接 · 跨境物流全覆盖。", cta1: "开始达人专属咨询", cta2: "查看达人服务" },
      ja: { title1: "K-Beauty · K-Fashion", title2: "直供給 + 韓国現地サポート", sub: "韓国ブランドソーシング · 現地撮影サポート · 韓国芸能人ゲスト連結 · クロスボーダー物流まで。", cta1: "KOL専用相談を始める", cta2: "KOLサービスを見る" },
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
      ko: { h: "중국 라이브커머스, 지금 테스트해보세요", sub: "첫 미팅 무료, 트라이얼 1회 가능. 왕홍 매칭부터 라이브 운영까지 한 팀이 실행합니다.", btn1: "왕홍 매칭 상담 시작 →", btn2: "맞춤 제안서 요청 →" },
      en: { h: "Test China live commerce now", sub: "First meeting free, trial available. One team from KOL matching to live ops.", btn1: "Start KOL matching consultation →", btn2: "Request custom proposal →" },
      zh: { h: "现在就测试中国直播电商", sub: "首次会议免费，可试播一次。从达人匹配到直播运营，一个团队执行。", btn1: "开始达人匹配咨询 →", btn2: "请求定制方案 →" },
      ja: { h: "中国ライブコマース、今テストしてみませんか", sub: "初回ミーティング無料、トライアル可能。KOLマッチングからライブ運営まで一つのチームが実行。", btn1: "KOLマッチング相談開始 →", btn2: "カスタム提案書リクエスト →" },
    },
    "korean-seller": {
      ko: { h: "해외 브랜드 소싱 + 왕홍 콜라보, 지금 시작하세요", sub: "직공급 브랜드 리스트와 왕홍 콜라보 기회를 무료 미팅에서 확인하세요.", btn1: "셀러 전용 상담 시작 →", btn2: "공급 가능 브랜드 문의 →" },
      en: { h: "Start global brand sourcing + KOL collabs now", sub: "See direct supply brand lists and collab opportunities in a free meeting.", btn1: "Start seller consultation →", btn2: "Inquire about available brands →" },
      zh: { h: "海外品牌货源 + 达人联名，现在开始", sub: "在免费会议中查看直供品牌清单和联名机会。", btn1: "开始卖家专属咨询 →", btn2: "咨询可供品牌 →" },
      ja: { h: "海外ブランドソーシング + KOLコラボ、今始めましょう", sub: "直供給ブランドリストとコラボ機会を無料ミーティングで確認。", btn1: "セラー専用相談開始 →", btn2: "供給可能ブランドお問い合わせ →" },
    },
    "overseas-brand": {
      ko: { h: "한국 셀러브리티 × 당신의 브랜드, 가능성을 확인하세요", sub: "연예인 100+, KOL 200+ 중 최적의 후보를 제안합니다. 첫 미팅 무료.", btn1: "한국 진출 상담 시작 →", btn2: "연예인 매칭 옵션 보기 →" },
      en: { h: "Korean celebrities × your brand — discover the possibilities", sub: "We propose optimal candidates from 100+ celebrities and 200+ KOLs. First meeting free.", btn1: "Start Korea entry consultation →", btn2: "See celebrity matching options →" },
      zh: { h: "韩国明星 × 您的品牌，确认可能性", sub: "从100+艺人和200+KOL中推荐最佳候选。首次会议免费。", btn1: "开始韩国市场咨询 →", btn2: "查看艺人匹配选项 →" },
      ja: { h: "韓国セレブリティ × あなたのブランド、可能性を確認", sub: "100+芸能人、200+KOLから最適な候補を提案します。初回ミーティング無料。", btn1: "韓国進出相談開始 →", btn2: "芸能人マッチングオプションを見る →" },
    },
    "overseas-seller": {
      ko: { h: "K-뷰티 · K-패션 직공급, 한국에서 시작하세요", sub: "150+ 검증 브랜드 직공급 + 한국 현지 촬영 지원 + 연예인 게스트 연결.", btn1: "왕홍 전용 상담 시작 →", btn2: "K-브랜드 직공급 문의 →" },
      en: { h: "K-Beauty · K-Fashion direct supply, start from Korea", sub: "150+ verified brand direct supply + Korea filming support + celebrity guest matching.", btn1: "Start KOL consultation →", btn2: "Inquire about K-brand supply →" },
      zh: { h: "K-Beauty · K-Fashion直供，从韩国开始", sub: "150+经验证品牌直供 + 韩国本地拍摄支持 + 艺人嘉宾对接。", btn1: "开始达人专属咨询 →", btn2: "咨询K-品牌直供 →" },
      ja: { h: "K-Beauty · K-Fashion直供給、韓国からスタート", sub: "150+検証済みブランド直供給 + 韓国現地撮影サポート + 芸能人ゲスト連結。", btn1: "KOL専用相談開始 →", btn2: "K-ブランド直供給お問い合わせ →" },
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

      {/* ══════ K-PRODUCT SHOWCASE — overseas-brand only ══════ */}
      {role === "overseas-brand" && (
        <section className="k-product-showcase">
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
