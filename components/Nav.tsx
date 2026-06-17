"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useLang } from "./LangContext";
import { UILang } from "@/lib/i18n";

const LANG_OPTIONS: { code: UILang; label: string; short: string }[] = [
  { code: "ko", label: "한국어", short: "KO" },
  { code: "en", label: "English", short: "EN" },
  { code: "zh", label: "中文 (简体)", short: "简" },
  { code: "zh-Hant", label: "中文 (繁體)", short: "繁" },
  { code: "ja", label: "日本語", short: "JP" },
];

const GlobeIcon = () => (
  <svg className="lang-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
  </svg>
);

function LangDropdown({ variant }: { variant: "desktop" | "mobile" }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onEsc); };
  }, [open]);
  const cur = LANG_OPTIONS.find(o => o.code === lang) || LANG_OPTIONS[0];
  return (
    <div className={`lang-dd lang-dd-${variant}`} ref={ref}>
      <button className={`lang-dd-btn ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)} aria-haspopup="true" aria-expanded={open} aria-label="Language">
        <GlobeIcon />
        <span className="lang-dd-cur">{cur.short}</span>
        <span className="lang-dd-caret" aria-hidden>▾</span>
      </button>
      <div className={`lang-dd-menu ${open ? "open" : ""}`} role="menu">
        {LANG_OPTIONS.map(opt => (
          <button
            key={opt.code}
            role="menuitem"
            className={`lang-dd-item ${lang === opt.code ? "active" : ""}`}
            onClick={() => { setLang(opt.code); setOpen(false); }}
          >
            <span className="lang-dd-code">{opt.short}</span>
            <span className="lang-dd-label">{opt.label}</span>
            {lang === opt.code && <span className="lang-dd-check" aria-hidden>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Nav() {
  const { t } = useLang();
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

        {/* Desktop right: lang dropdown + CTA + hamburger(tablet) */}
        <div className="nav-right">
          <LangDropdown variant="desktop" />
          <Link href="/contact" className="nav-cta">{t("nav.cta")}</Link>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile right: 문의 + lang dropdown */}
        <div className="nav-mobile-right">
          <Link href="/contact" className="nav-mobile-cta">{t("nav.contact")}</Link>
          <LangDropdown variant="mobile" />
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
