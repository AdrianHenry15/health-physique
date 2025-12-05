import "./globals.css"
import { Nunito } from "next/font/google"
import { Suspense } from "react"
import { ThemeProvider } from "next-themes"
import Loading from "./loader"
import { Toaster } from "react-hot-toast"
import ModalRoot from "@/components/modals/modal-root"

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
})

export const metadata = {
  title: "Health Physique",
  description: "Fitness insights, training guides, and healthy living.",
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/hplogo.png" />
      </head>
      <body className={nunito.className}>
        <Suspense fallback={<Loading />}>
          <Toaster position="top-center" />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            {children}
            <ModalRoot />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
