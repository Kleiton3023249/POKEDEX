class Pokemon {
    number
    name
    types = []
    photo
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

//para usar na barra de pesquisa:
pokeApi.searchPokemon = () => {
    const url = 'https://pokeapi.co/api/v2/pokemon'
    return fetch(url)
    .then((response) => response.json())
    .then((responseBody) => responseBody.results)
    .then((resultsUrl) => pokeApi.getDetail(resultsUrl.url))
}