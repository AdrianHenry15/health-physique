import { BsQuote } from "react-icons/bs"

const quote =
  "Discipline is choosing what you want most over what you want now."

export default function DailyQuote() {
  return (
    <div className="mt-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black relative overflow-hidden">
      {/* Gradient Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-600/60 via-purple-500/60 to-pink-500/60 dark:from-blue-500/70 dark:via-purple-400/70 dark:to-pink-400/70" />

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8 flex items-start gap-6 animate-fadeIn">
        {/* Icon bubble */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600/10 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300">
          <BsQuote size={22} />
        </div>

        {/* Quote text */}
        <div>
          <p className="text-lg md:text-xl italic leading-relaxed text-gray-800 dark:text-gray-200">
            “{quote}”
          </p>

          <p className="mt-2 text-sm font-medium tracking-wide uppercase text-gray-500 dark:text-gray-400">
            Daily Motivation
          </p>
        </div>
      </div>
    </div>
  )
}
