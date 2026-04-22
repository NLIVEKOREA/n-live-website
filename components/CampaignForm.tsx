"use client";
import { useState } from "react";
import { useLang } from "@/components/LangContext";
import type { Lang } from "@/lib/i18n";

const ENDPOINT = "https://script.google.com/macros/s/AKfycbzV4Qlf4And0KT4i34dPtDhuhgD6EhXeRQflvCQ9E3OtD6dK510ZHVSt1upRhbbspklOw/exec";

// ─── Apps Script 호환을 위해 option value는 모두 한국어로 유지 ───
const REGIONS = ["서울","경기","인천","부산","대구","대전","광주","울산","세종","강원","충북","충남","전북","전남","경북","경남","제주"];
const FOLLOWER_RANGES = ["~5천","5천~1만","1만~5만","5만~10만","10만+"];
const ENGAGEMENT_RANGES = ["~50","50~200","200~1000","1000+"];
const ACTIVE_PERIODS = ["3개월 미만","3~12개월","1~2년","2년+"];
const POST_FREQUENCIES = ["주 1회 이상","월 2~3회","월 1회 이하"];
const CATEGORIES = ["뷰티","패션","푸드","라이프","여행","K-컬처","기타"];
const CONTENT_TYPES = ["이미지 포스트","영상","라이브","혼합"];
const COLLAB_TYPES = ["무상 체험","유료 콘텐츠","장기 앰버서더","라이브 셀러"];
const INTEREST_BRANDS = ["K-Beauty","K-Fashion","K-Food","라이프스타일"];
const CONTENT_LANGUAGES = ["중국어만","한국어만","중국어+한국어 병행"];

// ─── 다국어 디스플레이 라벨 ───
type LabelDict = {
  progress: string;
  step1: string; step1time: string;
  step2: string; step2time: string;
  step3: string; step3time: string;
  step4: string; step4time: string;
  name: string; namePh: string;
  contactLabel: string; contactHint: string;
  kakao: string; kakaoPh: string;
  wechat: string; wechatPh: string;
  contactError: string;
  email: string; emailPh: string;
  resident: string; residentYes: string; residentNo: string;
  region: string; regionPh: string;
  xhsId: string; xhsIdPh: string;
  follower: string; engagement: string;
  activePeriod: string; postFreq: string;
  mainCat: string; contentForm: string; multi: string;
  priorCollab: string; priorHas: string; priorNone: string;
  priorDetail: string; priorDetailPh: string;
  desiredCollab: string; interestBrand: string; contentLang: string;
  portfolio: string; portfolioHint: string; portfolioPh: string;
  intro: string; introHint: string; introPh: string;
  agree: string;
  submit: string; sending: string;
  selectPh: string; optional: string; req: string;
  sendError: string; formNote: string;
  // Thank you page
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
    step2: "샤오홍슈 활동", step2time: "· 약 1분",
    step3: "협업 선호", step3time: "· 약 30초",
    step4: "포트폴리오 · 마무리", step4time: "· 약 30초",
    name: "이름", namePh: "홍길동",
    contactLabel: "연락처", contactHint: "카카오톡 또는 위챗 중 최소 1개는 필수",
    kakao: "카카오톡 ID", kakaoPh: "카톡에서 검색 가능한 ID",
    wechat: "위챗 ID (WeChat)", wechatPh: "微信号",
    contactError: "카카오톡 ID 또는 위챗 ID 중 최소 1개는 입력해주세요.",
    email: "이메일", emailPh: "nlive@example.com",
    resident: "한국 거주 여부", residentYes: "네, 거주 중", residentNo: "아니요",
    region: "배송 가능 지역 (시/도)", regionPh: "선택 (선정 후 상세 주소는 별도 안내)",
    xhsId: "샤오홍슈 ID", xhsIdPh: "@ 제외하고 ID만 (예: nlive_korea)",
    follower: "팔로워 수", engagement: "평균 좋아요/댓글 수",
    activePeriod: "샤오홍슈 활동 기간", postFreq: "최근 3개월 포스팅 빈도",
    mainCat: "주력 카테고리", contentForm: "콘텐츠 형식", multi: "복수 선택 가능",
    priorCollab: "이전 브랜드 협업 경험", priorHas: "있음", priorNone: "없음",
    priorDetail: "협업 경험 간단 기록", priorDetailPh: "예: OOO 브랜드 무상체험, XXX 유료 캠페인",
    desiredCollab: "희망 협업 유형", interestBrand: "관심 K-브랜드 카테고리", contentLang: "콘텐츠 제작 언어",
    portfolio: "대표 포스트 URL", portfolioHint: "최대 3개, 줄바꿈으로 구분",
    portfolioPh: "https://www.xiaohongshu.com/...",
    intro: "짧은 자기소개", introHint: "200자 이내",
    introPh: "어떤 콘텐츠를 만드는지, K-브랜드에 관심 있는 이유 등 자유롭게 적어주세요.",
    agree: "개인정보 수집 및 이용에 동의합니다. 수집된 정보는 체험단 운영 및 회신 목적으로만 사용되며, 선정되지 않은 경우 3개월 이내 파기됩니다.",
    submit: "체험단 신청 제출 →", sending: "전송 중...",
    selectPh: "선택", optional: "선택", req: "*",
    sendError: "전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    formNote: "* 영업일 48시간 이내 선정된 크리에이터께 카카오톡 또는 이메일로 회신드립니다.",
    thankBadge: "RECEIVED · 체험단 신청 접수 완료",
    thankTitle: "신청해주셔서 감사합니다.",
    thankDesc: "제출하신 정보를 정성껏 검토한 뒤,\n영업일 48시간 이내 담당자가 카카오톡 또는 이메일로 회신드립니다.",
    thankSub: "선정되신 크리에이터께만 개별 회신드리며, 결과가 지연될 수 있는 점 양해 부탁드립니다.",
    thankHome: "← 메인으로 돌아가기", thankAgain: "다른 신청 남기기",
  },
  zh: {
    progress: "XIAOHONGSHU CREATOR APPLICATION",
    step1: "基本信息", step1time: "· 约30秒",
    step2: "小红书活动", step2time: "· 约1分钟",
    step3: "合作偏好", step3time: "· 约30秒",
    step4: "作品集 · 完成", step4time: "· 约30秒",
    name: "姓名", namePh: "张三",
    contactLabel: "联系方式", contactHint: "KakaoTalk 或 微信 中至少填写1个",
    kakao: "KakaoTalk ID", kakaoPh: "可在KakaoTalk搜索到的ID",
    wechat: "微信 ID", wechatPh: "微信号",
    contactError: "请至少填写 KakaoTalk ID 或 微信 ID 中的一个。",
    email: "邮箱", emailPh: "nlive@example.com",
    resident: "是否居住于韩国", residentYes: "是,居住中", residentNo: "否",
    region: "可配送地区 (省/市)", regionPh: "选择 (入选后另行通知详细地址)",
    xhsId: "小红书 ID", xhsIdPh: "不含@, 仅填ID (例: nlive_korea)",
    follower: "粉丝数", engagement: "平均点赞/评论数",
    activePeriod: "小红书活动时长", postFreq: "近3个月发布频率",
    mainCat: "主要类目", contentForm: "内容形式", multi: "可多选",
    priorCollab: "以往品牌合作经验", priorHas: "有", priorNone: "无",
    priorDetail: "合作经验简述", priorDetailPh: "例: OOO品牌免费体验, XXX付费项目",
    desiredCollab: "希望合作类型", interestBrand: "感兴趣的韩国品牌类目", contentLang: "内容制作语言",
    portfolio: "代表作URL", portfolioHint: "最多3个, 换行分隔",
    portfolioPh: "https://www.xiaohongshu.com/...",
    intro: "简短自我介绍", introHint: "200字以内",
    introPh: "请自由填写您的创作方向、对韩国品牌的兴趣点等。",
    agree: "我同意收集和使用个人信息。收集的信息仅用于达人项目运营和回复目的, 未入选情况下将于3个月内销毁。",
    submit: "提交达人申请 →", sending: "提交中...",
    selectPh: "请选择", optional: "选填", req: "*",
    sendError: "提交过程中出现问题, 请稍后再试。",
    formNote: "* 工作日48小时内对入选达人通过 KakaoTalk 或 邮件 回复。",
    thankBadge: "RECEIVED · 申请已收到",
    thankTitle: "感谢您的申请",
    thankDesc: "我们将认真审核您提交的信息,\n工作日48小时内由专员通过 KakaoTalk 或 邮件 回复。",
    thankSub: "仅对入选达人个别回复, 如有延迟敬请谅解。",
    thankHome: "← 返回首页", thankAgain: "再提交一份",
  },
  en: {
    progress: "XIAOHONGSHU CREATOR APPLICATION",
    step1: "Basic info", step1time: "· ~30s",
    step2: "Xiaohongshu activity", step2time: "· ~1 min",
    step3: "Collab preferences", step3time: "· ~30s",
    step4: "Portfolio & finish", step4time: "· ~30s",
    name: "Name", namePh: "Your name",
    contactLabel: "Contact", contactHint: "At least one of KakaoTalk or WeChat required",
    kakao: "KakaoTalk ID", kakaoPh: "Searchable KakaoTalk ID",
    wechat: "WeChat ID", wechatPh: "WeChat ID (微信号)",
    contactError: "Please enter at least one: KakaoTalk ID or WeChat ID.",
    email: "Email", emailPh: "nlive@example.com",
    resident: "Living in Korea", residentYes: "Yes, currently", residentNo: "No",
    region: "Delivery region (province/city)", regionPh: "Select (detailed address after selection)",
    xhsId: "Xiaohongshu ID", xhsIdPh: "ID only, without @ (e.g. nlive_korea)",
    follower: "Followers", engagement: "Avg likes/comments",
    activePeriod: "Active duration on Xiaohongshu", postFreq: "Posting frequency (last 3 months)",
    mainCat: "Main categories", contentForm: "Content formats", multi: "Multi-select",
    priorCollab: "Prior brand collaboration", priorHas: "Yes", priorNone: "No",
    priorDetail: "Collab notes", priorDetailPh: "e.g. OOO brand gifting, XXX paid campaign",
    desiredCollab: "Preferred collab types", interestBrand: "Interested K-brand categories", contentLang: "Content language",
    portfolio: "Featured post URLs", portfolioHint: "Up to 3, separated by new lines",
    portfolioPh: "https://www.xiaohongshu.com/...",
    intro: "Short intro", introHint: "Up to 200 chars",
    introPh: "Tell us about your content style and interest in K-brands.",
    agree: "I agree to the collection and use of personal information. Data is used only for campaign operations and replies, and destroyed within 3 months if not selected.",
    submit: "Submit application →", sending: "Sending...",
    selectPh: "Select", optional: "optional", req: "*",
    sendError: "Submission failed. Please try again in a moment.",
    formNote: "* We reply to selected creators within 48 business hours by KakaoTalk or email.",
    thankBadge: "RECEIVED · Application submitted",
    thankTitle: "Thank you for applying",
    thankDesc: "We'll carefully review your information and reply\nby KakaoTalk or email within 48 business hours.",
    thankSub: "We contact only selected creators. Thank you for your patience.",
    thankHome: "← Back to home", thankAgain: "Submit another",
  },
  ja: {
    progress: "XIAOHONGSHU CREATOR APPLICATION",
    step1: "基本情報", step1time: "· 約30秒",
    step2: "小紅書の活動", step2time: "· 約1分",
    step3: "協業の希望", step3time: "· 約30秒",
    step4: "ポートフォリオ · 完了", step4time: "· 約30秒",
    name: "お名前", namePh: "山田太郎",
    contactLabel: "連絡先", contactHint: "KakaoTalk か WeChat のいずれか必須",
    kakao: "KakaoTalk ID", kakaoPh: "KakaoTalkで検索できるID",
    wechat: "WeChat ID (微信)", wechatPh: "WeChat ID",
    contactError: "KakaoTalk ID または WeChat ID のいずれかを入力してください。",
    email: "メール", emailPh: "nlive@example.com",
    resident: "韓国在住", residentYes: "はい、在住", residentNo: "いいえ",
    region: "配送可能地域 (都道府県)", regionPh: "選択 (選定後に詳細住所を別途ご案内)",
    xhsId: "小紅書 ID", xhsIdPh: "@を除くIDのみ (例: nlive_korea)",
    follower: "フォロワー数", engagement: "平均いいね/コメント数",
    activePeriod: "小紅書活動期間", postFreq: "直近3か月の投稿頻度",
    mainCat: "主要カテゴリ", contentForm: "コンテンツ形式", multi: "複数選択可",
    priorCollab: "過去のブランド協業", priorHas: "あり", priorNone: "なし",
    priorDetail: "協業経験メモ", priorDetailPh: "例: OOOブランド無償体験、XXX有償キャンペーン",
    desiredCollab: "希望する協業タイプ", interestBrand: "関心のあるKブランドカテゴリ", contentLang: "制作言語",
    portfolio: "代表投稿URL", portfolioHint: "最大3件、改行で区切り",
    portfolioPh: "https://www.xiaohongshu.com/...",
    intro: "簡単な自己紹介", introHint: "200文字以内",
    introPh: "どんなコンテンツを作るか、Kブランドへの関心などご自由にどうぞ。",
    agree: "個人情報の収集と利用に同意します。収集された情報はキャンペーン運営と返信目的のみに使用され、未選定の場合は3か月以内に廃棄されます。",
    submit: "応募を送信 →", sending: "送信中...",
    selectPh: "選択", optional: "任意", req: "*",
    sendError: "送信中に問題が発生しました。少し後にもう一度お試しください。",
    formNote: "* 選定されたクリエイターには営業日48時間以内にKakaoTalkまたはメールで個別にご返信します。",
    thankBadge: "RECEIVED · 応募を受け付けました",
    thankTitle: "ご応募ありがとうございます",
    thankDesc: "ご提出いただいた情報を丁寧に確認のうえ、\n営業日48時間以内に担当者よりKakaoTalkまたはメールでご返信いたします。",
    thankSub: "選定された方のみ個別にご返信します。結果に時間がかかる場合がございますことご了承ください。",
    thankHome: "← トップに戻る", thankAgain: "もう一件応募する",
  },
};

// option value(한국어) → 각 언어별 표시 텍스트
const OPT: Record<Lang, Record<string, string>> = {
  ko: {
    "~5천":"~5천","5천~1만":"5천~1만","1만~5만":"1만~5만","5만~10만":"5만~10만","10만+":"10만+",
    "~50":"~50","50~200":"50~200","200~1000":"200~1000","1000+":"1000+",
    "3개월 미만":"3개월 미만","3~12개월":"3~12개월","1~2년":"1~2년","2년+":"2년+",
    "주 1회 이상":"주 1회 이상","월 2~3회":"월 2~3회","월 1회 이하":"월 1회 이하",
    "뷰티":"뷰티","패션":"패션","푸드":"푸드","라이프":"라이프","여행":"여행","K-컬처":"K-컬처","기타":"기타",
    "이미지 포스트":"이미지 포스트","영상":"영상","라이브":"라이브","혼합":"혼합",
    "무상 체험":"무상 체험","유료 콘텐츠":"유료 콘텐츠","장기 앰버서더":"장기 앰버서더","라이브 셀러":"라이브 셀러",
    "K-Beauty":"K-Beauty","K-Fashion":"K-Fashion","K-Food":"K-Food","라이프스타일":"라이프스타일",
    "중국어만":"중국어만","한국어만":"한국어만","중국어+한국어 병행":"중국어+한국어 병행",
    "서울":"서울","경기":"경기","인천":"인천","부산":"부산","대구":"대구","대전":"대전","광주":"광주","울산":"울산","세종":"세종","강원":"강원","충북":"충북","충남":"충남","전북":"전북","전남":"전남","경북":"경북","경남":"경남","제주":"제주",
  },
  zh: {
    "~5천":"~5千","5천~1만":"5千~1万","1만~5만":"1万~5万","5만~10만":"5万~10万","10만+":"10万+",
    "~50":"~50","50~200":"50~200","200~1000":"200~1000","1000+":"1000+",
    "3개월 미만":"不足3个月","3~12개월":"3~12个月","1~2년":"1~2年","2년+":"2年以上",
    "주 1회 이상":"每周1次以上","월 2~3회":"每月2~3次","월 1회 이하":"每月1次以下",
    "뷰티":"美妆","패션":"时尚","푸드":"美食","라이프":"生活","여행":"旅行","K-컬처":"韩流","기타":"其他",
    "이미지 포스트":"图文","영상":"视频","라이브":"直播","혼합":"混合",
    "무상 체험":"免费体验","유료 콘텐츠":"付费内容","장기 앰버서더":"长期大使","라이브 셀러":"直播带货",
    "K-Beauty":"K-Beauty","K-Fashion":"K-Fashion","K-Food":"K-Food","라이프스타일":"生活方式",
    "중국어만":"仅中文","한국어만":"仅韩文","중국어+한국어 병행":"中文+韩文",
    "서울":"首尔","경기":"京畿","인천":"仁川","부산":"釜山","대구":"大邱","대전":"大田","광주":"光州","울산":"蔚山","세종":"世宗","강원":"江原","충북":"忠清北","충남":"忠清南","전북":"全罗北","전남":"全罗南","경북":"庆尚北","경남":"庆尚南","제주":"济州",
  },
  en: {
    "~5천":"< 5K","5천~1만":"5K–10K","1만~5만":"10K–50K","5만~10만":"50K–100K","10만+":"100K+",
    "~50":"< 50","50~200":"50–200","200~1000":"200–1,000","1000+":"1,000+",
    "3개월 미만":"< 3 months","3~12개월":"3–12 months","1~2년":"1–2 years","2년+":"2+ years",
    "주 1회 이상":"Weekly+","월 2~3회":"2–3×/month","월 1회 이하":"≤ 1×/month",
    "뷰티":"Beauty","패션":"Fashion","푸드":"Food","라이프":"Lifestyle","여행":"Travel","K-컬처":"K-culture","기타":"Other",
    "이미지 포스트":"Photo post","영상":"Video","라이브":"Live","혼합":"Mixed",
    "무상 체험":"Gifting","유료 콘텐츠":"Paid content","장기 앰버서더":"Ambassador","라이브 셀러":"Live seller",
    "K-Beauty":"K-Beauty","K-Fashion":"K-Fashion","K-Food":"K-Food","라이프스타일":"Lifestyle",
    "중국어만":"Chinese only","한국어만":"Korean only","중국어+한국어 병행":"Chinese + Korean",
    "서울":"Seoul","경기":"Gyeonggi","인천":"Incheon","부산":"Busan","대구":"Daegu","대전":"Daejeon","광주":"Gwangju","울산":"Ulsan","세종":"Sejong","강원":"Gangwon","충북":"Chungbuk","충남":"Chungnam","전북":"Jeonbuk","전남":"Jeonnam","경북":"Gyeongbuk","경남":"Gyeongnam","제주":"Jeju",
  },
  ja: {
    "~5천":"〜5千","5천~1만":"5千〜1万","1만~5만":"1万〜5万","5만~10만":"5万〜10万","10만+":"10万+",
    "~50":"〜50","50~200":"50〜200","200~1000":"200〜1,000","1000+":"1,000+",
    "3개월 미만":"3か月未満","3~12개월":"3〜12か月","1~2년":"1〜2年","2년+":"2年以上",
    "주 1회 이상":"週1回以上","월 2~3회":"月2〜3回","월 1회 이하":"月1回以下",
    "뷰티":"ビューティ","패션":"ファッション","푸드":"フード","라이프":"ライフ","여행":"旅行","K-컬처":"Kカルチャー","기타":"その他",
    "이미지 포스트":"画像投稿","영상":"動画","라이브":"ライブ","혼합":"混合",
    "무상 체험":"無償体験","유료 콘텐츠":"有償コンテンツ","장기 앰버서더":"長期アンバサダー","라이브 셀러":"ライブセラー",
    "K-Beauty":"K-Beauty","K-Fashion":"K-Fashion","K-Food":"K-Food","라이프스타일":"ライフスタイル",
    "중국어만":"中国語のみ","한국어만":"韓国語のみ","중국어+한국어 병행":"中国語+韓国語",
    "서울":"ソウル","경기":"京畿","인천":"仁川","부산":"釜山","대구":"大邱","대전":"大田","광주":"光州","울산":"蔚山","세종":"世宗","강원":"江原","충북":"忠清北","충남":"忠清南","전북":"全羅北","전남":"全羅南","경북":"慶尚北","경남":"慶尚南","제주":"済州",
  },
};

export default function CampaignForm() {
  const { lang } = useLang();
  const t = L[lang];
  const optLabel = (v: string) => OPT[lang][v] || v;

  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [priorCollab, setPriorCollab] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [kakaoId, setKakaoId] = useState<string>("");
  const [wechatId, setWechatId] = useState<string>("");
  const [contactErr, setContactErr] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // 연락처 최소 1개 검증
    if (!kakaoId.trim() && !wechatId.trim()) {
      setContactErr(true);
      const el = document.getElementById("contact-block");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setContactErr(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = new URLSearchParams();
    const multiFields = ["categories","content_types","desired_collab_types","interest_brands"];
    const multiValues: Record<string,string[]> = {};
    multiFields.forEach(f => (multiValues[f] = []));

    formData.forEach((v, k) => {
      if (typeof v === "string") {
        if (multiFields.includes(k)) multiValues[k].push(v);
        else body.append(k, v);
      }
    });
    multiFields.forEach(f => body.append(f, multiValues[f].join(", ")));

    // 연락처 두 값을 하나의 kakao_id 필드로 합치기 (Apps Script 호환)
    const combined = [
      kakaoId.trim() && `KakaoTalk: ${kakaoId.trim()}`,
      wechatId.trim() && `WeChat: ${wechatId.trim()}`,
    ].filter(Boolean).join(" / ");
    body.set("kakao_id", combined);

    body.set("inquiry_type", "xhs-campaign");

    setStatus("sending");
    try {
      await fetch(ENDPOINT, { method: "POST", mode: "no-cors", body });
      setStatus("success");
      form.reset();
      setPriorCollab("");
      setIntro("");
      setKakaoId("");
      setWechatId("");
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

        <div className="form-group">
          <label>{t.name} <span className="req">{t.req}</span></label>
          <input name="name" required placeholder={t.namePh} className="form-control" />
        </div>

        {/* 연락처 블록 — 카카오/위챗 최소 1개 */}
        <div id="contact-block" className="form-group cmp-contact-block">
          <label>
            {t.contactLabel} <span className="req">{t.req}</span>
            <span className="cf-optional"> · {t.contactHint}</span>
          </label>
          <div className="cmp-contact-grid">
            <div className="cmp-contact-cell">
              <div className="cmp-contact-cap">KakaoTalk</div>
              <input
                name="kakao_id_raw"
                value={kakaoId}
                onChange={e => { setKakaoId(e.target.value); if (e.target.value) setContactErr(false); }}
                placeholder={t.kakaoPh}
                className="form-control"
              />
            </div>
            <div className="cmp-contact-cell">
              <div className="cmp-contact-cap">WeChat 微信</div>
              <input
                name="wechat_id"
                value={wechatId}
                onChange={e => { setWechatId(e.target.value); if (e.target.value) setContactErr(false); }}
                placeholder={t.wechatPh}
                className="form-control"
              />
            </div>
          </div>
          {contactErr && <p className="cmp-contact-error">{t.contactError}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t.email} <span className="req">{t.req}</span></label>
            <input name="email" type="email" required placeholder={t.emailPh} className="form-control" />
          </div>
          <div className="form-group">
            <label>{t.resident} <span className="req">{t.req}</span></label>
            <select name="resident" required className="form-control" defaultValue="">
              <option value="" disabled>{t.selectPh}</option>
              <option value="네, 거주 중">{t.residentYes}</option>
              <option value="아니요">{t.residentNo}</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>{t.region} <span className="cf-optional"> · {t.optional}</span></label>
          <select name="region" className="form-control" defaultValue="">
            <option value="">{t.regionPh}</option>
            {REGIONS.map(r => <option key={r} value={r}>{optLabel(r)}</option>)}
          </select>
        </div>
      </div>

      {/* STEP 2 — 샤오홍슈 활동 */}
      <div className="cmp-step">
        <div className="cmp-step-header">
          <span className="cmp-step-num">02</span>
          <span className="cmp-step-label">{t.step2}</span>
          <span className="cmp-step-time">{t.step2time}</span>
        </div>

        <div className="form-group">
          <label>{t.xhsId} <span className="req">{t.req}</span></label>
          <input name="xhs_id" required placeholder={t.xhsIdPh} className="form-control" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t.follower} <span className="req">{t.req}</span></label>
            <select name="follower_range" required className="form-control" defaultValue="">
              <option value="" disabled>{t.selectPh}</option>
              {FOLLOWER_RANGES.map(r => <option key={r} value={r}>{optLabel(r)}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>{t.engagement} <span className="req">{t.req}</span></label>
            <select name="engagement_range" required className="form-control" defaultValue="">
              <option value="" disabled>{t.selectPh}</option>
              {ENGAGEMENT_RANGES.map(r => <option key={r} value={r}>{optLabel(r)}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t.activePeriod} <span className="req">{t.req}</span></label>
            <select name="active_period" required className="form-control" defaultValue="">
              <option value="" disabled>{t.selectPh}</option>
              {ACTIVE_PERIODS.map(p => <option key={p} value={p}>{optLabel(p)}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>{t.postFreq} <span className="req">{t.req}</span></label>
            <select name="post_frequency" required className="form-control" defaultValue="">
              <option value="" disabled>{t.selectPh}</option>
              {POST_FREQUENCIES.map(f => <option key={f} value={f}>{optLabel(f)}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>{t.mainCat} <span className="req">{t.req}</span> <span className="cf-optional"> · {t.multi}</span></label>
          <div className="cmp-chip-grid">
            {CATEGORIES.map(c => (
              <label key={c} className="cmp-chip">
                <input type="checkbox" name="categories" value={c} />
                <span>{optLabel(c)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>{t.contentForm} <span className="req">{t.req}</span> <span className="cf-optional"> · {t.multi}</span></label>
          <div className="cmp-chip-grid">
            {CONTENT_TYPES.map(c => (
              <label key={c} className="cmp-chip">
                <input type="checkbox" name="content_types" value={c} />
                <span>{optLabel(c)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 3 — 협업 선호 */}
      <div className="cmp-step">
        <div className="cmp-step-header">
          <span className="cmp-step-num">03</span>
          <span className="cmp-step-label">{t.step3}</span>
          <span className="cmp-step-time">{t.step3time}</span>
        </div>

        <div className="form-group">
          <label>{t.priorCollab} <span className="req">{t.req}</span></label>
          <div className="cmp-radio-row">
            <label className="cmp-radio">
              <input type="radio" name="prior_collab" value="있음" required
                checked={priorCollab === "있음"} onChange={e => setPriorCollab(e.target.value)} />
              <span>{t.priorHas}</span>
            </label>
            <label className="cmp-radio">
              <input type="radio" name="prior_collab" value="없음"
                checked={priorCollab === "없음"} onChange={e => setPriorCollab(e.target.value)} />
              <span>{t.priorNone}</span>
            </label>
          </div>
        </div>

        {priorCollab === "있음" && (
          <div className="form-group cmp-fade-in">
            <label>{t.priorDetail} <span className="cf-optional"> · {t.optional}</span></label>
            <input name="prior_collab_detail" placeholder={t.priorDetailPh} className="form-control" />
          </div>
        )}

        <div className="form-group">
          <label>{t.desiredCollab} <span className="req">{t.req}</span> <span className="cf-optional"> · {t.multi}</span></label>
          <div className="cmp-chip-grid">
            {COLLAB_TYPES.map(c => (
              <label key={c} className="cmp-chip">
                <input type="checkbox" name="desired_collab_types" value={c} />
                <span>{optLabel(c)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>{t.interestBrand} <span className="req">{t.req}</span> <span className="cf-optional"> · {t.multi}</span></label>
          <div className="cmp-chip-grid">
            {INTEREST_BRANDS.map(c => (
              <label key={c} className="cmp-chip">
                <input type="checkbox" name="interest_brands" value={c} />
                <span>{optLabel(c)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>{t.contentLang} <span className="req">{t.req}</span></label>
          <select name="content_language" required className="form-control" defaultValue="">
            <option value="" disabled>{t.selectPh}</option>
            {CONTENT_LANGUAGES.map(l => <option key={l} value={l}>{optLabel(l)}</option>)}
          </select>
        </div>
      </div>

      {/* STEP 4 — 포트폴리오 + 마무리 */}
      <div className="cmp-step">
        <div className="cmp-step-header">
          <span className="cmp-step-num">04</span>
          <span className="cmp-step-label">{t.step4}</span>
          <span className="cmp-step-time">{t.step4time}</span>
        </div>

        <div className="form-group">
          <label>{t.portfolio} <span className="cf-optional"> · {t.portfolioHint} · {t.optional}</span></label>
          <textarea name="portfolio_urls" rows={3} placeholder={t.portfolioPh} className="form-control" />
        </div>

        <div className="form-group">
          <label>
            {t.intro} <span className="cf-optional"> · {t.introHint} · {t.optional}</span>
            <span className="cmp-counter">{intro.length}/200</span>
          </label>
          <textarea name="intro" rows={4} maxLength={200} value={intro}
            onChange={e => setIntro(e.target.value)} placeholder={t.introPh} className="form-control" />
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
