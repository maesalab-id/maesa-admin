import { Children, FC, isValidElement, ReactElement } from 'react';
import { MaRecord } from '@maesa-admin/core';
import { TableHeaderCell } from './TableHeaderCell';

export const TableHeader: FC<TableHeaderProps> = (props): ReactElement => {
  const { children } = props;
  return (
    <thead>
      <tr>
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
}
