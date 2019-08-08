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
import { IPokemonListItem } from '../../typings/PokemonTypes';
import PokemonList from '../PokemonList';
import Pagination from '../Pagination';
import Searchbar from '../Searchbar';
import Spinner from '../statusComponents/Spinner';
import fetchPokemon from './_pageElements/pokemonPageElements/methods/fetchPokemon';
import filterSearch from './_pageElements/pokemonPageElements/methods/filterSearch';
import PageSizeChanger from '../PageSizeChanger';
import QuickSearch from '../QuickSearch';

export interface IPokedex {
  count: number;
  next: string;
  previous: string | null;
  results: IPokemonListItem[];
}

interface IPokemonListPageState {
  count: number;
  error: any | null;
  filteredIds: string[];
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
  filteredIds: [],
  limit: 52,
  loading: true,
  offset: 0,
  pokedex: {} as IPokedex,
  searchBar: '',
  values: {} as { [key: string]: string },
};

const PokemonListPage = () => {
  const [state, setState] = useState(initalState);
  const { count, error, filteredIds, limit, loading, offset, pokedex, values } = state;

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
      console.log('fetch call');
      fetchData();
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

  // When filter is cleared pokemon should come back into view
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

  // Extract search function into seperate helper function that will take one paramter
  // searchHelper(searchTerm: string) => Promsise<IPokeDex>
  const handleSearch = (event: React.FormEvent | React.MouseEvent) => {
    event.preventDefault();
    fetchPokemon(964, 0)
      .then(response => ({
        ...response,
        results: filterSearch(response.results, values.searchBar),
      }))
      .then(response => setState({ ...state, pokedex: response }));
  };

  const handleSizeChange = () => {
    const sizeValue = state.values.pageSize;
    changeSize(Number(sizeValue));
  };

  const handlePageSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.currentTarget.name;
    const inputValue = e.currentTarget.value;
    const { pokedex } = state;
    console.log('inputValue: ', inputValue);

    const newFilteredIds = [];

    setState({
      ...state,
      values: {
        ...values,
        [inputName]: inputValue,
      },
      // filteredIds: newFilteredIds,
      pokedex,
      // pokedex: {
      //   ...pokedex,
      //   results: filterSearch(pokedex.results, inputValue),
      // },
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
        <Pagination className="mb-3 col-sm-10" elementsPerPage={limit} paginate={paginate} totalElements={count} />
      </div>
      <div className="row">
        <div className="col-sm-4">
          <Searchbar onChange={handleInputChange} onClick={handleSearch} value={values.searchBar} />
        </div>
        <div className="col-sm-3">
          <QuickSearch onChange={handlePageSearch} value={values.quickSearch || ''} />
        </div>
        <div className="col-sm-5">
          <PageSizeChanger onChange={handleInputChange} onClick={handleSizeChange} value={values.pageSize} />
        </div>
      </div>
      <div>
        <PokemonList filteredIds={filteredIds} loading={loading} pokemonList={pokedex.results || []} />
      </div>
    </div>
  );
};

export default PokemonListPage;
