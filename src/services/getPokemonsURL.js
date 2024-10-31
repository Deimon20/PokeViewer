const POKE_API_GEN_LIST = 'https://pokeapi.co/api/v2/pokemon?limit='
const POKE_API_POKE_LIST = 'https://pokeapi.co/api/v2/pokemon/'

const GEN_LIMITS_AND_OFFSETS = 
{
    '1': {totalPokemon: 151, offset: 0},
    '2': {totalPokemon: 100, offset: 151},
    '3': {totalPokemon: 135, offset: 251},
    '4': {totalPokemon: 107, offset: 386},
    '5': {totalPokemon: 156, offset: 493},
    '6': {totalPokemon: 72, offset: 649},
    '7': {totalPokemon: 88, offset: 721},
    '8': {totalPokemon: 96, offset: 809},
    '9': {totalPokemon: 120, offset: 905},
}

export async function getPokemonsURL(genList){
    let genResults = []

    const genResponse = await Promise.all(
        genList.map((gen,i) => {
            if (gen){
                const url =  POKE_API_GEN_LIST + GEN_LIMITS_AND_OFFSETS[i + 1].totalPokemon
                             + '&offset=' + GEN_LIMITS_AND_OFFSETS[i + 1].offset

                return fetch(url).then(res => res.json())
            }

            return Promise.resolve(undefined)
        })
    )

    genResults = await genResponse.filter(res => res !== undefined).map(result => {
        return result.results.map(pokemon => pokemon.url)
    })

    return genResults
}