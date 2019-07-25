/*
  Next parts:
  1. Filter search bar to filter visible items (no fetch)
  2. Search search bar (do fetch ) // allow clear fetch to reset back to previous limit/offset
  3. Pagination will do a fetch with offset
  4. Typing timeout on fiter and search to avoid too many requests / state chagnes
 */

import React from 'react';
// import axios from 'axios';
import { useState, useEffect } from 'react';
import { IPokemonListItem } from '../typings/PokemonTypes';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import Searchbar from './Searchbar';
import Spinner from './statusComponents/Spinner';

export interface IPokedex {
  count: number;
  next: string;
  previous: string | null;
  results: IPokemonListItem[];
}

interface IPokemonListPageState {
  count: number;
  error: any | null;
  limit: number; // pageSize
  loading: boolean;
  offset: number; // pageIndex
  pokedex: IPokedex;
  searchValue: string;
}

const initalState = {
  count: 0,
  error: null,
  limit: 52,
  loading: true,
  offset: 0,
  pokedex: {} as IPokedex,
  searchValue: '',
};

const PokemonListPage = () => {
  const [state, setState] = useState(initalState);
  const { count, error, limit, loading, offset, pokedex, searchValue } = state;

  const fetchData = () => {
    setState({ ...state, loading: true });
    // limit=10&offset=5
    // replace w fetchPokemon
    // console.log(`Propterties: limit: ${limit}, offset: ${offset}`);
    fetch(`http://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
      .then(response => response.json())
      .then((response: IPokedex) => {
        console.log('Pokedex avant call: ', pokedex);
        setState({
          ...state,
          count: response.count,
          limit,
          loading: false,
          offset,
          pokedex: response,
        });
      })
      .catch(error => {
        console.warn(error);
        // setErrors(error)
      });
  };

  useEffect(
    () => {
      fetchData();
      console.log('fetch call');
    },
    [limit, offset],
  );

  //Change page
  const paginate = (pageNumber: number) => {
    setState({ ...state, offset: pageNumber });
  };

  const changeSize = (newSize: number) => {
    setState({ ...state, limit: newSize });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setState({ ...state, searchValue: inputValue });
  };

  const handleSearch = () => {
    console.log('bloup');
    console.log('__');
    const searchedPokemon = pokedex.results.filter(pokemon => {
      const lowerCase = pokemon.name.toLowerCase();
      const filter = searchValue.toLowerCase();
      return lowerCase.includes(filter);
    });
    console.log('Searched pokemon', searchedPokemon);
    // setState({
    //   ...state,
    //   loading: true,
    //   limit: count,
    //   offset: 0,
    //   pokedex: { ...pokedex, results: searchedPokemon },
    // });
  };

  // offset
  // limit
  // counts
  // counts / limit = number of pages
  // offset is the current page number (highlight it as current)

  //console.log(pokedex.results);

  if (loading) {
    return (
      <div className="container mt-5">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <h2 className="text-primary mb-3 col-sm-2">Pokemon</h2>
        <Pagination
          elementsPerPage={state.limit}
          totalElements={state.count}
          offset={state.offset}
          paginate={paginate}
          className="mb-3 col-sm-10"
        />
      </div>
      <div>
        <Searchbar value={searchValue} onChange={handleInputChange} onClick={handleSearch} />
      </div>
      <div>
        <PokemonList pokemonList={pokedex.results || []} loading={loading} />
      </div>
    </div>
  );
};

export default PokemonListPage;
