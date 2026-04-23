import { useMemo } from 'react';

/**
 * Extracts episode IDs from an array of episode URLs.
 * Episode URLs follow the format: https://rickandmortyapi.com/api/episode/1
 *
 * @param episodeUrls - Array of episode URL strings
 * @returns Array of numeric episode IDs
 *
 * @example
 * const ids = useEpisodeIds(['https://rickandmortyapi.com/api/episode/1'])
 * // returns [1]
 */
const useEpisodeIds = (episodeUrls: string[]): number[] => {
  return useMemo(() => {
    return episodeUrls
      .map(url => {
        const parts = url.split('/');
        const id = parseInt(parts[parts.length - 1], 10);
        return isNaN(id) ? null : id;
      })
      .filter((id): id is number => id !== null);
  }, [episodeUrls]);
};

export default useEpisodeIds;
