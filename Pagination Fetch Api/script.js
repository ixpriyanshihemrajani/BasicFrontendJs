const pokemonList = document.getElementById('pokemon-list');
const pagination = document.getElementById('pagination');
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const itemsPerPage = 10;
const placeholderImageUrl = 'https://www.vectorstock.com/royalty-free-vector/game-pokeball-outline-icon-pokemon-container-vector-44821202';
const pokemonSymbolUrl = 'https://www.vectorstock.com/royalty-free-vector/game-pokeball-outline-icon-pokemon-container-vector-44821202';
 
let currentPage = 1;
 
async function fetchPokemonData(page) {
    try {
        const response = await fetch(`${apiUrl}?offset=${(page - 1) * itemsPerPage}&limit=${itemsPerPage}`);
        const data = await response.json();
        const detailedData = await Promise.all(data.results.map(pokemon => fetchPokemonDetails(pokemon.url)));
        displayPokemon(detailedData);
        displayPagination(data.count);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
 
async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching details:', error);
    }
}
 
function displayPokemon(pokemonArray) {
    pokemonList.innerHTML = '';
    pokemonArray.forEach(pokemon => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
<h3> ${pokemon.name}</h3>
<img src="${pokemon.sprites.front_default || placeholderImageUrl}" alt="${pokemon.name}" onerror="this.src='${pokemonSymbolUrl}'; this.alt='Pokémon Symbol';">
            <p>Height: ${pokemon.height} dm</p>
            <p>Weight: ${pokemon.weight / 10} kg</p>
            <p>Base Experience: ${pokemon.base_experience}</p>
Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
Moves: ${pokemon.moves.map(move => move.move.name).join(', ')}</p>
        `;
        pokemonList.appendChild(card);
    });
}
 
function displayPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
 
    pagination.innerHTML = '';
    const buttonsToShow = 3; // Show three buttons: Previous, Current, Next
 
    if (currentPage > 1) {
        addButton('First', 1);
        addButton('Previous', currentPage - 1);
    }
 
    for (let i = Math.max(1, currentPage - buttonsToShow + 1); i <= Math.min(totalPages, currentPage + buttonsToShow - 1); i++) {
        addButton(i.toString(), i);
    }
 
    if (currentPage < totalPages) {
        addButton('Next', currentPage + 1);
        addButton('Last', totalPages);
    }
}
 
function addButton(text, page) {
    const button = document.createElement('button');
    button.className = 'pagination-button';
    button.innerText = text;
    button.addEventListener('click', () => {
        currentPage = page;
        fetchPokemonData(currentPage);
    });
    pagination.appendChild(button);
}
 
fetchPokemonData(currentPage);