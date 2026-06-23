/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' 제거 — 서버 검증 API(/api/*) 사용 위해 Vercel 서버모드로 전환
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
