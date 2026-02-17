import Navbar from "@/features/app/Navbar"
import "./globals.css"
import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
})


export const metadata = {
  title: "Best Preschool in Mumbai | My Little Steps Preschool, Ambarnath",
  description:
    "Discover our philosophy, core values, and nurturing approach at My Little Steps Preschool in Ambarnath.",
  keywords: [
    "Best preschool in Ambarnath",
    "Luxury preschool Mumbai",
    "Montessori preschool Ambarnath",
    "CBSE preschool near me"
  ],

  verification: {
    google: "4AvwA2rd-SSD7gUUN5Hqq3n7X9e1IjPPh0FWxCysGz4",
  },
}

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
      <head>
        <meta
          name="google-site-verification"
          content="4AvwA2rd-SSD7gUUN5Hqq3n7X9e1IjPPh0FWxCysGz4"
        />
      </head>
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
