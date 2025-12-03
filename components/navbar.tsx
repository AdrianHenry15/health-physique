"use client"

import Link from "next/link"
import { useState } from "react"
import MobileMenu from "./mobile-menu"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/70 backdrop-blur-md shadow-sm dark:shadow-none transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white hover:opacity-80 transition-opacity">
          Health Physique
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 text-sm font-medium">
          {["Home", "Blog", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Open Menu"
          className="md:hidden flex flex-col gap-[5px] hover:opacity-80 transition-opacity">
          <span className="w-6 h-0.5 bg-gray-900 dark:bg-gray-200"></span>
          <span className="w-6 h-0.5 bg-gray-900 dark:bg-gray-200"></span>
          <span className="w-6 h-0.5 bg-gray-900 dark:bg-gray-200"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu open={open} setOpen={setOpen} />
    </nav>
  )
}
