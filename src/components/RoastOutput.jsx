import { useState } from 'react'

export default function RoastOutput({ roast }) {

  const [copied, setCopied] = useState(false)


  const handleCopy = () => {
    navigator.clipboard.writeText(roast)
    setCopied(true)


    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="result">
      <div className="result-card">


        <div className="result-top">
          <div className="result-label">
            <span>🍞</span>
            <h2>The Roast</h2>
          </div>


          <button onClick={handleCopy} className="copy-btn">
            {copied ? (
              <>

                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="copied-txt">Copied!</span>
              </>
            ) : (
              <>

                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>


        <div className="divider" />


        <p className="roast-txt">{roast}</p>
      </div>
    </div>
  )
}
