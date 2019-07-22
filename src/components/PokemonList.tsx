import React from 'react';
import { IPokemonListItem } from '../typings/PokemonTypes';

interface IPokemonListProps {
  pokemonList: IPokemonListItem[];
  loading: boolean;
}

const PokemonList = (props: IPokemonListProps) => {
  const { pokemonList, loading } = props;
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group mb-4">
      {pokemonList.map(pokemon => {
        return (
          <li key={pokemon.name} className="list-group-item">
            {pokemon.name}
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonList;
