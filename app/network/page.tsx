"use client";
import { pickLang, s2t } from "@/lib/i18n";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import PageEnter from "@/components/PageEnter";
import type { Lang } from "@/lib/i18n";

/* ────────────────────────────────────────────────────────────
   NETWORK PAGE — "검증된 연결 구조"
   목적: 자원 나열이 아니라, 적합한 파트너를 검증해서 연결하는 구조를 보여준다
   ──────────────────────────────────────────────────────────── */

const C: Record<Lang, any> = {
  ko: {
    crumb: "NETWORK",
    h1: "숫자가 아니라,\n검증된 연결입니다.",
    lead: "엔라이브는 자원을 나열하지 않습니다. 브랜드의 카테고리, 목표, 예산에 맞는 파트너를 직접 검증하고, 목적에 맞게 연결합니다.",

    // ── SECTION 1: 검증 기준 ──
    eb1: "HOW WE VERIFY",
    st1: "모든 파트너는 4단계 검증을 거칩니다",
    sl1: "단순 소개가 아닙니다. 실제 협업이 가능한 파트너만 매칭합니다.",
    verify: [
      { n: "01", t: "직접 미팅", d: "모든 왕홍·셀러·연예인은 엔라이브 팀이 직접 대면 또는 화상으로 만나 검증합니다. 포트폴리오만 보고 매칭하지 않습니다.", zh: "所有达人均经恩联团队亲自面谈验证" },
      { n: "02", t: "카테고리 적합성", d: "뷰티·패션·식품·헬스 — 파트너의 전문 카테고리와 브랜드 카테고리가 일치하는지 확인합니다.", zh: "确认品类匹配度" },
      { n: "03", t: "실적 데이터 검토", d: "과거 GMV, 전환율, 팔로워 품질, 콘텐츠 반응률을 데이터로 검토합니다. 팔로워 수만 많은 파트너는 제외합니다.", zh: "基于数据审核历史业绩" },
      { n: "04", t: "실행 가능성 판단", d: "스케줄, 커뮤니케이션 역량, 통관·정산 구조까지 실행 가능 여부를 사전에 확인합니다.", zh: "评估执行可行性" },
    ],

    // ── SECTION 2: 연결 가능한 파트너 유형 ──
    eb2: "WHO WE CONNECT",
    st2: "6가지 파트너 유형, 목적에 맞게 조합합니다",
    partners: [
      { t: "커머스 왕홍", en: "Commerce KOL", d: "더우인·타오바오 라이브 판매 전문. GMV와 전환율이 검증된 파트너.", scope: "판매 확산 · ROI 극대화", platform: "抖音 · 淘宝直播 · 快手" },
      { t: "콘텐츠 왕홍", en: "Content KOL", d: "샤오홍슈·웨이보·비리비리 콘텐츠 전문. 노출·검색·저장에 강한 파트너.", scope: "브랜드 인지 · 검색 최적화", platform: "小红书 · 微博 · B站" },
      { t: "한국 인플루언서", en: "Korean Influencer", d: "Instagram·YouTube·틱톡 기반 한국 KOL. MCN 연동, 메가~마이크로 전 등급.", scope: "한국 시장 노출 · 콜라보 콘텐츠", platform: "Instagram · YouTube · TikTok" },
      { t: "한국 연예인", en: "Korean Celebrity", d: "배우·K-POP·가수·방송인 100+. 협찬부터 드라마 PPL까지 5단계 옵션.", scope: "프리미엄 브랜딩 · PPL", platform: "TV · SNS · Live" },
      { t: "라이브 셀러", en: "Live Seller", d: "한·중 라이브커머스 전문 셀러 500+. 카테고리별 누적 판매 실적 보유.", scope: "라이브 판매 · 재구매 유도", platform: "抖音 · Grip · Naver" },
      { t: "브랜드 · 공급처", en: "Brand / Supplier", d: "K-Beauty·K-Fashion·잡화·헬스 등 검증 협력 브랜드 150+. 직공급 구조.", scope: "상품 소싱 · 직공급", platform: "Direct Supply" },
    ],

    // ── SECTION 3: 숫자 — 맥락 포함 ──
    eb3: "VERIFIED SCALE",
    st3: "규모보다 검증을 우선합니다",
    nums: [
      { n: "150+", l: "검증 협력 브랜드", d: "K-Beauty · K-Fashion · 잡화 · 헬스 등 직접 계약 브랜드" },
      { n: "500+", l: "한·중 라이브 셀러", d: "카테고리별 누적 판매 실적 보유, 직접 미팅 완료" },
      { n: "200+", l: "한국 인플루언서", d: "메가 KOL~마이크로, MCN 연동, 카테고리별 매칭" },
      { n: "100+", l: "한국 정상급 연예인", d: "배우 · K-POP · 가수 · 방송인, 5단계 협업 옵션" },
    ],
    numsNote: "모든 파트너는 직접 미팅을 거친 후에만 매칭됩니다. 숫자만 크고 검증되지 않은 풀은 운영하지 않습니다.",

    // ── SECTION 4: 연결 방식 ──
    eb4: "HOW MATCHING WORKS",
    st4: "당신의 목적에 맞는 파트너를 찾아드립니다",
    matching: [
      { from: "한국 브랜드", arrow: "→", to: "커머스 왕홍 + 콘텐츠 왕홍", goal: "중국 라이브커머스 판매 + 브랜드 인지" },
      { from: "해외 브랜드", arrow: "→", to: "한국 연예인 + 인플루언서", goal: "한국 시장 진출 + 프리미엄 브랜딩" },
      { from: "한국 셀러", arrow: "→", to: "해외 브랜드 + 왕홍 콜라보", goal: "상품 소싱 + 콜라보 라이브 판매" },
      { from: "해외 왕홍", arrow: "→", to: "K-브랜드 직공급 + 한국 촬영", goal: "K-뷰티/패션 직소싱 + 현지 콘텐츠" },
    ],

    // ── CTA ──
    ctaH: "내 브랜드에 맞는 파트너,\n어떤 조합이 가능한지 궁금하다면",
    ctaP: "카테고리와 목표를 알려주세요. 검증된 후보 리스트를 48시간 이내에 제안드립니다.",
    ctaB1: "맞춤 파트너 후보 요청 →",
    ctaB2: "네트워크 구조 미팅 예약 →",
  },
  en: {
    crumb: "NETWORK",
    h1: "Not just numbers.\nVerified connections.",
    lead: "N-LIVE doesn't list resources. We verify partners against your brand's category, goals, and budget — then connect you with purpose.",

    eb1: "HOW WE VERIFY",
    st1: "Every partner goes through 4-step verification",
    sl1: "This isn't a directory. We only match partners proven to execute.",
    verify: [
      { n: "01", t: "Direct Meeting", d: "Every KOL, seller, and celebrity is met face-to-face or via video by the N-LIVE team. No portfolio-only matching.", zh: "所有达人均经恩联团队亲自面谈验证" },
      { n: "02", t: "Category Fit", d: "Beauty, fashion, F&B, wellness — we confirm the partner's specialty matches your brand category.", zh: "确认品类匹配度" },
      { n: "03", t: "Performance Data", d: "Past GMV, conversion rates, follower quality, content engagement — verified by data. High follower count alone doesn't qualify.", zh: "基于数据审核历史业绩" },
      { n: "04", t: "Execution Readiness", d: "Schedule, communication capability, customs and settlement structure — all confirmed before matching.", zh: "评估执行可行性" },
    ],

    eb2: "WHO WE CONNECT",
    st2: "6 partner types, combined to fit your purpose",
    partners: [
      { t: "Commerce KOL", en: "Commerce KOL", d: "Douyin/Taobao Live sales specialists. GMV and conversion verified.", scope: "Sales expansion · ROI", platform: "抖音 · 淘宝直播 · 快手" },
      { t: "Content KOL", en: "Content KOL", d: "Xiaohongshu/Weibo/Bilibili content specialists. Strong on exposure and search.", scope: "Brand awareness · SEO", platform: "小红书 · 微博 · B站" },
      { t: "Korean Influencer", en: "Korean Influencer", d: "Instagram/YouTube/TikTok based Korean KOLs. MCN-linked, mega to micro.", scope: "Korean market · Collab content", platform: "Instagram · YouTube · TikTok" },
      { t: "Korean Celebrity", en: "Korean Celebrity", d: "Actors, K-POP, singers, broadcasters 100+. 5-tier options from sponsorship to drama PPL.", scope: "Premium branding · PPL", platform: "TV · SNS · Live" },
      { t: "Live Seller", en: "Live Seller", d: "500+ Korea-China live commerce sellers with proven category sales records.", scope: "Live sales · Repeat purchase", platform: "抖音 · Grip · Naver" },
      { t: "Brand / Supplier", en: "Brand / Supplier", d: "150+ verified K-Beauty/Fashion/accessory/wellness brands. Direct supply.", scope: "Product sourcing · Direct supply", platform: "Direct Supply" },
    ],

    eb3: "VERIFIED SCALE",
    st3: "Verification before scale",
    nums: [
      { n: "150+", l: "Verified Partner Brands", d: "K-Beauty · K-Fashion · accessories · wellness — directly contracted" },
      { n: "500+", l: "K-CN Live Sellers", d: "Category-proven sales records, directly met" },
      { n: "200+", l: "Korean Influencers", d: "Mega to micro KOLs, MCN-integrated, category-matched" },
      { n: "100+", l: "Top Korean Celebrities", d: "Actors · K-POP · singers · broadcasters, 5-tier collab options" },
    ],
    numsNote: "Every partner is matched only after a direct meeting. We don't operate unverified pools no matter how large.",

    eb4: "HOW MATCHING WORKS",
    st4: "We find the right partner for your purpose",
    matching: [
      { from: "Korean Brand", arrow: "→", to: "Commerce KOL + Content KOL", goal: "China live commerce sales + brand awareness" },
      { from: "Global Brand", arrow: "→", to: "Korean Celebrity + Influencer", goal: "Korean market entry + premium branding" },
      { from: "Korean Seller", arrow: "→", to: "Global Brand + KOL Collab", goal: "Product sourcing + collab live sales" },
      { from: "Global KOL", arrow: "→", to: "K-Brand Direct + Korea Filming", goal: "K-Beauty/Fashion sourcing + local content" },
    ],

    ctaH: "Curious which partner combination\nworks for your brand?",
    ctaP: "Share your category and goals. We'll propose a verified candidate list within 48 hours.",
    ctaB1: "Request tailored candidates →",
    ctaB2: "Book a network briefing →",
  },
  zh: {
    crumb: "网络",
    h1: "不是数字,\n而是经验证的连接。",
    lead: "恩联不做资源罗列。我们根据品牌的品类、目标和预算,亲自验证合作伙伴,按目的精准连接。",

    eb1: "验证标准",
    st1: "每位合作伙伴均经过四步验证",
    sl1: "这不是名录。我们只匹配经过验证、能够执行的合作方。",
    verify: [
      { n: "01", t: "亲自面谈", d: "所有达人、卖家、艺人均由恩联团队亲自线下或视频面谈验证。绝不仅凭资料匹配。", zh: "所有达人均经恩联团队亲自面谈验证" },
      { n: "02", t: "品类匹配", d: "美妆、时尚、食品、健康 — 确认合作方专业品类与品牌品类一致。", zh: "确认品类匹配度" },
      { n: "03", t: "业绩数据审核", d: "审核历史 GMV、转化率、粉丝质量、内容互动率。仅粉丝数量多不合格。", zh: "基于数据审核历史业绩" },
      { n: "04", t: "执行可行性", d: "档期、沟通能力、通关与结算结构 — 匹配前逐项确认。", zh: "评估执行可行性" },
    ],

    eb2: "连接对象",
    st2: "六类合作伙伴,按目的灵活组合",
    partners: [
      { t: "商业达人", en: "Commerce KOL", d: "抖音/淘宝直播销售专家。GMV 与转化率经验证。", scope: "销售扩散 · ROI", platform: "抖音 · 淘宝直播 · 快手" },
      { t: "内容达人", en: "Content KOL", d: "小红书/微博/B站内容专家。擅长曝光与搜索。", scope: "品牌认知 · 搜索优化", platform: "小红书 · 微博 · B站" },
      { t: "韩国达人", en: "Korean Influencer", d: "基于 Instagram/YouTube/TikTok 的韩国 KOL。MCN 联动,从头部到中腰部。", scope: "韩国市场 · 联名内容", platform: "Instagram · YouTube · TikTok" },
      { t: "韩国艺人", en: "Korean Celebrity", d: "演员·K-POP·歌手·主持人 100+。从基础置换到电视剧 PPL 五档选项。", scope: "高端品牌塑造 · PPL", platform: "TV · SNS · Live" },
      { t: "直播卖家", en: "Live Seller", d: "500+ 中韩直播电商卖家,按品类有累积销售实绩。", scope: "直播销售 · 复购", platform: "抖音 · Grip · Naver" },
      { t: "品牌·供应方", en: "Brand / Supplier", d: "150+ 经验证的 K-Beauty/Fashion/配饰/健康品牌。直供结构。", scope: "商品采购 · 直供", platform: "Direct Supply" },
    ],

    eb3: "验证规模",
    st3: "验证优先于规模",
    nums: [
      { n: "150+", l: "经验证合作品牌", d: "美妆·服装·配饰·健康等直签品牌" },
      { n: "500+", l: "中韩直播卖家", d: "按品类有累积销售实绩,已亲自对接" },
      { n: "200+", l: "韩国达人", d: "从头部到中腰部,MCN联动,按品类匹配" },
      { n: "100+", l: "韩国顶级艺人", d: "演员·K-POP·歌手·主持人,五档合作选项" },
    ],
    numsNote: "每位合作方均在亲自面谈后才进行匹配。我们不运营未经验证的资源池,无论规模多大。",

    eb4: "匹配方式",
    st4: "为您的目的找到合适的合作方",
    matching: [
      { from: "韩国品牌", arrow: "→", to: "商业达人 + 内容达人", goal: "中国直播销售 + 品牌认知" },
      { from: "海外品牌", arrow: "→", to: "韩国艺人 + 达人", goal: "韩国市场进入 + 高端品牌塑造" },
      { from: "韩国卖家", arrow: "→", to: "海外品牌 + 达人联名", goal: "商品采购 + 联名直播销售" },
      { from: "海外达人", arrow: "→", to: "K-品牌直供 + 韩国拍摄", goal: "K-Beauty/Fashion 直采 + 本地内容" },
    ],

    ctaH: "想知道哪种合作伙伴组合\n适合您的品牌？",
    ctaP: "告诉我们您的品类和目标。我们将在 48 小时内提供经验证的候选清单。",
    ctaB1: "请求定制候选 →",
    ctaB2: "预约网络说明会 →",
  },
  ja: {
    crumb: "NETWORK",
    h1: "数字ではなく、\n検証された接続です。",
    lead: "N-LIVEはリソースを並べません。ブランドのカテゴリ、目標、予算に合ったパートナーを直接検証し、目的に合わせて接続します。",

    eb1: "検証基準",
    st1: "すべてのパートナーは4段階の検証を経ます",
    sl1: "単なるディレクトリではありません。実行可能な検証済みパートナーのみをマッチングします。",
    verify: [
      { n: "01", t: "直接ミーティング", d: "すべてのKOL・セラー・芸能人はN-LIVEチームが対面またはビデオで直接検証。ポートフォリオだけでのマッチングはしません。", zh: "所有达人均经恩联团队亲自面谈验证" },
      { n: "02", t: "カテゴリ適合性", d: "ビューティ・ファッション・食品・ヘルス — パートナーの専門カテゴリとブランドカテゴリの一致を確認。", zh: "确认品类匹配度" },
      { n: "03", t: "実績データ検証", d: "過去のGMV、転換率、フォロワー品質、コンテンツ反応率をデータで検証。フォロワー数だけ多いパートナーは除外。", zh: "基于数据审核历史业绩" },
      { n: "04", t: "実行可能性判断", d: "スケジュール、コミュニケーション能力、通関・精算構造まで事前に確認。", zh: "评估执行可行性" },
    ],

    eb2: "接続対象",
    st2: "6種類のパートナー、目的に合わせて組み合わせます",
    partners: [
      { t: "コマースKOL", en: "Commerce KOL", d: "抖音/淘宝ライブ販売専門。GMVと転換率が検証済み。", scope: "販売拡散 · ROI", platform: "抖音 · 淘宝直播 · 快手" },
      { t: "コンテンツKOL", en: "Content KOL", d: "小紅書/微博/Bilibiliコンテンツ専門。露出と検索に強い。", scope: "ブランド認知 · 検索最適化", platform: "小红书 · 微博 · B站" },
      { t: "韓国インフルエンサー", en: "Korean Influencer", d: "Instagram/YouTube/TikTokベースの韓国KOL。MCN連動、メガ～マイクロ。", scope: "韓国市場 · コラボコンテンツ", platform: "Instagram · YouTube · TikTok" },
      { t: "韓国芸能人", en: "Korean Celebrity", d: "俳優・K-POP・歌手・放送人100+。協賛からドラマPPLまで5段階。", scope: "プレミアムブランディング · PPL", platform: "TV · SNS · Live" },
      { t: "ライブセラー", en: "Live Seller", d: "韓中ライブコマース専門セラー500+。カテゴリ別累積販売実績保有。", scope: "ライブ販売 · リピート誘導", platform: "抖音 · Grip · Naver" },
      { t: "ブランド・供給元", en: "Brand / Supplier", d: "K-Beauty/Fashion/アクセサリー/ヘルス等検証済みブランド150+。直供給構造。", scope: "商品ソーシング · 直供給", platform: "Direct Supply" },
    ],

    eb3: "検証された規模",
    st3: "規模より検証を優先します",
    nums: [
      { n: "150+", l: "検証済みパートナーブランド", d: "K-Beauty · K-Fashion · アクセサリー · ヘルス等直接契約" },
      { n: "500+", l: "韓中ライブセラー", d: "カテゴリ別累積販売実績、直接ミーティング完了" },
      { n: "200+", l: "韓国インフルエンサー", d: "メガ～マイクロKOL、MCN連動、カテゴリ別マッチング" },
      { n: "100+", l: "韓国トップクラス芸能人", d: "俳優 · K-POP · 歌手 · 放送人、5段階コラボ" },
    ],
    numsNote: "すべてのパートナーは直接ミーティングを経た後にのみマッチングされます。検証されていないプールは規模に関わらず運営しません。",

    eb4: "マッチング方法",
    st4: "あなたの目的に合ったパートナーを見つけます",
    matching: [
      { from: "韓国ブランド", arrow: "→", to: "コマースKOL + コンテンツKOL", goal: "中国ライブコマース販売 + ブランド認知" },
      { from: "海外ブランド", arrow: "→", to: "韓国芸能人 + インフルエンサー", goal: "韓国市場参入 + プレミアムブランディング" },
      { from: "韓国セラー", arrow: "→", to: "海外ブランド + KOLコラボ", goal: "商品ソーシング + コラボライブ販売" },
      { from: "海外KOL", arrow: "→", to: "K-ブランド直供給 + 韓国撮影", goal: "K-Beauty/Fashionソーシング + 現地コンテンツ" },
    ],

    ctaH: "あなたのブランドに合うパートナーの\n組み合わせを知りたいなら",
    ctaP: "カテゴリと目標をお知らせください。48時間以内に検証済み候補リストを提案します。",
    ctaB1: "カスタム候補をリクエスト →",
    ctaB2: "ネットワークブリーフィング予約 →",
  },
};

export default function NetworkPage() {
  const { lang } = useLang();
  const t = pickLang(C, lang);
  return (
    <PageEnter variant="blocks" className="pt-blocks-multi">
      {/* HERO */}
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">{t.crumb}</div>
          <h1 style={{ whiteSpace: "pre-line" }}>{t.h1}</h1>
          <p className="lead">{t.lead}</p>
        </div>
      </section>

      {/* SECTION 1 — 검증 기준 (4단계) */}
      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">{t.eb1}</div>
          <h2 className="detail-title">{t.st1}</h2>
          <p className="detail-lead">{t.sl1}</p>
          <div className="nw-verify-grid">
            {t.verify.map((v: any, i: number) => (
              <div className="nw-verify-card" key={i}>
                <div className="nw-verify-num">{v.n}</div>
                <h4>{v.t}</h4>
                <p>{v.d}</p>
                <span className="nw-verify-zh">{lang === "zh-Hant" ? s2t(v.zh) : v.zh}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — 파트너 유형 (6종) */}
      <section className="detail-section dark">
        <div className="container">
          <div className="detail-eyebrow">{t.eb2}</div>
          <h2 className="detail-title">{t.st2}</h2>
          <div className="nw-partner-grid">
            {t.partners.map((p: any, i: number) => (
              <div className="nw-partner-card" key={i}>
                <div className="nw-partner-head">
                  <h4>{p.t}</h4>
                  <span className="nw-partner-en">{p.en}</span>
                </div>
                <p className="nw-partner-desc">{p.d}</p>
                <div className="nw-partner-meta">
                  <div><span className="nw-meta-label">{lang === "ko" ? "활용" : lang === "zh" ? "用途" : lang === "ja" ? "活用" : "Scope"}</span> {p.scope}</div>
                  <div><span className="nw-meta-label">{lang === "ko" ? "플랫폼" : lang === "zh" ? "平台" : lang === "ja" ? "プラットフォーム" : "Platform"}</span> {p.platform}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — 숫자 (맥락 포함) */}
      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">{t.eb3}</div>
          <h2 className="detail-title">{t.st3}</h2>
          <div className="nw-nums-grid">
            {t.nums.map((n: any, i: number) => (
              <div className="nw-num-card" key={i}>
                <div className="nw-num-big">{n.n}</div>
                <div className="nw-num-label">{n.l}</div>
                <p className="nw-num-desc">{n.d}</p>
              </div>
            ))}
          </div>
          <p className="nw-nums-note">{t.numsNote}</p>
        </div>
      </section>

      {/* SECTION 4 — 매칭 방식 */}
      <section className="detail-section gray">
        <div className="container">
          <div className="detail-eyebrow">{t.eb4}</div>
          <h2 className="detail-title">{t.st4}</h2>
          <div className="nw-match-grid">
            {t.matching.map((m: any, i: number) => (
              <div className="nw-match-row" key={i}>
                <span className="nw-match-from">{m.from}</span>
                <span className="nw-match-arrow">{m.arrow}</span>
                <span className="nw-match-to">{m.to}</span>
                <span className="nw-match-goal">{m.goal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="detail-section" style={{ padding: 0 }}>
        <div className="container">
          <div className="detail-cta">
            <h3 style={{ whiteSpace: "pre-line" }}>{t.ctaH}</h3>
            <p>{t.ctaP}</p>
            <div className="nw-cta-buttons">
              <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--amber)', color: 'var(--black)' }}>{t.ctaB1}</Link>
              <Link href="/contact" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,.3)', color: 'var(--white)' }}>{t.ctaB2}</Link>
            </div>
          </div>
        </div>
      </section>
    </PageEnter>
  );
}
