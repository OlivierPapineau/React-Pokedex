import React from 'react';
import { IPokemonGame } from '../../typings/PokemonTypes';
import normalize from '../../helpers/normalize';

interface IGamesCardPorps {
  games: IPokemonGame[];
}

const GamesCard = (props: IGamesCardPorps) => {
  const { games } = props;

  const gamesElms = games.map((game, index) => {
    const { version } = game;
    return (
      <li key={index} className="list-group-item">
        {normalize(version.name)}
      </li>
    );
  });

  return (
    <div className="card mb-5">
      <div className="card-header text-white bg-secondary">
        <h6>Games featured in</h6>
      </div>
      <div className="card-body">
        <ul className="list-group">{gamesElms}</ul>
      </div>
    </div>
  );
};

export default GamesCard;
