import React, { useState, useRef, useEffect } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

const ItemGenerator = ({ itemGenerator }) => {
  const [items, setItems] = useState([]);
  const [isExtendingList, setIsExtendingList] = useState(false);
  const [waypointAboveScroll, setWaypointAboveScroll] = useState(false);

  const observerRef = useRef(null);
  const observeeRef = useRef(null);
  const [isIntersecting] = useIntersectionObserver(observerRef, observeeRef);

  useEffect(() => {
    if ((isIntersecting || waypointAboveScroll) && !isExtendingList) {
      setIsExtendingList(true);
      setTimeout(() => {
        const newItem = itemGenerator();
        setItems([...items, newItem]);
        setIsExtendingList(false);
        setWaypointAboveScroll(observeeRef.current.offsetTop < observerRef.current.scrollTop);
      }, 100);
    }
  }, [isIntersecting, isExtendingList, waypointAboveScroll]);

  return (
    <ul ref={observerRef} style={{ border: '1px solid salmon', maxHeight: '150px', overflow: 'scroll' }}>
      { items.slice(0, -20).map((a) => a) }
      <div ref={observeeRef} style={{ border: '1px solid green' }} />
      { items.slice(-20).map((a) => a) }
    </ul>
  );
};

export default ItemGenerator;
