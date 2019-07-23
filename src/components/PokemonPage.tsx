import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Spinner from './statusComponents/Spinner';
import normalize from '../helpers/normalize';
import SpriteCard from './pokemonPageElements/SpriteCard';
import { IPokemon } from '../typings/PokemonTypes';

interface IPokemonPageProps extends RouteComponentProps<{ id: string }> {}

const PokemonPage = (props: IPokemonPageProps) => {
  const { match } = props;
  const [pokemon, setPokemon] = useState<IPokemon>({} as IPokemon);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPokemonData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${match.params.id}/`)
      .then(response => response.json())
      .then(response => setPokemon(response))
      .then(() => setLoading(false))
      .catch(error => setError(error));
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  console.log(pokemon);

  if (isLoading)
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
      <h1>{pokemon.name && normalize(pokemon.name)} </h1>
      <div>
        <SpriteCard imagePath={pokemon.sprites.front_default || ''} pokemonObject={pokemon} />
      </div>
    </div>
  );
};

export default PokemonPage;
