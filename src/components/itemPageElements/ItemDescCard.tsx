import React from 'react';
import BsCard, { IBsCardProps } from '../bootstrapComponents/BsCard';
import { IEffect } from '../../typings/ItemTypes';
import BsList from '../bootstrapComponents/BsList';
import BsListItem from '../bootstrapComponents/BsListItem';

interface IItemDescCardProps extends IBsCardProps {
  itemDesc: string;
  effects: IEffect[];
}

const ItemDescCard = (props: IItemDescCardProps) => {
  const { itemDesc, effects, ...rest } = props;

  return (
    <BsCard {...rest}>
      <div>
        {itemDesc}
        <div className="mt-3">
          <h6>Effects: </h6>
          <BsList listType="unordered">
            {effects.map((effectObj, index) => {
              return <BsListItem key={`effect-${index}`}>{effectObj.effect}</BsListItem>;
            })}
          </BsList>
        </div>
      </div>
    </BsCard>
  );
};

export default ItemDescCard;
