"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import PageEnter from "@/components/PageEnter";
import type { Lang } from "@/lib/i18n";

const C: Record<Lang, any> = {
  ko: {
    crumb: "NETWORK · 자원 풀",
    h1: "왕홍 · 연예인 · 크리에이터 — 검증된 자원 풀.",
    lead: "중국 왕홍 1,500+ 통합 네트워크와 한국 정상급 연예인 200+ 협업 풀, 그리고 한국 라이브 크리에이터까지 — 단일 창구로 매칭합니다.",
    eb1: "WANGHONG INFRASTRUCTURE", st1: "콘텐츠 왕홍과 커머스 왕홍, 두 축의 운영",
    sl1: "중국 왕홍은 역할과 목적에 따라 운영 방식이 다릅니다. 엔라이브는 브랜드 단계에 맞춰 두 축을 조합해 운영합니다.",
    wh: [
      { l: "CONTENT WANGHONG", t: "콘텐츠 왕홍", p: "샤오홍슈 · 웨이보 · 비리비리", k: "노출 · 저장 · 검색량", u: "신제품 런칭 · 브랜드 인지 구축" },
      { l: "COMMERCE WANGHONG", t: "커머스 왕홍", p: "더우인 · 콰이쇼우 · 타오바오 라이브", k: "GMV · 전환율 · ROI", u: "판매 확산 · 대량 전환" },
    ],
    eb2: "KOREAN INFLUENCER POOL", st2: "한국 인플루언서 4단계 풀",
    tiers: [
      { n: "10+", t: "쇼호스트 · 방송 MC", d: "라이브커머스 전문 진행 · 뷰티·패션·라이프 카테고리 · 한중 2개국어 가능." },
      { n: "30+", t: "라이브 크리에이터", d: "Grip 등 플랫폼 크리에이터 · 누적 판매 실적 보유 · 카테고리별 전문." },
      { n: "1,500+", t: "KOL · 크리에이터 풀", d: "Instagram · YouTube · 샤오홍슈 · 주요 MCN 연동 · 카테고리별 매칭." },
      { n: "200+", t: "정상급 연예인", d: "배우 · K-POP · 가수 · BASIC/PREMIUM/유가 · PPL · 드라마 PPL." },
    ],
    ctaH: "특정 왕홍이나 연예인 매칭이 필요하신가요?", ctaP: "브랜드 카테고리와 목표를 알려주시면 맞춤 후보를 제안드립니다.",
    ctaB: "매칭 문의 →",
    pl: "플랫폼", kp: "KPI", us: "활용",
  },
  en: {
    crumb: "NETWORK · Resource Pool",
    h1: "Wanghongs · Celebrities · Creators — Verified Resource Pool.",
    lead: "1,500+ Chinese wanghong integrated network, 200+ top-tier Korean celebrity collaboration pool, plus Korean live creators — all matched through a single window.",
    eb1: "WANGHONG INFRASTRUCTURE", st1: "Content Wanghong vs Commerce Wanghong — Two-Axis Operation",
    sl1: "Chinese wanghongs operate differently depending on role and purpose. N-LIVE combines both axes according to brand stage.",
    wh: [
      { l: "CONTENT WANGHONG", t: "Content Wanghong", p: "Xiaohongshu · Weibo · Bilibili", k: "Impressions · saves · searches", u: "Product launches · brand awareness building" },
      { l: "COMMERCE WANGHONG", t: "Commerce Wanghong", p: "Douyin · Kuaishou · Taobao Live", k: "GMV · conversion · ROI", u: "Sales expansion · bulk conversion" },
    ],
    eb2: "KOREAN INFLUENCER POOL", st2: "Korean Influencer 4-Tier Pool",
    tiers: [
      { n: "10+", t: "Show Hosts · Broadcast MCs", d: "Live commerce specialists · beauty/fashion/lifestyle categories · bilingual Korean–Chinese." },
      { n: "30+", t: "Live Creators", d: "Platform creators on Grip and others · proven sales records · category specialists." },
      { n: "1,500+", t: "KOL · Creator Pool", d: "Instagram · YouTube · Xiaohongshu · major MCN integration · category-matched." },
      { n: "200+", t: "Top-Tier Celebrities", d: "Actors · K-POP · singers · BASIC / PREMIUM / paid · PPL · drama PPL." },
    ],
    ctaH: "Need a specific wanghong or celebrity match?", ctaP: "Share your brand category and goals — we'll propose tailored candidates.",
    ctaB: "Inquire about matching →",
    pl: "Platform", kp: "KPI", us: "Use",
  },
  zh: {
    crumb: "网络 · 资源池",
    h1: "达人 · 艺人 · 创作者 — 经验证的资源池。",
    lead: "1,500+ 中国达人整合网络与 200+ 韩国顶级艺人合作池,以及韩国直播创作者 — 通过单一窗口匹配。",
    eb1: "达人基础设施", st1: "内容达人与商业达人,双轴运营",
    sl1: "中国达人根据角色和目的,运营方式不同。恩联根据品牌阶段组合两个轴。",
    wh: [
      { l: "内容达人", t: "内容达人", p: "小红书 · 微博 · B站", k: "曝光 · 收藏 · 搜索量", u: "新品发布 · 品牌认知建立" },
      { l: "商业达人", t: "商业达人", p: "抖音 · 快手 · 淘宝直播", k: "GMV · 转化率 · ROI", u: "销售扩散 · 大量转化" },
    ],
    eb2: "韩国达人池", st2: "韩国达人四级池",
    tiers: [
      { n: "10+", t: "主播 · 节目主持", d: "直播电商专业主持 · 美妆/时尚/生活品类 · 中韩双语可。" },
      { n: "30+", t: "直播创作者", d: "Grip 等平台创作者 · 累积销售业绩 · 品类专家。" },
      { n: "1,500+", t: "KOL · 创作者池", d: "Instagram · YouTube · 小红书 · 主要 MCN 联动 · 按品类匹配。" },
      { n: "200+", t: "顶级艺人", d: "演员 · K-POP · 歌手 · 基础/高端/付费 · PPL · 电视剧 PPL。" },
    ],
    ctaH: "需要特定达人或艺人匹配?", ctaP: "告诉我们您的品牌品类和目标,我们将提供定制候选。",
    ctaB: "咨询匹配 →",
    pl: "平台", kp: "KPI", us: "用途",
  },
  ja: {
    crumb: "NETWORK · リソースプール",
    h1: "KOL · 芸能人 · クリエイター — 検証済みリソースプール。",
    lead: "1,500+ 中国KOL統合ネットワークと 200+ 韓国トップクラス芸能人コラボプール、そして韓国ライブクリエイターまで — 単一窓口でマッチング。",
    eb1: "WANGHONG INFRASTRUCTURE", st1: "コンテンツKOLとコマースKOL、二軸運営",
    sl1: "中国KOLは役割と目的によって運営方法が異なります。N-LIVEはブランド段階に合わせて二軸を組み合わせて運営します。",
    wh: [
      { l: "CONTENT KOL", t: "コンテンツKOL", p: "小紅書 · 微博 · Bilibili", k: "露出 · 保存 · 検索量", u: "新商品ローンチ · ブランド認知構築" },
      { l: "COMMERCE KOL", t: "コマースKOL", p: "抖音 · 快手 · 淘宝ライブ", k: "GMV · 転換率 · ROI", u: "販売拡散 · 大量転換" },
    ],
    eb2: "KOREAN INFLUENCER POOL", st2: "韓国インフルエンサー4段階プール",
    tiers: [
      { n: "10+", t: "ショーホスト · 放送MC", d: "ライブコマース専門進行 · ビューティ/ファッション/ライフカテゴリ · 韓中二か国語可。" },
      { n: "30+", t: "ライブクリエイター", d: "Gripなどプラットフォームクリエイター · 累積販売実績 · カテゴリ別専門。" },
      { n: "1,500+", t: "KOL · クリエイタープール", d: "Instagram · YouTube · 小紅書 · 主要MCN連動 · カテゴリ別マッチング。" },
      { n: "200+", t: "トップクラス芸能人", d: "俳優 · K-POP · 歌手 · BASIC / PREMIUM / 有償 · PPL · ドラマPPL。" },
    ],
    ctaH: "特定のKOLや芸能人とのマッチングが必要ですか?", ctaP: "ブランドカテゴリと目標をお知らせいただければ、カスタム候補を提案いたします。",
    ctaB: "マッチングお問い合わせ →",
    pl: "プラットフォーム", kp: "KPI", us: "活用",
  },
};

export default function NetworkPage() {
  const { lang } = useLang();
  const t = C[lang];
  return (
    <PageEnter variant="blocks" className="pt-blocks-multi">
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
          <p className="detail-lead">{t.sl1}</p>
          <div className="detail-grid">
            {t.wh.map((w: any, i: number) => (
              <div className="detail-item" key={i}>
                <div className="detail-item-num">{w.l}</div>
                <h4>{w.t}</h4>
                <p>
                  <strong>{t.pl}:</strong> {w.p}<br />
                  <strong>{t.kp}:</strong> {w.k}<br />
                  <strong>{t.us}:</strong> {w.u}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section dark">
        <div className="container">
          <div className="detail-eyebrow">{t.eb2}</div>
          <h2 className="detail-title">{t.st2}</h2>
          <div className="stack-list">
            {t.tiers.map((tier: any, i: number) => (
              <div className="stack-row" key={i} style={{ background: 'transparent' }}>
                <div className="num">{tier.n}</div>
                <div>
                  <h4 style={{ color: '#fff' }}>{tier.t}</h4>
                  <p style={{ color: 'rgba(255,255,255,.7)' }}>{tier.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section gray">
        <div className="container">
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
