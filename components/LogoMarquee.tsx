"use client";
import { useEffect, useState } from "react";

type Brand = { id: string; realName?: string; name?: string; logo?: string; logoLight?: boolean };
type Person = { image?: string | null; name?: string; country?: string; category?: string; followersText?: string };

export default function LogoMarquee() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    fetch("/pool-brands.json").then((r) => r.json()).then((d: Brand[]) => {
      setBrands(d.filter((b) => b.logo));
    }).catch(() => {});
    Promise.all([
      fetch("/pool-china.json").then((r) => r.json()).catch(() => []),
      fetch("/pool-sellers.json").then((r) => r.json()).catch(() => []),
    ]).then(([china, sellers]: [any[], any[]]) => {
      const se: Person[] = (sellers || []).filter((s) => s.image).map((s) => ({
        image: s.image, name: s.realName || s.nickname, country: s.country,
        category: s.category, followersText: s.followersText,
      }));
      const ch: Person[] = (china || []).filter((c) => c.image).map((c) => ({
        image: c.image, name: c.name, country: "중국",
        category: "왕홍 라이브", followersText: c.followersText,
      }));
      // 해외 셀러 + 중국 왕홍 (점수/팔로워 큰 순으로 자연스럽게 섞임)
      setPeople([...se, ...ch]);
    });
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
