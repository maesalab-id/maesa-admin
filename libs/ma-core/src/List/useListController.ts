import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { FilterPayload, MaRecord, SortPayload } from '../types';
import { SORT_ASC } from './queryReducer';
import { useListParams } from './useListParams';
import { useRecordSelection } from './useRecordSelection';

export const useListController = <RecordType extends MaRecord = any>(
  props: ListControllerProps<RecordType> = {}
): ListControllerResult => {
  const {
    resource,
    filterDefaultValues,
    sort = defaultSort,
    limit = 10,
    filter,
    debounce = 500,

    queryFn,
    queryOptions,
  } = props;

  const [query, queryModifier] = useListParams({
    resource,
    filterDefaultValues,
    sort,
    limit,
    debounce,
  });

  const [selectedIds, selectionModifier] = useRecordSelection();

  const pagination = useMemo(
    () => ({
      skip: Math.floor(
        (query.page !== 0 ? query.page - 1 : query.page) * query.limit
      ),
      limit: query.limit,
      page: query.page,
    }),
    [query.limit, query.page]
  );

  const currentSort = useMemo(
    () => ({
      field: query.sort,
      order: query.order,
    }),
    [query.sort, query.order]
  );

  const queryFilter = useMemo(() => {
    return { ...query.filter, ...filter };
  }, [query.filter, filter]);

  const {
    data: originalData,
    isLoading,
    isFetching,
  } = useQuery(
    [
      resource,
      'getList',
      {
        pagination,
        currentSort,
        filter: queryFilter,
      },
    ],
    () =>
      queryFn?.({
        filter: queryFilter,
        pagination,
        sort: {
          field: query.sort,
          order: query.order,
        },
      }),
    {
      ...queryOptions,
      refetchOnWindowFocus: false
    }
  );

  const { data, total } = useMemo(() => {
    if (!originalData)
      return {
        total: 0,
        data: [],
      };
    return {
      total: originalData.total,
      data: originalData.data,
    };
  }, [originalData]);

  return {
    data,
    isLoading,
    isFetching,

    selectedIds,
    toggleSelection: selectionModifier.toggle,
    clearSelection: selectionModifier.clearSelection,

    filter,
    filterValues: query.filterValues,
    displayedFilters: query.displayedFilters,
    setFilters: queryModifier.setFilters,
    showFilter: queryModifier.showFilter,
    hideFilter: queryModifier.hideFilter,

    page: query.page,
    setPage: queryModifier.setPage,
    limit: query.limit,
    setLimit: queryModifier.setLimit,
    sort: currentSort,
    setSort: queryModifier.setSort,

    total,
  };
};

export interface ListControllerResult<RecordType extends MaRecord = any> {
  data: RecordType[];
  filter?: FilterPayload;
  filterValues: any;
  displayedFilters: {
    [key: string]: boolean;
  };
  setFilters: (filters: any, displayedFilters: any, debounce?: boolean) => void;
  showFilter: (filterName: string, defaultValue: any) => void;
  hideFilter: (filterName: string) => void;

  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  sort: SortPayload;
  setSort: (sort: SortPayload) => void;
  total: number;

  isLoading: boolean;
  isFetching: boolean;

  selectedIds: RecordType['id'][];
  toggleSelection: (id: RecordType['id']) => void;
  clearSelection: () => void;
}

interface GetListResult<RecordType> {
  data: RecordType[];
  total: number;
  skip: number;
  limit: number;
}

export type QueryFunctionArgs = {
  filter?: FilterPayload;
  pagination?: {
    limit: number;
    skip: number;
    page: number;
  };
  sort?: SortPayload;
};

export interface ListControllerProps<RecordType extends MaRecord = any> {
  debounce?: number;
  filter?: FilterPayload;
  filterDefaultValues?: object;

  limit?: number;
  queryOptions?: any;
  queryFn?: (
    args: QueryFunctionArgs
  ) =>
    | (GetListResult<RecordType[]> | null)
    | Promise<GetListResult<RecordType[]> | null>;

  sort?: SortPayload;

  resource?: string;
}

const defaultSort = {
  field: 'id',
  order: SORT_ASC,
};
