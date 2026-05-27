"use client"

import { cn } from "@/lib/utils"

interface Character {
  id: string
  name: string
  description: string
  avatar: string
}

interface CharacterGridProps {
  characters: Character[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function CharacterGrid({ characters, selectedId, onSelect }: CharacterGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {characters.map((character) => (
        <button
          key={character.id}
          onClick={() => onSelect(character.id)}
          className={cn(
            "relative rounded-2xl p-6 border text-left transition-all hover:scale-105",
            selectedId === character.id
              ? "bg-gradient-to-br from-[hsla(262,83%,57%,0.1)] to-[hsla(262,83%,57%,0.05)] border-[hsl(262,83%,57%)]"
              : "bg-[hsla(217.2,32.6%,17.5%,0.3)] border-[hsla(217.2,32.6%,17.5%,0.5)] hover:border-[hsla(262,83%,57%,0.5)]"
          )}
        >
          {selectedId === character.id && (
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[hsl(262,83%,57%)] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-[hsla(217.2,32.6%,17.5%,0.5)]">
              <img
                src={character.avatar}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{character.name}</h3>
              <p className="text-sm text-[hsl(215,20.2%,65.1%)] line-clamp-2">
                {character.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
