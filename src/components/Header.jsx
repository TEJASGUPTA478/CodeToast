export default function Header() {
  return (
    <header className="relative text-center pt-12 pb-8 px-4 overflow-hidden">
      {/* Background gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="text-6xl mb-4">🔥</div>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
            Roast My Portfolio
          </span>
        </h1>
        <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
          Paste your portfolio URL or describe it — AI will roast it with
          <span className="text-orange-400 font-semibold"> brutal honesty</span> and
          <span className="text-orange-400 font-semibold"> actual feedback</span>.
        </p>
      </div>
    </header>
  )
}
