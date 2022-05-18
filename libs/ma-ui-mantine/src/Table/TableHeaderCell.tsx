import { Text } from "@mantine/core";
import { FC, ReactElement } from "react";

interface TableHeaderCellProps {
  field?: JSX.Element;
}

export const TableHeaderCell: FC<TableHeaderCellProps> = (props): ReactElement => {
  const {
    field,
  } = props;
  
  return (
    <Text>{field?.props.label}</Text>
  )
}