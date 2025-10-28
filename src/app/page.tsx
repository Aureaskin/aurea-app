"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ComingSoon() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Subscription failed")

      setIsSubmitted(true)
      setEmail("")
    } catch (err) {
      console.error("subscribe error: ", err)
      alert((err as Error).message || "There was an error subscribing. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#F5F1ED]">
      {/* Header */}
      <header className="w-full px-6 py-6 md:px-12 md:py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] tracking-wide text-[#2C2420]">
            AUREA SKIN
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full mx-auto">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm md:text-base tracking-widest uppercase text-[#8F4C32]">Coming Soon</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] leading-tight text-balance text-[#2C2420]">
                Nourish your skin with nature's finest
              </h2>
              <p className="text-lg md:text-xl text-[#5C4A3A] leading-relaxed">
                Handcrafted skin butter made with organic ingredients. Be the first to experience luxury skincare that
                transforms.
              </p>
            </div>

            {/* Email Form */}
            <div className="space-y-4">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 h-12 px-4 bg-white border-2 border-[#8F4C32] focus:border-[#A67C52] rounded-lg text-base text-[#2C2420]"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="h-12 px-8 bg-[#8F4C32] hover:bg-[#8B6A42] text-white rounded-lg font-medium transition-colors"
                    >
                      {isLoading ? "Joining..." : "Notify Me"}
                    </Button>
                  </div>
                  <p className="text-sm text-[#8F4C32]">
                    Join our waitlist for exclusive early access and special launch offers.
                  </p>
                </form>
              ) : (
                <div className="p-6 bg-white rounded-lg border-2 border-[#C9A882]">
                  <p className="text-lg font-medium text-[#A67C52]">Thank you for joining!</p>
                  <p className="text-[#5C4A3A] mt-2">
                    We'll notify you when we launch. Check your inbox or spam for a welcome message.
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="text-center space-y-2">
                <div className="text-2xl">🌿</div>
                <p className="text-sm text-[#5C4A3A]">Natural</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">✨</div>
                <p className="text-sm text-[#5C4A3A]">Handcrafted</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">🌸</div>
                <p className="text-sm text-[#5C4A3A]">Organic</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full px-6 py-6 md:px-12 md:py-8 border-t border-[#C9A882]/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#8F4C32]">
          <p>© 2025 Aurea Skin. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://instagram.com/theaureaskin" className="hover:text-[#A67C52] transition-colors">
              Instagram
            </a>
            <a href="https://tiktok.com/@theaureaskin" className="hover:text-[#A67C52] transition-colors">
              Tiktok
            </a>
            <a href="mailto:info@theaureaskin.com" className="hover:text-[#A67C52] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
