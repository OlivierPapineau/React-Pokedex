import IRegApiObject from './PokemonTypes';
import ISprites from './PokemonTypes';
import IPokemonListItem from './PokemonTypes';

interface IItem {
  attributes: IRegApiObject[];
  baby_trigger_for: any;
  category: IRegApiObject;
  cost: number;
  effect_entries: IEffect[];
  flavor_text_entries: IFlavorTextEntry[];
  fling_effect: IRegApiObject;
  fling_power: number;
  game_indices: [
    {
      game_index: 245;
      generation: IRegApiObject;
    }
  ];
  held_by_pokemon: IItemHolder[];
  id: number;
  machines: IRegApiObject[];
  name: string;
  names: IName[];
  sprites: ISprites;
}

interface IItemHolder {
  pokemon: IPokemonListItem;
}

interface IFlavorTextEntry {
  language: IRegApiObject;
  text: string;
  version_group: IRegApiObject;
}

interface IEffect {
  effect: string;
  language: IRegApiObject;
  short_effect: string;
}

interface IName {
  language: IRegApiObject;
  name: string;
}
