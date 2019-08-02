import React from 'react';
import BsCard, { IBsCardProps } from '../bootstrapComponents/BsCard';
import { IRegApiObject } from '../../typings/PokemonTypes';
import BsList from '../bootstrapComponents/BsList';
import BsListItem from '../bootstrapComponents/BsListItem';
import normalize from '../../helpers/normalize';

interface IItemSpecCardProps extends IBsCardProps {
  attributes: IRegApiObject[];
  category: IRegApiObject;
  cost: number;
  flingEffect: IRegApiObject;
  flingPower: number;
}

const ItemSpecCard = (props: IItemSpecCardProps) => {
  const { attributes, category, cost, flingEffect, flingPower, ...rest } = props;
  const elmObj = {
    category: category.name,
    cost: cost,
    flingEffect: flingEffect.name,
    flingPower: flingPower,
  };

  let elms = [];
  for (const [key, value] of Object.entries(elmObj)) {
    if (value !== null || value !== false) {
      elms.push(
        <div>
          <h5>{normalize(key)}</h5>
          <p>{typeof value !== 'number' ? normalize(value) : value}</p>
        </div>,
      );
    }
  }

  return (
    <BsCard {...rest}>
      <div>
        <h5>Attributes</h5>
        <BsList listType="unordered">
          {attributes.map((attObj, index) => {
            return <BsListItem>{normalize(attObj.name)}</BsListItem>;
          })}
        </BsList>
      </div>
      <div className="mt-3">{elms}</div>
    </BsCard>
  );
};

export default ItemSpecCard;
