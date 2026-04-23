import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '@api/axiosInstance';
import { Character } from '@types/api.types';

/**
 * Custom hook for fetching a single character by ID.
 * Uses useQuery with caching enabled.
 *
 * @param id - The character ID to fetch
 * @returns Query result with character data
 */
const useCharacterDetail = (id: number) => {
  return useQuery<Character, Error>({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
    staleTime: 10 * 60 * 1000,
    retry: 2,
    enabled: id > 0,
  });
};

export default useCharacterDetail;
