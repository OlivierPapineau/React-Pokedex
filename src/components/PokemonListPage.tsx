import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { IPokemonListItem } from '../typings/PokemonTypes';
import PokemonList from './PokemonList';
import Pagination from './Pagination';

// export interface IPokemonArr {
//   results
// }

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
  const [pokPerPage, setPokPerPage] = useState(10);

  const fetchData = () => {
    setLoading(true);
    fetch('http://pokeapi.co/api/v2/pokemon/?limit=964')
      .then(response => response.json())
      .then(response => setPokedex(response))
      .then(() => {
        setLoading(false);
        console.log(loading);
      })
      .catch(error => setErrors(error));
  };

  useEffect(() => {
    fetchData();
    console.log('fetch call');
  }, []);

  const indexOfLastPokemon = currentPage * pokPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokPerPage;
  const currentPokemon: IPokemonListItem[] | false =
    pokedex !== null && pokedex.results.slice(indexOfFirstPokemon, indexOfLastPokemon);

  console.log(pokedex);
  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-3">Pokemon</h2>
      <div>
        <PokemonList pokemonList={currentPokemon || []} loading={loading} />
        <Pagination elementsPerPage={pokPerPage} totalElements={pokedex !== null && pokedex.results.length} />
      </div>
    </div>
  );
};

export default PokemonListPage;
