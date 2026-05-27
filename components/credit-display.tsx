"use client"

import { Coins } from "lucide-react"
import Link from "next/link"

interface CreditDisplayProps {
  credits: number
}

export function CreditDisplay({ credits }: CreditDisplayProps) {
  return (
    <div className="rounded-2xl p-6 border bg-gradient-to-br from-[hsla(262,83%,57%,0.1)] to-[hsla(262,83%,57%,0.05)] border-[hsla(262,83%,57%,0.3)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Credite Disponibile</h3>
        <div className="w-10 h-10 rounded-lg bg-[hsl(262,83%,57%)] flex items-center justify-center">
          <Coins className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-4xl font-bold text-[hsl(262,83%,57%)]">{credits}</span>
        <span className="text-[hsl(215,20.2%,65.1%)]">credite</span>
      </div>
      <Link
        href="/checkout"
        className="block w-full py-2 text-center text-sm text-[hsl(262,83%,57%)] hover:text-white transition-colors"
      >
        Cumpara mai multe credite
      </Link>
    </div>
  )
}
