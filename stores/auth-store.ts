"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  setSession: (session: Session | null) => void
  setLoading: (loading: boolean) => void
  isAdmin: boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      loading: false, // start not-loading; we'll flip true during init

      get isAdmin() {
        const email = get().user?.email
        return (
          !!email &&
          [
            process.env.NEXT_PUBLIC_ADMIN_DEV_EMAIL,
            process.env.NEXT_PUBLIC_ADMIN_WRITER_EMAIL,
          ].includes(email)
        )
      },

      setSession: (session) =>
        set({
          session,
          user: session?.user ?? null,
          loading: false, // whenever we set a session, auth is done loading
        }),

      setLoading: (loading) => set({ loading }),

      signIn: async () => {
        await supabase.auth.signInWithOAuth({
          provider: "github",
          options: { redirectTo: `${window.location.origin}/auth/callback` },
        })
      },

      signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null, session: null, loading: false })
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
        // we don’t persist session or loading
      }),

      onRehydrateStorage: () => (state) => {
        if (!state) return

        state.setLoading(true)

        supabase.auth
          .getSession()
          .then(({ data }) => {
            // will also set loading=false via setSession
            state.setSession(data.session ?? null)
          })
          .catch((err) => {
            console.error("🔴 Error getting Supabase session:", err)
            // fallback so we don't get stuck in loading
            state.setLoading(false)
          })
      },
    }
  )
)
