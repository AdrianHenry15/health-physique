import ForgotPasswordForm from "@/app/(root)/(auth)/components/forgot-password-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Third Generation Studios - Forgot Password",
    description:
        "Reset your password to regain access to your Third Generation Studios account. Enter your email to receive password reset instructions.",
    robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface ForgotPasswordProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ForgotPasswordPage({ searchParams }: ForgotPasswordProps) {
    const resolvedSearchParams = await searchParams;

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
                <ForgotPasswordForm searchParams={resolvedSearchParams} />
            </Suspense>
        </main>
    );
}
