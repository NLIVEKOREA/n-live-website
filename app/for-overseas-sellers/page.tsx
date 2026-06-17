"use client";
import { pickLang } from "@/lib/i18n";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import PageEnter from "@/components/PageEnter";
import CaseCards from "@/components/CaseCards";
import type { Lang } from "@/lib/i18n";

const C: Record<Lang, any> = {
  ko: {
    back: "← 전체 서비스로", crumb: "SOURCING · 상품 · 브랜드 소싱",
    h1: "상품 · 브랜드 소싱 — 국내와 해외, 한 곳에서.",
    lead: "셀러·왕홍이 찾는 검증된 한국/해외 브랜드를 직공급 조건으로 매칭합니다. K-Beauty · K-Fashion · 잡화 · 헬스 등 150+ 브랜드 풀에서 카테고리 적합 후보를 48시간 내 제안드립니다.",
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
    eb3: "참고 케이스", st3: "업계 주요 성공 사례",
    cases: [
      { brand: "왕홍 '댠댠' (신쉔그룹)", metric: "3일간 매출 2,000억 원", desc: "한국 방문 3일간 라이브 4회 진행, 총 매출 약 2,000억 원(10억 위안). 더후·설화수·메디큐브 등 K뷰티 집중 판매.", img: "/images/cases/os1.jpg" },
      { brand: "리자치 (Top 왕홍)", metric: "1분 20초 · 6.3억 원", desc: "한국 유자차 제품을 1분 20초 만에 6.3억 원어치 판매. 히알루론산 제품 단일 방송 15만 병 완판 기록.", img: "/images/cases/os2.jpg" },
      { brand: "왕홍 '따루루' (700만 팔로워)", metric: "마스크팩 100만장 완판", desc: "K뷰티 마스크팩 라이브에서 100만장 완판. 500만 위안(약 11억 원) 매출로 국내 홈쇼핑 대박 수준.", img: "/images/cases/os3.jpg" },
      { brand: "중국 라이브커머스 시장", metric: "시장 규모 5.5조 위안", desc: "2024년 중국 라이브커머스 규모 5.5조 위안(약 1,018조 원), 온라인 소매 점유율 35%. 더우인 GMV 40% 점유.", img: "/images/cases/os4.jpg" },
      { brand: "크로스보더 소비자", metric: "1.88억 명 해외직구", desc: "중국 해외직구 소비자 1.88억 명으로 5년 전 대비 2배 성장. 뷰티·퍼스널케어 카테고리 28% 점유.", img: "/images/cases/os5.jpg" },
      { brand: "왕홍 Top 10", metric: "연간 판매액 11조 원", desc: "중국 왕홍 Top 10의 라이브커머스 연간 판매액 합산 11조 원 육박. K뷰티·K패션이 핵심 카테고리.", img: "/images/cases/os6.jpg" },
    ],
    pmsg: "위 사례는 공개 보도 기반입니다. 엔라이브 자체 캠페인 자료는 NDA 체결 후 공유드립니다.",
    ctaH: "한국 상품이나 한국 콘텐츠에 관심 있으신가요?", ctaP: "운영 채널과 원하는 카테고리를 알려주시면 맞춤 제안을 회신드립니다.",
    ctaB: "K-브랜드 소싱 문의 →",
  },
  en: {
    back: "← Back to all services", crumb: "SOURCING · Product · Brand Sourcing",
    h1: "Product · Brand Sourcing — domestic and overseas, in one place.",
    lead: "We match sellers and wanghongs with verified Korean/global brands under direct-supply terms. From our 150+ brand pool (K-Beauty, K-Fashion, accessories, wellness), we propose category-fit candidates within 48 hours.",
    eb1: "WHAT YOU GET", st1: "Direct Korean Product Supply + On-Site Production Support",
    sl1: "When global wanghongs and sellers handle Korean products, they usually go through multiple layers of brokers and vendors. N-LIVE connects directly with brands and factories, securing both margin and authenticity.",
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
    eb3: "REFERENCE CASES", st3: "Industry Success Stories",
    cases: [
      { brand: "Wanghong 'Dandan' (Xinxuan)", metric: "₩200B in 3 Days", desc: "4 live sessions over 3 days in Korea, total sales ~₩200B (¥1B CNY). Focused on K-beauty brands including Whoo, Sulwhasoo, Medicube.", img: "/images/cases/os1.jpg" },
      { brand: "Li Jiaqi (Top Wanghong)", metric: "₩630M in 80 Seconds", desc: "Sold ₩630M worth of Korean citron tea in just 80 seconds. Also sold out 150K bottles of hyaluronic acid in a single broadcast.", img: "/images/cases/os2.jpg" },
      { brand: "Wanghong 'Daruru' (7M Followers)", metric: "1M Masks Sold Out", desc: "Sold out 1 million K-beauty mask packs in a single live. ¥5M CNY (~₩1.1B) revenue — equivalent to a hit home shopping broadcast.", img: "/images/cases/os3.jpg" },
      { brand: "China Live Commerce Market", metric: "Market Size ¥5.5T CNY", desc: "2024 China live commerce market reached ¥5.5T CNY (~$760B). 35% of online retail. Douyin holds 40% GMV share.", img: "/images/cases/os4.jpg" },
      { brand: "Cross-Border Shoppers", metric: "188M Chinese Buyers", desc: "188 million Chinese cross-border shoppers — doubled in 5 years. Beauty & personal care holds 28% category share.", img: "/images/cases/os5.jpg" },
      { brand: "Top 10 Wanghongs", metric: "₩11T Annual Sales", desc: "Top 10 Chinese wanghongs' combined annual live commerce sales approach ₩11T. K-beauty and K-fashion are core categories.", img: "/images/cases/os6.jpg" },
    ],
    pmsg: "Above cases are based on public reports. N-LIVE's own campaign data is shared after NDA signing.",
    ctaH: "Interested in Korean products or Korean content?", ctaP: "Share your channel and desired categories — we'll respond with a tailored proposal.",
    ctaB: "Inquire about K-brand sourcing →",
  },
  zh: {
    back: "← 返回全部服务", crumb: "海外 · 卖家 · 达人",
    h1: "产品 · 品牌采购 — 国内与海外,同一个窗口。",
    lead: "为卖家和达人匹配经验证的韩国/海外品牌,按直供条件对接。从150+品牌池(美妆·服装·配饰·健康)中,48小时内提供符合品类的候选清单。",
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
    eb3: "参考案例", st3: "行业主要成功案例",
    cases: [
      { brand: "达人'丹丹' (辛选集团)", metric: "3天销售额2000亿韩元", desc: "访韩3天进行4场直播,总销售额约2000亿韩元(10亿元人民币)。集中销售后、雪花秀、Medicube等K美妆品牌。", img: "/images/cases/os1.jpg" },
      { brand: "李佳琦 (顶级达人)", metric: "80秒 · 6.3亿韩元", desc: "韩国柚子茶产品80秒内售出6.3亿韩元。玻尿酸产品单场直播15万瓶售罄。", img: "/images/cases/os2.jpg" },
      { brand: "达人'大噜噜' (700万粉丝)", metric: "面膜100万片售罄", desc: "K美妆面膜直播中100万片售罄。500万元人民币(约11亿韩元)销售额,相当于国内电视购物爆款级别。", img: "/images/cases/os3.jpg" },
      { brand: "中国直播电商市场", metric: "市场规模5.5万亿元", desc: "2024年中国直播电商规模达5.5万亿元,占在线零售35%。抖音GMV占比40%。", img: "/images/cases/os4.jpg" },
      { brand: "跨境消费者", metric: "1.88亿人海外购", desc: "中国跨境电商消费者达1.88亿人,5年翻倍增长。美妆个护品类占比28%。", img: "/images/cases/os5.jpg" },
      { brand: "达人Top 10", metric: "年销售额11万亿韩元", desc: "中国Top 10达人直播电商年销售额合计近11万亿韩元。K美妆和K时尚是核心品类。", img: "/images/cases/os6.jpg" },
    ],
    pmsg: "以上案例基于公开报道。恩联自有项目资料在签署NDA后分享。",
    ctaH: "对韩国商品或韩国内容感兴趣?", ctaP: "告诉我们您的频道和期望品类,我们将以定制方案回复。",
    ctaB: "K-品牌采购咨询 →",
  },
  ja: {
    back: "← 全サービスへ戻る", crumb: "海外 · セラー · KOL",
    h1: "商品 · ブランドソーシング — 国内と海外、一つの場所で。",
    lead: "セラー・KOLが求める検証済みの韓国/海外ブランドを直供給条件でマッチング。150+ブランドプール(K-Beauty · K-Fashion · アクセサリー · ヘルス)から、カテゴリ適合候補を48時間以内にご提案します。",
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
    eb3: "参考ケース", st3: "業界の主な成功事例",
    cases: [
      { brand: "KOL「ダンダン」(辛選グループ)", metric: "3日間で売上2,000億ウォン", desc: "訪韓3日間でライブ4回実施、総売上約2,000億ウォン(10億元)。后・雪花秀・メディキューブなどKビューティを集中販売。", img: "/images/cases/os1.jpg" },
      { brand: "リー・ジャーチー (トップKOL)", metric: "80秒 · 6.3億ウォン", desc: "韓国のユズ茶製品を80秒で6.3億ウォン分販売。ヒアルロン酸製品は単一放送で15万本完売記録。", img: "/images/cases/os2.jpg" },
      { brand: "KOL「ダルル」(700万フォロワー)", metric: "マスクパック100万枚完売", desc: "Kビューティマスクパックのライブで100万枚完売。500万元(約11億ウォン)売上で国内ホームショッピングの大ヒット級。", img: "/images/cases/os3.jpg" },
      { brand: "中国ライブコマース市場", metric: "市場規模5.5兆元", desc: "2024年中国ライブコマース規模5.5兆元(約114兆円)。オンライン小売の35%。抖音がGMVの40%を占有。", img: "/images/cases/os4.jpg" },
      { brand: "クロスボーダー消費者", metric: "1.88億人の海外直購", desc: "中国越境EC消費者1.88億人で5年前比2倍成長。ビューティ・パーソナルケアカテゴリが28%を占有。", img: "/images/cases/os5.jpg" },
      { brand: "トップ10 KOL", metric: "年間販売額11兆ウォン", desc: "中国トップ10 KOLのライブコマース年間販売額合算11兆ウォンに迫る。Kビューティ・Kファッションがコアカテゴリ。", img: "/images/cases/os6.jpg" },
    ],
    pmsg: "上記事例は公開報道に基づいています。N-LIVE自体のキャンペーン資料はNDA締結後に共有いたします。",
    ctaH: "韓国商品や韓国コンテンツにご興味がありますか?", ctaP: "運営チャネルと希望カテゴリをお知らせいただければ、カスタム提案を返信いたします。",
    ctaB: "Kブランドソーシングのお問い合わせ →",
  },
};

export default function OverseasSellersPage() {
  const { lang, t: tr } = useLang();
  const t = pickLang(C, lang);
  return (
    <PageEnter variant="curtain" theme="o-seller" color="#FF4D3A">
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
          <CaseCards cases={t.cases} accent="var(--coral)" />
          <p style={{ fontSize: 13, color: 'var(--gray-600)', textAlign: 'center', marginTop: 24, lineHeight: 1.6 }}>{t.pmsg}</p>
          <div className="detail-cta">
            <h3>{t.ctaH}</h3>
            <p>{t.ctaP}</p>
            <Link href="/contact?type=oseller" className="btn btn-primary">{t.ctaB}</Link>
          </div>
        </div>
      </section>
    </PageEnter>
  );
}
