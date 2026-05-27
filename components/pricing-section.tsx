"use client"

import { Check } from "lucide-react"
import { pricingTiers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function PricingSection() {
  return (
    <section id="preturi" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Preturi Simple si Transparente
          </h2>
          <p className="text-[hsl(215,20.2%,65.1%)] max-w-2xl mx-auto">
            Alege pachetul potrivit pentru tine. Cu cat iei mai multe credite, cu atat economisesti mai mult.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "relative rounded-2xl p-6 border transition-transform hover:scale-105",
                tier.popular
                  ? "bg-gradient-to-b from-[hsla(262,83%,57%,0.1)] to-[hsla(262,83%,57%,0.05)] border-[hsl(262,83%,57%)]"
                  : "bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)]"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[hsl(262,83%,57%)] text-white text-sm font-medium rounded-full">
                  Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-[hsl(215,20.2%,65.1%)]">RON</span>
                </div>
                <p className="text-[hsl(215,20.2%,65.1%)] text-sm mt-1">
                  {tier.credits} credite ({tier.pricePerCredit.toFixed(2)} RON/credit)
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[hsl(262,83%,57%)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[hsl(215,20.2%,65.1%)]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "w-full py-3 rounded-lg font-medium transition-all",
                  tier.popular
                    ? "bg-[hsl(262,83%,57%)] text-white hover:opacity-90"
                    : "bg-[hsla(217.2,32.6%,17.5%,0.5)] text-[hsl(210,40%,98%)] hover:bg-[hsla(217.2,32.6%,17.5%,0.8)]"
                )}
              >
                Cumpara Acum
              </button>
            </div>
          ))}
        </div>

        {/* Guarantee Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[hsla(120,60%,50%,0.1)] border border-[hsla(120,60%,50%,0.3)] rounded-full">
            <Check className="w-5 h-5 text-[hsl(120,60%,50%)]" />
            <span className="text-sm">
              <strong className="text-[hsl(120,60%,50%)]">Garantia Fara Teapa:</strong>
              <span className="text-[hsl(215,20.2%,65.1%)]"> Apeluri sub 10 secunde = credit returnat automat</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
