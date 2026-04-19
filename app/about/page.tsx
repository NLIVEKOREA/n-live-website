"use client";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">COMPANY · ABOUT</div>
          <h1>엔라이브 · N-LIVE · 恩联</h1>
          <p className="lead">한국과 해외의 브랜드·인플루언서·셀러·왕홍을 직접 연결하는 크로스보더 에이전시. 라이브커머스 현장 경험과 양국 네트워크를 기반으로, 단방향 수출이 아닌 양방향 비즈니스 구조를 운영합니다.</p>
        </div>
      </section>

      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">CORE VALUES</div>
          <h2 className="detail-title">엔라이브의 네 가지 경쟁력</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-item-num">01</div>
              <h4>양방향 크로스보더 구조</h4>
              <p>한국 → 해외, 해외 → 한국. 양쪽 시장을 동시에 운영하며 어느 방향의 파트너십이든 설계할 수 있습니다.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">02</div>
              <h4>중간 단계 없는 직거래</h4>
              <p>벤더·유통사를 거치지 않는 브랜드·공장 다이렉트. 파트너에게 투명한 공급망과 최적 단가.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">03</div>
              <h4>라이브커머스 현장 경험</h4>
              <p>한국 라이브커머스 현장에서 축적한 트래픽 운영·콘텐츠 기획·쇼호스트 운영 노하우.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">04</div>
              <h4>검증된 왕홍·연예인 네트워크</h4>
              <p>중국 왕홍 1,500+ 풀과 한국 정상급 연예인 200+. 기본 협찬부터 유가 협업까지 전 스펙트럼.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section gray">
        <div className="container">
          <div className="detail-eyebrow">COMPANY INFO</div>
          <h2 className="detail-title">회사 정보</h2>
          <div className="detail-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            <div className="detail-item">
              <div className="detail-item-num">COMPANY</div>
              <h4>엔라이브 (N-Live / 恩联)</h4>
              <p>한중 크로스보더 비즈니스 에이전시</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">FOUNDED</div>
              <h4>2023. 04. 19</h4>
              <p>소매업 / 전자상거래 소매 중개업</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">REG. NO.</div>
              <h4>235-17-02223</h4>
              <p>사업자 등록번호</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">ADDRESS</div>
              <h4>인천광역시 계양구 경명대로 1151</h4>
              <p>301호 (임학동 · 임학빌딩)</p>
            </div>
          </div>

          <div className="detail-cta">
            <h3>함께 만들어갈 파트너를 찾고 있습니다.</h3>
            <p>브랜드, 셀러, 왕롬, 미디어, 플랫폼 — 모든 파트너십 제안을 환영합니다.</p>
            <Link href="/contact" className="btn btn-primary">문의하기 →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
