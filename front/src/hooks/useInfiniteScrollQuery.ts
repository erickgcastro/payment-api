import {
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

type Props<T> = {
  initialPageParam?: number;
  queryKey: QueryKey;
  queryFn: (props: { pageParam?: number }) => Promise<T[]>;
  pageLimit: number;
  options?: Omit<
    UseInfiniteQueryOptions<any, any, any, any, any, any>,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >;
};

const useInfiniteScrollQuery = <T>({
  initialPageParam = 1,
  queryFn,
  queryKey,
  options,
  pageLimit,
}: Props<T>) => {
  const [ref, inView] = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      initialPageParam,
      queryKey,
      queryFn,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === pageLimit ? allPages.length + 1 : undefined;
      },
      ...options,
    });

  const fetchData = useCallback(async () => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      await fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage, hasNextPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const list = useMemo(() => {
    const items: T[] = [];
    data?.pages.map((page: any) => {
      items.push(...page);
    });
    return items;
  }, [data?.pages]);

  return {
    data: list,
    inViewRef: ref,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useInfiniteScrollQuery;
