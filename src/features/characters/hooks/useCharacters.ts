import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCharacters } from '@api/axiosInstance';
import { ApiResponse, Character, CharacterFilters } from '@types/api.types';

/**
 * Custom hook for fetching paginated characters list.
 * Uses useInfiniteQuery for infinite scroll support.
 * Automatically refetches when filters change.
 *
 * @param filters - Character filters (name, status, gender)
 * @returns Infinite query result with character pages
 */
const useCharacters = (filters: CharacterFilters) => {
  return useInfiniteQuery<ApiResponse<Character>, Error>({
    queryKey: ['characters', filters],
    queryFn: ({ pageParam }) =>
      fetchCharacters({ ...filters, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.info.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export default useCharacters;
