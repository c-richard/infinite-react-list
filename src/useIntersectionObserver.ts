import { useEffect, useState } from 'react';

const useIntersectionObserver = (
  observerRef : React.RefObject<HTMLElement>,
  ...observeeRefs : React.RefObject<HTMLElement>[]
) : boolean[] => {
  const [isIntersecting, setIsIntersecting] = useState<boolean[]>(observeeRefs.map(() => false));

  useEffect(() => {
    // When the observer or observees change, create a new observer
    const observer = new IntersectionObserver(
      (entries) => setIsIntersecting(entries.map((entry) => entry.isIntersecting)),
      { root: observerRef.current },
    );

    // For each observee ensure the observer is observing
    observeeRefs.forEach(
      (observeeRef : React.RefObject<HTMLElement>) => {
          if (observeeRef.current !== null) {
            observer.observe(observeeRef.current)
          }
      }
    );

    return () => observer.disconnect();
  }, [observerRef, observeeRefs]);

  return isIntersecting;
};

export default useIntersectionObserver;
