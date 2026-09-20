"use client";
import { pickLang } from "@/lib/i18n";
import { useLang } from "@/components/LangContext";
import PageEnter from "@/components/PageEnter";

// 기사 본문은 한국어(소식란). 다음 행사는 NEWS 배열에 객체 하나 append.
// ponytail: 단일 언어 기사 + 배열 렌더. 다국어 본문/상세 라우팅은 필요해지면 그때.
type Block = { p: string } | { img: string; cap: string };
type Article = { date: string; tag: string; title: string; lead: string; cover: string; body: Block[] };

const NEWS: Article[] = [
  {
    date: "2026.09.20",
    tag: "現場 · 행사 참관",
    title: "엔라이브, 2026 抖音 창작자 대회(Douyin Creator Conference) 현장을 다녀오다",
    lead: "중국 최대 숏폼·라이브커머스 플랫폼 抖音(더우인)이 개최한 2026 창작자 대회. 슬로건은 ‘热爱所向 万千回响 — 열정이 향하는 곳, 수만의 울림’. 엔라이브가 현장에서 최신 흐름을 살폈습니다.",
    cover: "/newsimg/douyin2026-1.jpg",
    body: [
      { p: "엔라이브가 抖音(더우인)이 개최한 ‘2026 抖音 창작자 대회(DOUYIN CREATOR CONFERENCE)’ 현장을 참관했습니다. 한중 크로스보더 라이브커머스를 운영하는 엔라이브에게, 중국 커머스 생태계가 어디로 향하는지를 가장 앞줄에서 확인할 수 있는 자리였습니다." },
      { p: "이번 대회의 핵심은 抖音의 크리에이터 마케팅 플랫폼 巨量星图(쥐량싱투)가 공개한 신제품 ‘星选种草团(성선 종초단) — Agent 기반 스마트 딜리버리’였습니다. AI가 브랜드의 요구를 분석해 전략 방향을 만들고(AI 콘텐츠 전략), 다차원으로 브랜드와 창작자를 정밀 매칭하며(AI 스마트 매칭), 상업 기회 추천·크리에이티브 가이드·대본 사전 진단·원스톱 이행까지 한 흐름으로 잇는 것이 골자입니다." },
      { img: "/newsimg/douyin2026-2.jpg", cap: "巨量星图가 공개한 ‘星选种草团’ — AI·Agent가 브랜드와 창작자 매칭부터 이행까지 담당하는 신제품" },
      { p: "대표 사례로 소개된 Tom Ford × 星选种草团 협업은 수치가 인상적이었습니다. 협업 소요 10일, 마케팅 비용 –70%, 콘텐츠(种草·종초) 품질 +28%, 신규 크리에이터 발굴 100%. 사람이 일일이 붙던 브랜드–크리에이터 매칭을 AI가 대신하면서, 더 빠르고 더 싸게, 그러나 품질은 올라간다는 방향을 분명히 했습니다." },
      { p: "엔라이브는 이 흐름을 한국 브랜드의 중국 진출, 그리고 해외 셀러·왕홍 매칭에 그대로 이어 봅니다. AI·Agent 기반 매칭이 중국 라이브커머스의 표준이 되어가는 지금, 검증된 창작자 풀과 현장 운영 역량을 함께 갖춘 파트너의 가치는 오히려 커집니다. 엔라이브는 현장에서 확인한 최신 흐름을 자사 매칭·운영에 반영해, 파트너에게 한발 앞선 크로스보더 전략을 제공하겠습니다." },
      { img: "/newsimg/douyin2026-3.jpg", cap: "2026 抖音 창작자 대회 폐막 — ‘热爱所向 万千回响’" },
    ],
  },
];

export default function NewsPage() {
  const { lang } = useLang();
  const chrome = pickLang<{ crumb: string; h1: string; lead: string; empty: string }>(
    {
      ko: { crumb: "NEWS · 소식", h1: "뉴스", lead: "엔라이브의 현장·행사·업데이트 소식을 전합니다.", empty: "등록된 소식이 없습니다." },
      en: { crumb: "NEWS", h1: "News", lead: "Field notes, events and updates from N-LIVE.", empty: "No news yet." },
      zh: { crumb: "NEWS · 动态", h1: "新闻", lead: "N-LIVE 的现场、活动与最新动态。", empty: "暂无动态。" },
      ja: { crumb: "NEWS · お知らせ", h1: "ニュース", lead: "N-LIVE の現場・イベント・アップデート。", empty: "お知らせはありません。" },
    },
    lang
  );
  return (
    <PageEnter variant="iris" color="#135CF2">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">{chrome.crumb}</div>
          <h1>{chrome.h1}</h1>
          <p className="lead">{chrome.lead}</p>
        </div>
      </section>

      <section className="detail-section">
        <div className="container">
          {NEWS.length === 0 && <p className="news-empty">{chrome.empty}</p>}
          {NEWS.map((a, i) => (
            <article className="news-article" key={i}>
              <div className="news-meta"><span className="news-tag">{a.tag}</span><time>{a.date}</time></div>
              <h2 className="news-title">{a.title}</h2>
              <p className="news-lead">{a.lead}</p>
              <figure className="news-cover"><img src={a.cover} alt={a.title} loading="lazy" /></figure>
              <div className="news-body">
                {a.body.map((b, j) =>
                  "p" in b ? (
                    <p key={j}>{b.p}</p>
                  ) : (
                    <figure className="news-fig" key={j}>
                      <img src={b.img} alt={b.cap} loading="lazy" />
                      <figcaption>{b.cap}</figcaption>
                    </figure>
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageEnter>
  );
}
