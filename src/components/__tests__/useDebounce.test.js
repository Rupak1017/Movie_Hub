import { renderHook, act } from '@testing-library/react';
import useDebounce from '../../hooks/useDebounce'; // ✅ relative import
import '@testing-library/jest-dom';

jest.useFakeTimers();

describe('useDebounce', () => {
  test('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));
    expect(result.current).toBe('hello');
  });

  test('updates debounced value after delay', () => {
    let value = 'initial';
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    value = 'updated';
    rerender();

    // Should still be old value
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now it should be updated
    expect(result.current).toBe('updated');
  });

  test('resets timer if value changes before delay', () => {
    let value = 'one';
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    value = 'two';
    rerender();
    act(() => {
      jest.advanceTimersByTime(300); // Not enough yet
    });

    value = 'three';
    rerender();
    act(() => {
      jest.advanceTimersByTime(500); // Restarted
    });

    expect(result.current).toBe('three');
  });
});
