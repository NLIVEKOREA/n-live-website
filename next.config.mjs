/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' 제거 — 서버 검증 API(/api/*) 사용 위해 Vercel 서버모드로 전환
  images: { unoptimized: true },
  trailingSlash: true,
  // 정적 HTML(public/matching-pool.html)을 /matching-pool/ 경로로 서빙 (export 해제 후 매핑 복구)
  async rewrites() {
    return [
      { source: "/matching-pool", destination: "/matching-pool.html" },
      { source: "/matching-pool/", destination: "/matching-pool.html" },
      { source: "/shop-privacy", destination: "/privacy.html" },
      { source: "/shop-privacy/", destination: "/privacy.html" },
      { source: "/signup", destination: "/signup.html" },
      { source: "/signup/", destination: "/signup.html" },
      { source: "/chi", destination: "/chi-admin.html" },
      { source: "/chi/", destination: "/chi-admin.html" },
      { source: "/phone", destination: "/phone.html" },
      { source: "/phone/", destination: "/phone.html" },
      { source: "/erp-2a453c", destination: "/erp-2a453c/index.html" },
      { source: "/erp-2a453c/", destination: "/erp-2a453c/index.html" },
      { source: "/erp", destination: "/erp-2a453c/index.html" },
      { source: "/erp/", destination: "/erp-2a453c/index.html" },
      /* ⚠️ /shop/:seller 는 여기서 더 이상 띄우지 않는다. 아래 redirects() 로 옮겼다.
         이유는 redirects() 주석 참고. public/shop.html 은 옛 사본이라 절대 서빙하면 안 된다. */
    ];
  },
  /* ══════════════════════════════════════════════════════════════
     🔴 2026-08-15 사장님: "n-live.co.kr/shop/yeonsi 로 넘어가는 사람이 있는데
                            자동으로 최신 shop 으로 보낼 방법 있냐"

     확인해보니 그냥 옛 화면이 아니라 **옛 DB를 보고 있었다.**
       public/shop.html (2026-07-18 사본) → qikvvqgxmquevzyykkcm.supabase.co (구 ERP)
       지금 쓰는 곳                        → nyjobazeuceburedtpzs.supabase.co (라방ERP)
     즉 이 주소로 들어온 손님이 주문하면 **지금 ERP 에 안 들어온다.** 주문이 통째로 샌다.

     → rewrite(주소 그대로 옛 화면) 를 걷어내고 **redirect(진짜 이동)** 로 바꾼다.
       308(영구)이라 카톡·인스타에 박제된 옛 링크도 앞으로 계속 새 주소로 간다.
       /link/:seller 도 같이 넘긴다(인스타 프로필용 링크트리).
     ══════════════════════════════════════════════════════════════ */
  async redirects() {
    const SHOP = "https://nlive.labangerp.com";
    return [
      { source: "/shop/:seller", destination: `${SHOP}/shop/:seller`, permanent: true },
      { source: "/shop/:seller/", destination: `${SHOP}/shop/:seller`, permanent: true },
      { source: "/link/:seller", destination: `${SHOP}/link/:seller`, permanent: true },
      { source: "/link/:seller/", destination: `${SHOP}/link/:seller`, permanent: true },
    ];
  },
  // ERP는 단일 HTML — 배포 즉시 최신이 오도록 매번 재검증(캐시된 옛 버전 방지)
  async headers() {
    // 간단하고 안전한 보안 헤더: 클릭재킹·MIME스니핑·리퍼러(주소)유출 방지
    const sec = [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "no-referrer" },
    ];
    const noCache = { key: "Cache-Control", value: "no-cache, must-revalidate" };
    return [
      { source: "/erp-2a453c", headers: [noCache, ...sec] },
      { source: "/erp-2a453c/", headers: [noCache, ...sec] },
      { source: "/erp-2a453c/:path*", headers: [noCache, ...sec] },
      { source: "/erp", headers: [noCache, ...sec] },
      { source: "/erp/", headers: [noCache, ...sec] },
      { source: "/shop.html", headers: [noCache, ...sec] },
      { source: "/shop/:seller*", headers: [noCache, ...sec] },
    ];
  },
};
export default nextConfig;
