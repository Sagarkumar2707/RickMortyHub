export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse<T> {
  info: ApiInfo;
  results: T[];
}

/** Character status values */
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

/** Character gender values */
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterFilters {
  page?: number;
  name?: string;
  status?: CharacterStatus | '';
  species?: string;
  gender?: CharacterGender | '';
}

// Full Episode object returned by the API
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; // Format: S01E01
  characters: string[]; // Array of character URLs
  url: string;
  created: string;
}

// Filter parameters for the episode list endpoint
export interface EpisodeFilters {
  page?: number;
  name?: string;
  episode?: string;
}

// Episode grouped by season for the Episodes screen
export interface EpisodeBySeason {
  season: string;
  data: Episode[];
}

// Full Location object returned by the API
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // Array of character URLs
  url: string;
  created: string;
}

// Filter parameters for the location list endpoint
export interface LocationFilters {
  page?: number;
  name?: string;
  type?: string;
  dimension?: string;
}

// Favourite character stored in SQLite
export interface FavouriteCharacter {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  gender: CharacterGender;
  image: string;
  locationName: string;
  originName: string;
  savedAt: string; // ISO timestamp
}

// Shape of the filters slice in Redux store
export interface FiltersState {
  characterName: string;
  characterStatus: CharacterStatus | '';
  characterGender: CharacterGender | '';
  activeTab: 'characters' | 'episodes' | 'locations' | 'favourites';
}

// Shape of the favourites slice in Redux store
export interface FavouritesState {
  items: FavouriteCharacter[];
  isLoading: boolean;
  error: string | null;
}

// Root stack param list for type-safe navigation
export type RootStackParamList = {
  MainTabs: undefined;
  CharacterDetail: { characterId: number };
  EpisodeDetail: { episodeId: number };
  LocationDetail: { locationId: number };
};

// Bottom tab param list for type-safe navigation
export type BottomTabParamList = {
  Characters: undefined;
  Episodes: undefined;
  Locations: undefined;
  Favourites: undefined;
};
