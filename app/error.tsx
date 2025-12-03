"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    console.error("🔥 Global App Error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-neutral-900 to-neutral-800 text-white px-6">
      <div className="bg-neutral-800/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center animate-fade-in">
        <h1 className="text-3xl font-bold mb-3">Oops, something broke 😬</h1>
        <p className="text-neutral-300 mb-6">
          The page crashed unexpectedly. You can try again or go back to safety.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full py-2 rounded-lg bg-white text-black font-medium hover:bg-neutral-200 transition">
            🔁 Try Again
          </button>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full py-2 rounded-lg bg-neutral-700 text-white font-medium border border-white/10 hover:bg-neutral-600 transition">
            ⬅️ Go Back
          </button>

          <Link
            href="/"
            prefetch={false}
            className="w-full py-2 rounded-lg bg-neutral-700 text-white font-medium border border-white/10 hover:bg-neutral-600 transition inline-block">
            🏠 Go Home
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="mt-5 text-sm text-neutral-400 hover:text-neutral-200 transition underline">
          {showDetails ? "Hide error details" : "Show technical details"}
        </button>

        {showDetails && (
          <pre className="mt-4 text-left text-xs bg-black/40 p-3 rounded-lg overflow-auto border border-white/10 max-h-40">
            {error?.message || "No error message provided"}
            {error?.digest && `\nDigest: ${error.digest}`}
          </pre>
        )}
      </div>
    </div>
  )
}
