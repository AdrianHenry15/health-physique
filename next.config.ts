import { withBotId } from "botid/next/config"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "vmbdtonwtzbpsqnfvodp.supabase.co",
      },
    ],
  },
  env: {
    HCAPTCHA_SECRET: process.env.HCAPTCHA_SECRET,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    PRIVATE_EMAILJS_KEY: process.env.PRIVATE_EMAILJS_KEY,
  },
}

export default withBotId(nextConfig)
