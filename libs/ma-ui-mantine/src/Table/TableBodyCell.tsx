import { FC, ReactElement } from "react"

interface TableBodyCellProps {
  field?: JSX.Element;
}

export const TableBodyCell: FC<TableBodyCellProps> = (props): ReactElement => {
  const {
    field,
  } = props;
  return (
    <td>
      {field}
    </td>
  )
}