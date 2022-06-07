import {
  RecordContextProvider,
  useRecordContext,
  Identifier,
  MaRecord,
} from '@maesa-admin/core';
import { ActionIcon, Checkbox } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons';
import { isNil } from 'lodash';
import {
  ChangeEvent,
  ChangeEventHandler,
  Children,
  FC,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { TableBodyCell } from './TableBodyCell';

export const TableBodyRow: FC<TableBodyRowProps> = (props): ReactElement => {
  const {
    id,
    children,
    selected,
    hasBulkActions = true,
    onToggleItem,
    expand,
  } = props;

  const record = useRecordContext(props);

  const expandable = useMemo(() => {
    return !!expand;
  }, [expand]);

  const handleToggleSelection = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((event) => {
    onToggleItem?.(id as Identifier, event);
  }, []);

  const colCount = useMemo(() => {
    let count = 0;
    count += Children.toArray(children).filter((child) => !!child).length;
    if (expand) count += 1;
    if (hasBulkActions) count += 1;
    return count;
  }, [children, expandable, hasBulkActions]);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <RecordContextProvider value={record}>
      <tr>
        {expandable && (
          <td>
            <ActionIcon onClick={() => setIsExpanded((s) => !s)}>
              {isExpanded ? <IconChevronDown /> : <IconChevronRight />}
            </ActionIcon>
          </td>
        )}
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
      {isExpanded && expandable && (
        <tr>
          <td colSpan={colCount}>{expand}</td>
        </tr>
      )}
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

  expand?: ReactNode;
}
