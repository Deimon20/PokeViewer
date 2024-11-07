
// const mappedPokemonData = {
//     id: pokemonMockResponse.id,
//     name: pokemonMockResponse.name,
//     defaultSpriteURL: pokemonMockResponse.sprites.other['official-artwork'].front_default,
//     shinySpriteURL: pokemonMockResponse.sprites.other['official-artwork'].front_shiny,
//     typesArray: pokemonMockResponse.types,
//     weight: pokemonMockResponse.weight
// }

export  function getPokemonsData(genData) {
    const pokemonsResponse = genData.map(pokemonURL => {
            console.log(genData)
        })
     

    // const mappedPokemonData = await pokemonsResponse.map(pokemonData => {
    //     return {
    //         id: pokemonData.id,
    //         name: pokemonData.name,
    //         defaultSpriteURL: pokemonData.sprites.other['official-artwork'].front_default,
    //         shinySpriteURL: pokemonData.sprites.other['official-artwork'].front_shiny,
    //         typesArray: pokemonData.types,
    //         weight: pokemonData.weight
    //     }
    // })

    console.log(pokemonsResponse)
}