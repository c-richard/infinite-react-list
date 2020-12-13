/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';

const useIntersectionObserver = (
  observerRef : React.RefObject<HTMLElement>,
  ...observeeRefs : React.RefObject<HTMLElement>[]
) : boolean[] => {
  const [isIntersecting, setIsIntersecting] = useState<boolean[]>(observeeRefs.map(() => false));
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // When the observer changes create a new intersection observer
    observer.current = new IntersectionObserver(
      (entries) => {
        setIsIntersecting(entries.map((entry) => entry.isIntersecting));
      },
      { root: observerRef.current },
    );

    // For each observee ensure the observer is observing
    observeeRefs.forEach(
      (observeeRef : React.RefObject<HTMLElement>) => {
        if (observeeRef.current !== null && observer.current !== null) {
          observer.current.observe(observeeRef.current);
        }
      },
    );

    return () => {
      if (observer.current !== null) observer.current.disconnect();
    };
  }, [observerRef, ...observeeRefs]);

  return isIntersecting;
};

export default useIntersectionObserver;
