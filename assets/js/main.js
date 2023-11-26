const pokemonList = document.getElementById('pokemons')
const load = document.getElementById('loadMore')
const less = document.getElementById('loadLess')
let search = document.getElementById('searchPokemon').value
let limit = 10
let offset = 0
const maxFatch = 135


function loadMorePokemons (offset,limit)
    {pokeApi.getPokemons(offset,limit).then((pokemons) => {
    const newList = pokemons.map((pokemon) =>  
        {return `<li class="${pokemon.types[0]}">
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
                <img src=${pokemon.photo} alt=${pokemon.name}>
                
            <ol class="types"> 
            ${pokemon.types.map((typeName) => `<li class="type">${typeName}</li>`).join('')}
            </ol>
        </div>
        </li>`}).join('')
    pokemonList.innerHTML += newList
    })}

loadMorePokemons()
less.style.display = 'none'

load.addEventListener('click', () => 
{ 
    less.style.display = 'block'
    offset += limit
    const nextPage = offset + limit
    if(nextPage >= maxFatch) 
    {
        const newLimit = maxFatch - offset
        loadMorePokemons(offset,newLimit)
        load.style.display = 'none' 
    }
    else  loadMorePokemons(offset,limit)})


function loadLessPokemons (offset,limit)
{
    pokeApi.getPokemons(offset,limit).then((pokemons) => {
    const newList = pokemons.map((pokemon) =>  
        {return `<li class="${pokemon.types[0]}">
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
                <img src=${pokemon.photo} alt=${pokemon.name}>
                
            <ol class="types"> 
            ${pokemon.types.map((typeName) => `<li class="type">${typeName}</li>`).join('')}
            </ol>
        </div>
        </li>`}).join('')
    pokemonList.innerHTML = newList
    })}

less.addEventListener('click', () => {
    const cardsForPage = offset + limit
    const newOffset = 0
    let newLimit = cardsForPage - limit
    offset = offset - limit

    if(newLimit !== 10)
    {   
    load.style.display = 'block'
    return loadLessPokemons(newOffset,newLimit)
    }
    else if (newLimit === 10){
        less.style.display = 'none' 
        return loadLessPokemons(newOffset,newLimit)
    }
})

/*function searchItem (value) {
    pokeApi.searchPokemon().then((pokemons) =>
    {
    value = search
    const result = pokemons.map((value) => {
        return `<li class="${value.types[0]}">
        <span class="number">${value.number}</span>
        <span class="name">${value.name}</span>
        <div class="detail">
                <img src=${value.photo} alt=${value.name}>
                
            <ol class="types"> 
            ${value.types.map((typeName) => `<li class="type">${typeName}</li>`).join('')}
            </ol>
        </div>
        </li>`}).join('')
    })
    } */
    