import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Spinner from './statusComponents/Spinner';
import normalize from '../helpers/normalize';
import SpriteCard from './pokemonPageElements/SpriteCard';
import { IPokemon } from '../typings/PokemonTypes';
import GamesCard from './pokemonPageElements/GamesCard';
import ItemsCard from './pokemonPageElements/ItemsCard';

interface IPokemonPageProps extends RouteComponentProps<{ id: string }> {}

interface IPokemonPageState {
  pokemon: IPokemon;
  isLoading: boolean;
  error: string;
}

const initialState: IPokemonPageState = {
  pokemon: {} as IPokemon,
  isLoading: true,
  error: '',
};

const PokemonPage = (props: IPokemonPageProps) => {
  const { match } = props;
  const [state, setState] = useState(initialState);

  const fetchPokemonData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${match.params.id}/`)
      .then(response => response.json())
      .then(response => {
        setState({
          ...state,
          pokemon: response,
          isLoading: false,
        });
      })
      .catch(error => setState({ ...state, error: error }));
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  console.log(state.pokemon);

  if (state.isLoading)
    return (
      <div className="container mt-5">
        <h1>
          Loading...
          <span>
            <Spinner />
          </span>
        </h1>
      </div>
    );

  return (
    <div className="container mt-5">
      <h1>{state.pokemon.name && normalize(state.pokemon.name)} </h1>
      <div className="row">
        <div className="col-sm-6">
          <SpriteCard imagePath={state.pokemon.sprites.front_default || ''} pokemonObject={state.pokemon} />
          <ItemsCard held_items={state.pokemon.held_items || []} />
        </div>
        <div className="col-sm-6">
          <GamesCard games={state.pokemon.game_indices} />
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
