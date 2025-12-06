import Link from "next/link"
import { MotivationalQuote } from "@/lib/types"
import { getAllMotivationalQuotes } from "@/lib/supabase/quotes"

export default async function AdminQuotesPage() {
  const quotes = await getAllMotivationalQuotes()
  const isLoading = quotes === null
  const noQuotes = !isLoading && quotes.length === 0

  return (
    <div className="pt-28 max-w-5xl mx-auto px-6">
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Manage Quotes</h1>
        <Link
          href="/admin/quotes/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + New Quote
        </Link>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Loading quotes...
          </p>
        </div>
      )}

      {/* No Quotes Fallback */}
      {noQuotes && (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
            No quotes yet
          </p>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Our team is preparing high-quality fitness, nutrition, and wellness
            posts.
            <br />
            <span className="font-medium text-blue-600 dark:text-blue-400">
              New quotes will be published soon!
            </span>
          </p>
        </div>
      )}

      {!isLoading && !noQuotes && (
        <div className="space-y-4">
          {quotes!.map((quote: MotivationalQuote) => (
            <div
              key={quote.id}
              className="p-4 border rounded-lg flex justify-between items-center bg-white dark:bg-neutral-900">
              <div>
                <p className="font-semibold">{quote.text}</p>
                <p className="text-sm text-gray-500">
                  {new Date(quote.created_at!).toLocaleDateString()}
                </p>
              </div>

              <Link
                href={`/admin/quotes/${quote.id}`}
                className="text-blue-600 hover:underline">
                Edit →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
