import { writeFile, writeFileSync } from "node:fs";
// import { join, dirname } from "node:path";
const FILENAME = 'routes.txt';
const TOTALPOKEMONS = 10;
const TOTALPAGES = 5;

const pokemonIds = Array.from({ length: TOTALPOKEMONS }, (_, i) => i + 1)
const numberOfPages = Array.from({ length: TOTALPAGES }, (_, i) => i + 1)

let fileContent = pokemonIds.map(id => '/pokemons/' + id).join('\n')
fileContent += '\n' + numberOfPages.map(page => '/pokemons/page/' + page).join('\n')

// llamar a la api
// https://pokeapi.co/api/v2/pokemon?offset=20&limit=20
// const call = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
// let pokemonList = await call.json();
const pokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTALPOKEMONS}`).then(res => res.json())
fileContent += '\n' + pokemonList.results.map(pokemon => '/pokemons/page/' + pokemon.name).join('\n');

// crear el archivo
writeFileSync(FILENAME, fileContent)
