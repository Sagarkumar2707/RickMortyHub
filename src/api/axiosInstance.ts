import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL } from '@constants/index';
import {
  ApiResponse,
  Character,
  CharacterFilters,
  Episode,
  EpisodeFilters,
  Location,
  LocationFilters,
} from '@types/api.types';

// Base axios instance with timeout and default headers
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Log outgoing requests in dev
axiosInstance.interceptors.request.use(
  config => {
    if (__DEV__) {
      console.log(
        `[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`,
      );
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Handle response errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (__DEV__) {
      console.error(`[API ERROR] ${error.response?.status} — ${error.message}`);
    }
    if (!error.response) {
      return Promise.reject(
        new Error('Network error. Please check your connection.'),
      );
    }
    if (error.response.status === 404) {
      return Promise.reject(new Error('Resource not found.'));
    }
    if (error.response.status >= 500) {
      return Promise.reject(new Error('Server error. Please try again later.'));
    }
    return Promise.reject(error);
  },
);

// Shared fallback for 404 / empty list responses
const emptyPage = {
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
};

const handle404 = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      return emptyPage;
    }
  } else if (error instanceof Error) {
    // Optional fallback if you REALLY expect this message
    if (error.message === 'Resource not found.') {
      return emptyPage;
    }
  }
  throw error;
};

// ── Character API ─────────────────────────────────────────────

// Paginated list with optional filters
export const fetchCharacters = async (
  filters: CharacterFilters = {},
): Promise<ApiResponse<Character>> => {
  const params: Record<string, string | number> = {};
  if (filters.page) params.page = filters.page;
  if (filters.name) params.name = filters.name;
  if (filters.status) params.status = filters.status;
  if (filters.species) params.species = filters.species;
  if (filters.gender) params.gender = filters.gender;
  try {
    const response = await axiosInstance.get<ApiResponse<Character>>(
      '/character',
      { params },
    );
    return response.data;
  } catch (error: unknown) {
    return handle404(error) as ApiResponse<Character>;
  }
};

// Single character by ID
export const fetchCharacterById = async (id: number): Promise<Character> => {
  const response = await axiosInstance.get<Character>(`/character/${id}`);
  return response.data;
};

// Multiple characters by IDs (used in episode/location detail)
export const fetchCharactersByIds = async (
  ids: number[],
): Promise<Character[]> => {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const response = await axiosInstance.get<Character>(`/character/${ids[0]}`);
    return [response.data];
  }
  const response = await axiosInstance.get<Character[]>(
    `/character/${ids.join(',')}`,
  );
  return response.data;
};

// ── Episode API ───────────────────────────────────────────────

// Paginated list with optional filters
export const fetchEpisodes = async (
  filters: EpisodeFilters = {},
): Promise<ApiResponse<Episode>> => {
  const params: Record<string, string | number> = {};
  if (filters.page) params.page = filters.page;
  if (filters.name) params.name = filters.name;
  if (filters.episode) params.episode = filters.episode;
  try {
    const response = await axiosInstance.get<ApiResponse<Episode>>('/episode', {
      params,
    });
    return response.data;
  } catch (error: unknown) {
    return handle404(error) as ApiResponse<Episode>;
  }
};

// Single episode by ID
export const fetchEpisodeById = async (id: number): Promise<Episode> => {
  const response = await axiosInstance.get<Episode>(`/episode/${id}`);
  return response.data;
};

// ── Location API ──────────────────────────────────────────────

// Paginated list with optional filters
export const fetchLocations = async (
  filters: LocationFilters = {},
): Promise<ApiResponse<Location>> => {
  const params: Record<string, string | number> = {};
  if (filters.page) params.page = filters.page;
  if (filters.name) params.name = filters.name;
  if (filters.type) params.type = filters.type;
  if (filters.dimension) params.dimension = filters.dimension;
  try {
    const response = await axiosInstance.get<ApiResponse<Location>>(
      '/location',
      { params },
    );
    return response.data;
  } catch (error: unknown) {
    return handle404(error) as ApiResponse<Location>;
  }
};

// Single location by ID
export const fetchLocationById = async (id: number): Promise<Location> => {
  const response = await axiosInstance.get<Location>(`/location/${id}`);
  return response.data;
};

export default axiosInstance;
