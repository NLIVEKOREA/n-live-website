"use client";
import { useEffect, useState } from "react";

type Brand = { id: string; realName?: string; name?: string; logo?: string; logoLight?: boolean; category?: string; cat?: string; status?: string };
type Person = { image?: string | null; name?: string; country?: string; category?: string; followersText?: string };

export default function LogoMarquee() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    // 마퀴 전용 공개 API — 비식별 정보만(로고/마스킹 이름). 원본 풀 데이터는 인증 API 뒤로 이동
    fetch("/api/marquee/").then((r) => r.json()).then((res: { brands?: Brand[]; people?: Person[] }) => {
      setBrands(res.brands || []);
      setPeople(res.people || []);
    }).catch(() => {});
  }, []);

  // 끊김 없는 무한 루프를 위해 2배 복제
  const brandLoop = brands.length ? [...brands, ...brands] : [];
  const peopleLoop = people.length ? [...people, ...people] : [];

  if (!brands.length && !people.length) return null;

  return (
    <div className="lm-wrap" aria-hidden="true">
      {/* 브랜드 로고 — 왼쪽에서 오른쪽으로 */}
      <div className="lm-row lm-ltr">
        <div className="lm-track">
          {brandLoop.map((b, i) => (
            <div className="lm-card lm-brand" key={`b-${i}`}>
              <img
                src={b.logo}
                alt=""
                loading="lazy"
                className={b.logoLight ? "lm-logo lm-logo-light" : "lm-logo"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 해외 셀러 + 중국 왕홍 — 오른쪽에서 왼쪽으로 (국적·카테고리·팔로워) */}
      <div className="lm-row lm-rtl">
        <div className="lm-track">
          {peopleLoop.map((c, i) => (
            <div className="lm-card lm-wh" key={`c-${i}`}>
              <span className="lm-avatar">
                <img src={c.image || ""} alt="" loading="lazy" />
              </span>
              <span className="lm-wh-meta">
                <span className="lm-wh-name">{c.name}</span>
                <span className="lm-wh-info">
                  <span className="ctry">{c.country}</span>
                  {c.category ? <span className="cat">{c.category}</span> : null}
                </span>
                {c.followersText ? <span className="lm-wh-fol">{c.followersText}</span> : null}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
