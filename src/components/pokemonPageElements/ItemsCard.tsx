import React from 'react';
import { IItemListObject } from '../../typings/PokemonTypes';
import { Link } from 'react-router-dom';
import getIdFromUrl from '../../helpers/getIdFormUrl';
import normalize from '../../helpers/normalize';

interface IItemsCardProps {
  held_items: IItemListObject[];
}

const ItemsCard = (props: IItemsCardProps) => {
  const { held_items } = props;

  const itemsElms = held_items.map((itemObj, index) => {
    const { item } = itemObj;
    return (
      <li key={`item-${index}`} className="list-group-item">
        <Link to={`/items/${getIdFromUrl(item.url)}`}>{normalize(item.name)}</Link>
      </li>
    );
  });

  return (
    <div className="card mb-5 mt-3">
      <div className="card-header text-white bg-secondary">
        <h6>Held items: </h6>
      </div>
      <div className="card-body">
        {itemsElms.length !== 0 ? <ul className="list-group">{itemsElms}</ul> : <p>This pokemon has no held item</p>}
      </div>
    </div>
  );
};

export default ItemsCard;
