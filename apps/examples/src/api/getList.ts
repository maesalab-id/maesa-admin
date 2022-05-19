import { Identifier } from '@maesa-admin/core';
import { useDataContext } from './useDataContext';

export const getList = (
  data: { [key: Identifier]: any },
  props?: GetListProps
) => {
  let limit = props?.limit || 10;
  let skip = props?.skip || 0;
  const d = Object.values(data);
  const result = d.splice(skip, limit);
  
  return {
    limit: limit,
    total: d.length,
    skip: 0,
    data: result,
  };
};

export interface GetListProps {
  limit?: number;
  skip?: number;
}
