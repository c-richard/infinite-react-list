import React, { useState, useRef, useEffect } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

const ItemGenerator = ({ itemGenerator }) => {
  const [items, setItems] = useState([]);
  const [isExtendingList, setIsExtendingList] = useState(false);

  const observerRef = useRef(null);
  const observeeRef = useRef(null);
  const isIntersecting = useIntersectionObserver(observerRef, observeeRef);

  useEffect(() => {
    if (isIntersecting && !isExtendingList) {
      setIsExtendingList(true);
      setTimeout(() => {
        const newItem = itemGenerator();
        setItems([...items, newItem]);
        setIsExtendingList(false);
      }, 100);
    }
  }, [isIntersecting, isExtendingList]);

  return (
    <ul ref={observerRef} style={{ border: '1px solid salmon', maxHeight: '150px', overflow: 'scroll' }}>
      { items.map((a) => a) }
      <div ref={observeeRef} />
    </ul>
  );
};

export default ItemGenerator;
