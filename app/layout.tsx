import "./globals.css"
import { Nunito } from "next/font/google"
import { Suspense } from "react"
import { ThemeProvider } from "next-themes"
import Loading from "./loader"

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
      <body className={nunito.className}>
        <Suspense fallback={<Loading />}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
