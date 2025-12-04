"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { Author } from "@/lib/types"
import type { User } from "@supabase/supabase-js"

export default function NewAuthorPage() {
  const [authors, setAuthors] = useState<Author[] | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const isLoading = authors === null
  const noAuthors = authors?.length === 0

  // Load current user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  // Load authors
  useEffect(() => {
    const loadAuthors = async () => {
      const { data } = await supabase.from("authors").select("*")
      setAuthors(data || [])
    }
    loadAuthors()
  }, [])

  return (
    <div className="p-10 pt-24 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Authors</h1>

        {user && (
          <Link
            href="/admin/authors/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            + New Author
          </Link>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Loading authors...
          </p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && noAuthors && (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
            No authors yet
          </p>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Create your first author to begin attributing posts.
          </p>
        </div>
      )}

      {/* Author List */}
      {!isLoading && !noAuthors && (
        <div className="space-y-4">
          {authors!.map((a) => (
            <div
              key={a.id}
              className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-xl">{a.name}</p>
              </div>

              <Link
                href={`/admin/authors/${a.id}`}
                className="text-blue-600 font-medium hover:underline">
                Edit →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
