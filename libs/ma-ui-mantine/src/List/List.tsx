import { ListControllerProps, ListBase, MaRecord } from '@maesa-admin/core';
import { ReactElement } from 'react';
import { Query, QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
import { ListView, ListViewProps } from './ListView';

export interface ListProps<RecordType extends MaRecord = any>
  extends ListControllerProps<RecordType>,
    ListViewProps {
  queryClient?: QueryClient;
}

export const List = <RecordType extends MaRecord = any>(
  props: ListProps<RecordType>
): ReactElement => {
  const {
    debounce,
    sort,
    filter = {},
    filterDefaultValues,
    limit = 10,
    resource,
    queryFn,
    queryOptions,
    queryClient: extendedQueryClient,
    ...rest
  } = props;

  const queryClient = extendedQueryClient || useQueryClient() || new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ListBase<RecordType>
        debounce={debounce}
        sort={sort}
        filter={filter}
        filterDefaultValues={filterDefaultValues}
        limit={limit}
        queryFn={queryFn}
        queryOptions={queryOptions}
        resource={resource}
      >
        <ListView<RecordType> {...rest} />
      </ListBase>
    </QueryClientProvider>
  );
};
