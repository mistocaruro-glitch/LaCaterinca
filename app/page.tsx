export default function Home() {
  return (
    <main className="min-h-screen gradient-bg text-[hsl(210,40%,98%)] relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="glow-orb w-96 h-96 bg-[hsl(262,83%,57%)] top-[-10%] left-[-5%]"></div>
      <div className="glow-orb w-80 h-80 bg-[hsl(217,32%,17%)] bottom-[10%] right-[-10%] animation-delay-[-10s]"></div>
      <div className="glow-orb w-64 h-64 bg-[hsl(262,60%,40%)] top-[40%] right-[20%] animation-delay-[-5s]"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[hsl(262,83%,57%)] via-[hsl(210,40%,98%)] to-[hsl(262,83%,57%)] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Mistocaru
          </h1>
          <p className="text-xl text-[hsl(215,20.2%,65.1%)]">
            Sunatorii prietenii cu farse epice
          </p>
        </header>

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">
            Sune-ti Prietenii cu Farse Epice
          </h2>
          <p className="text-[hsl(215,20.2%,65.1%)] mb-8">
            Alege personajul, introdu numarul si te pui pe ras!
          </p>
          <button className="px-8 py-3 bg-[hsl(262.1,83.3%,57.8%)] text-[hsl(210,40%,98%)] rounded-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-[hsla(262,83%,57%,0.3)]">
            Incepe Acum
          </button>
        </div>
      </div>
    </main>
  )
}
