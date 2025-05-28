import Link from 'next/link'

async function getPokemon(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function PokemonDetail({ params }) {
  const pokemon = await getPokemon(params.id)

  if (!pokemon) return <div style={{ padding: 20 }}><p>❌ Pokémon not found.</p></div>

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1 style={{ textTransform: 'capitalize' }}>
        #{pokemon.order} - {pokemon.name}
      </h1>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ border: '1px solid #ddd', padding: 10, borderRadius: 10 }}
      />

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Height:</strong> {pokemon.height}</p>
        {/* <p><strong>Default Pokémon:</strong> {pokemon.is_default ? '✅ Yes' : '❌ No'}</p> */}
        {/* <p>
          <strong>Location Encounters:</strong>{' '}
          <a
            href={pokemon.location_area_encounters}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            View Locations
          </a>
        </p> */}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h3>🧪 Types:</h3>
        <ul>
          {pokemon.types.map(t => (
            <li key={t.slot}>{t.type.name}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h3>📊 Stats:</h3>
        <ul>
          {pokemon.stats.map(stat => (
            <li key={stat.stat.name}>
              <strong>{stat.stat.name}:</strong> {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link href={`/pokemon/${pokemon.id - 1}`}>
          <button disabled={pokemon.id <= 1} style={{ marginRight: 10 }}>
            ⬅️ Previous
          </button>
        </Link>
        <Link href={`/pokemon/${pokemon.id + 1}`}>
          <button>Next ➡️</button>
        </Link>
      </div>
    </div>
  )
}
