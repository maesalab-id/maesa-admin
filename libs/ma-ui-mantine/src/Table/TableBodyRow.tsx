import {
  RecordContextProvider,
  useRecordContext,
  Identifier,
  MaRecord,
} from '@maesa-admin/core';
import { Checkbox } from '@mantine/core';
import {
  ChangeEvent,
  ChangeEventHandler,
  Children,
  FC,
  isValidElement,
  ReactElement,
  useCallback,
} from 'react';
import { TableBodyCell } from './TableBodyCell';

export const TableBodyRow: FC<TableBodyRowProps> = (props): ReactElement => {
  const { id, children, selected, hasBulkActions = true, onToggleItem } = props;

  const record = useRecordContext(props);

  const handleToggleSelection = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((event) => {
    onToggleItem?.(id as Identifier, event);
  }, []);

  return (
    <RecordContextProvider value={record}>
      <tr>
        {hasBulkActions && (
          <td>
            <Checkbox
              styles={{
                input: { cursor: 'pointer' },
              }}
              checked={selected}
              onChange={handleToggleSelection}
            />
          </td>
        )}
        {Children.map(children, (field, index) =>
          isValidElement(field) ? (
            <TableBodyCell key={`${id}`} field={field} />
          ) : null
        )}
      </tr>
    </RecordContextProvider>
  );
};

interface TableBodyRowProps {
  id?: Identifier;
  record: MaRecord;
  children: ReactElement | ReactElement[];
  selected?: boolean;
  hasBulkActions?: boolean;
  onToggleItem?: (id: Identifier, event: ChangeEvent<HTMLInputElement>) => void;
}
