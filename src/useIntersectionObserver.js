import { useEffect, useState } from 'react';

export default (observerRef, ...observeeRefs) => {
  const [isIntersecting, setIsIntersecting] = useState(observeeRefs.map(_ => null));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setIsIntersecting(entries.map((entry) => entry.isIntersecting)),
      { root: observerRef.current },
    );
    observeeRefs.forEach((observeeRef) => observer.observe(observeeRef.current));

    return () => observer.disconnect();
  }, []);

  return isIntersecting;
};
