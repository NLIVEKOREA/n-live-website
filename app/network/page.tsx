"use client";
import Link from "next/link";

export default function NetworkPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">NETWORK · 자원 풀</div>
          <h1>왕홍 · 연예인 · 크리에이터 — 검증된 자원 풀.</h1>
          <p className="lead">중국 왕홍 1,500+ 통합 네트워크와 한국 정상급 연예인 200+ 협업 풀, 그리고 한국 라이브 크리에이터까지 — 단일 창구로 매칭합니다.</p>
        </div>
      </section>

      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">WANGHONG INFRASTRUCTURE</div>
          <h2 className="detail-title">콘텐츠 왕홍과 커머스 왕홍, 두 축의 운영</h2>
          <p className="detail-lead">중국 왕홍은 역할과 목적에 따라 운영 방식이 다릅니다. 엔라이브는 브랜드 단계에 맞춰 두 축을 조합해 운영합니다.</p>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-item-num">CONTENT WANGHONG</div>
              <h4>콘텐츠 왕홍</h4>
              <p><strong>플랫폼:</strong> 샤오홍슈 · 웨이보 · 비리비리<br/><strong>KPI:</strong> 노출 · 저장 · 검색량<br/><strong>활용:</strong> 신제품 런칭 · 브랜드 인지 구축</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">COMMERCE WANGHONG</div>
              <h4>커머스 왕홍</h4>
              <p><strong>플랫폼:</strong> 더우인 · 콰이쇼우 · 타오바오 라이브<br/><strong>KPI:</strong> GMV · 전환율 · ROI<br/><strong>활용:</strong> 판매 확산 · 대량 전환</p>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section dark">
        <div className="container">
          <div className="detail-eyebrow">KOREAN INFLUENCER POOL</div>
          <h2 className="detail-title">한국 인플루언서 4단계 풀</h2>
          <div className="stack-list">
            <div className="stack-row" style={{background:'transparent'}}>
              <div className="num">10+</div>
              <div><h4 style={{color:'#fff'}}>쇼호스트 · 방송 MC</h4><p style={{color:'rgba(255,255,255,.7)'}}>라이브커머스 전문 진행 · 뷰티·패션·라이프 카테고리 · 한중 2개국어 가능.</p></div>
            </div>
            <div className="stack-row" style={{background:'transparent'}}>
              <div className="num">30+</div>
              <div><h4 style={{color:'#fff'}}>라이브 크리에이터</h4><p style={{color:'rgba(255,255,255,.7)'}}>Grip 등 플랫폼 크리에이터 · 누적 판매 실적 보유 · 카테고리별 전문.</p></div>
            </div>
            <div className="stack-row" style={{background:'transparent'}}>
              <div className="num">1,500+</div>
              <div><h4 style={{color:'#fff'}}>KOL · 크리에이터 풀</h4><p style={{color:'rgba(255,255,255,.7)'}}>Instagram · YouTube · 샤오홍슈 · 주요 MCN 연동 · 카테고리별 매칭.</p></div>
            </div>
            <div className="stack-row" style={{background:'transparent'}}>
              <div className="num">200+</div>
              <div><h4 style={{color:'#fff'}}>정상급 연예인</h4><p style={{color:'rgba(255,255,255,.7)'}}>배우 · K-POP · 가수 · BASIC/PREMIUM/유가 · PPL · 드라마 PPL.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section gray">
        <div className="container">
          <div className="detail-cta">
            <h3>특정 왕홍이나 연예인 매칭이 필요하신가요?</h3>
            <p>브랜드 카테고리와 목표를 알려주시면 맞춤 후보를 제안드립니다.</p>
            <Link href="/contact" className="btn btn-primary">매칭 문의 →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
