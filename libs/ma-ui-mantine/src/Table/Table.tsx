import { Center, Loader, Table as MtTable } from "@mantine/core";
import { useListContext, MaRecord } from "@maesa-admin/core";
import { cloneElement, ComponentType, isValidElement, ReactElement } from "react";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

export const Table = <RecordType extends MaRecord = any>(
  props: TableProps,
) => {

  const {
    data,
    isLoading,
  } = useListContext<RecordType>(props);

  const {
    children,
    header: Header = <TableHeader data={data} />,
  } = props;

  if (isLoading === true) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  if (!children || (!data && isLoading)) {
    return null;
  }

  return (
    <MtTable>
      {isValidElement(Header) ? cloneElement(Header, {}, children) : null}
      <TableBody data={data}>
        {children}
      </TableBody>
    </MtTable>
  )
}

export interface TableProps {
  actions?: ReactElement | false;
  children: ReactElement | ReactElement[];
  header?: ReactElement | ComponentType | null;
}