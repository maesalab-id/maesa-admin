import { Identifier } from '@maesa-admin/core';
import { ChangeEvent, FC, ReactElement } from 'react';
import { TableBodyRow } from './TableBodyRow';
import { TableBodyRowSkeleton } from './TableBodyRowSkeleton';

export const TableBody: FC<TableBodyProps> = (props): ReactElement => {
  const {
    data,
    skeleton,
    hasBulkActions,
    limit,
    children,
    selectedIds,
    onToggleItem,
  } = props;
  return (
    <tbody>
      <>
        {skeleton &&
          new Array(limit).fill(0).map((_, i) => (
            <TableBodyRowSkeleton key={i} hasBulkActions={hasBulkActions}>
              {children}
            </TableBodyRowSkeleton>
          ))}
        {!skeleton &&
          data?.map((record, rowIndex) => (
            <TableBodyRow
              id={record.id}
              key={record.id ?? `row${rowIndex}`}
              record={record}
              selected={selectedIds?.includes(record.id)}
              onToggleItem={onToggleItem}
              hasBulkActions={hasBulkActions}
            >
              {children}
            </TableBodyRow>
          ))}
      </>
    </tbody>
  );
};

export interface TableBodyProps {
  data?: any[];
  children: ReactElement | ReactElement[];
  skeleton?: boolean;
  limit?: number;
  selectedIds?: Identifier[];
  hasBulkActions?: boolean;
  onToggleItem?: (id: Identifier, event: ChangeEvent<HTMLInputElement>) => void;
}
