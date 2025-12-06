"use client"

import { ReactNode, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"

type AdminGuardProps = {
  children: ReactNode
}

/**
 * AdminGuard
 * - If auth is still loading: show a simple loading state
 * - If no user: send to sign-in with redirect back to this page
 * - If user but not admin: send to home (or wherever)
 * - If admin: render children
 */
export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAdmin, loading } = useAuthStore()

  useEffect(() => {
    if (loading) return

    // Not logged in → go to sign in
    if (!user) {
      router.replace(`/sign-in?redirect_url=${encodeURIComponent(pathname)}`)
      return
    }

    // Logged in but not admin → send home
    if (!isAdmin) {
      router.replace("/")
      return
    }
  }, [user, isAdmin, loading, pathname, router])

  // While we decide what to do
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  // If not allowed, we’re redirecting, so render nothing
  if (!user || !isAdmin) {
    return null
  }

  // ✅ Admin allowed
  return <>{children}</>
}
