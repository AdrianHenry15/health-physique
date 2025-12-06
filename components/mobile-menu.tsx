"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

export default function MobileMenu({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (v: boolean) => void
}) {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()

  /* 🔹 Close on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => document.removeEventListener("click", handleClickOutside)
  }, [open, setOpen])

  /* 🔹 Close menu when route changes */
  useEffect(() => {
    setOpen(false)
  }, [pathname, setOpen])
  return (
    <div
      ref={menuRef}
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
      </div>
    </div>
  )
}
