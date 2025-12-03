import { ArrowUpRight, InfoIcon } from "lucide-react"
import Link from "next/link"
import { memo } from "react"

// Memoized SmtpMessage component for build optimization
export const SmtpMessage = memo(() => {
  return (
    <aside
      className="bg-neutral-50/80 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 px-5 py-3 rounded-md flex gap-4 backdrop-blur-sm shadow-sm"
      role="complementary"
      aria-label="SMTP configuration information">
      <InfoIcon
        size={16}
        className="mt-0.5 text-blue-600 dark:text-blue-400 shrink-0"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-1">
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          <strong className="font-semibold">Note:</strong> Emails are rate
          limited. Enable Custom SMTP to increase the rate limit.
        </p>
        <div>
          <Link
            href="https://supabase.com/docs/guides/auth/auth-smtp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center text-sm gap-1 transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-sm"
            aria-label="Learn more about SMTP configuration (opens in new tab)">
            Learn more <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  )
})

// Display name for dev tools
SmtpMessage.displayName = "SmtpMessage"
