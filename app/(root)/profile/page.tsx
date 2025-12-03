"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import ProfileClient from "./components/profile-client"
import { User } from "@supabase/supabase-js"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }

    loadUser()

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser()
    })

    return () => listener.subscription.unsubscribe()
  }, [])

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
