
class Pokemon {
    number
    name
    types = []
    photo
}

class Card {
    abilities = []
    height
    weight
    group = []
    stats = []
}

const pokeApi = {}

pokeApi.convertPokeApiToPokemon = (fromPokeApi) =>
{
   
    const pokemon = new Pokemon()
    pokemon.number = fromPokeApi.id
    pokemon.name = fromPokeApi.name
    pokemon.types = fromPokeApi.types.map((pokeApiSlot) => pokeApiSlot.type.name)
    pokemon.photo = fromPokeApi.sprites.other.dream_world.front_default
    return pokemon
}

pokeApi.getDetails = (url) => 
{
    return fetch(url)
    .then((response) =>  {  if (!response.ok) { throw new Error(`ocorreu erro: ${response.status}`)}
        else { return response.json() }})
    .then(pokeApi.convertPokeApiToPokemon)
    .catch((error) => console.error(error.message))
}


pokeApi.getPokemons = (offset=0,limit=10) => 
{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((responseBody) => responseBody.results)
    .then((resultsUrl) => Promise.all(resultsUrl.map((pokemons) => pokeApi.getDetails(pokemons.url))))
    .then((pokemonDetail) => pokemonDetail)
    .catch((error) => console.error(error.message))
}


pokeApi.getSpecifPokemon = async (requestPage) => 
{
    const getSpecifDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${requestPage}`)

    if (getSpecifDetails.ok)
    {const responsejson = await getSpecifDetails.json()
    const convert = await  pokeApi.convertPokeApiToPokemon(responsejson)
    return convert
    }
    else {
        throw new Error (`erro na requisição ${getSpecifDetails.status}`)
    }
}

pokeApi.convertPokeApiToCard = async (fromPokeApi) => {
    const card = new Card();

    card.abilities = fromPokeApi.abilities.map((ability) => ability.ability.name);
    card.height = fromPokeApi.height;
    card.weight = fromPokeApi.weight;
    card.stats = fromPokeApi.stats.map((stats) => stats.base_stat);

    try {

        const getGroupEgg = await fetch (fromPokeApi.species.url)
        const resultGroup = await getGroupEgg.json()
        const listEggGroups = await resultGroup.egg_groups
        const nameOfGroup = await listEggGroups.map((group) => group.name)

        card.group = nameOfGroup

    } catch (error) {
        console.error('Erro ao obter informações de evolução:', error);
    }

    return card
}



pokeApi.getEvolutions = async (pokemon) => {
    try {
        const getChainEvolution = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemon}`)
        const response = await getChainEvolution.json()
        let evolutionPokemon = []

        
        if (!response) {
            throw new Error('Cadeia de evolução não encontrada.')
        }

        
        if (response.chain.evolves_to.length > 0) {
            const nextEvolution = response.chain.evolves_to[0]

       
            if (nextEvolution.species && nextEvolution.species.name) {
                evolutionPokemon.push(nextEvolution.species.name)
                const nextNextEvolution = nextEvolution.evolves_to[0]
                evolutionPokemon.push(nextNextEvolution.species.name)
                return evolutionPokemon
            } else {
                throw new Error('Nome da espécie não encontrado na evolução.')
            }
        } 
        else {
            throw new Error('Nenhuma evolução encontrada na cadeia.')
        }
    } 
    catch (error) {
        console.error('Erro ao obter informações de evolução:', error)
        throw error
    }
}



pokeApi.getDetaillsfromPokeApi = async (thisPokemon) => {

    const getSpecifDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${thisPokemon}`)
    
    if (getSpecifDetails.ok) 
    {
        const responsejson = await getSpecifDetails.json()
        const convert = await pokeApi.convertPokeApiToCard(responsejson)
        return convert
    }
    else 
    {
        throw new Error (`erro na requisição ${getSpecifDetails.status}`)
    }

}



