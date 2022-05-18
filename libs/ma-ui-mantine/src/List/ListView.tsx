import { Card } from "@mantine/core";
import { ElementType, ReactElement } from "react";
import { MaRecord, useListContext  } from "@maesa-admin/core";
import { ListToolbar } from "./ListToolbar";
import { Pagination as DefaultPagination } from "../Pagination";

const DefaultComponent = (props: any) => <Card shadow="md" mb="sm" px={0} {...props} />;

export const ListView = <RecordType extends MaRecord = any>(
  props: ListViewProps
) => {

  const {
    children,
    component: Content = DefaultComponent,
    pagination = <DefaultPagination />,
    filters
  } = props;

  const {
    data,
    isLoading,
  } = useListContext<RecordType>(props);

  if (!children || (!data && isLoading)) {
    return null;
  }

  return (
    <div>
      <ListToolbar filters={filters} />
      <Content>
        {children}
      </Content>
      {pagination}
    </div>
  )
}

export interface ListViewProps {
  actions?: ReactElement | false;
  children: ReactElement | ReactElement[];
  component?: ElementType;
  pagination?: ReactElement | null;
  filters?: ReactElement[];
}