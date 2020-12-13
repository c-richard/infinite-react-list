import React, { useState, useRef, useEffect } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

type InfiniteListProps = {
  next: () => ({ value: React.ReactElement, done: boolean})
};

type List = {
  items: React.ReactElement[],
  isListComplete: boolean,
};

const InfiniteList = ({ next } : InfiniteListProps) : React.ReactElement => {
  // Intersection observer setup
  const listRef = useRef<HTMLUListElement>(null);
  const waypointRef = useRef<HTMLDivElement>(null);
  const [isWaypointIntersectingList] = useIntersectionObserver(listRef, waypointRef);

  // List representation
  const [{ items, isListComplete }, setList] = useState<List>({ items: [], isListComplete: false });

  useEffect(() => {
    if (!isListComplete && isWaypointIntersectingList) {
      setTimeout(() => {
        const { value, done } = next();
        setList({
          items: [...items, value],
          isListComplete: done,
        });
      }, 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWaypointIntersectingList, items]);

  return (
    <ul
      ref={listRef}
      style={{
        maxHeight: 300,
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
