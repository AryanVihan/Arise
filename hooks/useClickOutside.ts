import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

/**
 * A custom hook that triggers a callback when a click is detected outside of the specified element(s)
 * @param ref - React ref object or array of refs to check for outside clicks
 * @param handler - Callback function to be called when a click outside is detected
 * @param excludeRefs - Additional refs to exclude from the outside click check
 */
function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | RefObject<T>[],
  handler: (event: Event) => void,
  excludeRefs: RefObject<HTMLElement>[] = []
) {
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendent elements
      const refs = Array.isArray(ref) ? ref : [ref];
      const shouldTrigger = refs.every(
        (r) => !r.current || r.current.contains(event.target as Node)
      );

      // Check if click is inside any of the excluded refs
      const isExcluded = excludeRefs.some(
        (excludeRef) =>
          excludeRef.current && excludeRef.current.contains(event.target as Node)
      );

      if (shouldTrigger || isExcluded) {
        return;
      }

      handler(event);
    };

    // Add event listeners
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, excludeRefs]);
}

export default useClickOutside;
