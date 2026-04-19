"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import type { Lang } from "@/lib/i18n";

const C: Record<Lang, any> = {
  ko: {
    crumb: "PROCESS · 실행 프레임워크",
    h1: "파트너십 실행 프레임워크.",
    lead: "한국 브랜드의 중국 진출이든, 해외 왕홍의 한국 상품 조달이든 — 엔라이브는 동일한 단계별 구조로 파트너십을 설계하고 실행합니다.",
    eb1: "3-STAGE FRAMEWORK", st1: "진단 → 실행 → 확장, 세 단계의 운영",
    stages: [
      { n: "01 / STRATEGY", t: "전략 설계", d: "파트너의 시장·상품·경쟁 상황을 진단하고, 타겟 포지셔닝과 KPI를 정의합니다. 채널·예산·단계별 실행안까지 설계 완료 후 합의.", b: ["시장 · 상품 · 경쟁 진단", "타겟 포지셔닝 · KPI 정의", "채널 · 예산 · 단계 설계"] },
      { n: "02 / EXECUTION", t: "매칭 · 실행", d: "왕홍·KOL·셀러 매칭, 콘텐츠·라이브 제작, 플랫폼별 운영을 실행합니다. 매주 성과 리포트로 드리프트 방지.", b: ["왕홍 · KOL · 셀러 매칭", "콘텐츠 · 라이브 운영", "플랫폼별 트래픽 분산 운영"] },
      { n: "03 / SCALING", t: "확장 · 자산화", d: "성과 기반으로 채널·카테고리를 확장하고, 반복 협업 구조와 장기 브랜드 자산을 구축합니다.", b: ["데이터 기반 콘텐츠 최적화", "반복 협업 · 카테고리 확장", "장기 브랜드 자산 구축"] },
    ],
    eb2: "REPORTING", st2: "투명한 성과 리포팅",
    sl2: "모든 파트너에게 주간·월간 성과 리포트를 제공합니다. 왕홍·셀러별 GMV, 플랫폼별 CTR·CVR, 콘텐츠 성과 데이터까지 — 의사결정에 필요한 모든 숫자를 한 장에.",
    pendL: "SAMPLE REPORT",
    pendP: "파트너십 시작 전 샘플 리포트를 요청하실 수 있습니다. 문의 폼에서 \"리포트 샘플 요청\"을 선택해주세요.",
    ctaH: "프로세스를 실제 우리 프로젝트에 적용해 본다면?",
    ctaP: "현재 상황과 목표를 알려주시면, 맞춤 진단부터 시작하겠습니다.",
    ctaB: "파트너십 문의 →",
  },
  en: {
    crumb: "PROCESS · Execution Framework",
    h1: "Partnership Execution Framework.",
    lead: "Whether it's Korean brands entering China or overseas wanghongs sourcing Korean products — N-LIVE designs and executes partnerships through the same staged structure.",
    eb1: "3-STAGE FRAMEWORK", st1: "Diagnose → Execute → Scale — Three-Stage Operations",
    stages: [
      { n: "01 / STRATEGY", t: "Strategy Design", d: "We diagnose the partner's market, product, and competitive situation, then define target positioning and KPIs. Channel, budget, and stage-by-stage execution plan all designed and agreed before kickoff.", b: ["Market · product · competitive diagnostics", "Target positioning · KPI definition", "Channel · budget · stage design"] },
      { n: "02 / EXECUTION", t: "Match · Execute", d: "We match wanghongs, KOLs, and sellers; produce content and live shows; run platform-specific operations. Weekly performance reports prevent drift.", b: ["Wanghong · KOL · seller matching", "Content · live operations", "Per-platform traffic distribution"] },
      { n: "03 / SCALING", t: "Scale · Asset-Build", d: "Based on results, we expand channels and categories, and build repeat collaboration structures and long-term brand assets.", b: ["Data-based content optimization", "Repeat collaborations · category expansion", "Long-term brand asset building"] },
    ],
    eb2: "REPORTING", st2: "Transparent Performance Reporting",
    sl2: "We provide weekly and monthly performance reports to all partners. GMV per wanghong/seller, CTR/CVR per platform, content performance data — all the numbers needed for decisions, on a single page.",
    pendL: "SAMPLE REPORT",
    pendP: "You can request a sample report before starting a partnership. Select \"Request report sample\" in the inquiry form.",
    ctaH: "What if we applied this process to your actual project?",
    ctaP: "Share your current situation and goals — we'll start with a tailored diagnostic.",
    ctaB: "Partnership inquiry →",
  },
  zh: {
    crumb: "流程 · 执行框架",
    h1: "合作执行框架。",
    lead: "无论是韩国品牌进入中国市场,还是海外达人采购韩国商品 — 恩联通过相同的分阶段结构设计和执行合作。",
    eb1: "三阶段框架", st1: "诊断 → 执行 → 扩展,三阶段运营",
    stages: [
      { n: "01 / 战略", t: "战略设计", d: "我们诊断合作方的市场、产品、竞争状况,定义目标定位和 KPI。渠道、预算、分阶段执行方案全部设计并达成共识后启动。", b: ["市场 · 产品 · 竞争诊断", "目标定位 · KPI 定义", "渠道 · 预算 · 阶段设计"] },
      { n: "02 / 执行", t: "匹配 · 执行", d: "我们匹配达人、KOL、卖家;制作内容和直播;按平台执行运营。每周绩效报告防止偏离。", b: ["达人 · KOL · 卖家匹配", "内容 · 直播运营", "按平台分散流量运营"] },
      { n: "03 / 扩展", t: "扩展 · 资产化", d: "基于成果扩展渠道和品类,构建重复合作结构和长期品牌资产。", b: ["基于数据的内容优化", "重复合作 · 品类扩展", "长期品牌资产建设"] },
    ],
    eb2: "报告", st2: "透明的绩效报告",
    sl2: "我们为所有合作方提供周报和月报。每位达人/卖家的 GMV、每个平台的 CTR/CVR、内容效果数据 — 决策所需的所有数字,集中在一页。",
    pendL: "样本报告",
    pendP: "您可以在开始合作前申请样本报告。在咨询表单中选择 \"请求报告样本\"。",
    ctaH: "如果将此流程应用于您的实际项目?",
    ctaP: "告诉我们您的当前状况和目标,我们将从定制诊断开始。",
    ctaB: "合作咨询 →",
  },
  ja: {
    crumb: "PROCESS · 実行フレームワーク",
    h1: "パートナーシップ実行フレームワーク。",
    lead: "韓国ブランドの中国進出であれ、海外KOLの韓国商品調達であれ — N-LIVEは同一の段階構造でパートナーシップを設計・実行します。",
    eb1: "3-STAGE FRAMEWORK", st1: "診断 → 実行 → 拡張、3段階の運営",
    stages: [
      { n: "01 / STRATEGY", t: "戦略設計", d: "パートナーの市場・商品・競合状況を診断し、ターゲットポジショニングとKPIを定義。チャネル・予算・段階別実行案まで設計合意後に開始。", b: ["市場 · 商品 · 競合診断", "ターゲットポジショニング · KPI定義", "チャネル · 予算 · 段階設計"] },
      { n: "02 / EXECUTION", t: "マッチング · 実行", d: "KOL・セラーのマッチング、コンテンツ・ライブ制作、プラットフォーム別運営を実行。毎週の成果レポートでドリフトを防止。", b: ["KOL · セラーマッチング", "コンテンツ · ライブ運営", "プラットフォーム別トラフィック分散運営"] },
      { n: "03 / SCALING", t: "拡張 · 資産化", d: "成果に基づきチャネル・カテゴリを拡張し、反復コラボ構造と長期ブランド資産を構築します。", b: ["データに基づくコンテンツ最適化", "反復コラボ · カテゴリ拡張", "長期ブランド資産構築"] },
    ],
    eb2: "REPORTING", st2: "透明な成果レポーティング",
    sl2: "すべてのパートナーに週次・月次の成果レポートを提供します。KOL・セラー別のGMV、プラットフォーム別のCTR・CVR、コンテンツ成果データまで — 意思決定に必要なすべての数字を1ページに。",
    pendL: "SAMPLE REPORT",
    pendP: "パートナーシップ開始前にサンプルレポートをリクエストできます。お問い合わせフォームで「レポートサンプルリクエスト」を選択してください。",
    ctaH: "このプロセスを実際のプロジェクトに適用するなら?",
    ctaP: "現状と目標をお知らせいただければ、カスタム診断から始めます。",
    ctaB: "パートナーシップお問い合わせ →",
  },
};

export default function ProcessPage() {
  const { lang } = useLang();
  const t = C[lang];
  return (
    <>
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
            {t.stages.map((s: any, i: number) => (
              <div className="detail-item" key={i}>
                <div className="detail-item-num">{s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
                <ul style={{ listStyle: 'none', marginTop: 16, fontSize: 13, color: 'var(--gray-600)' }}>
                  {s.b.map((bullet: string, j: number) => <li key={j}>· {bullet}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section gray">
        <div className="container">
          <div className="detail-eyebrow">{t.eb2}</div>
          <h2 className="detail-title">{t.st2}</h2>
          <p className="detail-lead">{t.sl2}</p>
          <div className="pending-box">
            <div className="pending-label">{t.pendL}</div>
            <p>{t.pendP}</p>
          </div>
          <div className="detail-cta">
            <h3>{t.ctaH}</h3>
            <p>{t.ctaP}</p>
            <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--amber)', color: 'var(--black)' }}>{t.ctaB}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
