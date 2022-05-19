import { Identifier } from '@maesa-admin/core';
import { ChangeEvent, FC, ReactElement } from 'react';
import { TableBodyRow } from './TableBodyRow';

export const TableBody: FC<TableBodyProps> = (props): ReactElement => {
  const { data, children, selectedIds, onToggleItem } = props;
  return (
    <tbody>
      {data?.map((record, rowIndex) => (
        <TableBodyRow
          id={record.id}
          key={record.id ?? `row${rowIndex}`}
          record={record}
          selected={selectedIds?.includes(record.id)}
          onToggleItem={onToggleItem}
        >
          {children}
        </TableBodyRow>
      ))}
    </tbody>
  );
};

export interface TableBodyProps {
  data?: any[];
  children: ReactElement | ReactElement[];
  selectedIds?: Identifier[];
  onToggleItem?: (id: Identifier, event: ChangeEvent<HTMLInputElement>) => void;
}
