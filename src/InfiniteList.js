import React, { useState, useRef, useEffect } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

const InfiniteList = ({ next }) => {
  // Intersection observer setup
  const observerRef = useRef(null);
  const observeeRef = useRef(null);
  const [isIntersecting] = useIntersectionObserver(observerRef, observeeRef);

  const [items, setItems] = useState([]);
  const [isExtending, setIsExtending] = useState(false);
  const [isWaypointAboveScroll, setIsWaypointAboveScroll] = useState(false);
  const [isListComplete, setIsListComplete] = useState(false);

  useEffect(() => {
    if (!isListComplete && !isExtending && (isIntersecting || isWaypointAboveScroll)) {
      setIsExtending(true);
      setTimeout(() => {
        const { value, done } = next();

        setItems([...items, value]);
        setIsListComplete(done);
        setIsExtending(false);
        setIsWaypointAboveScroll(observeeRef.current.offsetTop < observerRef.current.scrollTop);
      }, 100);
    }
  }, [isIntersecting, isExtending, isWaypointAboveScroll]);

  return (
    <ul
      ref={observerRef}
      style={{
        border: '1px dashed salmon',
        maxHeight: 150,
        overflow: 'scroll',
        position: 'relative', // sets list container as offsetParent
      }}
    >
      { items.slice(0, -20).map((a) => a) }
      <div ref={observeeRef} style={{ border: '1px solid green' }} />
      { items.slice(-20).map((a) => a) }
    </ul>
  );
};

export default InfiniteList;
