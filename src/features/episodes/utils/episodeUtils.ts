import { Episode, EpisodeBySeason } from '@types/api.types';

/**
 * Extracts the season number string from an episode code.
 * Episode codes follow the format S01E01.
 *
 * @param episodeCode - Episode code string e.g. 'S01E01'
 * @returns Season string e.g. 'Season 1'
 *
 * @example
 * getSeasonFromCode('S02E05') // returns 'Season 2'
 */
export const getSeasonFromCode = (episodeCode: string): string => {
  const match = episodeCode.match(/S(\d+)/i);
  if (!match) return 'Unknown Season';
  return `Season ${parseInt(match[1], 10)}`;
};

/**
 * Extracts numeric character IDs from an array of character URLs.
 *
 * @param urls - Array of character URL strings
 * @returns Array of numeric character IDs
 */
export const extractCharacterIds = (urls: string[]): number[] => {
  return urls
    .map(url => {
      const parts = url.split('/');
      const id = parseInt(parts[parts.length - 1], 10);
      return isNaN(id) ? null : id;
    })
    .filter((id): id is number => id !== null);
};

/**
 * Groups a flat array of episodes by season.
 * Returns an array of EpisodeBySeason objects sorted by season.
 *
 * @param episodes - Flat array of Episode objects
 * @returns Array of episodes grouped by season
 */
export const groupEpisodesBySeason = (
  episodes: Episode[],
): EpisodeBySeason[] => {
  const seasonMap = new Map<string, Episode[]>();

  episodes.forEach(episode => {
    const season = getSeasonFromCode(episode.episode);
    if (!seasonMap.has(season)) {
      seasonMap.set(season, []);
    }
    seasonMap.get(season)?.push(episode);
  });

  return Array.from(seasonMap.entries())
    .map(([season, data]) => ({ season, data }))
    .sort((a, b) => a.season.localeCompare(b.season));
};
