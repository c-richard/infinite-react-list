import React, { useState, useRef, useEffect } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

const ItemGenerator = ({ next }) => {
  const [items, setItems] = useState([]);
  const [isExtendingList, setIsExtendingList] = useState(false);
  const [waypointAboveScroll, setWaypointAboveScroll] = useState(false);
  const [complete, setComplete] = useState(false);

  const observerRef = useRef(null);
  const observeeRef = useRef(null);
  const [isIntersecting] = useIntersectionObserver(observerRef, observeeRef);

  useEffect(() => {
    if (!complete && (isIntersecting || waypointAboveScroll) && !isExtendingList) {
      setIsExtendingList(true);
      setTimeout(() => {
        const {
          value,
          done,
        } = next();
        setItems([...items, value]);
        setComplete(done);
        setIsExtendingList(false);
        setWaypointAboveScroll(observeeRef.current.offsetTop < observerRef.current.scrollTop);
      }, 100);
    }
  }, [isIntersecting, isExtendingList, waypointAboveScroll]);

  return (
    <ul ref={observerRef} style={{ border: '1px solid salmon', maxHeight: '150px', overflow: 'scroll', position: 'relative' }}>
      { items.slice(0, -20).map((a) => a) }
      <div ref={observeeRef} style={{ border: '1px solid green' }} />
      { items.slice(-20).map((a) => a) }
    </ul>
  );
};

export default ItemGenerator;
