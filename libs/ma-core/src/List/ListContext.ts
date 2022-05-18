import { createContext } from 'react';
import { SORT_ASC } from './queryReducer';
import { ListControllerResult } from './useListController';

export const ListContext = createContext<ListControllerResult>({
  data: [],
  isFetching: false,
  isLoading: false,

  selectedIds: [],
  toggleSelection: () => {
    /* no-op */
  },
  clearSelection: () => {
    /* no-op */
  },

  sort: {
    field: 'id',
    order: SORT_ASC,
  },
  filterValues: null,
  displayedFilters: {},
  total: 0,
  page: 1,
  limit: 10,
  showFilter: () => {
    /* no-op */
  },
  hideFilter: () => {
    /* no-op */
  },
  setFilters: () => {
    /* no-op */
  },
  setPage: () => {
    /* no-op */
  },
  setLimit: () => {
    /* no-op */
  },
  setSort: () => {
    /* no-op */
  },
});
