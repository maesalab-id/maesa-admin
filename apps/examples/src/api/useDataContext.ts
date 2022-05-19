import { useContext } from 'react';
import { DataContext } from './DataContext';
import { getList, GetListProps } from './getList';

export const useDataContext = () => {
  const [data] = useContext(DataContext);
  return {
    getList: (props?: GetListProps) => getList(data, props),
  };
};
