"use client"

import Link from "next/link"
import { useState } from "react"
import MobileMenu from "./mobile-menu"
import UserIcon from "@/app/(root)/components/user-icon"

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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          {["Home", "Blog", "About", "Contact", "Admin"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              {item}
            </Link>
          ))}

          {/* User Icon always on far right */}
          <UserIcon />
        </div>

        {/* Mobile Right Side: User Icon + Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          {/* User */}
          <UserIcon />

          {/* Hamburger Menu */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Open Menu"
            className="flex flex-col cursor-pointer gap-[5px] hover:opacity-80 transition-opacity">
            <span className="w-6 h-0.5 bg-gray-900 dark:bg-gray-200"></span>
            <span className="w-6 h-0.5 bg-gray-900 dark:bg-gray-200"></span>
            <span className="w-6 h-0.5 bg-gray-900 dark:bg-gray-200"></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <MobileMenu open={open} setOpen={setOpen} />
    </nav>
  )
}
