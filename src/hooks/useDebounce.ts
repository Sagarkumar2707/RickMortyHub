import { useState, useEffect } from 'react';

/**
 * Custom debounce hook — delays updating the returned value
 * until after the specified delay has passed since the last change.
 * Written from scratch — no lodash dependency.
 *
 * @template T - The type of the value being debounced
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns The debounced value
 *
 * @example
 * const debouncedSearch = useDebounce<string>(searchText, 300);
 */
const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
