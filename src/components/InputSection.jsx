import { useState } from 'react'

const API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

export default function InputSection({ setRoast, setLoading, setError }) {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('url') // 'url' or 'description'

  const handleRoast = async () => {
    if (!input.trim()) {
      setError('Please enter a portfolio URL or description first.')
      return
    }

    setError('')
    setRoast('')
    setLoading(true)

    const prompt =
      mode === 'url'
        ? `Here is someone's portfolio website URL: ${input}

Roast this portfolio brutally but in a funny, constructive way. Tear apart the design choices, project descriptions, skill claims, and overall presentation. Be savage but helpful. Point out clichés, overused patterns, and things that make hiring managers cringe. Use humor, sarcasm, and wit. End with one genuinely useful piece of advice. Max 300 words.`
        : `Here is someone describing their portfolio: "${input}"

Based on this description, roast this portfolio brutally but in a funny, constructive way. Tear apart the design choices, project descriptions, skill claims, and overall presentation. Be savage but helpful. Point out clichés, overused patterns, and things that make hiring managers cringe. Use humor, sarcasm, and wit. End with one genuinely useful piece of advice. Max 300 words.`

    try {
      const response = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'You are a savage, funny, and constructive portfolio roaster. Your goal is to roast portfolios with humor and sarcasm while providing one useful piece of advice at the end.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.9,
          max_completion_tokens: 1024,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw {
          status: response.status,
          message: errorData?.error?.message || response.statusText,
        }
      }

      const data = await response.json()
      const text = data.choices?.[0]?.message?.content

      if (!text) {
        throw { message: 'No response text received from Groq.' }
      }

      setRoast(text)
    } catch (err) {
      console.error('API Error:', err)
      if (err.status === 400) {
        setError('Bad request — check if your API key or model is valid.')
      } else if (err.status === 401) {
        setError('API key is invalid. Get one at console.groq.com')
      } else if (err.status === 429) {
        setError('Rate limited! Wait a moment and try again.')
      } else {
        setError(err.message || 'Something went wrong. Check the console for details.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && mode === 'url') {
      e.preventDefault()
      handleRoast()
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Mode Toggle */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => { setMode('url'); setInput('') }}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${mode === 'url'
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
              : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
            }`}
        >
          🌐 Portfolio URL
        </button>
        <button
          onClick={() => { setMode('description'); setInput('') }}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${mode === 'description'
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
              : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
            }`}
        >
          📝 Describe It
        </button>
      </div>

      {/* Input */}
      {mode === 'url' ? (
        <input
          type="url"
          placeholder="https://yourportfolio.com"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-gray-900/80 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-base"
        />
      ) : (
        <textarea
          placeholder="I have a portfolio with 3 React projects, a skills section listing 47 technologies I barely know, a giant hero section that says 'Hi, I'm a passionate developer', and a contact form that goes nowhere..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          className="w-full bg-gray-900/80 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none text-base"
        />
      )}

      {/* Roast Button */}
      <button
        onClick={handleRoast}
        className="group relative w-full overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 active:scale-[0.98] text-white font-bold py-4 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 cursor-pointer"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          🔥 Roast Me
        </span>
      </button>

      {/* Disclaimer */}
      <p className="text-center text-gray-600 text-xs">
        Powered by Groq AI · All roasts are AI-generated · Don't cry, improve.
      </p>
    </div>
  )
}
