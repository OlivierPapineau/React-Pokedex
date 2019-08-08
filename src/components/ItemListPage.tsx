import { IRegApiObject } from "../typings/PokemonTypes";
import { Link } from "react-router-dom";
import BsList from "./bootstrapComponents/BsList";
import BsListItem from "./bootstrapComponents/BsListItem";
import fetchPokemon from "./pokemonPageElements/methods/fetchPokemon";
import getIdFromUrl from "../helpers/getIdFormUrl";
import normalize from "../helpers/normalize";
import React, { Component } from "react";
import Spinner from "./statusComponents/Spinner";

export interface IItemLibrary {
  count: number;
  next: string;
  previous: string | null;
  results: IRegApiObject[];
}

interface IItemListPageState {
  count: number;
  error: any | null;
  limit: number;
  loading: boolean;
  offset: number;
  itemLibrary: any;
  values: { [key: string]: string };
}

const initState = (): IItemListPageState => {
  return {
    count: 0,
    error: null,
    limit: 999,
    loading: true,
    offset: 0,
    itemLibrary: {} as IItemLibrary,
    values: {} as { [key: string]: string },
  };
};

//Creating this page as a class component to compare with function component with hooks
class ItemListPage extends Component<IItemListPageState, {}> {
  readonly state = initState();

  componentDidMount() {
    console.log("item fetch");
    this.fetchData();
  }

  fetchData = async () => {
    const { limit, offset } = this.state;
    const fetch = await fetchPokemon(limit, offset, "item");
    this.setState({
      ...this.state,
      count: fetch.count,
      limit,
      loading: false,
      offset,
      itemLibrary: fetch,
    });
  };

  render() {
    const { results } = this.state.itemLibrary;
    if (this.state.loading) return <Spinner />;

    return (
      <div className="container mt-5">
        <h3>Items</h3>
        <BsList listType="ordered">
          {results.map((itemObj: IRegApiObject) => {
            const { name, url } = itemObj;
            return (
              <BsListItem key={itemObj.name}>
                <Link to={`/items/${getIdFromUrl(url)}`}>
                  {normalize(name)}
                </Link>
              </BsListItem>
            );
          })}
        </BsList>
      </div>
    );
  }
}

export default ItemListPage;
