import { cloneElement, FC, ReactElement, useMemo } from 'react';

interface TableBodyCellProps {
  field?: JSX.Element;
}

export const TableBodyCell: FC<TableBodyCellProps> = (props): ReactElement => {
  const { field } = props;
  const fieldProps = useMemo(() => {
    if (!field?.props) return {};
    const result = { ...field?.props };
    if (field.props.label) {
      result.showLabel = false;
    }
    return result;
  }, [field?.props]);
  return <td>{field && cloneElement(field, fieldProps)}</td>;
};
