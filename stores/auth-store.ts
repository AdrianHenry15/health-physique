"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"

interface AuthState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,

      setUser: (user) => set({ user }),

      // OAuth sign-in (GitHub or Google or whatever you pick)
      signIn: async () => {
        await supabase.auth.signInWithOAuth({
          provider: "github",
          options: { redirectTo: `${location.origin}/auth/callback` },
        })
      },

      signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null })
      },
    }),
    {
      name: "hp-auth-storage", // HEALTH PHYSIQUE name
      partialize: (state) => ({
        // Persist only minimal safe data
        user: state.user
          ? {
              id: state.user.id,
              email: state.user.email,
            }
          : null,
      }),
    }
  )
)

// AUTO-SYNC SUPABASE AUTH STATE --------------------------------
// This runs once per app load (client-side)
supabase.auth.onAuthStateChange((event, session) => {
  const setUser = useAuthStore.getState().setUser

  if (session?.user) {
    setUser(session.user)
  } else {
    setUser(null)
  }
})
