import { useContext, useMemo } from "react";
import { MaRecord } from "../types";
import { ListContext } from "./ListContext";
import { ListControllerResult } from "./useListController";
import defaults from "lodash/defaults";

export const useListContext = <RecordType extends MaRecord = any>(
  props?: any
): ListControllerResult<RecordType> => {
  const context = useContext(ListContext);
  return useMemo(() =>
    defaults(
      {},
      props != null ? extractListContextProps(props) : {},
      context
    ), [context, props]);
}

const extractListContextProps = ({
  data,

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
}: ListControllerResult): ListControllerResult => ({
  data,

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
})