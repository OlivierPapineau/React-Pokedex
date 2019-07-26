export interface IPokemonListItem {
  name: string;
  url: string;
}

export interface IPokemon {
  abilities: IAbility[];
  base_experience: number;
  forms: IRegApiObject[];
  game_indices: IPokemonGame[];
  height: number;
  held_items?: Item[];
  id: number;
  is_default: boolean;
  location_area_encounters?: string;
  moves: IMove[];
  name: string;
  order: number;
  species: IRegApiObject;
  sprites: ISprites;
  stats: IStat[];
  types: IType[];
  weight: number;
}

export interface IType {
  slot: number;
  type: IRegApiObject;
}

export interface IStat {
  base_stat: number;
  effort: number;
  stat: IRegApiObject;
}

export interface ISprites {
  back_default?: string | null;
  back_female?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  front_default?: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
}

export interface IMove {
  move: IRegApiObject;
  version_group_details: IVersionGroupDetail[];
}

export interface IVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: IRegApiObject;
  version_group: IRegApiObject;
}

export interface IAbility {
  ability: IRegApiObject;
  is_hidden: boolean;
  slot: number;
}

export interface IPokemonGame {
  game_index: number;
  version: IRegApiObject;
}

export interface IRegApiObject {
  name: string;
  url: string;
}

export interface IItemListObject {
  item: IRegApiObject;
  version_details: IVersionDetail[];
}

export interface IVersionDetail {
  rarity: number;
  version: IRegApiObject;
}
