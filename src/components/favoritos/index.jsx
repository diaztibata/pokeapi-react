import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

function Favoritos() {
  const navigate = useNavigate();
  const [favoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos') || '[]');
    } catch {
      return [];
    }
  });

  return (
    <>
      <div className="c-lista">
        {favoritos.map((pokemon) => (
          <div
            key={pokemon.id}
            className="c-lista-pokemon"
            onClick={() => navigate(`/pokemon/${pokemon.nombre}`)}
          >
            <p>{pokemon.id}</p>
            <p>{pokemon.nombre}</p>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={`Pokémon ${pokemon.nombre}`}
              width="auto"
              height="60"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Favoritos
