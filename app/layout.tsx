import Footer from "@/components/footer"
import Navbar from "../components/navbar"
import "./globals.css"

export const metadata = {
  title: "Health Physique",
  description: "Fitness insights, training guides, and healthy living.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
