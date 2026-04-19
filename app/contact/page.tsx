"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLang } from "@/components/LangContext";
import ContactForm from "@/components/ContactForm";
import PageEnter from "@/components/PageEnter";

function ContactInner() {
  const { t } = useLang();
  const params = useSearchParams();
  const defaultType = params.get("type") || "general";

  return (
    <PageEnter variant="fall" color="#FFB627">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">CONTACT · 문의</div>
          <h1>{t("contact.title")}</h1>
          <p className="lead">{t("contact.sub")}</p>
        </div>
      </section>

      <section className="detail-section gray">
        <div className="container">
          <div className="contact-scenarios-eyebrow">— {t("contact.scenarios.title")}</div>
          <div className="contact-scenarios">
            <div className="contact-scenario">
              <div className="cs-tag">{t("contact.scenarios.1.tag")}</div>
              <p>{t("contact.scenarios.1.text")}</p>
            </div>
            <div className="contact-scenario">
              <div className="cs-tag">{t("contact.scenarios.2.tag")}</div>
              <p>{t("contact.scenarios.2.text")}</p>
            </div>
            <div className="contact-scenario">
              <div className="cs-tag">{t("contact.scenarios.3.tag")}</div>
              <p>{t("contact.scenarios.3.text")}</p>
            </div>
            <div className="contact-scenario">
              <div className="cs-tag">{t("contact.scenarios.4.tag")}</div>
              <p>{t("contact.scenarios.4.text")}</p>
            </div>
          </div>

          <ContactForm defaultType={defaultType} />

          <div className="contact-promises">
            <span>{t("contact.promises.1")}</span>
            <span>{t("contact.promises.2")}</span>
            <span>{t("contact.promises.3")}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 60 }}>
            <div className="detail-item">
              <div className="detail-item-num">EMAIL</div>
              <h4>won4646@naver.com</h4>
              <p>영업일 48시간 이내 회신</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">ADDRESS</div>
              <h4>인천광역시 계양구 경명대로 1151</h4>
              <p>301호 (임학동 · 임학빌딩)</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">BUSINESS NO.</div>
              <h4>235-17-02223</h4>
              <p>엔라이브 (N-Live / 恩联)</p>
            </div>
          </div>
        </div>
      </section>
    </PageEnter>
  );
}

function ContactFallback() {
  // Simple multilingual loading skeleton — checks lang from <html> attr
  const messages: Record<string, string> = {
    ko: "로딩 중...",
    en: "Loading...",
    zh: "加载中...",
    ja: "読み込み中...",
  };
  // Best effort lang detection on the client
  let label = "Loading...";
  if (typeof document !== "undefined") {
    const l = document.documentElement.lang || "ko";
    label = messages[l] || messages.ko;
  }
  return (
    <div style={{ padding: "180px 32px 80px", textAlign: "center", color: "var(--gray-400)", fontSize: 14, letterSpacing: ".05em" }}>
      <div style={{ display: "inline-block", width: 16, height: 16, border: "2px solid var(--gray-200)", borderTopColor: "var(--amber)", borderRadius: "50%", animation: "spin 0.9s linear infinite", marginRight: 12, verticalAlign: "middle" }} />
      <span style={{ verticalAlign: "middle" }}>{label}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<ContactFallback />}>
      <ContactInner />
    </Suspense>
  );
}
