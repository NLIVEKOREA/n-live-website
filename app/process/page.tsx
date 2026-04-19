"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import PageEnter from "@/components/PageEnter";
import type { Lang } from "@/lib/i18n";

/* ────────────────────────────────────────────────────────────
   PROCESS PAGE — "문의 전 불안을 없애는 메뉴"
   목적: 절차 설명이 아니라, "문의해도 되겠다"는 안심을 주는 구조
   ──────────────────────────────────────────────────────────── */

const C: Record<Lang, any> = {
  ko: {
    crumb: "PROCESS",
    h1: "복잡하지 않습니다.\n30분이면 시작됩니다.",
    lead: "라이브커머스, 왕홍 매칭, 중국 진출 — 어디서부터 시작할지 모를 때가 가장 불안합니다. 엔라이브는 첫 미팅 30분 안에 가능성을 보여드립니다.",

    // ── SECTION 1: 문의 전 안내 ──
    eb1: "BEFORE YOU INQUIRE",
    st1: "문의하기 전에 이것만 알면 됩니다",
    beforeFaq: [
      { q: "누구에게 문의하는 건가요?", a: "엔라이브 파트너십 전문 매니저가 직접 대응합니다. 영업 콜센터가 아니라, 실제 프로젝트를 설계하는 실무 담당자입니다." },
      { q: "어떤 내용을 보내면 되나요?", a: "브랜드명, 카테고리, 예산 범위, 목표(판매/인지/테스트) 정도면 충분합니다. 아직 확정되지 않아도 괜찮습니다." },
      { q: "얼마나 빨리 답이 오나요?", a: "영업일 기준 48시간 이내에 회신드립니다. 급한 경우 24시간 내 우선 대응도 가능합니다." },
      { q: "소규모 테스트도 가능한가요?", a: "가능합니다. 최소 물량 제한이 없고, 트라이얼 1회부터 시작할 수 있습니다." },
      { q: "어떤 언어로 소통되나요?", a: "한국어, 중국어, 영어 3개 국어로 소통됩니다. 중국 파트너와의 커뮤니케이션도 직접 통역·진행합니다." },
      { q: "NDA가 가능한가요?", a: "가능합니다. 첫 미팅 전 사전 NDA 체결이 가능하며, 민감한 브랜드 정보도 안전하게 취급합니다." },
    ],

    // ── SECTION 2: 5단계 프로세스 ──
    eb2: "5-STEP PROCESS",
    st2: "문의부터 성과까지, 5단계",
    steps: [
      {
        n: "01", t: "문의 접수",
        d: "문의 폼 작성 또는 이메일 발송. 브랜드 정보와 목표를 간단히 적어주세요.",
        value: "48시간 이내에 전담 매니저가 직접 회신드립니다.",
        trust: "한 · 중 · 영 3개 국어 대응",
        zh: "48小时内专属经理直接回复",
      },
      {
        n: "02", t: "무료 컨셉 미팅",
        d: "비대면 30분. 시장 · 상품 · 경쟁을 함께 정리하고, 가능한 방향을 제안합니다.",
        value: "첫 미팅은 무료입니다. 미팅 후 진행 여부를 결정하시면 됩니다.",
        trust: "부담 없이 가능성만 확인하는 자리",
        zh: "首次会议免费，30分钟线上",
      },
      {
        n: "03", t: "맞춤 제안서",
        d: "파트너 후보 리스트, 플랫폼 전략, 예상 성과, 견적을 담은 제안서를 발송합니다.",
        value: "검증된 후보만 포함됩니다. 숫자만 많은 후보는 보내지 않습니다.",
        trust: "목적 기반 매칭 + 실적 데이터 포함",
        zh: "仅包含经验证的候选资源",
      },
      {
        n: "04", t: "계약 · 실행",
        d: "왕홍 매칭 → 콘텐츠 기획 → 라이브 운영 → 통관 · 정산까지 한 팀이 실행합니다.",
        value: "매칭 이후에도 끝까지 함께합니다. 소개만 하고 빠지지 않습니다.",
        trust: "라이브 운영 · 물류 · CS까지 원스톱",
        zh: "从匹配到结算，一个团队全程执行",
      },
      {
        n: "05", t: "성과 리포트 · 확장",
        d: "실시간 데이터 공유 + 주간/월간 성과 리포트. 데이터 기반으로 다음 단계를 함께 설계합니다.",
        value: "숫자로 결과를 보여드리고, 다음 기회를 함께 찾습니다.",
        trust: "주간 리포트 + 분기 리뷰 + 로드맵",
        zh: "数据驱动的周报与季度复盘",
      },
    ],

    // ── SECTION 3: 안심 장치 ──
    eb3: "ZERO-RISK GUARANTEES",
    st3: "문의 전 알아두면 안심되는 것들",
    guarantees: [
      { t: "48시간 이내 회신", d: "문의 후 영업일 48시간 이내에 전담 매니저가 직접 회신합니다.", zh: "48小时内回复" },
      { t: "첫 미팅 무료", d: "비대면 30분 컨셉 미팅은 비용이 발생하지 않습니다.", zh: "首次会议免费" },
      { t: "3개 국어 소통", d: "한국어 · 중국어 · 영어로 소통됩니다. 중국 파트너와도 직접 통역.", zh: "中韩英三语沟通" },
      { t: "트라이얼 1회 가능", d: "대규모 계약 전에 1회 트라이얼로 실행력을 확인할 수 있습니다.", zh: "可先做一次试播" },
      { t: "사전 NDA 가능", d: "첫 미팅 전 NDA 체결이 가능합니다. 브랜드 정보를 안전하게 취급합니다.", zh: "可事前签署NDA" },
      { t: "최소 물량 없음", d: "최소 주문량이나 최소 집행 금액 제한이 없습니다.", zh: "无最低量限制" },
      { t: "위약금 없음", d: "단계별 진행이므로, 중간에 중단해도 위약금이 발생하지 않습니다.", zh: "无违约金" },
    ],

    // ── SECTION 4: 리포팅 ──
    eb4: "TRANSPARENT REPORTING",
    st4: "투명한 성과 리포팅",
    sl4: "모든 파트너에게 주간 · 월간 성과 리포트를 제공합니다.",
    reportItems: [
      "왕홍 · 셀러별 GMV · 전환율",
      "플랫폼별 CTR · CVR · CPC",
      "콘텐츠 반응률 · 저장 · 공유 데이터",
      "정산 내역 · 물류 현황",
    ],
    reportNote: "파트너십 시작 전 샘플 리포트를 요청하실 수 있습니다.",

    // ── CTA ──
    ctaH: "30분이면 가능성을 확인할 수 있습니다",
    ctaP: "첫 미팅은 무료입니다. 현재 상황과 목표를 알려주시면, 맞춤 진단부터 시작하겠습니다.",
    ctaB1: "무료 컨셉 미팅 예약 →",
    ctaB2: "맞춤 제안서 요청 →",
    ctaB3: "리포트 샘플 요청 →",
  },
  en: {
    crumb: "PROCESS",
    h1: "Not complicated.\n30 minutes to start.",
    lead: "Live commerce, KOL matching, China entry — the hardest part is not knowing where to begin. N-LIVE shows you what's possible in the first 30-minute meeting.",

    eb1: "BEFORE YOU INQUIRE",
    st1: "Everything you need to know before reaching out",
    beforeFaq: [
      { q: "Who will I be talking to?", a: "A dedicated N-LIVE partnership manager responds directly. Not a call center — the actual person who will design your project." },
      { q: "What information should I provide?", a: "Brand name, category, budget range, and goal (sales/awareness/test) is enough. Nothing needs to be finalized." },
      { q: "How quickly will I hear back?", a: "Within 48 business hours. For urgent cases, priority response within 24 hours is available." },
      { q: "Can I start with a small test?", a: "Yes. No minimum order requirements. You can start with a single trial run." },
      { q: "What languages are supported?", a: "Korean, Chinese, and English. We also handle direct interpretation with Chinese partners." },
      { q: "Is an NDA possible?", a: "Yes. Pre-meeting NDA signing is available. Sensitive brand information is handled securely." },
    ],

    eb2: "5-STEP PROCESS",
    st2: "From inquiry to results — 5 steps",
    steps: [
      {
        n: "01", t: "Inquiry",
        d: "Submit the inquiry form or send an email with your brand information and goals.",
        value: "A dedicated manager responds within 48 hours.",
        trust: "KO · ZH · EN trilingual support",
        zh: "48小时内专属经理直接回复",
      },
      {
        n: "02", t: "Free Concept Meeting",
        d: "30-minute remote session. We review your market, product, and competition, and propose possible directions.",
        value: "The first meeting is free. Decide whether to proceed afterward.",
        trust: "Zero-pressure opportunity assessment",
        zh: "首次会议免费，30分钟线上",
      },
      {
        n: "03", t: "Custom Proposal",
        d: "We send a proposal with partner candidates, platform strategy, projected results, and pricing.",
        value: "Only verified candidates are included. No padding with unqualified names.",
        trust: "Purpose-based matching + performance data included",
        zh: "仅包含经验证的候选资源",
      },
      {
        n: "04", t: "Contract & Execute",
        d: "KOL matching → content planning → live ops → customs & settlement — one team from start to finish.",
        value: "We don't disappear after matching. We execute through to the end.",
        trust: "Live ops · logistics · CS — all-in-one",
        zh: "从匹配到结算，一个团队全程执行",
      },
      {
        n: "05", t: "Performance Report & Scale",
        d: "Real-time data sharing + weekly/monthly performance reports. Data-driven next steps designed together.",
        value: "We show results in numbers and find the next opportunity together.",
        trust: "Weekly reports + quarterly review + roadmap",
        zh: "数据驱动的周报与季度复盘",
      },
    ],

    eb3: "ZERO-RISK GUARANTEES",
    st3: "Things that make it safe to reach out",
    guarantees: [
      { t: "Reply within 48hrs", d: "A dedicated manager responds within 48 business hours of your inquiry.", zh: "48小时内回复" },
      { t: "Free first meeting", d: "The 30-minute remote concept meeting is completely free.", zh: "首次会议免费" },
      { t: "Trilingual support", d: "Korean, Chinese, and English. Direct interpretation with Chinese partners.", zh: "中韩英三语沟通" },
      { t: "Trial run available", d: "Test with a single trial before committing to a larger engagement.", zh: "可先做一次试播" },
      { t: "Pre-NDA available", d: "NDA signing available before the first meeting. Brand info handled securely.", zh: "可事前签署NDA" },
      { t: "No minimums", d: "No minimum order quantity or minimum spend requirement.", zh: "无最低量限制" },
      { t: "No penalties", d: "Stage-by-stage progression. No penalty for pausing or stopping.", zh: "无违约金" },
    ],

    eb4: "TRANSPARENT REPORTING",
    st4: "Transparent performance reporting",
    sl4: "Weekly and monthly performance reports provided to all partners.",
    reportItems: [
      "Per-KOL/seller GMV · conversion rate",
      "Per-platform CTR · CVR · CPC",
      "Content engagement · saves · shares",
      "Settlement details · logistics status",
    ],
    reportNote: "You can request a sample report before starting a partnership.",

    ctaH: "30 minutes to discover what's possible",
    ctaP: "The first meeting is free. Share your situation and goals — we'll start with a tailored assessment.",
    ctaB1: "Book free concept meeting →",
    ctaB2: "Request custom proposal →",
    ctaB3: "Request report sample →",
  },
  zh: {
    crumb: "流程",
    h1: "并不复杂。\n30分钟即可开始。",
    lead: "直播电商、达人匹配、进入中国市场 — 不知从何开始的时候最让人焦虑。恩联在首次 30 分钟会议中就为您展示可能性。",

    eb1: "咨询前须知",
    st1: "咨询前只需了解这些",
    beforeFaq: [
      { q: "我会和谁沟通？", a: "恩联的合作专属经理直接对接。不是客服中心,而是实际为您设计项目的实务负责人。" },
      { q: "需要提供什么信息？", a: "品牌名、品类、预算范围、目标(销售/认知/测试)即可。尚未确定也没关系。" },
      { q: "多快能收到回复？", a: "工作日 48 小时内回复。紧急情况可 24 小时内优先响应。" },
      { q: "可以小规模测试吗？", a: "可以。无最低量限制,可从一次试播开始。" },
      { q: "支持什么语言？", a: "中文、韩文、英文三语沟通。与中国合作方的沟通也由我们直接翻译执行。" },
      { q: "可以签 NDA 吗？", a: "可以。首次会议前即可签署 NDA,品牌信息安全保密。" },
    ],

    eb2: "五步流程",
    st2: "从咨询到成果，5步搞定",
    steps: [
      {
        n: "01", t: "咨询受理",
        d: "提交咨询表或发送邮件,简要填写品牌信息和目标即可。",
        value: "48小时内专属经理直接回复。",
        trust: "中 · 韩 · 英三语对应",
        zh: "48小时内专属经理直接回复",
      },
      {
        n: "02", t: "免费概念会议",
        d: "线上 30 分钟。一起整理市场、产品、竞争情况,提出可行方向。",
        value: "首次会议完全免费。会后再决定是否推进。",
        trust: "零压力的可能性评估",
        zh: "首次会议免费，30分钟线上",
      },
      {
        n: "03", t: "定制方案",
        d: "发送包含合作候选、平台策略、预期成果和报价的方案书。",
        value: "仅包含经验证的候选资源。不会用未审核的名单充数。",
        trust: "基于目的的匹配 + 含业绩数据",
        zh: "仅包含经验证的候选资源",
      },
      {
        n: "04", t: "签约 · 执行",
        d: "达人匹配 → 内容企划 → 直播运营 → 通关结算,一个团队全程执行。",
        value: "匹配之后不会消失。从头到尾陪伴执行。",
        trust: "直播运营 · 物流 · 客服一站式",
        zh: "从匹配到结算，一个团队全程执行",
      },
      {
        n: "05", t: "成果报告 · 扩展",
        d: "实时数据共享 + 周报/月报。基于数据共同设计下一步。",
        value: "用数字展示结果,一起寻找下一个机会。",
        trust: "周报 + 季度复盘 + 路线图",
        zh: "数据驱动的周报与季度复盘",
      },
    ],

    eb3: "零风险保障",
    st3: "咨询前了解这些会更安心",
    guarantees: [
      { t: "48小时内回复", d: "咨询后工作日 48 小时内专属经理直接回复。", zh: "48小时内回复" },
      { t: "首次会议免费", d: "线上 30 分钟概念会议完全免费。", zh: "首次会议免费" },
      { t: "三语沟通", d: "中文·韩文·英文。与中国合作方也直接翻译对接。", zh: "中韩英三语沟通" },
      { t: "可试播一次", d: "大规模合作前可先做一次试播确认执行力。", zh: "可先做一次试播" },
      { t: "可签 NDA", d: "首次会议前即可签署 NDA,品牌信息安全保密。", zh: "可事前签署NDA" },
      { t: "无最低量限制", d: "无最低订购量或最低执行金额限制。", zh: "无最低量限制" },
      { t: "无违约金", d: "按阶段推进,中途暂停或终止不产生违约金。", zh: "无违约金" },
    ],

    eb4: "透明报告",
    st4: "透明的绩效报告",
    sl4: "为所有合作方提供周报和月报。",
    reportItems: [
      "每位达人/卖家的 GMV · 转化率",
      "每个平台的 CTR · CVR · CPC",
      "内容互动率 · 收藏 · 分享数据",
      "结算明细 · 物流状况",
    ],
    reportNote: "合作开始前可申请查看样本报告。",

    ctaH: "30分钟即可确认可能性",
    ctaP: "首次会议免费。告诉我们您的现状和目标,我们从定制诊断开始。",
    ctaB1: "预约免费概念会议 →",
    ctaB2: "请求定制方案 →",
    ctaB3: "请求报告样本 →",
  },
  ja: {
    crumb: "PROCESS",
    h1: "複雑ではありません。\n30分で始められます。",
    lead: "ライブコマース、KOLマッチング、中国進出 — どこから始めればいいかわからない時が一番不安です。N-LIVEは初回30分のミーティングで可能性をお見せします。",

    eb1: "お問い合わせ前に",
    st1: "お問い合わせ前にこれだけ知っていれば大丈夫です",
    beforeFaq: [
      { q: "誰に問い合わせるのですか？", a: "N-LIVEパートナーシップ専任マネージャーが直接対応します。コールセンターではなく、実際のプロジェクト担当者です。" },
      { q: "どんな情報を送ればいいですか？", a: "ブランド名、カテゴリ、予算範囲、目標（販売/認知/テスト）程度で十分です。確定していなくても大丈夫です。" },
      { q: "どのくらいで返事が来ますか？", a: "営業日48時間以内にご返信します。急ぎの場合は24時間以内の優先対応も可能です。" },
      { q: "小規模テストも可能ですか？", a: "可能です。最小注文量の制限なし。トライアル1回から始められます。" },
      { q: "どの言語で対応しますか？", a: "韓国語・中国語・英語の3言語対応。中国パートナーとのコミュニケーションも直接通訳・進行します。" },
      { q: "NDAは可能ですか？", a: "可能です。初回ミーティング前のNDA締結が可能で、ブランド情報を安全に取り扱います。" },
    ],

    eb2: "5ステッププロセス",
    st2: "お問い合わせから成果まで、5ステップ",
    steps: [
      {
        n: "01", t: "お問い合わせ受付",
        d: "お問い合わせフォームまたはメール送信。ブランド情報と目標を簡単にお書きください。",
        value: "48時間以内に専任マネージャーが直接ご返信します。",
        trust: "韓 · 中 · 英 3言語対応",
        zh: "48小时内专属经理直接回复",
      },
      {
        n: "02", t: "無料コンセプトMTG",
        d: "オンライン30分。市場・商品・競合を一緒に整理し、可能な方向を提案します。",
        value: "初回ミーティングは無料です。ミーティング後に進行するか決めてください。",
        trust: "ノープレッシャーの可能性確認",
        zh: "首次会议免费，30分钟线上",
      },
      {
        n: "03", t: "カスタム提案書",
        d: "パートナー候補リスト、プラットフォーム戦略、予想成果、見積もりを含む提案書を送付します。",
        value: "検証済み候補のみ含まれます。数だけ多い候補は送りません。",
        trust: "目的ベースマッチング + 実績データ含む",
        zh: "仅包含经验证的候选资源",
      },
      {
        n: "04", t: "契約・実行",
        d: "KOLマッチング → コンテンツ企画 → ライブ運営 → 通関・精算まで一つのチームが実行します。",
        value: "マッチング後も最後まで一緒です。紹介だけして離れることはしません。",
        trust: "ライブ運営 · 物流 · CSまでワンストップ",
        zh: "从匹配到结算，一个团队全程执行",
      },
      {
        n: "05", t: "成果レポート・拡張",
        d: "リアルタイムデータ共有 + 週次/月次成果レポート。データに基づき次のステップを共同設計。",
        value: "数字で結果をお見せし、次の機会を一緒に見つけます。",
        trust: "週次レポート + 四半期レビュー + ロードマップ",
        zh: "数据驱动的周报与季度复盘",
      },
    ],

    eb3: "ゼロリスク保証",
    st3: "お問い合わせ前に知っておくと安心なこと",
    guarantees: [
      { t: "48時間以内返信", d: "お問い合わせ後、営業日48時間以内に専任マネージャーが直接ご返信。", zh: "48小时内回复" },
      { t: "初回MTG無料", d: "オンライン30分のコンセプトミーティングは無料です。", zh: "首次会议免费" },
      { t: "3言語対応", d: "韓国語・中国語・英語。中国パートナーとも直接通訳対応。", zh: "中韩英三语沟通" },
      { t: "トライアル可能", d: "大規模契約前にトライアル1回で実行力を確認できます。", zh: "可先做一次试播" },
      { t: "事前NDA可能", d: "初回ミーティング前にNDA締結可能。ブランド情報を安全に取り扱います。", zh: "可事前签署NDA" },
      { t: "最小数量なし", d: "最小注文量や最小執行金額の制限なし。", zh: "无最低量限制" },
      { t: "違約金なし", d: "段階別進行のため、途中停止でも違約金は発生しません。", zh: "无违约金" },
    ],

    eb4: "透明レポーティング",
    st4: "透明な成果レポーティング",
    sl4: "すべてのパートナーに週次・月次の成果レポートを提供します。",
    reportItems: [
      "KOL・セラー別GMV・転換率",
      "プラットフォーム別CTR・CVR・CPC",
      "コンテンツ反応率・保存・共有データ",
      "精算明細・物流状況",
    ],
    reportNote: "パートナーシップ開始前にサンプルレポートをリクエストできます。",

    ctaH: "30分で可能性を確認できます",
    ctaP: "初回ミーティングは無料です。現状と目標をお知らせいただければ、カスタム診断から始めます。",
    ctaB1: "無料コンセプトMTG予約 →",
    ctaB2: "カスタム提案書リクエスト →",
    ctaB3: "レポートサンプルリクエスト →",
  },
};

export default function ProcessPage() {
  const { lang } = useLang();
  const t = C[lang];
  return (
    <PageEnter variant="wipe-l" color="#2D7BFF">
      {/* HERO */}
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">{t.crumb}</div>
          <h1 style={{ whiteSpace: "pre-line" }}>{t.h1}</h1>
          <p className="lead">{t.lead}</p>
        </div>
      </section>

      {/* SECTION 1 — 문의 전 FAQ */}
      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">{t.eb1}</div>
          <h2 className="detail-title">{t.st1}</h2>
          <div className="pr-faq-grid">
            {t.beforeFaq.map((f: any, i: number) => (
              <div className="pr-faq-item" key={i}>
                <h4 className="pr-faq-q">{f.q}</h4>
                <p className="pr-faq-a">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — 5단계 프로세스 */}
      <section className="detail-section dark">
        <div className="container">
          <div className="detail-eyebrow">{t.eb2}</div>
          <h2 className="detail-title">{t.st2}</h2>
          <div className="pr-steps">
            {t.steps.map((s: any, i: number) => (
              <div className="pr-step" key={i}>
                <div className="pr-step-left">
                  <div className="pr-step-num">{s.n}</div>
                  {i < t.steps.length - 1 && <div className="pr-step-line" />}
                </div>
                <div className="pr-step-body">
                  <h4 className="pr-step-title">{s.t}</h4>
                  <p className="pr-step-desc">{s.d}</p>
                  <div className="pr-step-value">{s.value}</div>
                  <div className="pr-step-trust">
                    <span className="pr-trust-badge">{s.trust}</span>
                    <span className="pr-trust-zh">{s.zh}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — 안심 장치 */}
      <section className="detail-section">
        <div className="container">
          <div className="detail-eyebrow">{t.eb3}</div>
          <h2 className="detail-title">{t.st3}</h2>
          <div className="pr-guarantee-grid">
            {t.guarantees.map((g: any, i: number) => (
              <div className="pr-guarantee-card" key={i}>
                <h4>{g.t}</h4>
                <p>{g.d}</p>
                <span className="pr-guarantee-zh">{g.zh}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — 리포팅 */}
      <section className="detail-section gray">
        <div className="container">
          <div className="detail-eyebrow">{t.eb4}</div>
          <h2 className="detail-title">{t.st4}</h2>
          <p className="detail-lead">{t.sl4}</p>
          <div className="pr-report-items">
            {t.reportItems.map((item: string, i: number) => (
              <div className="pr-report-item" key={i}>{item}</div>
            ))}
          </div>
          <p className="pr-report-note">{t.reportNote}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="detail-section" style={{ padding: 0 }}>
        <div className="container">
          <div className="detail-cta">
            <h3>{t.ctaH}</h3>
            <p>{t.ctaP}</p>
            <div className="pr-cta-buttons">
              <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--amber)', color: 'var(--black)' }}>{t.ctaB1}</Link>
              <Link href="/contact" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,.3)', color: 'var(--white)' }}>{t.ctaB2}</Link>
              <Link href="/contact" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,.15)', color: 'rgba(255,255,255,.6)' }}>{t.ctaB3}</Link>
            </div>
          </div>
        </div>
      </section>
    </PageEnter>
  );
}
