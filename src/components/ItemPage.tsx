import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IItem } from '../typings/ItemTypes';
import normalize from '../helpers/normalize';
import Spinner from './statusComponents/Spinner';
import Sprite from './pokemonPageElements/Sprite';
import ItemSprite from './itemPageElements/ItemSprite';
import BsCard from './bootstrapComponents/BsCard';

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
  const { name, sprites, flavor_text_entries, effect_entries } = item;

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
          <BsCard
            cardTitle="Sprite"
            cardContent={<ItemSprite url={sprites.default} />}
            whiteText={false}
            positionProp="mt-3"
          />
        </div>
        <div className="col-sm-9">
          <BsCard
            cardTitle="Description"
            cardContent={
              <div>
                {flavor_text_entries[2].text}
                <div className="mt-3">
                  Effects:
                  <ul>
                    {effect_entries.map((effectObj, index) => {
                      return <li key={`effect-${index}`}>{effectObj.effect}</li>;
                    })}
                  </ul>
                </div>
              </div>
            }
            whiteText={false}
            positionProp="mt-3"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
