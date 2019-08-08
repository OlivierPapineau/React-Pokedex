import { IPokedex } from '../components/Pages/PokemonListPage';

const fetchPokemon = (limit: number, offset: number, mode: 'regular' | 'search', searchedPokemon: string = '') => {
  const baseApiLink = 'http://pokeapi.co/api/v2/pokemon/?';
  const linkTail = mode === 'regular' ? `limit=${limit}&offset=${offset}` : mode === 'search' && `limit=964&offset=0`;
  const fullCall = `${baseApiLink}${linkTail}`;
  let resObj = {};

  fetch(fullCall)
    .then(response => response.json())
    .then((response: IPokedex) => {
      if (mode === 'regular') {
      }
    });
};
