"use client";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "./LangContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image src="/logo.svg" alt="N-LIVE" width={80} height={80} />
            <p className="footer-tagline">{t("footer.tagline")}</p>
          </div>
          <div className="footer-nav">
            <h5>{t("nav.services")}</h5>
            <Link href="/for-korean-brands">{t("nav.services.kbrand")}</Link>
            <Link href="/for-korean-sellers">{t("nav.services.kseller")}</Link>
            <Link href="/for-overseas-brands">{t("nav.services.obrand")}</Link>
            <Link href="/for-overseas-sellers">{t("nav.services.oseller")}</Link>
          </div>
          <div className="footer-nav">
            <h5>COMPANY</h5>
            <Link href="/about">{t("nav.about")}</Link>
            <Link href="/network">{t("nav.network")}</Link>
            <Link href="/process">{t("nav.process")}</Link>
            <Link href="/contact">{t("nav.contact")}</Link>
          </div>
          <div className="footer-nav">
            <h5>LEGAL · CONTACT</h5>
            <Link href="/privacy">{t("footer.privacy")}</Link>
            <Link href="/terms">{t("footer.terms")}</Link>
            <a href="mailto:won4646@naver.com">won4646@naver.com</a>
          </div>
        </div>

        <div className="footer-info">
          <div><span className="info-label">{t("footer.company")}</span><span>엔라이브 (N-Live / 恩联)</span></div>
          <div><span className="info-label">{t("footer.ceo")}</span><span>황영식</span></div>
          <div><span className="info-label">{t("footer.bizno")}</span><span>235-17-02223</span></div>
          <div><span className="info-label">{t("footer.address")}</span><span>인천광역시 계양구 경명대로 1151, 301호 (임학동 · 임학빌딩)</span></div>
          <div><span className="info-label">{t("footer.email")}</span><span>won4646@naver.com</span></div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 N-LIVE 엔라이브 · 恩联</span>
          <span>{t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
