"use client"

import { Suspense, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { pricingTiers } from "@/lib/mock-data"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

function CheckoutContent() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedTier = searchParams.get("tier")
  const [selectedTier, setSelectedTier] = useState(
    pricingTiers.find((t) => t.id === preselectedTier) || pricingTiers[1]
  )
  const [loading, setLoading] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardholder, setCardholder] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !selectedTier) return

    setLoading(true)

    // Create transaction record
    const { data: transaction, error } = await supabase
      .from("transactions")
      .insert({
        user_id: user.id,
        amount: selectedTier.price,
        credits: selectedTier.credits,
        status: "pending",
        stripe_payment_id: null,
      })
      .select()
      .single()

    if (!error && transaction) {
      // Simulate successful payment
      await supabase
        .from("transactions")
        .update({ status: "completed" })
        .eq("id", transaction.id)

      // Update user credits
      const { data: profile } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single()

      if (profile) {
        await supabase
          .from("profiles")
          .update({ credits: (profile.credits || 0) + selectedTier.credits })
          .eq("id", user.id)
      }

      router.push("/checkout/succes")
    }

    setLoading(false)
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Conectare Necesara</h1>
          <p className="text-[hsl(215,20.2%,65.1%)] mb-6">
            Trebuie sa fii conectat pentru a achizitiona credite.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Selecteaza Pachetul</h2>
            <div className="space-y-4">
              {pricingTiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier)}
                  className={cn(
                    "w-full rounded-xl p-6 border text-left transition-all",
                    selectedTier?.id === tier.id
                      ? "bg-gradient-to-br from-[hsla(262,83%,57%,0.1)] to-[hsla(262,83%,57%,0.05)] border-[hsl(262,83%,57%)]"
                      : "bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)] hover:border-[hsla(262,83%,57%,0.5)]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{tier.name}</h3>
                      <p className="text-sm text-[hsl(215,20.2%,65.1%)]">
                        {tier.credits} credite
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{tier.price} RON</p>
                      <p className="text-xs text-[hsl(215,20.2%,65.1%)]">
                        {tier.pricePerCredit.toFixed(2)} RON/credit
                      </p>
                    </div>
                  </div>
                  {selectedTier?.id === tier.id && (
                    <div className="mt-4 flex items-center gap-2 text-[hsl(120,60%,50%)]">
                      <Check className="w-5 h-5" />
                      <span className="text-sm">Selectat</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Detalii Plata</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-2xl p-6 border bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)] space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                    Numar Card
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                    required
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 rounded-lg bg-[hsla(217.2,32.6%,17.5%,0.5)] border border-[hsla(217.2,32.6%,17.5%,0.5)] text-[hsl(210,40%,98%)] placeholder-[hsl(215,20.2%,65.1%)] focus:outline-none focus:border-[hsl(262,83%,57%)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium mb-2">
                      Expira
                    </label>
                    <input
                      id="expiry"
                      type="text"
                      value={expiry}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "")
                        if (val.length <= 2) setExpiry(val)
                        else setExpiry(`${val.slice(0, 2)}/${val.slice(2, 4)}`)
                      }}
                      required
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 rounded-lg bg-[hsla(217.2,32.6%,17.5%,0.5)] border border-[hsla(217.2,32.6%,17.5%,0.5)] text-[hsl(210,40%,98%)] placeholder-[hsl(215,20.2%,65.1%)] focus:outline-none focus:border-[hsl(262,83%,57%)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      required
                      placeholder="123"
                      className="w-full px-4 py-3 rounded-lg bg-[hsla(217.2,32.6%,17.5%,0.5)] border border-[hsla(217.2,32.6%,17.5%,0.5)] text-[hsl(210,40%,98%)] placeholder-[hsl(215,20.2%,65.1%)] focus:outline-none focus:border-[hsl(262,83%,57%)]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cardholder" className="block text-sm font-medium mb-2">
                    Nume Titular
                  </label>
                  <input
                    id="cardholder"
                    type="text"
                    value={cardholder}
                    onChange={(e) => setCardholder(e.target.value)}
                    required
                    placeholder="ION POPESCU"
                    className="w-full px-4 py-3 rounded-lg bg-[hsla(217.2,32.6%,17.5%,0.5)] border border-[hsla(217.2,32.6%,17.5%,0.5)] text-[hsl(210,40%,98%)] placeholder-[hsl(215,20.2%,65.1%)] focus:outline-none focus:border-[hsl(262,83%,57%)]"
                  />
                </div>
              </div>

              <div className="rounded-2xl p-6 border bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)]">
                <h3 className="font-semibold mb-4">Sumar Comanda</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[hsl(215,20.2%,65.1%)]">Pachet</span>
                    <span>{selectedTier?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(215,20.2%,65.1%)]">Credite</span>
                    <span>{selectedTier?.credits}</span>
                  </div>
                  <div className="flex justify-between border-t border-[hsla(217.2,32.6%,17.5%,0.5)] pt-2 mt-2">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-bold text-[hsl(262,83%,57%)]">{selectedTier?.price} RON</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !selectedTier}
                className="w-full py-4 bg-gradient-to-r from-[hsl(262,83%,57%)] to-[hsl(280,60%,50%)] text-white rounded-xl font-semibold text-lg hover:scale-105 transition-all shadow-lg shadow-[hsla(262,83%,57%,0.3)] disabled:opacity-50"
              >
                {loading ? "Se proceseaza..." : `Plateste ${selectedTier?.price} RON`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[hsl(222.2,84%,4.9%)] text-[hsl(210,40%,98%)]">
      <Header />
      <Suspense fallback={<div className="container mx-auto px-4 pt-32 pb-20 text-center">Se incarca...</div>}>
        <CheckoutContent />
      </Suspense>
      <Footer />
    </main>
  )
}
