import { UseQueryResult } from 'react-query';

export interface ListHelper {
  refetch: UseQueryResult['refetch'] | (() => void);
}
