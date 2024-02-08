const pokemonList = document.getElementById('pokemon-list');
const pagination = document.getElementById('pagination');
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const itemsPerPage = 10;
 
let currentPage = 1;
 
async function fetchPokemonData(page) {
    
        const response = await fetch(`${apiUrl}?offset=${(page - 1) * itemsPerPage}&limit=${itemsPerPage}`);
        const data = await response.json();
        displayPokemon(data.results);
        displayPagination(data.count);
    
}
 
function displayPokemon(pokemonArray) {
    pokemonList.innerHTML = '';
    pokemonArray.forEach(pokemon => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
              <h3>${pokemon.name}</h3>`;
        pokemonList.appendChild(card);
    });
}
 
function displayPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
 
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = 'pagination-button';
        button.innerText = i;
        button.addEventListener('click', () => {
            currentPage = i;
            fetchPokemonData(currentPage);
        });
        pagination.appendChild(button);
    }
}
 
fetchPokemonData(currentPage);