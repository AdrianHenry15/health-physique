/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getMotivationalQuoteById } from "@/lib/supabase/quotes"

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await params
  const quote = await getMotivationalQuoteById(id)

  if (!quote) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json({ quote }, { status: 200 })
}

/* -------------------------
 * UPDATE QUOTE (PATCH)
 * ------------------------*/
export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await params
  const supabase = await createClient()

  try {
    const body = await req.json()
    const { text } = body ?? {}

    const payload: Record<string, unknown> = {}

    if (typeof text === "string") payload.text = text

    if (Object.keys(payload).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided for update." },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("motivational_quotes")
      .update(payload)
      .eq("id", id)
      .select("*")
      .single()

    if (error) {
      console.error("Update motivational quote error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ quote: data }, { status: 200 })
  } catch (err: any) {
    console.error("Unexpected update quote error:", err)
    return NextResponse.json(
      { error: "Unexpected error updating quote." },
      { status: 500 }
    )
  }
}

/* -------------------------
 * DELETE QUOTE
 * ------------------------*/
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await params
  const supabase = await createClient()

  try {
    const { error } = await supabase
      .from("motivational_quotes")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Delete motivational quote error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err: any) {
    console.error("Unexpected delete quote error:", err)
    return NextResponse.json(
      { error: "Unexpected error deleting quote." },
      { status: 500 }
    )
  }
}
