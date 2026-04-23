import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FiltersState,
  CharacterStatus,
  CharacterGender,
} from '@types/api.types';

const initialState: FiltersState = {
  characterName: '',
  characterStatus: '',
  characterGender: '',
  activeTab: 'characters',
};

/**
 * Filters slice — manages global UI filter state.
 * Controls character search, status filter, gender filter
 * and the currently active bottom tab.
 */
const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    /**
     * Updates the character name search query.
     * @param name - Search string from the search input
     */
    setCharacterName: (state, action: PayloadAction<string>) => {
      state.characterName = action.payload;
    },

    /**
     * Updates the character status filter.
     * @param status - 'Alive' | 'Dead' | 'unknown' | ''
     */
    setCharacterStatus: (
      state,
      action: PayloadAction<CharacterStatus | ''>,
    ) => {
      state.characterStatus = action.payload;
    },

    /**
     * Updates the character gender filter.
     * @param gender - 'Female' | 'Male' | 'Genderless' | 'unknown' | ''
     */
    setCharacterGender: (
      state,
      action: PayloadAction<CharacterGender | ''>,
    ) => {
      state.characterGender = action.payload;
    },

    /**
     * Updates the currently active bottom tab.
     * @param tab - Tab name string
     */
    setActiveTab: (
      state,
      action: PayloadAction<FiltersState['activeTab']>,
    ) => {
      state.activeTab = action.payload;
    },

    /**
     * Resets all character filters to their default empty values.
     */
    resetFilters: state => {
      state.characterName = '';
      state.characterStatus = '';
      state.characterGender = '';
    },
  },
});

export const {
  setCharacterName,
  setCharacterStatus,
  setCharacterGender,
  setActiveTab,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
