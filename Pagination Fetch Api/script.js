const pokemonList = document.getElementById('pokemon-list');
const pagination = document.getElementById('pagination');
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const itemsPerPage = 10;
const placeholderImageUrl = 'https://www.freepnglogos.com/images/pokemon-logo-png-1447.html';
const pokemonSymbolUrl = 'https://www.freepnglogos.com/images/pokemon-logo-png-1447.html';
const spinnerUrl = 'https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif'; 

let currentPage = 1;

async function fetchPokemonData(page) {
    try {
        
        
        
        const response = await fetch(`${apiUrl}?offset=${(page - 1) * itemsPerPage}&limit=${itemsPerPage}`);
        
        
        if (response.status==200|201) {
            const data = await response.json();
            const detailedData = await Promise.all(data.results.map(pokemon => fetchPokemonDetails(pokemon.url)));
            displayPokemon(detailedData);
            displayPagination(data.count);
        } else {
           
            console.error('Error fetching data:', response.statusText);
        }
        
       
        hideSpinner();
    } catch (error) {
        console.error('Error fetching data:', error);
        
        hideSpinner();
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

function showSpinner() {
    const spinner = document.createElement('div');
    spinner.style.position = 'fixed';
    spinner.style.top = '0';
    spinner.style.left = '0';
    spinner.style.width = '100%';
    spinner.style.height = '100%';
    spinner.style.background = 'rgba(255, 255, 255, 0.8) url(' + spinnerUrl + ') no-repeat center';
    spinner.style.zIndex = '9999';
    document.body.appendChild(spinner);
    
    
    setTimeout(() => {
        spinner.remove();
    }, 5000);
}

function hideSpinner() {
    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.remove();
    }
}


showSpinner();
fetchPokemonData(currentPage);
