import React from "react";
import { IPokemon, IType } from "../../typings/PokemonTypes";
import normalize from "../../helpers/normalize";
import Sprite from "./Sprite";

interface ISpriteCardProps {
  imagePath: string;
  pokemonObject: IPokemon;
}

const SpriteCard = (props: ISpriteCardProps) => {
  const { pokemonObject } = props;
  const { id } = pokemonObject;
  const stringTypes = ["id", "base_experience", "height", "weight"];

  let wantedInfo = [];

  for (const [key, value] of Object.entries(pokemonObject)) {
    if (key === "types") {
      let typeElm = (
        <li className="list-group-item" key={key}>
          <span className="mb-2">{`${normalize(key)}: `}</span>
          <ul className="list-group">
            {value.map((typeObj: IType) => {
              return (
                <li className="list-group-item" key={typeObj.type.name}>
                  {`${normalize(typeObj.type.name)}`}
                </li>
              );
            })}
          </ul>
        </li>
      );
      wantedInfo.push(typeElm);
    }
    if (stringTypes.indexOf(key) !== -1) {
      wantedInfo.push(
        <li key={key} className="list-group-item">{`${normalize(
          key,
        )}: ${value}`}</li>,
      );
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h6>Sprite</h6>
      </div>
      <div className="card-body">
        <span className="spCard__image">
          <Sprite id={id} />
        </span>
        <div className="card">
          <div className="card-header">
            <h6 className="card-title">General informations</h6>
          </div>
          <div className="card-body">
            <ul className="list-group">{wantedInfo}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpriteCard;
