import { pick } from 'lodash';
import { createContext, useMemo } from 'react';
import { ListControllerResult } from './useListController';

export const ListPaginationContext = createContext<ListPaginationContextValue>({
  isLoading: false,
  page: 1,
  limit: 1,
  setPage: () => {
    /* no-op */
  },
  setLimit: () => {
    /* no-op */
  },
  total: 0,
});

export type ListPaginationContextValue = Pick<
  ListControllerResult,
  'isLoading' | 'page' | 'limit' | 'setPage' | 'setLimit' | 'total'
>;

export const usePickPaginationContext = (
  contex: ListControllerResult
): ListPaginationContextValue =>
  useMemo(
    () =>
      pick(contex, [
        'isLoading',
        'page',
        'limit',
        'setPage',
        'setLimit',
        'total',
      ]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      contex.isLoading,
      contex.page,
      contex.limit,
      contex.setPage,
      contex.setLimit,
      contex.total,
    ]
  );
