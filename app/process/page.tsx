"use client";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import PageEnter from "@/components/PageEnter";
import type { Lang } from "@/lib/i18n";

const C: Record<Lang, any> = {
  ko: {
    crumb: "PROCESS · 실행 프레임워크",
    h1: "파트너십 실행 프레임워크.",
    lead: "한국 브랜드의 중국 진출이든, 해외 왕홍의 한국 상품 조달이든 — 엔라이브는 동일한 단계별 구조로 파트너십을 설계하고 실행합니다.",
    eb1: "3-STAGE FRAMEWORK", st1: "진단 → 실행 → 확장, 세 단계의 운영",
    stages: [
      { n: "01 / STRATEGY", t: "진단 · 전략 설계", d: "비대면 30분 진단 미팅으로 시작합니다. 시장·상품·경쟁을 정리하고, 타겟·KPI·예산·일정까지 합의 후 다음 단계로 넘어갑니다.", b: ["시장 · 상품 · 경쟁 진단", "타겟 포지셔닝 · KPI 정의", "채널 · 예산 · 단계 설계"], deliv: "산출 — 진단 리포트 + 후보 풀 리스트" },
      { n: "02 / EXECUTION", t: "매칭 · 실행", d: "확정된 풀에서 왕홍·KOL·셀러를 매칭하고, 콘텐츠·라이브 제작과 플랫폼 운영을 직접 수행합니다. 매주 정기 리포트로 진행 상황을 공유합니다.", b: ["왕홍 · KOL · 셀러 매칭", "콘텐츠 · 라이브 운영", "플랫폼별 트래픽 분산 운영"], deliv: "산출 — 주간 성과 리포트 + 정산서" },
      { n: "03 / SCALING", t: "확장 · 자산화", d: "초기 성과 데이터를 기반으로 카테고리·채널을 확장하고, 반복 협업 구조와 장기 브랜드 자산을 함께 설계합니다.", b: ["데이터 기반 콘텐츠 최적화", "반복 협업 · 카테고리 확장", "장기 브랜드 자산 구축"], deliv: "산출 — 분기 리뷰 + 다음 단계 로드맵" },
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
    lead: "Whether it's Korean brands entering China or global wanghongs sourcing Korean products — N-LIVE designs and executes partnerships through the same staged structure.",
    eb1: "3-STAGE FRAMEWORK", st1: "Diagnose → Execute → Scale — Three-Stage Operations",
    stages: [
      { n: "01 / STRATEGY", t: "Diagnose · Strategy", d: "We start with a 30-minute remote diagnostic meeting. We organize market, product, and competition; agree on target, KPI, budget, and timeline before moving on.", b: ["Market · product · competitive diagnostics", "Target positioning · KPI definition", "Channel · budget · stage design"], deliv: "Delivered — Diagnostic report + candidate pool list" },
      { n: "02 / EXECUTION", t: "Match · Execute", d: "From the agreed pool, we match wanghongs, KOLs, and sellers; produce content and live shows; run platform operations directly. Weekly reports keep you in the loop.", b: ["Wanghong · KOL · seller matching", "Content · live operations", "Per-platform traffic distribution"], deliv: "Delivered — Weekly performance report + settlement" },
      { n: "03 / SCALING", t: "Scale · Asset-Build", d: "Based on early performance data, we expand channels and categories, and co-design repeat collaboration structures and long-term brand assets.", b: ["Data-based content optimization", "Repeat collaborations · category expansion", "Long-term brand asset building"], deliv: "Delivered — Quarterly review + next-stage roadmap" },
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
      { n: "01 / 战略", t: "诊断 · 战略设计", d: "从线上 30 分钟诊断会议开始。整理市场、产品、竞争情况,确定目标、KPI、预算和时间表后再进入下一步。", b: ["市场 · 产品 · 竞争诊断", "目标定位 · KPI 定义", "渠道 · 预算 · 阶段设计"], deliv: "交付物 — 诊断报告 + 候选资源清单" },
      { n: "02 / 执行", t: "匹配 · 执行", d: "从已确定的资源池中匹配达人、KOL、卖家;制作内容与直播;直接执行平台运营。每周定期报告同步进度。", b: ["达人 · KOL · 卖家匹配", "内容 · 直播运营", "按平台分散流量运营"], deliv: "交付物 — 周报 + 结算单" },
      { n: "03 / 扩展", t: "扩展 · 资产化", d: "基于初期成果数据扩展品类与渠道,共同设计重复合作结构与长期品牌资产。", b: ["基于数据的内容优化", "重复合作 · 品类扩展", "长期品牌资产建设"], deliv: "交付物 — 季度复盘 + 下阶段路线图" },
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
      { n: "01 / STRATEGY", t: "診断 · 戦略設計", d: "オンライン30分の診断ミーティングから始めます。市場・商品・競合を整理し、ターゲット・KPI・予算・スケジュールを合意してから次に進みます。", b: ["市場 · 商品 · 競合診断", "ターゲットポジショニング · KPI定義", "チャネル · 予算 · 段階設計"], deliv: "成果物 — 診断レポート + 候補プールリスト" },
      { n: "02 / EXECUTION", t: "マッチング · 実行", d: "確定したプールからKOL・セラーをマッチングし、コンテンツ・ライブ制作とプラットフォーム運営を直接遂行します。週次レポートで進捗を共有。", b: ["KOL · セラーマッチング", "コンテンツ · ライブ運営", "プラットフォーム別トラフィック分散運営"], deliv: "成果物 — 週次パフォーマンスレポート + 精算書" },
      { n: "03 / SCALING", t: "拡張 · 資産化", d: "初期成果データに基づきカテゴリ・チャネルを拡張し、反復コラボ構造と長期ブランド資産を共同で設計します。", b: ["データに基づくコンテンツ最適化", "反復コラボ · カテゴリ拡張", "長期ブランド資産構築"], deliv: "成果物 — 四半期レビュー + 次段階ロードマップ" },
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
  const { lang, t: tr } = useLang();
  const t = C[lang];
  return (
    <PageEnter variant="wipe-l" color="#2D7BFF">
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
                {s.deliv && (
                  <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px dashed var(--gray-200)', fontSize: 12, color: 'var(--gray-800)', letterSpacing: '.02em', fontWeight: 600 }}>
                    {s.deliv}
                  </div>
                )}
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
          <div className="image-placeholder tall">
            <div className="ip-tag">IMAGE</div>
            <div className="ip-caption">{tr("ip.report")}</div>
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
