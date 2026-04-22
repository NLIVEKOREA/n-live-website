"use client";
import { useState } from "react";

const ENDPOINT = "https://script.google.com/macros/s/AKfycbzV4Qlf4And0KT4i34dPtDhuhgD6EhXeRQflvCQ9E3OtD6dK510ZHVSt1upRhbbspklOw/exec";

const REGIONS = [
  "서울", "경기", "인천", "부산", "대구", "대전", "광주", "울산", "세종",
  "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"
];

const FOLLOWER_RANGES = [
  "~5천", "5천~1만", "1만~5만", "5만~10만", "10만+"
];

const ENGAGEMENT_RANGES = [
  "~50", "50~200", "200~1000", "1000+"
];

const ACTIVE_PERIODS = [
  "3개월 미만", "3~12개월", "1~2년", "2년+"
];

const POST_FREQUENCIES = [
  "주 1회 이상", "월 2~3회", "월 1회 이하"
];

const CATEGORIES = ["뷰티", "패션", "푸드", "라이프", "여행", "K-컬처", "기타"];
const CONTENT_TYPES = ["이미지 포스트", "영상", "라이브", "혼합"];
const COLLAB_TYPES = ["무상 체험", "유료 콘텐츠", "장기 앰버서더", "라이브 셀러"];
const INTEREST_BRANDS = ["K-Beauty", "K-Fashion", "K-Food", "라이프스타일"];
const CONTENT_LANGUAGES = ["중국어만", "한국어만", "중국어+한국어 병행"];

export default function CampaignForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [priorCollab, setPriorCollab] = useState<string>("");
  const [intro, setIntro] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // 복수 선택 필드는 값들을 콤마로 합쳐서 전송
    const body = new URLSearchParams();
    const multiFields = ["categories", "content_types", "desired_collab_types", "interest_brands"];
    const multiValues: Record<string, string[]> = {};
    multiFields.forEach(f => (multiValues[f] = []));

    formData.forEach((v, k) => {
      if (typeof v === "string") {
        if (multiFields.includes(k)) {
          multiValues[k].push(v);
        } else {
          body.append(k, v);
        }
      }
    });

    // 복수 선택 값들을 콤마로 합쳐서 추가
    multiFields.forEach(f => {
      body.append(f, multiValues[f].join(", "));
    });

    // inquiry_type 고정
    body.set("inquiry_type", "xhs-campaign");

    setStatus("sending");
    try {
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body,
      });
      setStatus("success");
      form.reset();
      setPriorCollab("");
      setIntro("");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: window.scrollY - 100, behavior: "smooth" });
      }
    } catch (err) {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="campaign-form cf-thankyou">
        <div className="cf-thank-badge">
          <span className="cf-thank-dot" />
          RECEIVED · 체험단 신청 접수 완료
        </div>
        <div className="cf-thank-check">
          <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
            <path d="M18 33 L28 43 L47 22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="cf-thank-title">신청해주셔서 감사합니다.</h3>
        <p className="cf-thank-desc">
          제출하신 정보를 정성껏 검토한 뒤,{"\n"}
          영업일 48시간 이내 담당자가 카카오톡 또는 이메일로 회신드립니다.
        </p>
        <p className="cf-thank-sub">
          선정되신 크리에이터께만 개별 회신드리며, 결과가 지연될 수 있는 점 양해 부탁드립니다.
        </p>
        <div className="cf-thank-actions">
          <a href="/" className="cf-thank-home">
            ← 메인으로 돌아가기
          </a>
          <button
            type="button"
            className="cf-thank-again"
            onClick={() => setStatus("idle")}
          >
            다른 신청 남기기
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="campaign-form">
      {/* PROGRESS */}
      <div className="cmp-progress">
        <div className="cmp-progress-bar" />
        <span className="cmp-progress-label">XIAOHONGSHU CREATOR APPLICATION</span>
      </div>

      {/* STEP 1 — 기본 정보 */}
      <div className="cmp-step">
        <div className="cmp-step-header">
          <span className="cmp-step-num">01</span>
          <span className="cmp-step-label">기본 정보</span>
          <span className="cmp-step-time">· 약 30초</span>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>이름 <span className="req">*</span></label>
            <input name="name" required placeholder="홍길동" className="form-control" />
          </div>
          <div className="form-group">
            <label>카카오톡 ID <span className="req">*</span></label>
            <input name="kakao_id" required placeholder="카톡에서 검색 가능한 ID" className="form-control" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>이메일 <span className="req">*</span></label>
            <input name="email" type="email" required placeholder="nlive@example.com" className="form-control" />
          </div>
          <div className="form-group">
            <label>한국 거주 여부 <span className="req">*</span></label>
            <select name="resident" required className="form-control" defaultValue="">
              <option value="" disabled>선택</option>
              <option value="네, 거주 중">네, 거주 중</option>
              <option value="아니요">아니요</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>배송 가능 지역 (시/도) <span className="cf-optional"> · 선택</span></label>
          <select name="region" className="form-control" defaultValue="">
            <option value="">선택 (선정 후 상세 주소는 별도 안내)</option>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* STEP 2 — 샤오홍슈 활동 */}
      <div className="cmp-step">
        <div className="cmp-step-header">
          <span className="cmp-step-num">02</span>
          <span className="cmp-step-label">샤오홍슈 활동</span>
          <span className="cmp-step-time">· 약 1분</span>
        </div>

        <div className="form-group">
          <label>샤오홍슈 ID <span className="req">*</span></label>
          <input name="xhs_id" required placeholder="@ 제외하고 ID만 (예: nlive_korea)" className="form-control" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>팔로워 수 <span className="req">*</span></label>
            <select name="follower_range" required className="form-control" defaultValue="">
              <option value="" disabled>선택</option>
              {FOLLOWER_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>평균 좋아요/댓글 수 <span className="req">*</span></label>
            <select name="engagement_range" required className="form-control" defaultValue="">
              <option value="" disabled>선택</option>
              {ENGAGEMENT_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>샤오홍슈 활동 기간 <span className="req">*</span></label>
            <select name="active_period" required className="form-control" defaultValue="">
              <option value="" disabled>선택</option>
              {ACTIVE_PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>최근 3개월 포스팅 빈도 <span className="req">*</span></label>
            <select name="post_frequency" required className="form-control" defaultValue="">
              <option value="" disabled>선택</option>
              {POST_FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>주력 카테고리 <span className="req">*</span> <span className="cf-optional"> · 복수 선택 가능</span></label>
          <div className="cmp-chip-grid">
            {CATEGORIES.map(c => (
              <label key={c} className="cmp-chip">
                <input type="checkbox" name="categories" value={c} />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>콘텐츠 형식 <span className="req">*</span> <span className="cf-optional"> · 복수 선택 가능</span></label>
          <div className="cmp-chip-grid">
            {CONTENT_TYPES.map(c => (
              <label key={c} className="cmp-chip">
                <input type="checkbox" name="content_types" value={c} />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 3 — 협업 선호 */}
      <div className="cmp-step">
        <div className="cmp-step-header">
          <span className="cmp-step-num">03</span>
          <span className="cmp-step-label">협업 선호</span>
          <span className="cmp-step-time">· 약 30초</span>
        </div>

        <div className="form-group">
          <label>이전 브랜드 협업 경험 <span className="req">*</span></label>
          <div className="cmp-radio-row">
            <label className="cmp-radio">
              <input
                type="radio"
                name="prior_collab"
                value="있음"
                required
                checked={priorCollab === "있음"}
                onChange={e => setPriorCollab(e.target.value)}
              />
              <span>있음</span>
            </label>
            <label className="cmp-radio">
              <input
                type="radio"
                name="prior_collab"
                value="없음"
                checked={priorCollab === "없음"}
                onChange={e => setPriorCollab(e.target.value)}
              />
              <span>없음</span>
            </label>
          </div>
        </div>

        {priorCollab === "있음" && (
          <div className="form-group cmp-fade-in">
            <label>협업 경험 간단 기록 <span className="cf-optional"> · 선택</span></label>
            <input
              name="prior_collab_detail"
              placeholder="예: OOO 브랜드 무상체험, XXX 유료 캠페인"
              className="form-control"
            />
          </div>
        )}

        <div className="form-group">
          <label>희망 협업 유형 <span className="req">*</span> <span className="cf-optional"> · 복수 선택 가능</span></label>
          <div className="cmp-chip-grid">
            {COLLAB_TYPES.map(c => (
              <label key={c} className="cmp-chip">
                <input type="checkbox" name="desired_collab_types" value={c} />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>관심 K-브랜드 카테고리 <span className="req">*</span> <span className="cf-optional"> · 복수 선택 가능</span></label>
          <div className="cmp-chip-grid">
            {INTEREST_BRANDS.map(c => (
              <label key={c} className="cmp-chip">
                <input type="checkbox" name="interest_brands" value={c} />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>콘텐츠 제작 언어 <span className="req">*</span></label>
          <select name="content_language" required className="form-control" defaultValue="">
            <option value="" disabled>선택</option>
            {CONTENT_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {/* STEP 4 — 포트폴리오 + 마무리 */}
      <div className="cmp-step">
        <div className="cmp-step-header">
          <span className="cmp-step-num">04</span>
          <span className="cmp-step-label">포트폴리오 · 마무리</span>
          <span className="cmp-step-time">· 약 30초</span>
        </div>

        <div className="form-group">
          <label>대표 포스트 URL <span className="cf-optional"> · 최대 3개, 줄바꿈으로 구분 · 선택</span></label>
          <textarea
            name="portfolio_urls"
            rows={3}
            placeholder="https://www.xiaohongshu.com/...\nhttps://www.xiaohongshu.com/..."
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>
            짧은 자기소개 <span className="cf-optional"> · 200자 이내 · 선택</span>
            <span className="cmp-counter">{intro.length}/200</span>
          </label>
          <textarea
            name="intro"
            rows={4}
            maxLength={200}
            value={intro}
            onChange={e => setIntro(e.target.value)}
            placeholder="어떤 콘텐츠를 만드는지, K-브랜드에 관심 있는 이유 등 자유롭게 적어주세요."
            className="form-control"
          />
        </div>

        <label className="form-check">
          <input type="checkbox" required />
          <span>
            개인정보 수집 및 이용에 동의합니다. 수집된 정보는 체험단 운영 및 회신 목적으로만
            사용되며, 선정되지 않은 경우 3개월 이내 파기됩니다.
          </span>
        </label>

        <button
          type="submit"
          className="form-submit cmp-submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "전송 중..." : "체험단 신청 제출 →"}
        </button>

        {status === "error" && (
          <p className="form-error">전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
        )}

        <p className="form-note">
          * 영업일 48시간 이내 선정된 크리에이터께 카카오톡 또는 이메일로 회신드립니다.
        </p>
      </div>
    </form>
  );
}
