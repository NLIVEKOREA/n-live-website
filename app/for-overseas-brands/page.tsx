"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import type { Lang } from "@/lib/i18n";

const C: Record<Lang, any> = {
  ko: {
    back: "← 전체 서비스로", crumb: "OVERSEAS · BRAND",
    h1: "한류 스타, 한국 KOL, 한국 시장 — 한 창구로.",
    lead: "\"한국 연예인·KOL을 활용한 마케팅을 하고 싶거나, 한국 시장에 본격 진출하고 싶다.\" 엔라이브는 해외 브랜드에게 한국 아티스트·KOL 자원과 한국 라이브커머스 운영을 원스톱으로 제공합니다.",
    eb1: "이 서비스로 얻는 것", st1: "한류 자원 풀 × 한국 시장 운영",
    sl1: "한국 연예인 마케팅은 경로가 복잡합니다. 사무소·MCN·에이전시가 파편화돼 있어 외부 브랜드가 직접 접근하기 어렵습니다. 엔라이브는 이 경로를 단순화합니다.",
    items: [
      { n: "01 / CELEBRITY", t: "한국 정상급 연예인 200+", d: "배우·K-POP·가수·방송인 협업 풀. 기본 협찬부터 유가 협업·드라마 PPL까지 5단계 옵션." },
      { n: "02 / KOL", t: "한국 KOL 1,500+ 네트워크", d: "Instagram·YouTube·샤오홍슈까지 카테고리별 전문 크리에이터. 브랜드 카테고리에 맞는 매칭 시스템." },
      { n: "03 / PPL", t: "방송 · 드라마 PPL", d: "지상파·OTT·웹드라마 PPL 운영. 장기 노출을 통한 브랜드 고급화 전략." },
      { n: "04 / LIVE COMMERCE", t: "한국 라이브커머스 진입", d: "Grip · 네이버쇼핑라이브 · 카카오쇼핑라이브 · 쿠팡라이브. 플랫폼별 입점과 라이브 운영 대행." },
      { n: "05 / LOCALIZATION", t: "한국 시장 현지화", d: "한국 소비자 감각에 맞춘 브랜드 포지셔닝·패키지·카피 재설계. 진출 초기 첫인상의 중요성." },
      { n: "06 / CONTENT", t: "한국 현지 콘텐츠 제작", d: "한국에서 촬영하는 브랜드 영상, 연예인 협업 콘텐츠, 한국 로케이션 캠페인 기획·제작." },
    ],
    eb2: "엔라이브의 접근 방식", st2: "5단계 마케팅 옵션",
    sl2: "예산과 브랜드 단계에 맞춰 조합할 수 있는 다섯 가지 한국 연예인·KOL 마케팅 모델입니다.",
    stages: [
      { t: "기본 협찬", d: "쇼룸 입고 · 스타일리스트 노출 · 미디어 촬영 · SNS 자연 노출." },
      { t: "프리미엄 협찬", d: "정상급 연예인 200명 풀 · 브랜드 고급 이미지 구축." },
      { t: "유가 협업", d: "연예인 지정 · 메시지 통제 · 신제품 런칭 · 이슈 메이킹." },
      { t: "SNS · YouTube PPL", d: "Instagram · YouTube 콘텐츠 · 팬덤 직격 · 글로벌 확산." },
      { t: "방송 · 드라마 PPL", d: "드라마 · 예능 · OTT 노출 · 장기 노출 · 브랜드 고급화." },
    ],
    eb3: "참고 케이스", st3: "주요 실행 사례", pending: "COMING SOON",
    pmsg: "상세 케이스 스터디는 준비 중입니다. 구체적인 레퍼런스가 필요하시면 문의 폼으로 요청해 주세요.",
    ctaH: "한국 시장이 궁금하신가요?", ctaP: "브랜드·목표·예산 범위를 알려주시면 맞춤 옵션을 회신드립니다.",
    ctaB: "이 서비스 문의하기 →",
  },
  en: {
    back: "← Back to all services", crumb: "OVERSEAS · BRAND",
    h1: "K-Stars, Korean KOLs, the Korean market — one window.",
    lead: "\"We want to leverage Korean celebrities or KOLs for marketing, or enter the Korean market in earnest.\" N-LIVE provides overseas brands with one-stop access to Korean artist and KOL resources and Korean live commerce operations.",
    eb1: "WHAT YOU GET", st1: "Hallyu Resource Pool × Korean Market Operations",
    sl1: "Korean celebrity marketing is a complex path. Agencies, MCNs, and management companies are fragmented, making direct access hard for external brands. N-LIVE simplifies this path.",
    items: [
      { n: "01 / CELEBRITY", t: "200+ Top-Tier Korean Celebrities", d: "Actors, K-POP, singers, broadcasters — collaboration pool. Five-tier options from basic sponsorship to paid endorsement and drama PPL." },
      { n: "02 / KOL", t: "1,500+ Korean KOL Network", d: "Category-specialized creators across Instagram, YouTube, and Xiaohongshu. Matching system aligned with your brand category." },
      { n: "03 / PPL", t: "Broadcast · Drama PPL", d: "Terrestrial, OTT, and web drama PPL operations. Brand premiumization through long-term exposure." },
      { n: "04 / LIVE COMMERCE", t: "Korean Live Commerce Entry", d: "Grip, Naver Shopping Live, Kakao Shopping Live, Coupang Live. Platform-specific listing and live operations on your behalf." },
      { n: "05 / LOCALIZATION", t: "Korean Market Localization", d: "Brand positioning, packaging, and copy redesigned for Korean consumer sensibility. The importance of first impressions in early entry." },
      { n: "06 / CONTENT", t: "Korean On-Site Content Production", d: "Brand videos shot in Korea, celebrity collaboration content, Korean location campaign planning and production." },
    ],
    eb2: "OUR APPROACH", st2: "5-Tier Marketing Options",
    sl2: "Five Korean celebrity / KOL marketing models you can combine according to budget and brand stage.",
    stages: [
      { t: "Basic Sponsorship", d: "Showroom placement · stylist exposure · media shoots · organic SNS exposure." },
      { t: "Premium Sponsorship", d: "Pool of 200 top-tier celebrities · premium brand image building." },
      { t: "Paid Endorsement", d: "Designated celebrities · message control · new product launches · issue-making." },
      { t: "SNS · YouTube PPL", d: "Instagram · YouTube content · direct fandom hit · global reach." },
      { t: "Broadcast · Drama PPL", d: "Drama · variety · OTT exposure · long-term · brand premiumization." },
    ],
    eb3: "REFERENCE CASES", st3: "Selected Execution Cases", pending: "COMING SOON",
    pmsg: "Detailed case studies are in preparation. If you need specific references, please request via the inquiry form.",
    ctaH: "Curious about the Korean market?", ctaP: "Share your brand, goals, and budget range — we'll respond with tailored options.",
    ctaB: "Inquire about this service →",
  },
  zh: {
    back: "← 返回全部服务", crumb: "海外 · 品牌",
    h1: "韩流明星、韩国 KOL、韩国市场 — 一个窗口。",
    lead: "\"想利用韩国艺人或 KOL 进行营销,或正式进入韩国市场。\" 恩联为海外品牌提供韩国艺人与 KOL 资源、韩国直播电商运营的一站式服务。",
    eb1: "您将获得", st1: "韩流资源池 × 韩国市场运营",
    sl1: "韩国艺人营销路径复杂。事务所、MCN、经纪公司碎片化,外部品牌难以直接接触。恩联简化了这条路径。",
    items: [
      { n: "01 / 艺人", t: "200+ 韩国顶级艺人", d: "演员、K-POP、歌手、主持人合作池。从基础置换到付费合作、电视剧 PPL,五档可选。" },
      { n: "02 / KOL", t: "1,500+ 韩国 KOL 网络", d: "Instagram、YouTube、小红书等品类专业创作者。与品牌品类匹配的系统。" },
      { n: "03 / PPL", t: "电视 · 电视剧 PPL", d: "无线台、OTT、网剧 PPL 运营。通过长期曝光实现品牌高端化。" },
      { n: "04 / 直播电商", t: "韩国直播电商入驻", d: "Grip、Naver Shopping Live、Kakao Shopping Live、Coupang Live。各平台入驻与直播运营代理。" },
      { n: "05 / 本地化", t: "韩国市场本地化", d: "符合韩国消费者审美的品牌定位、包装、文案重新设计。进入初期第一印象的重要性。" },
      { n: "06 / 内容", t: "韩国本地内容制作", d: "在韩国拍摄的品牌视频、艺人合作内容、韩国实地宣传活动企划与制作。" },
    ],
    eb2: "恩联的方法", st2: "五档营销选项",
    sl2: "根据预算和品牌阶段可组合的五种韩国艺人 / KOL 营销模式。",
    stages: [
      { t: "基础置换", d: "样品展厅入驻 · 造型师曝光 · 媒体拍摄 · SNS 自然曝光。" },
      { t: "高端置换", d: "200名顶级艺人池 · 高端品牌形象构建。" },
      { t: "付费合作", d: "指定艺人 · 信息控制 · 新品发布 · 话题制造。" },
      { t: "SNS · YouTube PPL", d: "Instagram · YouTube 内容 · 直击粉丝群 · 全球传播。" },
      { t: "电视 · 电视剧 PPL", d: "电视剧 · 综艺 · OTT 曝光 · 长期曝光 · 品牌高端化。" },
    ],
    eb3: "参考案例", st3: "主要执行案例", pending: "敬请期待",
    pmsg: "详细案例研究正在筹备中。如需具体参考,请通过咨询表单申请。",
    ctaH: "对韩国市场感兴趣?", ctaP: "告诉我们您的品牌、目标和预算范围,我们将以定制选项回复。",
    ctaB: "咨询此项服务 →",
  },
  ja: {
    back: "← 全サービスへ戻る", crumb: "海外 · ブランド",
    h1: "韓流スター、韓国KOL、韓国市場 — 一つの窓口で。",
    lead: "「韓国芸能人やKOLを活用したマーケティングをしたい、または韓国市場に本格的に進出したい。」N-LIVEは海外ブランドに、韓国アーティスト・KOLリソースと韓国ライブコマース運営をワンストップで提供します。",
    eb1: "得られるもの", st1: "韓流リソースプール × 韓国市場運営",
    sl1: "韓国の芸能人マーケティングは経路が複雑です。事務所・MCN・エージェンシーが断片化しており、外部ブランドが直接アクセスするのは困難です。N-LIVEはこの経路を簡素化します。",
    items: [
      { n: "01 / CELEBRITY", t: "韓国トップクラス芸能人 200+", d: "俳優、K-POP、歌手、放送人のコラボプール。基本協賛から有償コラボ、ドラマPPLまで5段階のオプション。" },
      { n: "02 / KOL", t: "韓国KOL 1,500+ ネットワーク", d: "Instagram、YouTube、小紅書まで、カテゴリ専門のクリエイター。ブランドカテゴリに合わせたマッチングシステム。" },
      { n: "03 / PPL", t: "放送 · ドラマPPL", d: "地上波、OTT、ウェブドラマPPLの運営。長期露出によるブランド高級化戦略。" },
      { n: "04 / LIVE COMMERCE", t: "韓国ライブコマース参入", d: "Grip、Naver Shopping Live、Kakao Shopping Live、Coupang Live。プラットフォーム別の入店とライブ運営代行。" },
      { n: "05 / LOCALIZATION", t: "韓国市場ローカライズ", d: "韓国消費者の感性に合わせたブランドポジショニング・パッケージ・コピーの再設計。進出初期の第一印象の重要性。" },
      { n: "06 / CONTENT", t: "韓国現地コンテンツ制作", d: "韓国で撮影するブランド映像、芸能人コラボコンテンツ、韓国ロケーションキャンペーンの企画・制作。" },
    ],
    eb2: "N-LIVEのアプローチ", st2: "5段階マーケティングオプション",
    sl2: "予算とブランド段階に合わせて組み合わせられる、5種類の韓国芸能人 / KOLマーケティングモデルです。",
    stages: [
      { t: "基本協賛", d: "ショールーム搬入 · スタイリスト露出 · メディア撮影 · SNS自然露出。" },
      { t: "プレミアム協賛", d: "トップクラス芸能人200名プール · ブランド高級イメージ構築。" },
      { t: "有償コラボ", d: "芸能人指定 · メッセージ統制 · 新商品ローンチ · 話題作り。" },
      { t: "SNS · YouTube PPL", d: "Instagram · YouTubeコンテンツ · ファンダム直撃 · グローバル拡散。" },
      { t: "放送 · ドラマPPL", d: "ドラマ · バラエティ · OTT露出 · 長期露出 · ブランド高級化。" },
    ],
    eb3: "参考ケース", st3: "主要実行事例", pending: "COMING SOON",
    pmsg: "詳細なケーススタディは準備中です。具体的なリファレンスが必要な場合は、お問い合わせフォームよりご依頼ください。",
    ctaH: "韓国市場にご興味がありますか?", ctaP: "ブランド、目標、予算範囲をお知らせいただければ、カスタムオプションを返信いたします。",
    ctaB: "このサービスについてお問い合わせ →",
  },
};

export default function OverseasBrandsPage() {
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

      <section className="detail-section dark">
        <div className="container">
          <div className="detail-eyebrow">{t.eb2}</div>
          <h2 className="detail-title">{t.st2}</h2>
          <p className="detail-lead">{t.sl2}</p>
          <div className="stack-list">
            {t.stages.map((s: any, i: number) => (
              <div className="stack-row" key={i} style={{ background: 'transparent' }}>
                <div className="num">0{i + 1}</div>
                <div>
                  <h4 style={{ color: '#fff' }}>{s.t}</h4>
                  <p style={{ color: 'rgba(255,255,255,.7)' }}>{s.d}</p>
                </div>
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
            <Link href="/contact?type=obrand" className="btn btn-primary">{t.ctaB}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
