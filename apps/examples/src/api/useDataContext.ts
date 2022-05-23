import { getList, GetListProps } from './getList';

export const useDataContext = () => {
  return {
    getList: async (resource: string, props?: GetListProps) =>
      await getList(resource, props),
  };
};
