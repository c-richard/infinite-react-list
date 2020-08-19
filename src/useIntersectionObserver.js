import { useEffect } from 'react';

export default (observerRef, observeeRef, callback) => {
  if (!(typeof callback === 'function')) throw new TypeError('callback must be a function');

  useEffect(() => {
    if (!(observerRef.current instanceof HTMLElement)) throw new TypeError('observerRef.current is not of HTMLElement type');
    if (!(observeeRef.current instanceof HTMLElement)) throw new TypeError('observeeRef.current is not of HTMLElement type');

    const observer = new IntersectionObserver(callback, { root: observerRef.current });
    observer.observe(observeeRef.current);
  }, []);
};
