import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchInitialCount = async () => {
            try {
                setLoading(true)
                const response = await fetch('http://localhost:8000/count') // Adjust port if needed

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                setCount(data.count) // Assuming your API returns { count: number }
                setError(null)
            } catch (err) {
                console.error('Failed to fetch initial count:', err)
                setError(err.message)
                // Keep count at 0 as fallback
            } finally {
                setLoading(false)
            }
        }

        fetchInitialCount()
    }, []) // Empty dependency array means this runs once on mount

    if (loading) {
        return <div>Loading initial count...</div>
    }

    if (error) {
        return (
            <div>
                <p>Error loading count: {error}</p>
                <p>Using default value of 0</p>
            </div>
        )
    }

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
