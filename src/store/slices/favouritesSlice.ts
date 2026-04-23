import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  FavouriteCharacter,
  FavouritesState,
} from '@types/api.types';
import {
  getAllFavourites,
  addFavourite,
  removeFavourite,
} from '@database/db';

// ============================================================
// ASYNC THUNKS
// ============================================================

/**
 * Loads all favourites from SQLite into Redux state.
 * Called once on app startup.
 */
export const loadFavourites = createAsyncThunk<FavouriteCharacter[]>(
  'favourites/loadFavourites',
  async (_, { rejectWithValue }) => {
    try {
      return getAllFavourites();
    } catch (error) {
      return rejectWithValue('Failed to load favourites from database.');
    }
  },
);

/**
 * Adds a character to favourites in both SQLite and Redux state.
 * @param character - FavouriteCharacter to save
 */
export const addFavouriteThunk = createAsyncThunk<
  FavouriteCharacter,
  FavouriteCharacter
>(
  'favourites/addFavourite',
  async (character, { rejectWithValue }) => {
    try {
      addFavourite(character);
      return character;
    } catch (error) {
      return rejectWithValue('Failed to add favourite.');
    }
  },
);

/**
 * Removes a character from favourites in both SQLite and Redux state.
 * @param id - Character ID to remove
 */
export const removeFavouriteThunk = createAsyncThunk<number, number>(
  'favourites/removeFavourite',
  async (id, { rejectWithValue }) => {
    try {
      removeFavourite(id);
      return id;
    } catch (error) {
      return rejectWithValue('Failed to remove favourite.');
    }
  },
);

// ============================================================
// SLICE
// ============================================================

const initialState: FavouritesState = {
  items: [],
  isLoading: false,
  error: null,
};

/**
 * Favourites slice — manages saved characters.
 * Syncs with SQLite on every add/remove operation.
 */
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    /**
     * Clears all favourites from Redux state (does NOT affect SQLite).
     * Used for testing purposes only.
     */
    clearFavourites: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    // Load Favourites
    builder
      .addCase(loadFavourites.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loadFavourites.fulfilled,
        (state, action: PayloadAction<FavouriteCharacter[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        },
      )
      .addCase(loadFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Add Favourite
    builder
      .addCase(addFavouriteThunk.pending, state => {
        state.error = null;
      })
      .addCase(
        addFavouriteThunk.fulfilled,
        (state, action: PayloadAction<FavouriteCharacter>) => {
          const exists = state.items.some(
            item => item.id === action.payload.id,
          );
          if (!exists) {
            state.items.unshift(action.payload);
          }
        },
      )
      .addCase(addFavouriteThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Remove Favourite
    builder
      .addCase(removeFavouriteThunk.pending, state => {
        state.error = null;
      })
      .addCase(
        removeFavouriteThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            item => item.id !== action.payload,
          );
        },
      )
      .addCase(removeFavouriteThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
