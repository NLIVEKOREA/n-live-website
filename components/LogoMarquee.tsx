"use client";
import { useEffect, useState } from "react";

type Brand = { id: string; realName?: string; name?: string; logo?: string; logoLight?: boolean };
type China = { name?: string; image?: string | null; followersText?: string };

export default function LogoMarquee() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [china, setChina] = useState<China[]>([]);

  useEffect(() => {
    fetch("/pool-brands.json").then((r) => r.json()).then((d: Brand[]) => {
      setBrands(d.filter((b) => b.logo));
    }).catch(() => {});
    fetch("/pool-china.json").then((r) => r.json()).then((d: China[]) => {
      setChina(d.filter((c) => c.image));
    }).catch(() => {});
  }, []);

  // 끊김 없는 무한 루프를 위해 2배 복제
  const brandLoop = brands.length ? [...brands, ...brands] : [];
  const chinaLoop = china.length ? [...china, ...china] : [];

  if (!brands.length && !china.length) return null;

  return (
    <div className="lm-wrap" aria-hidden="true">
      {/* 브랜드 — 왼쪽에서 오른쪽으로 */}
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

      {/* 중국 왕홍 — 오른쪽에서 왼쪽으로 */}
      <div className="lm-row lm-rtl">
        <div className="lm-track">
          {chinaLoop.map((c, i) => (
            <div className="lm-card lm-wh" key={`c-${i}`}>
              <span className="lm-avatar">
                <img src={c.image || ""} alt="" loading="lazy" />
              </span>
              <span className="lm-wh-meta">
                <span className="lm-wh-name">{c.name}</span>
                {c.followersText ? <span className="lm-wh-fol">{c.followersText}</span> : null}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
