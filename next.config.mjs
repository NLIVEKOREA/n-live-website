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
    ];
  },
};
export default nextConfig;
