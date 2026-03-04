"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const PAGE_SIZE = 10;

interface UseInfiniteScrollOptions<T> {
  data: T[];
  pageSize?: number;
}

interface UseInfiniteScrollResult<T> {
  visibleData: T[];
  isLoading: boolean;
  hasMore: boolean;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

export function useInfiniteScroll<T>({
  data,
  pageSize = PAGE_SIZE,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollResult<T> {
  const [displayCount, setDisplayCount] = useState(pageSize);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasMore = displayCount < data.length;
  const visibleData = data.slice(0, displayCount);

  // Reset when data changes (e.g. category filter)
  useEffect(() => {
    setDisplayCount(pageSize);
  }, [data.length, pageSize]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    // Simulate fetch delay
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + pageSize, data.length));
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore, pageSize, data.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  return { visibleData, isLoading, hasMore, sentinelRef };
}
