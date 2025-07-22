import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    clientSegmentCache: true,
    devtoolSegmentExplorer: true,
    turbopackPersistentCaching: true,
  },
}

export default nextConfig
