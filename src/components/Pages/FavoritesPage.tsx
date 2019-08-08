import React, { useState, useEffect } from "react";
import getLocalStorage from "../../helpers/getLocalStorage";
import normalize from "../../helpers/normalize";
import { Link } from "react-router-dom";
import Sprite from "../Pages/_pageElements/pokemonPageElements/Sprite";
import BsButton, { EButtonColors } from "../bootstrapComponents/BsButton";

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
    console.log("CONTENT: ", lsContent);

    const list: IFavoritePokemon[] = [];

    for (const pokemon of lsContent) {
      list.push(pokemon !== null && JSON.parse(pokemon));
    }
    // lsContent.forEach(pokemon => {

    // });
    console.log(list);
    setState({
      pokemonList: list,
    });
  };

  useEffect(() => {
    getFavPokemon();
  }, []);

  const removePokemon = (pokemonId: string) => {
    window.localStorage.removeItem(`pokemon${pokemonId}`);
    let newState = { ...state };
    newState.pokemonList.forEach((pokemon, index) => {
      if (pokemon.id === pokemonId) {
        newState.pokemonList.splice(index, 1);
      }
    });
    setState(newState);
  };

  return (
    <div className="container mt-5">
      <h3>Favorites</h3>
      <div className="row">
        {state.pokemonList.map(pokemon => {
          return (
            <div className="col-sm-3 mb-2" key={pokemon.name}>
              <div className="card text-center">
                <div className="card-body">
                  <h5>
                    <Link to={`/pokemon/${pokemon.id}`}>
                      {normalize(pokemon.name)}
                    </Link>
                  </h5>
                  <Sprite id={pokemon.id} />
                  <BsButton
                    color={EButtonColors.DANGER}
                    onClick={() => {
                      removePokemon(pokemon.id);
                    }}
                    outline={true}
                    type="button"
                  >
                    Delete
                  </BsButton>
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
