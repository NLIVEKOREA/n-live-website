"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import PageEnter from "@/components/PageEnter";
import type { Lang } from "@/lib/i18n";

const C: Record<Lang, any> = {
  ko: {
    crumb: "COMPANY · ABOUT", h1: "엔라이브 · N-LIVE · 恩联",
    lead: "엔라이브는 한국과 해외 시장을 양방향으로 잇는 라이브커머스 에이전시입니다. 브랜드·셀러·왕홍·연예인 — 4가지 파트너 카테고리를 단일 창구에서 매칭하고 직접 운영합니다.",
    eb1: "CORE VALUES", st1: "엔라이브의 네 가지 경쟁력",
    items: [
      { t: "양방향 크로스보더 구조", d: "한국 → 해외, 해외 → 한국. 양쪽 시장을 동시에 운영하며 어느 방향의 파트너십이든 설계할 수 있습니다." },
      { t: "중간 단계 없는 직거래", d: "벤더·유통사를 거치지 않는 브랜드·공장 다이렉트. 파트너에게 투명한 공급망과 최적 단가." },
      { t: "라이브커머스 현장 경험", d: "한국 라이브커머스 현장에서 축적한 트래픽 운영·콘텐츠 기획·쇼호스트 운영 노하우." },
      { t: "검증된 왕홍·연예인 네트워크", d: "중국 왕홍 500+ 풀과 한국 정상급 연예인 100+. 기본 협찬부터 유가 협업까지 전 스펙트럼." },
    ],
    eb2: "COMPANY INFO", st2: "회사 정보",
    info: [
      { l: "COMPANY", t: "엔라이브 (N-Live / 恩联)", d: "한중 크로스보더 비즈니스 에이전시" },
      { l: "FOUNDED", t: "2023. 04. 19", d: "소매업 / 전자상거래 소매 중개업" },
      { l: "REG. NO.", t: "235-17-02223", d: "사업자 등록번호" },
      { l: "ADDRESS", t: "인천광역시 계양구 경명대로 1151", d: "301호 (임학동 · 임학빌딩)" },
    ],
    ctaH: "함께 만들어갈 파트너를 찾고 있습니다.",
    ctaP: "브랜드, 셀러, 왕홍, 미디어, 플랫폼 — 모든 파트너십 제안을 환영합니다.",
    ctaB: "문의하기 →",
  },
  en: {
    crumb: "COMPANY · ABOUT", h1: "N-LIVE · 엔라이브 · 恩联",
    lead: "N-LIVE is a live commerce agency connecting Korea and global markets in both directions. We match and directly operate four partner categories — brands, sellers, wanghongs, and celebrities — through a single window.",
    eb1: "CORE VALUES", st1: "Four Competitive Edges of N-LIVE",
    items: [
      { t: "Bi-Directional Cross-Border Architecture", d: "Korea → global, global → Korea. We operate both markets simultaneously and can design partnerships in either direction." },
      { t: "Direct Deals — No Intermediaries", d: "Brand and factory direct, with no vendors or distributors. Transparent supply chain and optimal pricing for partners." },
      { t: "Live Commerce Field Experience", d: "Traffic operations, content planning, and show-host operations know-how accumulated in the Korean live commerce field." },
      { t: "Verified Wanghong · Celebrity Network", d: "500+ Chinese wanghong pool and 100+ top-tier Korean celebrities. Full spectrum from basic sponsorship to paid endorsement." },
    ],
    eb2: "COMPANY INFO", st2: "Company Information",
    info: [
      { l: "COMPANY", t: "N-LIVE (엔라이브 / 恩联)", d: "Korea–China cross-border business agency" },
      { l: "FOUNDED", t: "April 19, 2023", d: "Retail / E-commerce retail brokerage" },
      { l: "REG. NO.", t: "235-17-02223", d: "Business registration number" },
      { l: "ADDRESS", t: "1151 Gyeongmyeong-daero, Gyeyang-gu", d: "Suite 301, Imhak Building, Incheon, Korea" },
    ],
    ctaH: "We're looking for partners to build with.",
    ctaP: "Brands, sellers, wanghongs, media, platforms — all partnership proposals welcome.",
    ctaB: "Get in touch →",
  },
  zh: {
    crumb: "公司 · 关于", h1: "恩联 · N-LIVE · 엔라이브",
    lead: "恩联是双向连接韩国与海外市场的直播电商代理机构。品牌、卖家、达人、艺人 — 四类合作方均由我们在单一窗口匹配并直接运营。",
    eb1: "核心价值", st1: "恩联的四大竞争力",
    items: [
      { t: "双向跨境架构", d: "韩国→海外,海外→韩国。同时运营两个市场,可设计任一方向的合作。" },
      { t: "无中介直接交易", d: "品牌与工厂直接对接,无供应商或经销商。为合作伙伴提供透明供应链和最优价格。" },
      { t: "直播电商现场经验", d: "在韩国直播电商现场积累的流量运营、内容策划、主播运营 know-how。" },
      { t: "经验证的达人 · 艺人网络", d: "500+ 中国达人池与 100+ 韩国顶级艺人。从基础置换到付费合作的全方位覆盖。" },
    ],
    eb2: "公司信息", st2: "公司信息",
    info: [
      { l: "公司", t: "恩联 (N-LIVE / 엔라이브)", d: "韩中跨境商业代理机构" },
      { l: "成立", t: "2023年4月19日", d: "零售业 / 电子商务零售中介" },
      { l: "营业执照号", t: "235-17-02223", d: "营业执照号码" },
      { l: "地址", t: "韩国仁川广域市桂阳区景明大路1151号", d: "301室 (林鹤洞 · 林鹤大厦)" },
    ],
    ctaH: "我们正在寻找共同建设的合作伙伴。",
    ctaP: "品牌、卖家、达人、媒体、平台 — 欢迎所有合作提案。",
    ctaB: "联系我们 →",
  },
  ja: {
    crumb: "COMPANY · ABOUT", h1: "N-LIVE · 엔라이브 · 恩联",
    lead: "N-LIVEは韓国と海外市場を双方向につなぐライブコマースエージェンシーです。ブランド・セラー・KOL・芸能人 — 4つのパートナーカテゴリを単一窓口でマッチングし、直接運営します。",
    eb1: "CORE VALUES", st1: "N-LIVEの4つの競争力",
    items: [
      { t: "双方向クロスボーダー構造", d: "韓国→海外、海外→韓国。両市場を同時に運営し、どちら方向のパートナーシップでも設計できます。" },
      { t: "中間段階のない直接取引", d: "ベンダー・流通を介さない、ブランド・工場との直接取引。パートナーに透明なサプライチェーンと最適価格を。" },
      { t: "ライブコマース現場経験", d: "韓国ライブコマースの現場で蓄積したトラフィック運営、コンテンツ企画、ショーホスト運営のノウハウ。" },
      { t: "検証済みKOL・芸能人ネットワーク", d: "中国KOL 500+プールと韓国トップクラス芸能人 100+。基本協賛から有償コラボまでの全スペクトラム。" },
    ],
    eb2: "COMPANY INFO", st2: "会社情報",
    info: [
      { l: "会社", t: "N-LIVE (엔라이브 / 恩联)", d: "韓中クロスボーダービジネスエージェンシー" },
      { l: "設立", t: "2023年4月19日", d: "小売業 / 電子商取引小売仲介業" },
      { l: "事業者番号", t: "235-17-02223", d: "事業者登録番号" },
      { l: "所在地", t: "韓国仁川広域市桂陽区景明大路1151番地", d: "301号 (林鶴洞 · 林鶴ビル)" },
    ],
    ctaH: "共に作り上げるパートナーを探しています。",
    ctaP: "ブランド、セラー、KOL、メディア、プラットフォーム — すべてのパートナーシップ提案を歓迎します。",
    ctaB: "お問い合わせ →",
  },
};

export default function AboutPage() {
  const { lang } = useLang();
  const t = C[lang];
  return (
    <PageEnter variant="iris" color="#FFB627">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">{t.crumb}</div>
          <h1>{t.h1}</h1>
          <p className="lead">{t.lead}</p>
        </div>
      </section>

      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">{t.eb1}</div>
          <h2 className="detail-title">{t.st1}</h2>
          <div className="detail-grid">
            {t.items.map((it: any, i: number) => (
              <div className="detail-item" key={i}>
                <div className="detail-item-num">0{i + 1}</div>
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
          <div className="detail-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {t.info.map((info: any, i: number) => (
              <div className="detail-item" key={i}>
                <div className="detail-item-num">{info.l}</div>
                <h4>{info.t}</h4>
                <p>{info.d}</p>
              </div>
            ))}
          </div>
          <div className="detail-cta">
            <h3>{t.ctaH}</h3>
            <p>{t.ctaP}</p>
            <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--amber)', color: 'var(--black)' }}>{t.ctaB}</Link>
          </div>
        </div>
      </section>
    </PageEnter>
  );
}
