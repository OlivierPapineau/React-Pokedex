import React from 'react';
import { IPokemonListItem } from '../typings/PokemonTypes';
import { Link, RouteComponentProps } from 'react-router-dom';
import normalize from '../helpers/normalize';
import Sprite from './pokemonPageElements/Sprite';

interface IPokemonListProps {
  pokemonList: IPokemonListItem[];
  loading: boolean;
}

// interface Identifiable {
//   id: string;
//   url: string;
// }

const PokemonList = (props: IPokemonListProps) => {
  const { pokemonList, loading } = props;
  if (loading) {
    return <h2>Loading...</h2>;
  }

  const pokemonIds = pokemonList.map(pokemon => {
    const ID = pokemon.url.split('/');
    const arrIds = ID[ID.length - 2];
    return arrIds;
  });
  //console.log(pokemonIds);

  return (
    <div className="row mb-5">
      {pokemonList.map((pokemon, index) => {
        return (
          <div className="col-sm-3 mb-2">
            <div className="card text-center">
              <div className="card-body">
                <h5 key={pokemon.name} className="card-title">
                  <Link to={`pokemon/${pokemonIds[index]}`}>{normalize(pokemon.name)}</Link>
                </h5>
                <Sprite id={pokemonIds[index]} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonList;
