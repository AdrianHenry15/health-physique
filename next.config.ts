import { withBotId } from "botid/next/config"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
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
    PRIVATE_EMAILJS_KEY: process.env.PRIVATE_EMAILJS_KEY,
  },
}

export default withBotId(nextConfig)
