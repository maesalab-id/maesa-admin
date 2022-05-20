import { useContext, useMemo } from 'react';
import defaults from 'lodash/defaults';
import { ChoicesContext, ChoicesContextValue } from './ChoicesContext';
import { MaRecord } from '../../types';

export const useChoicesContext = <RecordType extends MaRecord = any>(
  props?: any
): ChoicesContextValue<RecordType> => {
  const context = useContext(ChoicesContext);
  return useMemo(
    () =>
      defaults(
        {},
        props != null ? extractListContextProps(props) : {},
        context
      ),
    [context, props]
  );
};

const extractListContextProps = ({
  data,

  refetch,
  isFetching,
  isLoading,

  total,
  filterValues,
  displayedFilters,
  limit,
  page,
  sort,
  showFilter,
  hideFilter,
  setFilters,
  setLimit,
  setPage,
  setSort,

  selectedIds,
  selecting,
  toggleSelection,
  clearSelection,
}: ChoicesContextValue): ChoicesContextValue => ({
  data,

  refetch,
  isFetching,
  isLoading,

  total,
  filterValues,
  displayedFilters,
  limit,
  page,
  sort,
  showFilter,
  hideFilter,
  setFilters,
  setLimit,
  setPage,
  setSort,

  selectedIds,
  selecting,
  toggleSelection,
  clearSelection,
});
