"use client"

interface PhoneInputProps {
  phoneNumber: string
  victimName: string
  onPhoneChange: (phone: string) => void
  onNameChange: (name: string) => void
}

export function PhoneInput({ phoneNumber, victimName, onPhoneChange, onNameChange }: PhoneInputProps) {
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 9)
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`
  }

  return (
    <div className="rounded-2xl p-8 border bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)]">
      <div className="space-y-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Numar de telefon
          </label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[hsla(217.2,32.6%,17.5%,0.5)] border border-[hsla(217.2,32.6%,17.5%,0.5)]">
              <span className="text-2xl">🇷🇴</span>
              <span className="font-medium">+40</span>
            </div>
            <input
              id="phone"
              type="tel"
              value={formatPhone(phoneNumber)}
              onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ""))}
              placeholder="7XX XXX XXX"
              className="flex-1 px-4 py-3 rounded-lg bg-[hsla(217.2,32.6%,17.5%,0.5)] border border-[hsla(217.2,32.6%,17.5%,0.5)] text-[hsl(210,40%,98%)] placeholder-[hsl(215,20.2%,65.1%)] focus:outline-none focus:border-[hsl(262,83%,57%)]"
            />
          </div>
          <p className="text-xs text-[hsl(215,20.2%,65.1%)] mt-2">
            Introdu numarul de 9 cifre (fara +40)
          </p>
        </div>

        <div>
          <label htmlFor="victimName" className="block text-sm font-medium mb-2">
            Numele victimei (optional)
          </label>
          <input
            id="victimName"
            type="text"
            value={victimName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Ex: Prietenul meu"
            className="w-full px-4 py-3 rounded-lg bg-[hsla(217.2,32.6%,17.5%,0.5)] border border-[hsla(217.2,32.6%,17.5%,0.5)] text-[hsl(210,40%,98%)] placeholder-[hsl(215,20.2%,65.1%)] focus:outline-none focus:border-[hsl(262,83%,57%)]"
          />
          <p className="text-xs text-[hsl(215,20.2%,65.1%)] mt-2">
            Pentru a-si aminti mai usor cine a fost tinta
          </p>
        </div>
      </div>
    </div>
  )
}
