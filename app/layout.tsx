import Navbar from "@/features/app/Navbar"
import "./globals.css"
import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${playfair.variable}
          ${inter.variable}
          antialiased
          tracking-wide
        `}
      >
        <Navbar />
        {children}
      </body>
    </html>
  )
}
