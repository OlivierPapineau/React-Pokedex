import React from 'react';

// const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setInputValue(e.currentTarget.value);
//   let currentList: IPokemonListItem[] | false = [];
//   let newList: IPokemonListItem[] | false = [];

//   if (e.currentTarget.value !== "") {
//     currentList = (pokedex && pokedex.results) || false;

//     if (currentList !== false) {
//       newList = currentList.filter(pokemon => {
//         const lowerCase = pokemon.name.toLowerCase();
//         const filter = e.currentTarget.value.toLowerCase();

//         return lowerCase.includes(filter);
//       });
//     }
//   } else {
//     newList = (pokedex && pokedex.results) || false;
//   }

//   //Supposed to have setState... but hooks...
//   setCurrentPokemon(
//     newList !== false &&
//       newList.slice(indexOfFirstPokemon, indexOfLastPokemon),
//   );
//   //console.log(newList);
// };

//console.log(currentPokemonArr);
//console.log(pokedex);
