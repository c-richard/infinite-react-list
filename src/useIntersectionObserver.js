import { useEffect, useState } from 'react';

export default (observerRef, observeeRef) => {
  const [isIntersecting, setIsIntersecting] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { root: observerRef.current });

    observer.observe(observeeRef.current);

    return () => observer.disconnect();
  }, []);

  return isIntersecting;
};
