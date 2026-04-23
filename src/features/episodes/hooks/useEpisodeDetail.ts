import { useQuery } from '@tanstack/react-query';
import { fetchEpisodeById } from '@api/axiosInstance';
import { Episode } from '@types/api.types';

/**
 * Custom hook for fetching a single episode by ID.
 * Uses useQuery with caching enabled.
 *
 * @param id - The episode ID to fetch
 * @returns Query result with episode data
 */
const useEpisodeDetail = (id: number) => {
  return useQuery<Episode, Error>({
    queryKey: ['episode', id],
    queryFn: () => fetchEpisodeById(id),
    staleTime: 10 * 60 * 1000,
    retry: 2,
    enabled: id > 0,
  });
};

export default useEpisodeDetail;
