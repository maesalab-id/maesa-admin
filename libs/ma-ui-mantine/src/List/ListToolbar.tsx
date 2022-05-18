import { Group } from "@mantine/core";
import { FC, ReactElement } from "react";
import { FilterButton, FilterForm } from "../Table";

export const ListToolbar: FC<ListToolbarProps> = (props) => {
  const {
    filters,
  } = props;

  return (
    <Group grow={true}>
      <FilterForm filters={filters} />
      <FilterButton filters={filters} />
    </Group>
  )
}

export interface ListToolbarProps {
  filters?: ReactElement[];
}