import { createContext } from 'react';
import { ListControllerResult, SORT_ASC } from '../../List';
import { MaRecord } from '../../types';

export const ChoicesContext = createContext<ChoicesContextValue>({
  data: [],
  choices: undefined,

  isFetching: false,
  isLoading: false,
  refetch: () => {
    /* no-op */
  },

  selectedIds: [],
  selecting: () => {
    /* no-op */
  },
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

export interface ChoicesContextValue<RecordType extends MaRecord = any>
  extends ListControllerResult<RecordType> {
  choices?: { [key: string]: any };
}
