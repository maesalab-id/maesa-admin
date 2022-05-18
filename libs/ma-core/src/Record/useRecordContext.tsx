import { useContext } from 'react';
import { MaRecord } from '../types';
import { RecordContext } from './RecordContext';

export interface UseRecordContextParams<
  RecordType extends MaRecord | Omit<MaRecord, 'id'> = MaRecord
> {
  record?: RecordType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const useRecordContext = <
  RecordType extends MaRecord | Omit<MaRecord, 'id'> = MaRecord
>(
  props?: UseRecordContextParams
): RecordType | undefined => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const context = useContext<RecordType>(RecordContext);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (props && props.record) || context;
};
