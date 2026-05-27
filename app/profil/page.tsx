"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CreditDisplay } from "@/components/credit-display"
import { PrankHistory } from "@/components/prank-history"
import Link from "next/link"

interface Profile {
  id: string
  name: string
  email: string
  credits: number
  created_at: string
}

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()

      if (!error && data) {
        setProfile(data)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [user])

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[hsl(222.2,84%,4.9%)] text-[hsl(210,40%,98%)]">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="text-center">Se incarca...</div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[hsl(222.2,84%,4.9%)] text-[hsl(210,40%,98%)]">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Acces Restricionat</h1>
            <p className="text-[hsl(215,20.2%,65.1%)] mb-6">
              Trebuie sa fii conectat pentru a accesa aceasta pagina.
            </p>
            <Link
              href="/conectare"
              className="inline-block px-6 py-3 bg-[hsl(262,83%,57%)] text-white rounded-lg hover:opacity-90 transition-all"
            >
              Conectare
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[hsl(222.2,84%,4.9%)] text-[hsl(210,40%,98%)]">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 border bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)] mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(262,83%,57%)] to-[hsl(280,60%,50%)] flex items-center justify-center text-4xl font-bold text-white">
                {profile?.name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{profile?.name || "Utilizator"}</h1>
                <p className="text-[hsl(215,20.2%,65.1%)]">{user.email}</p>
                <p className="text-sm text-[hsl(215,20.2%,65.1%)] mt-2">
                  Membru din {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("ro-RO") : "..."}
                </p>
              </div>
              <button
                onClick={signOut}
                className="px-6 py-2 border border-[hsla(217.2,32.6%,17.5%,0.5)] rounded-lg hover:bg-[hsla(217.2,32.6%,17.5%,0.3)] transition-all"
              >
                Deconectare
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <CreditDisplay credits={profile?.credits || 0} />
            <div className="rounded-2xl p-6 border bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)]">
              <h3 className="text-lg font-semibold mb-4">Actiuni Rapide</h3>
              <div className="space-y-3">
                <Link
                  href="/farse/nou"
                  className="block w-full py-3 px-4 bg-[hsl(262,83%,57%)] text-white rounded-lg text-center hover:opacity-90 transition-all"
                >
                  Farsa Noua
                </Link>
                <Link
                  href="/checkout"
                  className="block w-full py-3 px-4 border border-[hsla(217.2,32.6%,17.5%,0.5)] rounded-lg text-center hover:bg-[hsla(217.2,32.6%,17.5%,0.3)] transition-all"
                >
                  Cumpara Credite
                </Link>
              </div>
            </div>
          </div>

          <PrankHistory userId={user.id} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
