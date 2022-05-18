import { createContext, ReactNode } from "react";
import { MaRecord } from "../types";

export const RecordContext = createContext<MaRecord | Omit<MaRecord, 'id'> | undefined>(undefined);

export interface RecordContextProviderProps<RecordType> {
  children: ReactNode;
  value?: RecordType;
}

export const RecordContextProvider = <RecordType extends MaRecord | Omit<MaRecord, 'id'> = MaRecord>({
  children,
  value,
}: RecordContextProviderProps<RecordType>) => (
  <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
)