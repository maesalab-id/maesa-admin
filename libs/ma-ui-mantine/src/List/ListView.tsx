import { Card } from '@mantine/core';
import React, {
  ElementType,
  isValidElement,
  ReactElement,
  useCallback,
  useMemo,
} from 'react';
import { MaRecord, useListContext } from '@maesa-admin/core';
import { ListToolbar } from './ListToolbar';
import { Pagination as DefaultPagination } from '../Pagination';
import { BulkActionsToolbar } from './BulkActionsToolbar';

const DefaultComponent = (props: any) => (
  <Card shadow="md" mb="sm" px={0} {...props} />
);

export const ListView = <RecordType extends MaRecord = any>(
  props: ListViewProps
) => {
  const {
    children,
    bulkActionButtons,
    component: Content = DefaultComponent,
    pagination = <DefaultPagination />,
    filters,
    actions: actionFn,
  } = props;

  const { data, isLoading, selectedIds } = useListContext<RecordType>(props);

  if (!children || (!data && isLoading)) {
    return null;
  }

  const actions = useMemo<ReactElement | null | undefined>(() => {
    let result;
    if (typeof actionFn === 'function') {
      result = actionFn();
    } else {
      result = actionFn;
    }
    return result;
  }, [actionFn]);

  return (
    <div>
      <ListToolbar filters={filters} actions={actions} />
      <Content>
        {bulkActionButtons && (
          <BulkActionsToolbar selectedIds={selectedIds}>
            {isValidElement(bulkActionButtons) && bulkActionButtons}
          </BulkActionsToolbar>
        )}
        {children}
      </Content>
      {pagination}
    </div>
  );
};

export interface ListViewProps {
  actions?: ReactElement | (() => ReactElement) | null;
  children: ReactElement | ReactElement[];
  bulkActionButtons?: ReactElement | null;
  component?: ElementType;
  pagination?: ReactElement | null;
  filters?: ReactElement[];
}
