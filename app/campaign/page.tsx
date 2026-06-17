"use client";
import { pickLang } from "@/lib/i18n";
import { useEffect } from "react";
import { useLang } from "@/components/LangContext";
import PageEnter from "@/components/PageEnter";
import CampaignForm from "@/components/CampaignForm";
import type { Lang } from "@/lib/i18n";

type Copy = {
  eyebrow: string;
  badge: string;
  title1: string;
  title2: string;
  lead: string;
  benefitsTitle: string;
  benefits: { t: string; d: string }[];
  audienceTitle: string;
  audience: string[];
  ctaTitle: string;
  ctaSub: string;
  applyBtn: string;
  heroCtaHint: string;
  note: string;
};

const COPY: Record<Lang, Copy> = {
  ko: {
    eyebrow: "XIAOHONGSHU CREATOR CAMPAIGN · 샤오홍슈 체험단",
    badge: "NOW RECRUITING · 상시 모집 중",
    title1: "샤오홍슈 체험단",
    title2: "크리에이터를 모집합니다",
    lead: "검증된 K-브랜드 무상 체험 · 콘텐츠 제작비 지급.\n엔라이브가 직접 운영하는 샤오홍슈 체험단 프로그램입니다.",
    benefitsTitle: "참여 크리에이터에게 제공되는 것",
    benefits: [
      { t: "제품 무상 제공", d: "K-뷰티 · K-패션 · K-푸드 · 라이프스타일 제품을 무상으로 체험하실 수 있습니다." },
      { t: "콘텐츠 제작비 지급", d: "업로드 기준 콘텐츠 제작비를 지급합니다. 팔로워·형식·규모에 따라 개별 책정됩니다." },
      { t: "지속 협업 기회", d: "성과가 좋은 크리에이터는 정식 계약 / 장기 협업 / 유료 캠페인으로 이어집니다." },
      { t: "직접 컨택 · 투명한 조건", d: "중간 에이전시 없이 엔라이브 담당자와 직접 소통. 조건 · 일정 · 가이드 모두 서면으로 공유합니다." },
    ],
    audienceTitle: "이런 분들을 찾고 있습니다",
    audience: [
      "샤오홍슈(小红书) 활동 중인 크리에이터",
      "뷰티 · 패션 · 푸드 · 라이프스타일 · 여행 · K-컬처 관심",
      "팔로워 규모 무관 — 진정성 있는 콘텐츠 우대",
      "한국 거주 · 국내 배송 수령 가능",
    ],
    ctaTitle: "신청하러 가기",
    ctaSub: "간단한 설문 3분 · 영업일 48시간 이내 개별 회신드립니다.",
    applyBtn: "체험단 신청하기",
    heroCtaHint: "3분 설문으로 바로 신청",
    note: "* 본 프로그램은 엔라이브(N-LIVE)가 직접 운영하며, 선정되신 크리에이터께만 개별 회신드립니다.",
  },
  en: {
    eyebrow: "XIAOHONGSHU CREATOR CAMPAIGN",
    badge: "NOW RECRUITING",
    title1: "Xiaohongshu Creator",
    title2: "Campaign is open",
    lead: "Free K-brand products · paid content fees.\nAn ongoing Xiaohongshu creator program run by N-LIVE.",
    benefitsTitle: "What creators receive",
    benefits: [
      { t: "Free product samples", d: "Experience K-beauty, K-fashion, K-food, and lifestyle products at no cost." },
      { t: "Paid content fees", d: "Fees paid upon upload. Set individually by followers, format, and scale." },
      { t: "Long-term partnership", d: "Strong-fit creators are promoted to formal contracts and paid campaigns." },
      { t: "Direct contact, transparent", d: "No middle agency. Speak directly with N-LIVE — all terms in writing." },
    ],
    audienceTitle: "We're looking for",
    audience: [
      "Creators active on Xiaohongshu (小红书)",
      "Beauty · fashion · food · lifestyle · travel · K-culture",
      "Follower count doesn't matter — authentic content preferred",
      "Residing in Korea · able to receive domestic shipments",
    ],
    ctaTitle: "Apply now",
    ctaSub: "Quick 3-minute form · reply within 48 business hours.",
    applyBtn: "Apply to campaign",
    heroCtaHint: "Apply in 3 minutes",
    note: "* Operated directly by N-LIVE. We reply individually only to selected creators.",
  },
  zh: {
    eyebrow: "小红书达人体验招募",
    badge: "正在招募中",
    title1: "小红书体验达人",
    title2: "招募正在进行中",
    lead: "免费体验韩国优质品牌 · 获得内容创作费。\n由恩联(N-LIVE)直接运营的小红书达人项目。",
    benefitsTitle: "参与达人可获得",
    benefits: [
      { t: "免费产品体验", d: "免费体验韩国美妆 · 服装 · 食品 · 生活方式品牌产品。" },
      { t: "内容创作费", d: "按上传标准支付创作费。根据粉丝量 · 内容形式 · 项目规模个别设定。" },
      { t: "长期合作机会", d: "契合度高的达人可进入正式合约 · 长期合作 · 有偿项目。" },
      { t: "直接沟通 · 条件透明", d: "无中间代理, 由恩联专员直接对接。所有条件 · 日程 · 指引均书面共享。" },
    ],
    audienceTitle: "我们在寻找",
    audience: [
      "在小红书活跃的达人",
      "美妆 · 时尚 · 美食 · 生活方式 · 旅行 · 韩流",
      "粉丝量不限 — 优先真实内容创作者",
      "居住于韩国 · 可接收韩国国内配送",
    ],
    ctaTitle: "立即申请",
    ctaSub: "简短3分钟问卷 · 工作日48小时内个别回复。",
    applyBtn: "申请达人体验",
    heroCtaHint: "3分钟快速申请",
    note: "* 本项目由恩联(N-LIVE)直接运营。仅对入选达人个别回复。",
  },
  ja: {
    eyebrow: "小紅書クリエイター募集",
    badge: "募集中",
    title1: "小紅書クリエイター",
    title2: "募集実施中",
    lead: "Kブランドの無償体験 · 制作費支給。\nN-LIVEが直接運営する小紅書クリエイタープログラム。",
    benefitsTitle: "参加者への提供",
    benefits: [
      { t: "製品の無償提供", d: "Kビューティ · Kファッション · Kフード · ライフスタイル製品を無償でご体験。" },
      { t: "コンテンツ制作費支給", d: "アップロード基準で制作費を支給。フォロワー · 形式 · 規模により個別設定。" },
      { t: "長期協業の機会", d: "相性の良いクリエイターは正式契約 · 長期コラボ · 有償キャンペーンへ。" },
      { t: "直接コンタクト · 透明", d: "中間エージェンシーなし。N-LIVEと直接やり取り、条件はすべて書面で共有。" },
    ],
    audienceTitle: "募集対象",
    audience: [
      "小紅書で活動中のクリエイター",
      "ビューティ · ファッション · フード · ライフ · 旅行 · Kカルチャー",
      "フォロワー数は不問 — 真摯な運営者を優遇",
      "韓国在住 · 国内配送の受け取り可能",
    ],
    ctaTitle: "今すぐ申請",
    ctaSub: "簡単3分アンケート · 営業日48時間以内に個別返信。",
    applyBtn: "クリエイター募集に応募",
    heroCtaHint: "3分で応募",
    note: "* N-LIVEが直接運営。選定された方のみ個別にご返信します。",
  },
};

export default function CampaignPage() {
  const { lang, setLang } = useLang();
  const c = pickLang(COPY, lang);

  // 이 페이지는 샤오홍슈 타겟 → 저장된 lang이 없으면 기본 중국어
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nlive_lang");
      if (!saved) setLang("zh");
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageEnter variant="fall" color="#FFB627">
      <section className="campaign-hero">
        <div className="container campaign-hero-inner">
          <div className="campaign-badge">
            <span className="cg-dot" />
            {c.badge}
          </div>
          <div className="campaign-eyebrow">{c.eyebrow}</div>
          <h1 className="campaign-title">
            <span className="line-mask"><span className="line-inner">{c.title1}</span></span>
            <span className="line-mask"><span className="line-inner"><em>{c.title2}</em></span></span>
          </h1>
          <p className="campaign-lead">{c.lead}</p>

          {/* Hero 즉시 신청 CTA */}
          <div className="campaign-hero-cta-wrap">
            <a href="#apply" className="campaign-hero-cta">
              <span className="chc-spark">✦</span>
              <span className="chc-label">{c.applyBtn}</span>
              <span className="chc-arrow">→</span>
            </a>
            <p className="campaign-hero-cta-hint">{c.heroCtaHint}</p>
          </div>
        </div>
      </section>

      <section className="campaign-benefits">
        <div className="container">
          <div className="section-eyebrow">— {c.benefitsTitle}</div>
          <div className="campaign-benefits-grid">
            {c.benefits.map((b, i) => (
              <div className="cg-benefit" key={i}>
                <div className="cg-benefit-num">0{i + 1}</div>
                <h4>{b.t}</h4>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="campaign-audience">
        <div className="container">
          <div className="section-eyebrow">— {c.audienceTitle}</div>
          <ul className="campaign-audience-list">
            {c.audience.map((a, i) => (
              <li key={i}>
                <span className="cg-check" aria-hidden>✓</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="apply" className="campaign-apply">
        <div className="container campaign-apply-inner">
          <div className="cg-apply-card">
            <div className="cg-apply-eyebrow">— APPLICATION</div>
            <h2>{c.ctaTitle}</h2>
            <p className="cg-apply-sub">{c.ctaSub}</p>

            <CampaignForm />

            <p className="cg-apply-note">{c.note}</p>
          </div>
        </div>
      </section>
    </PageEnter>
  );
}
