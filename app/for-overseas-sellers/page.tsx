"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import type { Lang } from "@/lib/i18n";

const C: Record<Lang, any> = {
  ko: {
    back: "← 전체 서비스로", crumb: "OVERSEAS · SELLER · WANGHONG",
    h1: "한국 브랜드, 한국 콘텐츠 — 현장 지원.",
    lead: "\"한국 브랜드를 내 채널에서 판매하고 싶거나, 한국에서 직접 콘텐츠를 만들고 싶다.\" 엔라이브는 해외 왕홍·셀러에게 한국 상품 직공급과 한국 현지 운영 지원을 제공합니다.",
    eb1: "이 서비스로 얻는 것", st1: "한국 상품 직공급 + 현지 제작 지원",
    sl1: "해외 왕홍·셀러가 한국 상품을 다루려면 보통 브로커·벤더를 여러 단계 거치게 됩니다. 엔라이브는 브랜드·공장과 직접 연결해 마진과 정품성을 동시에 확보합니다.",
    items: [
      { n: "01 / K-BEAUTY", t: "K-Beauty 직공급", d: "스킨케어·메이크업·더마·기능성 화장품 전 카테고리. 브랜드 직거래 단가로 공급합니다." },
      { n: "02 / K-FASHION", t: "K-Fashion · 잡화 직공급", d: "디자이너 브랜드·SPA·스트릿·사계절 히트상품. 가방·주얼리·슈즈까지 전 시리즈." },
      { n: "03 / CONTENT", t: "한국 현지 촬영 지원", d: "방한 시 스튜디오·로케이션·스탭·장비 수배. 한국 감성 콘텐츠를 현지에서 바로 제작." },
      { n: "04 / CELEBRITY", t: "한국 연예인·KOL 콜라보", d: "왕홍 라이브에 한국 연예인·KOL 게스트 연결. 한류 팬덤을 실시간 타겟." },
      { n: "05 / PLATFORM", t: "한국 라이브 플랫폼 진입", d: "Grip · 네이버쇼핑라이브 · 카카오쇼핑라이브. 한국 내 판매 채널도 동시 운영 가능." },
      { n: "06 / OPERATIONS", t: "정산 · 물류 · 통관", d: "크로스보더 결제·환율·관세·배송 실무 대행. 셀러는 방송·콘텐츠에만 집중." },
    ],
    eb2: "엔라이브의 접근 방식", st2: "왕홍·셀러 온보딩 프로세스",
    stages: [
      { t: "채널 진단 · 상품 추천", d: "운영 채널·팬덤 성격·과거 판매 실적을 바탕으로 전환율 높은 한국 상품 카테고리를 추천합니다." },
      { t: "샘플 · 라이브 트라이얼", d: "샘플 송부 후 소규모 테스트 방송으로 시장 반응을 확인. 성과 나오는 상품을 선별합니다." },
      { t: "정기 공급 · 확장", d: "성과 상품은 정기 공급 구조로 전환. 추가 카테고리·한국 연예인 콜라보까지 단계적 확장." },
    ],
    eb3: "참고 케이스", st3: "주요 실행 사례", pending: "COMING SOON",
    pmsg: "상세 케이스 스터디는 준비 중입니다. 구체적인 레퍼런스가 필요하시면 문의 폼으로 요청해 주세요.",
    ctaH: "한국 상품이나 한국 콘텐츠에 관심 있으신가요?", ctaP: "운영 채널과 원하는 카테고리를 알려주시면 맞춤 제안을 회신드립니다.",
    ctaB: "이 서비스 문의하기 →",
  },
  en: {
    back: "← Back to all services", crumb: "OVERSEAS · SELLER · WANGHONG",
    h1: "Korean products, Korean content — on-the-ground support.",
    lead: "\"I want to sell Korean brands on my channel, or produce content directly in Korea.\" N-LIVE provides overseas wanghongs and sellers with direct Korean product sourcing and on-the-ground operational support in Korea.",
    eb1: "WHAT YOU GET", st1: "Direct Korean Product Supply + On-Site Production Support",
    sl1: "When overseas wanghongs and sellers handle Korean products, they usually go through multiple layers of brokers and vendors. N-LIVE connects directly with brands and factories, securing both margin and authenticity.",
    items: [
      { n: "01 / K-BEAUTY", t: "K-Beauty Direct Supply", d: "Skincare, makeup, derma, and functional cosmetics — full category. Supplied at direct-from-brand pricing." },
      { n: "02 / K-FASHION", t: "K-Fashion · Accessories Direct Supply", d: "Designer brands, SPA, streetwear, four-season hits. Bags, jewelry, shoes — full range." },
      { n: "03 / CONTENT", t: "Korean On-Site Filming Support", d: "When you visit Korea, we arrange studios, locations, staff, and equipment. Produce Korean-aesthetic content directly on the ground." },
      { n: "04 / CELEBRITY", t: "Korean Celebrity · KOL Collabs", d: "Connect Korean celebrities or KOLs as guests on your wanghong lives. Real-time targeting of Hallyu fandoms." },
      { n: "05 / PLATFORM", t: "Entry to Korean Live Platforms", d: "Grip, Naver Shopping Live, Kakao Shopping Live. Operate sales channels inside Korea simultaneously." },
      { n: "06 / OPERATIONS", t: "Settlement · Logistics · Customs", d: "Cross-border payment, FX, customs, and shipping handled. Sellers focus only on broadcasts and content." },
    ],
    eb2: "OUR APPROACH", st2: "Wanghong / Seller Onboarding Process",
    stages: [
      { t: "Channel Diagnostics · Product Recommendations", d: "Based on your channel, fandom characteristics, and past sales records, we recommend high-conversion Korean product categories." },
      { t: "Samples · Live Trials", d: "After samples, run small test broadcasts to verify market response. We curate the products that perform." },
      { t: "Regular Supply · Expansion", d: "Convert performing products into regular supply structures. Expand step-by-step to additional categories and Korean celebrity collaborations." },
    ],
    eb3: "REFERENCE CASES", st3: "Selected Execution Cases", pending: "COMING SOON",
    pmsg: "Detailed case studies are in preparation. If you need specific references, please request via the inquiry form.",
    ctaH: "Interested in Korean products or Korean content?", ctaP: "Share your channel and desired categories — we'll respond with a tailored proposal.",
    ctaB: "Inquire about this service →",
  },
  zh: {
    back: "← 返回全部服务", crumb: "海外 · 卖家 · 达人",
    h1: "韩国品牌、韩国内容 — 现场支持。",
    lead: "\"想在自己的频道销售韩国品牌,或在韩国直接制作内容。\" 恩联为海外达人和卖家提供韩国商品直供与韩国本地运营支持。",
    eb1: "您将获得", st1: "韩国商品直供 + 本地制作支持",
    sl1: "海外达人和卖家若要操作韩国商品,通常需要经过多层经纪人和供应商。恩联直接连接品牌和工厂,同时确保利润和正品性。",
    items: [
      { n: "01 / K-BEAUTY", t: "K-Beauty 直供", d: "护肤、彩妆、药妆、功能性化妆品全品类。以品牌直供价提供。" },
      { n: "02 / K-FASHION", t: "K-Fashion · 配饰直供", d: "设计师品牌、SPA、街头、四季热销品。包包、珠宝、鞋类全系列。" },
      { n: "03 / 内容", t: "韩国本地拍摄支持", d: "访韩时安排录影棚、外景地、工作人员、设备。在韩国当地直接制作韩式美学内容。" },
      { n: "04 / 艺人", t: "韩国艺人 · KOL 联名", d: "在达人直播中连线韩国艺人或 KOL 嘉宾。实时锁定韩流粉丝群。" },
      { n: "05 / 平台", t: "进入韩国直播平台", d: "Grip、Naver Shopping Live、Kakao Shopping Live。同时在韩国境内运营销售渠道。" },
      { n: "06 / 运营", t: "结算 · 物流 · 通关", d: "跨境支付、汇率、关税、配送实务代理。卖家只专注于直播和内容。" },
    ],
    eb2: "恩联的方法", st2: "达人 / 卖家入驻流程",
    stages: [
      { t: "频道诊断 · 商品推荐", d: "基于您的频道、粉丝特性、过往销售记录,推荐高转化率的韩国商品品类。" },
      { t: "样品 · 直播试播", d: "送样后通过小规模测试播验证市场反应。精选有成果的商品。" },
      { t: "定期供货 · 扩展", d: "将出成果的商品转为定期供货结构。逐步扩展至更多品类与韩国艺人合作。" },
    ],
    eb3: "参考案例", st3: "主要执行案例", pending: "敬请期待",
    pmsg: "详细案例研究正在筹备中。如需具体参考,请通过咨询表单申请。",
    ctaH: "对韩国商品或韩国内容感兴趣?", ctaP: "告诉我们您的频道和期望品类,我们将以定制方案回复。",
    ctaB: "咨询此项服务 →",
  },
  ja: {
    back: "← 全サービスへ戻る", crumb: "海外 · セラー · KOL",
    h1: "韓国ブランド、韓国コンテンツ — 現地サポート。",
    lead: "「韓国ブランドを自分のチャネルで販売したい、または韓国で直接コンテンツを制作したい。」N-LIVEは海外KOL・セラーに、韓国商品の直供給と韓国現地での運営サポートを提供します。",
    eb1: "得られるもの", st1: "韓国商品直供給 + 現地制作サポート",
    sl1: "海外KOL・セラーが韓国商品を扱うには、通常複数層のブローカー・ベンダーを経由します。N-LIVEはブランド・工場と直接連携し、マージンと正規品性を同時に確保します。",
    items: [
      { n: "01 / K-BEAUTY", t: "K-Beauty 直供給", d: "スキンケア、メイク、ダーマ、機能性化粧品の全カテゴリ。ブランド直供価格で供給します。" },
      { n: "02 / K-FASHION", t: "K-Fashion · アクセサリー直供給", d: "デザイナーブランド、SPA、ストリート、四季のヒット商品。バッグ、ジュエリー、シューズまで全シリーズ。" },
      { n: "03 / CONTENT", t: "韓国現地撮影サポート", d: "訪韓時にスタジオ、ロケーション、スタッフ、機材を手配。韓国の感性コンテンツを現地で直接制作。" },
      { n: "04 / CELEBRITY", t: "韓国芸能人 · KOLコラボ", d: "KOLライブに韓国芸能人やKOLゲストを接続。韓流ファンダムをリアルタイムにターゲット。" },
      { n: "05 / PLATFORM", t: "韓国ライブプラットフォーム参入", d: "Grip、Naver Shopping Live、Kakao Shopping Live。韓国国内の販売チャネルも同時運営可能。" },
      { n: "06 / OPERATIONS", t: "精算 · 物流 · 通関", d: "クロスボーダー決済、為替、関税、配送実務を代行。セラーは放送・コンテンツに集中。" },
    ],
    eb2: "N-LIVEのアプローチ", st2: "KOL / セラーオンボーディングプロセス",
    stages: [
      { t: "チャネル診断 · 商品推奨", d: "運営チャネル、ファンダム特性、過去の販売実績をもとに、転換率の高い韓国商品カテゴリを推奨します。" },
      { t: "サンプル · ライブトライアル", d: "サンプル送付後、小規模テスト放送で市場反応を確認。成果が出る商品を厳選します。" },
      { t: "定期供給 · 拡張", d: "成果商品を定期供給構造に転換。追加カテゴリと韓国芸能人コラボまで段階的に拡張。" },
    ],
    eb3: "参考ケース", st3: "主要実行事例", pending: "COMING SOON",
    pmsg: "詳細なケーススタディは準備中です。具体的なリファレンスが必要な場合は、お問い合わせフォームよりご依頼ください。",
    ctaH: "韓国商品や韓国コンテンツにご興味がありますか?", ctaP: "運営チャネルと希望カテゴリをお知らせいただければ、カスタム提案を返信いたします。",
    ctaB: "このサービスについてお問い合わせ →",
  },
};

export default function OverseasSellersPage() {
  const { lang } = useLang();
  const t = C[lang];
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Link href="/#services" className="back-link">{t.back}</Link>
          <div className="breadcrumb">{t.crumb}</div>
          <h1>{t.h1}</h1>
          <p className="lead">{t.lead}</p>
        </div>
      </section>

      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">{t.eb1}</div>
          <h2 className="detail-title">{t.st1}</h2>
          <p className="detail-lead">{t.sl1}</p>
          <div className="detail-grid">
            {t.items.map((it: any, i: number) => (
              <div className="detail-item" key={i}>
                <div className="detail-item-num">{it.n}</div>
                <h4>{it.t}</h4>
                <p>{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section gray">
        <div className="container">
          <div className="detail-eyebrow">{t.eb2}</div>
          <h2 className="detail-title">{t.st2}</h2>
          <div className="stack-list">
            {t.stages.map((s: any, i: number) => (
              <div className="stack-row" key={i}>
                <div className="num">0{i + 1}</div>
                <div><h4>{s.t}</h4><p>{s.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">{t.eb3}</div>
          <h2 className="detail-title">{t.st3}</h2>
          <div className="pending-box">
            <div className="pending-label">{t.pending}</div>
            <p>{t.pmsg}</p>
          </div>
          <div className="detail-cta">
            <h3>{t.ctaH}</h3>
            <p>{t.ctaP}</p>
            <Link href="/contact?type=oseller" className="btn btn-primary">{t.ctaB}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
