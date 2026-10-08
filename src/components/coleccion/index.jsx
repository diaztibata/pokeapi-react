import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Coleccion() {
  const totalPokes = 1025;
  const [listaCapturados, setListaCapturados] = useState(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem('misNumeros') || '[]');
      return Array.isArray(guardados) ? [...new Set(guardados.map(Number))] : [];
    } catch {
      return [];
    }
  });
  const [pokemones, setPokemones] = useState([]);
  const [nuevos, setNuevos] = useState([]);
  const navigate = useNavigate();
  const espacio = Array.from({ length: totalPokes }, (_, i) => i + 1);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
      .then((respuesta) => respuesta.json())
      .then((datos) => setPokemones(datos.results))
      .catch((error) => console.error('Error al cargar Pokémon:', error));
  }, []);

  const capturarAleatorios = () => {
    const seleccionados = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * totalPokes) + 1
    );
    const vistos = new Set(listaCapturados);
    const resultados = seleccionados.map((id) => {
      const repetido = vistos.has(id);
      vistos.add(id);
      return { id, repetido };
    });
    const actualizados = [...vistos];

    setListaCapturados(actualizados);
    setNuevos(resultados);
    localStorage.setItem('misNumeros', JSON.stringify(actualizados));
  };

  return (
    <main className="coleccion">
      <h1 className="coleccion-titulo">Colección</h1>
      <p className="coleccion-contador">{listaCapturados.length} <span>/ {totalPokes}</span></p>
      <button
        className="coleccion-boton"
        onClick={capturarAleatorios}
        disabled={listaCapturados.length >= totalPokes}
      >
        4 nuevos
      </button>

      {nuevos.length > 0 && <h2 className="coleccion-subtitulo">Tus nuevos Pokémon</h2>}
      <section className="coleccion-nuevos">
        {nuevos.map(({ id, repetido }, indice) => (
          <div
            key={`${id}-${indice}`}
            className={repetido ? 'coleccion-nuevo repetido' : 'coleccion-nuevo'}
            onClick={() => navigate(`/pokemon/${id}`)}
          >
            <p>{id}</p>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={pokemones[id - 1]?.name || `Pokémon ${id}`}
              width="60"
              height="60"
            />
            <p>{pokemones[id - 1]?.name || ''}</p>
          </div>
        ))}
      </section>

      <section className="coleccion-album">
        {espacio.map((id) => {
          const capturado = listaCapturados.includes(id);
          return (
            <div
              key={id}
              className={capturado ? 'coleccion-pokemon capturado' : 'coleccion-pokemon'}
              onClick={() => capturado && navigate(`/pokemon/${id}`)}
            >
              {capturado && (
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  width="auto"
                  height="45"
                  loading="lazy"
                  alt={String(id)}
                />
              )}
              <p>{id}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Coleccion;
