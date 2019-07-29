import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IItem } from '../typings/ItemTypes';
import normalize from '../helpers/normalize';
import Spinner from './statusComponents/Spinner';
import Sprite from './pokemonPageElements/Sprite';
import ItemSprite from './itemPageElements/ItemSprite';
import BsCard from './bootstrapComponents/BsCard';
import BsList from './bootstrapComponents/BsList';
import BsListItem from './bootstrapComponents/BsListItem';
import PokemonList from './PokemonList';
import { IPokemonListItem } from '../typings/PokemonTypes';

interface IItemPageProps extends RouteComponentProps<{ id: string }> {}

interface IItemPageState {
  item: IItem;
  isLoading: boolean;
  error: string;
}

const initialState: IItemPageState = {
  item: {} as IItem,
  isLoading: true,
  error: '',
};
/**
 * Props item page
 * @todo Seperate the different elements of the page in components
 */
const ItemPage = (props: IItemPageProps) => {
  const { match } = props;
  const [state, setState] = useState<IItemPageState>(initialState);
  const { item, isLoading, error } = state;
  const { name, sprites, flavor_text_entries, effect_entries, held_by_pokemon } = item;

  const fetchItemData = () => {
    fetch(`https://pokeapi.co/api/v2/item/${match.params.id}`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setState({
          ...state,
          item: response,
          isLoading: false,
        });
      });
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mt-5">
      <h2>{normalize(name)}</h2>
      <div className="row">
        <div className="col-sm-3">
          <BsCard cardTitle="Sprite" whiteText={false} positionProp="mt-3">
            <ItemSprite url={sprites.default} />
          </BsCard>
        </div>

        <div className="col-sm-9">
          <BsCard cardTitle="Description" whiteText={false} positionProp="mt-3">
            <div>
              {flavor_text_entries[2].text}
              <div className="mt-3">
                Effects:
                <BsList listType="unordered">
                  {effect_entries.map((effectObj, index) => {
                    return <BsListItem key={`effect-${index}`}>{effectObj.effect}</BsListItem>;
                  })}
                </BsList>
              </div>
            </div>
          </BsCard>
        </div>
      </div>
      <div>
        <BsCard cardTitle="Also held by" whiteText={false} positionProp="mt-3">
          <PokemonList
            pokemonList={held_by_pokemon.map(pokemonObj => {
              const pokemon: IPokemonListItem = pokemonObj.pokemon;
              //console.log(pokemon.url);
              return {
                name: pokemon.name,
                url: pokemon.url,
              };
            })}
            loading={isLoading}
          />
        </BsCard>
      </div>
    </div>
  );
};

export default ItemPage;
