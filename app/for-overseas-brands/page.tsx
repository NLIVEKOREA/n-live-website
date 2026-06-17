"use client";
import { pickLang } from "@/lib/i18n";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import PageEnter from "@/components/PageEnter";
import CaseCards from "@/components/CaseCards";
import type { Lang } from "@/lib/i18n";

const C: Record<Lang, any> = {
  ko: {
    back: "← 전체 서비스로", crumb: "KOREA ENTRY · 한국시장 진출",
    h1: "한국시장 진출 — 셀러브리티 · KOL · 라이브 · PPL, 원스톱.",
    lead: "해외 브랜드의 한국 진출을 위한 통합 실행. 한국 정상급 연예인 100+, 인플루언서 200+, 한국 라이브 플랫폼 운영, 드라마 PPL까지 — 단일 창구에서 설계하고 직접 실행합니다.",
    eb1: "이 서비스로 얻는 것", st1: "한류 자원 풀 × 한국 시장 운영",
    sl1: "한국 연예인 마케팅은 경로가 복잡합니다. 사무소·MCN·에이전시가 파편화돼 있어 외부 브랜드가 직접 접근하기 어렵습니다. 엔라이브는 이 경로를 단순화합니다.",
    items: [
      { n: "01 / CELEBRITY", t: "한국 정상급 연예인 100+", d: "배우·K-POP·가수·방송인 협업 풀. 기본 협찬부터 유가 협업·드라마 PPL까지 5단계 옵션." },
      { n: "02 / KOL", t: "한국 KOL 200+ 네트워크", d: "Instagram·YouTube·샤오홍슈까지 카테고리별 전문 크리에이터. 브랜드 카테고리에 맞는 매칭 시스템." },
      { n: "03 / PPL", t: "방송 · 드라마 PPL", d: "지상파·OTT·웹드라마 PPL 운영. 장기 노출을 통한 브랜드 고급화 전략." },
      { n: "04 / LIVE COMMERCE", t: "한국 라이브커머스 진입", d: "Grip · 네이버쇼핑라이브 · 카카오쇼핑라이브 · 쿠팡라이브. 플랫폼별 입점과 라이브 운영 대행." },
      { n: "05 / LOCALIZATION", t: "한국 시장 현지화", d: "한국 소비자 감각에 맞춘 브랜드 포지셔닝·패키지·카피 재설계. 진출 초기 첫인상의 중요성." },
      { n: "06 / CONTENT", t: "한국 현지 콘텐츠 제작", d: "한국에서 촬영하는 브랜드 영상, 연예인 협업 콘텐츠, 한국 로케이션 캠페인 기획·제작." },
    ],
    eb2: "엔라이브의 접근 방식", st2: "5단계 마케팅 옵션",
    sl2: "예산과 브랜드 단계에 맞춰 조합할 수 있는 다섯 가지 한국 연예인·KOL 마케팅 모델입니다.",
    stages: [
      { t: "기본 협찬", d: "쇼룸 입고 · 스타일리스트 노출 · 미디어 촬영 · SNS 자연 노출." },
      { t: "프리미엄 협찬", d: "정상급 연예인 100명 풀 · 브랜드 고급 이미지 구축." },
      { t: "유가 협업", d: "연예인 지정 · 메시지 통제 · 신제품 런칭 · 이슈 메이킹." },
      { t: "SNS · YouTube PPL", d: "Instagram · YouTube 콘텐츠 · 팬덤 직격 · 글로벌 확산." },
      { t: "방송 · 드라마 PPL", d: "드라마 · 예능 · OTT 노출 · 장기 노출 · 브랜드 고급화." },
    ],
    eb3: "참고 케이스", st3: "업계 주요 성공 사례",
    cases: [
      { brand: "Dior × 지수 (BLACKPINK)", metric: "한국 매출 50% 증가", desc: "글로벌 앰배서더 발탁 후 Dior 한국 매출 약 6,100억 원 규모로 50% 증가. K-POP 팬덤의 조직적 소비력 입증.", img: "/images/cases/ob1.jpg" },
      { brand: "CELINE × V (BTS)", metric: "EMV 1,308만 달러", desc: "3일간 7벌의 셀린느 룩 착용, 미디어 노출 가치(EMV) 1,308만 달러 달성. 글로벌 앰배서더 효과 극대화.", img: "/images/cases/ob2.jpg" },
      { brand: "Gucci × 진 (BTS)", metric: "화보 의상 매진 사태", desc: "2024 글로벌 앰배서더 발탁 후 첫 화보 속 의상 전량 매진. 팬덤의 즉각적 구매 전환 입증.", img: "/images/cases/ob3.jpg" },
      { brand: "Prada × 카리나 (aespa)", metric: "K-POP 커뮤니티 화제", desc: "2024 브랜드 앰배서더 발탁, S/S 쇼 참석으로 K-POP 팬덤 내 브랜드 인지도 급상승.", img: "/images/cases/ob4.jpg" },
      { brand: "Louis Vuitton × 리사 (BLACKPINK)", metric: "아시아 시장 매출 견인", desc: "2024 글로벌 앰배서더 발탁. 동남아·한국·중국 팬덤을 통한 아시아 시장 매출 성장 주도.", img: "/images/cases/ob5.jpg" },
      { brand: "Burberry × 승민 (Stray Kids)", metric: "MZ세대 타깃 마케팅", desc: "2025 앰배서더 발탁. 4세대 아이돌 팬덤을 활용한 MZ세대 타깃 마케팅 전략의 대표 사례.", img: "/images/cases/ob6.jpg" },
    ],
    pmsg: "위 사례는 공개 보도 기반입니다. 엔라이브 자체 캠페인 자료는 NDA 체결 후 공유드립니다.",
    ctaH: "한국 시장이 궁금하신가요?", ctaP: "브랜드·목표·예산 범위를 알려주시면 맞춤 옵션을 회신드립니다.",
    ctaB: "한국 진출 상담 신청 →",
  },
  en: {
    back: "← Back to all services", crumb: "KOREA ENTRY · Korea Market Entry",
    h1: "Korea Market Entry — celebrities, KOLs, live, PPL — one stop.",
    lead: "Integrated execution for global brands entering Korea. 100+ top-tier celebrities, 200+ influencers, Korean live platform operations, and drama PPL — all designed and directly executed through a single window.",
    eb1: "WHAT YOU GET", st1: "Hallyu Resource Pool × Korean Market Operations",
    sl1: "Korean celebrity marketing is a complex path. Agencies, MCNs, and management companies are fragmented, making direct access hard for external brands. N-LIVE simplifies this path.",
    items: [
      { n: "01 / CELEBRITY", t: "100+ Top-Tier Korean Celebrities", d: "Actors, K-POP, singers, broadcasters — collaboration pool. Five-tier options from basic sponsorship to paid endorsement and drama PPL." },
      { n: "02 / KOL", t: "200+ Korean KOL Network", d: "Category-specialized creators across Instagram, YouTube, and Xiaohongshu. Matching system aligned with your brand category." },
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
    eb3: "REFERENCE CASES", st3: "Industry Success Stories",
    cases: [
      { brand: "Dior × Jisoo (BLACKPINK)", metric: "Korea Sales +50%", desc: "After global ambassador appointment, Dior Korea revenue grew ~50% to approx. ₩610B. Proved the organized purchasing power of K-POP fandoms.", img: "/images/cases/ob1.jpg" },
      { brand: "CELINE × V (BTS)", metric: "$13.08M EMV", desc: "Wore 7 CELINE looks over 3 days, generating $13.08M in Earned Media Value. Maximized global ambassador impact.", img: "/images/cases/ob2.jpg" },
      { brand: "Gucci × Jin (BTS)", metric: "Lookbook Items Sold Out", desc: "First lookbook after 2024 global ambassador appointment sold out entirely. Proved fandom's immediate purchase conversion.", img: "/images/cases/ob3.jpg" },
      { brand: "Prada × Karina (aespa)", metric: "K-POP Community Buzz", desc: "2024 brand ambassador appointment and S/S show attendance drove massive brand awareness surge within K-POP fandoms.", img: "/images/cases/ob4.jpg" },
      { brand: "Louis Vuitton × Lisa (BLACKPINK)", metric: "Asia Market Growth Driver", desc: "2024 global ambassador. Led Asia market revenue growth through Southeast Asian, Korean, and Chinese fandoms.", img: "/images/cases/ob5.jpg" },
      { brand: "Burberry × Seungmin (Stray Kids)", metric: "Gen-Z Targeted Marketing", desc: "2025 ambassador appointment. A model case of Gen-Z targeted marketing leveraging 4th-gen idol fandoms.", img: "/images/cases/ob6.jpg" },
    ],
    pmsg: "Above cases are based on public reports. N-LIVE's own campaign data is shared after NDA signing.",
    ctaH: "Curious about the Korean market?", ctaP: "Share your brand, goals, and budget range — we'll respond with tailored options.",
    ctaB: "Request Korea entry consultation →",
  },
  zh: {
    back: "← 返回全部服务", crumb: "KOREA ENTRY · 韩国市场进入",
    h1: "韩国市场进入 — 艺人 · KOL · 直播 · PPL,一站式。",
    lead: "为海外品牌进入韩国市场提供整合执行。韩国顶级艺人100+、达人200+、韩国直播平台运营、电视剧PPL — 在单一窗口设计并直接执行。",
    eb1: "您将获得", st1: "韩流资源池 × 韩国市场运营",
    sl1: "韩国艺人营销路径复杂。事务所、MCN、经纪公司碎片化,外部品牌难以直接接触。恩联简化了这条路径。",
    items: [
      { n: "01 / 艺人", t: "100+ 韩国顶级艺人", d: "演员、K-POP、歌手、主持人合作池。从基础置换到付费合作、电视剧 PPL,五档可选。" },
      { n: "02 / KOL", t: "200+ 韩国 KOL 网络", d: "Instagram、YouTube、小红书等品类专业创作者。与品牌品类匹配的系统。" },
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
    eb3: "参考案例", st3: "行业主要成功案例",
    cases: [
      { brand: "Dior × 智秀 (BLACKPINK)", metric: "韩国销售额增长50%", desc: "全球代言人任命后,Dior韩国销售额增长约50%,达到约6100亿韩元。验证了K-POP粉丝的组织性消费力。", img: "/images/cases/ob1.jpg" },
      { brand: "CELINE × V (BTS)", metric: "EMV 1308万美元", desc: "3天内穿着7套CELINE造型,获得1308万美元的媒体曝光价值(EMV)。最大化全球代言人效果。", img: "/images/cases/ob2.jpg" },
      { brand: "Gucci × 金硕珍 (BTS)", metric: "画报服装售罄", desc: "2024年全球代言人任命后首组画报中的服装全部售罄。验证粉丝的即时购买转化力。", img: "/images/cases/ob3.jpg" },
      { brand: "Prada × Karina (aespa)", metric: "K-POP社区热议", desc: "2024年品牌代言人任命,出席S/S秀,K-POP粉丝群中品牌知名度急剧上升。", img: "/images/cases/ob4.jpg" },
      { brand: "Louis Vuitton × Lisa (BLACKPINK)", metric: "亚洲市场增长引擎", desc: "2024年全球代言人。通过东南亚、韩国、中国粉丝群推动亚洲市场收入增长。", img: "/images/cases/ob5.jpg" },
      { brand: "Burberry × 昇玟 (Stray Kids)", metric: "Z世代精准营销", desc: "2025年代言人任命。利用第四代偶像粉丝的Z世代精准营销战略的代表案例。", img: "/images/cases/ob6.jpg" },
    ],
    pmsg: "以上案例基于公开报道。恩联自有项目资料在签署NDA后分享。",
    ctaH: "对韩国市场感兴趣?", ctaP: "告诉我们您的品牌、目标和预算范围,我们将以定制选项回复。",
    ctaB: "申请韩国进入咨询 →",
  },
  ja: {
    back: "← 全サービスへ戻る", crumb: "KOREA ENTRY · 韓国市場進出",
    h1: "韓国市場進出 — 芸能人 · KOL · ライブ · PPL、ワンストップ。",
    lead: "海外ブランドの韓国進出のための統合実行。韓国トップクラス芸能人100+、インフルエンサー200+、韓国ライブプラットフォーム運営、ドラマPPLまで — 単一窓口で設計し、直接実行します。",
    eb1: "得られるもの", st1: "韓流リソースプール × 韓国市場運営",
    sl1: "韓国の芸能人マーケティングは経路が複雑です。事務所・MCN・エージェンシーが断片化しており、外部ブランドが直接アクセスするのは困難です。N-LIVEはこの経路を簡素化します。",
    items: [
      { n: "01 / CELEBRITY", t: "韓国トップクラス芸能人 100+", d: "俳優、K-POP、歌手、放送人のコラボプール。基本協賛から有償コラボ、ドラマPPLまで5段階のオプション。" },
      { n: "02 / KOL", t: "韓国KOL 200+ ネットワーク", d: "Instagram、YouTube、小紅書まで、カテゴリ専門のクリエイター。ブランドカテゴリに合わせたマッチングシステム。" },
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
    eb3: "参考ケース", st3: "業界の主な成功事例",
    cases: [
      { brand: "Dior × ジス (BLACKPINK)", metric: "韓国売上50%増加", desc: "グローバルアンバサダー就任後、Dior韓国の売上が約50%増の約6,100億ウォン規模に。K-POPファンダムの組織的消費力を実証。", img: "/images/cases/ob1.jpg" },
      { brand: "CELINE × V (BTS)", metric: "EMV 1,308万ドル", desc: "3日間で7着のCELINEルックを着用、メディア露出価値(EMV)1,308万ドルを達成。グローバルアンバサダー効果を最大化。", img: "/images/cases/ob2.jpg" },
      { brand: "Gucci × ジン (BTS)", metric: "画報衣装完売", desc: "2024年グローバルアンバサダー就任後の初画報衣装が全量完売。ファンダムの即時購買転換を実証。", img: "/images/cases/ob3.jpg" },
      { brand: "Prada × カリナ (aespa)", metric: "K-POPコミュニティで話題", desc: "2024年ブランドアンバサダー就任、S/Sショー参加でK-POPファンダム内のブランド認知度が急上昇。", img: "/images/cases/ob4.jpg" },
      { brand: "Louis Vuitton × リサ (BLACKPINK)", metric: "アジア市場売上牽引", desc: "2024年グローバルアンバサダー。東南アジア・韓国・中国のファンダムを通じたアジア市場売上成長を主導。", img: "/images/cases/ob5.jpg" },
      { brand: "Burberry × スンミン (Stray Kids)", metric: "MZ世代ターゲットマーケティング", desc: "2025年アンバサダー就任。4世代アイドルファンダムを活用したMZ世代ターゲットマーケティングの代表事例。", img: "/images/cases/ob6.jpg" },
    ],
    pmsg: "上記事例は公開報道に基づいています。N-LIVE自体のキャンペーン資料はNDA締結後に共有いたします。",
    ctaH: "韓国市場にご興味がありますか?", ctaP: "ブランド、目標、予算範囲をお知らせいただければ、カスタムオプションを返信いたします。",
    ctaB: "韓国進出のご相談 →",
  },
};

export default function OverseasBrandsPage() {
  const { lang, t: tr } = useLang();
  const t = pickLang(C, lang);
  return (
    <PageEnter variant="diagonal" theme="o-brand" color="#2D7BFF">
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
          <CaseCards cases={t.cases} accent="var(--azure)" />
          <p style={{ fontSize: 13, color: 'var(--gray-600)', textAlign: 'center', marginTop: 24, lineHeight: 1.6 }}>{t.pmsg}</p>
          <div className="detail-cta">
            <h3>{t.ctaH}</h3>
            <p>{t.ctaP}</p>
            <Link href="/contact?type=obrand" className="btn btn-primary">{t.ctaB}</Link>
          </div>
        </div>
      </section>
    </PageEnter>
  );
}
