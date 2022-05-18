import { useCallback, useMemo, useRef, useState } from 'react';
import { FilterPayload, SortPayload } from '../types';
import {
  HIDE_FILTER,
  queryReducer,
  QueryReducerActionTypes,
  SET_FILTER,
  SET_LIMIT,
  SET_PAGE,
  SET_SORT,
  SHOW_FILTER,
  SORT_ASC,
} from './queryReducer';
import removeEmpty from '../utils/removeEmpty';
import _debounce from 'lodash/debounce';

export const hasCustomParams = (params: ListParams) => {
  return (
    params &&
    params.filter &&
    (Object.keys(params.filter).length > 0 ||
      params.order != null ||
      params.page !== 1 ||
      params.limit != null ||
      params.sort != null)
  );
};

const getQuery = ({
  filterDefaultValues,
  params,
  sort,
  limit,
}: {
  filterDefaultValues?: FilterPayload;
  params: ListParams;
  sort: SortPayload;
  limit: number;
}) => {
  const query: Partial<ListParams> = hasCustomParams(params)
    ? { ...params }
    : { filter: filterDefaultValues || {} };

  if (!query.sort) {
    query.sort = sort.field;
    query.order = sort.order;
  }
  if (query.limit == null) {
    query.limit = limit;
  }
  if (query.page == null) {
    query.page = 1;
  }
  return {
    ...query,
    page: getNumberOrDefault(query.page, 1),
    limit: getNumberOrDefault(query.limit, 10),
  } as ListParams;
};

export const getNumberOrDefault = (
  possibleNumber: string | number | undefined,
  defaultValue: number
) => {
  const parsedNumber =
    typeof possibleNumber === 'string'
      ? parseInt(possibleNumber, 10)
      : possibleNumber;

  return isNaN(parsedNumber as any) ? defaultValue : parsedNumber;
};

export const useListParams = ({
  resource,
  filterDefaultValues,
  sort = defaultSort,
  limit = 10,
  debounce = 500,
}: ListParamsOptions): [Parameters, Modifiers] => {
  const tempParams = useRef<ListParams>();
  const [localParams, setLocalParams] = useState<ListParams>(defaultParams);
  const storyKey = `${resource}.listParams`;
  const requestSignature: any[] = [
    storyKey,
    JSON.stringify(localParams),
    JSON.stringify(filterDefaultValues),
    JSON.stringify(sort),
    limit,
  ];

  const query = useMemo(
    () =>
      getQuery({
        filterDefaultValues,
        params: localParams,
        sort,
        limit,
      }),
    requestSignature
  ); // eslint-disable-line react-hooks/exhaustive-deps

  const filterValues = query.filter || emptyObject;
  const displayedFilterValues = query.displayedFilters || emptyObject;

  const changeParams = useCallback((action: QueryReducerActionTypes) => {
    if (!tempParams.current) {
      tempParams.current = queryReducer(query, action);
      setTimeout(() => {
        setLocalParams(tempParams.current as any);
        tempParams.current = undefined;
      }, 0);
    } else {
      tempParams.current = queryReducer(tempParams.current, action);
    }
  }, requestSignature); // eslint-disable-line react-hooks/exhaustive-deps

  const setSort = useCallback(
    (sort: SortPayload) => changeParams({ type: SET_SORT, payload: sort }),
    requestSignature // eslint-disable-line react-hooks/exhaustive-deps
  );

  const setPage = useCallback(
    (newPage: number) => {
      console.log('SET PAGE', newPage);
      changeParams({ type: SET_PAGE, payload: newPage });
    },
    requestSignature // eslint-disable-line react-hooks/exhaustive-deps
  );

  const setLimit = useCallback(
    (newLimit: number) => changeParams({ type: SET_LIMIT, payload: newLimit }),
    requestSignature // eslint-disable-line react-hooks/exhaustive-deps
  );

  const debounceSetFilter = _debounce((filter, displayedFilters) => {
    changeParams({
      type: SET_FILTER,
      payload: {
        filter: removeEmpty(filter),
        displayedFilters,
      },
    });
  }, debounce);

  const setFilters = useCallback(
    (filter: any, displayedFilters: any, debounce = true) => {
      if (debounce) return debounceSetFilter(filter, displayedFilters);

      return changeParams({
        type: SET_FILTER,
        payload: {
          filter: removeEmpty(filter),
          displayedFilters,
        },
      });
    },
    requestSignature
  ); // eslint-disable-line react-hooks/exhaustive-deps

  const showFilter = useCallback((filterName: string, defaultValue: any) => {
    console.log('show_filter', filterName, defaultValue);
    changeParams({
      type: SHOW_FILTER,
      payload: {
        filterName,
        defaultValue,
      },
    });
  }, requestSignature); // eslint-disable-line react-hooks/exhaustive-deps

  const hideFilter = useCallback((filterName: string) => {
    changeParams({
      type: HIDE_FILTER,
      payload: filterName,
    });
  }, requestSignature); // eslint-disable-line react-hooks/exhaustive-deps

  return [
    {
      filterValues,
      requestSignature,
      ...query,
      displayedFilters: displayedFilterValues,
    },
    {
      setPage,
      setLimit,
      setSort,
      setFilters,
      showFilter,
      hideFilter,
      changeParams,
    },
  ];
};

const defaultSort = {
  field: 'id',
  order: SORT_ASC,
};
const defaultParams: ListParams = {
  order: '',
  page: 0,
  limit: 0,
  sort: '',
  filter: undefined,
  displayedFilters: undefined
};

const emptyObject = {};

export interface ListParams {
  order: string;
  page: number;
  limit: number;
  sort: string;
  filter: any;
  displayedFilters: any;
}

interface ListParamsOptions {
  resource?: string;
  filterDefaultValues?: FilterPayload;
  limit?: number;
  sort?: SortPayload;
  debounce?: number;
}

interface Parameters extends ListParams {
  filterValues: object;
  displayedFilters: {
    [key: string]: boolean;
  };
  requestSignature: any[];
}

interface Modifiers {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSort: (sort: SortPayload) => void;
  setFilters: (filters: any, displayedFilters: any) => void;
  showFilter: (filterName: string, defaultValue: any) => void;
  hideFilter: (filterName: string) => void;
  changeParams: (action: any) => void;
}
