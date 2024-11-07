import { useEffect, useState } from 'react';
import { GenButton } from './components/GenButton';
import { PokeCard } from './components/PokeCard';
import './styles/App.css';

    //         id: pokemonData.id,
    //         name: pokemonData.name,
    //         defaultSpriteURL: pokemonData.sprites.other['official-artwork'].front_default,
    //         shinySpriteURL: pokemonData.sprites.other['official-artwork'].front_shiny,
    //         typesArray: pokemonData.types,
    //         weight: pokemonData.weight

async function getPokemonsURL(genStatus) {
  const POKE_API_GEN_LIST = 'https://pokeapi.co/api/v2/pokemon?limit=';
  const GEN_LIMITS_AND_OFFSETS = {
    '1': {totalPokemon: 151, offset: 0},
    '2': {totalPokemon: 100, offset: 151},
    '3': {totalPokemon: 135, offset: 251},
    '4': {totalPokemon: 107, offset: 386},
    '5': {totalPokemon: 156, offset: 493},
    '6': {totalPokemon: 72, offset: 649},
    '7': {totalPokemon: 88, offset: 721},
    '8': {totalPokemon: 96, offset: 809},
    '9': {totalPokemon: 120, offset: 905},
  };
  const results = [];

  for (let i = 0; i < genStatus.length; i++) {
    if (genStatus[i] === true) {
      try {
        const url = `${POKE_API_GEN_LIST}${GEN_LIMITS_AND_OFFSETS[i + 1].totalPokemon}&offset=${GEN_LIMITS_AND_OFFSETS[i + 1].offset}`;
        const response = await fetch(url);
        const data = await response.json();
        results.push(...data.results.map(pokemon => pokemon.url));
      } catch (err) {
        console.error('getPokemonsURL', err);
      }
    }
  }

  return results;
}

async function getPokemonsData(pokemonsURL) {
  const results = [];

  for (let i = 0; i < pokemonsURL.length; i++) {
    try {
      const response = await fetch(pokemonsURL[i]);
      const data = await response.json();
      results.push(data);
    } catch (err) {
      console.error('getPokemonsData', err);
    }
  }

  return results;
}

export function App() {
  const [generationStatus, setGenerationStatus] = useState([true, false, false, false, false, false, false, false, false]);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const urls = await getPokemonsURL(generationStatus);
      const data = await getPokemonsData(urls);
      setPokemonData(data);
    }

    fetchData();
  }, [generationStatus]);

  function handleClick(event) {
    const genNumber = event.target.getAttribute('data-gen');
    const newGensArray = [...generationStatus];
    newGensArray[genNumber - 1] = !newGensArray[genNumber - 1];

    if (newGensArray.every(gen => gen === false)) {
      return;
    }

    event.target.classList.toggle('selected');
    setGenerationStatus(newGensArray);
  }

  return (
    <div className="pk-wrapper">
      <header className="pk-logo">Logo</header>
      <main>
        <section className="pk-gen-selector__layout">
          {generationStatus.map((value, i) => (
            <GenButton key={i} genNumber={i + 1} isSelected={value} onClick={handleClick} />
          ))}
        </section>
        
        <section className="pk-display__layout">
          {pokemonData.map((pokemon, index) => (
            <PokeCard 
              key={index} 
              name={pokemon.name}
              id={pokemon.id}
              defaultIMG={pokemon.sprites.other['official-artwork'].front_default}
              shinyIMG={pokemon.sprites.other['official-artwork'].front_shiny}
              types={pokemon.types}
              weight={pokemon.weight} 
              />
          ))}
        </section>
      </main>
    </div>
  );
}