"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"

export default function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { user, isAdmin, loading } = useAuthStore()

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.replace("/sign-in")
      return
    }

    if (!isAdmin) {
      router.replace("/")
      return
    }
  }, [loading, user, isAdmin, router])

  // Still loading auth state → show loader
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-6 h-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  // Non-admin or not logged in — guard is redirecting
  if (!user || !isAdmin) return null

  // Authenticated admin → show page
  return <>{children}</>
}
