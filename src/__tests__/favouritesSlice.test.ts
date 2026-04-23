import favouritesReducer, { clearFavourites } from '../store/slices/favouritesSlice';
import { addFavouriteThunk, removeFavouriteThunk } from '../store/slices/favouritesSlice';
import { FavouriteCharacter } from '@types/api.types';

// Mock the database module
jest.mock('../database/db', () => ({
  addFavourite: jest.fn(),
  removeFavourite: jest.fn(),
  getAllFavourites: jest.fn(),
}));

describe('favouritesSlice', () => {
  const initialState = {
    items: [],
    isLoading: false,
    error: null,
  };

  const mockCharacter: FavouriteCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    locationName: 'Earth',
    savedAt: '2023-01-01T00:00:00Z',
  };

  it('should return the initial state', () => {
    expect(favouritesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle clearFavourites', () => {
    const stateWithItems = {
      ...initialState,
      items: [mockCharacter],
    };
    const actual = favouritesReducer(stateWithItems, clearFavourites());
    expect(actual.items).toEqual([]);
  });

  it('should handle addFavouriteThunk.fulfilled', () => {
    const action = { type: addFavouriteThunk.fulfilled.type, payload: mockCharacter };
    const state = favouritesReducer(initialState, action);
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockCharacter);
  });

  it('should not add duplicate characters in addFavouriteThunk.fulfilled', () => {
    const stateWithItem = {
      ...initialState,
      items: [mockCharacter],
    };
    const action = { type: addFavouriteThunk.fulfilled.type, payload: mockCharacter };
    const state = favouritesReducer(stateWithItem, action);
    expect(state.items).toHaveLength(1);
  });

  it('should handle removeFavouriteThunk.fulfilled', () => {
    const stateWithItems = {
      ...initialState,
      items: [mockCharacter],
    };
    const action = { type: removeFavouriteThunk.fulfilled.type, payload: 1 };
    const state = favouritesReducer(stateWithItems, action);
    expect(state.items).toHaveLength(0);
  });
});
