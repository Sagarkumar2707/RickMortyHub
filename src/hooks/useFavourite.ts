import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@store/index';
import {
  addFavouriteThunk,
  removeFavouriteThunk,
} from '@store/slices/favouritesSlice';
import { Character, FavouriteCharacter } from '@types/api.types';

/**
 * Return type of the useFavourite hook
 */
interface UseFavouriteReturn {
  isFavourite: boolean;
  toggleFavourite: () => void;
}

/**
 * Custom hook to manage favourite state for a single character.
 * Reads from Redux state and syncs with SQLite via thunks.
 *
 * @param character - The Character object to manage
 * @returns isFavourite boolean and toggleFavourite function
 *
 * @example
 * const { isFavourite, toggleFavourite } = useFavourite(character);
 */
const useFavourite = (character: Character): UseFavouriteReturn => {
  const dispatch = useAppDispatch();
  const favouriteItems = useAppSelector(state => state.favourites.items);

  /**
   * Checks if the character is in the favourites list.
   * Memoized to avoid recalculation on every render.
   */
  const isFavourite = useMemo(
    () => favouriteItems.some(item => item.id === character.id),
    [favouriteItems, character.id],
  );

  /**
   * Toggles the favourite state of the character.
   * Adds to SQLite + Redux if not a favourite.
   * Removes from SQLite + Redux if already a favourite.
   */
  const toggleFavourite = useCallback(() => {
    if (isFavourite) {
      dispatch(removeFavouriteThunk(character.id));
    } else {
      const favourite: FavouriteCharacter = {
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        gender: character.gender,
        image: character.image,
        locationName: character.location.name,
        originName: character.origin.name,
        savedAt: new Date().toISOString(),
      };
      dispatch(addFavouriteThunk(favourite));
    }
  }, [isFavourite, character, dispatch]);

  return { isFavourite, toggleFavourite };
};

export default useFavourite;
