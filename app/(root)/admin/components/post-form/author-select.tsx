import { Author } from "@/lib/types"
import { useRouter } from "next/navigation"

interface IAuthorSelectProps {
  authorId: string
  setAuthorId: (id: string) => void
  authors: Partial<Author>[]
}

const AuthorSelect = ({
  authorId,
  setAuthorId,
  authors,
}: IAuthorSelectProps) => {
  const router = useRouter()
  return (
    <div className="space-y-2">
      <label className="font-semibold text-base sm:text-lg">Author</label>

      {/* 🟦 No authors -> Show redirect UI */}
      {authors.length === 0 ? (
        <div
          onClick={() => router.push("/admin/authors/new")}
          className="w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer text-center text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
          No authors yet — click to create one →
        </div>
      ) : (
        /* 🟩 Authors exist -> Show normal dropdown */
        <select
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          className="w-full px-3 py-3 rounded-lg border bg-white dark:bg-neutral-900">
          <option value="">Select an Author</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default AuthorSelect
