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
  const [isWaypointAboveScroll, setIsWaypointAboveScroll] = useState<boolean>(false);
  const [isListComplete, setIsListComplete] = useState<boolean>(false);

  useEffect(() => {
    if (
      !(isExtending || isListComplete)
      && (isWaypointIntersectingList || isWaypointAboveScroll)
    ) {
      setIsExtending(true);
      setTimeout(() => {
        const { value, done } = next();

        setItems([...items, value]);
        setIsListComplete(done);
        setIsExtending(false);

        if (waypointRef.current !== null && listRef.current !== null) {
          setIsWaypointAboveScroll(waypointRef.current.offsetTop < listRef.current.scrollTop);
        }
      }, 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWaypointIntersectingList, isExtending, isWaypointAboveScroll]);

  return (
    <ul
      ref={listRef}
      style={{
        border: '1px dashed salmon',
        maxHeight: 150,
        overflow: 'scroll',
        position: 'relative', // sets list container as offsetParent
      }}
    >
      { items.slice(0, -20).map((a) => a) }
      <div ref={waypointRef} style={{ border: '1px solid green' }} />
      { items.slice(-20).map((a) => a) }
    </ul>
  );
};

export default InfiniteList;
