import React from 'react';
import { IPokemonListItem } from '../../../typings/PokemonTypes';

const filterSearch = (pokemonList: IPokemonListItem[], searchValue: string) => {
  const resObj = pokemonList.filter(pokemon => {
    const lowerCase = pokemon.name.toLowerCase();
    const filter = searchValue.toLowerCase();
    return lowerCase.includes(filter);
  });
  return resObj;
};

export default filterSearch;
