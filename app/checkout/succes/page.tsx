"use client"

import { CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[hsl(222.2,84%,4.9%)] text-[hsl(210,40%,98%)]">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-[hsla(120,60%,50%,0.2)] flex items-center justify-center mb-8">
            <CheckCircle className="w-12 h-12 text-[hsl(120,60%,50%)]" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Plata Reusita!</h1>
          <p className="text-xl text-[hsl(215,20.2%,65.1%)] mb-8">
            Creditele au fost adaugate in contul tau.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/farse/nou"
              className="px-8 py-4 bg-gradient-to-r from-[hsl(262,83%,57%)] to-[hsl(280,60%,50%)] text-white rounded-xl font-semibold text-lg hover:scale-105 transition-all shadow-lg shadow-[hsla(262,83%,57%,0.3)]"
            >
              Incepe Prima Farsa
            </Link>
            <Link
              href="/profil"
              className="px-8 py-4 border border-[hsla(217.2,32.6%,17.5%,0.5)] rounded-xl font-semibold text-lg hover:bg-[hsla(217.2,32.6%,17.5%,0.3)] transition-all"
            >
              Vezi Profilul
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
