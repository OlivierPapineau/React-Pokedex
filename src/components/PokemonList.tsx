import React from "react";
import { match } from "react-router-dom";
import { IPokemonListItem } from "../typings/PokemonTypes";
import { Link, RouteComponentProps } from "react-router-dom";
import normalize from "../helpers/normalize";
import Sprite from "./pokemonPageElements/Sprite";
import getIdFromUrl from "../helpers/getIdFormUrl";
import BsList from "./bootstrapComponents/BsList";
import BsListItem from "./bootstrapComponents/BsListItem";
import BsButton, { EButtonColors } from "./bootstrapComponents/BsButton";

export type IAnyPokemonListDisplayType = keyof typeof IPokemonListDisplayType;
enum IPokemonListDisplayType {
  CARD = "CARD",
  LIST = "LIST",
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
  const {
    displayType = IPokemonListDisplayType.CARD,
    filteredIds = [],
    pokemonList,
    loading,
    match,
  } = props;
  if (loading) {
    return <h2>Loading...</h2>;
  }

  const pokemonIds = pokemonList.map(pokemon => {
    return getIdFromUrl(pokemon.url);
  });
  //console.log(pokemonIds);

  const handleFave = (pokemonId: string, pokemonName: string) => {
    console.log(pokemonName);
    console.log(pokemonId);
    const pokemon = {
      name: pokemonName,
      id: pokemonId,
    };
    window.localStorage.setItem(`pokemon${pokemonId}`, JSON.stringify(pokemon));
  };

  return (
    <React.Fragment>
      {displayType === IPokemonListDisplayType.CARD ? (
        <div className="row mb-5">
          {pokemonList.map((pokemon, index) => {
            const visible = filteredIds.indexOf(pokemon.name) === -1;
            return (
              <div
                className={`col-sm-3 mb-2${!visible ? " d-none" : ""}`}
                key={pokemon.name}
              >
                <div className="card text-center">
                  <div className="card-body">
                    <h5 key={pokemon.name} className="card-title">
                      <Link to={`/pokemon/${pokemonIds[index]}`}>
                        {normalize(pokemon.name)}
                      </Link>
                    </h5>
                    <Sprite id={pokemonIds[index]} />
                    <div
                      onClick={e => {
                        handleFave(getIdFromUrl(pokemon.url), pokemon.name);
                      }}
                    >
                      <BsButton
                        type="button"
                        outline={true}
                        color={EButtonColors.SUCCESS}
                      >
                        Add to favorites
                      </BsButton>
                    </div>
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
            const pokemonId = getIdFromUrl(pokemon.url);
            return (
              <BsListItem
                className={!visible ? " d-none" : ""}
                key={pokemon.name}
              >
                <Link to={`/pokemon/${pokemonIds[index]}`}>
                  <Sprite id={pokemonId} className="d-inline-block mr-2" />
                  {normalize(pokemon.name)}
                </Link>
              </BsListItem>
            );
          })}
        </BsList>
      )}
    </React.Fragment>
  );
};

export default PokemonList;
