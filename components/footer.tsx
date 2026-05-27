export function Footer() {
  return (
    <footer className="border-t border-[hsla(217.2,32.6%,17.5%,0.5)] bg-[hsla(222.2,84%,4.9%,0.5)]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[hsl(262,83%,57%)] to-[hsl(210,40%,98%)] bg-clip-text text-transparent">
              Mistocaru
            </h3>
            <p className="text-[hsl(215,20.2%,65.1%)] text-sm max-w-md">
              Suna-ti prietenii cu farse epice. Platforma ta de divertisment pentru momente
              de neuitat alaturi de cei dragi.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[hsl(210,40%,98%)] font-semibold mb-4">Navigare</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#cum-functioneaza" className="text-[hsl(215,20.2%,65.1%)] hover:text-[hsl(262,83%,57%)] transition-colors">
                  Cum Functioneaza
                </a>
              </li>
              <li>
                <a href="#preturi" className="text-[hsl(215,20.2%,65.1%)] hover:text-[hsl(262,83%,57%)] transition-colors">
                  Preturi
                </a>
              </li>
              <li>
                <a href="#faq" className="text-[hsl(215,20.2%,65.1%)] hover:text-[hsl(262,83%,57%)] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[hsl(210,40%,98%)] font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-[hsl(215,20.2%,65.1%)] hover:text-[hsl(262,83%,57%)] transition-colors">
                  Termeni si Conditii
                </a>
              </li>
              <li>
                <a href="#" className="text-[hsl(215,20.2%,65.1%)] hover:text-[hsl(262,83%,57%)] transition-colors">
                  Politica de Confidentialitate
                </a>
              </li>
              <li>
                <a href="#" className="text-[hsl(215,20.2%,65.1%)] hover:text-[hsl(262,83%,57%)] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[hsla(217.2,32.6%,17.5%,0.5)] text-center text-sm text-[hsl(215,20.2%,65.1%)]">
          <p>© 2024 Mistocaru. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  )
}
