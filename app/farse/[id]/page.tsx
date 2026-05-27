"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { characters } from "@/lib/mock-data"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Clock, CircleCheck as CheckCircle, Circle as XCircle, Loader as Loader2 } from "lucide-react"

interface Prank {
  id: string
  user_id: string
  character_id: string
  victim_number: string
  victim_name: string | null
  status: "pending" | "in_progress" | "success" | "failed"
  duration: number | null
  credits_used: number
  created_at: string
  recording_url: string | null
}

const statusConfig = {
  pending: {
    label: "In Asteptare",
    color: "hsl(48, 96%, 53%)",
    icon: Clock,
  },
  in_progress: {
    label: "In Desfasurare",
    color: "hsl(262, 83%, 57%)",
    icon: Loader2,
  },
  success: {
    label: "Reusit",
    color: "hsl(120, 60%, 50%)",
    icon: CheckCircle,
  },
  failed: {
    label: "Esuat",
    color: "hsl(0, 84%, 60%)",
    icon: XCircle,
  },
}

export default function PrankStatusPage() {
  const { user } = useAuth()
  const params = useParams()
  const prankId = params.id as string
  const [prank, setPrank] = useState<Prank | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !prankId) return

    const fetchPrank = async () => {
      const { data, error } = await supabase
        .from("pranks")
        .select("*")
        .eq("id", prankId)
        .eq("user_id", user.id)
        .maybeSingle()

      if (!error && data) {
        setPrank(data)
      }
      setLoading(false)
    }

    fetchPrank()

    // Subscribe to prank updates
    const channel = supabase
      .channel(`prank:${prankId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "pranks",
          filter: `id=eq.${prankId}`,
        },
        (payload) => {
          setPrank(payload.new as Prank)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, prankId])

  if (loading) {
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

  if (!prank) {
    return (
      <main className="min-h-screen bg-[hsl(222.2,84%,4.9%)] text-[hsl(210,40%,98%)]">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Farsa Negasita</h1>
            <p className="text-[hsl(215,20.2%,65.1%)] mb-6">
              Aceasta farsa nu exista sau nu ai access la ea.
            </p>
            <Link
              href="/farse/nou"
              className="inline-block px-6 py-3 bg-[hsl(262,83%,57%)] text-white rounded-lg hover:opacity-90 transition-all"
            >
              Farsa Noua
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const character = characters.find((c) => c.id === prank.character_id)
  const status = statusConfig[prank.status]
  const StatusIcon = status.icon

  return (
    <main className="min-h-screen bg-[hsl(222.2,84%,4.9%)] text-[hsl(210,40%,98%)]">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Detalii Farsa</h1>

          {/* Status Card */}
          <div className="rounded-2xl p-8 border bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)] mb-8">
            <div className="text-center mb-8">
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  prank.status === "in_progress" ? "animate-pulse" : ""
                }`}
                style={{ backgroundColor: `hsla(${status.color}, 0.2)` }}
              >
                <StatusIcon
                  className={`w-10 h-10 ${prank.status === "in_progress" ? "animate-spin" : ""}`}
                  style={{ color: status.color }}
                />
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: status.color }}
              >
                {status.label}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-[hsl(215,20.2%,65.1%)] mb-1">Personaj</p>
                <p className="font-medium">{character?.name || "Necunoscut"}</p>
              </div>
              <div>
                <p className="text-sm text-[hsl(215,20.2%,65.1%)] mb-1">Numar</p>
                <p className="font-medium">{prank.victim_number}</p>
              </div>
              {prank.victim_name && (
                <div>
                  <p className="text-sm text-[hsl(215,20.2%,65.1%)] mb-1">Victima</p>
                  <p className="font-medium">{prank.victim_name}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-[hsl(215,20.2%,65.1%)] mb-1">Data</p>
                <p className="font-medium">
                  {new Date(prank.created_at).toLocaleDateString("ro-RO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {prank.duration !== null && (
                <div>
                  <p className="text-sm text-[hsl(215,20.2%,65.1%)] mb-1">Durata</p>
                  <p className="font-medium">{Math.floor(prank.duration / 60)}:{(prank.duration % 60).toString().padStart(2, "0")}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-[hsl(215,20.2%,65.1%)] mb-1">Cost</p>
                <p className="font-medium text-[hsl(262,83%,57%)]">{prank.credits_used} Credit{prank.credits_used > 1 ? "e" : ""}</p>
              </div>
            </div>
          </div>

          {/* Recording (if available) */}
          {prank.recording_url && (
            <div className="rounded-2xl p-8 border bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)] mb-8">
              <h2 className="text-xl font-semibold mb-4">Inregistrare</h2>
              <audio controls className="w-full" src={prank.recording_url}>
                Browserul tau nu suporta elementul audio.
              </audio>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/farse/nou"
              className="px-6 py-3 bg-[hsl(262,83%,57%)] text-white rounded-lg text-center hover:opacity-90 transition-all"
            >
              Farsa Noua
            </Link>
            <Link
              href="/profil"
              className="px-6 py-3 border border-[hsla(217.2,32.6%,17.5%,0.5)] rounded-lg text-center hover:bg-[hsla(217.2,32.6%,17.5%,0.3)] transition-all"
            >
              Inapoi la Profil
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
