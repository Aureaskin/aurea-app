"use client"

import type React from "react"

import { Geist } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        .font-serif {
          font-family: var(--font-playfair), serif;
        }
      `}</style>
      <Suspense fallback={null}>{children}</Suspense>
      <Analytics />
    </>
  )
}
