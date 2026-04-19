"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import PageEnter from "@/components/PageEnter";
import CaseCards from "@/components/CaseCards";
import type { Lang } from "@/lib/i18n";

const C: Record<Lang, any> = {
  ko: {
    back: "← 전체 서비스로", crumb: "KOREA · BRAND",
    h1: "한국 브랜드의 중국 진출, 엔라이브가 채널을 엽니다.",
    lead: "\"좋은 상품은 있는데 중국에서 파는 법을 모르겠다.\" 한국 브랜드가 중국 시장에서 실질적인 성과를 내는 데 필요한 것은 상품이 아닌 검증된 채널입니다. 엔라이브는 왕홍 매칭부터 플랫폼 운영, 통관까지 직접 운영합니다.",
    eb1: "이 서비스로 얻는 것", st1: "검증된 중국 채널 × 원스톱 운영",
    sl1: "중간 에이전시, 브로커, 벤더를 거치지 않고 브랜드가 왕홍·플랫폼과 직접 연결됩니다. 파편화된 외주 대신 단일 창구에서 중국 시장 전체를 관리합니다.",
    items: [
      { n: "01 / WANGHONG", t: "검증된 중국 왕홍 매칭", d: "콘텐츠 왕홍(샤오홍슈·웨이보)과 커머스 왕홍(더우인·타오바오 라이브)을 분리해 매칭. 브랜드 인지 단계인지 전환 단계인지에 따라 왕홍 구성이 달라집니다." },
      { n: "02 / PLATFORM", t: "중국 플랫폼 실전 운영", d: "샤오홍슈 계정 세팅·콘텐츠 제작, 더우인 라이브 운영, 타오바오 스토어 연동까지 플랫폼별 실무를 직접 수행합니다." },
      { n: "03 / LOCALIZATION", t: "현지화 포지셔닝", d: "한국에서 통하던 카피·이미지가 중국에서 안 통하는 경우가 대부분입니다. 중국 소비자 언어·감각에 맞춘 메시지·비주얼을 다시 설계합니다." },
      { n: "04 / FULFILLMENT", t: "통관 · 정품 · 물류", d: "정품 인증(크로스보더·일반무역), 보세구 입고, 결제(WeChat Pay·Alipay), CS까지 실무 운영을 대행합니다." },
      { n: "05 / DATA", t: "성과 리포트 · 최적화", d: "매주 GMV·CTR·CVR 리포트와 왕홍별 성과 분석. 데이터 기반으로 다음 단계 캠페인을 설계합니다." },
      { n: "06 / STRATEGY", t: "장기 브랜드 자산화", d: "단기 판매 전환뿐 아니라 중국 시장에서 반복 구매로 이어지는 브랜드 자산 구축까지 함께 설계합니다." },
    ],
    eb2: "엔라이브의 접근 방식", st2: "3단계 실행 프레임워크",
    stages: [
      { t: "진단 · 포지셔닝", d: "브랜드·상품 진단, 중국 내 경쟁 구도 분석, 타겟 소비자·플랫폼 선정, KPI 정의." },
      { t: "매칭 · 실행", d: "단계별 왕홍 매칭, 콘텐츠·라이브 제작, 플랫폼 운영, 트래픽·판매 드라이브." },
      { t: "확장 · 자산화", d: "성과 기반 카테고리·채널 확장, 반복 협업 구조화, 장기 브랜드 포지셔닝." },
    ],
    eb3: "참고 케이스", st3: "업계 주요 성공 사례",
    cases: [
      { brand: "더후 (LG생활건강)", metric: "단일 방송 183억 원", desc: "왕홍 '댠댠'의 한국 방문 라이브 방송에서 더후 제품 매출 183억 원 달성. 같은 라이브에서 설화수 124억 원 기록.", img: "/images/cases/kb1.jpg" },
      { brand: "메디큐브 (에이피알)", metric: "4시간 만에 전량 매진", desc: "더우인 라이브커머스에서 1.2만개 기획세트 4시간 만에 전량 매진. 2025년 단일 브랜드 매출 1.4조 원 돌파.", img: "/images/cases/kb2.jpg" },
      { brand: "애경산업", metric: "17.5만개 · 45억 원", desc: "왕홍 라이브 방송에서 '시그니처 에센스 커버 팩트' 17.5만개 판매, 매출 45억 원 달성.", img: "/images/cases/kb3.jpg" },
      { brand: "제나벨", metric: "단일 방송 25억 원", desc: "중국 유명 왕홍 '따따'와 함께 진행한 라이브 방송 한 번으로 매출 25억 원 기록.", img: "/images/cases/kb4.jpg" },
      { brand: "셀인펙트", metric: "마스크팩 100만장 완판", desc: "700만 팔로워 왕홍 '따루루' 라이브로 트리플 마스크팩 100만장 완판, 매출 11억 원.", img: "/images/cases/kb5.jpg" },
      { brand: "DPC", metric: "270만 명 시청", desc: "왕홍 '코니'와의 방송 1시간 만에 270만 명 시청, 410만 좋아요 기록. 누적 시청자 550만 명 돌파.", img: "/images/cases/kb6.jpg" },
      { brand: "조선미녀", metric: "상반기 매출 1,500억 원", desc: "2024년 상반기 매출 1,500억 원으로 전년 전체 매출 초과. 아마존 선크림 부문 1위 달성.", img: "/images/cases/kb7.jpg" },
    ],
    pmsg: "위 사례는 공개 보도 기반입니다. 엔라이브 자체 캠페인 자료는 NDA 체결 후 공유드립니다.",
    ctaH: "중국 시장 진출을 검토 중이신가요?", ctaP: "브랜드·상품·목표를 알려주시면 맞춤 전략을 회신드립니다.",
    ctaB: "중국 진출 상담 신청 →",
  },
  en: {
    back: "← Back to all services", crumb: "KOREA · BRAND",
    h1: "Korean brands entering China — N-LIVE opens the channels.",
    lead: "\"We have great products, but don't know how to sell in China.\" What Korean brands need to deliver real results in China isn't more product — it's verified channels. N-LIVE operates everything directly: wanghong matching, platform ops, customs, and more.",
    eb1: "WHAT YOU GET", st1: "Verified Chinese Channels × One-Stop Operations",
    sl1: "No intermediary agencies, brokers, or vendors. Brands connect directly with wanghongs and platforms. Manage your entire China market presence through a single window instead of fragmented outsourcing.",
    items: [
      { n: "01 / WANGHONG", t: "Verified Chinese Wanghong Matching", d: "We separate content wanghongs (Xiaohongshu, Weibo) from commerce wanghongs (Douyin, Taobao Live) and match accordingly. Wanghong selection differs depending on whether you're at brand awareness or conversion stage." },
      { n: "02 / PLATFORM", t: "Hands-On Chinese Platform Operations", d: "Account setup and content production for Xiaohongshu, live operations for Douyin, store integration for Taobao — we handle each platform's operational details directly." },
      { n: "03 / LOCALIZATION", t: "Localized Positioning", d: "Copy and imagery that worked in Korea often fails in China. We redesign your messaging and visuals to match Chinese consumer language and sensibility." },
      { n: "04 / FULFILLMENT", t: "Customs · Authentication · Logistics", d: "Product authentication (cross-border or general trade), bonded warehouse intake, payment (WeChat Pay, Alipay), and customer service — full operational delegation." },
      { n: "05 / DATA", t: "Performance Reports · Optimization", d: "Weekly GMV, CTR, and CVR reports with per-wanghong performance analysis. We design the next campaign based on data." },
      { n: "06 / STRATEGY", t: "Long-Term Brand Asset Building", d: "Not just short-term sales conversion — we co-design brand asset accumulation that drives repeat purchases in the Chinese market." },
    ],
    eb2: "OUR APPROACH", st2: "3-Stage Execution Framework",
    stages: [
      { t: "Diagnose · Position", d: "Brand and product diagnostics, competitive landscape analysis in China, target consumer and platform selection, KPI definition." },
      { t: "Match · Execute", d: "Stage-appropriate wanghong matching, content and live production, platform operations, traffic and sales drive." },
      { t: "Scale · Asset-Build", d: "Performance-based category and channel expansion, structured repeat collaborations, long-term brand positioning." },
    ],
    eb3: "REFERENCE CASES", st3: "Industry Success Stories",
    cases: [
      { brand: "The History of Whoo (LG H&H)", metric: "¥183M in a Single Live", desc: "Wanghong 'Dandan' achieved ¥18.3B KRW in a single Korea-visit live broadcast. Sulwhasoo recorded ¥12.4B KRW in the same session.", img: "/images/cases/kb1.jpg" },
      { brand: "Medicube (APR)", metric: "Sold Out in 4 Hours", desc: "12,000 curated sets sold out within 4 hours on Douyin live commerce. Medicube surpassed ¥1.4T KRW in single-brand annual revenue in 2025.", img: "/images/cases/kb2.jpg" },
      { brand: "Aekyung", metric: "175K Units · ¥4.5B KRW", desc: "Sold 175,000 units of 'Signature Essence Cover Pact' via wanghong live broadcast, achieving ¥4.5B KRW in sales.", img: "/images/cases/kb3.jpg" },
      { brand: "Jenabelle", metric: "¥2.5B KRW Single Broadcast", desc: "Recorded ¥2.5B KRW in sales from a single live broadcast with top Chinese wanghong 'Dada'.", img: "/images/cases/kb4.jpg" },
      { brand: "Cellinfect", metric: "1M Masks Sold Out", desc: "7M-follower wanghong 'Daruru' sold out 1 million Triple Mask Packs via live broadcast, generating ¥1.1B KRW.", img: "/images/cases/kb5.jpg" },
      { brand: "DPC", metric: "2.7M Viewers", desc: "1-hour broadcast with wanghong 'Coni' drew 2.7M viewers and 4.1M likes. Cumulative viewers surpassed 5.5M.", img: "/images/cases/kb6.jpg" },
      { brand: "Beauty of Joseon", metric: "¥150B KRW in H1 2024", desc: "H1 2024 revenue of ¥150B KRW exceeded full-year 2023. Ranked #1 in Amazon sunscreen category.", img: "/images/cases/kb7.jpg" },
    ],
    pmsg: "Above cases are based on public reports. N-LIVE's own campaign data is shared after NDA signing.",
    ctaH: "Considering entering the Chinese market?", ctaP: "Share your brand, product, and goals — we'll respond with a tailored strategy.",
    ctaB: "Request China entry consultation →",
  },
  zh: {
    back: "← 返回全部服务", crumb: "韩国 · 品牌",
    h1: "韩国品牌进入中国市场,恩联打开渠道。",
    lead: "\"商品很好,但不知道怎么在中国卖。\" 韩国品牌要在中国市场取得实质性成果,所需的不是更多商品,而是经过验证的渠道。恩联从达人匹配到平台运营、通关,全部直接运营。",
    eb1: "您将获得", st1: "经验证的中国渠道 × 一站式运营",
    sl1: "无需中介机构、经纪人或供应商,品牌直接对接达人与平台。通过单一窗口管理整个中国市场,而非碎片化外包。",
    items: [
      { n: "01 / 达人", t: "经验证的中国达人匹配", d: "内容达人(小红书、微博)与商业达人(抖音、淘宝直播)分别匹配。根据品牌处于认知阶段还是转化阶段,达人构成不同。" },
      { n: "02 / 平台", t: "中国平台实战运营", d: "小红书账号搭建与内容制作、抖音直播运营、淘宝店铺接入,各平台业务我们直接执行。" },
      { n: "03 / 本地化", t: "本地化定位", d: "在韩国行得通的文案和形象,在中国大多失效。我们根据中国消费者的语言和审美重新设计信息和视觉。" },
      { n: "04 / 履约", t: "通关 · 正品 · 物流", d: "正品认证(跨境或一般贸易)、保税仓入库、支付(微信支付、支付宝)、客服 — 全流程运营代理。" },
      { n: "05 / 数据", t: "效果报告 · 优化", d: "每周 GMV、CTR、CVR 报告及达人绩效分析。基于数据设计下一阶段营销。" },
      { n: "06 / 战略", t: "长期品牌资产建设", d: "不只是短期销售转化,我们共同设计在中国市场带来复购的品牌资产积累。" },
    ],
    eb2: "恩联的方法", st2: "三阶段执行框架",
    stages: [
      { t: "诊断 · 定位", d: "品牌与产品诊断、中国市场竞争分析、目标消费者与平台选择、KPI 定义。" },
      { t: "匹配 · 执行", d: "分阶段达人匹配、内容与直播制作、平台运营、流量与销售推动。" },
      { t: "扩展 · 资产化", d: "基于效果的品类与渠道扩展、重复合作结构化、长期品牌定位。" },
    ],
    eb3: "参考案例", st3: "行业主要成功案例",
    cases: [
      { brand: "后 (LG生活健康)", metric: "单场直播 183亿韩元", desc: "达人'丹丹'访韩直播中,后品牌实现183亿韩元销售额。同场雪花秀录得124亿韩元。", img: "/images/cases/kb1.jpg" },
      { brand: "Medicube (APR)", metric: "4小时全部售罄", desc: "抖音直播中1.2万套策划套装4小时内售罄。2025年单品牌年销售额突破1.4万亿韩元。", img: "/images/cases/kb2.jpg" },
      { brand: "爱敬产业", metric: "17.5万件 · 45亿韩元", desc: "达人直播中'精华气垫粉饼'售出17.5万件,销售额达45亿韩元。", img: "/images/cases/kb3.jpg" },
      { brand: "Jenabelle", metric: "单场25亿韩元", desc: "与中国知名达人'大大'合作,单场直播实现25亿韩元销售额。", img: "/images/cases/kb4.jpg" },
      { brand: "Cellinfect", metric: "面膜100万片售罄", desc: "700万粉丝达人'大噜噜'直播中三重面膜100万片售罄,销售额11亿韩元。", img: "/images/cases/kb5.jpg" },
      { brand: "DPC", metric: "270万人观看", desc: "与达人'Coni'直播1小时内270万人观看,410万点赞。累计观看突破550万。", img: "/images/cases/kb6.jpg" },
      { brand: "朝鲜美女", metric: "上半年1500亿韩元", desc: "2024上半年销售额1500亿韩元,超过上年全年。亚马逊防晒霜品类排名第一。", img: "/images/cases/kb7.jpg" },
    ],
    pmsg: "以上案例基于公开报道。恩联自有项目资料在签署NDA后分享。",
    ctaH: "正在考虑进入中国市场?", ctaP: "告诉我们您的品牌、产品和目标,我们将以定制战略回复。",
    ctaB: "申请中国进入咨询 →",
  },
  ja: {
    back: "← 全サービスへ戻る", crumb: "韓国 · ブランド",
    h1: "韓国ブランドの中国進出 — N-LIVEがチャネルを開きます。",
    lead: "「商品は良いが、中国での売り方がわからない。」韓国ブランドが中国市場で実質的な成果を出すために必要なのは、商品ではなく検証済みのチャネルです。N-LIVEはKOLマッチング、プラットフォーム運営、通関まで直接運営します。",
    eb1: "得られるもの", st1: "検証済み中国チャネル × ワンストップ運営",
    sl1: "中間エージェンシー、ブローカー、ベンダーを介さず、ブランドが直接KOLとプラットフォームに接続。断片化された外注ではなく、単一窓口で中国市場全体を管理します。",
    items: [
      { n: "01 / KOL", t: "検証済み中国KOLマッチング", d: "コンテンツKOL(小紅書、微博)とコマースKOL(抖音、淘宝ライブ)を区別してマッチング。ブランド認知段階か転換段階かでKOL構成が変わります。" },
      { n: "02 / PLATFORM", t: "中国プラットフォーム実戦運営", d: "小紅書アカウント設定とコンテンツ制作、抖音ライブ運営、淘宝ストア連携まで各プラットフォームの実務を直接遂行します。" },
      { n: "03 / LOCALIZATION", t: "ローカライズドポジショニング", d: "韓国で通用したコピーや画像が中国では通じないことがほとんど。中国消費者の言語と感性に合わせてメッセージとビジュアルを再設計します。" },
      { n: "04 / FULFILLMENT", t: "通関 · 正規品 · 物流", d: "正規品認証(クロスボーダー・一般貿易)、保税倉庫入庫、決済(WeChat Pay、Alipay)、CSまで実務運営を代行。" },
      { n: "05 / DATA", t: "成果レポート · 最適化", d: "毎週のGMV、CTR、CVRレポートとKOL別パフォーマンス分析。データに基づき次の段階のキャンペーンを設計。" },
      { n: "06 / STRATEGY", t: "長期ブランド資産化", d: "短期的な販売転換だけでなく、中国市場でリピート購入につながるブランド資産の構築まで共同で設計します。" },
    ],
    eb2: "N-LIVEのアプローチ", st2: "3段階実行フレームワーク",
    stages: [
      { t: "診断 · ポジショニング", d: "ブランド・商品診断、中国国内の競争状況分析、ターゲット消費者・プラットフォーム選定、KPI定義。" },
      { t: "マッチング · 実行", d: "段階別KOLマッチング、コンテンツ・ライブ制作、プラットフォーム運営、トラフィックと販売の推進。" },
      { t: "拡張 · 資産化", d: "成果に基づくカテゴリ・チャネル拡張、反復協業の構造化、長期ブランドポジショニング。" },
    ],
    eb3: "参考ケース", st3: "業界の主な成功事例",
    cases: [
      { brand: "ザ・ヒストリー・オブ・后 (LG)", metric: "単一放送で183億ウォン", desc: "KOL「ダンダン」の訪韓ライブで后ブランドが183億ウォンの売上を達成。同放送で雪花秀は124億ウォンを記録。", img: "/images/cases/kb1.jpg" },
      { brand: "メディキューブ (APR)", metric: "4時間で完売", desc: "抖音ライブで1.2万セットの企画セットが4時間で完売。2025年に単一ブランド年間売上1.4兆ウォン突破。", img: "/images/cases/kb2.jpg" },
      { brand: "愛敬産業", metric: "17.5万個 · 45億ウォン", desc: "KOLライブで「シグニチャーエッセンスカバーパクト」17.5万個販売、売上45億ウォン達成。", img: "/images/cases/kb3.jpg" },
      { brand: "ジェナベル", metric: "単一放送で25億ウォン", desc: "中国有名KOL「ダダ」との単一ライブで売上25億ウォンを記録。", img: "/images/cases/kb4.jpg" },
      { brand: "セルインフェクト", metric: "マスクパック100万枚完売", desc: "700万フォロワーKOL「ダルル」のライブでトリプルマスクパック100万枚完売、売上11億ウォン。", img: "/images/cases/kb5.jpg" },
      { brand: "DPC", metric: "270万人視聴", desc: "KOL「コニ」との放送1時間で270万人視聴、410万いいね記録。累計視聴者550万人突破。", img: "/images/cases/kb6.jpg" },
      { brand: "朝鮮美女", metric: "上半期売上1,500億ウォン", desc: "2024年上半期の売上1,500億ウォンで前年通期を超過。Amazonサンクリーム部門1位達成。", img: "/images/cases/kb7.jpg" },
    ],
    pmsg: "上記事例は公開報道に基づいています。N-LIVE自体のキャンペーン資料はNDA締結後に共有いたします。",
    ctaH: "中国市場への進出をご検討中ですか?", ctaP: "ブランド、商品、目標をお知らせいただければ、カスタム戦略を返信いたします。",
    ctaB: "中国進出のご相談 →",
  },
};

export default function KoreanBrandsPage() {
  const { lang, t: tr } = useLang();
  const t = C[lang];
  return (
    <PageEnter variant="wipe-r" theme="k-brand" color="#FFB627">
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
          <CaseCards cases={t.cases} accent="var(--amber)" />
          <p style={{ fontSize: 13, color: 'var(--gray-600)', textAlign: 'center', marginTop: 24, lineHeight: 1.6 }}>{t.pmsg}</p>
          <div className="detail-cta">
            <h3>{t.ctaH}</h3>
            <p>{t.ctaP}</p>
            <Link href="/contact?type=kbrand" className="btn btn-primary">{t.ctaB}</Link>
          </div>
        </div>
      </section>
    </PageEnter>
  );
}
