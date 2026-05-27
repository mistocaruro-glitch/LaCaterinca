"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { characters } from "@/lib/mock-data"
import { CircleCheck as CheckCircle, Circle as XCircle, Clock, Loader as Loader2 } from "lucide-react"
import Link from "next/link"

interface Prank {
  id: string
  character_id: string
  victim_number: string
  victim_name: string | null
  status: "pending" | "in_progress" | "success" | "failed"
  duration: number | null
  created_at: string
}

interface PrankHistoryProps {
  userId: string
}

const statusConfig = {
  pending: {
    label: "In Asteptare",
    color: "hsl(48, 96%, 53%)",
    bg: "hsla(48, 96%, 53%, 0.2)",
    icon: Clock,
  },
  in_progress: {
    label: "In Desfasurare",
    color: "hsl(262, 83%, 57%)",
    bg: "hsla(262, 83%, 57%, 0.2)",
    icon: Loader2,
  },
  success: {
    label: "Reusit",
    color: "hsl(120, 60%, 50%)",
    bg: "hsla(120, 60%, 50%, 0.2)",
    icon: CheckCircle,
  },
  failed: {
    label: "Esuat",
    color: "hsl(0, 84%, 60%)",
    bg: "hsla(0, 84%, 60%, 0.2)",
    icon: XCircle,
  },
}

export function PrankHistory({ userId }: PrankHistoryProps) {
  const [pranks, setPranks] = useState<Prank[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPranks = async () => {
      const { data, error } = await supabase
        .from("pranks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10)

      if (!error && data) {
        setPranks(data)
      }
      setLoading(false)
    }

    fetchPrank()
  }, [userId])

  if (loading) {
    return (
      <div className="rounded-2xl p-8 border bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)]">
        <div className="text-center py-8">Se incarca...</div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-8 border bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)]">
      <h2 className="text-2xl font-bold mb-6">Istoric Farse</h2>

      {pranks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[hsl(215,20.2%,65.1%)] mb-4">
            Nu ai trimis inca nicio farsa.
          </p>
          <Link
            href="/farse/nou"
            className="inline-block px-6 py-3 bg-[hsl(262,83%,57%)] text-white rounded-lg hover:opacity-90 transition-all"
          >
            Farsa Noua
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {pranks.map((prank) => {
            const character = characters.find((c) => c.id === prank.character_id)
            const status = statusConfig[prank.status]
            const StatusIcon = status.icon

            return (
              <Link
                key={prank.id}
                href={`/farse/${prank.id}`}
                className="block rounded-xl p-4 bg-[hsla(217.2,32.6%,17.5%,0.5)] hover:bg-[hsla(217.2,32.6%,17.5%,0.7)] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: status.bg }}
                  >
                    <StatusIcon
                      className={`w-6 h-6 ${prank.status === "in_progress" ? "animate-spin" : ""}`}
                      style={{ color: status.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">
                        {character?.name || "Necunoscut"}
                      </span>
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: status.bg, color: status.color }}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-[hsl(215,20.2%,65.1%)] truncate">
                      {prank.victim_name || prank.victim_number}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-[hsl(215,20.2%,65.1%)]">
                      {new Date(prank.created_at).toLocaleDateString("ro-RO")}
                    </p>
                    {prank.duration !== null && (
                      <p className="text-xs text-[hsl(215,20.2%,65.1%)]">
                        {Math.floor(prank.duration / 60)}:{(prank.duration % 60).toString().padStart(2, "0")}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
