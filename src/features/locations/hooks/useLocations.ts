import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchLocations } from '@api/axiosInstance';
import { ApiResponse, Location, LocationFilters } from '@types/api.types';

/**
 * Custom hook for fetching paginated locations list.
 * Uses useInfiniteQuery for infinite scroll support.
 *
 * @param filters - Optional location filters (name, type, dimension)
 * @returns Infinite query result with location pages
 */
const useLocations = (filters: LocationFilters = {}) => {
  return useInfiniteQuery<ApiResponse<Location>, Error>({
    queryKey: ['locations', filters],
    queryFn: ({ pageParam }) =>
      fetchLocations({ ...filters, page: pageParam as number }),
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

export default useLocations;
