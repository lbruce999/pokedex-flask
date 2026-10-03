"use strict";

// --------------------------------------------------
// Pokédex DOM Element References
// --------------------------------------------------

// Search elements
const searchForm = document.querySelector("#pokemon-search-form");
const searchButton = document.querySelector("#pokemon-search-button");
let currentPokemonCry = null;
// Pokémon card
const pokemonCard = document.querySelector("#pokemon-card");

// Pokémon details
const pokemonImage = document.querySelector("#pokemon-image");
const pokemonName = document.querySelector("#pokemon-name");
const pokemonId = document.querySelector("#pokemon-id");
const pokemonTypes = document.querySelector("#pokemon-types");
const pokemonHeight = document.querySelector("#pokemon-height");
const pokemonWeight = document.querySelector("#pokemon-weight");
const pokemonAbilities = document.querySelector("#pokemon-abilities");
const pokemonBaseExperience = document.querySelector("#pokemon-base-experience");
const pokemonCryButton = document.getElementById("pokemon-cry-button");

// Status messages
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");

// --------------------------------------------------
// Search Form Connection
// --------------------------------------------------

searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const searchInput = document.querySelector("#pokemon-search");
    const pokemonUserInput = searchInput.value;
    sendData(pokemonUserInput)
});





async function sendData(pokemonUserInput) {
    const response = await fetch(`/pokemon/${pokemonUserInput}`)
    const data = await response.json();
    updatePokedex(data)
}

function updatePokedex(data) {
    pokemonName.textContent = data['pokemon_name'];
    pokemonId.textContent = `#${data['pokemon_id']}`;
    pokemonHeight.textContent = data['height'];
    pokemonWeight.textContent = data['weight'];
    pokemonAbilities.textContent = data['abilities'];
    pokemonBaseExperience.textContent = data['base_experience'];
    pokemonImage.src = data['sprites'];
    currentPokemonCry = data['cries'];
}

pokemonCryButton.addEventListener("click", () => {

    const pokemonCry = new Audio(currentPokemonCry);
        pokemonCry.play();
})
