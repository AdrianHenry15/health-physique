/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const type = searchParams.get("type")
  const token_hash = searchParams.get("token_hash")
  const code = searchParams.get("code")

  const supabase = await createClient()

  try {
    // 🔹 1. EMAIL CONFIRMATION (SIGNUP)
    if (type === "signup" && token_hash) {
      const { error } = await supabase.auth.verifyOtp({
        type: "signup",
        token_hash,
      })

      if (error) {
        return NextResponse.redirect(
          `${origin}/auth/auth-code-error?error=${encodeURIComponent(
            error.message
          )}`
        )
      }

      // 🎉 SUCCESS → Go to success page
      return NextResponse.redirect(`${origin}/sign-up/success`)
    }

    // 🔹 2. PASSWORD RECOVERY
    if (type === "recovery" && token_hash) {
      const { error } = await supabase.auth.verifyOtp({
        type: "recovery",
        token_hash,
      })

      if (error) {
        return NextResponse.redirect(
          `${origin}/auth/auth-code-error?error=${encodeURIComponent(
            error.message
          )}`
        )
      }

      // Persist the token in a temporary cookie for reset page
      const response = NextResponse.redirect(`${origin}/reset-password`)
      response.cookies.set("recovery_token", token_hash, {
        httpOnly: true,
        sameSite: "lax",
        path: "/reset-password",
        maxAge: 60 * 5, // 5 minutes
      })

      return response
    }

    // 🔹 Handle OAuth / magic link login
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error("Exchange code error:", error.message)
        return NextResponse.redirect(
          `${origin}/auth/auth-code-error?error=${encodeURIComponent(
            error.message
          )}`
        )
      }

      // Redirect to home page after login
      return NextResponse.redirect(`${origin}/`)
    }

    // Fallback if no valid params
    return NextResponse.redirect(
      `${origin}/auth/auth-code-error?error=missing_params`
    )
  } catch (err: any) {
    console.error("Unexpected callback error:", err)
    return NextResponse.redirect(
      `${origin}/auth/auth-code-error?error=${encodeURIComponent(
        err.message || "unexpected_error"
      )}`
    )
  }
}
