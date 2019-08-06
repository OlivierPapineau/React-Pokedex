import React, { useState, useEffect } from 'react';
import getLocalStorage from '../helpers/getLocalStorage';
import BsList from './bootstrapComponents/BsList';
import BsListItem from './bootstrapComponents/BsListItem';
import normalize from '../helpers/normalize';
import { Link } from 'react-router-dom';
import Sprite from './pokemonPageElements/Sprite';
import BsButton, { EButtonColors } from './bootstrapComponents/BsButton';

interface IFavoritePokemon {
  name: string;
  id: string;
}

interface IFavoritePagesState {
  pokemonList: IFavoritePokemon[];
}

const initState: IFavoritePagesState = {
  pokemonList: [],
};

const FavoritesPage = () => {
  const [state, setState] = useState(initState);

  const getFavPokemon = async () => {
    const lsContent = await getLocalStorage();
    const list: IFavoritePokemon[] = [];
    lsContent.forEach(pokemon => {
      list.push(pokemon !== null && JSON.parse(pokemon));
    });
    console.log(list);
    setState({
      pokemonList: list,
    });
  };

  useEffect(
    () => {
      getFavPokemon();
    },
    [localStorage],
  );

  return (
    <div className="container mt-5">
      <h3>Favorites</h3>
      <div className="row">
        {state.pokemonList.map(pokemon => {
          return (
            <div className="col-sm-3 mb-2">
              <div className="card text-center">
                <div className="card-body">
                  <h5>
                    <Link to={`/pokemon/${pokemon.id}`}>{normalize(pokemon.name)}</Link>
                  </h5>
                  <Sprite id={pokemon.id} />
                  <div>
                    <BsButton type="button" outline={true} color={EButtonColors.DANGER}>
                      Delete
                    </BsButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesPage;
