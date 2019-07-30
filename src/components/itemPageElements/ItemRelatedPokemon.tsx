import React from 'react';
import { IRegApiObject, IPokemonListItem } from '../../typings/PokemonTypes';
import { IBsCardProps } from '../bootstrapComponents/BsCard';
import BsCard from '../bootstrapComponents/BsCard';
import PokemonList from '../PokemonList';
import { IItemHolder } from '../../typings/ItemTypes';

interface IItemRelatedPokemonProps extends IBsCardProps {
  pageIsLoading: boolean;
  relatedList: IItemHolder[];
}

const ItemRelatedPokemon = (props: IItemRelatedPokemonProps) => {
  const { pageIsLoading, relatedList, ...rest } = props;
  const pokemonList = relatedList.map(pokemonObj => {
    const pokemon: IPokemonListItem = pokemonObj.pokemon;
    return {
      name: pokemon.name,
      url: pokemon.url,
    };
  });

  return (
    <BsCard {...rest}>
      <PokemonList pokemonList={pokemonList} loading={pageIsLoading} />
    </BsCard>
  );
};

export default ItemRelatedPokemon;
