import { useCallback, useEffect, useRef } from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { useRecordSelection } from './useRecordSelection';
import { ListControllerResult } from './useListController';
import { useSafeSetState } from '../utils';
import { FilterPayload, MaRecord, SortPayload } from '../types';
import { useSortState } from './useSortState';
import { usePaginationState } from './usePaginationState';
import removeEmpty from '../utils/removeEmpty';
import { SORT_ASC } from './queryReducer';

const refetch = () => {
  throw new Error(
    'refetch is not available for a ListContext built from useList based on local data'
  );
};

export const useList = <RecordType extends MaRecord = any>(
  props: UseListOptions<RecordType>
): UseListValue<RecordType> => {
  const {
    data,
    error,
    filter = defaultFilter,
    isFetching = false,
    isLoading = false,
    page: initialPage = 1,
    limit: initialLimit = 1000,
    sort: initialSort = defaultSort,
  } = props;

  const [fetchingState, setFetchingState] =
    useSafeSetState<boolean>(isFetching);
  const [loadingState, setLoadingState] = useSafeSetState<boolean>(isLoading);

  const [finalItems, setFinalItems] = useSafeSetState<{
    data: RecordType[];
    total: number;
    limit: number;
  }>(() => ({
    data: data || [],
    total: data ? data.length : 0,
    limit: initialLimit,
  }));

  // pagination logic
  const { page, setPage, limit, setLimit } = usePaginationState({
    page: initialPage,
    limit: initialLimit,
  });

  // sort logic
  const { sort, setSort: setSortState } = useSortState(initialSort);
  const setSort = useCallback(
    (sort: SortPayload) => {
      setSortState(sort);
      setPage(1);
    },
    [setPage, setSortState]
  );

  // selection logic
  const [selectedIds, selectionModifiers] = useRecordSelection();

  // filter logic
  const filterRef = useRef(filter);
  const [displayedFilters, setDisplayedFilters] = useSafeSetState<{
    [key: string]: boolean;
  }>({});
  const [filterValues, setFilterValues] = useSafeSetState<{
    [key: string]: any;
  }>(filter);
  const hideFilter = useCallback(
    (filterName: string) => {
      setDisplayedFilters((previousState) => {
        const { [filterName]: _, ...newState } = previousState;
        return newState;
      });
      setFilterValues((previousState) => {
        const { [filterName]: _, ...newState } = previousState;
        return newState;
      });
    },
    [setDisplayedFilters, setFilterValues]
  );
  const showFilter = useCallback(
    (filterName: string, defaultValue: any) => {
      setDisplayedFilters((previousState) => ({
        ...previousState,
        [filterName]: true,
      }));
      setFilterValues((previousState) =>
        removeEmpty({
          ...previousState,
          [filterName]: defaultValue,
        })
      );
    },
    [setDisplayedFilters, setFilterValues]
  );
  const setFilters = useCallback(
    (filters: any, displayedFilters: any) => {
      setFilterValues(removeEmpty(filters));
      if (displayedFilters) {
        setDisplayedFilters(displayedFilters);
      }
      setPage(1);
    },
    [setDisplayedFilters, setFilterValues, setPage]
  );
  // handle filter prop change
  useEffect(() => {
    if (!isEqual(filter, filterRef.current)) {
      filterRef.current = filter;
      setFilterValues(filter);
    }
  });

  // We do all the data processing (filtering, sorting, paginating) client-side
  useEffect(
    () => {
      if (isLoading || !data) return;

      // 1. filter
      let tempData = data.filter((record) =>
        Object.entries(filterValues as { [key: string]: any }).every(
          ([filterName, filterValue]) => {
            const recordValue = get(record, filterName);
            const result = Array.isArray(recordValue)
              ? Array.isArray(filterValue)
                ? recordValue.some((item: any) => filterValue.includes(item))
                : recordValue.includes(filterValue)
              : Array.isArray(filterValue)
              ? filterValue.includes(recordValue)
              : filterValue == recordValue; // eslint-disable-line eqeqeq
            return result;
          }
        )
      );

      const filteredLength = tempData.length;

      // 2. sort
      if (sort.field) {
        tempData = tempData.sort((a, b) => {
          if (get(a, sort.field) > get(b, sort.field)) {
            return sort.order === 'ASC' ? 1 : -1;
          }
          if (get(a, sort.field) < get(b, sort.field)) {
            return sort.order === 'ASC' ? -1 : 1;
          }
          return 0;
        });
      }

      // 3. paginate
      tempData = tempData.slice((page - 1) * limit, page * limit);

      setFinalItems({
        data: tempData,
        total: filteredLength,
        limit: limit,
      });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(data),
      filterValues,
      isLoading,
      page,
      limit,
      setFinalItems,
      sort.field,
      sort.order,
    ]
  );

  useEffect(() => {
    if (isFetching !== fetchingState) {
      setFetchingState(isFetching);
    }
  }, [isFetching, fetchingState, setFetchingState]);

  useEffect(() => {
    if (isLoading !== loadingState) {
      setLoadingState(isLoading);
    }
  }, [isLoading, loadingState, setLoadingState]);

  return {
    sort,
    data: finalItems.data,
    error,
    displayedFilters,
    filterValues,
    hideFilter,
    isFetching: fetchingState,
    isLoading: loadingState,
    selecting: selectionModifiers.select,
    toggleSelection: selectionModifiers.toggle,
    clearSelection: selectionModifiers.clearSelection,
    page,
    limit,
    refetch,
    selectedIds,
    setFilters,
    setPage,
    setLimit,
    setSort,
    showFilter,
    total: finalItems.total,
  };
};

export interface UseListOptions<RecordType extends MaRecord = any> {
  data?: RecordType[];
  error?: any;
  filter?: FilterPayload;
  isFetching?: boolean;
  isLoading?: boolean;
  page?: number;
  limit?: number;
  sort?: SortPayload;
  resource?: string;
}

export type UseListValue<RecordType extends MaRecord = any> =
  ListControllerResult<RecordType>;

const defaultFilter = {};
const defaultSort = { field: 'id', order: SORT_ASC };
