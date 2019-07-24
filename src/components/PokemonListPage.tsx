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
}

const initalState = {
  count: 0,
  error: null,
  limit: 52,
  loading: true,
  offset: 0,
  pokedex: {} as IPokedex,
};

const PokemonListPage = () => {
  const [state, setState] = useState(initalState);
  const { count, error, limit, loading, offset, pokedex } = state;

  // const [hasError, setErrors] = useState();
  // const [pokedex, setPokedex] = useState<IPokedex | null>(null);

  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pokPerPage, setPokPerPage] = useState(52);
  // const [inputValue, setInputValue] = useState("");
  // const [currentPokemonArr, setCurrentPokemon] = useState([] as
  //   | IPokemonListItem[]
  //   | false);

  // const indexOfLastPokemon = currentPage * pokPerPage;
  // const indexOfFirstPokemon = indexOfLastPokemon - pokPerPage;

  const fetchData = () => {
    setState({ ...state, loading: true });
    // limit=10&offset=5
    // replace w fetchPokemon
    fetch(`http://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
      .then(response => response.json())
      .then((response: IPokedex) => {
        setState({
          ...state,
          count: response.count,
          limit,
          loading: false,
          offset,
          pokedex: response,
        });
      })
      // .then(response => {
      //   //console.log(response);
      //   //console.log(pokedex);
      //   setCurrentPokemon(
      //     response !== null &&
      //       response.results.slice(indexOfFirstPokemon, indexOfLastPokemon),
      //   );
      //   setLoading(false);
      //   //console.log(loading);
      // })
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

  // offset
  // limit
  // counts
  // counts / limit = number of pages
  // offset is the current page number (highlight it as current)

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
          elementsPerPage={state.offset}
          totalElements={state.count}
          limit={state.limit}
          paginate={paginate}
          className="mb-3 col-sm-10"
        />
      </div>
      <div>
        {/* <Searchbar
          onChange={handleSearch}
          value={inputValue}
          className="mb-3"
        /> */}
      </div>
      <div>
        <PokemonList pokemonList={pokedex.results || []} loading={loading} />
      </div>
    </div>
  );
};

export default PokemonListPage;
