"use client";
import Link from "next/link";

export default function ProcessPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">PROCESS · 실행 프레임워크</div>
          <h1>파트너십 실행 프레임워크.</h1>
          <p className="lead">한국 브랜드의 중국 진출이든, 해외 왕홍의 한국 상품 조달이든 — 엔라이브는 동일한 단계별 구조로 파트너십을 설계하고 실행합니다.</p>
        </div>
      </section>

      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">3-STAGE FRAMEWORK</div>
          <h2 className="detail-title">진단 → 실행 → 확장, 세 단계의 운영</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-item-num">01 / STRATEGY</div>
              <h4>전략 설계</h4>
              <p>파트너의 시장·상품·경쟁 상황을 진단하고, 타겟 포지셔닝과 KPI를 정의합니다. 채널·예산·단계별 실행안까지 설계 완료 후 합의.</p>
              <ul style={{listStyle:'none',marginTop:16,fontSize:13,color:'var(--gray-600)'}}>
                <li>· 시장 · 상품 · 경쟁 진단</li>
                <li>· 타겟 포지셔닝 · KPI 정의</li>
                <li>· 채널 · 예산 · 단계 설계</li>
              </ul>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">02 / EXECUTION</div>
              <h4>매칭 · 실행</h4>
              <p>왕홍·KOL·셀러 매칭, 콘텐츠·라이브 제작, 플랫폼별 운영을 실행합니다. 매주 성과 리포트로 드리프트 방지.</p>
              <ul style={{listStyle:'none',marginTop:16,fontSize:13,color:'var(--gray-600)'}}>
                <li>· 왕홍 · KOL · 셀러 매칭</li>
                <li>· 콘텐츠 · 라이브 운영</li>
                <li>· 플랫폼별 트래픽 분산 운영</li>
              </ul>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">03 / SCALING</div>
              <h4>확장 · 자산화</h4>
              <p>성과 기반으로 채널·카테고리를 확장하고, 반복 협업 구조와 장기 브랜드 자산을 구축합니다.</p>
              <ul style={{listStyle:'none',marginTop:16,fontSize:13,color:'var(--gray-600)'}}>
                <li>· 데이터 기반 콘텐츠 최적화</li>
                <li>· 반복 협업 · 카테고리 확장</li>
                <li>· 장기 브랜드 자산 구축</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section gray">
        <div className="container">
          <div className="detail-eyebrow">REPORTING</div>
          <h2 className="detail-title">투명한 성과 리포팅</h2>
          <p className="detail-lead">모든 파트너에게 주간 · 월간 성과 리포트를 제공합니다. 왕홍·셀러별 GMV, 플랫폼별 CTR·CVR, 콘텐츠 성과 데이터까지 — 의사결정에 필요한 모든 숫자를 한 장에.</p>
          <div className="pending-box">
            <div className="pending-label">SAMPLE REPORT</div>
            <p>파트너십 시작 전 샘플 리포트를 요청하실 수 있습니다. 문의 폼에서 "리포트 샘플 요청"을 선택해주세요.</p>
          </div>

          <div className="detail-cta">
            <h3>프로세스를 실제 우리 프로젝트에 적용해 본다면?</h3>
            <p>현재 상황과 목표를 알려주시면, 맞춤 진단부터 시작하겠습니다.</p>
            <Link href="/contact" className="btn btn-primary">파트너십 문의 →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
