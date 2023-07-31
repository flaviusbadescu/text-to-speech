import { useEffect, useRef } from "react";

type DebouncedFunction<T extends unknown[]> = (...args: T) => void;

export function useDebounce<T extends unknown[]>(
  callback: DebouncedFunction<T>,
  delay: number
): (...args: T) => void {
  const timerIdRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  return (...args: T) => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }
    timerIdRef.current = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
