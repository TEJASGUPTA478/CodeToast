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
    <div className="app-shell">

      <div className="bg-layer" />

      <div className="content">

        <Header />

        <main className="main-area">

          <InputSection
            setRoast={setRoast}
            setLoading={setLoading}
            setError={setError}
          />


          {error && (
            <div className="err">
              <div className="err-box">⚠️ {error}</div>
            </div>
          )}


          {loading && <LoadingSpinner />}


          {roast && !loading && (
            <>
              <RoastOutput roast={roast} />


              <div className="retry-wrap">
                <button onClick={() => setRoast('')} className="retry-btn">
                  Roast a different portfolio →
                </button>
              </div>
            </>
          )}
        </main>


        <footer className="ft">
          Built with React + Tailwind CSS · Powered by Groq AI
        </footer>
      </div>
    </div>
  )
}

export default App