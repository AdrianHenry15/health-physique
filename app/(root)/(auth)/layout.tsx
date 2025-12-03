import { type Metadata } from "next"

// --- SEO METADATA FOR AUTH PAGES ---
export const metadata: Metadata = {
  title: {
    template: "Health Physique",
    default: "Health Physique — Fitness Blog",
  },
  description:
    "Login or create an account with Health Physique to access exclusive fitness content, personalized insights, and premium training resources.",
  keywords: [
    "health physique",
    "fitness blog",
    "login",
    "sign up",
    "strength training",
    "nutrition",
    "workouts",
    "exercise",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Health Physique — Login",
    description:
      "Access your Health Physique account for training insights, nutrition guidance, and wellness resources.",
    type: "website",
    siteName: "Health Physique",
  },
  twitter: {
    card: "summary",
    title: "Health Physique — Login",
    description:
      "Sign in or create an account to unlock personalized fitness tools and exclusive content.",
  },
}

// --- TYPES ---
interface AuthLayoutProps {
  children: React.ReactNode
}

// Async component cannot be wrapped with memo. Use a plain component.
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50/80 via-white to-purple-100/80 dark:from-neutral-900 dark:via-black dark:to-purple-950/30">
      {/* MAIN AUTH CONTENT */}
      <main
        className="flex-1 flex flex-col items-center justify-center w-full px-4 py-8"
        role="main"
        aria-label="Authentication Content">
        {children}
      </main>

      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Health Physique — Account",
            url: "https://healthphysique.com/auth",
            publisher: {
              "@type": "Organization",
              name: "Health Physique",
              url: "https://healthphysique.com",
            },
            potentialAction: [
              {
                "@type": "LoginAction",
                target: "https://healthphysique.com/login",
                name: "Login",
              },
              {
                "@type": "RegisterAction",
                target: "https://healthphysique.com/signup",
                name: "Sign Up",
              },
            ],
          }),
        }}
      />
    </div>
  )
}
