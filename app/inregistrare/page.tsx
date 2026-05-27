"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Parolele nu coincid")
      return
    }

    if (password.length < 6) {
      setError("Parola trebuie sa aiba cel putin 6 caractere")
      return
    }

    setLoading(true)
    const { error } = await signUp(email, password, name)
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
            <h1 className="text-3xl font-bold mb-6 text-center">Inregistrare</h1>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-[hsla(0,62.8%,30.6%,0.2)] border border-[hsla(0,62.8%,30.6%,0.5)] text-[hsl(0,84.2%,60.2%)]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nume
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[hsla(217.2,32.6%,17.5%,0.5)] border border-[hsla(217.2,32.6%,17.5%,0.5)] text-[hsl(210,40%,98%)] placeholder-[hsl(215,20.2%,65.1%)] focus:outline-none focus:border-[hsl(262,83%,57%)]"
                  placeholder="Numele tau"
                />
              </div>

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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirma Parola
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? "Se incarca..." : "Creeaza Cont"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-[hsl(215,20.2%,65.1%)]">
              Ai deja cont?{" "}
              <Link href="/conectare" className="text-[hsl(262,83%,57%)] hover:underline">
                Conecteaza-te
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
