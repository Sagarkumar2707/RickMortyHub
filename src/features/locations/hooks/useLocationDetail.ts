import { useQuery } from '@tanstack/react-query';
import { fetchLocationById } from '@api/axiosInstance';
import { Location } from '@types/api.types';

/**
 * Custom hook for fetching a single location by ID.
 * Uses useQuery with caching enabled.
 *
 * @param id - The location ID to fetch
 * @returns Query result with location data
 */
const useLocationDetail = (id: number) => {
  return useQuery<Location, Error>({
    queryKey: ['location', id],
    queryFn: () => fetchLocationById(id),
    staleTime: 10 * 60 * 1000,
    retry: 2,
    enabled: id > 0,
  });
};

export default useLocationDetail;
