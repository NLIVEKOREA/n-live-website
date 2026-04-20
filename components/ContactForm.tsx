"use client";
import { useState } from "react";
import { useLang } from "./LangContext";

type InquiryType = "sourcing" | "matching" | "korea-entry" | "overseas-entry" | "nlink" | "general";

type LabelPack = {
  step1: string; step2: string; step3: string;
  sourcing: string; matching: string; korea: string; overseas: string; nlink: string; general: string;
  sourcingDesc: string; matchingDesc: string; koreaDesc: string; overseasDesc: string; nlinkDesc: string; generalDesc: string;
  category: string; categoryPh: string;
  market: string; marketPh: string;
  channel: string; channelPh: string;
  budget: string; budgetPh: string;
  timeline: string; timelineOpts: string[];
  goal: string; goalPh: string;
  nlinkAsk: string; nlinkOpts: string[];
  name: string; company: string; email: string; phone: string; country: string; selectCountry: string;
  kr: string; cn: string; jp: string; etc: string;
  additionalMsg: string; msgPh: string;
  agree: string; submit: string; nlinkSubmit: string; note: string;
  required: string; optional: string;
};

const LABELS: Record<string, LabelPack> = {
  ko: {
    step1: "무슨 일로 연락주시나요",
    step2: "프로젝트 정보",
    step3: "연락처",
    sourcing: "상품 · 브랜드 소싱", matching: "셀러 매칭", korea: "한국시장 진출",
    overseas: "해외시장 진출", nlink: "NLINK 입점 알림", general: "일반 문의",
    sourcingDesc: "검증된 한국/해외 브랜드를 직공급 조건으로 소싱",
    matchingDesc: "국내·해외 셀러/왕홍 매칭 및 콜라보",
    koreaDesc: "해외 브랜드의 한국 진출 (셀러브리티·KOL·라이브·PPL)",
    overseasDesc: "한국 브랜드의 해외 진출 (왕홍·라이브·통관)",
    nlinkDesc: "NLINK 어플리케이션 입점 오픈 알림 신청",
    generalDesc: "그 외 협업 · 제휴 · 파트너십 논의",
    category: "카테고리", categoryPh: "예: K-Beauty, K-Fashion, 건강기능식품, 패션잡화 등",
    market: "대상 시장", marketPh: "예: 중국 · 동남아 · 북미 · 일본 등",
    channel: "운영 채널 / 팔로워", channelPh: "예: 샤오홍슈 50만, Instagram 12만, YouTube 8만 등",
    budget: "예상 예산 / 규모", budgetPh: "예: 월 1천만원 · 캠페인당 5천만원 · 분기 2억 등 (범위 가능)",
    timeline: "시작 희망 시점",
    timelineOpts: ["즉시 (1개월 내)", "1~3개월 내", "3~6개월 내", "장기 검토"],
    goal: "목표 · 우선순위", goalPh: "예: 중국 시장 런칭 · 월 GMV 1억 · 브랜드 인지도 · 재구매율 등",
    nlinkAsk: "관심 있는 역할",
    nlinkOpts: ["브랜드 입점", "셀러 · 왕홍 가입", "파트너 · 투자", "알림만 받기"],
    name: "성함", company: "회사 / 소속", email: "이메일", phone: "연락처 (WeChat/전화)",
    country: "국가 / 지역", selectCountry: "선택",
    kr: "한국", cn: "중국", jp: "일본", etc: "기타",
    additionalMsg: "추가로 남길 내용", msgPh: "위에 없는 내용이나 구체적인 상황을 자유롭게 작성해주세요.",
    agree: "개인정보 수집 및 이용에 동의합니다. 수집된 정보는 문의 회신 목적 외에는 사용되지 않습니다.",
    submit: "문의 보내기 →", nlinkSubmit: "오픈 알림 신청 →",
    note: "* 영업일 48시간 이내 won4646@naver.com 으로 회신 드립니다. 첫 미팅(비대면 30분)은 무료입니다.",
    required: "*", optional: "선택",
  },
  en: {
    step1: "What brings you here", step2: "Project details", step3: "Contact",
    sourcing: "Product · Brand Sourcing", matching: "Seller Matching", korea: "Korea Market Entry",
    overseas: "Overseas Market Entry", nlink: "NLINK Launch Alerts", general: "General",
    sourcingDesc: "Source verified Korean/global brands under direct-supply terms",
    matchingDesc: "Domestic/overseas seller and KOL matching or collab",
    koreaDesc: "Overseas brands entering Korea (celebrities, KOL, live, PPL)",
    overseasDesc: "Korean brands entering overseas (wanghong, live, customs)",
    nlinkDesc: "Request launch alerts for NLINK app",
    generalDesc: "Other collaborations / partnerships / inquiries",
    category: "Category", categoryPh: "e.g., K-Beauty, K-Fashion, supplements, accessories",
    market: "Target market", marketPh: "e.g., China, SE Asia, North America, Japan",
    channel: "Channel / followers", channelPh: "e.g., Xiaohongshu 500K, Instagram 120K, YouTube 80K",
    budget: "Budget / scale", budgetPh: "e.g., ₩10M/mo, ₩50M/campaign, ₩200M/quarter (ranges OK)",
    timeline: "Preferred start",
    timelineOpts: ["Immediate (within 1 mo)", "1~3 months", "3~6 months", "Long-term"],
    goal: "Goal / priority", goalPh: "e.g., launch in China, ₩100M monthly GMV, brand awareness, repeat rate",
    nlinkAsk: "Role of interest",
    nlinkOpts: ["Brand listing", "Seller/KOL registration", "Partner/investor", "Alerts only"],
    name: "Name", company: "Company", email: "Email", phone: "Phone (WeChat/Tel)",
    country: "Country", selectCountry: "Select",
    kr: "Korea", cn: "China", jp: "Japan", etc: "Other",
    additionalMsg: "Additional notes", msgPh: "Anything else you'd like to share — specific situations, questions, etc.",
    agree: "I agree to the collection and use of personal information for inquiry response purposes only.",
    submit: "Send inquiry →", nlinkSubmit: "Request launch alerts →",
    note: "* We'll reply within 48 business hours via won4646@naver.com. First 30-min remote meeting is free.",
    required: "*", optional: "optional",
  },
  zh: {
    step1: "咨询主题", step2: "项目信息", step3: "联系方式",
    sourcing: "产品 · 品牌采购", matching: "卖家匹配", korea: "韩国市场进入",
    overseas: "海外市场进入", nlink: "NLINK 应用上线通知", general: "一般咨询",
    sourcingDesc: "按直供条件对接经验证的韩国/海外品牌",
    matchingDesc: "国内·海外卖家/达人匹配与联名",
    koreaDesc: "海外品牌进入韩国(艺人·KOL·直播·PPL)",
    overseasDesc: "韩国品牌进入海外(达人·直播·通关)",
    nlinkDesc: "申请 NLINK 应用上线通知",
    generalDesc: "其他合作 · 伙伴关系咨询",
    category: "品类", categoryPh: "如: 美妆、服装、保健、配饰等",
    market: "目标市场", marketPh: "如: 中国、东南亚、北美、日本等",
    channel: "运营渠道 / 粉丝量", channelPh: "如: 小红书50万、Instagram 12万、YouTube 8万等",
    budget: "预算 / 规模", budgetPh: "如: 月1000万韩元、每次活动5000万韩元、季度2亿等(范围亦可)",
    timeline: "希望开始时间",
    timelineOpts: ["立即(1个月内)", "1~3个月", "3~6个月", "长期计划"],
    goal: "目标 / 优先事项", goalPh: "如: 进入中国市场、月GMV 1亿、品牌认知、复购率等",
    nlinkAsk: "关注角色",
    nlinkOpts: ["品牌入驻", "卖家/达人注册", "合作伙伴/投资", "仅接收通知"],
    name: "姓名", company: "公司 / 机构", email: "邮箱", phone: "联系方式 (微信/电话)",
    country: "国家 / 地区", selectCountry: "请选择",
    kr: "韩国", cn: "中国", jp: "日本", etc: "其他",
    additionalMsg: "其他补充", msgPh: "上述以外的内容或具体情况请自由填写。",
    agree: "我同意个人信息的收集与使用,仅用于回复咨询。",
    submit: "发送咨询 →", nlinkSubmit: "申请上线通知 →",
    note: "* 工作日 48 小时内通过 won4646@naver.com 回复。首次线上 30 分钟会议免费。",
    required: "*", optional: "选填",
  },
  ja: {
    step1: "お問い合わせ内容", step2: "プロジェクト情報", step3: "連絡先",
    sourcing: "商品 · ブランドソーシング", matching: "セラーマッチング", korea: "韓国市場進出",
    overseas: "海外市場進出", nlink: "NLINKアプリローンチ通知", general: "一般",
    sourcingDesc: "検証済み韓国/海外ブランドを直供給条件でソーシング",
    matchingDesc: "国内・海外セラー/KOLマッチング・コラボ",
    koreaDesc: "海外ブランドの韓国進出(芸能人・KOL・ライブ・PPL)",
    overseasDesc: "韓国ブランドの海外進出(KOL・ライブ・通関)",
    nlinkDesc: "NLINKアプリのローンチ通知を申請",
    generalDesc: "その他の協業・パートナーシップに関するお問い合わせ",
    category: "カテゴリ", categoryPh: "例: K-Beauty、K-Fashion、健康食品、アクセサリー等",
    market: "ターゲット市場", marketPh: "例: 中国、東南アジア、北米、日本等",
    channel: "運営チャネル / フォロワー", channelPh: "例: 小紅書50万、Instagram 12万、YouTube 8万等",
    budget: "予算 / 規模", budgetPh: "例: 月1000万ウォン、キャンペーン毎5000万ウォン、四半期2億等(範囲可)",
    timeline: "希望開始時期",
    timelineOpts: ["即時(1ヶ月以内)", "1~3ヶ月", "3~6ヶ月", "長期検討"],
    goal: "目標 / 優先事項", goalPh: "例: 中国市場ローンチ、月間GMV1億、ブランド認知、リピート率等",
    nlinkAsk: "関心のある役割",
    nlinkOpts: ["ブランド出店", "セラー・KOL登録", "パートナー・投資", "通知のみ受信"],
    name: "お名前", company: "会社 / 所属", email: "メール", phone: "連絡先 (WeChat/電話)",
    country: "国 / 地域", selectCountry: "選択",
    kr: "韓国", cn: "中国", jp: "日本", etc: "その他",
    additionalMsg: "追加メッセージ", msgPh: "上記以外の内容や具体的な状況をご自由にお書きください。",
    agree: "お問い合わせ対応目的に限り、個人情報の収集と利用に同意します。",
    submit: "送信 →", nlinkSubmit: "ローンチ通知を申請 →",
    note: "* 営業日48時間以内に won4646@naver.com よりご返信します。初回MTG(30分オンライン)は無料。",
    required: "*", optional: "任意",
  },
};

const TYPE_ORDER: InquiryType[] = ["sourcing", "matching", "korea-entry", "overseas-entry", "nlink", "general"];
const TYPE_ICON: Record<InquiryType, string> = {
  "sourcing": "⬢", "matching": "◆", "korea-entry": "▲", "overseas-entry": "▼", "nlink": "◉", "general": "○",
};
const TYPE_KEY: Record<InquiryType, { labelKey: keyof LabelPack; descKey: keyof LabelPack }> = {
  "sourcing":       { labelKey: "sourcing", descKey: "sourcingDesc" },
  "matching":       { labelKey: "matching", descKey: "matchingDesc" },
  "korea-entry":    { labelKey: "korea",    descKey: "koreaDesc" },
  "overseas-entry": { labelKey: "overseas", descKey: "overseasDesc" },
  "nlink":          { labelKey: "nlink",    descKey: "nlinkDesc" },
  "general":        { labelKey: "general",  descKey: "generalDesc" },
};

export default function ContactForm({ defaultType = "general" }: { defaultType?: string }) {
  const { lang } = useLang();
  const l = LABELS[lang];
  // 기존 쿼리 파라미터 (kbrand/kseller/obrand/oseller) → 새 interest 키로 매핑
  const mapped: Record<string, InquiryType> = {
    "kbrand": "overseas-entry",
    "kseller": "matching",
    "obrand": "korea-entry",
    "oseller": "sourcing",
    "sourcing": "sourcing",
    "matching": "matching",
    "korea-entry": "korea-entry",
    "overseas-entry": "overseas-entry",
    "nlink": "nlink",
    "general": "general",
  };
  const [type, setType] = useState<InquiryType>((mapped[defaultType] || "general") as InquiryType);

  const isNlink = type === "nlink";
  const showBusinessFields = type !== "nlink" && type !== "general";
  const isSellerChannel = type === "matching" || type === "sourcing";

  return (
    <form action="https://formsubmit.co/2a5dd71f8ca4ac226e47f8dd17bd3416" method="POST" className="contact-form contact-form-v2">
      <input type="hidden" name="_subject" value="[N-LIVE 홈페이지] 신규 파트너십 문의" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_autoresponse" value="N-LIVE 엔라이브 문의가 정상 접수되었습니다. 영업일 기준 48시간 이내 회신 드리겠습니다." />
      <input type="hidden" name="inquiry_type" value={type} />

      {/* STEP 1 — 문의 유형 선택 (아이콘 카드) */}
      <div className="cf-step">
        <div className="cf-step-header">
          <span className="cf-step-num">01</span>
          <span className="cf-step-label">{l.step1}</span>
        </div>
        <div className="cf-type-grid">
          {TYPE_ORDER.map((t) => {
            const k = TYPE_KEY[t];
            const isActive = type === t;
            return (
              <button
                key={t}
                type="button"
                className={`cf-type-card ${isActive ? "active" : ""}`}
                data-type={t}
                onClick={() => setType(t)}
              >
                <span className="cf-type-icon">{TYPE_ICON[t]}</span>
                <span className="cf-type-name">{l[k.labelKey]}</span>
                <span className="cf-type-desc">{l[k.descKey]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2 — 프로젝트 정보 (문의 유형별 맞춤 질문) */}
      <div className="cf-step">
        <div className="cf-step-header">
          <span className="cf-step-num">02</span>
          <span className="cf-step-label">{l.step2}</span>
        </div>

        {isNlink ? (
          <div className="form-group">
            <label>{l.nlinkAsk} <span className="req">{l.required}</span></label>
            <select name="nlink_role" required className="form-control" defaultValue="">
              <option value="" disabled>{l.selectCountry}</option>
              {l.nlinkOpts.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
            </select>
          </div>
        ) : (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>{l.category} {showBusinessFields && <span className="req">{l.required}</span>}</label>
                <input name="category" required={showBusinessFields} placeholder={l.categoryPh} className="form-control" />
              </div>
              <div className="form-group">
                <label>
                  {isSellerChannel ? l.channel : l.market}
                  <span className="cf-optional"> · {l.optional}</span>
                </label>
                <input
                  name={isSellerChannel ? "channel" : "market"}
                  placeholder={isSellerChannel ? l.channelPh : l.marketPh}
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{l.budget} <span className="cf-optional"> · {l.optional}</span></label>
                <input name="budget" placeholder={l.budgetPh} className="form-control" />
              </div>
              <div className="form-group">
                <label>{l.timeline} <span className="cf-optional"> · {l.optional}</span></label>
                <select name="timeline" className="form-control" defaultValue="">
                  <option value="">{l.selectCountry}</option>
                  {l.timelineOpts.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>{l.goal} <span className="cf-optional"> · {l.optional}</span></label>
              <textarea name="goal" rows={3} placeholder={l.goalPh} className="form-control" />
            </div>
          </>
        )}

        <div className="form-group">
          <label>{l.additionalMsg} <span className="cf-optional"> · {l.optional}</span></label>
          <textarea name="message" className="form-control" placeholder={l.msgPh} />
        </div>
      </div>

      {/* STEP 3 — 연락처 */}
      <div className="cf-step">
        <div className="cf-step-header">
          <span className="cf-step-num">03</span>
          <span className="cf-step-label">{l.step3}</span>
        </div>

        <div className="form-row">
          <div className="form-group"><label>{l.name} <span className="req">{l.required}</span></label><input name="name" required className="form-control" /></div>
          <div className="form-group"><label>{l.company} {!isNlink && <span className="req">{l.required}</span>}</label><input name="company" required={!isNlink} className="form-control" /></div>
        </div>

        <div className="form-row">
          <div className="form-group"><label>{l.email} <span className="req">{l.required}</span></label><input name="email" type="email" required className="form-control" /></div>
          <div className="form-group"><label>{l.phone} <span className="cf-optional"> · {l.optional}</span></label><input name="phone" className="form-control" /></div>
        </div>

        <div className="form-group">
          <label>{l.country}</label>
          <select name="country" className="form-control" defaultValue="">
            <option value="">{l.selectCountry}</option>
            <option value="Korea">{l.kr}</option>
            <option value="China">{l.cn}</option>
            <option value="Japan">{l.jp}</option>
            <option value="Other">{l.etc}</option>
          </select>
        </div>
      </div>

      <label className="form-check">
        <input type="checkbox" required />
        <span>{l.agree}</span>
      </label>

      <button type="submit" className="form-submit">
        {isNlink ? l.nlinkSubmit : l.submit}
      </button>
      <p className="form-note">{l.note}</p>
    </form>
  );
}
