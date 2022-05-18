import { useContext } from "react";
import { ListPaginationContext, ListPaginationContextValue } from "./ListPaginationContext";

export const useListPaginationContext = (
  props?: any
): ListPaginationContextValue => {
  const context = useContext(ListPaginationContext)
  if (!context.setPage) {
    return props;
  }
  return context;
}