const pokemonList = document.getElementById('pokemons')
const load = document.getElementById('loadMore')
const limit = 10
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

load.addEventListener('click', () => 
{ 
    offset += limit
    const nextPage = offset + limit
    if(nextPage >= maxFatch) 
    {
        const newLimit = maxFatch - offset
        loadMorePokemons(offset,newLimit)
        load.parentElement.removeChild(load) 
    }
    else  loadMorePokemons(offset,limit)})

