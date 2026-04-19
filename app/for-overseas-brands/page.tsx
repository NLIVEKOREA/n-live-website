"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";

export default function OverseasBrandsPage() {
  const { t } = useLang();
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Link href="/#services" className="back-link">{t("detail.back")}</Link>
          <div className="breadcrumb">OVERSEAS · BRAND</div>
          <h1>한류 스타, 한국 KOL, 한국 시장 — 한 창구로.</h1>
          <p className="lead">"한국 연예인·KOL을 활용한 마케팅을 하고 싶거나, 한국 시장에 본격 진출하고 싶다." 엔라이브는 해외 브랜드에게 한국 아티스트·KOL 자원과 한국 라이브커머스 운영을 원스톱으로 제공합니다.</p>
        </div>
      </section>

      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">{t("detail.what")}</div>
          <h2 className="detail-title">한류 자원 풀 × 한국 시장 운영</h2>
          <p className="detail-lead">한국 연예인 마케팅은 경로가 복잡합니다. 사무소 · MCN · 에이전시가 파편화돼 있어 외부 브랜드가 직접 접근하기 어렵습니다. 엔라이브는 이 경로를 단순화합니다.</p>

          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-item-num">01 / CELEBRITY</div>
              <h4>한국 정상급 연예인 200+</h4>
              <p>배우·K-POP·가수·방송인 협업 풀. 기본 협찬부터 유가 협업·드라마 PPL까지 5단계 옵션.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">02 / KOL</div>
              <h4>한국 KOL 1,500+ 네트워크</h4>
              <p>Instagram·YouTube·샤오홍슈까지 카테고리별 전문 크리에이터. 브랜드 카테고리에 맞는 매칭 시스템.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">03 / PPL</div>
              <h4>방송 · 드라마 PPL</h4>
              <p>지상파·OTT·웹드라마 PPL 운영. 장기 노출을 통한 브랜드 고급화 전략.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">04 / LIVE COMMERCE</div>
              <h4>한국 라이브커머스 진입</h4>
              <p>Grip · 네이버쇼핑라이브 · 카카오쇼핑라이브 · 쿠팡라이브. 플랫폼별 입점과 라이브 운영 대행.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">05 / LOCALIZATION</div>
              <h4>한국 시장 현지화</h4>
              <p>한국 소비자 감각에 맞춘 브랜드 포지셔닝·패키지·카피 재설계. 진출 초기 첫인상의 중요성.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">06 / CONTENT</div>
              <h4>한국 현지 콘텐츠 제작</h4>
              <p>한국에서 촬영하는 브랜드 영상, 연예인 협업 콘텐츠, 한국 로케이션 캠페인 기획·제작.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section dark">
        <div className="container">
          <div className="detail-eyebrow">{t("detail.how")}</div>
          <h2 className="detail-title">5단계 마케팅 옵션</h2>
          <p className="detail-lead">예산과 브랜드 단계에 맞춰 조합할 수 있는 다섯 가지 한국 연예인·KOL 마케팅 모델입니다.</p>
          <div className="stack-list">
            <div className="stack-row" style={{background:'transparent'}}>
              <div className="num">01</div>
              <div><h4 style={{color:'#fff'}}>기본 협찬</h4><p style={{color:'rgba(255,255,255,.7)'}}>쇼룸 입고 · 스타일리스트 노출 · 미디어 촬영 · SNS 자연 노출.</p></div>
            </div>
            <div className="stack-row" style={{background:'transparent'}}>
              <div className="num">02</div>
              <div><h4 style={{color:'#fff'}}>프리미엄 협찬</h4><p style={{color:'rgba(255,255,255,.7)'}}>정상급 연예인 200명 풀 · 브랜드 고급 이미지 구축.</p></div>
            </div>
            <div className="stack-row" style={{background:'transparent'}}>
              <div className="num">03</div>
              <div><h4 style={{color:'#fff'}}>유가 협업</h4><p style={{color:'rgba(255,255,255,.7)'}}>연예인 지정 · 메시지 통제 · 신제품 런칭 · 이슈 메이킹.</p></div>
            </div>
            <div className="stack-row" style={{background:'transparent'}}>
              <div className="num">04</div>
              <div><h4 style={{color:'#fff'}}>SNS · YouTube PPL</h4><p style={{color:'rgba(255,255,255,.7)'}}>Instagram · YouTube 콘텐츠 · 팬덤 직격 · 글로벌 확산.</p></div>
            </div>
            <div className="stack-row" style={{background:'transparent'}}>
              <div className="num">05</div>
              <div><h4 style={{color:'#fff'}}>방송 · 드라마 PPL</h4><p style={{color:'rgba(255,255,255,.7)'}}>드라마 · 예능 · OTT 노출 · 장기 노출 · 브랜드 고급화.</p></div>
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
            <h3>한국 시장이 궁금하신가요?</h3>
            <p>브랜드·목표·예산 범위를 알려주시면 맞춤 옵션을 회신드립니다.</p>
            <Link href="/contact?type=obrand" className="btn btn-primary">{t("detail.cta")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
