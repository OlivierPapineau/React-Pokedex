import React from 'react';
import BsCard, { IBsCardProps } from '../../../bootstrapComponents/BsCard';
import ItemSprite from './ItemSprite';

interface IItemSpriteCardProps extends IBsCardProps {
  spriteUrl: string;
}

const ItemSpriteCard = (props: IItemSpriteCardProps) => {
  const { spriteUrl, ...rest } = props;

  return (
    <BsCard {...rest}>
      <ItemSprite url={spriteUrl} />
    </BsCard>
  );
};

export default ItemSpriteCard;
