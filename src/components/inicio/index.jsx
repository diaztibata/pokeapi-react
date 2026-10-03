import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import './style.css'

function Inicio() {

  const navigate = useNavigate();
  const [todoslospokes, setTodoslospokes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [untipo, setUntipo] = useState('All');

  const tipos = [
    "All",
    "normal", "fighting", "flying", "poison", "ground", "rock",
    "bug", "ghost", "steel", "fire", "water", "grass", "electric",
    "psychic", "ice", "dragon", "dark", "fairy", "stellar", "shadow", "unknown"
  ];

  let resultados = todoslospokes;

  if (busqueda.trim().length >= 3 && isNaN(busqueda)) {
    resultados = todoslospokes.filter(pokemon =>
      pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  useEffect(() => {
    if (untipo === 'All') {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
        .then(response => response.json())
        .then(responseData => setTodoslospokes(responseData.results))
        .catch(error => console.error('Error:', error));
      return;
    }

    fetch(`https://pokeapi.co/api/v2/type/${untipo}`)
      .then(response => response.json())
      .then(responseData => {
        const mascotas = responseData.pokemon?.map(entry => entry.pokemon) ?? [];
        setTodoslospokes(mascotas);
      })
      .catch(error => console.error('Error:', error));
  }, [untipo]);

  if (todoslospokes.length === 0) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div className="c-filtro">
        {tipos.map((unTipo, index) => (
          <button type="button" className='' key={index} onClick={() => setUntipo(unTipo)}>
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

      <div className="c-lista">
        {resultados.map((pokemon) => (
          <div className='c-lista-pokemon' key={pokemon.name} onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
            <p>{pokemon.url.split('/')[6]}</p>
            <p>{pokemon.name}</p>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`}
              alt={`Pokémon ${pokemon.name}`}
              width='auto'
              height='60'
              loading='lazy'
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Inicio