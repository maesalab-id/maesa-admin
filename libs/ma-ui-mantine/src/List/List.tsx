import { ListControllerProps, ListBase, MaRecord } from '@maesa-admin/core';
import { ReactElement } from 'react';
import { ListView, ListViewProps } from './ListView';

export interface ListProps<RecordType extends MaRecord = any>
  extends ListControllerProps<RecordType>,
    ListViewProps {}

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
    ...rest
  } = props;

  return (
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
  );
};
