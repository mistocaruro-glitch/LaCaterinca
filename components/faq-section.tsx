"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { faqItems } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 bg-[hsla(217.2,32.6%,17.5%,0.2)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Intrebari Frecvente
          </h2>
          <p className="text-[hsl(215,20.2%,65.1%)] max-w-2xl mx-auto">
            Ai intrebari? Avem raspunsuri. Daca nu gasesti ceea ce cauti, ne poti contacta oricand.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-[hsla(217.2,32.6%,17.5%,0.5)] rounded-lg overflow-hidden bg-[hsla(222.2,84%,4.9%,0.5)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-medium">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[hsl(262,83%,57%)] transition-transform",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all",
                  openIndex === index ? "max-h-48" : "max-h-0"
                )}
              >
                <p className="px-4 pb-4 text-[hsl(215,20.2%,65.1%)]">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
