import React, { useState, useEffect } from 'react';
import { IPokemonListItem } from '../typings/PokemonTypes';
import fetchPokemon from './pokemonPageElements/methods/fetchPokemon';
import filterSearch from './pokemonPageElements/methods/filterSearch';
import PokemonList from './PokemonList';
import { IPokedex } from './PokemonListPage';
import BsCard from './bootstrapComponents/BsCard';
import Spinner from './statusComponents/Spinner';

export interface IRelatedPokemonProps {
  pokemonName: string;
}

interface IRelatedPokemonState {
  pokedex: IPokedex;
  error: string;
  loading: boolean;
}

const initialState: IRelatedPokemonState = {
  pokedex: {} as IPokedex,
  error: '',
  loading: true,
};

const RelatedPokemon = ({ pokemonName }: IRelatedPokemonProps) => {
  const [state, setState] = useState(initialState);
  const pokemonList: IPokemonListItem[] = [];
  // Use useState to fetch related pokemon based on pokemonName passed
  // Import your fetchexport
  // searchHelper() and search for pokemonName to display as "Related Pokemon"

  const fetchRelatedPokemon = () => {
    fetchPokemon(964, 0)
      .then(response => {
        setState({
          ...state,
          pokedex: {
            ...response,
            results: filterSearch(response.results, pokemonName),
          },
          loading: false,
        });
      })
      .catch(error => {
        setState({
          ...state,
          error: error,
        });
      });
  };

  useEffect(() => {
    fetchRelatedPokemon();
  }, []);

  if (state.loading) return <Spinner />;

  return (
    <BsCard whiteText={false} cardTitle="Related Pokemon">
      <PokemonList loading={state.loading} pokemonList={state.pokedex.results} displayType="LIST" />
    </BsCard>
  );
};

export default RelatedPokemon;
