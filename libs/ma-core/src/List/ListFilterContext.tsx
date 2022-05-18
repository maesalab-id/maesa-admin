import { createContext, useMemo } from 'react';
import pick from 'lodash/pick';
import { ListControllerResult } from './useListController';

export type ListFilterContextValue = Pick<
  ListControllerResult,
  'filterValues' | 'setFilters'
>;

export const ListFilterContext = createContext<ListFilterContextValue>({
  setFilters: () => {
    /* no-op */
  },
  filterValues: null,
});

export const usePickFilterContext = (
  context: ListControllerResult
): ListFilterContextValue =>
  useMemo(() => {
    return pick(context, ['filterValues', 'setFilters']);
  }, [
    // eslint-disable-line react-hooks/exhaustive-deps
    context.filterValues,
    context.setFilters,
  ]);
