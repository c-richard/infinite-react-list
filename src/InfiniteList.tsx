import React, { useState, useRef, useEffect } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

type InfiniteListProps = {
  next: () => ({ value: boolean, done: boolean})
};

const InfiniteList = ({ next } : InfiniteListProps) : React.ReactElement => {
  // Intersection observer setup
  const listRef = useRef<HTMLUListElement>(null);
  const waypointRef = useRef<HTMLDivElement>(null);
  const [isWaypointIntersectingList] = useIntersectionObserver(listRef, waypointRef);

  // List representation
  const [items, setItems] = useState<React.ReactNode[]>([]);
  const [isExtending, setIsExtending] = useState<boolean>(false);
  const [isListComplete, setIsListComplete] = useState<boolean>(false);

  useEffect(() => {
    if (
      !(isExtending || isListComplete)
      && isWaypointIntersectingList
    ) {
      setIsExtending(true);
      setTimeout(() => {
        const { value, done } = next();

        setItems([...items, value]);
        setIsListComplete(done);
        setIsExtending(false);
      }, 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWaypointIntersectingList, isExtending]);

  return (
    <ul
      ref={listRef}
      style={{
        maxHeight: 150,
        overflow: 'scroll',
      }}
    >
      <div style={{ position: 'relative' }}>
        { items }
        <div
          ref={waypointRef}
          style={{
            position: 'absolute',
            width: 0,
            bottom: 0,
            height: 300,
          }}
        />
      </div>
    </ul>
  );
};

export default InfiniteList;
