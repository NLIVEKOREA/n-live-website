"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";

export default function OverseasSellersPage() {
  const { t } = useLang();
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Link href="/#services" className="back-link">{t("detail.back")}</Link>
          <div className="breadcrumb">OVERSEAS · SELLER · WANGHONG</div>
          <h1>한국 브랜드, 한국 콘텐츠 — 현장 지원.</h1>
          <p className="lead">"한국 브랜드를 내 채널에서 판매하고 싶거나, 한국에서 직접 콘텐츠를 만들고 싶다." 엔라이브는 해외 왕홍·셀러에게 한국 상품 직공급과 한국 현지 운영 지원을 제공합니다.</p>
        </div>
      </section>

      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">{t("detail.what")}</div>
          <h2 className="detail-title">한국 상품 직공급 + 현지 제작 지원</h2>
          <p className="detail-lead">해외 왕홍·셀러가 한국 상품을 다루려면 보통 브로커·벤더를 여러 단계 거치게 됩니다. 엔라이브는 브랜드·공장과 직접 연결해 마진과 정품성을 동시에 확보합니다.</p>

          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-item-num">01 / K-BEAUTY</div>
              <h4>K-Beauty 직공급</h4>
              <p>스킨케어·메이크업·더마·기능성 화장품 전 카테고리. 브랜드 직거래 단가로 공급합니다.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">02 / K-FASHION</div>
              <h4>K-Fashion · 잡화 직공급</h4>
              <p>디자이너 브랜드·SPA·스트릿·사계절 히트상품. 가방·주얼리·슈즈까지 전 시리즈.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">03 / CONTENT</div>
              <h4>한국 현지 촬영 지원</h4>
              <p>방한 시 스튜디오·로케이션·스탭·장비 수배. 한국 감성 콘텐츠를 현지에서 바로 제작.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">04 / CELEBRITY</div>
              <h4>한국 연예인·KOL 콜라보</h4>
              <p>왕홍 라이브에 한국 연예인·KOL 게스트 연결. 한류 팬덤을 실시간 타겟.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">05 / PLATFORM</div>
              <h4>한국 라이브 플랫폼 진입</h4>
              <p>Grip · 네이버쇼핑라이브 · 카카오쇼핑라이브. 한국 내 판매 채널도 동시 운영 가능.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">06 / OPERATIONS</div>
              <h4>정산 · 물류 · 통관</h4>
              <p>크로스보더 결제·환율·관세·배송 실무 대행. 셀러는 방송·콘텐츠에만 집중.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section gray">
        <div className="container">
          <div className="detail-eyebrow">{t("detail.how")}</div>
          <h2 className="detail-title">왕홍·셀러 온보딩 프로세스</h2>
          <div className="stack-list">
            <div className="stack-row">
              <div className="num">01</div>
              <div><h4>채널 진단 · 상품 추천</h4><p>운영 채널·팬덤 성격·과거 판매 실적을 바탕으로 전환율 높은 한국 상품 카테고리를 추천합니다.</p></div>
            </div>
            <div className="stack-row">
              <div className="num">02</div>
              <div><h4>샘플 · 라이브 트라이얼</h4><p>샘플 송부 후 소규모 테스트 방송으로 시장 반응을 확인. 성과 나오는 상품을 선별합니다.</p></div>
            </div>
            <div className="stack-row">
              <div className="num">03</div>
              <div><h4>정기 공급 · 확장</h4><p>성과 상품은 정기 공급 구조로 전환. 추가 카테고리·한국 연예인 콜라보까지 단계적 확장.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">{t("detail.case")}</div>
          <h2 className="detail-title">참고 케이스</h2>
          <div className="pending-box">
            <div className="pending-label">COMING SOON</div>
            <p>{t("detail.case.pending")}</p>
          </div>

          <div className="detail-cta">
            <h3>한국 상품이나 한국 콘텐츠에 관심 있으신가요?</h3>
            <p>운영 채널과 원하는 카테고리를 알려주시면 맞춤 제안을 회신드립니다.</p>
            <Link href="/contact?type=oseller" className="btn btn-primary">{t("detail.cta")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
