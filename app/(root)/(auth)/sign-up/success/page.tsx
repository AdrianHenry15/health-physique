"use client"

import Link from "next/link"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { useEffect, useState } from "react"

export default function SignUpSuccess() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dimensions, setDimensions] = useState({ width: 300, height: 600 })

  useEffect(() => {
    function updateSize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div className="fixed inset-0 min-h-screen flex items-center justify-center w-full p-4 bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-blue-950">
      <LazyMotion features={domAnimation}>
        <div className="flex-1 flex flex-col min-w-[90vw] sm:min-w-[400px] max-w-md mx-auto bg-linear-to-br from-white/95 to-white/90 dark:from-neutral-900/95 dark:to-neutral-800/90 rounded-2xl shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_-15px_rgba(0,0,0,0.5)] p-6 sm:p-10 border border-white/20 dark:border-neutral-700/50 backdrop-blur-xl">
          <m.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
            className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-linear-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent drop-shadow">
            Welcome to Alexandria!
          </m.h1>
          <p className="text-sm sm:text-base text-foreground text-center">
            Your account has been created.
          </p>
          <div className="w-full flex justify-center">
            <Link
              href="/sign-in"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-colors shadow-lg text-base sm:text-lg text-center">
              Go to Sign In
            </Link>
          </div>
        </div>
      </LazyMotion>
    </div>
  )
}
