"use client";

interface Case {
  brand: string;
  metric: string;
  desc: string;
}

export default function CaseCards({ cases, accent }: { cases: Case[]; accent?: string }) {
  return (
    <div className="case-cards-wrap">
      <div className="case-cards">
        {cases.map((c, i) => (
          <div className="case-card" key={i} style={{ "--card-accent": accent || "var(--amber)" } as React.CSSProperties}>
            <div className="case-num">0{i + 1}</div>
            <div className="case-brand">{c.brand}</div>
            <div className="case-metric">{c.metric}</div>
            <p className="case-desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
