import { renderHook, act } from '@testing-library/react-native';
import useDebounce from '../hooks/useDebounce';

describe('useDebounce', () => {
  jest.useFakeTimers();

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should update value after the specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    // Change the value
    rerender({ value: 'updated', delay: 500 });

    // Should still be initial before delay
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Should now be updated
    expect(result.current).toBe('updated');
  });

  it('should cancel previous timer when value changes rapidly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    rerender({ value: 'first-update', delay: 500 });
    
    act(() => {
      jest.advanceTimersByTime(250);
    });

    rerender({ value: 'second-update', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Still shouldn't be updated to first-update because it was canceled
    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Now it should be second-update
    expect(result.current).toBe('second-update');
  });
});
