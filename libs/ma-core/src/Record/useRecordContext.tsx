import { useContext } from "react";
import { MaRecord } from "../types";
import { RecordContext } from "./RecordContext";

export interface UseRecordContextParams<RecordType extends MaRecord | Omit<MaRecord, 'id'> = MaRecord> {
  record?: RecordType;
  [key: string]: any;
}

export const useRecordContext = <RecordType extends MaRecord | Omit<MaRecord, 'id'> = MaRecord>(
  props?: UseRecordContextParams
): RecordType | undefined => {
  // @ts-ignore
  const context = useContext<RecordType>(RecordContext);
  // @ts-ignore
  return (props && props.record) || context;
}