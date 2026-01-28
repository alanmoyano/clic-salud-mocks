import "@/lib/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dev",
        destination: "/?entorno=dev",
        permanent: false,
      },
      {
        source: "/test",
        destination: "/?entorno=test",
        permanent: false,
      },
      {
        source: "/demo",
        destination: "/?entorno=demo",
        permanent: false,
      },
      {
        source: "/staging",
        destination: "/?entorno=staging",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
