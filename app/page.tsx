"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/components/LangContext";
import Marquee from "@/components/Marquee";
import MeteorBackground from "@/components/MeteorBackground";
import type { Lang } from "@/lib/i18n";

type Role = "korean-brand" | "korean-seller" | "overseas-brand" | "overseas-seller";

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
  };

  // Role-specific hero content per language
  const ROLE_HERO: Record<Role, Record<Lang, { title1: string; title2: string; sub: string; cta: string }>> = {
    "korean-brand": {
      ko: { title1: "당신의 브랜드를", title2: "중국 라이브에 올립니다", sub: "왕홍 500+ 매칭 · 더우인·샤오홍슈·타오바오 라이브 운영 · 통관·정산·CS까지 — 원스톱.", cta: "중국 진출 상담 시작" },
      en: { title1: "Put your brand", title2: "on China's live stream", sub: "500+ KOL matching · Douyin/Xiaohongshu/Taobao live ops · customs, settlement, CS — all-in-one.", cta: "Start China entry consultation" },
      zh: { title1: "把您的品牌", title2: "搬上中国直播间", sub: "500+ 达人匹配 · 抖音/小红书/淘宝直播运营 · 通关/结算/客服 — 一站式服务。", cta: "开始中国市场咨询" },
      ja: { title1: "あなたのブランドを", title2: "中国ライブに載せます", sub: "500+ KOLマッチング · 抖音/小紅書/淘宝ライブ運営 · 通関・精算・CSまでワンストップ。", cta: "中国進出相談を始める" },
    },
    "korean-seller": {
      ko: { title1: "해외 브랜드 직공급 ×", title2: "왕홍 콜라보 라이브", sub: "브랜드 소싱 · 왕홍 콜라보 기획 · 한중 이중 콘텐츠 · 크로스보더 정산·물류까지 풀세트 지원.", cta: "셀러 전용 상담 시작" },
      en: { title1: "Direct brand supply ×", title2: "KOL collab live", sub: "Brand sourcing · KOL collab planning · KR-CN dual content · cross-border settlement & logistics — full stack.", cta: "Start seller consultation" },
      zh: { title1: "海外品牌直供 ×", title2: "达人联名直播", sub: "品牌货源 · 达人联名企划 · 中韩双语内容 · 跨境结算物流 — 全栈支持。", cta: "开始卖家专属咨询" },
      ja: { title1: "海外ブランド直供給 ×", title2: "KOLコラボライブ", sub: "ブランドソーシング · KOLコラボ企画 · 韓中デュアルコンテンツ · クロスボーダー精算・物流までフルサポート。", cta: "セラー専用相談を始める" },
    },
    "overseas-brand": {
      ko: { title1: "한국 셀러브리티 100+", title2: "당신의 브랜드와 연결합니다", sub: "연예인 매칭 · KOL 캠페인 · 한국 라이브 플랫폼 운영 · 드라마 PPL까지 — 한국 시장 진출의 모든 채널.", cta: "한국 진출 상담 시작" },
      en: { title1: "100+ Korean celebrities", title2: "connected to your brand", sub: "Celebrity matching · KOL campaigns · Korean live platform ops · drama PPL — every channel for Korean market entry.", cta: "Start Korea entry consultation" },
      zh: { title1: "100+ 韩国明星", title2: "与您的品牌连接", sub: "艺人匹配 · KOL营销 · 韩国直播平台运营 · 电视剧PPL — 进入韩国市场的所有渠道。", cta: "开始韩国市场咨询" },
      ja: { title1: "韓国セレブリティ100+", title2: "あなたのブランドと繋ぎます", sub: "芸能人マッチング · KOLキャンペーン · 韓国ライブプラットフォーム運営 · ドラマPPLまで — 韓国市場参入のすべて。", cta: "韓国進出相談を始める" },
    },
    "overseas-seller": {
      ko: { title1: "K-Beauty · K-Fashion", title2: "직공급 + 한국 현지 지원", sub: "한국 브랜드 소싱 · 현지 촬영 지원 · 한국 연예인 게스트 연결 · 크로스보더 물류까지.", cta: "왕홍 전용 상담 시작" },
      en: { title1: "K-Beauty · K-Fashion", title2: "direct supply + Korea support", sub: "Korean brand sourcing · on-site filming support · Korean celebrity guest matching · cross-border logistics.", cta: "Start KOL consultation" },
      zh: { title1: "K-Beauty · K-Fashion", title2: "直供 + 韩国本地支持", sub: "韩国品牌货源 · 韩国本地拍摄支持 · 韩国艺人嘉宾对接 · 跨境物流全覆盖。", cta: "开始达人专属咨询" },
      ja: { title1: "K-Beauty · K-Fashion", title2: "直供給 + 韓国現地サポート", sub: "韓国ブランドソーシング · 現地撮影サポート · 韓国芸能人ゲスト連結 · クロスボーダー物流まで。", cta: "KOL専用相談を始める" },
    },
  };

  // Role selector — trilingual labels (KO / EN / ZH shown simultaneously)
  const ROLE_CARDS: Record<Role, { ko: string; en: string; zh: string; tag: string }> = {
    "korean-brand":   { ko: "한국 브랜드",           en: "Korean Brand",              zh: "韩国品牌",     tag: "BRAND → CHINA" },
    "korean-seller":  { ko: "한국 셀러 · 인플루언서", en: "Korean Seller · Influencer", zh: "韩国卖家 · 达人", tag: "SELLER × KOL" },
    "overseas-brand": { ko: "해외 브랜드",           en: "Global Brand",              zh: "海外品牌",     tag: "BRAND → KOREA" },
    "overseas-seller":{ ko: "해외 셀러 · 왕홍",      en: "Global Seller · KOL",       zh: "海外卖家 · 达人", tag: "K-SUPPLY" },
  };

  // Tag interactive panels — what each audience can do with us
  const TAGS: Record<Lang, Array<{ label: string; pitch: string; href: string }>> = {
    ko: [
      { label: "한국 브랜드", pitch: "한국 브랜드라면 — 검증된 중국 왕홍 500+ 매칭 + 샤오홍슈·더우인·타오바오 라이브 운영 + 통관·정품·CS까지. 중국 진출에 필요한 모든 인프라를 단일 창구로 제공합니다.", href: "/for-korean-brands" },
      { label: "해외 브랜드", pitch: "해외 브랜드라면 — 한국 정상급 연예인 100+, 한국 KOL 500+, 한국 라이브 플랫폼 운영, 드라마 PPL까지. 한국 시장 진출의 모든 채널을 한 곳에서.", href: "/for-overseas-brands" },
      { label: "한국 셀러·인플루언서", pitch: "한국 셀러·인플루언서라면 — 중국 왕홍과 콜라보 라이브, 해외 브랜드 직공급, 한중 이중 콘텐츠 기획, 크로스보더 정산·물류까지 풀세트 지원합니다.", href: "/for-korean-sellers" },
      { label: "중국 왕홍", pitch: "중국 왕홍이라면 — K-Beauty·K-Fashion·잡화 직공급, 한국 현지 촬영 지원, 한국 연예인·KOL 콜라보 게스트 연결까지 모두 가능합니다.", href: "/for-overseas-sellers" },
      { label: "한국 연예인", pitch: "한국 연예인 자원을 찾으신다면 — 정상급 100+ 협업 풀, 기본 협찬·프리미엄·유가·SNS·드라마 PPL 5단계 옵션을 단일 창구로 매칭합니다.", href: "/network" },
    ],
    en: [
      { label: "Korean Brands", pitch: "If you're a Korean brand — verified 500+ Chinese wanghong matching + Xiaohongshu/Douyin/Taobao live operations + customs, authentication, and CS. Every channel for entering China through one window.", href: "/for-korean-brands" },
      { label: "Global Brands", pitch: "If you're a global brand — 100+ top-tier Korean celebrities, 500+ Korean KOLs, Korean live platform operations, drama PPL. Every channel for Korean market entry, in one place.", href: "/for-overseas-brands" },
      { label: "Korean Sellers · Influencers", pitch: "If you're a Korean seller or influencer — Chinese wanghong collab lives, direct global brand sourcing, Korea-China dual content planning, cross-border settlement & logistics. Full-stack support.", href: "/for-korean-sellers" },
      { label: "Chinese Wanghong", pitch: "If you're a Chinese wanghong — K-Beauty/K-Fashion/accessory direct supply, Korean on-site filming support, Korean celebrity & KOL collaboration guest matching. All available.", href: "/for-overseas-sellers" },
      { label: "Korean Celebrities", pitch: "Looking for Korean celebrity resources — 100+ top-tier collaboration pool, 5-tier options from basic sponsorship to drama PPL, all matched through a single window.", href: "/network" },
    ],
    zh: [
      { label: "韩国品牌", pitch: "如果您是韩国品牌 — 经验证的 500+ 中国达人匹配 + 小红书/抖音/淘宝直播运营 + 通关、正品、客服。进入中国所需的所有基础设施,通过单一窗口提供。", href: "/for-korean-brands" },
      { label: "海外品牌", pitch: "如果您是海外品牌 — 100+ 韩国顶级艺人、500+ 韩国 KOL、韩国直播平台运营、电视剧 PPL。进入韩国市场的所有渠道,集于一处。", href: "/for-overseas-brands" },
      { label: "韩国卖家 · 达人", pitch: "如果您是韩国卖家或达人 — 中国达人联名直播、海外品牌直供、中韩双语内容企划、跨境结算与物流。全栈支持。", href: "/for-korean-sellers" },
      { label: "中国达人", pitch: "如果您是中国达人 — K-Beauty/K-Fashion/配饰直供、韩国本地拍摄支持、韩国艺人·KOL 联名嘉宾对接。全部可用。", href: "/for-overseas-sellers" },
      { label: "韩国艺人", pitch: "寻找韩国艺人资源 — 100+ 顶级合作池、从基础置换到电视剧 PPL 五档选项,通过单一窗口匹配。", href: "/network" },
    ],
    ja: [
      { label: "韓国ブランド", pitch: "韓国ブランドなら — 検証済み 500+ 中国KOLマッチング + 小紅書/抖音/淘宝ライブ運営 + 通関、正規品認証、CSまで。中国進出に必要なすべてのインフラを単一窓口で。", href: "/for-korean-brands" },
      { label: "海外ブランド", pitch: "海外ブランドなら — 100+ 韓国トップクラス芸能人、500+ 韓国KOL、韓国ライブプラットフォーム運営、ドラマPPLまで。韓国市場参入のすべてのチャネルを一つの場所で。", href: "/for-overseas-brands" },
      { label: "韓国セラー · インフルエンサー", pitch: "韓国セラー・インフルエンサーなら — 中国KOLとのコラボライブ、海外ブランド直供給、韓中二重コンテンツ企画、クロスボーダー精算・物流までフルスタックサポート。", href: "/for-korean-sellers" },
      { label: "中国KOL", pitch: "中国KOLなら — K-Beauty/K-Fashion/アクセサリー直供給、韓国現地撮影サポート、韓国芸能人・KOLコラボゲスト連結まですべて可能。", href: "/for-overseas-sellers" },
      { label: "韓国芸能人", pitch: "韓国芸能人リソースをお探しなら — トップクラス 100+ コラボプール、基本協賛から有償・SNS・ドラマPPLまで5段階のオプションを単一窓口でマッチング。", href: "/network" },
    ],
  };

  const STMT: Record<Lang, { eyebrow: string; h: string; s: string; cta: string }> = {
    ko: { eyebrow: "왜 N-LIVE인가", h: "소개만 하는 곳이<br>아닙니다", s: "왕홍 찾아주고 끝나는 에이전시가 아닙니다. 매칭부터 라이브 운영, 물류, 정산, CS까지 — 한 팀이 끝까지 실행합니다.", cta: "실행 프로세스 보기" },
    en: { eyebrow: "WHY N-LIVE", h: "We don't just<br>introduce", s: "We're not an agency that finds you a KOL and walks away. From matching to live ops, logistics, settlement, CS — one team executes end to end.", cta: "See our process" },
    zh: { eyebrow: "为什么选择 N-LIVE", h: "不只是介绍<br>我们直接执行", s: "我们不是找完达人就结束的中介。从匹配到直播运营、物流、结算、客服 — 一个团队从头做到尾。", cta: "查看执行流程" },
    ja: { eyebrow: "なぜ N-LIVE か", h: "紹介だけの会社では<br>ありません", s: "KOLを見つけて終わるエージェンシーではありません。マッチングからライブ運営、物流、精算、CSまで — 一つのチームが最後まで実行します。", cta: "実行プロセスを見る" },
  };

  const METRICS: Record<Lang, { eyebrow: string; nums: Array<{ n: string; label: string; sub: string; amber?: boolean }>; desc: string; cta: string }> = {
    ko: {
      eyebrow: "검증된 네트워크 · 실시간 매칭",
      nums: [
        { n: "150+", label: "검증 협력 브랜드", sub: "K-Beauty·K-Fashion·잡화·헬스 등" },
        { n: "500+", label: "한·중 라이브커머스 셀러", sub: "검증된 라이브 운영 셀러 풀" },
        { n: "200+", label: "한국 유명 인플루언서", sub: "메가 KOL부터 마이크로까지 전 등급" },
        { n: "100+", label: "한국 정상급 연예인", sub: "배우·K-POP·가수·방송인" },
      ],
      desc: "규모보다 검증을 우선합니다. 모든 파트너는 직접 미팅을 거친 후에만 매칭됩니다.",
      cta: "네트워크 자세히 보기 →",
    },
    en: {
      eyebrow: "VERIFIED NETWORK · REAL-TIME MATCHING",
      nums: [
        { n: "150+", label: "Verified Partner Brands", sub: "K-Beauty · K-Fashion · accessories · wellness" },
        { n: "500+", label: "K-CN Live Commerce Sellers", sub: "Verified live-operating seller pool" },
        { n: "200+", label: "Korean Influencers", sub: "Mega-KOL to micro across all tiers" },
        { n: "100+", label: "Top Korean Celebrities", sub: "Actors · K-POP · singers · broadcasters" },
      ],
      desc: "Verification before scale. Every partner is matched only after a direct meeting.",
      cta: "See network →",
    },
    zh: {
      eyebrow: "经验证的网络 · 实时匹配",
      nums: [
        { n: "150+", label: "经验证的合作品牌", sub: "美妆 · 服装 · 配饰 · 健康等" },
        { n: "500+", label: "中韩直播电商卖家", sub: "经验证的直播运营卖家池" },
        { n: "200+", label: "韩国知名达人", sub: "从头部 KOL 到中腰部全覆盖" },
        { n: "100+", label: "韩国顶级艺人", sub: "演员 · K-POP · 歌手 · 主持人" },
      ],
      desc: "验证优先于规模。每一位合作方都经过直接面谈后才会匹配。",
      cta: "查看网络 →",
    },
    ja: {
      eyebrow: "検証済みネットワーク · リアルタイムマッチング",
      nums: [
        { n: "150+", label: "検証済みパートナーブランド", sub: "K-Beauty · K-Fashion · アクセサリー · ヘルス等" },
        { n: "500+", label: "韓中ライブコマースセラー", sub: "検証済みライブ運営セラープール" },
        { n: "200+", label: "韓国有名インフルエンサー", sub: "メガKOLからマイクロまで全等級" },
        { n: "100+", label: "韓国トップクラス芸能人", sub: "俳優 · K-POP · 歌手 · 放送人" },
      ],
      desc: "規模より検証を優先します。すべてのパートナーは直接ミーティングを経た後にのみマッチングされます。",
      cta: "ネットワーク詳細 →",
    },
  };

  const tags = TAGS[lang];
  const stmt = STMT[lang];
  const m = METRICS[lang];

  // Map each tag index to a color category for hero glow + tag-panel theming
  const TAG_CATS = ["k-brand", "o-brand", "k-seller", "o-seller", "k-brand"] as const;
  // Cycle metric cards through the 4-audience neon palette
  const METRIC_CATS = ["m-amber", "m-emerald", "m-azure", "m-coral"] as const;

  // Multi-language marquee items (한·중·영 mixed)
  const marquee1 = [
    "KOREA × GLOBAL", "한국 × 해외", "韩国 × 海外",
    "BRAND × SELLER", "브랜드 × 셀러", "品牌 × 卖家",
    "LIVE COMMERCE", "라이브커머스", "直播电商",
    "WANGHONG NETWORK", "왕홍 네트워크", "达人网络",
    "K-BEAUTY · K-FASHION", "DIRECT MATCHING", "직거래 매칭", "直供匹配",
    "N-LIVE · 恩联 · 엔라이브",
  ];
  const marquee2 = [
    "500+ KOL", "100+ TOP-TIER", "100+ 정상급 연예인", "100+ 顶级艺人",
    "샤오홍슈 · 더우인 · 타오바오", "XIAOHONGSHU · DOUYIN · TAOBAO", "小红书 · 抖音 · 淘宝",
    "한류 × 왕홍", "HALLYU × WANGHONG", "韩流 × 达人",
    "BRAND × FACTORY DIRECT", "브랜드 · 공장 다이렉트", "品牌 · 工厂直供",
  ];

  // Get role-specific hero content or fallback to generic
  const heroContent = role ? ROLE_HERO[role][lang] : null;

  // Current role label for the "change role" badge
  const currentRoleLabel = role ? ROLE_CARDS[role].ko : "";

  return (
    <>
      {/* ROLE SELECTOR OVERLAY */}
      {showSelector && (
        <div className={`role-selector-overlay ${fadeOut ? "fade-out" : ""}`}>
          <MeteorBackground />
          <div className="role-selector-inner">
            <div className="role-selector-logo">
              <Image src="/logo.svg" alt="N-LIVE" width={44} height={44} />
            </div>
            <div className="role-selector-eyebrow">LIVE COMMERCE AGENCY</div>
            <h1 className="role-selector-title">
              <span className="rst-ko">어떤 입장에서 오셨나요?</span>
              <span className="rst-intl">What brings you here? &nbsp;/&nbsp; 请选择您的身份</span>
            </h1>
            <div className="role-selector-grid">
              {(["korean-brand", "korean-seller", "overseas-brand", "overseas-seller"] as Role[]).map((r) => (
                <button
                  key={r}
                  className={`role-selector-card ${r}`}
                  onClick={() => selectRole(r)}
                  type="button"
                >
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

      {/* HERO */}
      <section className={`hero ${!showSelector && role ? "hero-entered" : ""}`}>
        <MeteorBackground />
        <div className="container hero-content">
          {/* Role badge + change button */}
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

          <div className="hero-tags-label">{t("hero.tag.label")}</div>
          <div className="hero-tags">
            {tags.map((tag, i) => (
              <button
                key={i}
                className={`hero-tag ${activeTag === i ? "active" : ""}`}
                data-cat={TAG_CATS[i] || "k-brand"}
                onClick={() => setActiveTag(activeTag === i ? null : i)}
                type="button"
              >
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

          <p className="hero-sub">{heroContent ? heroContent.sub : t("hero.sub")}</p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">{heroContent ? heroContent.cta : t("hero.cta1")} →</Link>
            <Link href="#services" className="btn btn-outline">{t("hero.cta2")}</Link>
          </div>
        </div>
      </section>

      {/* MARQUEE 1 — multilingual */}
      <Marquee items={marquee1} />

      {/* BIG STATEMENT BLOCK */}
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

      {/* 4-AUDIENCE MATRIX */}
      <section className="audience" id="services">
        <div className="container">
          <div className="section-header section-header-big">
            <div className="section-eyebrow">— {lang === "ko" ? "FOUR AXES · 네 가지 축" : lang === "en" ? "FOUR AXES" : lang === "zh" ? "四大轴向" : "FOUR AXES · 4つの軸"}</div>
            <h2 className="section-title section-title-huge" dangerouslySetInnerHTML={{ __html: t("aud.title") }} />
            <p className="section-desc section-desc-big">{t("aud.desc")}</p>
          </div>

          <div className="audience-matrix">
            <Link href="/for-korean-brands" className="audience-card k-brand">
              <div className="aud-img"><Image src="/images/k-brand.jpg" alt="K-Beauty products" fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: "cover" }} /></div>
              <div className="aud-overlay" />
              <div className="aud-content">
                <div className="aud-tag"><span className="aud-flag">KOREA</span><span className="aud-type">BRAND</span></div>
                <h3>{t("aud.1.t")}</h3>
                <p className="aud-need">{t("aud.1.n")}</p>
                <span className="aud-detail-link">{t("aud.detail")}</span>
              </div>
            </Link>
            <Link href="/for-korean-sellers" className="audience-card k-seller">
              <div className="aud-img"><Image src="/images/k-seller.jpg" alt="Live streaming seller" fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: "cover" }} /></div>
              <div className="aud-overlay" />
              <div className="aud-content">
                <div className="aud-tag"><span className="aud-flag">KOREA</span><span className="aud-type">SELLER · INFLUENCER</span></div>
                <h3>{t("aud.2.t")}</h3>
                <p className="aud-need">{t("aud.2.n")}</p>
                <span className="aud-detail-link">{t("aud.detail")}</span>
              </div>
            </Link>
            <Link href="/for-overseas-brands" className="audience-card o-brand">
              <div className="aud-img"><Image src="/images/o-brand.jpg" alt="Global fashion brand" fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: "cover" }} /></div>
              <div className="aud-overlay" />
              <div className="aud-content">
                <div className="aud-tag"><span className="aud-flag">GLOBAL</span><span className="aud-type">BRAND</span></div>
                <h3>{t("aud.3.t")}</h3>
                <p className="aud-need">{t("aud.3.n")}</p>
                <span className="aud-detail-link">{t("aud.detail")}</span>
              </div>
            </Link>
            <Link href="/for-overseas-sellers" className="audience-card o-seller">
              <div className="aud-img"><Image src="/images/o-seller.jpg" alt="Wanghong live commerce" fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: "cover" }} /></div>
              <div className="aud-overlay" />
              <div className="aud-content">
                <div className="aud-tag"><span className="aud-flag">GLOBAL</span><span className="aud-type">SELLER · WANGHONG</span></div>
                <h3>{t("aud.4.t")}</h3>
                <p className="aud-need">{t("aud.4.n")}</p>
                <span className="aud-detail-link">{t("aud.detail")}</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* BIG METRICS — with labels */}
      <section className="metrics topo-bg section-grain">
        <div className="container">
          <div className="metrics-eyebrow">— {m.eyebrow}</div>

          <div className="metrics-grid">
            {m.nums.map((item, i) => (
              <div className={`metric-card ${METRIC_CATS[i % METRIC_CATS.length]}`} key={i}>
                <div className="metric-num-big">{item.n}</div>
                <div className="metric-label">{item.label}</div>
                <div className="metric-sub">{item.sub}</div>
              </div>
            ))}
          </div>

          <div className="metrics-bottom">
            <p>{m.desc}</p>
            <Link href="/network">{m.cta}</Link>
          </div>
        </div>
      </section>

      {/* PAIRING MARQUEE — 3x for seamless loop */}
      <div className="pairing-marquee">
        <div className="pairing-track">
          {[0,1,2].map(r => [
            <div key={`b${r}`} className="pairing-item"><span>K-BEAUTY</span><span className="x">×</span><span className="creator">@샤오홍슈</span></div>,
            <div key={`f${r}`} className="pairing-item"><span>K-FASHION</span><span className="x">×</span><span className="creator">@더우인</span></div>,
            <div key={`c${r}`} className="pairing-item"><span>K-CELEB</span><span className="x">×</span><span className="creator">@타오바오</span></div>,
            <div key={`w${r}`} className="pairing-item"><span>WANGHONG</span><span className="x">×</span><span className="creator">@KR-LIVE</span></div>,
          ])}
        </div>
      </div>

      {/* MARQUEE 2 — multilingual */}
      <Marquee items={marquee2} />

      {/* CASE HIGHLIGHTS — proven results */}
      <section className="case-highlights">
        <div className="container">
          <div className="section-eyebrow">— {lang === "ko" ? "PROVEN RESULTS · 검증된 성과" : lang === "en" ? "PROVEN RESULTS" : lang === "zh" ? "验证的成果" : "PROVEN RESULTS · 検証された成果"}</div>
          <h2 className="section-title section-title-huge">{lang === "ko" ? "숫자로 증명합니다" : lang === "en" ? "Backed by numbers" : lang === "zh" ? "用数字证明" : "数字で証明します"}</h2>
          <div className="case-highlight-grid">
            {[
              { num: lang === "ko" ? "183억 원" : lang === "zh" ? "183亿韩元" : lang === "ja" ? "183億ウォン" : "₩18.3B", brand: lang === "ko" ? "더후 × 댠댠" : lang === "zh" ? "后 × 丹丹" : lang === "ja" ? "后 × ダンダン" : "Whoo × Dandan", desc: lang === "ko" ? "단일 라이브 매출 — 한국 방문 3일, 4회 라이브" : lang === "zh" ? "单场直播销售额 — 访韩3天4场直播" : lang === "ja" ? "単一ライブ売上 — 訪韓3日間4回ライブ" : "Single live revenue — 3-day Korea visit, 4 broadcasts", cat: "m-amber" },
              { num: lang === "ko" ? "4시간 전량 매진" : lang === "zh" ? "4小时全部售罄" : lang === "ja" ? "4時間で完売" : "Sold out in 4hrs", brand: lang === "ko" ? "메디큐브" : "Medicube", desc: lang === "ko" ? "더우인 라이브에서 1.2만개 기획세트 전량 소진" : lang === "zh" ? "抖音直播1.2万套策划套装全部售罄" : lang === "ja" ? "抖音ライブで1.2万セット完売" : "12,000 curated sets sold out on Douyin live", cat: "m-emerald" },
              { num: lang === "ko" ? "매출 50% 증가" : lang === "zh" ? "销售额增长50%" : lang === "ja" ? "売上50%増加" : "+50% revenue", brand: lang === "ko" ? "Dior × 지수" : lang === "zh" ? "Dior × 智秀" : lang === "ja" ? "Dior × ジス" : "Dior × Jisoo", desc: lang === "ko" ? "BLACKPINK 지수 앰배서더 발탁 후 한국 매출 급증" : lang === "zh" ? "BLACKPINK智秀任大使后韩国销售额激增" : lang === "ja" ? "BLACKPINKジスアンバサダー就任後、韓国売上急増" : "Korea revenue surged after BLACKPINK Jisoo ambassadorship", cat: "m-azure" },
              { num: lang === "ko" ? "2,000억 원" : lang === "zh" ? "10亿元人民币" : lang === "ja" ? "2,000億ウォン" : "₩200B", brand: lang === "ko" ? "왕홍 댠댠 한국 방문" : lang === "zh" ? "达人丹丹访韩" : lang === "ja" ? "KOLダンダン訪韓" : "Dandan Korea Visit", desc: lang === "ko" ? "3일간 총 매출 — K-뷰티 집중 판매" : lang === "zh" ? "3天总销售额 — K-Beauty集中销售" : lang === "ja" ? "3日間の総売上 — K-Beauty集中販売" : "3-day total — focused K-Beauty sales", cat: "m-coral" },
            ].map((c, i) => (
              <div className={`case-highlight-card ${c.cat}`} key={i}>
                <div className="ch-num">{c.num}</div>
                <div className="ch-brand">{c.brand}</div>
                <p className="ch-desc">{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="case-highlight-note">{lang === "ko" ? "위 사례는 공개 보도 기반입니다. 프로젝트별 상세 데이터는 NDA 체결 후 공유드립니다." : lang === "zh" ? "以上案例基于公开报道。项目详细数据可在签署NDA后共享。" : lang === "ja" ? "上記事例は公開報道に基づいています。プロジェクト別の詳細データはNDA締結後に共有いたします。" : "Cases above are based on public reporting. Detailed project data is shared after NDA signing."}</p>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link href="/contact" className="btn btn-primary">{lang === "ko" ? "내 브랜드에 맞는 사례 듣기 →" : lang === "zh" ? "了解适合我品牌的案例 →" : lang === "ja" ? "自社ブランドに合う事例を聞く →" : "Hear cases for my brand →"}</Link>
          </div>
        </div>
      </section>

      {/* TRUST & PROCESS */}
      <section className="trust-process">
        <div className="container">
          <div className="section-eyebrow">— {lang === "ko" ? "HOW WE WORK · 이렇게 진행됩니다" : lang === "en" ? "HOW WE WORK" : lang === "zh" ? "我们的工作方式" : "HOW WE WORK · 進め方"}</div>
          <h2 className="section-title">{lang === "ko" ? "문의부터 실행까지, 5단계" : lang === "en" ? "From inquiry to execution — 5 steps" : lang === "zh" ? "从咨询到执行，5步搞定" : "問い合わせから実行まで5ステップ"}</h2>
          <div className="trust-steps">
            {[
              { n: "01", t: lang === "ko" ? "문의 접수" : lang === "zh" ? "咨询受理" : lang === "ja" ? "問い合わせ受付" : "Inquiry", d: lang === "ko" ? "48시간 이내 회신 · 한/중/영 대응" : lang === "zh" ? "48小时内回复 · 中/韩/英对应" : lang === "ja" ? "48時間以内返信 · 韓/中/英対応" : "Reply within 48hrs · KO/ZH/EN" },
              { n: "02", t: lang === "ko" ? "무료 컨셉 미팅" : lang === "zh" ? "免费概念会议" : lang === "ja" ? "無料コンセプトMTG" : "Free Concept Meeting", d: lang === "ko" ? "비대면 30분 · 브랜드·목표·예산 파악" : lang === "zh" ? "线上30分钟 · 了解品牌/目标/预算" : lang === "ja" ? "オンライン30分 · ブランド/目標/予算把握" : "Remote 30min · brand/goal/budget" },
              { n: "03", t: lang === "ko" ? "맞춤 제안서" : lang === "zh" ? "定制方案" : lang === "ja" ? "カスタム提案書" : "Custom Proposal", d: lang === "ko" ? "파트너 후보 · 플랫폼 · 예상 성과 · 견적" : lang === "zh" ? "合作候选 · 平台 · 预期成果 · 报价" : lang === "ja" ? "パートナー候補 · プラットフォーム · 予想成果 · 見積" : "Partner candidates · platform · projections · quote" },
              { n: "04", t: lang === "ko" ? "계약·실행" : lang === "zh" ? "签约·执行" : lang === "ja" ? "契約・実行" : "Contract & Execute", d: lang === "ko" ? "왕홍 매칭 → 라이브 기획 → 운영 → 정산" : lang === "zh" ? "达人匹配 → 直播企划 → 运营 → 结算" : lang === "ja" ? "KOLマッチング → ライブ企画 → 運営 → 精算" : "KOL matching → live planning → ops → settlement" },
              { n: "05", t: lang === "ko" ? "성과 리포트" : lang === "zh" ? "成果报告" : lang === "ja" ? "成果レポート" : "Performance Report", d: lang === "ko" ? "실시간 데이터 공유 + 다음 단계 제안" : lang === "zh" ? "实时数据共享 + 下一步建议" : lang === "ja" ? "リアルタイムデータ共有 + 次のステップ提案" : "Real-time data + next steps" },
            ].map((s, i) => (
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

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container">
          <h2 className="final-cta-title">{lang === "ko" ? "지금 시작하지 않으면, 경쟁사가 먼저 합니다" : lang === "en" ? "If you don't start now, your competitors will" : lang === "zh" ? "现在不开始，竞争对手就先行一步" : "今始めなければ、競合が先に動きます"}</h2>
          <p className="final-cta-sub">{lang === "ko" ? "첫 미팅은 무료, 리스크는 제로. 30분이면 가능성을 확인할 수 있습니다." : lang === "en" ? "First meeting is free, zero risk. 30 minutes to discover the opportunity." : lang === "zh" ? "首次会议免费，零风险。30分钟即可确认可能性。" : "初回ミーティング無料、リスクゼロ。30分で可能性を確認できます。"}</p>
          <div className="final-cta-buttons">
            <Link href="/contact" className="btn btn-primary">{lang === "ko" ? "맞춤 제안서 요청 →" : lang === "en" ? "Request custom proposal →" : lang === "zh" ? "定制方案咨询 →" : "カスタム提案書リクエスト →"}</Link>
            <Link href="/contact" className="btn btn-outline">{lang === "ko" ? "무료 컨셉 미팅 예약 →" : lang === "en" ? "Book free concept meeting →" : lang === "zh" ? "预约免费概念会议 →" : "無料コンセプトMTG予約 →"}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
