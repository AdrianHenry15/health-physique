/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect, memo, useCallback, useRef } from "react"

import HCaptcha from "@hcaptcha/react-hcaptcha"
import { forgotPasswordAction } from "@/app/actions"
import Link from "next/link"
import { ArrowLeft, CheckCircle, AlertCircle, Mail } from "lucide-react"
import { Label } from "../../../../components/ui/label"
import { Input } from "../../../../components/ui/input"
import { SubmitButton } from "../../../../components/submit-button"
import { useHCaptchaStore } from "@/stores/hcaptcha-store"

// Email validation regex - moved outside to prevent recreation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ForgotPasswordFormProps {
  searchParams: { success?: string; error?: string }
}

// Memoized ForgotPasswordForm component for build optimization
const ForgotPasswordForm = memo(({ searchParams }: ForgotPasswordFormProps) => {
  const { token: hcaptchaToken, setToken } = useHCaptchaStore()
  const [showToast, setShowToast] = useState(false)
  const [email, setEmail] = useState("")
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // hCaptcha ref for resetting
  const hcaptchaRef = useRef<HCaptcha>(null)

  // Memoized hCaptcha verification handler
  const handleCaptchaVerify = useCallback(
    (token: string) => {
      setToken(token)
      setFormError(null) // Clear any captcha-related errors
    },
    [setToken]
  )

  // Memoized hCaptcha expiry handler
  const handleCaptchaExpire = useCallback(() => {
    setToken("")
    setFormError("Captcha expired. Please verify again.")
  }, [setToken])

  // Memoized hCaptcha error handler
  const handleCaptchaError = useCallback(
    (error: string) => {
      setToken("")
      setFormError("Captcha verification failed. Please try again.")
      console.error("hCaptcha error:", error)
    },
    [setToken]
  )

  // Handle URL success/error parameters and check recent reset requests
  useEffect(() => {
    const checkRecentReset = async () => {
      if (searchParams?.success && searchParams.success.length > 0) {
        setSuccessMessage(searchParams.success)
        setShowToast(true)
        const timer = setTimeout(() => setShowToast(false), 5000)
        return () => clearTimeout(timer)
      }

      // Check localStorage for recent reset attempts
      const recentEmail = localStorage.getItem("reset-email")
      const resetTimestamp = localStorage.getItem("reset-timestamp")

      if (recentEmail && resetTimestamp) {
        const timeDiff = Date.now() - parseInt(resetTimestamp)
        const fiveMinutes = 5 * 60 * 1000 // 5 minutes in milliseconds

        if (timeDiff < fiveMinutes) {
          setSuccessMessage(
            `We recently sent a password reset link to ${recentEmail}. Please check your inbox and spam folder.`
          )
          setShowToast(true)
          setEmail(recentEmail)

          const timer = setTimeout(() => setShowToast(false), 8000)
          return () => clearTimeout(timer)
        } else {
          // Clean up old entries
          localStorage.removeItem("reset-email")
          localStorage.removeItem("reset-timestamp")
        }
      }

      // Fallback: Check URL for email parameter (useful for cross-device scenarios)
      if (!recentEmail) {
        const urlEmail = new URLSearchParams(window.location.search).get(
          "email"
        )
        if (urlEmail) {
          // If there's an email in the URL, prefill the form and show a helpful message
          setEmail(urlEmail)
          setSuccessMessage(
            "If you recently requested a password reset for this email, please check your inbox and spam folder."
          )
        }
      }
    }

    checkRecentReset()
  }, [searchParams])

  // Handle button click (separate from form submit)
  const handleButtonClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      setFormError(null)
      setSuccessMessage(null)

      // Client-side validation
      if (!email.trim()) {
        setFormError("Please enter your email address.")
        return
      }

      if (!EMAIL_REGEX.test(email.trim())) {
        setFormError("Please enter a valid email address.")
        return
      }

      if (!hcaptchaToken) {
        setFormError("Please complete the captcha verification.")
        return
      }

      setIsSubmitting(true)

      try {
        const formData = new FormData()
        formData.append("email", email.trim())
        formData.append("hcaptcha_token", hcaptchaToken)

        const result = await forgotPasswordAction(formData)

        // Always show success message for security reasons
        const secureSuccessMessage =
          "If an account with this email exists, we've sent you a password reset link. Please check your inbox and spam folder."

        if (result?.error) {
          // Handle specific server errors but still show generic message for most cases
          if (result.error.toLowerCase().includes("rate limit")) {
            setFormError(
              "Too many reset attempts. Please wait 5 minutes before trying again."
            )
            setToken("")
            hcaptchaRef.current?.resetCaptcha()
            return
          } else if (result.error.toLowerCase().includes("captcha")) {
            setFormError("Captcha verification failed. Please try again.")
            setToken("")
            hcaptchaRef.current?.resetCaptcha()
            return
          } else {
            // For security, show success message even on errors (unless rate limited)
            setSuccessMessage(secureSuccessMessage)
            setShowToast(true)
            setEmail("")
            setToken("")
            hcaptchaRef.current?.resetCaptcha()
          }
        } else {
          // Success case - store in localStorage for refresh fallback
          localStorage.setItem("reset-email", email.trim())
          localStorage.setItem("reset-timestamp", Date.now().toString())

          setSuccessMessage(secureSuccessMessage)
          setShowToast(true)
          setEmail("")
          setToken("")
          hcaptchaRef.current?.resetCaptcha()
        }
      } catch (err: any) {
        console.error("Forgot password error:", err)

        // For security reasons, show success message even on network errors
        // Only show actual error for specific network issues
        if (err.name === "TypeError" && err.message.includes("fetch")) {
          setFormError(
            "Network error. Please check your connection and try again."
          )
          setToken("")
          hcaptchaRef.current?.resetCaptcha()
        } else {
          // Show success message for security
          const secureSuccessMessage =
            "If an account with this email exists, we've sent you a password reset link. Please check your inbox and spam folder."
          setSuccessMessage(secureSuccessMessage)
          setShowToast(true)
          setEmail("")
          setToken("")
          hcaptchaRef.current?.resetCaptcha()
        }
      } finally {
        setIsSubmitting(false)
      }
    },
    [email, hcaptchaToken, setToken]
  )

  return (
    <>
      {/* Modern toast notification - concise and responsive */}
      {showToast && successMessage && (
        <div className="fixed top-4 left-4 right-4 sm:top-6 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 bg-green-600 dark:bg-green-500 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-lg sm:rounded-xl shadow-xl z-50 text-sm sm:text-base flex items-center gap-3 backdrop-blur-sm border border-green-500/20 sm:max-w-md animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle size={18} className="shrink-0" />
          <span className="font-medium">Password reset link sent!</span>
        </div>
      )}

      <section
        className="flex items-center justify-center w-full py-8 px-4"
        aria-label="Forgot password form"
        itemScope
        itemType="https://schema.org/WebPage">
        <form
          className="flex-1 flex flex-col min-w-[90vw] sm:min-w-[400px] max-w-md mx-auto bg-linear-to-br from-white/95 to-white/90 dark:from-neutral-900/95 dark:to-neutral-800/90 rounded-2xl shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_-15px_rgba(0,0,0,0.5)] p-6 sm:p-10 border border-white/20 dark:border-neutral-700/50 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500"
          noValidate
          itemScope
          itemType="https://schema.org/ContactForm">
          {/* Header with improved typography */}
          <header className="mb-6">
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 mb-4 group">
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Sign In
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3 bg-linear-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-200 bg-clip-text text-transparent drop-shadow">
              Forgot Password
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 text-center leading-relaxed">
              Enter your email address and we'll send you a secure link to reset
              your password.
            </p>
          </header>

          {/* Error message display with enhanced styling */}
          {formError && (
            <div
              className="text-red-600 dark:text-red-400 text-sm text-center mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800/50 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300"
              role="alert">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span className="text-left">{formError}</span>
            </div>
          )}

          {/* Success message display with enhanced styling */}
          {successMessage && !showToast && (
            <div
              className="text-green-600 dark:text-green-400 text-sm text-center mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/50 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300"
              role="alert">
              <Mail size={18} className="shrink-0 mt-0.5 text-green-500" />
              <div className="text-left">
                <p className="font-medium mb-1">Reset Link Sent!</p>
                <p className="text-xs opacity-90">{successMessage}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-5">
            {/* Email field with enhanced styling */}
            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
              <Label
                htmlFor="email"
                className="text-base sm:text-lg font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                Email Address
              </Label>
              <Input
                autoComplete="email"
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:ring-2 focus:ring-green-500/50 text-base sm:text-lg px-4 py-3 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm transition-all hover:border-green-300 dark:hover:border-green-600 focus:border-green-400 dark:focus:border-green-500"
                aria-describedby="email-help"
              />
              <div
                id="email-help"
                className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 flex items-center gap-2">
                <Mail size={14} />
                We'll send a secure reset link to this email address
              </div>
            </div>

            {/* hCaptcha verification with improved styling */}
            <div className="flex justify-center animate-in fade-in slide-in-from-left-2 duration-300 delay-100">
              <div className="rounded-xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-700/50">
                <HCaptcha
                  ref={hcaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                  onVerify={handleCaptchaVerify}
                  onExpire={handleCaptchaExpire}
                  onError={handleCaptchaError}
                  theme="light"
                  size="normal"
                  reCaptchaCompat={false}
                />
              </div>
            </div>

            {/* Submit button with enhanced styling */}
            <div className="mt-4 animate-in fade-in slide-in-from-left-2 duration-300 delay-200">
              <SubmitButton
                type="button"
                onClick={handleButtonClick}
                pendingText="Sending Reset Link..."
                disabled={!hcaptchaToken || isSubmitting}
                className="w-full bg-linear-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 dark:from-green-500 dark:to-green-400 dark:hover:from-green-600 dark:hover:to-green-500 disabled:from-neutral-400 disabled:to-neutral-400 disabled:cursor-not-allowed disabled:hover:scale-100 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25 dark:shadow-green-400/25 text-base sm:text-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                <Mail size={18} />
                Send Reset Link
              </SubmitButton>
            </div>

            {/* Additional help links with improved styling */}
            <div className="text-center pt-4 space-y-2 animate-in fade-in slide-in-from-left-2 duration-300 delay-300">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Remember your password?{" "}
                <Link
                  href="/sign-in"
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline font-medium transition-colors duration-200">
                  Sign in
                </Link>
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline font-medium transition-colors duration-200">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </form>
      </section>
    </>
  )
})

// Display name for dev tools
ForgotPasswordForm.displayName = "ForgotPasswordForm"

export default ForgotPasswordForm
