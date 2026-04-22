"use client";
import { useState } from "react";
import { useLang } from "@/components/LangContext";
import type { Lang } from "@/lib/i18n";

const ENDPOINT = "https://script.google.com/macros/s/AKfycbzV4Qlf4And0KT4i34dPtDhuhgD6EhXeRQflvCQ9E3OtD6dK510ZHVSt1upRhbbspklOw/exec";

// ─── option value(한국어 고정) + 각 언어 표시 라벨 ───
const PLATFORMS = ["샤오홍슈", "더우인", "콰이셔우", "웨이보", "기타"];
const CATEGORIES = [
  "브이로그/일상",
  "뷰티/스킨케어",
  "패션/스타일",
  "음식/맛집",
  "여행",
  "라이브 커머스",
  "헬스/피트니스",
  "육아/맘스타그램",
  "인테리어/라이프스타일",
  "댄스/엔터테인먼트",
  "펫/반려동물",
  "기타",
];
const FOLLOWER_RANGES = [
  "1000 미만",
  "3000 미만",
  "5000 미만",
  "1만 미만",
  "1만 이상",
  "3만 이상",
  "5만 이상",
  "10만 이상",
  "30만 이상",
];
const NATIONALITIES = [
  "중국",
  "한국",
  "일본",
  "미국",
  "유럽",
  "태국",
  "베트남",
  "싱가폴",
  "말레이시아",
  "기타",
];
const AGE_RANGES = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];
const TIME_SLOTS = [
  "오전 10시",
  "오전 11시",
  "정오 12시",
  "오후 1시",
  "오후 2시",
  "오후 3시",
  "오후 4시",
  "오후 5시",
  "오후 6시",
];

// ─── 각 언어별 고정 라벨 ───
type LabelDict = {
  progress: string;
  step1: string; step1time: string;
  step2: string; step2time: string;

  name: string; namePh: string;
  nickname: string; nicknamePh: string;
  nationality: string;
  age: string;
  wechat: string; wechatPh: string;
  phone: string; phonePh: string;

  platform: string;
  category: string;
  follower: string;
  prefDate1: string;
  prefDate2: string;
  prefDateHint: string;
  prefTime: string;
  notes: string; notesPh: string; notesHint: string;

  agree: string;
  submit: string; sending: string;
  selectPh: string; optional: string; req: string;
  sendError: string; formNote: string;

  thankBadge: string;
  thankTitle: string;
  thankDesc: string;
  thankSub: string;
  thankHome: string;
  thankAgain: string;
};

const L: Record<Lang, LabelDict> = {
  ko: {
    progress: "XIAOHONGSHU CREATOR APPLICATION",
    step1: "기본 정보", step1time: "· 약 30초",
    step2: "활동 · 방문 정보", step2time: "· 약 1분",

    name: "이름", namePh: "예: 홍길동",
    nickname: "닉네임", nicknamePh: "예: N-Live",
    nationality: "국적",
    age: "나이",
    wechat: "위챗 ID (WeChat)", wechatPh: "请填写您的微信号",
    phone: "전화번호", phonePh: "中国号码或韩国号码均可",

    platform: "주요 플랫폼",
    category: "활동 카테고리",
    follower: "팔로워 수",
    prefDate1: "1지망 방문일",
    prefDate2: "2지망 방문일",
    prefDateHint: "예: 2026-05-10",
    prefTime: "희망 방문시간",
    notes: "특수사항 / 요청사항",
    notesPh: "알러지 이력, 특별 요청 등을 작성해주세요.",
    notesHint: "선택 · 200자 이내",

    agree: "개인정보 수집 및 이용에 동의합니다. 수집된 정보는 체험단 운영 및 회신 목적으로만 사용되며, 선정되지 않은 경우 3개월 이내 파기됩니다.",
    submit: "체험단 신청 제출 →", sending: "전송 중...",
    selectPh: "선택", optional: "선택", req: "*",
    sendError: "전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    formNote: "* 영업일 48시간 이내 선정된 크리에이터께 위챗 또는 전화로 회신드립니다.",

    thankBadge: "RECEIVED · 체험단 신청 접수 완료",
    thankTitle: "신청해주셔서 감사합니다.",
    thankDesc: "제출하신 정보를 정성껏 검토한 뒤,\n영업일 48시간 이내 담당자가 위챗 또는 전화로 회신드립니다.",
    thankSub: "선정되신 크리에이터께만 개별 회신드리며, 결과가 지연될 수 있는 점 양해 부탁드립니다.",
    thankHome: "← 메인으로 돌아가기", thankAgain: "다른 신청 남기기",
  },
  zh: {
    progress: "XIAOHONGSHU CREATOR APPLICATION",
    step1: "基本信息", step1time: "· 约30秒",
    step2: "活动 · 访问信息", step2time: "· 约1分钟",

    name: "真实姓名", namePh: "例: 李启洙",
    nickname: "昵称/网名", nicknamePh: "例: N-Live",
    nationality: "国籍",
    age: "年龄",
    wechat: "微信 ID", wechatPh: "请填写您的微信号",
    phone: "手机号码", phonePh: "中国号码或韩国号码均可",

    platform: "主要平台",
    category: "内容类目",
    follower: "粉丝数",
    prefDate1: "第一志愿拜访日期",
    prefDate2: "第二志愿拜访日期",
    prefDateHint: "例: 2026-05-10",
    prefTime: "希望拜访时间",
    notes: "特殊情况 / 需求说明",
    notesPh: "如有过敏史、特别要求等请在此填写",
    notesHint: "选填 · 200字以内",

    agree: "我同意收集和使用个人信息。收集的信息仅用于达人项目运营和回复目的, 未入选情况下将于3个月内销毁。",
    submit: "提交达人申请 →", sending: "提交中...",
    selectPh: "请选择", optional: "选填", req: "*",
    sendError: "提交过程中出现问题, 请稍后再试。",
    formNote: "* 工作日48小时内对入选达人通过 微信 或 电话 回复。",

    thankBadge: "RECEIVED · 申请已收到",
    thankTitle: "感谢您的申请",
    thankDesc: "我们将认真审核您提交的信息,\n工作日48小时内由专员通过 微信 或 电话 回复。",
    thankSub: "仅对入选达人个别回复, 如有延迟敬请谅解。",
    thankHome: "← 返回首页", thankAgain: "再提交一份",
  },
  en: {
    progress: "XIAOHONGSHU CREATOR APPLICATION",
    step1: "Basic info", step1time: "· ~30s",
    step2: "Activity · Visit info", step2time: "· ~1 min",

    name: "Full name", namePh: "e.g. John Doe",
    nickname: "Nickname", nicknamePh: "e.g. N-Live",
    nationality: "Nationality",
    age: "Age",
    wechat: "WeChat ID", wechatPh: "Your WeChat ID",
    phone: "Phone", phonePh: "CN or KR number OK",

    platform: "Main platform",
    category: "Content category",
    follower: "Followers",
    prefDate1: "1st choice visit date",
    prefDate2: "2nd choice visit date",
    prefDateHint: "e.g. 2026-05-10",
    prefTime: "Preferred visit time",
    notes: "Special notes / requests",
    notesPh: "Allergies, special requests, etc.",
    notesHint: "Optional · up to 200 chars",

    agree: "I agree to the collection and use of personal information. Data is used only for campaign operations and replies, and destroyed within 3 months if not selected.",
    submit: "Submit application →", sending: "Sending...",
    selectPh: "Select", optional: "optional", req: "*",
    sendError: "Submission failed. Please try again in a moment.",
    formNote: "* We reply to selected creators within 48 business hours by WeChat or phone.",

    thankBadge: "RECEIVED · Application submitted",
    thankTitle: "Thank you for applying",
    thankDesc: "We'll carefully review your information and reply\nby WeChat or phone within 48 business hours.",
    thankSub: "We contact only selected creators. Thank you for your patience.",
    thankHome: "← Back to home", thankAgain: "Submit another",
  },
  ja: {
    progress: "XIAOHONGSHU CREATOR APPLICATION",
    step1: "基本情報", step1time: "· 約30秒",
    step2: "活動 · 訪問情報", step2time: "· 約1分",

    name: "お名前", namePh: "例: 山田太郎",
    nickname: "ニックネーム", nicknamePh: "例: N-Live",
    nationality: "国籍",
    age: "年齢",
    wechat: "WeChat ID (微信)", wechatPh: "WeChat ID",
    phone: "電話番号", phonePh: "中国 / 韓国番号 どちらでも可",

    platform: "メイン活動プラットフォーム",
    category: "コンテンツカテゴリ",
    follower: "フォロワー数",
    prefDate1: "第一希望 訪問日",
    prefDate2: "第二希望 訪問日",
    prefDateHint: "例: 2026-05-10",
    prefTime: "希望訪問時間",
    notes: "特記事項 / ご要望",
    notesPh: "アレルギー歴や特別な要望があればご記入ください",
    notesHint: "任意 · 200文字以内",

    agree: "個人情報の収集と利用に同意します。収集された情報はキャンペーン運営と返信目的のみに使用され、未選定の場合は3か月以内に廃棄されます。",
    submit: "応募を送信 →", sending: "送信中...",
    selectPh: "選択", optional: "任意", req: "*",
    sendError: "送信中に問題が発生しました。少し後にもう一度お試しください。",
    formNote: "* 選定されたクリエイターには営業日48時間以内にWeChatまたはお電話で個別にご返信します。",

    thankBadge: "RECEIVED · 応募を受け付けました",
    thankTitle: "ご応募ありがとうございます",
    thankDesc: "ご提出いただいた情報を丁寧に確認のうえ、\n営業日48時間以内に担当者よりWeChatまたはお電話でご返信いたします。",
    thankSub: "選定された方のみ個別にご返信します。結果に時間がかかる場合がございますことご了承ください。",
    thankHome: "← トップに戻る", thankAgain: "もう一件応募する",
  },
};

// option value(한국어) → 각 언어별 표시 텍스트
const OPT: Record<Lang, Record<string, string>> = {
  ko: {
    "샤오홍슈":"샤오홍슈","더우인":"더우인","콰이셔우":"콰이셔우","웨이보":"웨이보","기타":"기타",
    "브이로그/일상":"브이로그/일상","뷰티/스킨케어":"뷰티/스킨케어","패션/스타일":"패션/스타일","음식/맛집":"음식/맛집","여행":"여행","라이브 커머스":"라이브 커머스","헬스/피트니스":"헬스/피트니스","육아/맘스타그램":"육아/맘스타그램","인테리어/라이프스타일":"인테리어/라이프스타일","댄스/엔터테인먼트":"댄스/엔터테인먼트","펫/반려동물":"펫/반려동물",
    "1000 미만":"1000 미만","3000 미만":"3000 미만","5000 미만":"5000 미만","1만 미만":"1만 미만","1만 이상":"1만 이상","3만 이상":"3만 이상","5만 이상":"5만 이상","10만 이상":"10만 이상","30만 이상":"30만 이상",
    "중국":"중국","한국":"한국","일본":"일본","미국":"미국","유럽":"유럽","태국":"태국","베트남":"베트남","싱가폴":"싱가폴","말레이시아":"말레이시아",
    "10대":"10대","20대":"20대","30대":"30대","40대":"40대","50대":"50대","60대 이상":"60대 이상",
    "오전 10시":"오전 10시","오전 11시":"오전 11시","정오 12시":"정오 12시","오후 1시":"오후 1시","오후 2시":"오후 2시","오후 3시":"오후 3시","오후 4시":"오후 4시","오후 5시":"오후 5시","오후 6시":"오후 6시",
  },
  zh: {
    "샤오홍슈":"小红书","더우인":"抖音","콰이셔우":"快手","웨이보":"微博","기타":"其他",
    "브이로그/일상":"Vlog/日常","뷰티/스킨케어":"美妆/护肤","패션/스타일":"时尚/穿搭","음식/맛집":"美食","여행":"旅行","라이브 커머스":"直播带货","헬스/피트니스":"健身","육아/맘스타그램":"亲子/育儿","인테리어/라이프스타일":"家居/生活方式","댄스/엔터테인먼트":"舞蹈/娱乐","펫/반려동물":"宠物",
    "1000 미만":"1000以下","3000 미만":"3000以下","5000 미만":"5000以下","1만 미만":"1万以下","1만 이상":"1万以上","3만 이상":"3万以上","5만 이상":"5万以上","10만 이상":"10万以上","30만 이상":"30万以上",
    "중국":"中国","한국":"韩国","일본":"日本","미국":"美国","유럽":"欧洲","태국":"泰国","베트남":"越南","싱가폴":"新加坡","말레이시아":"马来西亚",
    "10대":"10多岁","20대":"20多岁","30대":"30多岁","40대":"40多岁","50대":"50多岁","60대 이상":"60岁以上",
    "오전 10시":"上午10点","오전 11시":"上午11点","정오 12시":"中午12点","오후 1시":"下午1点","오후 2시":"下午2点","오후 3시":"下午3点","오후 4시":"下午4点","오후 5시":"下午5点","오후 6시":"下午6点",
  },
  en: {
    "샤오홍슈":"Xiaohongshu","더우인":"Douyin","콰이셔우":"Kuaishou","웨이보":"Weibo","기타":"Other",
    "브이로그/일상":"Vlog / Lifestyle","뷰티/스킨케어":"Beauty / Skincare","패션/스타일":"Fashion / Style","음식/맛집":"Food","여행":"Travel","라이브 커머스":"Live commerce","헬스/피트니스":"Fitness","육아/맘스타그램":"Parenting","인테리어/라이프스타일":"Home / Lifestyle","댄스/엔터테인먼트":"Dance / Entertainment","펫/반려동물":"Pets",
    "1000 미만":"< 1K","3000 미만":"< 3K","5000 미만":"< 5K","1만 미만":"< 10K","1만 이상":"10K+","3만 이상":"30K+","5만 이상":"50K+","10만 이상":"100K+","30만 이상":"300K+",
    "중국":"China","한국":"Korea","일본":"Japan","미국":"USA","유럽":"Europe","태국":"Thailand","베트남":"Vietnam","싱가폴":"Singapore","말레이시아":"Malaysia",
    "10대":"Teens (10s)","20대":"20s","30대":"30s","40대":"40s","50대":"50s","60대 이상":"60+",
    "오전 10시":"10 AM","오전 11시":"11 AM","정오 12시":"12 PM (noon)","오후 1시":"1 PM","오후 2시":"2 PM","오후 3시":"3 PM","오후 4시":"4 PM","오후 5시":"5 PM","오후 6시":"6 PM",
  },
  ja: {
    "샤오홍슈":"小紅書","더우인":"抖音","콰이셔우":"快手","웨이보":"微博","기타":"その他",
    "브이로그/일상":"Vlog / 日常","뷰티/스킨케어":"ビューティ / スキンケア","패션/스타일":"ファッション","음식/맛집":"グルメ","여행":"旅行","라이브 커머스":"ライブコマース","헬스/피트니스":"フィットネス","육아/맘스타그램":"育児","인테리어/라이프스타일":"インテリア / ライフ","댄스/엔터테인먼트":"ダンス / エンタメ","펫/반려동물":"ペット",
    "1000 미만":"1000未満","3000 미만":"3000未満","5000 미만":"5000未満","1만 미만":"1万未満","1만 이상":"1万以上","3만 이상":"3万以上","5만 이상":"5万以上","10만 이상":"10万以上","30만 이상":"30万以上",
    "중국":"中国","한국":"韓国","일본":"日本","미국":"アメリカ","유럽":"ヨーロッパ","태국":"タイ","베트남":"ベトナム","싱가폴":"シンガポール","말레이시아":"マレーシア",
    "10대":"10代","20대":"20代","30대":"30代","40대":"40代","50대":"50代","60대 이상":"60代以上",
    "오전 10시":"午前10時","오전 11시":"午前11時","정오 12시":"正午12時","오후 1시":"午後1時","오후 2시":"午後2時","오후 3시":"午後3時","오후 4시":"午後4時","오후 5시":"午後5時","오후 6시":"午後6時",
  },
};

export default function CampaignForm() {
  const { lang } = useLang();
  const t = L[lang];
  const optLabel = (v: string) => OPT[lang][v] || v;

  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [notes, setNotes] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = new URLSearchParams();
    formData.forEach((v, k) => {
      if (typeof v === "string") body.append(k, v);
    });

    body.set("inquiry_type", "xhs-campaign-v2");
    body.set("lang", lang);

    setStatus("sending");
    try {
      await fetch(ENDPOINT, { method: "POST", mode: "no-cors", body });
      setStatus("success");
      form.reset();
      setNotes("");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: window.scrollY - 100, behavior: "smooth" });
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="campaign-form cf-thankyou">
        <div className="cf-thank-badge">
          <span className="cf-thank-dot" />
          {t.thankBadge}
        </div>
        <div className="cf-thank-check">
          <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
            <path d="M18 33 L28 43 L47 22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="cf-thank-title">{t.thankTitle}</h3>
        <p className="cf-thank-desc" style={{whiteSpace:"pre-line"}}>{t.thankDesc}</p>
        <p className="cf-thank-sub">{t.thankSub}</p>
        <div className="cf-thank-actions">
          <a href="/" className="cf-thank-home">{t.thankHome}</a>
          <button type="button" className="cf-thank-again" onClick={() => setStatus("idle")}>{t.thankAgain}</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="campaign-form" noValidate>
      <div className="cmp-progress">
        <div className="cmp-progress-bar" />
        <span className="cmp-progress-label">{t.progress}</span>
      </div>

      {/* STEP 1 — 기본 정보 */}
      <div className="cmp-step">
        <div className="cmp-step-header">
          <span className="cmp-step-num">01</span>
          <span className="cmp-step-label">{t.step1}</span>
          <span className="cmp-step-time">{t.step1time}</span>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t.name} <span className="req">{t.req}</span></label>
            <input name="name" required placeholder={t.namePh} className="form-control" />
          </div>
          <div className="form-group">
            <label>{t.nickname} <span className="req">{t.req}</span></label>
            <input name="nickname" required placeholder={t.nicknamePh} className="form-control" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t.nationality} <span className="req">{t.req}</span></label>
            <select name="nationality" required className="form-control" defaultValue="">
              <option value="" disabled>{t.selectPh}</option>
              {NATIONALITIES.map(n => <option key={n} value={n}>{optLabel(n)}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>{t.age} <span className="req">{t.req}</span></label>
            <select name="age_range" required className="form-control" defaultValue="">
              <option value="" disabled>{t.selectPh}</option>
              {AGE_RANGES.map(a => <option key={a} value={a}>{optLabel(a)}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t.wechat} <span className="req">{t.req}</span></label>
            <input name="wechat_id" required placeholder={t.wechatPh} className="form-control" />
          </div>
          <div className="form-group">
            <label>{t.phone} <span className="req">{t.req}</span></label>
            <input name="phone" type="tel" required placeholder={t.phonePh} className="form-control" />
          </div>
        </div>
      </div>

      {/* STEP 2 — 활동 & 방문 */}
      <div className="cmp-step">
        <div className="cmp-step-header">
          <span className="cmp-step-num">02</span>
          <span className="cmp-step-label">{t.step2}</span>
          <span className="cmp-step-time">{t.step2time}</span>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t.platform} <span className="req">{t.req}</span></label>
            <select name="platform" required className="form-control" defaultValue="">
              <option value="" disabled>{t.selectPh}</option>
              {PLATFORMS.map(p => <option key={p} value={p}>{optLabel(p)}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>{t.follower} <span className="req">{t.req}</span></label>
            <select name="follower_range" required className="form-control" defaultValue="">
              <option value="" disabled>{t.selectPh}</option>
              {FOLLOWER_RANGES.map(r => <option key={r} value={r}>{optLabel(r)}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>{t.category} <span className="req">{t.req}</span></label>
          <select name="category" required className="form-control" defaultValue="">
            <option value="" disabled>{t.selectPh}</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{optLabel(c)}</option>)}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t.prefDate1} <span className="req">{t.req}</span></label>
            <input name="preferred_date_1" type="date" required className="form-control" placeholder={t.prefDateHint} />
          </div>
          <div className="form-group">
            <label>{t.prefDate2} <span className="req">{t.req}</span></label>
            <input name="preferred_date_2" type="date" required className="form-control" placeholder={t.prefDateHint} />
          </div>
        </div>

        <div className="form-group">
          <label>{t.prefTime} <span className="req">{t.req}</span></label>
          <select name="preferred_time" required className="form-control" defaultValue="">
            <option value="" disabled>{t.selectPh}</option>
            {TIME_SLOTS.map(s => <option key={s} value={s}>{optLabel(s)}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>
            {t.notes} <span className="cf-optional"> · {t.notesHint}</span>
            <span className="cmp-counter">{notes.length}/200</span>
          </label>
          <textarea
            name="notes"
            rows={3}
            maxLength={200}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder={t.notesPh}
            className="form-control"
          />
        </div>

        <label className="form-check">
          <input type="checkbox" required />
          <span>{t.agree}</span>
        </label>

        <button type="submit" className="form-submit cmp-submit" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.submit}
        </button>

        {status === "error" && <p className="form-error">{t.sendError}</p>}

        <p className="form-note">{t.formNote}</p>
      </div>
    </form>
  );
}
