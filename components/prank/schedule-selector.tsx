"use client"

import { cn } from "@/lib/utils"

interface ScheduleSelectorProps {
  schedule: string
  onScheduleChange: (schedule: string) => void
}

const scheduleOptions = [
  { id: "now", label: "Acum", description: "Imediat" },
  { id: "10min", label: "10 min", description: "In 10 minute" },
  { id: "30min", label: "30 min", description: "In 30 minute" },
  { id: "1hour", label: "1 ora", description: "Intr-o ora" },
]

export function ScheduleSelector({ schedule, onScheduleChange }: ScheduleSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {scheduleOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onScheduleChange(option.id)}
          className={cn(
            "rounded-xl p-6 border text-center transition-all hover:scale-105",
            schedule === option.id
              ? "bg-gradient-to-br from-[hsla(262,83%,57%,0.1)] to-[hsla(262,83%,57%,0.05)] border-[hsl(262,83%,57%)]"
              : "bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)] hover:border-[hsla(262,83%,57%,0.5)]"
          )}
        >
          <div className="text-2xl font-bold mb-1">{option.label}</div>
          <div className="text-sm text-[hsl(215,20.2%,65.1%)]">{option.description}</div>
        </button>
      ))}
    </div>
  )
}
