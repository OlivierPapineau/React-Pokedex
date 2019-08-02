import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IItem } from '../typings/ItemTypes';
import normalize from '../helpers/normalize';
import Spinner from './statusComponents/Spinner';
import ItemRelatedPokemon from './itemPageElements/ItemRelatedPokemon';
import ItemSpriteCard from './itemPageElements/ItemSpriteCard';
import ItemDescCard from './itemPageElements/ItemDescCard';
import ItemSpecCard from './itemPageElements/ItemSpecsCard';
import { IRegApiObject } from '../typings/PokemonTypes';

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

const ItemPage = (props: IItemPageProps) => {
  const { match } = props;
  const [state, setState] = useState<IItemPageState>(initialState);
  const { item, isLoading, error } = state;
  const {
    name,
    sprites,
    flavor_text_entries,
    effect_entries,
    held_by_pokemon,
    attributes,
    category,
    cost,
    fling_effect,
    fling_power,
  } = item;

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
          <ItemSpriteCard cardTitle="Sprite" positionProp="mt-3" spriteUrl={sprites.default} whiteText={false} />
        </div>
        <div className="col-sm-9">
          <ItemDescCard
            cardTitle="Description"
            effects={effect_entries}
            itemDesc={flavor_text_entries[2].text}
            positionProp="mt-3"
            whiteText={false}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <ItemRelatedPokemon
            cardTitle="Also held by"
            pageIsLoading={isLoading}
            positionProp="mt-3"
            relatedList={held_by_pokemon}
            whiteText={false}
          />
        </div>
        <div className="col-sm-6">
          <ItemSpecCard
            attributes={attributes}
            cardTitle="Specs"
            category={category}
            cost={cost}
            flingEffect={fling_effect}
            flingPower={fling_power}
            positionProp="mt-3"
            whiteText={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
