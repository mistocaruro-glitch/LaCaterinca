"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { characters } from "@/lib/mock-data"
import { CharacterGrid } from "@/components/prank/character-grid"
import { PhoneInput } from "@/components/prank/phone-input"
import { ScheduleSelector } from "@/components/prank/schedule-selector"
import { useRouter } from "next/navigation"

type Step = "character" | "phone" | "schedule" | "confirm"

export default function NewPrankPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState<Step>("character")
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [victimName, setVictimName] = useState("")
  const [schedule, setSchedule] = useState<string>("now")
  const [loading, setLoading] = useState(false)

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId)
  }

  const handleNext = () => {
    if (step === "character" && selectedCharacter) {
      setStep("phone")
    } else if (step === "phone" && phoneNumber.length >= 9) {
      setStep("schedule")
    } else if (step === "schedule") {
      setStep("confirm")
    }
  }

  const handleBack = () => {
    if (step === "phone") setStep("character")
    else if (step === "schedule") setStep("phone")
    else if (step === "confirm") setStep("schedule")
  }

  const handleSubmit = async () => {
    if (!user || !selectedCharacter) return

    setLoading(true)
    const { data, error } = await supabase
      .from("pranks")
      .insert({
        user_id: user.id,
        character_id: selectedCharacter,
        victim_number: `+40${phoneNumber}`,
        victim_name: victimName || null,
        status: "pending",
        credits_used: 1,
      })
      .select()
      .single()

    if (!error && data) {
      router.push(`/farse/${data.id}`)
    }
    setLoading(false)
  }

  const selectedCharacterData = characters.find((c) => c.id === selectedCharacter)

  if (!user) {
    return (
      <main className="min-h-screen bg-[hsl(222.2,84%,4.9%)] text-[hsl(210,40%,98%)]">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Conectare Necesara</h1>
            <p className="text-[hsl(215,20.2%,65.1%)] mb-6">
              Trebuie sa fii conectat pentru a trimite o farsa.
            </p>
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Farsa Noua</h1>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {["character", "phone", "schedule", "confirm"].map((s, i) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step === s
                        ? "bg-[hsl(262,83%,57%)] text-white"
                        : i < ["character", "phone", "schedule", "confirm"].indexOf(step)
                        ? "bg-[hsla(120,60%,50%,0.2)] text-[hsl(120,60%,50%)]"
                        : "bg-[hsla(217.2,32.6%,17.5%,0.5)] text-[hsl(215,20.2%,65.1%)]"
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < 3 && <div className="w-12 h-0.5 bg-[hsla(217.2,32.6%,17.5%,0.5)] mx-2" />}
                </div>
              ))}
            </div>
          </div>

          {/* Character Selection */}
          {step === "character" && (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center">Alege Personajul</h2>
              <CharacterGrid
                characters={characters}
                selectedId={selectedCharacter}
                onSelect={handleCharacterSelect}
              />
            </>
          )}

          {/* Phone Input */}
          {step === "phone" && (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center">Numarul Victimei</h2>
              <PhoneInput
                phoneNumber={phoneNumber}
                victimName={victimName}
                onPhoneChange={setPhoneNumber}
                onNameChange={setVictimName}
              />
            </>
          )}

          {/* Schedule */}
          {step === "schedule" && (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center">Programare</h2>
              <ScheduleSelector schedule={schedule} onScheduleChange={setSchedule} />
            </>
          )}

          {/* Confirmation */}
          {step === "confirm" && (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center">Confirmare</h2>
              <div className="rounded-2xl p-8 border bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)]">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[hsl(215,20.2%,65.1%)]">Personaj:</span>
                    <span className="font-medium">{selectedCharacterData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(215,20.2%,65.1%)]">Numar:</span>
                    <span className="font-medium">+40{phoneNumber}</span>
                  </div>
                  {victimName && (
                    <div className="flex justify-between">
                      <span className="text-[hsl(215,20.2%,65.1%)]">Nume Victima:</span>
                      <span className="font-medium">{victimName}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[hsl(215,20.2%,65.1%)]">Program:</span>
                    <span className="font-medium">
                      {schedule === "now"
                        ? "Acum"
                        : schedule === "10min"
                        ? "In 10 minute"
                        : schedule === "30min"
                        ? "In 30 minute"
                        : "In 1 ora"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[hsla(217.2,32.6%,17.5%,0.5)] pt-4 mt-4">
                    <span className="text-[hsl(215,20.2%,65.1%)]">Cost:</span>
                    <span className="font-bold text-[hsl(262,83%,57%)]">1 Credit</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step !== "character" && (
              <button
                onClick={handleBack}
                className="px-6 py-3 border border-[hsla(217.2,32.6%,17.5%,0.5)] rounded-lg hover:bg-[hsla(217.2,32.6%,17.5%,0.3)] transition-all"
              >
                Inapoi
              </button>
            )}
            <div className="ml-auto">
              {step !== "confirm" ? (
                <button
                  onClick={handleNext}
                  disabled={
                    (step === "character" && !selectedCharacter) ||
                    (step === "phone" && phoneNumber.length < 9)
                  }
                  className="px-6 py-3 bg-[hsl(262,83%,57%)] text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                >
                  Continua
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-[hsl(262,83%,57%)] to-[hsl(280,60%,50%)] text-white rounded-lg font-semibold hover:scale-105 transition-all shadow-lg shadow-[hsla(262,83%,57%,0.3)] disabled:opacity-50"
                >
                  {loading ? "Se trimite..." : "Lanseaza Farsa"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
