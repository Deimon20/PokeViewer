import { useEffect, useState } from "react";

export function App() {
  const [pokeInfo, setPokeInfo] = useState(null);
  const [pokeName, setPokeName] = useState("");
  const [pokeTypes, setPokeTypes] = useState([]);
  const [pokeWeight, setPokeWeight] = useState(0)
  const pokeID = 908;




  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
        const data = await response.json();
        setPokeInfo(data);
        setPokeName(data.name);
        const types = data.types.map((tipo) => tipo.type.name);
        setPokeTypes(types);
        setPokeWeight(data.weight/10)



      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [pokeID]);


  return (
    <main>
      <h1>POKEVIEW</h1>
      <div className="pokemon-container">
         
        <div className="pokemon-card">
          <span>{pokeID}</span>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeID}.png`}
            alt={`Pokemon ${pokeName}`}
            width={400}
          />
          <p className="pokemon-name">{pokeName.charAt(0).toUpperCase() + pokeName.slice(1)}</p>
          <p>{pokeWeight} KG</p>
          <div className="pokemon-types-container">
            {pokeTypes.map((type) => (
               <img src={`../src/types-img/${type}.png`} alt={type} width="100px"/>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}



