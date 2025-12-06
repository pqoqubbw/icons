import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  htmlLimitedBots: /.*/,
};

export default nextConfig;
