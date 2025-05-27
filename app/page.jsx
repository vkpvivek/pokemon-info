'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [pokemonList, setPokemonList] = useState([])
  const [selected, setSelected] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      .then(res => res.json())
      .then(data => setPokemonList(data.results))
  }, [])

  const handleSearch = () => {
    if (selected) router.push(`/pokemon/${selected.toLowerCase()}`)
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🔍 Pokémon Info App</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name or ID"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem', width: 200 }}
        />
        <button onClick={handleSearch} style={{ padding: '0.5rem 1rem' }}>
          Search
        </button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: 10 }}>📜 Select from list:</label>
        <select
          onChange={(e) => router.push(`/pokemon/${e.target.value}`)}
          defaultValue=""
          style={{ padding: '0.5rem' }}
        >
          <option value="" disabled>-- Choose a Pokémon --</option>
          {pokemonList.map((poke, i) => (
            <option key={i} value={poke.name}>
              {poke.name}
            </option>
          ))}
        </select>
      </div>
    </main>
  )
}
