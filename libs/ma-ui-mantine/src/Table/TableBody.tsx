import { FC, ReactElement } from "react";
import { TableBodyRow } from "./TableBodyRow";

export interface TableBodyProps {
  data?: any[];
  children: ReactElement | ReactElement[];
}


export const TableBody: FC<TableBodyProps> = (props): ReactElement => {
  const {
    data,
    children,
  } = props;
  return (
    <tbody>
      {data?.map((record, rowIndex) => (
        <TableBodyRow
          id={record.id}
          key={record.id ?? `row${rowIndex}`}
          record={record}
        >
          {children}
        </TableBodyRow>
      ))}
    </tbody>
  )
}