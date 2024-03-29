import { IPokemonListItem } from '../../../../../typings/PokemonTypes';

const filterSearch = (pokemonList: IPokemonListItem[], searchValue: string) => {
  const resObj = pokemonList.filter(pokemon => {
    const lowerCase = pokemon.name.toLowerCase();
    const filter = searchValue.toLowerCase();
    if (filter) {
      return lowerCase.includes(filter);
    }
    return true;
  });
  console.log('resObj: ', resObj);
  console.log('*************');

  return resObj;
};

export default filterSearch;
