const pokemonList = document.getElementById('pokemons')
const load = document.getElementById('loadMore')
const less = document.getElementById('loadLess')
let requestPage = document.querySelector('#searchPokemon')
const search = document.getElementById('giveMeAnswer')
const section = document.querySelector('.content')
const largePage = window.innerWidth
let limit = 10
let offset = 0
const maxFatch = 135


function loadMorePokemons (offset,limit)
    {pokeApi.getPokemons(offset,limit).then((pokemons) => {
    const newList = pokemons.map((pokemon) =>  
        {return `<li class="${pokemon.types[0]}">
        <img id="backCircle"src="assets/img/circulo.svg" alt="circle">
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
    const backPage = pokemons.map((pokemon) =>  
        {return `<li class="${pokemon.types[0]}">
        <img id="backCircle"src="assets/img/circulo.svg" alt="circle">
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
                <img src=${pokemon.photo} alt=${pokemon.name}>
                
            <ol class="types"> 
            ${pokemon.types.map((typeName) => `<li class="type">${typeName}</li>`).join('')}
            </ol>
        </div>
        </li>`}).join('')
    pokemonList.innerHTML = backPage
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


function searchPokemon (requestPage) 
   { pokeApi.getSpecifPokemon(requestPage)
    .then ((pokemon) => 
        {if (pokemon.number <= 135) {
            const gotPage =`<li class="${pokemon.types[0]}">
            <img id="backCircle"src="assets/img/circulo.svg" alt="circle">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                    <img src=${pokemon.photo} alt=${pokemon.name}>
                    
                <ol class="types"> 
                ${pokemon.types.map((typeName) => `<li class="type">${typeName}</li>`).join('')}
                </ol>
            </div>
            </li>`

            return pokemonList.innerHTML = gotPage
        }
        else { const unreachable = 'Desculpe, essa Pokedex contém apenas Pokemons da primeira geração.'
            return pokemonList.innerHTML = unreachable
        }
        })
   }

search.addEventListener('click', () => {
    
    let input = requestPage.value.toLowerCase()
    if (input !== '')
    {
        if (largePage <= 499) {
            section.style.margin = '1rem'
        }
        load.style.display = 'none'
    return searchPokemon(input)}
})
            

    