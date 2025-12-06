"use server"

import { createClient } from "@/lib/supabase/server"
import { MotivationalQuote } from "../types"

/* -----------------------------------------
 * GET ALL MOTIVATIONAL QUOTES
 * ----------------------------------------*/
export async function getAllMotivationalQuotes() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("motivational_quotes")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching motivational quotes:", error)
    return [] as MotivationalQuote[]
  }

  return (data ?? []) as MotivationalQuote[]
}

/* -----------------------------------------
 * GET ONE QUOTE BY ID
 * ----------------------------------------*/
export async function getMotivationalQuoteById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("motivational_quotes")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching motivational quote by id:", error)
    return null
  }

  return data as MotivationalQuote | null
}
