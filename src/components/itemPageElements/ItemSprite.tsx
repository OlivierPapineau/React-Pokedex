import React from 'react';

interface IItemSpriteProps {
  url: string;
  className?: string;
}

const ItemSprite = (props: IItemSpriteProps) => {
  const { url, className } = props;
  const clName = `${className} sprite`;

  return (
    <div className={clName}>
      <img src={url} />
    </div>
  );
};

export default ItemSprite;
