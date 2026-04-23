/**
 * Extracts numeric resident character IDs from an array of
 * resident URLs returned by the location API.
 * URLs follow the format:
 * https://rickandmortyapi.com/api/character/1
 *
 * @param urls - Array of resident URL strings
 * @returns Array of numeric character IDs
 *
 * @example
 * extractResidentIds(['https://rickandmortyapi.com/api/character/5'])
 * // returns [5]
 */
export const extractResidentIds = (urls: string[]): number[] => {
  return urls
    .map(url => {
      const parts = url.split('/');
      const id = parseInt(parts[parts.length - 1], 10);
      return isNaN(id) ? null : id;
    })
    .filter((id): id is number => id !== null);
};
