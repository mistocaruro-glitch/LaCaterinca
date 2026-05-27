"use client"

import { useState } from "react"
import { Menu, X, Phone, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsla(222.2,84%,4.9%,0.8)] backdrop-blur-xl border-b border-[hsla(217.2,32.6%,17.5%,0.5)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(262,83%,57%)] to-[hsl(280,60%,50%)] flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[hsl(262,83%,57%)] to-[hsl(210,40%,98%)] bg-clip-text text-transparent">
              Mistocaru
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#cum-functioneaza" className="text-[hsl(215,20.2%,65.1%)] hover:text-[hsl(210,40%,98%)] transition-colors">
              Cum Functioneaza
            </a>
            <a href="#preturi" className="text-[hsl(215,20.2%,65.1%)] hover:text-[hsl(210,40%,98%)] transition-colors">
              Preturi
            </a>
            <a href="#faq" className="text-[hsl(215,20.2%,65.1%)] hover:text-[hsl(210,40%,98%)] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-4 py-2 text-[hsl(210,40%,98%)] hover:text-[hsl(262,83%,57%)] transition-colors">
              Conectare
            </button>
            <button className="px-4 py-2 bg-[hsl(262,83%,57%)] text-white rounded-lg hover:opacity-90 transition-all hover:scale-105">
              Inregistrare
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[hsl(210,40%,98%)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-4 border-t border-[hsla(217.2,32.6%,17.5%,0.5)]">
          <a href="#cum-functioneaza" className="block text-[hsl(215,20.2%,65.1%)] hover:text-[hsl(210,40%,98%)]">
            Cum Functioneaza
          </a>
          <a href="#preturi" className="block text-[hsl(215,20.2%,65.1%)] hover:text-[hsl(210,40%,98%)]">
            Preturi
          </a>
          <a href="#faq" className="block text-[hsl(215,20.2%,65.1%)] hover:text-[hsl(210,40%,98%)]">
            FAQ
          </a>
          <div className="pt-4 border-t border-[hsla(217.2,32.6%,17.5%,0.5)] flex gap-4">
            <button className="flex-1 px-4 py-2 border border-[hsl(217.2,32.6%,17.5%)] text-[hsl(210,40%,98%)] rounded-lg">
              Conectare
            </button>
            <button className="flex-1 px-4 py-2 bg-[hsl(262,83%,57%)] text-white rounded-lg">
              Inregistrare
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
