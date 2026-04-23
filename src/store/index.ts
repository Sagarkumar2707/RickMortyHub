import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import favouritesReducer from './slices/favouritesSlice';
import filtersReducer from './slices/filtersSlice';

/**
 * Root Redux store configuration.
 * Combines favourites and filters slices.
 */
export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    filters: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

/** RootState type — inferred from the store */
export type RootState = ReturnType<typeof store.getState>;

/** AppDispatch type — inferred from the store */
export type AppDispatch = typeof store.dispatch;

/**
 * Typed dispatch hook — use instead of plain useDispatch
 */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

/**
 * Typed selector hook — use instead of plain useSelector
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
