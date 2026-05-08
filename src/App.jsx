import { useState } from 'react'
import Header from './components/Header'
import InputSection from './components/InputSection'
import RoastOutput from './components/RoastOutput'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const [roast, setRoast] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-orange-500/30">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main className="max-w-2xl mx-auto px-4 pb-20">
          <InputSection
            setRoast={setRoast}
            setLoading={setLoading}
            setError={setError}
          />

          {/* Error message */}
          {error && (
            <div className="mt-6 animate-fade-in-up">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-3 text-red-400 text-center text-sm">
                ⚠️ {error}
              </div>
            </div>
          )}

          {/* Loading spinner */}
          {loading && <LoadingSpinner />}

          {/* Roast output */}
          {roast && !loading && (
            <>
              <RoastOutput roast={roast} />
              <div className="text-center mt-8 animate-fade-in-up">
                <button
                  onClick={() => setRoast('')}
                  className="text-gray-400 hover:text-orange-400 text-sm font-medium underline underline-offset-4 transition-colors duration-200 cursor-pointer"
                >
                  🔄 Roast a different portfolio →
                </button>
              </div>
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-600 text-xs border-t border-gray-800/50">
          Built with React + Tailwind CSS · Powered by Gemini AI
        </footer>
      </div>
    </div>
  )
}

export default App
