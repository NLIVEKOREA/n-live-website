"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLang } from "./LangContext";
import { Lang } from "@/lib/i18n";

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handler = () => setMenuOpen(false);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <span className="logo-mark"><Image src="/logo.svg" alt="N-LIVE" width={40} height={40} /></span>
          <span className="logo-text">{t("brand")}</span>
        </Link>

        {/* Desktop nav links */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link href="/about" onClick={() => setMenuOpen(false)}>{t("nav.about")}</Link>
          <div className="nav-dropdown" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="nav-dropdown-trigger" onClick={() => setServicesOpen(!servicesOpen)}>{t("nav.services")} ▾</button>
            <div className={`nav-dropdown-menu ${servicesOpen ? "open" : ""}`}>
              <Link href="/for-korean-brands" onClick={() => setMenuOpen(false)}>{t("nav.services.kbrand")}</Link>
              <Link href="/for-korean-sellers" onClick={() => setMenuOpen(false)}>{t("nav.services.kseller")}</Link>
              <Link href="/for-overseas-brands" onClick={() => setMenuOpen(false)}>{t("nav.services.obrand")}</Link>
              <Link href="/for-overseas-sellers" onClick={() => setMenuOpen(false)}>{t("nav.services.oseller")}</Link>
            </div>
          </div>
          <Link href="/network" onClick={() => setMenuOpen(false)}>{t("nav.network")}</Link>
          <Link href="/process" onClick={() => setMenuOpen(false)}>{t("nav.process")}</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>{t("nav.contact")}</Link>
        </div>

        {/* Desktop right: 4 lang + CTA + hamburger(tablet) */}
        <div className="nav-right">
          <div className="lang-switch">
            {(["ko", "zh", "en", "ja"] as Lang[]).map((l, i) => (
              <span key={l}>
                {i > 0 && <span className="divider">·</span>}
                <button onClick={() => setLang(l)} className={lang === l ? "active" : ""}>
                  {l === "ko" ? "KO" : l === "zh" ? "중문" : l === "en" ? "EN" : "JP"}
                </button>
              </span>
            ))}
          </div>
          <Link href="/contact" className="nav-cta">{t("nav.cta")}</Link>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile right: 문의하기 + 영어/중문 버튼 */}
        <div className="nav-mobile-right">
          <Link href="/contact" className="nav-mobile-cta">문의하기</Link>
          <button
            onClick={() => setLang(lang === "en" ? "ko" : "en")}
            className={`nav-mobile-lang ${lang === "en" ? "active" : ""}`}
          >영어</button>
          <button
            onClick={() => setLang(lang === "zh" ? "ko" : "zh")}
            className={`nav-mobile-lang ${lang === "zh" ? "active" : ""}`}
          >중문</button>
        </div>
      </div>

      {/* Row 2: Mobile-only menu bar */}
      <div className="nav-mobile-bar">
        <Link href="/about">{t("nav.about")}</Link>
        <Link href="/for-korean-brands">{t("nav.services")}</Link>
        <Link href="/network">{t("nav.network")}</Link>
        <Link href="/process">{t("nav.process")}</Link>
        <Link href="/contact">{t("nav.contact")}</Link>
      </div>
    </nav>
  );
}
