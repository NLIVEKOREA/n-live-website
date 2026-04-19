"use client";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/components/LangContext";
import Marquee from "@/components/Marquee";
import MeteorBackground from "@/components/MeteorBackground";
import type { Lang } from "@/lib/i18n";

export default function HomePage() {
  const { t, lang } = useLang();
  const [activeTag, setActiveTag] = useState<number | null>(null);

  // Tag interactive panels — what each audience can do with us
  const TAGS: Record<Lang, Array<{ label: string; pitch: string; href: string }>> = {
    ko: [
      { label: "한국 브랜드", pitch: "한국 브랜드라면 — 검증된 중국 왕홍 1,500+ 매칭 + 샤오홍슈·더우인·타오바오 라이브 운영 + 통관·정품·CS까지. 중국 진출에 필요한 모든 인프라를 단일 창구로 제공합니다.", href: "/for-korean-brands" },
      { label: "해외 브랜드", pitch: "해외 브랜드라면 — 한국 정상급 연예인 200+, 한국 KOL 1,500+, 한국 라이브 플랫폼 운영, 드라마 PPL까지. 한국 시장 진출의 모든 채널을 한 곳에서.", href: "/for-overseas-brands" },
      { label: "한국 셀러·인플루언서", pitch: "한국 셀러·인플루언서라면 — 중국 왕홍과 콜라보 라이브, 해외 브랜드 직공급, 한중 이중 콘텐츠 기획, 크로스보더 정산·물류까지 풀세트 지원합니다.", href: "/for-korean-sellers" },
      { label: "중국 왕홍", pitch: "중국 왕홍이라면 — K-Beauty·K-Fashion·잡화 직공급, 한국 현지 촬영 지원, 한국 연예인·KOL 콜라보 게스트 연결까지 모두 가능합니다.", href: "/for-overseas-sellers" },
      { label: "한국 연예인", pitch: "한국 연예인 자원을 찾으신다면 — 정상급 200+ 협업 풀, 기본 협찬·프리미엄·유가·SNS·드라마 PPL 5단계 옵션을 단일 창구로 매칭합니다.", href: "/network" },
    ],
    en: [
      { label: "Korean Brands", pitch: "If you're a Korean brand — verified 1,500+ Chinese wanghong matching + Xiaohongshu/Douyin/Taobao live operations + customs, authentication, and CS. Every channel for entering China through one window.", href: "/for-korean-brands" },
      { label: "Global Brands", pitch: "If you're a global brand — 200+ top-tier Korean celebrities, 1,500+ Korean KOLs, Korean live platform operations, drama PPL. Every channel for Korean market entry, in one place.", href: "/for-overseas-brands" },
      { label: "Korean Sellers · Influencers", pitch: "If you're a Korean seller or influencer — Chinese wanghong collab lives, direct global brand sourcing, Korea-China dual content planning, cross-border settlement & logistics. Full-stack support.", href: "/for-korean-sellers" },
      { label: "Chinese Wanghong", pitch: "If you're a Chinese wanghong — K-Beauty/K-Fashion/accessory direct supply, Korean on-site filming support, Korean celebrity & KOL collaboration guest matching. All available.", href: "/for-overseas-sellers" },
      { label: "Korean Celebrities", pitch: "Looking for Korean celebrity resources — 200+ top-tier collaboration pool, 5-tier options from basic sponsorship to drama PPL, all matched through a single window.", href: "/network" },
    ],
    zh: [
      { label: "韩国品牌", pitch: "如果您是韩国品牌 — 经验证的 1,500+ 中国达人匹配 + 小红书/抖音/淘宝直播运营 + 通关、正品、客服。进入中国所需的所有基础设施,通过单一窗口提供。", href: "/for-korean-brands" },
      { label: "海外品牌", pitch: "如果您是海外品牌 — 200+ 韩国顶级艺人、1,500+ 韩国 KOL、韩国直播平台运营、电视剧 PPL。进入韩国市场的所有渠道,集于一处。", href: "/for-overseas-brands" },
      { label: "韩国卖家 · 达人", pitch: "如果您是韩国卖家或达人 — 中国达人联名直播、海外品牌直供、中韩双语内容企划、跨境结算与物流。全栈支持。", href: "/for-korean-sellers" },
      { label: "中国达人", pitch: "如果您是中国达人 — K-Beauty/K-Fashion/配饰直供、韩国本地拍摄支持、韩国艺人·KOL 联名嘉宾对接。全部可用。", href: "/for-overseas-sellers" },
      { label: "韩国艺人", pitch: "寻找韩国艺人资源 — 200+ 顶级合作池、从基础置换到电视剧 PPL 五档选项,通过单一窗口匹配。", href: "/network" },
    ],
    ja: [
      { label: "韓国ブランド", pitch: "韓国ブランドなら — 検証済み 1,500+ 中国KOLマッチング + 小紅書/抖音/淘宝ライブ運営 + 通関、正規品認証、CSまで。中国進出に必要なすべてのインフラを単一窓口で。", href: "/for-korean-brands" },
      { label: "海外ブランド", pitch: "海外ブランドなら — 200+ 韓国トップクラス芸能人、1,500+ 韓国KOL、韓国ライブプラットフォーム運営、ドラマPPLまで。韓国市場参入のすべてのチャネルを一つの場所で。", href: "/for-overseas-brands" },
      { label: "韓国セラー · インフルエンサー", pitch: "韓国セラー・インフルエンサーなら — 中国KOLとのコラボライブ、海外ブランド直供給、韓中二重コンテンツ企画、クロスボーダー精算・物流までフルスタックサポート。", href: "/for-korean-sellers" },
      { label: "中国KOL", pitch: "中国KOLなら — K-Beauty/K-Fashion/アクセサリー直供給、韓国現地撮影サポート、韓国芸能人・KOLコラボゲスト連結まですべて可能。", href: "/for-overseas-sellers" },
      { label: "韓国芸能人", pitch: "韓国芸能人リソースをお探しなら — トップクラス 200+ コラボプール、基本協賛から有償・SNS・ドラマPPLまで5段階のオプションを単一窓口でマッチング。", href: "/network" },
    ],
  };

  const STMT: Record<Lang, { eyebrow: string; h: string; s: string; cta: string }> = {
    ko: { eyebrow: "OUR PROMISE · 엔라이브의 약속", h: "이 모든 것을<br>한 곳에서<br>실행합니다", s: "4가지 입장의 파트너십을 단일 창구에서. 검증된 풀에서 직접 매칭, 직접 운영합니다.", cta: "프로세스 보기" },
    en: { eyebrow: "OUR PROMISE", h: "All of this<br>executed<br>in one place", s: "Every partnership across four roles, run from a single window — direct matching, direct operations.", cta: "See process" },
    zh: { eyebrow: "我们的承诺", h: "全部由我们<br>在一处<br>执行", s: "四种身份的合作,集中于单一窗口。从经验证的资源池中直接匹配、直接运营。", cta: "查看流程" },
    ja: { eyebrow: "OUR PROMISE", h: "そのすべてを<br>一つの場所で<br>実行します", s: "4つの立場のパートナーシップを単一窓口で。検証済みプールから直接マッチング、直接運営。", cta: "プロセスを見る" },
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
    "1,500+ KOL", "200+ TOP-TIER", "200+ 정상급 연예인", "200+ 顶级艺人",
    "샤오홍슈 · 더우인 · 타오바오", "XIAOHONGSHU · DOUYIN · TAOBAO", "小红书 · 抖音 · 淘宝",
    "한류 × 왕홍", "HALLYU × WANGHONG", "韩流 × 达人",
    "BRAND × FACTORY DIRECT", "브랜드 · 공장 다이렉트", "品牌 · 工厂直供",
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <MeteorBackground />
        <div className="container hero-content">
          <div className="hero-eyebrow">{t("hero.eyebrow")}</div>
          <h1 className="hero-title">
            <span className="line-mask"><span className="line-inner">{t("hero.title.1")}</span></span>
            <span className="line-mask"><span className="line-inner"><em>{t("hero.title.2")}</em></span></span>
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

          <p className="hero-sub">{t("hero.sub")}</p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">{t("hero.cta1")} →</Link>
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
              <div className="aud-tag"><span className="aud-flag">KOREA</span><span className="aud-type">BRAND</span></div>
              <h3>{t("aud.1.t")}</h3>
              <p className="aud-need">{t("aud.1.n")}</p>
              <span className="aud-detail-link">{t("aud.detail")}</span>
            </Link>
            <Link href="/for-korean-sellers" className="audience-card k-seller">
              <div className="aud-tag"><span className="aud-flag">KOREA</span><span className="aud-type">SELLER · INFLUENCER</span></div>
              <h3>{t("aud.2.t")}</h3>
              <p className="aud-need">{t("aud.2.n")}</p>
              <span className="aud-detail-link">{t("aud.detail")}</span>
            </Link>
            <Link href="/for-overseas-brands" className="audience-card o-brand">
              <div className="aud-tag"><span className="aud-flag">GLOBAL</span><span className="aud-type">BRAND</span></div>
              <h3>{t("aud.3.t")}</h3>
              <p className="aud-need">{t("aud.3.n")}</p>
              <span className="aud-detail-link">{t("aud.detail")}</span>
            </Link>
            <Link href="/for-overseas-sellers" className="audience-card o-seller">
              <div className="aud-tag"><span className="aud-flag">GLOBAL</span><span className="aud-type">SELLER · WANGHONG</span></div>
              <h3>{t("aud.4.t")}</h3>
              <p className="aud-need">{t("aud.4.n")}</p>
              <span className="aud-detail-link">{t("aud.detail")}</span>
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

      {/* PAIRING MARQUEE */}
      <div className="pairing-marquee">
        <div className="pairing-track">
          <div className="pairing-item"><span>K-BEAUTY</span><span className="x">×</span><span className="creator">@샤오홍슈</span></div>
          <div className="pairing-item"><span>K-FASHION</span><span className="x">×</span><span className="creator">@더우인</span></div>
          <div className="pairing-item"><span>K-CELEB</span><span className="x">×</span><span className="creator">@타오바오</span></div>
          <div className="pairing-item"><span>WANGHONG</span><span className="x">×</span><span className="creator">@KR-LIVE</span></div>
          <div className="pairing-item"><span>K-BEAUTY</span><span className="x">×</span><span className="creator">@샤오홍슈</span></div>
          <div className="pairing-item"><span>K-FASHION</span><span className="x">×</span><span className="creator">@더우인</span></div>
          <div className="pairing-item"><span>K-CELEB</span><span className="x">×</span><span className="creator">@타오바오</span></div>
          <div className="pairing-item"><span>WANGHONG</span><span className="x">×</span><span className="creator">@KR-LIVE</span></div>
        </div>
      </div>

      {/* MARQUEE 2 — multilingual */}
      <Marquee items={marquee2} />

      {/* CASE PLACEHOLDER — to be filled with reference visuals */}
      <section style={{ padding: "100px 0", background: "var(--white)" }}>
        <div className="container">
          <div className="section-eyebrow">— {lang === "ko" ? "REFERENCE · 참고 사례" : lang === "en" ? "REFERENCE" : lang === "zh" ? "参考案例" : "REFERENCE"}</div>
          <div className="image-placeholder tall">
            <div className="ip-tag">IMAGE</div>
            <div className="ip-caption">{t("ip.case")}</div>
          </div>
        </div>
      </section>
    </>
  );
}
