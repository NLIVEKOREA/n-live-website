"use client";
import { useEffect, useState } from "react";

type Brand = { id: string; realName?: string; name?: string; logo?: string; logoLight?: boolean; category?: string; cat?: string };
type Person = { image?: string | null; name?: string; country?: string; category?: string; followersText?: string };

// 매칭풀과 동일한 카테고리 그룹핑 — 패션/패션잡화는 홈 노출에서 제외
function categoryGroup(cat?: string): string {
  const c = cat || "";
  if (/뷰티|화장품|코스메|스킨|메이크업/.test(c)) return "뷰티";
  if (/식품|푸드|음료|건강식품/.test(c)) return "식품";
  if (/가방|모자|아이웨어|구두|신발|슈즈|스니커즈|슬리퍼|잡화|주얼리|악세|액세/.test(c)) return "패션잡화";
  if (/리빙|라이프|홈|인테리어|반려|펫/.test(c)) return "라이프스타일";
  return "패션";
}
const HIDDEN_GROUPS = ["패션", "패션잡화"];

export default function LogoMarquee() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    fetch("/pool-brands.json").then((r) => r.json()).then((d: Brand[]) => {
      // 패션·패션잡화 브랜드는 홈에 노출하지 않음 (뷰티·식품·라이프만)
      setBrands(d.filter((b) => b.logo && !HIDDEN_GROUPS.includes(categoryGroup(b.category || b.cat))));
    }).catch(() => {});
    Promise.all([
      fetch("/pool-china.json").then((r) => r.json()).catch(() => []),
      fetch("/pool-sellers.json").then((r) => r.json()).catch(() => []),
    ]).then(([china, sellers]: [any[], any[]]) => {
      // 팔로워 5만(50,000) 이상만 노출
      const MIN = 50000;
      const se: Person[] = (sellers || []).filter((s) => s.image && (s.followers || 0) >= MIN).map((s) => ({
        image: s.image, name: s.realName || s.nickname, country: s.country,
        category: s.category, followersText: s.followersText,
      }));
      const ch: Person[] = (china || []).filter((c) => c.image && (c.followers || 0) >= MIN).map((c) => ({
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
