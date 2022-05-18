import { ReactNode } from "react";
import { ListContext } from "./ListContext";
import { ListFilterContext, usePickFilterContext } from "./ListFilterContext";
import { ListPaginationContext, usePickPaginationContext } from "./ListPaginationContext";

export const ListContextProvider = ({
  value,
  children
}: {
  value: any,
  children: ReactNode
}) => (
  <ListContext.Provider value={value}>
    <ListFilterContext.Provider value={usePickFilterContext(value)}>
      <ListPaginationContext.Provider value={usePickPaginationContext(value)}>
        {children}
      </ListPaginationContext.Provider>
    </ListFilterContext.Provider>
  </ListContext.Provider>
)