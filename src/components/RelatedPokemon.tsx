import { IPokemonListItem } from "../typings/PokemonTypes";
import * as React from "react";
import PokemonList from "./PokemonList";

export interface IRelatedPokemonProps {
  pokemonName: string;
}

export function RelatedPokemon({ pokemonName }: IRelatedPokemonProps) {
  const pokemonList: IPokemonListItem[] = [];
  const loading = true;
  // Use useState to fetch related pokemon based on pokemonName passed
  // Import your fetch
  // searchHelper() and search for pokemonName to display as "Related Pokemon"

  return (
    <div>
      <h2>Related Pokemon</h2>
      <PokemonList loading={loading} pokemonList={pokemonList} />
    </div>
  );
}
