"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import Marquee from "@/components/Marquee";

export default function HomePage() {
  const { t, lang } = useLang();

  // Statement block headline per language
  const STMT: Record<string, { h: string; s: string; cta: string }> = {
    ko: { h: "라이브커머스의 모든 연결, 한 곳에서.", s: "엔라이브는 브랜드와 셀러 사이에 존재하는 모든 거리를 0으로 만드는 에이전시입니다.", cta: "어떻게 작동하나요" },
    en: { h: "Every connection in live commerce, in one place.", s: "N-LIVE collapses every distance between brands and sellers to zero.", cta: "How it works" },
    zh: { h: "直播电商的所有连接,集于一处。", s: "恩联将品牌与卖家之间的所有距离归零。", cta: "了解运作方式" },
    ja: { h: "ライブコマースのすべての繋がりを、一つの場所で。", s: "N-LIVEはブランドとセラーの間のすべての距離をゼロにします。", cta: "仕組みを見る" },
  };

  const METRICS: Record<string, { eyebrow: string; topL: string; topR: string; topImg: string; botL: string; botR: string; desc: string; cta: string }> = {
    ko: { eyebrow: "검증된 네트워크 · 실시간 매칭", topL: "1,500+", topR: "200+", topImg: "KOL · 연예인", botL: "5+", botR: "100+", desc: "중국 왕홍 1,500+ 네트워크와 한국 정상급 연예인 200+ 협업 풀. 5개 이상의 라이브 플랫폼과 100여 개 검증 브랜드까지.", cta: "네트워크 보기 →" },
    en: { eyebrow: "VERIFIED NETWORK · REAL-TIME MATCHING", topL: "1,500+", topR: "200+", topImg: "KOL · CELEB", botL: "5+", botR: "100+", desc: "1,500+ Chinese wanghong network and 200+ top-tier Korean celebrities. 5+ live commerce platforms and 100+ verified brands.", cta: "See network →" },
    zh: { eyebrow: "经验证的网络 · 实时匹配", topL: "1,500+", topR: "200+", topImg: "达人 · 艺人", botL: "5+", botR: "100+", desc: "1,500+ 中国达人网络与 200+ 韩国顶级艺人合作池。5个以上直播平台与 100多个经验证的品牌。", cta: "查看网络 →" },
    ja: { eyebrow: "検証済みネットワーク · リアルタイムマッチング", topL: "1,500+", topR: "200+", topImg: "KOL · CELEB", botL: "5+", botR: "100+", desc: "中国KOL 1,500+ ネットワークと韓国トップクラス芸能人 200+ コラボプール。5以上のライブプラットフォームと100以上の検証済みブランド。", cta: "ネットワークを見る →" },
  };

  const stmt = STMT[lang];
  const m = METRICS[lang];

  return (
    <>
      {/* HERO */}
      <section className="hero topo-bg">
        <div className="container hero-content">
          <div className="hero-eyebrow">{t("hero.eyebrow")}</div>
          <h1 className="hero-title">
            {t("hero.title.1")}<br />
            <em>{t("hero.title.2")}</em>
          </h1>
          <div className="hero-tags">
            <span className="hero-tag">{t("hero.tag.1")}</span>
            <span className="hero-tag">{t("hero.tag.2")}</span>
            <span className="hero-tag">{t("hero.tag.3")}</span>
            <span className="hero-tag">{t("hero.tag.4")}</span>
            <span className="hero-tag">{t("hero.tag.5")}</span>
          </div>
          <p className="hero-sub">{t("hero.sub")}</p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">{t("hero.cta1")} →</Link>
            <Link href="#services" className="btn btn-outline">{t("hero.cta2")}</Link>
          </div>
        </div>
      </section>

      {/* MARQUEE 1 */}
      <Marquee items={["KOREA × OVERSEAS", "BRAND × SELLER", "LIVE COMMERCE", "WANGHONG NETWORK", "K-BEAUTY · K-FASHION", "DIRECT MATCHING", "N-LIVE · 恩联"]} />

      {/* BIG STATEMENT BLOCK (Whalar inspired) */}
      <section className="statement-block">
        <div className="container">
          <h2 className="statement-headline">{stmt.h}</h2>
          <div className="statement-bottom">
            <p className="statement-sub">{stmt.s}</p>
            <Link href="/process" className="btn-statement">{stmt.cta} →</Link>
          </div>
        </div>
      </section>

      {/* 4-AUDIENCE MATRIX */}
      <section className="audience" id="services" style={{ padding: "140px 0" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t("aud.title")}</h2>
            <p className="section-desc">{t("aud.desc")}</p>
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
              <div className="aud-tag"><span className="aud-flag">OVERSEAS</span><span className="aud-type">BRAND</span></div>
              <h3>{t("aud.3.t")}</h3>
              <p className="aud-need">{t("aud.3.n")}</p>
              <span className="aud-detail-link">{t("aud.detail")}</span>
            </Link>
            <Link href="/for-overseas-sellers" className="audience-card o-seller">
              <div className="aud-tag"><span className="aud-flag">OVERSEAS</span><span className="aud-type">SELLER · WANGHONG</span></div>
              <h3>{t("aud.4.t")}</h3>
              <p className="aud-need">{t("aud.4.n")}</p>
              <span className="aud-detail-link">{t("aud.detail")}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* BIG METRICS SECTION (Whalar inspired) */}
      <section className="metrics topo-bg section-grain">
        <div className="container">
          <div className="metrics-eyebrow">— {m.eyebrow}</div>

          <div className="metrics-row">
            <div className="metric-num left amber">{m.topL}</div>
            <div className="metric-image"></div>
            <div className="metric-num right">{m.topR}</div>
          </div>

          <div className="metrics-row">
            <div className="metric-num left">{m.botL}</div>
            <div className="metric-image" style={{ background: 'linear-gradient(135deg, #1a1a1a, #3a3a3a)' }}></div>
            <div className="metric-num right amber">{m.botR}</div>
          </div>

          <div className="metrics-bottom">
            <p>{m.desc}</p>
            <Link href="/network">{m.cta}</Link>
          </div>
        </div>
      </section>

      {/* PAIRING MARQUEE (Brand × Creator) */}
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

      {/* MARQUEE 2 */}
      <Marquee items={["1,500+ KOL", "200+ TOP-TIER CELEBRITY", "BASIC → PREMIUM", "샤오홍슈 · 더우인 · 타오바오", "한류 × 왕홍", "BRAND × FACTORY DIRECT"]} />
    </>
  );
}
