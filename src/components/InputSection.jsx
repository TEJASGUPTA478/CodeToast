// InputSection.jsx - Handles user input and API call to get the roast
// User can either paste a URL or type a description of their portfolio
// When they click "Toast Me", it sends the data to Groq's LLM API

import { useState } from 'react'

// read API key from .env file (VITE_ prefix makes it available in browser)
const API_KEY = import.meta.env.VITE_GROQ_API_KEY

// Groq uses an OpenAI-compatible endpoint
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

export default function InputSection({ setRoast, setLoading, setError }) {
  // what the user typed in the input field
  const [input, setInput] = useState('')

  // toggle between URL mode and description mode
  const [mode, setMode] = useState('url')

  // called when user clicks the "Toast Me" button
  const handleRoast = async () => {
    // don't do anything if input is empty
    if (!input.trim()) {
      setError('Please enter a portfolio URL or description first.')
      return
    }

    // clear previous results and start loading
    setError('')
    setRoast('')
    setLoading(true)

    // build the prompt based on which mode is selected
    let prompt = ''
    if (mode === 'url') {
      prompt = `Here is someone's portfolio website URL: ${input}

Roast this portfolio brutally but in a funny, constructive way. Tear apart the design choices, project descriptions, skill claims, and overall presentation. Be savage but helpful. Point out clichés, overused patterns, and things that make hiring managers cringe. Use humor, sarcasm, and wit. End with one genuinely useful piece of advice. Max 300 words.`
    } else {
      prompt = `Here is someone describing their portfolio: "${input}"

Based on this description, roast this portfolio brutally but in a funny, constructive way. Tear apart the design choices, project descriptions, skill claims, and overall presentation. Be savage but helpful. Point out clichés, overused patterns, and things that make hiring managers cringe. Use humor, sarcasm, and wit. End with one genuinely useful piece of advice. Max 300 words.`
    }

    try {
      // send the request to Groq's API
      const response = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',  // the AI model we're using
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
          temperature: 0.9,             // higher = more creative responses
          max_completion_tokens: 1024,   // limit response length
        }),
      })

      // if the API returned an error status, throw it
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw {
          status: response.status,
          message: errorData?.error?.message || response.statusText,
        }
      }

      // parse the JSON response and grab the text
      const data = await response.json()
      const text = data.choices[0].message.content

      if (!text) {
        throw { message: 'No response text received from Groq.' }
      }

      // send the roast text back to App
      setRoast(text)

    } catch (err) {
      // handle different error types with friendly messages
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
      // always stop the loading spinner, whether success or failure
      setLoading(false)
    }
  }

  // let user press Enter to submit when in URL mode
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && mode === 'url') {
      e.preventDefault()
      handleRoast()
    }
  }

  return (
    <div className="inp-wrap">

      {/* tabs to switch between URL input and text description */}
      <div className="tabs">
        <button
          onClick={() => { setMode('url'); setInput('') }}
          className={`tab ${mode === 'url' ? 'tab--on' : ''}`}
        >
          🌐 Portfolio URL
        </button>
        <button
          onClick={() => { setMode('description'); setInput('') }}
          className={`tab ${mode === 'description' ? 'tab--on' : ''}`}
        >
          📝 Describe It
        </button>
      </div>

      {/* show either a URL input or a textarea based on selected mode */}
      {mode === 'url' ? (
        <input
          type="url"
          placeholder="https://yourportfolio.com"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="url-inp"
        />
      ) : (
        <textarea
          placeholder="I have a portfolio with 3 React projects, a skills section listing 47 technologies I barely know, a giant hero section that says 'Hi, I'm a passionate developer', and a contact form that goes nowhere..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          className="desc-inp"
        />
      )}

      {/* main submit button */}
      <button onClick={handleRoast} className="roast-btn">
        <span>Roast Me</span>
      </button>

      {/* small disclaimer at the bottom */}
      <p className="note">
        Powered by Groq AI · All roasts are AI-generated · Don't cry, improve.
      </p>
    </div>
  )
}