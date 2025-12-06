/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAllMotivationalQuotes } from "@/lib/supabase/quotes"

export async function GET() {
  const quotes = await getAllMotivationalQuotes()
  return NextResponse.json({ quotes }, { status: 200 })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  try {
    const body = await req.json()
    const { text } = body ?? {}

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Quote text is required." },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("motivational_quotes")
      .insert({
        text,
      })
      .select("*")
      .single()

    if (error) {
      console.error("Create motivational quote error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ quote: data }, { status: 201 })
  } catch (err: any) {
    console.error("Unexpected create quote error:", err)
    return NextResponse.json(
      { error: "Unexpected error creating quote." },
      { status: 500 }
    )
  }
}
