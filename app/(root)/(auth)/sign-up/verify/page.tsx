"use client"

import Link from "next/link"
import { m, LazyMotion, domAnimation } from "framer-motion"

export default function SignUpVerify() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full">
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col h-full items-center bg-linear-to-br from-white/95 to-white/90 dark:from-neutral-900/95 dark:to-neutral-800/90 rounded-2xl shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_-15px_rgba(0,0,0,0.5)] p-8 sm:p-12 border border-white/20 dark:border-neutral-700/50 backdrop-blur-xl max-w-lg mx-auto mt-10 mb-10 w-full">
          <m.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
            className="text-3xl sm:text-4xl font-bold text-center mb-4 bg-linear-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent drop-shadow">
            Verify your email
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-lg sm:text-xl text-center text-neutral-700 dark:text-neutral-200 mb-6">
            We just sent you a verification link.{" "}
            <span className="text-blue-500">Please check your inbox</span> and
            follow the link to confirm your account.
          </m.p>
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="w-full flex justify-center">
            <Link
              href="/sign-in"
              className="px-8 py-3 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg text-base sm:text-lg w-full sm:w-auto text-center">
              Go to Sign In
            </Link>
          </m.div>
        </m.div>
      </LazyMotion>
    </div>
  )
}
