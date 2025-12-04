"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Author } from "@/lib/types"
import AuthorForm from "./author-form"

export default function EditAuthorForm({ authorId }: { authorId: string }) {
  const [author, setAuthor] = useState<Author | null>(null)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("authors")
        .select("*")
        .eq("id", authorId)
        .single()

      setAuthor(data)
    }
    load()
  }, [authorId])

  if (!author) {
    return (
      <div className="text-center pt-32 text-gray-500">Loading author...</div>
    )
  }

  return <AuthorForm initialData={author} />
}
