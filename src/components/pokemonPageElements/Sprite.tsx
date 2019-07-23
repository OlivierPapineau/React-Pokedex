import React, { useState, useEffect } from 'react';

interface ISpriteProps {
  id: string | number;
  className?: string;
}

const Sprite = (props: ISpriteProps) => {
  const { id, className } = props;
  const clName = `${className} sprite`;

  return (
    <div className={clName}>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
    </div>
  );
};

export default Sprite;
