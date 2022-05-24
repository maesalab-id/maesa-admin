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
  isValidElement,
  ReactElement,
  useCallback,
} from 'react';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

export const Table = <RecordType extends MaRecord = any>(props: TableProps) => {
  const { data, limit, isLoading, isFetching, selectedIds, toggleSelection } =
    useListContext<RecordType>(props);

  const {
    children,
    hasBulkActions = true,
    header: Header = <TableHeader data={data} />,
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
        {isValidElement(Header) ? cloneElement(Header, {}, children) : null}
        <TableBody
          limit={limit}
          skeleton={isLoading}
          data={data}
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

export interface TableProps {
  actions?: ReactElement | false;
  children: ReactElement | ReactElement[];
  header?: ReactElement | ComponentType | null;
  hasBulkActions?: boolean;
}
