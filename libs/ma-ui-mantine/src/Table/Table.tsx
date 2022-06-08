import {
  Center,
  Loader,
  LoadingOverlay,
  Table as MtTable,
} from '@mantine/core';
import { useListContext, MaRecord, Identifier } from '@maesa-admin/core';
import {
  ChangeEvent,
  cloneElement,
  ComponentType,
  createElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
} from 'react';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { isNil } from 'lodash';

export const Table = <RecordType extends MaRecord = any>(props: TableProps) => {
  const { data, limit, isLoading, isFetching, selectedIds, toggleSelection } =
    useListContext<RecordType>(props);

  const {
    children,
    hasBulkActions = false,
    expand,
    header: Header = TableHeader,
  } = props;

  const handleToggleItem = useCallback(
    (id: Identifier, event: ChangeEvent<HTMLInputElement>) => {
      toggleSelection(id);
    },
    [data]
  );

  // if (isLoading === true) {
  //   return (
  //     <Center sx={{ height: 'xl' }}>
  //       <Loader />
  //     </Center>
  //   );
  // }

  if (!children || (!data && isLoading)) {
    return null;
  }

  return (
    <div>
      <LoadingOverlay visible={isFetching} />
      <MtTable highlightOnHover={true}>
        {createOrCloneElement(
          Header,
          {
            hasBulkActions: hasBulkActions,
            hasExpand: !isNil(expand),
            data: data,
          },
          children
        )}
        <TableBody
          limit={limit}
          skeleton={isLoading}
          data={data}
          expand={expand}
          selectedIds={selectedIds}
          onToggleItem={handleToggleItem}
          hasBulkActions={hasBulkActions}
        >
          {children}
        </TableBody>
      </MtTable>
    </div>
  );
};

const createOrCloneElement = (
  element: ReactElement | any,
  props: any,
  children: any
) =>
  isValidElement(element)
    ? cloneElement(element, props, children)
    : createElement(element, props, children);

export interface TableProps {
  actions?: ReactElement | false;
  children: ReactElement | ReactElement[];
  header?: ReactElement | ComponentType | null;
  hasBulkActions?: boolean;

  expand?: ReactNode;
}
