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
      { source: "/erp-2a453c", destination: "/erp-2a453c/index.html" },
      { source: "/erp-2a453c/", destination: "/erp-2a453c/index.html" },
    ];
  },
  // ERP는 단일 HTML — 배포 즉시 최신이 오도록 매번 재검증(캐시된 옛 버전 방지)
  async headers() {
    return [
      { source: "/erp-2a453c", headers: [{ key: "Cache-Control", value: "no-cache, must-revalidate" }] },
      { source: "/erp-2a453c/", headers: [{ key: "Cache-Control", value: "no-cache, must-revalidate" }] },
      { source: "/erp-2a453c/:path*", headers: [{ key: "Cache-Control", value: "no-cache, must-revalidate" }] },
    ];
  },
};
export default nextConfig;
