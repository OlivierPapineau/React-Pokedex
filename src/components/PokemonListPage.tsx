import React from 'react';
import { useState, useEffect } from 'react';

// export interface IPokemonArr {
//   results
// }

const PokemonListPage = () => {
  const [hasError, setErrors] = useState();
  const [pokemon, setPokemon] = useState<{
    count: string;
    next: string;
    previous: string | null;
    results: {}[];
  } | null>(null);

  const fetchData = () => {
    fetch('http://pokeapi.co/api/v2/pokemon/?limit=964')
      .then(response => response.json())
      .then(response => setPokemon(response))
      .catch(error => setErrors(error));
  };

  useEffect(() => {
    fetchData();
    console.log('fetch call');
  }, []);

  return (
    <div>
      <h2>Pokemon</h2>
      <div>
        <h3>API response</h3>
        <p>{JSON.stringify(pokemon)}</p>
      </div>
    </div>
  );
};

export default PokemonListPage;
