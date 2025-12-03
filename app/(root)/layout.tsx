"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ReactNode } from "react"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
