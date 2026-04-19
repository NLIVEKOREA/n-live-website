"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLang } from "@/components/LangContext";
import ContactForm from "@/components/ContactForm";

function ContactInner() {
  const { t } = useLang();
  const params = useSearchParams();
  const defaultType = params.get("type") || "general";

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">CONTACT · 문의</div>
          <h1>{t("contact.title")}</h1>
          <p className="lead">{t("contact.sub")} 브랜드, 셀러·인플루언서, 왕홍, 미디어 파트너 — 모든 종류의 문의를 환영합니다.</p>
        </div>
      </section>

      <section className="detail-section gray">
        <div className="container">
          <ContactForm defaultType={defaultType} />

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
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div style={{ padding: 180 }}>Loading...</div>}>
      <ContactInner />
    </Suspense>
  );
}
