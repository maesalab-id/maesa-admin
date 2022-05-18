import {
  RecordContextProvider,
  useRecordContext,
  Identifier,
  MaRecord,
} from '@maesa-admin/core';
import { Children, FC, isValidElement, ReactElement } from 'react';
import { TableBodyCell } from './TableBodyCell';

interface TableBodyRowProps {
  id?: Identifier;
  record: MaRecord;
  children: ReactElement | ReactElement[];
}

export const TableBodyRow: FC<TableBodyRowProps> = (props): ReactElement => {
  const { id, children } = props;

  const record = useRecordContext(props);

  return (
    <RecordContextProvider value={record}>
      <tr>
        {Children.map(children, (field, index) =>
          isValidElement(field) ? (
            <TableBodyCell key={`${id}`} field={field} />
          ) : null
        )}
      </tr>
    </RecordContextProvider>
  );
};
