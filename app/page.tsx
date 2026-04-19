"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import Marquee from "@/components/Marquee";

export default function HomePage() {
  const { t } = useLang();

  return (
    <>
      {/* HERO */}
      <section className="hero">
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

      <Marquee items={["KOREA × OVERSEAS", "BRAND × SELLER", "LIVE COMMERCE", "WANGHONG NETWORK", "K-BEAUTY · K-FASHION", "DIRECT MATCHING", "N-LIVE · 恩联"]} />

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

      <Marquee items={["1,500+ KOL", "200+ TOP-TIER CELEBRITY", "BASIC → PREMIUM", "샤오홍슈 · 더우인 · 타오바오", "한류 × 왕홍", "BRAND × FACTORY DIRECT"]} />
    </>
  );
}
