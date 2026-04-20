"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import PageEnter from "@/components/PageEnter";
import type { Lang } from "@/lib/i18n";

type Copy = {
  eyebrow: string;
  badge: string;
  title1: string;
  title2: string;
  lead: string;
  // What creators get
  benefitsTitle: string;
  benefits: { t: string; d: string }[];
  // Who we look for
  audienceTitle: string;
  audience: string[];
  // Campaign CTA
  ctaTitle: string;
  ctaSub: string;
  applyBtn: string;
  backBtn: string;
  // Placeholder for survey
  formComingTitle: string;
  formComingDesc: string;
  formComingBtn: string;
  note: string;
};

const COPY: Record<Lang, Copy> = {
  ko: {
    eyebrow: "XIAOHONGSHU CREATOR CAMPAIGN · 샤오홍슈 체험단",
    badge: "NOW RECRUITING · 상시 모집 중",
    title1: "샤오홍슈 체험단",
    title2: "크리에이터를 모집합니다",
    lead: "검증된 K-브랜드 체험 · 양질의 제품 무상 제공 · 콘텐츠 제작비 지급. 엔라이브가 직접 운영하는 샤오홍슈 체험단 프로그램입니다.",
    benefitsTitle: "참여 크리에이터에게 제공되는 것",
    benefits: [
      { t: "제품 무상 제공", d: "캠페인 카테고리의 K-뷰티 · K-패션 · K-푸드 · 라이프스타일 제품을 무상으로 체험하실 수 있습니다." },
      { t: "콘텐츠 제작비 지급", d: "업로드 기준 콘텐츠 제작비를 지급합니다. 팔로워·포스팅 형식·캠페인 규모에 따라 개별 책정됩니다." },
      { t: "지속 협업 기회", d: "성과와 핏이 맞는 크리에이터는 정식 계약 / 장기 협업 / 유료 캠페인으로 이어집니다." },
      { t: "직접 컨택 · 투명한 조건", d: "중간 에이전시 없이 엔라이브 담당자와 직접 소통. 조건 · 일정 · 가이드 모두 서면으로 공유합니다." },
    ],
    audienceTitle: "이런 분들을 찾고 있습니다",
    audience: [
      "샤오홍슈(小红书) 활동 중인 국내 크리에이터",
      "뷰티 · 패션 · 푸드 · 라이프스타일 · 여행 · K-컬처 관심 분야",
      "팔로워 규모와 무관 — 진정성 있는 콘텐츠 운영자 우대",
      "한국 거주 · 국내 배송 수령 가능하신 분",
    ],
    ctaTitle: "신청하러 가기",
    ctaSub: "간단한 설문 3분 · 결과는 영업일 48시간 이내 개별 회신드립니다.",
    applyBtn: "체험단 신청하기 →",
    backBtn: "← 메인으로 돌아가기",
    formComingTitle: "신청 설문 준비 중",
    formComingDesc: "신청 설문양식을 현재 세팅 중입니다. 준비가 완료되는 대로 이 페이지에서 바로 신청하실 수 있습니다. 지금 먼저 연락을 남기고 싶으시다면 아래 버튼으로 문의해주세요.",
    formComingBtn: "먼저 문의 남기기 →",
    note: "* 본 프로그램은 엔라이브(N-LIVE)가 직접 운영하며, 선정되신 크리에이터께만 개별 회신드립니다.",
  },
  en: {
    eyebrow: "XIAOHONGSHU CREATOR CAMPAIGN",
    badge: "NOW RECRUITING",
    title1: "Xiaohongshu Creator Campaign",
    title2: "We're recruiting creators",
    lead: "Experience verified K-brands · free premium products · paid content fees. An ongoing Xiaohongshu creator program run directly by N-LIVE.",
    benefitsTitle: "What participating creators receive",
    benefits: [
      { t: "Free product samples", d: "Experience K-beauty, K-fashion, K-food, and lifestyle products in the campaign category — at no cost." },
      { t: "Paid content fees", d: "Content fees paid upon upload. Set individually based on followers, format, and campaign scale." },
      { t: "Long-term partnership", d: "Creators with strong fit are promoted to formal contracts, long-term collaboration, and paid campaigns." },
      { t: "Direct contact, transparent terms", d: "No middle-agency. Speak directly with N-LIVE staff — all terms, schedule, and guidelines shared in writing." },
    ],
    audienceTitle: "We're looking for",
    audience: [
      "Korea-based creators active on Xiaohongshu (小红书)",
      "Beauty · fashion · food · lifestyle · travel · K-culture interests",
      "Follower count doesn't matter — authentic content creators preferred",
      "Residing in Korea · able to receive domestic shipments",
    ],
    ctaTitle: "Apply now",
    ctaSub: "Quick 3-minute form · We'll respond individually within 48 business hours.",
    applyBtn: "Apply to the campaign →",
    backBtn: "← Back to home",
    formComingTitle: "Application form coming soon",
    formComingDesc: "We're currently setting up the application form. Once ready, you'll be able to apply directly on this page. To reach out now, use the button below.",
    formComingBtn: "Contact us instead →",
    note: "* This program is operated directly by N-LIVE. We reply individually only to selected creators.",
  },
  zh: {
    eyebrow: "小红书达人体验招募",
    badge: "正在招募",
    title1: "小红书体验达人",
    title2: "正在招募中",
    lead: "免费体验韩国优质品牌 · 获得精选产品 · 获得内容创作费。由恩联(N-LIVE)直接运营的小红书达人项目。",
    benefitsTitle: "参与达人可获得",
    benefits: [
      { t: "免费产品体验", d: "免费体验美妆·服装·食品·生活方式等品类的韩国品牌产品。" },
      { t: "内容创作费", d: "按上传标准支付内容费用。根据粉丝量·内容形式·项目规模个别设定。" },
      { t: "长期合作机会", d: "契合度高的达人可进入正式合约、长期合作与有偿项目。" },
      { t: "直接沟通·条件透明", d: "无中间代理,由恩联专员直接对接。所有条件·日程·指引均书面共享。" },
    ],
    audienceTitle: "我们在寻找",
    audience: [
      "在小红书活跃的韩国本地达人",
      "美妆 · 时尚 · 美食 · 生活方式 · 旅行 · 韩流兴趣领域",
      "粉丝量不限 — 优先真实内容创作者",
      "居住于韩国 · 可接收韩国国内配送",
    ],
    ctaTitle: "立即申请",
    ctaSub: "简短3分钟问卷 · 工作日48小时内个别回复。",
    applyBtn: "申请达人体验 →",
    backBtn: "← 返回首页",
    formComingTitle: "申请问卷准备中",
    formComingDesc: "申请问卷正在设置中,完成后可直接在本页面申请。如需立即联系,请点击下方按钮。",
    formComingBtn: "先提交咨询 →",
    note: "* 本项目由恩联(N-LIVE)直接运营。仅对入选达人个别回复。",
  },
  ja: {
    eyebrow: "小紅書クリエイター募集",
    badge: "募集中",
    title1: "小紅書クリエイター",
    title2: "募集中",
    lead: "厳選されたKブランドの体験・厳選製品の無償提供・コンテンツ制作費の支給。N-LIVEが直接運営する小紅書クリエイタープログラムです。",
    benefitsTitle: "参加クリエイターへの提供内容",
    benefits: [
      { t: "製品の無償提供", d: "キャンペーン対象のKビューティ・Kファッション・Kフード・ライフスタイル製品を無償でご体験いただけます。" },
      { t: "コンテンツ制作費の支給", d: "アップロード基準で制作費を支給。フォロワー・形式・規模に応じて個別に設定。" },
      { t: "長期協業の機会", d: "相性の良いクリエイターは正式契約・長期コラボ・有償キャンペーンへと発展します。" },
      { t: "直接コンタクト・透明な条件", d: "中間エージェンシーなし。N-LIVE担当者と直接やり取り、条件・日程・ガイドはすべて書面で共有します。" },
    ],
    audienceTitle: "こんな方を探しています",
    audience: [
      "小紅書(Xiaohongshu)で活動中の韓国在住クリエイター",
      "ビューティ・ファッション・フード・ライフスタイル・旅行・Kカルチャー",
      "フォロワー数は不問 — 真摯なコンテンツ運営者を優遇",
      "韓国在住・国内配送の受け取りが可能な方",
    ],
    ctaTitle: "今すぐ申請",
    ctaSub: "簡単3分アンケート · 営業日48時間以内に個別返信します。",
    applyBtn: "クリエイター募集に応募する →",
    backBtn: "← ホームに戻る",
    formComingTitle: "応募フォーム準備中",
    formComingDesc: "応募フォームを現在準備中です。完成次第、このページから直接ご応募いただけます。今すぐご連絡をご希望の方は、下のボタンからお問い合わせください。",
    formComingBtn: "先にお問い合わせする →",
    note: "* 本プログラムはN-LIVEが直接運営しています。選定されたクリエイターのみ個別にご返信します。",
  },
};

export default function CampaignPage() {
  const { lang } = useLang();
  const c = COPY[lang];

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

      {/* Survey placeholder — step 5 will drop the form here */}
      <section className="campaign-apply">
        <div className="container campaign-apply-inner">
          <div className="cg-apply-card">
            <div className="cg-apply-eyebrow">— APPLICATION</div>
            <h2>{c.ctaTitle}</h2>
            <p className="cg-apply-sub">{c.ctaSub}</p>

            <div className="cg-form-placeholder">
              <div className="cg-fp-icon">⌛</div>
              <h3>{c.formComingTitle}</h3>
              <p>{c.formComingDesc}</p>
              <div className="cg-fp-actions">
                <Link href="/contact?interest=general" className="cg-fp-btn-primary">
                  {c.formComingBtn}
                </Link>
                <Link href="/" className="cg-fp-btn-ghost">
                  {c.backBtn}
                </Link>
              </div>
            </div>

            <p className="cg-apply-note">{c.note}</p>
          </div>
        </div>
      </section>
    </PageEnter>
  );
}
