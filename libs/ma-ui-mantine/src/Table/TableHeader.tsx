import {
  ChangeEventHandler,
  Children,
  FC,
  isValidElement,
  ReactElement,
  useCallback,
} from 'react';
import { MaRecord, useListContext } from '@maesa-admin/core';
import { TableHeaderCell } from './TableHeaderCell';
import { Checkbox } from '@mantine/core';

export const TableHeader: FC<TableHeaderProps> = (props): ReactElement => {
  const { children, hasBulkActions = true } = props;
  const { data, selectedIds, selecting } = useListContext(props);

  const handleSelectAll = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const indeterminate =
        selectedIds.length > 0 && selectedIds.length < data.length;
      if (event.target.checked || indeterminate) {
        selecting(
          selectedIds.concat(
            data
              .filter((record) => !selectedIds.includes(record.id))
              .map((record) => record.id)
          )
        );
      } else {
        selecting([]);
      }
    },
    [selectedIds, selecting]
  );

  return (
    <thead>
      <tr>
        {hasBulkActions && (
          <th style={{ width: 1 }}>
            <Checkbox
              styles={{
                input: { cursor: 'pointer' },
              }}
              checked={selectedIds.length > 0}
              indeterminate={
                selectedIds.length > 0 && selectedIds.length < data.length
              }
              onChange={handleSelectAll}
            />
          </th>
        )}
        {Children.map(children, (field, index) =>
          isValidElement(field) ? (
            <th key={index}>
              <TableHeaderCell field={field} />
            </th>
          ) : null
        )}
      </tr>
    </thead>
  );
};

export interface TableHeaderProps<RecordType extends MaRecord = any> {
  data?: RecordType[];
  children?: ReactElement | ReactElement[];
  hasBulkActions?: boolean;
}
