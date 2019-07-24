import { IPokedex } from "../../PokemonListPage";

export default function fetchPokemon(
  limit: number,
  offset: number,
  endpoint = "pokemon",
): Promise<IPokedex> {
  return fetch(
    `http://pokeapi.co/api/v2/${endpoint}/?limit=${limit}&offset=${offset}`,
  ).then(response => response.json());
  // transform to support multiple apis
}
