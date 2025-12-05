"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"

const ADMIN_EMAILS = [
  process.env.NEXT_PUBLIC_ADMIN_DEV_EMAIL,
  process.env.NEXT_PUBLIC_ADMIN_WRITER_EMAIL,
].filter(Boolean) as string[] // remove undefined/null

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  isAdmin: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  setSession: (session: Session | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: false,
      isAdmin: false,

      setSession: (session) => {
        const user = session?.user ?? null
        const email = user?.email ?? ""
        const isAdmin = !!email && ADMIN_EMAILS.includes(email)

        set({
          session,
          user,
          loading: false,
          isAdmin,
        })
      },

      setLoading: (loading) => set({ loading }),

      signIn: async () => {
        await supabase.auth.signInWithOAuth({
          provider: "github",
          options: { redirectTo: `${window.location.origin}/auth/callback` },
        })
      },

      signOut: async () => {
        await supabase.auth.signOut()
        set({
          user: null,
          session: null,
          loading: false,
          isAdmin: false,
        })
      },
    }),
    {
      name: "auth-storage",

      partialize: (state) => ({
        user: state.user
          ? {
              id: state.user.id,
              email: state.user.email,
            }
          : null,
        // we do NOT persist session/loading/isAdmin
      }),

      onRehydrateStorage: () => (state) => {
        if (!state) return

        state.setLoading(true)

        supabase.auth
          .getSession()
          .then(({ data }) => {
            state.setSession(data.session ?? null)
          })
          .catch((err) => {
            console.error("🔴 Error getting Supabase session:", err)
            state.setLoading(false)
          })
      },
    }
  )
)
