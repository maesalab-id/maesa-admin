import { ReactNode } from "react";
import { MaRecord } from "../types";
import { ListContextProvider } from "./ListContextProvider";
import { ListControllerProps, useListController } from "./useListController";

export const ListBase = <RecordType extends MaRecord = any>({
  children,
  ...props
}: ListControllerProps<RecordType> & { children: ReactNode }) => (
  <ListContextProvider value={useListController(props)}>
    {children}
  </ListContextProvider>
)