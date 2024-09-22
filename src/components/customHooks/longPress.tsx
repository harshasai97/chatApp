import { useCallback, useRef } from "react";

const useLongPress = (onLongPress: (value: any) => void, delay = 300) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(
    (value: any) => {
      clear(); // Clear any existing timeout before setting a new one
      timeoutRef.current = setTimeout(() => {
        onLongPress(value);
      }, delay);
    },
    [onLongPress, delay]
  );

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    onMouseDown: (value: any) => start(value),
    onMouseUp: clear,
    onTouchStart: (value: any) => start(value),
    onTouchEnd: clear,
  };
};

export default useLongPress;
