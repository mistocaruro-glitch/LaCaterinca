export default function Home() {
  return (
    <main className="min-h-screen bg-[hsl(222.2,84%,4.9%)] text-[hsl(210,40%,98%)]">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Mistocaru
          </h1>
          <p className="text-xl text-[hsl(215,20.2%,65.1%)]">
            Sunatorii prietenii cu farse epice
          </p>
        </header>

        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Sune-ti Prietenii cu Farse Epice
          </h2>
          <p className="text-[hsl(215,20.2%,65.1%)] mb-8">
            Alege personajul, introdu numarul si te pui pe ras!
          </p>
          <button className="px-8 py-3 bg-[hsl(262.1,83.3%,57.8%)] text-[hsl(210,40%,98%)] rounded-lg hover:opacity-90 transition-opacity">
            Incepe Acum
          </button>
        </div>
      </div>
    </main>
  )
}
