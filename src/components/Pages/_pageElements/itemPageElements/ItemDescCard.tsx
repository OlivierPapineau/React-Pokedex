import React from 'react';
import BsCard, { IBsCardProps } from '../../../bootstrapComponents/BsCard';
import { IEffect } from '../../../../typings/ItemTypes';
import BsList from '../../../bootstrapComponents/BsList';
import BsListItem from '../../../bootstrapComponents/BsListItem';

interface IItemDescCardProps extends IBsCardProps {
  effects: IEffect[];
  itemDesc: string;
}

const ItemDescCard = (props: IItemDescCardProps) => {
  const { effects, itemDesc, ...rest } = props;

  return (
    <BsCard {...rest}>
      <React.Fragment>
        {itemDesc}
        <div className="mt-3">
          <h6>Effects: </h6>
          <BsList listType="unordered">
            {effects.map((effectObj, index) => {
              return <BsListItem key={`effect-${index}`}>{effectObj.effect}</BsListItem>;
            })}
          </BsList>
        </div>
      </React.Fragment>
    </BsCard>
  );
};

export default ItemDescCard;
