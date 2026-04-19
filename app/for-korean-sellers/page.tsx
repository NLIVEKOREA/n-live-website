"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";

export default function KoreanSellersPage() {
  const { t } = useLang();
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Link href="/#services" className="back-link">{t("detail.back")}</Link>
          <div className="breadcrumb">KOREA · SELLER · INFLUENCER</div>
          <h1>라이브의 다음 단계 — 국경을 넘는 콘텐츠와 상품.</h1>
          <p className="lead">"국내 라이브는 돌아가는데, 해외 왕홍이랑 협업하거나 해외 상품을 라이브에 올리고 싶다." 엔라이브는 한국 셀러·인플루언서에게 해외 왕홍 콜라보와 해외 브랜드 상품을 동시에 연결하는 창구입니다.</p>
        </div>
      </section>

      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">{t("detail.what")}</div>
          <h2 className="detail-title">협업 확장과 상품 조달, 두 방향을 동시에</h2>
          <p className="detail-lead">한국 셀러·인플루언서에게 가장 큰 장벽은 해외 왕홍과 직접 연결되지 않는 것, 그리고 해외 상품을 안정적으로 조달하는 채널이 없는 것입니다. 엔라이브는 두 가지를 단일 창구로 풀어드립니다.</p>

          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-item-num">01 / COLLAB</div>
              <h4>중국 왕홍·주파오 콜라보</h4>
              <p>한중 동시 라이브, 왕홍 초대 방송, 상호 채널 크로스 프로모션. 양국 팬덤을 동시에 공략하는 기획.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">02 / SOURCING</div>
              <h4>해외 브랜드 직공급 매칭</h4>
              <p>중국·해외 브랜드의 한국 라이브 전용 입점 매칭. 한국에서 희소성 있는 상품을 선점해 방송 차별화.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">03 / CONTENT</div>
              <h4>한중 이중 콘텐츠 기획</h4>
              <p>한국 라이브 쇼츠를 중국 샤오홍슈·더우인으로 2차 배포, 또는 역방향 재가공. 콘텐츠 자산의 수명을 2배로.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">04 / OPERATIONS</div>
              <h4>크로스보더 정산·물류</h4>
              <p>환율·관세·결제 이슈 대행. 셀러는 방송과 콘텐츠에만 집중하고, 나머지는 엔라이브가 운영.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">05 / MATCHING</div>
              <h4>카테고리별 매칭 최적화</h4>
              <p>뷰티·패션·라이프스타일 등 셀러 전문 카테고리에 맞는 왕홍·브랜드를 선별 매칭합니다.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">06 / REVENUE</div>
              <h4>새로운 수익 구조</h4>
              <p>단일 채널 라이브에서 벗어나 크로스보더 수수료·콘텐츠 라이센싱 등 부가 수익 라인을 설계합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section gray">
        <div className="container">
          <div className="detail-eyebrow">{t("detail.how")}</div>
          <h2 className="detail-title">셀러 온보딩 프로세스</h2>
          <div className="stack-list">
            <div className="stack-row">
              <div className="num">01</div>
              <div>
                <h4>채널·카테고리 진단</h4>
                <p>현재 운영 채널, 주력 카테고리, 평균 시청·전환·GMV 데이터를 기반으로 최적 협업 포맷을 설계합니다.</p>
              </div>
            </div>
            <div className="stack-row">
              <div className="num">02</div>
              <div>
                <h4>왕홍·브랜드 매칭</h4>
                <p>셀러 포지셔닝에 맞는 중국 왕홍과 해외 브랜드 후보를 제안. 트라이얼 방송부터 시작합니다.</p>
              </div>
            </div>
            <div className="stack-row">
              <div className="num">03</div>
              <div>
                <h4>정착 · 반복</h4>
                <p>성과가 나오는 조합을 정기 협업 구조로 굳히고, 점진적으로 더 큰 왕홍·상위 브랜드로 확장합니다.</p>
              </div>
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
            <h3>라이브의 다음 단계를 고민 중이신가요?</h3>
            <p>운영 채널과 관심 카테고리를 알려주시면, 맞춤 협업안을 회신드립니다.</p>
            <Link href="/contact?type=kseller" className="btn btn-primary">{t("detail.cta")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
