"use client"

import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white px-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404 | Page Not Found</h1>
        <p className="text-neutral-400">{`The page you're looking for doesn't exist or may have been moved.`}</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.back()}
            className="w-full py-2 rounded-lg bg-neutral-700 text-white font-medium border border-white/10 hover:bg-neutral-600 transition">
            ⬅️ Go Back
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full py-2 rounded-lg bg-white text-black font-medium hover:bg-neutral-200 transition">
            🏠 Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
