import React from 'react';
import { match } from 'react-router-dom';
import { IPokemonListItem } from '../typings/PokemonTypes';
import { Link, RouteComponentProps } from 'react-router-dom';
import normalize from '../helpers/normalize';
import Sprite from './pokemonPageElements/Sprite';
import getIdFromUrl from '../helpers/getIdFormUrl';
import BsList from './bootstrapComponents/BsList';
import BsListItem from './bootstrapComponents/BsListItem';

export type IAnyPokemonListDisplayType = keyof typeof IPokemonListDisplayType;
enum IPokemonListDisplayType {
  CARD = 'CARD',
  LIST = 'LIST',
}

interface IPokemonListProps {
  displayType?: IAnyPokemonListDisplayType;
  filteredIds?: string[];
  loading: boolean;
  pokemonList: IPokemonListItem[];
  match?: match;
}

// interface Identifiable {
//   id: string;
//   url: string;
// }

// Consume the displayType property to change the display of the pokemon, form LIST or CARD view
// Use filteredIds to hide filtered pokemon
const PokemonList = (props: IPokemonListProps) => {
  const { displayType = IPokemonListDisplayType.CARD, filteredIds = [], pokemonList, loading, match } = props;
  if (loading) {
    return <h2>Loading...</h2>;
  }

  const pokemonIds = pokemonList.map(pokemon => {
    return getIdFromUrl(pokemon.url);
  });
  //console.log(pokemonIds);

  return (
    <div>
      {displayType === IPokemonListDisplayType.CARD ? (
        <div className="row mb-5">
          {pokemonList.map((pokemon, index) => {
            const visible = filteredIds.indexOf(pokemon.name) === -1;
            return (
              <div className={`col-sm-3 mb-2${!visible ? ' d-none' : ''}`} key={pokemon.name}>
                <div className="card text-center">
                  <div className="card-body">
                    <h5 key={pokemon.name} className="card-title">
                      <Link to={`/pokemon/${pokemonIds[index]}`}>{normalize(pokemon.name)}</Link>
                    </h5>
                    <Sprite id={pokemonIds[index]} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <BsList listType="unordered">
          {pokemonList.map((pokemon, index) => {
            const visible = filteredIds.indexOf(pokemon.name) === -1;
            return (
              <BsListItem style={!visible ? ' d-none' : ''}>
                <Link to={`/pokemon/${pokemonIds[index]}`}>{normalize(pokemon.name)}</Link>
              </BsListItem>
            );
          })}
        </BsList>
      )}
    </div>
  );
};

export default PokemonList;
