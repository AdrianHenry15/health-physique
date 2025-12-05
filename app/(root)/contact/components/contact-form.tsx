"use client"

import { useState, FormEvent } from "react"
import emailjs from "@emailjs/browser"
import toast from "react-hot-toast"
import Image from "next/image"

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID! as string
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID! as string
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! as string

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comment: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!form.firstName || !form.lastName || !form.email || !form.comment) {
      toast.error("Please fill in all required fields.")
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS env vars are missing")
      toast.error("Email service not configured.")
      return
    }

    setLoading(true)
    const loadingToast = toast.loading("Sending message...")

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          comment: form.comment,
        },
        PUBLIC_KEY
      )

      toast.success("Message sent! I'll get back to you soon.", {
        id: loadingToast,
      })

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        comment: "",
      })
    } catch (err) {
      console.error("EmailJS error:", err)
      toast.error("Failed to send message. Please try again.", {
        id: loadingToast,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mt-24 max-w-2xl mx-auto space-y-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
      <span className="flex items-center justify-center w-full">
        <Image
          className="w-18"
          src="/hplogo.png"
          alt="Contact"
          width={400}
          height={200}
        />
      </span>
      <h2 className="text-2xl font-bold tracking-tight mb-2">Contact Me</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        Have a question about training, nutrition, or coaching? Send a message
        and I’ll respond as soon as I can.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Phone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">
          Comment <span className="text-red-500">*</span>
        </label>
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer">
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}
