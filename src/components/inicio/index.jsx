import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import './style.css'

function Inicio() {

  const navigate = useNavigate();
  const [todoslospokes, setTodoslospokes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  
  let resultados = todoslospokes;

  if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = todoslospokes.filter(pokemon =>
      pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  }


      useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`)
      .then(response => response.json())
      .then(responseData => setTodoslospokes(responseData.results))
      .catch(error => console.error("Error:", error));
    }, []); 
    console.log(todoslospokes)

     if (todoslospokes.length === 0) {
    return <p>Cargando...</p>;
  }
  return (
    <>
        <input
        type="text"
        placeholder="Buscar Pokémon"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />
    <div className="c-lista">
    {resultados.map((pokemon) => (
      <div className='c-lista-pokemon'
       onClick={() => navigate(`/pokemon/${pokemon.name}`)}
      >
        <p>{pokemon.url.split("/")[6]}</p>
        <p key={pokemon.name}>{pokemon.name}</p>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split("/")[6]}.png`} 
          alt={`Pokémon ${pokemon.name}`} width='auto' height='60' loading='lazy'
        />
      </div>
    ))}
    </div></>
  )
}

export default Inicio