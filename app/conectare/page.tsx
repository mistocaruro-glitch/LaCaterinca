"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await signIn(email, password)
    if (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[hsl(222.2,84%,4.9%)] text-[hsl(210,40%,98%)]">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl p-8 border bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)]">
            <h1 className="text-3xl font-bold mb-6 text-center">Conectare</h1>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-[hsla(0,62.8%,30.6%,0.2)] border border-[hsla(0,62.8%,30.6%,0.5)] text-[hsl(0,84.2%,60.2%)]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[hsla(217.2,32.6%,17.5%,0.5)] border border-[hsla(217.2,32.6%,17.5%,0.5)] text-[hsl(210,40%,98%)] placeholder-[hsl(215,20.2%,65.1%)] focus:outline-none focus:border-[hsl(262,83%,57%)]"
                  placeholder="email@exemplu.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Parola
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[hsla(217.2,32.6%,17.5%,0.5)] border border-[hsla(217.2,32.6%,17.5%,0.5)] text-[hsl(210,40%,98%)] placeholder-[hsl(215,20.2%,65.1%)] focus:outline-none focus:border-[hsl(262,83%,57%)]"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-medium transition-all bg-[hsl(262,83%,57%)] text-white hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Se incarca..." : "Conectare"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-[hsl(215,20.2%,65.1%)]">
              Nu ai cont?{" "}
              <Link href="/inregistrare" className="text-[hsl(262,83%,57%)] hover:underline">
                Inregistreaza-te
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
