import { useParams } from "react-router-dom"; 
import { useState, useEffect } from 'react'
import './style.css'

function Pokemon() {
    const { name } = useParams(); 
    const [datapoke, setDatapoke] = useState([]);
    const [favoritos, setFavoritos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('favoritos') || '[]');
        } catch {
            return [];
        }
    });
    const esFavorito = favoritos.some(p => p.id === datapoke.id);


    useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(responseData => setDatapoke(responseData))
      .catch(error => console.error("Error:", error));
    }, [name]); 

    const toggleFavorito = () => {
        let nuevosFavoritos;
        if (esFavorito) {
        nuevosFavoritos = favoritos.filter(p => p.id !== datapoke.id);
        } else {
        nuevosFavoritos = [...favoritos, { id: datapoke.id, nombre: datapoke.name }];
        }
        setFavoritos(nuevosFavoritos);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    };
    
    if (!datapoke || !datapoke.id) return <p>Cargando...</p>;
    return (
        <div>
        <p>{datapoke.id}</p>
        <h1>{datapoke.name}</h1>
        <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datapoke.id}.png`} 
            alt={datapoke.name} 
            width="200"
        />

        <p>{datapoke.id}</p>
        <p>Altura: {datapoke.height/ 10} m / Peso: {datapoke.weight/ 10} kg</p>

        <p>hp: {datapoke.stats[0].base_stat}</p>
        <p>Velocidad: {datapoke.stats[5].base_stat}</p>
        <p>Ataque: {datapoke.stats[1].base_stat} Defensa: {datapoke.stats[2].base_stat}</p>
        <p>Ataque Especial: {datapoke.stats[3].base_stat} Defensa Especial: {datapoke.stats[4].base_stat}</p>


            <button onClick={toggleFavorito}>
            {esFavorito ? '❤️' : '🤍'}
            </button>
        </div>
    )
}

export default Pokemon
