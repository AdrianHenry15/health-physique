"use client"

import Link from "next/link"

export default function MobileMenu({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (v: boolean) => void
}) {
  return (
    <div
      className={`md:hidden overflow-hidden transition-all duration-300 ${
        open ? "max-h-48" : "max-h-0"
      }`}>
      <div className="flex flex-col px-6 pb-4 gap-3 text-sm font-medium">
        <Link href="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link href="/blog" onClick={() => setOpen(false)}>
          Blog
        </Link>
        <Link href="/about" onClick={() => setOpen(false)}>
          About
        </Link>
        <Link href="/contact" onClick={() => setOpen(false)}>
          Contact
        </Link>
        <Link href="/admin" onClick={() => setOpen(false)}>
          Admin
        </Link>
      </div>
    </div>
  )
}
