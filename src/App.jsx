import { useEffect, useState } from "react"

export function App(){
   const [pokeInfo, setPokeInfo] = useState('')
   const id = 4
   
   useEffect(()=>{
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => setPokeInfo(data.name))
      
   }, [])

   return(
      <main>
         <h1>POKEMON</h1>
         <div>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} width={400}/>
            <h2>{pokeInfo}</h2>
         </div>
      </main>
   )
}