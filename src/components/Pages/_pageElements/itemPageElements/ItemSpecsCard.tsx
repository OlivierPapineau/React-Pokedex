import React from 'react';
import BsCard, { IBsCardProps } from '../../../bootstrapComponents/BsCard';
import { IRegApiObject } from '../../../../typings/PokemonTypes';
import BsList from '../../../bootstrapComponents/BsList';
import BsListItem from '../../../bootstrapComponents/BsListItem';
import normalize from '../../../../helpers/normalize';

interface IItemSpecCardProps extends IBsCardProps {
  attributes: IRegApiObject[];
  category: IRegApiObject;
  cost: number;
  flingEffect: IRegApiObject;
  flingPower: number;
}

const ItemSpecCard = (props: IItemSpecCardProps) => {
  const { attributes, category, cost, flingEffect, flingPower, ...rest } = props;
  // Simplify from here
  const elmObj = {
    category: category.name,
    cost: cost,
    flingEffect: flingEffect !== null ? flingEffect.name : '',
    flingPower: flingPower !== null ? flingPower : '',
  };

  // const cleanData = transformDataForComp(props);

  let elms = [];
  for (const [key, value] of Object.entries(elmObj)) {
    if (value) {
      elms.push(
        <div>
          <h5>{normalize(key)}</h5>
          <p>{typeof value === 'number' ? value : normalize(value)}</p>
        </div>,
      );
    }
  }
  // Simplify to here

  return (
    <BsCard {...rest}>
      <div>
        <h5>{attributes.length > 0 && 'Attributes'}</h5>
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
