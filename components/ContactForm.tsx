"use client";
import { useState } from "react";
import { useLang } from "./LangContext";

const LABELS: Record<string, Record<string, string>> = {
  ko: { type: "문의 유형", kbrand: "한국 브랜드", kseller: "한국 셀러·인플루언서", obrand: "해외 브랜드", oseller: "해외 셀러·왕홍", general: "일반 문의",
    name: "성함", company: "회사 / 소속", email: "이메일", phone: "연락처 (WeChat/전화)", country: "국가 / 지역", message: "문의 내용",
    msgPh: "브랜드·상품·목표·일정 등을 자유롭게 작성해주세요.",
    agree: "개인정보 수집 및 이용에 동의합니다. 수집된 정보는 문의 회신 목적 외에는 사용되지 않습니다.",
    submit: "문의 보내기 →", note: "* 영업일 기준 48시간 이내 won4646@naver.com 으로 회신 드립니다.",
    select: "선택", kr: "한국", cn: "중국", jp: "일본", etc: "기타" },
  en: { type: "Inquiry Type", kbrand: "Korean Brand", kseller: "Korean Seller·Influencer", obrand: "Overseas Brand", oseller: "Overseas Seller·KOL", general: "General",
    name: "Name", company: "Company", email: "Email", phone: "Phone (WeChat/Tel)", country: "Country", message: "Message",
    msgPh: "Please share your brand, product, goals, and timeline.",
    agree: "I agree to the collection and use of personal information for inquiry response purposes only.",
    submit: "Send Inquiry →", note: "* We'll reply within 48 business hours via won4646@naver.com.",
    select: "Select", kr: "Korea", cn: "China", jp: "Japan", etc: "Other" },
  zh: { type: "咨询类型", kbrand: "韩国品牌", kseller: "韩国卖家 · 达人", obrand: "海外品牌", oseller: "海外卖家 · 达人", general: "一般咨询",
    name: "姓名", company: "公司 / 机构", email: "邮箱", phone: "联系方式 (微信/电话)", country: "国家 / 地区", message: "咨询内容",
    msgPh: "请自由填写品牌、产品、目标、时间等。",
    agree: "我同意个人信息的收集与使用,仅用于回复咨询。",
    submit: "发送咨询 →", note: "* 工作日 48 小时内通过 won4646@naver.com 回复。",
    select: "请选择", kr: "韩国", cn: "中国", jp: "日本", etc: "其他" },
  ja: { type: "お問い合わせ種類", kbrand: "韓国ブランド", kseller: "韓国セラー·インフルエンサー", obrand: "海外ブランド", oseller: "海外セラー·KOL", general: "一般",
    name: "お名前", company: "会社 / 所属", email: "メール", phone: "連絡先 (WeChat/電話)", country: "国 / 地域", message: "お問い合わせ内容",
    msgPh: "ブランド·商品·目標·スケジュールなどをご自由にお書きください。",
    agree: "お問い合わせ対応目的に限り、個人情報の収集と利用に同意します。",
    submit: "送信 →", note: "* 営業日48時間以内に won4646@naver.com よりご返信します。",
    select: "選択", kr: "韓国", cn: "中国", jp: "日本", etc: "その他" },
};

export default function ContactForm({ defaultType = "general" }: { defaultType?: string }) {
  const { lang } = useLang();
  const l = LABELS[lang];
  const [type, setType] = useState(defaultType);

  return (
    <form action="https://formsubmit.co/2a5dd71f8ca4ac226e47f8dd17bd3416" method="POST" className="contact-form">
      <input type="hidden" name="_subject" value="[N-LIVE 홈페이지] 신규 파트너십 문의" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_autoresponse" value="N-LIVE 엔라이브 문의가 정상 접수되었습니다. 영업일 기준 48시간 이내 회신 드리겠습니다." />
      <input type="hidden" name="inquiry_type" value={type} />

      <div className="form-group">
        <label>{l.type}</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="form-control">
          <option value="kbrand">{l.kbrand}</option>
          <option value="kseller">{l.kseller}</option>
          <option value="obrand">{l.obrand}</option>
          <option value="oseller">{l.oseller}</option>
          <option value="general">{l.general}</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group"><label>{l.name} <span className="req">*</span></label><input name="name" required className="form-control" /></div>
        <div className="form-group"><label>{l.company} <span className="req">*</span></label><input name="company" required className="form-control" /></div>
      </div>

      <div className="form-row">
        <div className="form-group"><label>{l.email} <span className="req">*</span></label><input name="email" type="email" required className="form-control" /></div>
        <div className="form-group"><label>{l.phone}</label><input name="phone" className="form-control" /></div>
      </div>

      <div className="form-group">
        <label>{l.country}</label>
        <select name="country" className="form-control" defaultValue="">
          <option value="">{l.select}</option>
          <option value="Korea">{l.kr}</option>
          <option value="China">{l.cn}</option>
          <option value="Japan">{l.jp}</option>
          <option value="Other">{l.etc}</option>
        </select>
      </div>

      <div className="form-group">
        <label>{l.message} <span className="req">*</span></label>
        <textarea name="message" required className="form-control" placeholder={l.msgPh} />
      </div>

      <label className="form-check">
        <input type="checkbox" required />
        <span>{l.agree}</span>
      </label>

      <button type="submit" className="form-submit">{l.submit}</button>
      <p className="form-note">{l.note}</p>
    </form>
  );
}
