"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"
import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Mail,
} from "lucide-react"

export default function ProfileClient({ user }: { user: User }) {
  const router = useRouter()
  const { signOut } = useAuthStore()

  const [email, setEmail] = useState(user.email ?? "")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null
  )

  const handleUpdateEmail = async () => {
    setMessage(null)
    const { error } = await supabase.auth.updateUser({ email })

    if (error) {
      setMessage({ type: "error", text: error.message })
    } else {
      setMessage({
        type: "success",
        text: "Email updated! Check your inbox to confirm.",
      })
    }
  }

  const handleUpdatePassword = async () => {
    setMessage(null)
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setMessage({ type: "error", text: error.message })
    } else {
      setMessage({
        type: "success",
        text: "Password updated successfully!",
      })
      setPassword("")
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <div className="max-w-xl mx-auto pt-32 pb-20 px-6 space-y-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Your Profile</h1>

      {message && (
        <div
          className={`
            flex items-center gap-2 p-3 rounded-lg border 
            ${
              message.type === "success"
                ? "bg-green-100 dark:bg-green-900/40 border-green-400 text-green-700 dark:text-green-300"
                : "bg-red-100 dark:bg-red-900/40 border-red-400 text-red-700 dark:text-red-300"
            }
          `}>
          {message.type === "success" ? <Check /> : <AlertCircle />}
          <p>{message.text}</p>
        </div>
      )}

      {/* Email Section */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Mail /> Email
        </label>
        <input
          type="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleUpdateEmail}
          className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
          Update Email
        </button>
      </div>

      {/* Password Section */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Lock /> New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 pr-12"
            placeholder="•••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <button
          onClick={handleUpdatePassword}
          className="w-full bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition">
          Update Password
        </button>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 mt-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition">
        <LogOut size={20} /> Sign Out
      </button>
    </div>
  )
}
