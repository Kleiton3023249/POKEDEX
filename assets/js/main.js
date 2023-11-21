const pokemonList = document.getElementById('pokemons')


const convertPokemonToHtml = (pokemon) => {
    
    return `<li class="${pokemon.types[0]}">
    <span class="number">${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
            <img src=${pokemon.photo} alt=${pokemon.name}>
            
        <ol class="types"> 
        ${pokemon.types.map((typeName) => `<li class="type">${typeName}</li>`).join('')}
        </ol>
    </div>

    </li>`
}


pokeApi.getPokemons().then((pokemons) => {
    const newList = pokemons.map((convertPokemonToHtml)).join('')
    pokemonList.innerHTML = newList
})

