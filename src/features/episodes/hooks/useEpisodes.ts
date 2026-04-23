import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchEpisodes } from '@api/axiosInstance';
import { ApiResponse, Episode, EpisodeFilters } from '@types/api.types';

/**
 * Custom hook for fetching paginated episodes list.
 * Uses useInfiniteQuery for infinite scroll support.
 *
 * @param filters - Optional episode filters (name, episode code)
 * @returns Infinite query result with episode pages
 */
const useEpisodes = (filters: EpisodeFilters = {}) => {
  return useInfiniteQuery<ApiResponse<Episode>, Error>({
    queryKey: ['episodes', filters],
    queryFn: ({ pageParam }) =>
      fetchEpisodes({ ...filters, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.info.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
};

export default useEpisodes;
