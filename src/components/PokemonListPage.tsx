/*
  Next parts:
  1. Filter search bar to filter visible items (no fetch)
  2. Search search bar (do fetch ) // allow clear fetch to reset back to previous limit/offset
  3. Pagination will do a fetch with offset
  4. Typing timeout on fiter and search to avoid too many requests / state chagnes
 */
// offset
// limit
// counts
// counts / limit = number of pages
// offset is the current page number (highlight it as current)

import React from 'react';
// import axios from 'axios';
import { useState, useEffect } from 'react';
import { IPokemonListItem } from '../typings/PokemonTypes';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import Searchbar from './Searchbar';
import Spinner from './statusComponents/Spinner';
import fetchPokemon from './pokemonPageElements/methods/fetchPokemon';
import filterSearch from './pokemonPageElements/methods/filterSearch';

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

  const fetchData = async () => {
    setState({ ...state, loading: true });
    const fetch = await fetchPokemon(limit, offset);
    setState({
      ...state,
      count: fetch.count,
      limit,
      loading: false,
      offset,
      pokedex: fetch,
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
    fetchPokemon(964, 0)
      .then(response => {
        response = {
          ...response,
          results: filterSearch(response.results, searchValue),
        };
        return response;
      })
      .then(response =>
        setState({
          ...state,
          pokedex: response,
        }),
      );
  };

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
