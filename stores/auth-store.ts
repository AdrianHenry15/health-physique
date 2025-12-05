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
  // derived
  isAdmin: boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      loading: true,
      get isAdmin() {
        const email = get().user?.email
        return (
          !!email && [process.env.NEXT_PUBLIC_ADMIN_EMAIL_1].includes(email)
        )
      },
      setSession: (session) =>
        set({
          session,
          user: session?.user ?? null,
          loading: false,
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
        set({ user: null, session: null })
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
      }),

      // ⚠️ Correct Zustand persist rehydration handler
      onRehydrateStorage: () => (state) => {
        if (!state) return
        state.setLoading(true)

        // After hydration, sync Supabase session
        supabase.auth.getSession().then(({ data }) => {
          state.setSession(data.session ?? null)
        })
      },
    }
  )
)
