import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { IPokemonListItem } from '../typings/PokemonTypes';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import Searchbar from './Searchbar';

const PokemonListPage = () => {
  const [hasError, setErrors] = useState();
  const [pokedex, setPokedex] = useState<{
    count: string;
    next: string;
    previous: string | null;
    results: IPokemonListItem[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokPerPage, setPokPerPage] = useState(52);
  const [inputValue, setInputValue] = useState('');
  const [currentPokemonArr, setCurrentPokemon] = useState([] as IPokemonListItem[] | false);

  const indexOfLastPokemon = currentPage * pokPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokPerPage;

  const fetchData = () => {
    setLoading(true);
    fetch('http://pokeapi.co/api/v2/pokemon/?limit=964')
      .then(response => response.json())
      .then(response => {
        setPokedex(response);
        return response;
      })
      .then(response => {
        //console.log(response);
        //console.log(pokedex);
        setCurrentPokemon(response !== null && response.results.slice(indexOfFirstPokemon, indexOfLastPokemon));
        setLoading(false);
        //console.log(loading);
      })
      .catch(error => setErrors(error));
  };

  useEffect(
    () => {
      fetchData();
      console.log('fetch call');
    },
    [currentPage],
  );

  //Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    let currentList: IPokemonListItem[] | false = [];
    let newList: IPokemonListItem[] | false = [];

    if (e.currentTarget.value !== '') {
      currentList = (pokedex && pokedex.results) || false;

      if (currentList !== false) {
        newList = currentList.filter(pokemon => {
          const lowerCase = pokemon.name.toLowerCase();
          const filter = e.currentTarget.value.toLowerCase();

          return lowerCase.includes(filter);
        });
      }
    } else {
      newList = (pokedex && pokedex.results) || false;
    }

    //Supposed to have setState... but hooks...
    setCurrentPokemon(newList !== false && newList.slice(indexOfFirstPokemon, indexOfLastPokemon));
    //console.log(newList);
  };

  //console.log(currentPokemonArr);
  //console.log(pokedex);
  return (
    <div className="container mt-5">
      <div className="row">
        <h2 className="text-primary mb-3 col-sm-2">Pokemon</h2>
        <Pagination
          elementsPerPage={pokPerPage}
          totalElements={(pokedex !== null && pokedex.results.length) || 0}
          paginate={paginate}
          className="mb-3 col-sm-10"
        />
      </div>
      <div>
        <Searchbar onChange={handleSearch} value={inputValue} className="mb-3" />
      </div>
      <div>
        <PokemonList pokemonList={currentPokemonArr || []} loading={loading} />
      </div>
    </div>
  );
};

export default PokemonListPage;
