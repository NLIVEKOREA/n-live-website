"use client";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/components/LangContext";
import Marquee from "@/components/Marquee";
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
    ko: { eyebrow: "OUR PROMISE · 엔라이브의 약속", h: "라이브커머스의<br>모든 연결<br>엔라이브에서", s: "엔라이브는 브랜드와 셀러 사이에 존재하는 모든 거리를 0으로 만드는 에이전시입니다. 검증된 네트워크, 직접 매칭, 단일 창구 — 그것이 엔라이브가 만드는 차이입니다.", cta: "프로세스 보기" },
    en: { eyebrow: "OUR PROMISE", h: "Every connection<br>in live commerce<br>at N-LIVE", s: "N-LIVE is the agency that collapses every distance between brands and sellers to zero. Verified network, direct matching, single window — this is the difference N-LIVE makes.", cta: "See process" },
    zh: { eyebrow: "我们的承诺", h: "直播电商的<br>所有连接<br>在恩联", s: "恩联是将品牌与卖家之间的所有距离归零的代理机构。经验证的网络、直接匹配、单一窗口 — 这就是恩联创造的差异。", cta: "查看流程" },
    ja: { eyebrow: "OUR PROMISE", h: "ライブコマースの<br>すべての繋がりを<br>N-LIVEで", s: "N-LIVEはブランドとセラーの間に存在するすべての距離をゼロにするエージェンシーです。検証済みネットワーク、直接マッチング、単一窓口 — これがN-LIVEが作る違いです。", cta: "プロセスを見る" },
  };

  const METRICS: Record<Lang, { eyebrow: string; nums: Array<{ n: string; label: string; sub: string; amber?: boolean }>; desc: string; cta: string }> = {
    ko: {
      eyebrow: "검증된 네트워크 · 실시간 매칭",
      nums: [
        { n: "1,500+", label: "중국 왕홍", sub: "콘텐츠·커머스 통합 풀", amber: true },
        { n: "200+", label: "한국 정상급 연예인", sub: "배우·K-POP·가수·방송인" },
        { n: "5+", label: "라이브 플랫폼 운영", sub: "샤오홍슈·더우인·타오바오·Grip·네이버" },
        { n: "100+", label: "검증 협력 브랜드", sub: "K-Beauty·K-Fashion·잡화", amber: true },
      ],
      desc: "엔라이브는 단순히 큰 네트워크가 아니라, 직접 검증한 네트워크를 운영합니다. 모든 매칭은 데이터와 현장 경험을 기반으로 이루어집니다.",
      cta: "네트워크 자세히 보기 →",
    },
    en: {
      eyebrow: "VERIFIED NETWORK · REAL-TIME MATCHING",
      nums: [
        { n: "1,500+", label: "Chinese Wanghongs", sub: "Content + commerce integrated pool", amber: true },
        { n: "200+", label: "Top Korean Celebrities", sub: "Actors · K-POP · singers · broadcasters" },
        { n: "5+", label: "Live Platforms", sub: "Xiaohongshu · Douyin · Taobao · Grip · Naver" },
        { n: "100+", label: "Verified Partner Brands", sub: "K-Beauty · K-Fashion · accessories", amber: true },
      ],
      desc: "N-LIVE doesn't just have a big network — we operate a verified one. Every match is grounded in data and field experience.",
      cta: "See network →",
    },
    zh: {
      eyebrow: "经验证的网络 · 实时匹配",
      nums: [
        { n: "1,500+", label: "中国达人", sub: "内容 + 商业整合池", amber: true },
        { n: "200+", label: "韩国顶级艺人", sub: "演员 · K-POP · 歌手 · 主持人" },
        { n: "5+", label: "直播平台运营", sub: "小红书 · 抖音 · 淘宝 · Grip · Naver" },
        { n: "100+", label: "经验证的合作品牌", sub: "K-Beauty · K-Fashion · 配饰", amber: true },
      ],
      desc: "恩联不仅拥有庞大的网络,更运营一个经过验证的网络。每一次匹配都建立在数据和现场经验之上。",
      cta: "查看网络 →",
    },
    ja: {
      eyebrow: "検証済みネットワーク · リアルタイムマッチング",
      nums: [
        { n: "1,500+", label: "中国KOL", sub: "コンテンツ + コマース統合プール", amber: true },
        { n: "200+", label: "韓国トップクラス芸能人", sub: "俳優 · K-POP · 歌手 · 放送人" },
        { n: "5+", label: "ライブプラットフォーム運営", sub: "小紅書 · 抖音 · 淘宝 · Grip · Naver" },
        { n: "100+", label: "検証済みパートナーブランド", sub: "K-Beauty · K-Fashion · アクセサリー", amber: true },
      ],
      desc: "N-LIVEは単に大きなネットワークではなく、直接検証したネットワークを運営しています。すべてのマッチングはデータと現場経験に基づいています。",
      cta: "ネットワーク詳細 →",
    },
  };

  const tags = TAGS[lang];
  const stmt = STMT[lang];
  const m = METRICS[lang];

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
      <section className="hero topo-bg">
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
                onClick={() => setActiveTag(activeTag === i ? null : i)}
                type="button"
              >
                {tag.label}
                <span className="hero-tag-arrow">{activeTag === i ? "−" : "+"}</span>
              </button>
            ))}
          </div>

          {activeTag !== null && (
            <div className="tag-panel" key={activeTag}>
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
              <div className={`metric-card ${item.amber ? "amber" : ""}`} key={i}>
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
    </>
  );
}
