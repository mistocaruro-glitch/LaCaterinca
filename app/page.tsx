import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { Users, Phone, Laugh } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-[hsl(222.2,84%,4.9%)] text-[hsl(210,40%,98%)]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsla(262,83%,57%,0.15)] via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(262,83%,57%)] rounded-full filter blur-[128px] opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[hsl(217,32%,17%)] rounded-full filter blur-[100px] opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[hsl(262,83%,57%)] via-[hsl(280,60%,50%)] to-[hsl(262,83%,57%)] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Suna-ti Prietenii cu Farse Epice
            </h1>
            <p className="text-lg md:text-xl text-[hsl(215,20.2%,65.1%)] mb-8 max-w-2xl mx-auto">
              Alege un personaj amuzant, introdu numarul prietenului tau si bucura-te
              de o farsa de neuitat. Simpu, rapid si super amuzant!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-[hsl(262,83%,57%)] to-[hsl(280,60%,50%)] text-white rounded-xl font-semibold text-lg hover:scale-105 transition-all shadow-lg shadow-[hsla(262,83%,57%,0.3)]">
                Incepe Acum
              </button>
              <button className="px-8 py-4 border border-[hsla(217.2,32.6%,17.5%,0.5)] rounded-xl font-semibold text-lg hover:bg-[hsla(217.2,32.6%,17.5%,0.3)] transition-all">
                Vezi Cum Functioneaza
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="cum-functioneaza" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cum Functioneaza
            </h2>
            <p className="text-[hsl(215,20.2%,65.1%)] max-w-2xl mx-auto">
              Trei pasi simpli pentru o farsa de neuitat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[hsl(262,83%,57%)] to-[hsl(280,60%,50%)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-6xl font-bold text-[hsla(262,83%,57%,0.2)] mb-2">1</div>
              <h3 className="text-xl font-semibold mb-2">Alege Personajul</h3>
              <p className="text-[hsl(215,20.2%,65.1%)] text-sm">
                Selecteaza din galeria noastra de personaje amuzante. Fiecare are stilul lui unic!
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[hsl(262,83%,57%)] to-[hsl(280,60%,50%)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <div className="text-6xl font-bold text-[hsla(262,83%,57%,0.2)] mb-2">2</div>
              <h3 className="text-xl font-semibold mb-2">Introdu Numarul</h3>
              <p className="text-[hsl(215,20.2%,65.1%)] text-sm">
                Introdu numarul de telefon al victimei. Garantam discretie totala!
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[hsl(262,83%,57%)] to-[hsl(280,60%,50%)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Laugh className="w-10 h-10 text-white" />
              </div>
              <div className="text-6xl font-bold text-[hsla(262,83%,57%,0.2)] mb-2">3</div>
              <h3 className="text-xl font-semibold mb-2">Te Pui pe Ras</h3>
              <p className="text-[hsl(215,20.2%,65.1%)] text-sm">
                Nimic mai simplu! Urmareste apelul in timp real si asculta inregistrarea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center p-10 rounded-3xl bg-gradient-to-br from-[hsla(262,83%,57%,0.1)] to-[hsla(280,60%,50%,0.05)] border border-[hsla(262,83%,57%,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Gata de Prima Farsa?
            </h2>
            <p className="text-[hsl(215,20.2%,65.1%)] mb-8">
              Alatura-te miilor de utilizatori care s-au distrat deja cu Mistocaru!
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-[hsl(262,83%,57%)] to-[hsl(280,60%,50%)] text-white rounded-xl font-semibold text-lg hover:scale-105 transition-all shadow-lg shadow-[hsla(262,83%,57%,0.3)]">
              Incepe Prima Farsa Gratis
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
