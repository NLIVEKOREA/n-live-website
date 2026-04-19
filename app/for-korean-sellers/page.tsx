"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import type { Lang } from "@/lib/i18n";

const C: Record<Lang, any> = {
  ko: {
    back: "← 전체 서비스로", crumb: "KOREA · SELLER · INFLUENCER",
    h1: "라이브의 다음 단계 — 국경을 넘는 콘텐츠와 상품.",
    lead: "\"국내 라이브는 돌아가는데, 해외 왕홍이랑 협업하거나 해외 상품을 라이브에 올리고 싶다.\" 엔라이브는 한국 셀러·인플루언서에게 해외 왕홍 콜라보와 해외 브랜드 상품을 동시에 연결하는 창구입니다.",
    eb1: "이 서비스로 얻는 것", st1: "협업 확장과 상품 조달, 두 방향을 동시에",
    sl1: "한국 셀러·인플루언서에게 가장 큰 장벽은 해외 왕홍과 직접 연결되지 않는 것, 그리고 해외 상품을 안정적으로 조달하는 채널이 없는 것입니다. 엔라이브는 두 가지를 단일 창구로 풀어드립니다.",
    items: [
      { n: "01 / COLLAB", t: "중국 왕홍·주파오 콜라보", d: "한중 동시 라이브, 왕홍 초대 방송, 상호 채널 크로스 프로모션. 양국 팬덤을 동시에 공략하는 기획." },
      { n: "02 / SOURCING", t: "해외 브랜드 직공급 매칭", d: "중국·해외 브랜드의 한국 라이브 전용 입점 매칭. 한국에서 희소성 있는 상품을 선점해 방송 차별화." },
      { n: "03 / CONTENT", t: "한중 이중 콘텐츠 기획", d: "한국 라이브 쇼츠를 중국 샤오홍슈·더우인으로 2차 배포, 또는 역방향 재가공. 콘텐츠 자산의 수명을 2배로." },
      { n: "04 / OPERATIONS", t: "크로스보더 정산·물류", d: "환율·관세·결제 이슈 대행. 셀러는 방송과 콘텐츠에만 집중하고, 나머지는 엔라이브가 운영." },
      { n: "05 / MATCHING", t: "카테고리별 매칭 최적화", d: "뷰티·패션·라이프스타일 등 셀러 전문 카테고리에 맞는 왕홍·브랜드를 선별 매칭합니다." },
      { n: "06 / REVENUE", t: "새로운 수익 구조", d: "단일 채널 라이브에서 벗어나 크로스보더 수수료·콘텐츠 라이센싱 등 부가 수익 라인을 설계합니다." },
    ],
    eb2: "엔라이브의 접근 방식", st2: "셀러 온보딩 프로세스",
    stages: [
      { t: "채널·카테고리 진단", d: "현재 운영 채널, 주력 카테고리, 평균 시청·전환·GMV 데이터를 기반으로 최적 협업 포맷을 설계합니다." },
      { t: "왕홍·브랜드 매칭", d: "셀러 포지셔닝에 맞는 중국 왕홍과 해외 브랜드 후보를 제안. 트라이얼 방송부터 시작합니다." },
      { t: "정착 · 반복", d: "성과가 나오는 조합을 정기 협업 구조로 굳히고, 점진적으로 더 큰 왕홍·상위 브랜드로 확장합니다." },
    ],
    eb3: "참고 케이스", st3: "주요 실행 사례", pending: "COMING SOON",
    pmsg: "상세 케이스 스터디는 준비 중입니다. 구체적인 레퍼런스가 필요하시면 문의 폼으로 요청해 주세요.",
    ctaH: "라이브의 다음 단계를 고민 중이신가요?", ctaP: "운영 채널과 관심 카테고리를 알려주시면, 맞춤 협업안을 회신드립니다.",
    ctaB: "이 서비스 문의하기 →",
  },
  en: {
    back: "← Back to all services", crumb: "KOREA · SELLER · INFLUENCER",
    h1: "The next stage of live commerce — cross-border content and products.",
    lead: "\"Domestic lives are running well, but I want to collaborate with global KOLs or sell global brands on my channel.\" N-LIVE connects Korean sellers and influencers to global wanghong collaborations and global brand sourcing — through a single window.",
    eb1: "WHAT YOU GET", st1: "Expand Collaboration and Source Products — Both Directions",
    sl1: "The biggest barriers for Korean sellers and influencers are the lack of direct connections to global wanghongs and the absence of stable channels for sourcing global products. N-LIVE solves both through one window.",
    items: [
      { n: "01 / COLLAB", t: "Chinese Wanghong · Zhubo Collaborations", d: "Simultaneous Korea–China lives, wanghong guest broadcasts, cross-channel promotions. Targeting fandoms in both countries at once." },
      { n: "02 / SOURCING", t: "Direct Global Brand Matching", d: "Matching Chinese and global brands exclusively for Korean live commerce. Secure scarce products in Korea to differentiate your shows." },
      { n: "03 / CONTENT", t: "Dual Korea–China Content Planning", d: "Distribute Korean live shorts to Xiaohongshu and Douyin in China — or reverse-direction repurposing. Double the lifespan of your content assets." },
      { n: "04 / OPERATIONS", t: "Cross-Border Settlement · Logistics", d: "We handle FX, customs, and payment issues. Sellers focus on broadcasts and content; N-LIVE runs everything else." },
      { n: "05 / MATCHING", t: "Category-Optimized Matching", d: "We curate wanghongs and brands tailored to your specialty category — beauty, fashion, lifestyle, and more." },
      { n: "06 / REVENUE", t: "New Revenue Streams", d: "Move beyond single-channel lives. We design cross-border commissions, content licensing, and other supplementary revenue lines." },
    ],
    eb2: "OUR APPROACH", st2: "Seller Onboarding Process",
    stages: [
      { t: "Channel · Category Diagnostics", d: "We design the optimal collaboration format based on your current channel, primary category, and average viewership / conversion / GMV data." },
      { t: "Wanghong · Brand Matching", d: "We propose Chinese wanghongs and global brands matching your positioning. We start with trial broadcasts." },
      { t: "Stabilize · Repeat", d: "We solidify high-performing combinations into regular collaboration structures and progressively expand to bigger wanghongs and tier-A brands." },
    ],
    eb3: "REFERENCE CASES", st3: "Selected Execution Cases", pending: "COMING SOON",
    pmsg: "Detailed case studies are in preparation. If you need specific references, please request via the inquiry form.",
    ctaH: "Considering your next move in live commerce?", ctaP: "Share your channel and category interests — we'll respond with a tailored collaboration plan.",
    ctaB: "Inquire about this service →",
  },
  zh: {
    back: "← 返回全部服务", crumb: "韩国 · 卖家 · 达人",
    h1: "直播的下一阶段 — 跨越国境的内容与商品。",
    lead: "\"国内直播运转得不错,但想与海外达人合作,或在自己的直播间销售海外商品。\" 恩联通过单一窗口,为韩国卖家和达人同时连接海外达人合作与海外品牌商品。",
    eb1: "您将获得", st1: "拓展合作与商品采购,双向同时",
    sl1: "韩国卖家和达人最大的障碍是无法与海外达人直接连接,以及缺乏稳定采购海外商品的渠道。恩联通过单一窗口同时解决两个问题。",
    items: [
      { n: "01 / 合作", t: "中国达人 · 主播联名", d: "中韩同时直播、达人嘉宾直播、跨频道交叉推广。同时打入两国粉丝群体的策划。" },
      { n: "02 / 采购", t: "海外品牌直供匹配", d: "为韩国直播专属的中国及海外品牌入驻匹配。在韩国抢先获得稀缺商品,实现节目差异化。" },
      { n: "03 / 内容", t: "中韩双语内容策划", d: "将韩国直播短视频二次分发至中国小红书、抖音,或反向再加工。让内容资产的寿命延长两倍。" },
      { n: "04 / 运营", t: "跨境结算 · 物流", d: "代理汇率、关税、支付问题。卖家专注于直播和内容,其余由恩联运营。" },
      { n: "05 / 匹配", t: "品类匹配最优化", d: "针对美妆、时尚、生活等卖家专长品类,精选匹配达人和品牌。" },
      { n: "06 / 收益", t: "新的收益结构", d: "摆脱单一频道直播,设计跨境佣金、内容授权等附加收益线。" },
    ],
    eb2: "恩联的方法", st2: "卖家入驻流程",
    stages: [
      { t: "频道 · 品类诊断", d: "基于当前运营频道、主力品类、平均观看 / 转化 / GMV 数据,设计最优合作形式。" },
      { t: "达人 · 品牌匹配", d: "推荐符合卖家定位的中国达人和海外品牌候选。从试播开始。" },
      { t: "扎根 · 反复", d: "将出成果的组合固化为定期合作结构,逐步扩展到更大的达人和顶级品牌。" },
    ],
    eb3: "参考案例", st3: "主要执行案例", pending: "敬请期待",
    pmsg: "详细案例研究正在筹备中。如需具体参考,请通过咨询表单申请。",
    ctaH: "正在思考直播的下一步?", ctaP: "告诉我们您的运营频道和兴趣品类,我们将以定制合作方案回复。",
    ctaB: "咨询此项服务 →",
  },
  ja: {
    back: "← 全サービスへ戻る", crumb: "韓国 · セラー · インフルエンサー",
    h1: "ライブの次のステージ — 国境を越えるコンテンツと商品。",
    lead: "「国内のライブは回っているが、海外KOLとコラボしたり、海外商品を自分のライブで販売したい。」N-LIVEは韓国セラー・インフルエンサーに、海外KOLコラボと海外ブランド商品を同時につなぐ窓口です。",
    eb1: "得られるもの", st1: "コラボ拡大と商品調達、両方向を同時に",
    sl1: "韓国セラー・インフルエンサーにとって最大の障壁は、海外KOLと直接つながらないこと、そして海外商品を安定的に調達するチャネルがないことです。N-LIVEはこの両方を単一窓口で解決します。",
    items: [
      { n: "01 / COLLAB", t: "中国KOL · 主播コラボ", d: "韓中同時ライブ、KOL招待放送、相互チャネル間クロスプロモーション。両国のファンダムを同時に攻略する企画。" },
      { n: "02 / SOURCING", t: "海外ブランド直供給マッチング", d: "中国・海外ブランドの韓国ライブ専用入店マッチング。韓国で希少な商品を先取りして放送を差別化。" },
      { n: "03 / CONTENT", t: "韓中二重コンテンツ企画", d: "韓国ライブのショート動画を中国の小紅書・抖音へ二次配信、または逆方向再加工。コンテンツ資産の寿命を2倍に。" },
      { n: "04 / OPERATIONS", t: "クロスボーダー精算 · 物流", d: "為替・関税・決済の問題を代行。セラーは放送とコンテンツに集中し、残りはN-LIVEが運営。" },
      { n: "05 / MATCHING", t: "カテゴリ別マッチング最適化", d: "ビューティ、ファッション、ライフスタイルなどセラーの専門カテゴリに合わせたKOL・ブランドを厳選マッチング。" },
      { n: "06 / REVENUE", t: "新しい収益構造", d: "単一チャネルのライブから脱却し、クロスボーダー手数料・コンテンツライセンシングなど付加収益ラインを設計します。" },
    ],
    eb2: "N-LIVEのアプローチ", st2: "セラーオンボーディングプロセス",
    stages: [
      { t: "チャネル · カテゴリ診断", d: "現在の運営チャネル、主力カテゴリ、平均視聴・転換・GMVデータをもとに最適なコラボ形式を設計。" },
      { t: "KOL · ブランドマッチング", d: "セラーのポジショニングに合う中国KOLと海外ブランド候補を提案。トライアル放送から始めます。" },
      { t: "定着 · 反復", d: "成果が出る組み合わせを定期コラボ構造に固定し、徐々により大きなKOL・上位ブランドへ拡張します。" },
    ],
    eb3: "参考ケース", st3: "主要実行事例", pending: "COMING SOON",
    pmsg: "詳細なケーススタディは準備中です。具体的なリファレンスが必要な場合は、お問い合わせフォームよりご依頼ください。",
    ctaH: "ライブの次のステップを検討中ですか?", ctaP: "運営チャネルと関心カテゴリをお知らせいただければ、カスタムコラボ案を返信いたします。",
    ctaB: "このサービスについてお問い合わせ →",
  },
};

export default function KoreanSellersPage() {
  const { lang } = useLang();
  const t = C[lang];
  return (
    <div className="theme-k-seller">
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
            <Link href="/contact?type=kseller" className="btn btn-primary">{t.ctaB}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
