"use client"

import ProfileClient from "./components/profile-client"
import { useAuthStore } from "@/stores/auth-store"

export default function ProfilePage() {
  const { user, loading } = useAuthStore()

  if (loading) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-xl text-gray-500">Loading profile…</h1>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-semibold">You must be signed in</h1>
      </div>
    )
  }

  return <ProfileClient user={user} />
}
