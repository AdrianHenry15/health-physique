"use client"

import EditAuthorForm from "@/app/(root)/admin/components/author-form/edit-author-form"
import { use } from "react"

export default function EditAuthorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  return <EditAuthorForm authorId={id} />
}
