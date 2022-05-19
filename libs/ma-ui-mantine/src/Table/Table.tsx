import { Center, Loader, Table as MtTable } from '@mantine/core';
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
  const { data, isLoading, selectedIds, toggleSelection } =
    useListContext<RecordType>(props);

  const { children, header: Header = <TableHeader data={data} /> } = props;

  const handleToggleItem = useCallback(
    (id: Identifier, event: ChangeEvent<HTMLInputElement>) => {
      toggleSelection(id);
    },
    [data]
  );

  if (isLoading === true) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (!children || (!data && isLoading)) {
    return null;
  }

  return (
    <MtTable highlightOnHover={true}>
      {isValidElement(Header) ? cloneElement(Header, {}, children) : null}
      <TableBody
        data={data}
        selectedIds={selectedIds}
        onToggleItem={handleToggleItem}
      >
        {children}
      </TableBody>
    </MtTable>
  );
};

export interface TableProps {
  actions?: ReactElement | false;
  children: ReactElement | ReactElement[];
  header?: ReactElement | ComponentType | null;
}
