/*
  Next parts:
  1. Filter search bar to filter visible items (no fetch) DONE
  2. Search search bar (do fetch ) // allow clear fetch to reset back to previous limit/offset DONE
  3. Pagination will do a fetch with offset DONE
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
import fetchPokemon from './pokemonPageElements/methods/fetchPokemon';
import filterSearch from './pokemonPageElements/methods/filterSearch';
import PageSizeChanger from './PageSizeChanger';
import QuickSearch from './QuickSearch';

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
  searchBar: string;
  values: { [key: string]: string };
}

const initalState = {
  count: 0,
  error: null,
  limit: 52,
  loading: true,
  offset: 0,
  pokedex: {} as IPokedex,
  searchBar: '',
  values: {} as { [key: string]: string },
};

const PokemonListPage = () => {
  const [state, setState] = useState(initalState);
  const { count, error, limit, loading, offset, pokedex, values } = state;

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

  const changeSize = (newSize: number = 1) => {
    setState({ ...state, limit: newSize });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    const inputName = e.currentTarget.name;
    setState({
      ...state,
      values: {
        ...values,
        [inputName]: inputValue,
      },
    });
  };

  const handleSearch = () => {
    console.log('bloup');
    console.log('__');
    fetchPokemon(964, 0)
      .then(response => {
        response = {
          ...response,
          results: filterSearch(response.results, values.searchBar),
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

  const handleSizeChange = () => {
    const sizeValue = state.values.pageSize;
    changeSize(Number(sizeValue));
  };

  const handlePageSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.currentTarget.name;
    const inputValue = e.currentTarget.value;
    const { pokedex } = state;
    setState({
      ...state,
      values: {
        ...values,
        [inputName]: inputValue,
      },
      pokedex: {
        ...pokedex,
        results: filterSearch(pokedex.results, inputValue),
      },
    });
  };

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
      <div className="row">
        <div className="col-sm-4">
          <Searchbar value={values.searchBar} onChange={handleInputChange} onClick={handleSearch} />
        </div>
        <div className="col-sm-3">
          <QuickSearch onChange={handlePageSearch} value={values.quickSearch} />
        </div>
        <div className="col-sm-5">
          <PageSizeChanger value={values.pageSize} onChange={handleInputChange} onClick={handleSizeChange} />
        </div>
      </div>
      <div>
        <PokemonList pokemonList={pokedex.results || []} loading={loading} />
      </div>
    </div>
  );
};

export default PokemonListPage;
