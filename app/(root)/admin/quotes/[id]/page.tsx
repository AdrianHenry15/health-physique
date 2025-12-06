import { getMotivationalQuoteById } from "@/lib/supabase/quotes"
import { notFound } from "next/navigation"
import QuoteForm from "../components/quote-form"

export default async function EditQuotePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const quote = await getMotivationalQuoteById(id)

  if (!quote) {
    notFound()
  }

  return <QuoteForm initialData={quote} isEditing />
}
