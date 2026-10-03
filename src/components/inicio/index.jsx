import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function Inicio() {
  const [todoslospokes, setTodoslospokes] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [tipopoke, setTipopoke] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    const cargarPokemons = async () => {
      try {
        if (tipopoke === 'All') {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
          const responseData = await response.json()
          setTodoslospokes(responseData.results ?? [])
          return
        }

        const response = await fetch(`https://pokeapi.co/api/v2/type/${tipopoke}`)
        const responseData = await response.json()
        const mascotas = responseData.pokemon?.map((entry) => entry.pokemon) ?? []
        setTodoslospokes(mascotas)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    cargarPokemons()
  }, [tipopoke])

  const resultados = busqueda.trim().length >= 3 && isNaN(busqueda)
    ? todoslospokes.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
      )
    : todoslospokes

  const tipos = [
    'All',
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric',
    'psychic', 'ice', 'dragon', 'dark', 'fairy', 'stellar', 'shadow', 'unknown'
  ]

  if (todoslospokes.length === 0) return <p>Cargando...</p>
  if (resultados.length === 0) return <p>No se encontraron Pokémon.</p>

  return (
    <>
      <div className="c-filtro">
        {tipos.map((unTipo, index) => (
          <button type="button" key={index} onClick={() => setTipopoke(unTipo)}>
            {unTipo}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      {resultados.map((pokemon) => (
        <div key={pokemon.name} onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
          <p>{pokemon.url.split('/')[6]}</p>
          <p>{pokemon.name}</p>

          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`}
            alt={`Pokémon ${pokemon.name}`}
            width="auto"
            height="60"
            loading="lazy"
          />
        </div>
      ))}
    </>
  )
}

export default Inicio