"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";

export default function KoreanBrandsPage() {
  const { t } = useLang();
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Link href="/#services" className="back-link">{t("detail.back")}</Link>
          <div className="breadcrumb">KOREA · BRAND</div>
          <h1>한국 브랜드의 중국 진출, 엔라이브가 채널을 엽니다.</h1>
          <p className="lead">"좋은 상품은 있는데 중국에서 파는 법을 모르겠다." 한국 브랜드가 중국 시장에서 실질적인 성과를 내는 데 필요한 것은 상품이 아닌 검증된 채널입니다. 엔라이브는 왕홍 매칭부터 플랫폼 운영, 통관까지 직접 운영합니다.</p>
        </div>
      </section>

      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">{t("detail.what")}</div>
          <h2 className="detail-title">검증된 중국 채널 × 원스톱 운영</h2>
          <p className="detail-lead">중간 에이전시, 브로커, 벤더를 거치지 않고 브랜드가 왕홍·플랫폼과 직접 연결됩니다. 파편화된 외주 대신 단일 창구에서 중국 시장 전체를 관리합니다.</p>

          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-item-num">01 / WANGHONG</div>
              <h4>검증된 중국 왕홍 매칭</h4>
              <p>콘텐츠 왕홍(샤오홍슈·웨이보)과 커머스 왕홍(더우인·타오바오 라이브)을 분리해 매칭. 브랜드 인지 단계인지 전환 단계인지에 따라 왕홍 구성이 달라집니다.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">02 / PLATFORM</div>
              <h4>중국 플랫폼 실전 운영</h4>
              <p>샤오홍슈 계정 세팅 · 콘텐츠 제작 · 더우인 라이브 운영 · 타오바오 스토어 연동까지 플랫폼별 실무를 직접 수행합니다.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">03 / LOCALIZATION</div>
              <h4>현지화 포지셔닝</h4>
              <p>한국에서 통하던 카피·이미지가 중국에서 안 통하는 경우가 대부분입니다. 중국 소비자 언어·감각에 맞춘 메시지·비주얼을 다시 설계합니다.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">04 / FULFILLMENT</div>
              <h4>통관 · 정품 · 물류</h4>
              <p>정품 인증(크로스보더·일반무역), 보세구 입고, 결제(WeChat Pay · Alipay), CS까지 실무 운영을 대행합니다.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">05 / DATA</div>
              <h4>성과 리포트 · 최적화</h4>
              <p>매주 GMV·CTR·CVR 리포트와 왕홍별 성과 분석. 데이터 기반으로 다음 단계 캠페인을 설계합니다.</p>
            </div>
            <div className="detail-item">
              <div className="detail-item-num">06 / STRATEGY</div>
              <h4>장기 브랜드 자산화</h4>
              <p>단기 판매 전환뿐 아니라 중국 시장에서 반복 구매로 이어지는 브랜드 자산 구축까지 함께 설계합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section gray">
        <div className="container">
          <div className="detail-eyebrow">{t("detail.how")}</div>
          <h2 className="detail-title">엔라이브의 접근 방식</h2>
          <p className="detail-lead">모든 파트너에게 동일한 3단계 프레임워크로 접근합니다. 한국 브랜드의 경우 각 단계에서 왕홍 선택·플랫폼 조합이 어떻게 달라지는지 구체적으로 설계합니다.</p>
          <div className="stack-list">
            <div className="stack-row">
              <div className="num">01</div>
              <div>
                <h4>진단 · 포지셔닝</h4>
                <p>브랜드·상품 진단, 중국 내 경쟁 구도 분석, 타겟 소비자·플랫폼 선정, KPI 정의.</p>
              </div>
            </div>
            <div className="stack-row">
              <div className="num">02</div>
              <div>
                <h4>매칭 · 실행</h4>
                <p>단계별 왕홍 매칭, 콘텐츠·라이브 제작, 플랫폼 운영, 트래픽·판매 드라이브.</p>
              </div>
            </div>
            <div className="stack-row">
              <div className="num">03</div>
              <div>
                <h4>확장 · 자산화</h4>
                <p>성과 기반 카테고리·채널 확장, 반복 협업 구조화, 장기 브랜드 포지셔닝.</p>
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
            <h3>중국 시장 진출을 검토 중이신가요?</h3>
            <p>브랜드·상품·목표를 알려주시면 맞춤 전략을 회신드립니다.</p>
            <Link href="/contact?type=kbrand" className="btn btn-primary">{t("detail.cta")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
