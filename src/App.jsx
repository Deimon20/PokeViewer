import { useEffect, useState } from 'react';
import './styles/App.css';




export function App(){

    const [selectedGen, setSelectedGen] = useState('1')
    const [getAllPokemonData, setAllPokemonData] = useState({})
    const POKE_API_GEN_LIST = 'https://pokeapi.co/api/v2/pokemon?limit='
    const POKE_API_POKE_LIST = 'https://pokeapi.co/api/v2/pokemon/'
    const genLimits = 
        {'1': 151, 
         '2': 251, 
         '3': 386,
         '4': 493,
         '5': 649,
         '6': 721,
         '7': 809,
         '8': 905,
         '9' : 1025}


// TODA LA X GENERACION PARTE DE OFFSET (LIMITE PREV GEN) HASTA (GEN VI - GEN V) = 72
// POR ENDE LA URL QUEDA https://pokeapi.co/api/v2/pokemon?limit=(ACT GEN - PREV GEN)&offset=(LIMITE PREV GEN)

    useEffect(() => {
        const getPokemonList = selectedGen !== '1' ? POKE_API_GEN_LIST + (genLimits[selectedGen] - genLimits[selectedGen-1]) + '&offset=' + genLimits[selectedGen-1] : POKE_API_GEN_LIST + genLimits[selectedGen] 
        fetch(getPokemonList)
        .then(response => response.json())
        .then(data => setAllPokemonData(data.results))
    }, [selectedGen])

    useEffect(() => {
        const pokemonData = getAllPokemonData
        const pokemonNames = Object.keys(pokemonData).map(index => {
            return pokemonData[index].name
        })
        
        fetch(POKE_API_POKE_LIST + pokemonNames[4])
        .then(response => response.json())
        .then(data => console.log(data.name, data.weight, data.sprites.other["official-artwork"].front_default))

       
    }, [getAllPokemonData])

    return (
        <main className="pk-wrapper">
            <header className="pk-logo">Logo</header>

            <select className='pk-gen-selector'
            value={selectedGen}
            onChange={e => setSelectedGen(e.target.value)} >
                <option value="1">GEN 1</option>
                <option value="2">GEN 2</option>
                <option value="3">GEN 3</option>
                <option value="4">GEN 4</option>
                <option value="5">GEN 5</option>
                <option value="6">GEN 6</option>
                <option value="7">GEN 7</option>
                <option value="8">GEN 8</option>
                <option value="9">GEN 9</option>
            </select>

            <section className="pk-display--layout">
            </section>

     
        </main>
    )
}