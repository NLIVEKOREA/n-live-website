"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useLang } from "./LangContext";
import { Lang } from "@/lib/i18n";

const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: "ko", label: "한국어" },
  { code: "zh", label: "中文" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
];

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setMenuOpen(false);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  // 외부 클릭 시 언어 드롭다운 닫기
  useEffect(() => {
    if (!langOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (langWrapRef.current && !langWrapRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setLangOpen(false); };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [langOpen]);

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
              <Link href="/for-overseas-sellers" onClick={() => setMenuOpen(false)}>{t("nav.services.oseller")}</Link>
              <Link href="/for-korean-sellers" onClick={() => setMenuOpen(false)}>{t("nav.services.kseller")}</Link>
              <Link href="/for-overseas-brands" onClick={() => setMenuOpen(false)}>{t("nav.services.obrand")}</Link>
              <Link href="/for-korean-brands" onClick={() => setMenuOpen(false)}>{t("nav.services.kbrand")}</Link>
            </div>
          </div>
          <Link href="/network" onClick={() => setMenuOpen(false)}>{t("nav.network")}</Link>
          <a href="/matching-pool/" onClick={() => setMenuOpen(false)}>{t("nav.pool")}</a>
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
                  {l === "ko" ? "KO" : l === "zh" ? "中文" : l === "en" ? "EN" : "JP"}
                </button>
              </span>
            ))}
          </div>
          <Link href="/contact" className="nav-cta">{t("nav.cta")}</Link>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile right: 문의하기 + Language 드롭다운 */}
        <div className="nav-mobile-right">
          <Link href="/contact" className="nav-mobile-cta">문의하기</Link>
          <div className="nav-mobile-lang-wrap" ref={langWrapRef}>
            <button
              className={`nav-mobile-lang ${langOpen ? "open" : ""}`}
              onClick={() => setLangOpen(o => !o)}
              aria-haspopup="true"
              aria-expanded={langOpen}
            >
              <span className="nml-globe" aria-hidden>🌐</span>
              <span>Language</span>
              <span className="nml-caret" aria-hidden>▾</span>
            </button>
            <div className={`nav-mobile-lang-menu ${langOpen ? "open" : ""}`} role="menu">
              {LANG_OPTIONS.map(opt => (
                <button
                  key={opt.code}
                  role="menuitem"
                  className={`nav-mobile-lang-item ${lang === opt.code ? "active" : ""}`}
                  onClick={() => {
                    setLang(opt.code);
                    setLangOpen(false);
                  }}
                >
                  <span className="nml-code">{opt.code.toUpperCase()}</span>
                  <span className="nml-label">{opt.label}</span>
                  {lang === opt.code && <span className="nml-check" aria-hidden>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Mobile-only menu bar */}
      <div className="nav-mobile-bar">
        <Link href="/about">{t("nav.about")}</Link>
        <Link href="/for-korean-brands">{t("nav.services")}</Link>
        <Link href="/network">{t("nav.network")}</Link>
        <a href="/matching-pool/">{t("nav.pool")}</a>
        <Link href="/process">{t("nav.process")}</Link>
        <Link href="/contact">{t("nav.contact")}</Link>
      </div>
    </nav>
  );
}
